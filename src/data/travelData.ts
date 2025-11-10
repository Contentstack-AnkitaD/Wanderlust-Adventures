export interface TravelPackage {
  id: string;
  title: string;
  destination_city: string;
  destination_country: string;
  package_category: string;
  package_duration: number;
  package_description: string;
  package_price: number;
  difficulty_level?: string;
  featured: boolean;
  url: string;
  image: string;
  highlights?: string[];
  included?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
}

export const travelPackages: TravelPackage[] = [
  {
    id: '1',
    title: 'Romantic Santorini Honeymoon Escape',
    destination_city: 'Santorini',
    destination_country: 'greece',
    package_category: 'romantic',
    package_duration: 7,
    package_description: 'Experience the breathtaking beauty of Santorini with stunning sunsets, luxurious accommodations, and intimate dining experiences. Perfect for honeymooners and couples.',
    package_price: 3499,
    difficulty_level: 'easy',
    featured: true,
    url: 'romantic_santorini_honeymoon_escape',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Private caldera view suite',
      'Sunset catamaran cruise',
      'Wine tasting at local vineyards',
      'Romantic dinners with sea views',
      'Couples spa treatments'
    ],
    included: ['Accommodation', 'Daily breakfast', 'Airport transfers', 'Selected tours', 'Travel insurance'],
    itinerary: [
      { day: 1, title: 'Arrival in Santorini', description: 'Arrive and settle into your luxury suite with caldera views. Welcome dinner at a cliffside restaurant.' },
      { day: 2, title: 'Island Exploration', description: 'Visit Oia village, explore art galleries, and watch the famous Santorini sunset.' },
      { day: 3, title: 'Wine & Dine', description: 'Private wine tasting tour visiting three local wineries with lunch included.' },
      { day: 4, title: 'Beach Day', description: 'Relax at Red Beach and Perissa Beach. Evening couples spa treatment.' },
      { day: 5, title: 'Catamaran Cruise', description: 'Full-day sunset cruise around the caldera with swimming and dinner on board.' },
      { day: 6, title: 'Free Day', description: 'Leisure day to explore at your own pace or relax at the hotel.' },
      { day: 7, title: 'Departure', description: 'Final breakfast and airport transfer.' }
    ]
  },
  {
    id: '2',
    title: 'Luxury Kyoto Cultural Immersion',
    destination_city: 'Kyoto',
    destination_country: 'japan',
    package_category: 'cultural',
    package_duration: 10,
    package_description: 'Immerse yourself in traditional Japanese culture with tea ceremonies, temple visits, and stays in authentic ryokans. Discover the ancient capital of Japan.',
    package_price: 4799,
    difficulty_level: 'easy',
    featured: true,
    url: 'luxury_kyoto_cultural_immersion',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Stay in traditional ryokan',
      'Private tea ceremony',
      'Geisha district tour',
      'Bamboo grove visit',
      'Temple meditation sessions'
    ],
    included: ['Accommodation', 'Daily breakfast & dinner', 'All tours', 'JR rail pass', 'English-speaking guide'],
    itinerary: [
      { day: 1, title: 'Welcome to Kyoto', description: 'Arrive and check into your traditional ryokan. Welcome kaiseki dinner.' },
      { day: 2, title: 'Eastern Temples', description: 'Visit Kiyomizu-dera and explore the historic Higashiyama district.' },
      { day: 3, title: 'Zen Experience', description: 'Morning meditation at a Zen temple, followed by a traditional tea ceremony.' },
      { day: 4, title: 'Arashiyama', description: 'Explore the famous bamboo groves and visit Tenryu-ji Temple.' },
      { day: 5, title: 'Geisha District', description: 'Evening tour of Gion with possible geisha sightings.' },
      { day: 6, title: 'Day Trip to Nara', description: 'Visit Nara to see the Great Buddha and feed the sacred deer.' },
      { day: 7, title: 'Northern Temples', description: 'Explore the Golden Pavilion and rock garden of Ryoan-ji.' },
      { day: 8, title: 'Fushimi Inari', description: 'Walk through thousands of vermillion torii gates.' },
      { day: 9, title: 'Craft Workshops', description: 'Participate in traditional crafts like pottery or kimono wearing.' },
      { day: 10, title: 'Departure', description: 'Final breakfast and transfer to airport.' }
    ]
  },
  {
    id: '3',
    title: 'Tropical Bali Retreat',
    destination_city: 'Ubud',
    destination_country: 'indonesia',
    package_category: 'wellness',
    package_duration: 8,
    package_description: 'Find your inner peace in Bali with yoga sessions, spa treatments, and visits to ancient temples. Experience the perfect blend of relaxation and culture.',
    package_price: 2299,
    difficulty_level: 'easy',
    featured: true,
    url: 'tropical_bali_retreat',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Daily yoga sessions',
      'Balinese spa treatments',
      'Rice terrace tours',
      'Temple visits',
      'Healthy organic meals'
    ],
    included: ['Resort accommodation', 'All meals', 'Yoga classes', 'Spa treatments', 'Selected tours'],
    itinerary: [
      { day: 1, title: 'Arrival & Welcome', description: 'Arrive in Bali and transfer to your wellness resort in Ubud.' },
      { day: 2, title: 'Yoga & Temples', description: 'Morning yoga class followed by visit to Tirta Empul water temple.' },
      { day: 3, title: 'Rice Terrace Trek', description: 'Guided walk through Tegalalang rice terraces.' },
      { day: 4, title: 'Spa Day', description: 'Full day of Balinese spa treatments and relaxation.' },
      { day: 5, title: 'Cultural Experience', description: 'Visit local villages and attend a traditional dance performance.' },
      { day: 6, title: 'Beach Day', description: 'Day trip to Seminyak beach for relaxation and sunset.' },
      { day: 7, title: 'Wellness Activities', description: 'Meditation, yoga, and healthy cooking class.' },
      { day: 8, title: 'Departure', description: 'Final yoga session and airport transfer.' }
    ]
  },
  {
    id: '4',
    title: 'Adventure Patagonia Trek',
    destination_city: 'El Calafate',
    destination_country: 'argentina',
    package_category: 'adventure',
    package_duration: 12,
    package_description: 'Embark on an unforgettable journey through Patagonia with glacier hiking, mountain trekking, and wildlife spotting in one of the world\'s most spectacular landscapes.',
    package_price: 5499,
    difficulty_level: 'challenging',
    featured: true,
    url: 'adventure_patagonia_trek',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Perito Moreno Glacier walk',
      'Torres del Paine trekking',
      'Wildlife photography',
      'Camping under stars',
      'Kayaking in glacial lakes'
    ],
    included: ['Accommodation & camping gear', 'All meals', 'Expert guides', 'Park fees', 'Equipment rental']
  },
  {
    id: '5',
    title: 'Paris City Break',
    destination_city: 'Paris',
    destination_country: 'france',
    package_category: 'city_break',
    package_duration: 5,
    package_description: 'Discover the romance and elegance of Paris with visits to iconic landmarks, world-class museums, and exquisite French cuisine.',
    package_price: 2199,
    difficulty_level: 'easy',
    featured: false,
    url: 'paris_city_break',
    image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Eiffel Tower visit',
      'Louvre Museum tour',
      'Seine River cruise',
      'French cuisine tasting',
      'Montmartre exploration'
    ],
    included: ['Hotel accommodation', 'Daily breakfast', 'Museum passes', 'Metro pass', 'City tour']
  },
  {
    id: '6',
    title: 'Tokyo Cultural Tour',
    destination_city: 'Tokyo',
    destination_country: 'japan',
    package_category: 'cultural',
    package_duration: 6,
    package_description: 'Experience the perfect blend of ancient traditions and cutting-edge technology in Japan\'s vibrant capital city.',
    package_price: 3299,
    difficulty_level: 'easy',
    featured: false,
    url: 'tokyo_cultural_tour',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Tsukiji fish market',
      'Senso-ji Temple',
      'Robot restaurant show',
      'Mt. Fuji day trip',
      'Shibuya crossing experience'
    ],
    included: ['Hotel accommodation', 'Daily breakfast', 'JR pass', 'Guided tours', 'Welcome dinner']
  },
  {
    id: '7',
    title: 'Rome Architectural Wonders',
    destination_city: 'Rome',
    destination_country: 'italy',
    package_category: 'historical',
    package_duration: 6,
    package_description: 'Walk through thousands of years of history in the Eternal City. Explore ancient ruins, Renaissance art, and indulge in authentic Italian cuisine.',
    package_price: 2499,
    difficulty_level: 'moderate',
    featured: false,
    url: 'rome_architectural_wonders',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Colosseum & Roman Forum',
      'Vatican Museums & Sistine Chapel',
      'Trevi Fountain',
      'Food tour in Trastevere',
      'Cooking class'
    ],
    included: ['Central hotel', 'Daily breakfast', 'Skip-the-line tickets', 'Food tour', 'Cooking class']
  },
  {
    id: '8',
    title: 'London Historical Journey',
    destination_city: 'London',
    destination_country: 'united_kingdom',
    package_category: 'historical',
    package_duration: 5,
    package_description: 'Explore the rich history and vibrant culture of London, from royal palaces to world-famous museums and traditional British experiences.',
    package_price: 2799,
    difficulty_level: 'easy',
    featured: false,
    url: 'london_historical_journey',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Tower of London',
      'Buckingham Palace',
      'British Museum',
      'West End theater show',
      'Thames River cruise'
    ],
    included: ['Hotel accommodation', 'Daily breakfast', 'Oyster card', 'Theater ticket', 'Walking tours']
  },
  {
    id: '9',
    title: 'New York Shopping Trip',
    destination_city: 'New York',
    destination_country: 'united_states',
    package_category: 'shopping',
    package_duration: 4,
    package_description: 'Shop till you drop in the fashion capital of America with visits to iconic stores, outlet malls, and exclusive boutiques.',
    package_price: 2999,
    difficulty_level: 'easy',
    featured: false,
    url: 'new_york_shopping_trip',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Fifth Avenue shopping',
      'Woodbury Outlets',
      'SoHo boutiques',
      'Personal shopper service',
      'Broadway show'
    ],
    included: ['Manhattan hotel', 'Daily breakfast', 'Shopping guide', 'Transportation', 'Theater ticket']
  },
  {
    id: '10',
    title: 'Cultural Marrakech Experience',
    destination_city: 'Marrakech',
    destination_country: 'morocco',
    package_category: 'cultural',
    package_duration: 7,
    package_description: 'Immerse yourself in the exotic sights, sounds, and flavors of Morocco with visits to souks, palaces, and the Sahara desert.',
    package_price: 1899,
    difficulty_level: 'moderate',
    featured: true,
    url: 'cultural_marrakech_experience',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Jemaa el-Fnaa square',
      'Sahara desert overnight',
      'Riad accommodation',
      'Cooking class',
      'Hammam spa experience'
    ],
    included: ['Riad accommodation', 'Daily breakfast & dinner', 'Desert tour', 'Cooking class', 'All transfers']
  },
  {
    id: '11',
    title: 'Vietnam Heritage Discovery',
    destination_city: 'Ho Chi Minh City',
    destination_country: 'vietnam',
    package_category: 'cultural',
    package_duration: 9,
    package_description: 'Discover the rich history and vibrant culture of Vietnam from bustling Ho Chi Minh City to the serene beauty of Ha Long Bay, with authentic cuisine and historical insights.',
    package_price: 2599,
    difficulty_level: 'moderate',
    featured: true,
    url: 'vietnam_heritage_discovery',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Ha Long Bay cruise',
      'Cu Chi Tunnels exploration',
      'Mekong Delta boat tour',
      'Street food tours',
      'Traditional water puppet show'
    ],
    included: ['Hotel accommodation', 'Daily breakfast', 'Domestic flights', 'All tours & transfers', 'English-speaking guide'],
    itinerary: [
      { day: 1, title: 'Arrival in Ho Chi Minh City', description: 'Arrive and explore the vibrant city center. Welcome dinner with traditional Vietnamese cuisine.' },
      { day: 2, title: 'City & History Tour', description: 'Visit War Remnants Museum, Reunification Palace, and Cu Chi Tunnels.' },
      { day: 3, title: 'Mekong Delta Adventure', description: 'Full-day boat tour through the Mekong Delta with local village visits.' },
      { day: 4, title: 'Flight to Hanoi', description: 'Morning flight to Hanoi. Afternoon walking tour of Old Quarter.' },
      { day: 5, title: 'Hanoi Cultural Experience', description: 'Visit Temple of Literature, Hoan Kiem Lake, and enjoy water puppet show.' },
      { day: 6, title: 'Ha Long Bay Cruise', description: 'Transfer to Ha Long Bay for overnight cruise with cave exploration.' },
      { day: 7, title: 'Ha Long Bay & Return', description: 'Morning activities on the bay, return to Hanoi in afternoon.' },
      { day: 8, title: 'Hoi An Day Trip', description: 'Day trip to ancient town of Hoi An with lantern festival experience.' },
      { day: 9, title: 'Departure', description: 'Final breakfast and airport transfer.' }
    ]
  },
  {
    id: '12',
    title: 'Iceland Northern Lights Adventure',
    destination_city: 'Reykjavik',
    destination_country: 'iceland',
    package_category: 'adventure',
    package_duration: 8,
    package_description: 'Experience the magical beauty of Iceland with Northern Lights viewing, geothermal spas, dramatic waterfalls, and glacier adventures in the land of fire and ice.',
    package_price: 3899,
    difficulty_level: 'moderate',
    featured: true,
    url: 'iceland_northern_lights_adventure',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop&auto=format',
    highlights: [
      'Northern Lights hunting tours',
      'Blue Lagoon geothermal spa',
      'Golden Circle sightseeing',
      'Glacier hiking experience',
      'Dramatic waterfalls tour'
    ],
    included: ['Hotel accommodation', 'Daily breakfast', 'All tours & transfers', 'Winter gear rental', 'Expert Northern Lights guide'],
    itinerary: [
      { day: 1, title: 'Arrival in Reykjavik', description: 'Arrive in Iceland and explore colorful Reykjavik city center. Welcome dinner with traditional Icelandic cuisine.' },
      { day: 2, title: 'Golden Circle Tour', description: 'Visit Thingvellir National Park, Geysir geothermal area, and mighty Gullfoss waterfall.' },
      { day: 3, title: 'South Coast Adventure', description: 'Explore Seljalandsfoss and Skógafoss waterfalls, black sand beaches of Reynisfjara.' },
      { day: 4, title: 'Glacier Hiking', description: 'Guided glacier walk on Sólheimajökull glacier with professional equipment and instruction.' },
      { day: 5, title: 'Blue Lagoon & Northern Lights', description: 'Relax in the famous Blue Lagoon geothermal spa. Evening Northern Lights hunting tour.' },
      { day: 6, title: 'Snæfellsnes Peninsula', description: 'Day trip to the mystical Snæfellsnes Peninsula, visiting Kirkjufell mountain and charming fishing villages.' },
      { day: 7, title: 'Reykjavik Culture & Northern Lights', description: 'Explore Reykjavik museums and local culture. Final Northern Lights viewing opportunity.' },
      { day: 8, title: 'Departure', description: 'Final breakfast and transfer to Keflavik Airport.' }
    ]
  }
];

