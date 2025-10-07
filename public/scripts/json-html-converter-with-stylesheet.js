/**
 * BrowserConverterWithStyleSheet (single-file, injection-friendly)
 * Optimized, readable, and safe for DOM injection.
 *
 * Public API attached to window:
 *  - convertPageToJSON(options)
 *  - convertAndDownload(options)
 *  - convertAndSendToStudio(options, targetOrigin)
 *  - extractAllCSS()
 *  - utils (selected helpers)
 *
 * Usage: await window.BrowserConverterWithStyleSheet.convertAndDownload()
 */

(function () {
  const DEBUG = false;
  const MEDIA_TAGS = new Set(["IMG", "VIDEO"]);
  const HTML_RTE_COMPONENTS = new Set(["richTextEditor", "htmlRte"]);
  const ORIGINS_ALLOWED = new Set([
    "http://localhost:5174",
    "http://localhost:5173",
  ]);

  /* ---------- Small logging util ---------- */
  function log(...args) {
    if (DEBUG) console.log("[BC]", ...args);
  }
  function warn(...args) {
    if (DEBUG) console.warn("[BC]", ...args);
  }
  function err(...args) {
    console.error("[BC]", ...args);
  }

  /* ---------- UUID generator ---------- */
  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }

  /* ---------- Tag -> component mapping (small, extensible) ---------- */
  const TAG_MAP = {
    h1: "header",
    h2: "header",
    h3: "header",
    h4: "header",
    h5: "header",
    h6: "header",
    a: "link",
    video: "video",
    section: "section",
    p: "text",
    span: "text",
    label: "text",
    button: "button",
    select: "html-element",
    option: "html-element",
    input: "html-element",
    textarea: "html-element",
    form: "html-element",
    ul: "html-element",
    ol: "html-element",
    li: "html-element",
    table: "html-element",
    tr: "html-element",
    td: "html-element",
    th: "html-element",
    thead: "html-element",
    tbody: "html-element",
    tfoot: "html-element",
    nav: "html-element",
    header: "html-element",
    footer: "html-element",
    main: "html-element",
    aside: "html-element",
    article: "section",
    img: "image",
    svg: "html-element",
    g: "html-element",
    path: "html-element",
    circle: "html-element",
    rect: "html-element",
    line: "html-element",
    polygon: "html-element",
    polyline: "html-element",
    ellipse: "html-element",
    defs: "html-element",
    clipPath: "html-element",
    mask: "html-element",
    pattern: "html-element",

  };

  /* ---------- Simple caches ---------- */
  const computedStyleCache = new WeakMap();

  function getComputedStyleCached(el) {
    if (computedStyleCache.has(el)) return computedStyleCache.get(el);
    try {
      const cs = window.getComputedStyle(el);
      computedStyleCache.set(el, cs);
      return cs;
    } catch (e) {
      // getComputedStyle may throw for disconnected nodes in some browsers
      return null;
    }
  }

  /* ---------- CSS extraction (safe for CORS sheets) ---------- */
  function extractAllCSS() {
    const cssPieces = [];

    try {
      const styleSheets = Array.from(document.styleSheets || []);
      styleSheets.forEach((sheet) => {
        try {
          // Skip cross-origin sheets to avoid security errors
          if (sheet.href && !sheet.href.startsWith(window.location.origin)) {
            log("Skipping cross-origin stylesheet", sheet.href);
            return;
          }
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach((r) => cssPieces.push(r.cssText));
        } catch (e) {
          // If reading rules fails (CORS), warn and continue
          warn("Could not read stylesheet", e);
        }
      });
    } catch (e) {
      warn("extractAllCSS outer error", e);
    }

    // Include inline <style> tags
    try {
      const styleTags = Array.from(document.querySelectorAll("style"));
      styleTags.forEach((t) => {
        if (t.textContent && t.textContent.trim()) {
          cssPieces.push(t.textContent);
        }
      });
    } catch (e) {
      warn("style tags extraction failed", e);
    }

    return cssPieces.join("\n\n");
  }

  /* ---------- Attribute helpers ---------- */
  function getElementAttributes(el) {
    const attrs = {};
    try {
      if (!el || !el.attributes) return attrs;
      for (let i = 0; i < el.attributes.length; i++) {
        const a = el.attributes[i];
        if (a.name === "style") continue; // style handled separately
        const name = a.name === "class" ? "className" : a.name;
        attrs[name] = a.value;
      }
    } catch (e) {
      warn("getElementAttributes error", e);
    }
    return attrs;
  }

  function getInlineStyles(el) {
    const style = el.getAttribute && el.getAttribute("style");
    if (!style) return {};
    const out = {};
    style.split(";").forEach((decl) => {
      const [prop, val] = decl.split(":").map((s) => s && s.trim());
      if (prop && val) {
        const camel = prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        out[camel] = val;
      }
    });
    return out;
  }

  /* ---------- Metadata helpers ---------- */
  function getElementPosition(el) {
    const pos = { index: 0, parentType: "", siblingCount: 0 };
    try {
      const parent = el.parentElement;
      if (!parent) return pos;
      pos.parentType = parent.tagName.toLowerCase();
      const siblings = Array.from(parent.children);
      pos.index = siblings.indexOf(el);
      pos.siblingCount = siblings.length;
    } catch (e) {
      warn("getElementPosition", e);
    }
    return pos;
  }

  function getElementPath(el) {
    const parts = [];
    let current = el;
    try {
      while (
        current &&
        current !== document.body &&
        current.nodeType === Node.ELEMENT_NODE
      ) {
        let seg = current.tagName.toLowerCase();
        if (current.id) seg += `#${current.id}`;
        else if (
          current.className &&
          typeof current.className === "string" &&
          current.className.trim()
        ) {
          const first = current.className.split(/\s+/).find(Boolean);
          if (first) seg += `.${first}`;
        }
        // add nth-of-type if needed
        const parent = current.parentElement;
        if (parent) {
          const same = Array.from(parent.children).filter(
            (c) => c.tagName === current.tagName
          );
          if (same.length > 1) {
            const idx = same.indexOf(current);
            seg += `:nth-of-type(${idx + 1})`;
          }
        }
        parts.unshift(seg);
        current = current.parentElement;
      }
    } catch (e) {
      warn("getElementPath", e);
    }
    return parts.join(" > ");
  }

  function getElementMetadata(el) {
    const meta = {
      title: "",
      sourceInfo: {},
      elementPath: "",
      contentPreview: "",
    };

    try {
      const tagName = el.tagName ? el.tagName.toLowerCase() : "unknown";
      const id = el.id || null;
      const className =
        typeof el.className === "string" && el.className.trim()
          ? el.className
          : null;
      const textPreview = (el.textContent || "").trim().substring(0, 50);

      let title = `${tagName}`;
      if (id) title += `#${id}`;
      else if (className) title += `.${className.split(/\s+/)[0]}`;

      if (textPreview)
        title += ` - "${textPreview}${textPreview.length >= 50 ? "..." : ""}"`;

      meta.title = title;
      meta.sourceInfo = {
        tagName,
        id,
        className,
        dataAttributes: {},
        position: getElementPosition(el),
      };

      // data-* attributes
      try {
        for (let i = 0; i < el.attributes.length; i++) {
          const a = el.attributes[i];
          if (a.name && a.name.startsWith("data-"))
            meta.sourceInfo.dataAttributes[a.name] = a.value;
        }
      } catch (e) {
        warn("data attr read failed", e);
      }

      meta.elementPath = getElementPath(el);
      meta.contentPreview = textPreview || "";
    } catch (e) {
      warn("getElementMetadata", e);
      meta.title = "element";
    }

    return meta;
  }

  /* ---------- Text handling ---------- */
  function getFullTextContent(el) {
    try {
      // If common truncation classes present, temporarily expand
      const truncated =
        el.classList &&
        (el.classList.contains("line-clamp-3") ||
          el.classList.contains("line-clamp-2") ||
          el.classList.contains("line-clamp-1"));
      if (!truncated) return (el.textContent || "").trim();

      const original = {
        overflow: el.style.overflow,
        textOverflow: el.style.textOverflow,
        whiteSpace: el.style.whiteSpace,
        display: el.style.display,
      };

      el.style.overflow = "visible";
      el.style.textOverflow = "clip";
      el.style.whiteSpace = "normal";
      el.style.display = "block";

      const txt = (el.textContent || "").trim();

      // restore
      el.style.overflow = original.overflow;
      el.style.textOverflow = original.textOverflow;
      el.style.whiteSpace = original.whiteSpace;
      el.style.display = original.display;

      return txt;
    } catch (e) {
      warn("getFullTextContent", e);
      return (el.textContent || "").trim();
    }
  }

  function handleTextNodeContent(textContent, elementJSON, previousValue = "") {
    if (!textContent || !textContent.trim()) return;
    let cleanText = textContent.trim().replace(/\.{3,}$/, "");
    if (!cleanText || cleanText === "...") return;

    if (elementJSON.type === "html-element") {
      const tagName = elementJSON.props?.Tag?.staticString || "div";
      const svgNoText = new Set([
        "path",
        "circle",
        "rect",
        "line",
        "polygon",
        "polyline",
        "ellipse",
        "g",
        "defs",
        "clipPath",
        "mask",
        "pattern",
      ]);
      if (svgNoText.has(tagName)) return;

      const plainTextComponent = {
        type: "plain-text",
        uid: uuid(),
        metadata: {
          title: `text - "${cleanText}"`,
          sourceInfo: {
            tagName: "plainText",
            id: null,
            className: null,
            dataAttributes: {},
            position: { index: 0, parentType: tagName, siblingCount: 1 },
          },
          elementPath: `${
            elementJSON.metadata?.elementPath || ""
          } > plain-text`,
          contentPreview: cleanText,
        },
        attrs: {},
        props: {
          text: { type: "string", staticString: cleanText },
        },
        slots: {},
        styles: { default: { responsiveStyles: { default: {} } } },
      };

      // push to children slot if exists
      const childrenSlotKey = elementJSON.props?.children?.slot;
      if (
        childrenSlotKey &&
        Array.isArray(elementJSON.slots?.[childrenSlotKey])
      ) {
        elementJSON.slots[childrenSlotKey].push(plainTextComponent);
      } else {
        // fallback: create a children slot
        const s = uuid();
        elementJSON.props.children = { type: "slot", slot: s };
        elementJSON.slots = {
          ...(elementJSON.slots || {}),
          [s]: [plainTextComponent],
        };
      }
    } else {
      // for other components, set props.text
      const combined = previousValue
        ? previousValue + " " + cleanText
        : cleanText;
      elementJSON.props = elementJSON.props || {};
      elementJSON.props.text = { type: "string", staticString: combined };
    }
  }

  /* ---------- Link / Button / Media handlers ---------- */
  function handleLinkElement(el, elementJSON) {
    if (!el || el.tagName !== "A") return;
    const href = el.getAttribute("href") || "";
    const target = el.getAttribute("target") || "";
    const rel = el.getAttribute("rel") || "";
    const text = (el.textContent || "").trim();

    elementJSON.props.href = { type: "string", staticString: href };
    elementJSON.props.label = { type: "string", staticString: text };
    if (target)
      elementJSON.props.target = { type: "string", staticString: target };
    if (rel) elementJSON.props.rel = { type: "string", staticString: rel };

    elementJSON.metadata = elementJSON.metadata || {};
    elementJSON.metadata.linkInfo = {
      href,
      target: target || "_self",
      rel: rel || "",
      isExternal: /^https?:\/\//i.test(href),
      isInternal: href.startsWith("#"),
      isEmail: href.startsWith("mailto:"),
      isPhone: href.startsWith("tel:"),
      textContent: text,
    };
  }

  function handleButtonElement(el, elementJSON) {
    if (!el || el.tagName !== "BUTTON") return;
    const text = (getFullTextContent(el) || "").trim();
    elementJSON.props.label = { type: "string", staticString: text };
  }

  function handleImageElement(el, elementJSON) {
    if (!el || el.tagName !== "IMG") return;
    try {
      const abs = new URL(el.src, window.location.href).href;
      const alt = el.getAttribute("alt") || "";
      elementJSON.props.src = { type: "imageUrl", staticString: abs };
      elementJSON.props.alt = { type: "string", staticString: alt };
      elementJSON.metadata = elementJSON.metadata || {};
      elementJSON.metadata.mediaInfo = {
        type: "image",
        src: abs,
        alt,
        dimensions: {
          width: el.naturalWidth || el.width,
          height: el.naturalHeight || el.height,
        },
        loading: el.loading || "eager",
        decoding: el.decoding || "auto",
      };
    } catch (e) {
      warn("handleImageElement", e);
    }
  }

  function handleVideoElement(el, elementJSON) {
    if (!el || el.tagName !== "VIDEO") return;
    try {
      const sources = Array.from(el.querySelectorAll("source")).map((s) => ({
        src: s.getAttribute("src"),
        type: s.getAttribute("type"),
        media: s.getAttribute("media"),
      }));
      elementJSON.attrs = elementJSON.attrs || {};
      if (sources[0]) {
        elementJSON.attrs.src = sources[0].src;
        elementJSON.attrs.type = sources[0].type;
      }
      elementJSON.metadata = elementJSON.metadata || {};
      elementJSON.metadata.mediaInfo = {
        type: "video",
        sources,
        controls: el.hasAttribute("controls"),
        autoplay: el.hasAttribute("autoplay"),
        muted: el.hasAttribute("muted"),
        loop: el.hasAttribute("loop"),
        poster: el.getAttribute("poster"),
      };
    } catch (e) {
      warn("handleVideoElement", e);
    }
  }

  /* ---------- SVG to base64 (safe-ish) ---------- */
  async function convertSVGToBase64(el) {
    try {
      const svg = el.outerHTML || el.innerHTML || "";
      return (
        "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg)))
      );
    } catch (e) {
      warn("convertSVGToBase64", e);
      return "";
    }
  }

  /* ---------- Component name resolver ---------- */
  function getComponentName(el) {
    if (!el || !el.tagName) return "box";
    const tag = el.tagName.toLowerCase();
    if (TAG_MAP[tag]) {
      // special case: anchor with children => link-container vs link
      if (tag === "a") {
        return el.children && el.children.length ? "link-container" : "link";
      }
      if (tag === "div") {
        // fallback for div: if text-only -> text, otherwise use computed style
        const hasOnlyText =
          el.children.length === 0 && (el.textContent || "").trim();
        if (hasOnlyText) return "text";
      }
      return TAG_MAP[tag];
    }
    // default heuristics
    const hasOnlyText =
      el.children.length === 0 && (el.textContent || "").trim();
    if (hasOnlyText) return "text";

    const cs = getComputedStyleCached(el);
    if (cs && cs.display === "flex") {
      return cs.flexDirection === "column" ? "vstack" : "hstack";
    } else if (cs && cs.display === "grid") {
      return "box";
    }
    return "box";
  }

  /* ---------- Core recursive conversion ---------- */
  async function convertHTMLToComposableJSON(element, componentMappings = []) {
    try {
      if (!element || element.nodeType !== Node.ELEMENT_NODE) return null;
      if (element.tagName.toLowerCase() === "br") return null;

      // Check if element has a figma mapping
      const figmaNodeId =
        element.getAttribute && element.getAttribute("data-figma-id");
      let componentMapping = null;
      if (
        figmaNodeId &&
        Array.isArray(componentMappings) &&
        componentMappings.length
      ) {
        for (const m of componentMappings) {
          const found = (m.nodeIds || []).find((n) => n.nodeId === figmaNodeId);
          if (found) {
            componentMapping = {
              ...m,
              nodeId: found.nodeId,
              variantProperties: found.variantProperties,
            };
            break;
          }
        }
      }

      const componentName = getComponentName(element);
      const inline = getInlineStyles(element);
      const attrs = getElementAttributes(element);
      const className = attrs.className || "";

      const styleBlock = {
        default: {
          responsiveStyles: {
            default: inline,
            tablet: {},
            mobile: {},
          },
        },
      };

      // attach className into styles so Composable can apply CSS classes
      if (className) {
        styleBlock.default.responsiveStyles.default.className = className;
      }

      const elementJSON = {
        type: componentName,
        uid: uuid(),
        metadata: getElementMetadata(element),
        attrs,
        props: {},
        slots: {},
        styles: styleBlock,
      };

      // If mapping found, apply custom component details
      if (componentMapping && componentMapping.nodeId) {
        if (componentMapping.codeComponentName)
          elementJSON.type = componentMapping.codeComponentName;
        if (componentMapping.propMappings)
          elementJSON.props = {
            ...elementJSON.props,
            ...componentMapping.propMappings,
          };
        elementJSON.metadata.componentMapping = {
          figmaNodeId: componentMapping.nodeId,
          codeComponentName: componentMapping.codeComponentName,
          figmaComponentKey: componentMapping.figmaComponentKey,
          variantProperties: componentMapping.variantProperties || {},
        };
      }

      // html-element specific handling
      if (elementJSON.type === "html-element") {
        elementJSON.props.Tag = {
          type: "string",
          staticString: element.tagName.toLowerCase(),
        };

        const properties = [];
        const ATTRIBUTE_MAP = {
          "stroke-linecap": "strokeLinecap",
          "stroke-linejoin": "strokeLinejoin",
          "stroke-width": "strokeWidth",
          "fill-rule": "fillRule",
          "clip-rule": "clipRule",
          "for": "htmlFor",
          "tabindex": "tabIndex",
          "readonly": "readOnly",
          "maxlength": "maxLength",
          "colspan": "colSpan",
          "rowspan": "rowSpan",
        };
        
        // normalize attribute names for React
        for (const [k, v] of Object.entries(attrs)) {
          if (k === "className") continue;
        
          let reactKey;
          if (ATTRIBUTE_MAP[k]) {
            reactKey = ATTRIBUTE_MAP[k];
          } else if (k.includes("-") && !k.startsWith("data-") && !k.startsWith("aria-")) {
            // automatically camelCase other hyphenated keys
            reactKey = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          } else {
            reactKey = k;
          }
        
          properties.push({ Key: reactKey, Value: v });
        }
        
        
        if (properties.length) {
          const propsObject = {};
          for (const { Key, Value } of properties) propsObject[Key] = Value;
          elementJSON.props.properties = propsObject;
        }
        

        const tagName = elementJSON.props.Tag.staticString;

        // Define which SVG tags are self-closing / leaf nodes
        const svgLeafTags = new Set([
          "path",
          "circle",
          "rect",
          "line",
          "polygon",
          "polyline",
          "ellipse",
          "defs",
          "clipPath",
          "mask",
          "pattern",
        ]);

        // Create slot for SVG container tags only if they have child elements
        if ((tagName === "svg" || tagName === "g") && element.children.length > 0) {
          const childrenSlot = uuid();
          elementJSON.props.children = { type: "slot", slot: childrenSlot };
          elementJSON.slots[childrenSlot] = [];
        }
        // For non-SVG tags, keep the normal slot creation behavior only if children exist
        else if (!svgLeafTags.has(tagName) && element.children.length > 0) {
          const childrenSlot = uuid();
          elementJSON.props.children = { type: "slot", slot: childrenSlot };
          elementJSON.slots[childrenSlot] = [];
        }

      }

      // header handling (h1..h6)
      if (elementJSON.type === "header") {
        elementJSON.props.Tag = {
          type: "string",
          staticString: element.tagName.toLowerCase(),
        };
        const properties = [];
        for (const [k, v] of Object.entries(attrs)) {
          if (k === "className") continue;
          properties.push({ Key: k, Value: v });
        }
        if (properties.length)
          elementJSON.props.properties = {
            type: "array",
            staticArray: properties,
          };
      }

      // If this is a media element, handle and early-return
      if (MEDIA_TAGS.has(element.tagName)) {
        handleImageElement(element, elementJSON);
        handleVideoElement(element, elementJSON);
        return elementJSON;
      }

      // Special-case RTE components: capture innerHTML as html prop
      if (HTML_RTE_COMPONENTS.has(elementJSON.type)) {
        elementJSON.props.html = {
          type: "string",
          staticString: element.innerHTML,
        };
        return elementJSON;
      }

      // Children traversal
      const childNodes = Array.from(element.childNodes || []);
      const childrenResults = [];
      const hasBR = childNodes.some(
        (n) => n.nodeName && n.nodeName.toLowerCase() === "br"
      );

      // convenience: if element is a div with only text content
      if (
        element.tagName.toLowerCase() === "div" &&
        childNodes.length === 0 &&
        element.textContent
      ) {
        const txt = getFullTextContent(element);
        const childJSON = {
          type: "text",
          uid: uuid(),
          metadata: getElementMetadata(element),
          attrs: {},
          props: {},
          slots: {},
          styles: {
            default: { responsiveStyles: styleBlock.default.responsiveStyles },
          },
        };
        if (txt) handleTextNodeContent(txt, childJSON);
        if (
          childJSON.props &&
          (childJSON.props.text ||
            (childJSON.slots && Object.keys(childJSON.slots).length))
        ) {
          childrenResults.push(childJSON);
        }
      } else if (hasBR && !HTML_RTE_COMPONENTS.has(elementJSON.type)) {
        // handle line-break heavy content: flatten text nodes into components
        const wrapper = {
          type: componentName,
          uid: uuid(),
          metadata: getElementMetadata(element),
          attrs: {},
          props: {},
          slots: {},
          styles: {
            default: { responsiveStyles: styleBlock.default.responsiveStyles },
          },
        };

        for (let i = 0; i < childNodes.length; i++) {
          const node = childNodes[i];
          if (node.nodeName && node.nodeName.toLowerCase() === "br") continue;
          if (node.nodeType === Node.TEXT_NODE) {
            const txt = getFullTextContent(element);
            handleTextNodeContent(
              txt,
              wrapper,
              wrapper.props?.text?.staticString
            );
            // push wrapper only when next node is not text/br to avoid duplication
            if (
              childNodes[i + 1] &&
              childNodes[i + 1].nodeType !== Node.TEXT_NODE &&
              childNodes[i + 1].nodeName !== "BR"
            ) {
              childrenResults.push(wrapper);
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const c = await convertHTMLToComposableJSON(
              node,
              componentMappings
            );
            if (c) childrenResults.push(c);
          }
        }
      } else {
        // Normal traversal
        for (let i = 0; i < childNodes.length; i++) {
          const node = childNodes[i];

          // skip noscript fallback content
          if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName === "NOSCRIPT"
          ) {
            log("Skipping NOSCRIPT");
            continue;
          }

          if (node.nodeType === Node.TEXT_NODE) {
            if (element.tagName.toLowerCase() !== "a") {
              const txt = getFullTextContent(element);
              handleTextNodeContent(txt, elementJSON);
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            const c = await convertHTMLToComposableJSON(
              node,
              componentMappings
            );
            if (c) childrenResults.push(c);
          }
        }
      }

      // post-processing for specific tags
      if (element.tagName.toLowerCase() === "button")
        handleButtonElement(element, elementJSON);
      if (element.tagName.toLowerCase() === "a")
        handleLinkElement(element, elementJSON);

      // attach children into slot only if non-empty, else clean up
      if (childrenResults && childrenResults.length > 0) {
        const slotId = uuid();
        elementJSON.props = elementJSON.props || {};
        elementJSON.props.children = { type: "slot", slot: slotId };
        elementJSON.slots = { [slotId]: childrenResults };
      } else {
        // remove any pre-created empty slots (SVG, html-element, etc.)
        if (elementJSON.slots) {
          for (const [slotId, arr] of Object.entries(elementJSON.slots)) {
            if (!arr || arr.length === 0) delete elementJSON.slots[slotId];
          }
        }
      }


      return elementJSON;
    } catch (e) {
      warn("convertHTMLToComposableJSON error", e);
      return null;
    }
  }

  /* ---------- StyleSheet component creator ---------- */
  function createStyleSheetComponent(cssContent) {
    return {
      type: "style-sheet",
      uid: uuid(),
      metadata: {
        title: "Page Styles",
        sourceInfo: {
          tagName: "style-sheet",
          id: "page-styles",
          className: null,
          dataAttributes: {},
          position: { index: 0, parentType: "page", siblingCount: 2 },
        },
        elementPath: "style-sheet",
        contentPreview: "CSS styles extracted from page",
      },
      attrs: {},
      props: { styles: { type: "string", staticString: cssContent } },
      slots: {},
      styles: {
        default: { responsiveStyles: { default: {}, tablet: {}, mobile: {} } },
      },
    };
  }

  /* ---------- Page wrapper + root creation ---------- */
  function makeRootWithStyles(bodyJSON, cssContent) {
    const rootUID = uuid();
    const childrenSlotUID = uuid();
    return {
      type: "box",
      uid: rootUID,
      metadata: {
        title: "Page Root with Styles",
        sourceInfo: {
          tagName: "root",
          id: "page-root",
          className: null,
          dataAttributes: {},
          position: { index: 0, parentType: "page", siblingCount: 1 },
        },
        elementPath: "root",
        contentPreview: "Root container with StyleSheet",
      },
      attrs: {},
      props: { children: { type: "slot", slot: childrenSlotUID } },
      slots: {
        [childrenSlotUID]: [createStyleSheetComponent(cssContent), bodyJSON],
      },
      styles: {
        default: { responsiveStyles: { default: {}, tablet: {}, mobile: {} } },
      },
    };
  }

  /* ---------- Page conversion orchestration ---------- */
  async function waitForReactToLoad(timeoutMs = 3000) {
    return new Promise((resolve) => {
      let resolved = false;
      const start = Date.now();

      function check() {
        try {
          const reactRoot =
            document.querySelector("#root") ||
            document.querySelector("[data-reactroot]");
          const hasReactContent = !!(
            document.querySelector(".app") ||
            document.querySelector(".main-content")
          );
          if (reactRoot && hasReactContent) {
            if (!resolved) {
              resolved = true;
              log("React content detected");
              resolve();
            }
            return;
          }

          const bodyChildren = Array.from(document.body.children || []);
          const hasReal = bodyChildren.some(
            (child) =>
              child.tagName !== "NOSCRIPT" &&
              (child.textContent || "").trim() &&
              !/enable JavaScript/i.test(child.textContent)
          );
          if (hasReal) {
            if (!resolved) {
              resolved = true;
              log("Real content detected");
              resolve();
            }
            return;
          }

          if (Date.now() - start > timeoutMs) {
            if (!resolved) {
              resolved = true;
              log("Timeout waiting for React");
              resolve();
            }
            return;
          }

          setTimeout(check, 100);
        } catch (e) {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        }
      }

      check();
    });
  }

  async function convertPageToJSON(options = {}) {
    log("Starting conversion with StyleSheet support...");
    const t0 = performance.now();
    try {
      await waitForReactToLoad();

      if (!document.body) throw new Error("No body element found");

      log("Extracting CSS...");
      const cssContent = extractAllCSS();
      log(`Extracted CSS length: ${cssContent.length}`);

      log("Converting body DOM to JSON...");
      const bodyJSON = await convertHTMLToComposableJSON(
        document.body,
        options.componentMappings || []
      );
      if (!bodyJSON) throw new Error("Failed to convert body element");

      const root = makeRootWithStyles(bodyJSON, cssContent);
      const t1 = performance.now();
      log(`Conversion done in ${Math.round(t1 - t0)}ms`);
      return root;
    } catch (e) {
      err("Conversion failed", e);
      throw e;
    }
  }

  /* ---------- Download helper ---------- */
  function downloadJSON(jsonData, filename = "page-conversion.json") {
    try {
      const str = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([str], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      // append to DOM for iOS compat sometimes
      document.body.appendChild(link);
      link.click();
      link.remove();
      log("Downloaded:", filename);
    } catch (e) {
      warn("downloadJSON failed", e);
    }
  }

  function getPageRoute() {
    try {
      const u = new URL(window.location.href);
      const host = u.hostname + (u.port ? `_${u.port}` : "");
      let path = (u.pathname || "").replace(/^\/+|\/+$/g, "");
      if (!path) path = "root";
      let full = `${host}_${path}`
        .replace(/[_\s]+/g, "_")
        .replace(/[^a-zA-Z0-9_\-]/g, "");
      if (/^\d/.test(full)) full = "page_" + full;
      return full;
    } catch (e) {
      warn("getPageRoute", e);
      return "page-conversion";
    }
  }

  async function convertAndDownload(options = {}) {
    try {
      const result = await convertPageToJSON(options);
      const ts = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `${getPageRoute()}-${ts}-with-stylesheet.json`;
      downloadJSON(result, filename);
      return result;
    } catch (e) {
      err("convertAndDownload failed", e);
      throw e;
    }
  }

  async function convertAndSendToStudio(options = {}, targetOrigin = "*") {
    try {
      const result = await convertPageToJSON(options);
      // store for later requests
      lastConversionResult = result;

      // debug pre-download (non-blocking)
      try {
        const ts = new Date().toISOString().replace(/[:.]/g, "-");
        downloadJSON(result, `${getPageRoute()}-${ts}-studio-stylesheet.json`);
      } catch (e) {
        warn("debug download failed", e);
      }

      // Send to parent window
      window.parent.postMessage(
        { type: "html-to-json-response", data: result },
        targetOrigin || "*"
      );
      log("Sent JSON to parent");
      return result;
    } catch (e) {
      err("convertAndSendToStudio failed", e);
      window.parent.postMessage(
        { type: "html-to-json-error", error: e.message },
        targetOrigin || "*"
      );
    }
  }

  /* ---------- Message listener for Studio requests ---------- */
  let lastConversionResult = null;
  window.addEventListener("message", (event) => {
    try {
      if (!ORIGINS_ALLOWED.has(event.origin)) return;
      if (!event.data || typeof event.data !== "object") return;

      if (event.data.type === "request-html-to-json") {
        log("Received request-html-to-json from", event.origin);
        if (lastConversionResult) {
          window.parent.postMessage(
            { type: "html-to-json-response", data: lastConversionResult },
            event.origin
          );
        } else {
          convertAndSendToStudio(event.data.options || {}, event.origin);
        }
      }
    } catch (e) {
      warn("message handler error", e);
    }
  });

  /* ---------- Expose public API ---------- */
  window.BrowserConverterWithStyleSheet = {
    convertPageToJSON,
    downloadJSON,
    convertAndDownload,
    convertAndSendToStudio,
    extractAllCSS,
    utils: {
      uuid,
      getElementAttributes,
      getInlineStyles,
      getElementMetadata,
      getElementPath,
      getFullTextContent,
      convertSVGToBase64,
    },
  };

  log("✅ BrowserConverterWithStyleSheet loaded (injection mode)");
  log("Usage: await BrowserConverterWithStyleSheet.convertAndDownload();");
})();
