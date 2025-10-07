# Wanderlust Adventures - Travel Booking Platform

A beautiful, responsive travel booking platform built with React and SCSS. This application showcases various travel packages from around the world without any CMS integration - all data is managed locally.

## Features

- 🏠 **Home Page** with hero section, featured packages, and popular destinations
- 📦 **Packages Listing** with advanced filtering (category, destination, price, duration)
- 🔍 **Package Details** with complete itinerary, highlights, and booking information
- ℹ️ **About Page** with company information and team details
- 📞 **Contact Page** with contact information and inquiry form
- 📱 **Fully Responsive** design for all screen sizes
- 🎨 **Modern UI** with smooth animations and transitions
- ♿ **Accessible** components with proper ARIA labels

## Tech Stack

- **React** 18.2.0 with TypeScript
- **React Router** 6.20.0 for routing
- **SCSS** for styling with BEM methodology
- **No UI Libraries** - Pure custom CSS/SCSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3019/travel_home_page`

### Available Scripts

- `npm start` - Runs the app in development mode on port 3019
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## Project Structure

```
travel/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Header.scss
│   │   ├── Footer.tsx
│   │   ├── Footer.scss
│   │   ├── PackageCard.tsx
│   │   └── PackageCard.scss
│   ├── data/
│   │   └── travelData.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── HomePage.scss
│   │   ├── PackagesListingPage.tsx
│   │   ├── PackagesListingPage.scss
│   │   ├── PackageDetailPage.tsx
│   │   ├── PackageDetailPage.scss
│   │   ├── AboutPage.tsx
│   │   ├── AboutPage.scss
│   │   ├── ContactPage.tsx
│   │   └── ContactPage.scss
│   ├── styles/
│   │   ├── variables.scss
│   │   ├── mixins.scss
│   │   └── global.scss
│   ├── App.tsx
│   ├── index.tsx
│   └── react-app-env.d.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Routes

- `/` - Redirects to home page
- `/travel_home_page` - Home page with featured packages
- `/travel_packages_listing_page` - All packages with filters
- `/travel_packages/:slug` - Individual package details
- `/travel_about_page` - About the company
- `/travel_contact_page` - Contact information and form

## Customization

### Adding New Packages

Edit `src/data/travelData.ts` and add new package objects to the `travelPackages` array:

```typescript
{
  id: 'unique-id',
  title: 'Package Title',
  destination_city: 'City',
  destination_country: 'country_name',
  package_category: 'category',
  package_duration: 7,
  package_description: 'Description...',
  package_price: 2999,
  featured: true,
  url: 'package-url-slug',
  // ... other optional fields
}
```

### Styling

All styles are in SCSS files. Main configuration:
- `src/styles/variables.scss` - Colors, fonts, spacing
- `src/styles/mixins.scss` - Reusable SCSS mixins
- `src/styles/global.scss` - Global styles and utilities

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Author

Built with ❤️ for travel enthusiasts worldwide.