export const homePageData = {
  hero_title: 'Discover Your Next International Adventure',
  hero_subtitle: 'From hidden gems to iconic destinations, let us guide you to the world\'s most captivating international experiences',
  cta_text: 'Explore Packages',
  featured_packages_title: 'Featured Destinations',
  popular_destinations_title: 'Popular Destinations'
};

export const aboutPageData = {
  title: 'About Wanderlust Adventures',
  about_content: `Welcome to Wanderlust Adventures, your trusted partner in creating unforgettable travel experiences since 2005.

We believe that travel is more than just visiting new places – it's about immersing yourself in different cultures, creating lasting memories, and discovering new perspectives. Our team of experienced travel experts works tirelessly to curate exceptional journeys that cater to every type of traveler.

From romantic getaways to adventurous expeditions, cultural explorations to relaxing retreats, we offer a diverse range of travel packages designed to inspire and delight. Every itinerary is carefully crafted with attention to detail, ensuring seamless experiences from start to finish.`,
  mission_statement: 'To inspire and enable travelers to explore the world with confidence, creating transformative experiences that broaden horizons and foster global understanding.',
  years_experience: 18,
  team_description: `Our team consists of passionate travel enthusiasts who have explored over 150 countries collectively. Each member brings unique expertise and local knowledge to help you discover hidden gems and authentic experiences.

We work closely with trusted partners worldwide to ensure the highest standards of service, safety, and sustainability in all our travel offerings.`
};

export const contactPageData = {
  title: 'Get In Touch',
  contact_email: 'hello@wanderlust-adventures.com',
  contact_phone: '+1 (555) 123-4567',
  office_address: `123 Travel Lane
Suite 456
New York, NY 10001
United States`,
  business_hours: `Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 4:00 PM
Sunday: Closed`,
  emergency_contact: '+1 (555) 999-8888'
};

export const headerData = {
  logo_text: 'Wanderlust Adventures',
  nav_home_label: 'Home',
  nav_packages_label: 'Packages',
  nav_about_label: 'About',
  nav_contact_label: 'Contact'
};

export const footerData = {
  company_name: 'Wanderlust Adventures',
  quick_links_home_label: 'Home',
  quick_links_packages_label: 'Packages',
  contact_email: 'hello@wanderlust-adventures.com',
  contact_phone: '+1 (555) 123-4567',
  copyright_text: `© ${new Date().getFullYear()} Wanderlust Adventures. All rights reserved.`
};

