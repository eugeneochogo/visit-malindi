const photos = {
  hero: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85",
  dhow: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=82",
  ocean: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=82",
  sunset: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=82",
  mangrove: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=82",
  ruins: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=82",
  beach: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=82",
  dining: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=82",
  night: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=82",
  family: "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1000&q=82",
};

export const navItems = [
  { label: "Explore", path: "/things-to-do" },
  { label: "Stay", path: "/places-to-stay" },
  { label: "Eat & Drink", path: "/eat-and-drink" },
  { label: "Nightlife", path: "/nightlife" },
  { label: "Transfers", path: "/transfers" },
  { label: "Places to Visit", path: "/places-to-visit" },
  { label: "Itineraries", path: "/itineraries" },
  { label: "What's On", path: "/whats-on" },
];

export const exploreCategories = [
  { title: "Things to Do", text: "Marine experiences, adventure, nature and culture.", path: "/things-to-do", image: photos.ocean, tone: "teal" },
  { title: "Where to Stay", text: "Hotels, resorts, villas, apartments and guesthouses.", path: "/places-to-stay", image: photos.beach, tone: "sand" },
  { title: "Eat & Drink", text: "Restaurants, cafés, beach dining and bars.", path: "/eat-and-drink", image: photos.dining, tone: "coral" },
  { title: "Nightlife", text: "Clubs, lounges, DJs, live music and beach parties.", path: "/nightlife", image: photos.night, tone: "ink" },
  { title: "Transfers", text: "Airport, SGR, Mombasa, Watamu and private transport.", path: "/transfers", image: photos.dhow, tone: "sky" },
  { title: "Places to Visit", text: "Beaches, history, nature and attractions.", path: "/places-to-visit", image: photos.ruins, tone: "olive" },
];

const experienceEntries = [
  {
    id: "malindi-marine-park",
    slug: "malindi-marine-park",
    name: "Malindi Marine Park",
    category: "Marine",
    location: "Malindi",
    duration: "Half day",
    image: photos.ocean,
    description: "Clear water, reef life and a different view of the coast. Ask Visit Malindi about current marine experiences and local options.",
    highlights: ["Indian Ocean", "Marine life", "Boat and water experiences"],
    featured: true,
  },
  {
    id: "mida-creek-sunset",
    slug: "mida-creek-sunset",
    name: "Mida Creek at Sunset",
    category: "Nature",
    location: "Watamu",
    duration: "Sunset",
    image: photos.mangrove,
    description: "Slow down among mangroves and wide tidal horizons. A beautiful way to experience the Watamu side of the coast.",
    highlights: ["Mangrove waterways", "Golden-hour views", "Nature and local culture"],
    featured: true,
  },
  {
    id: "gede-ruins",
    slug: "gede-ruins",
    name: "Gede Ruins",
    category: "History & Culture",
    location: "Near Watamu",
    duration: "Half day",
    image: photos.ruins,
    description: "Walk through the atmospheric remains of a historic Swahili settlement surrounded by coastal forest.",
    highlights: ["Swahili heritage", "Forest setting", "History"],
    featured: true,
  },
  {
    id: "dhow-sailing",
    slug: "dhow-sailing",
    name: "Dhow Sailing",
    category: "Marine",
    location: "Malindi & Watamu",
    duration: "Ask for options",
    image: photos.dhow,
    description: "See the coastline from the water aboard a traditional dhow. Visit Malindi can help you find the right experience for your day.",
    highlights: ["Traditional dhow", "Ocean views", "Sunset possibilities"],
    featured: true,
  },
  {
    id: "horse-riding",
    slug: "horse-riding",
    name: "Horse Riding by the Coast",
    category: "Adventure",
    location: "Malindi area",
    duration: "Ask for options",
    image: photos.beach,
    description: "An unhurried coastal adventure for riders looking for a memorable way to explore the landscape.",
    highlights: ["Outdoor adventure", "Coastal scenery", "Flexible enquiry"],
    featured: false,
  },
  {
    id: "deep-sea-fishing",
    slug: "deep-sea-fishing",
    name: "Deep Sea Fishing",
    category: "Adventure",
    location: "Malindi",
    duration: "Ask for options",
    image: photos.ocean,
    description: "Ask about deep sea fishing options, current conditions and suitable trips for your group.",
    highlights: ["Open water", "Private enquiries", "Local guidance"],
    featured: false,
  },
];

const stayEntries = [
  {
    id: "beachfront-stays",
    slug: "beachfront-stays",
    name: "Beachfront stays in Malindi",
    category: "Beach Resort",
    location: "Malindi",
    image: photos.beach,
    description: "Wake up close to the Indian Ocean. Tell us your dates, group and preferred feel, and we will help you explore suitable beachfront options.",
    amenities: ["Beach access", "Relaxed coastal setting", "Options for couples and families"],
  },
  {
    id: "boutique-stays",
    slug: "boutique-stays",
    name: "Boutique stays",
    category: "Boutique Hotel",
    location: "Malindi",
    image: photos.sunset,
    description: "Smaller, characterful places to stay for travellers who want a more personal base in Malindi.",
    amenities: ["Local character", "Personalised recommendations", "Central coastal location"],
  },
  {
    id: "family-stays",
    slug: "family-stays",
    name: "Family-friendly stays",
    category: "Family Stay",
    location: "Malindi & Watamu",
    image: photos.family,
    description: "A starting point for finding the right space for a family holiday, from easy beach days to a base for exploring.",
    amenities: ["Family-friendly options", "Flexible locations", "Local trip support"],
  },
];

const foodEntries = [
  { id: "seafood", slug: "seafood", name: "Seafood on the coast", category: "Seafood", location: "Malindi & Watamu", image: photos.dining, description: "From the catch of the day to relaxed beach dining, ask a local where to eat seafood tonight." },
  { id: "swahili-food", slug: "swahili-food", name: "Swahili flavours", category: "Local food", location: "Malindi", image: photos.dining, description: "Discover the spices, textures and generous spirit of coastal Swahili cooking." },
  { id: "cafes", slug: "cafes", name: "Cafés & slow mornings", category: "Café", location: "Malindi", image: photos.beach, description: "Easy places for coffee, a quiet breakfast or a break between beach plans." },
  { id: "romantic-dining", slug: "romantic-dining", name: "Romantic dining", category: "Romantic Dining", location: "Malindi & Watamu", image: photos.sunset, description: "Make an evening of it with a table, a sunset and the sea nearby." },
];

const nightlifeEntries = [
  { id: "clubs-djs", slug: "clubs-djs", name: "Clubs & DJs", category: "DJ", location: "Malindi", image: photos.night, description: "Find the energy after dark, from weekend parties to late-night DJ sets." },
  { id: "beach-lounges", slug: "beach-lounges", name: "Bars & beach lounges", category: "Lounge", location: "Malindi & Watamu", image: photos.sunset, description: "Cocktails, sea air and the kind of evening that can go wherever the night takes you." },
  { id: "live-music", slug: "live-music", name: "Live music", category: "Live Music", location: "Malindi", image: photos.night, description: "Ask what is playing tonight, from acoustic sets to local artists and bands." },
  { id: "beach-parties", slug: "beach-parties", name: "Beach parties", category: "Beach Party", location: "Malindi & Watamu", image: photos.beach, description: "Sunset parties, special events and nights with sand beneath your feet." },
];

const transferEntries = [
  { id: "mombasa-airport-malindi", slug: "mombasa-airport-to-malindi", route: "Mombasa Airport → Malindi", category: "Airport Transfer", vehicle: "Private vehicle", location: "Mombasa to Malindi", image: photos.dhow, description: "Start your coast trip smoothly with a private transfer enquiry from Mombasa Airport to Malindi." },
  { id: "mombasa-sgr-malindi", slug: "sgr-to-malindi", route: "Mombasa SGR → Malindi", category: "SGR Transfer", vehicle: "Private vehicle", location: "Mombasa to Malindi", image: photos.beach, description: "Arriving by train? Ask Visit Malindi to help arrange the next leg from Mombasa SGR." },
  { id: "malindi-watamu", slug: "malindi-to-watamu", route: "Malindi ↔ Watamu", category: "Coastal Transfer", vehicle: "Private vehicle", location: "Malindi & Watamu", image: photos.ocean, description: "Move between two of the coast's most loved destinations with a transfer matched to your plans." },
  { id: "private-car", slug: "private-car", route: "Private car and van hire", category: "Private Transport", vehicle: "Car or van", location: "Malindi area", image: photos.dhow, description: "For airport pickups, day trips and groups, tell us what you need and we will help with options." },
];

const attractionEntries = [
  { id: "malindi-beaches", slug: "malindi-beaches", name: "Malindi beaches", category: "Beach", location: "Malindi", image: photos.beach, description: "Find your kind of beach day, from a quiet shoreline to the easy rhythm of a family afternoon." },
  { id: "vasco-da-gama-pillar", slug: "vasco-da-gama-pillar", name: "Vasco da Gama Pillar", category: "Historical", location: "Malindi", image: photos.ocean, description: "A landmark on the Malindi waterfront and a natural stop while exploring the old town and coast." },
  { id: "arabuko-sokoke", slug: "arabuko-sokoke", name: "Arabuko Sokoke", category: "Nature", location: "Coastal Kenya", image: photos.mangrove, description: "A forest world for travellers who want a change of pace, with nature walks and birding possibilities." },
  { id: "malindi-old-town", slug: "malindi-old-town", name: "Malindi Old Town", category: "Culture", location: "Malindi", image: photos.ruins, description: "Take a slower walk through the layers of coastal history, culture and everyday life." },
];

const itineraryEntries = [
  { id: "1-day-malindi", slug: "1-day-in-malindi", name: "1 Day in Malindi", duration: "1 day", audience: "First-time visitors", image: photos.beach, description: "A taste of sea, history and a sunset when you only have a day.", days: [{ day: 1, activities: ["Morning by the ocean", "A local lunch", "Sunset by the coast"] }] },
  { id: "2-days-malindi", slug: "2-days-in-malindi", name: "2 Days in Malindi", duration: "2 days", audience: "First-time visitors", image: photos.dhow, description: "Two unhurried days for getting your bearings, feeling the coast and finding a little more of Malindi.", days: [{ day: 1, activities: ["Settle in", "Explore the coast", "An easy evening"] }, { day: 2, activities: ["Choose an experience", "A local lunch", "Sunset plans"] }] },
  { id: "3-days-malindi", slug: "3-days-in-malindi", name: "3 Days in Malindi", duration: "3 days", audience: "General", image: photos.ocean, description: "A balanced first trip with room for marine time, culture, good food and slow mornings.", days: [{ day: 1, activities: ["Settle into the coast", "Explore Malindi", "Sunset plans"] }, { day: 2, activities: ["Marine or beach experience", "Lunch by the water", "A night out"] }, { day: 3, activities: ["Gede Ruins or nature", "Local flavours", "One last ocean view"] }] },
  { id: "weekend-malindi", slug: "weekend-in-malindi", name: "Weekend in Malindi", duration: "Weekend", audience: "Couples & friends", image: photos.sunset, description: "A compact coast reset: arrive, exhale, explore and leave with salt in your hair.", days: [{ day: 1, activities: ["Arrival and beach time", "Dinner", "Ask what is happening tonight"] }, { day: 2, activities: ["Choose a marine or nature experience", "A slow afternoon", "Sunset"] }] },
  { id: "malindi-watamu", slug: "malindi-and-watamu", name: "Malindi + Watamu", duration: "Flexible", audience: "Explorers", image: photos.mangrove, description: "See two sides of the coast, with time for Malindi's character and Watamu's nature-led pace.", days: [{ day: 1, activities: ["Malindi highlights", "Coastal dining"] }, { day: 2, activities: ["Watamu or Mida Creek", "Sunset by the water"] }] },
  { id: "malindi-tsavo", slug: "malindi-and-tsavo", name: "Malindi + Tsavo", duration: "Flexible", audience: "Adventure seekers", image: photos.mangrove, description: "A coast-and-nature starting point for travellers who want to add a wider Kenyan adventure to their beach time.", days: [{ day: 1, activities: ["Coastal arrival", "Plan your next move"] }, { day: 2, activities: ["Ask for current travel options", "Shape the trip around your interests"] }] },
  { id: "family-holiday", slug: "family-holiday", name: "Family Holiday", duration: "Flexible", audience: "Families", image: photos.family, description: "An easy-going framework for a family trip with flexible beach, nature and food ideas.", days: [{ day: 1, activities: ["Easy beach morning", "Family-friendly lunch"] }, { day: 2, activities: ["Nature or marine discovery", "Slow evening"] }] },
  { id: "honeymoon", slug: "honeymoon", name: "Honeymoon by the Coast", duration: "Flexible", audience: "Couples", image: photos.dhow, description: "A romantic starting point for a trip shaped around unhurried days and beautiful evenings.", days: [{ day: 1, activities: ["Oceanfront arrival", "Sunset together"] }, { day: 2, activities: ["Private experience enquiry", "Romantic dining"] }] },
  { id: "couples-getaway", slug: "couples-getaway", name: "Couple's Getaway", duration: "Flexible", audience: "Couples", image: photos.sunset, description: "A simple coast escape for two, shaped around your preferred balance of beach time, food and adventure.", days: [{ day: 1, activities: ["Slow arrival", "A memorable dinner"] }, { day: 2, activities: ["Choose your pace", "One more sunset"] }] },
  { id: "adventure-trip", slug: "adventure-trip", name: "Adventure Trip", duration: "Flexible", audience: "Active travellers", image: photos.ocean, description: "Build a coastal itinerary around time on the water, outdoor experiences and the kind of days you remember.", days: [{ day: 1, activities: ["Choose your adventure", "Rest by the coast"] }, { day: 2, activities: ["More outdoors", "Share your highlights over dinner"] }] },
  { id: "relaxation-trip", slug: "relaxation-trip", name: "Relaxation Trip", duration: "Flexible", audience: "Slow travellers", image: photos.beach, description: "For travellers who would rather leave the schedule open and let the coast set the pace.", days: [{ day: 1, activities: ["Arrive and exhale", "A quiet meal"] }, { day: 2, activities: ["Beach time", "Sunset"] }] },
];

const withListingFields = (item) => ({
  ...item,
  images: item.images || item.gallery || (item.image ? [item.image] : []),
  gallery: item.gallery || item.images || (item.image ? [item.image] : []),
  usefulInfo: item.usefulInfo || ["Ask Visit Malindi about current availability, pricing and the best fit for your plans."],
  mapUrl: item.mapUrl || null,
  websiteUrl: item.websiteUrl || null,
  socialUrl: item.socialUrl || null,
});

export const experiences = experienceEntries.map(withListingFields);
export const stays = stayEntries.map(withListingFields);
export const foodGuides = foodEntries.map(withListingFields);
export const nightlife = nightlifeEntries.map(withListingFields);
export const transfers = transferEntries.map(withListingFields);
export const attractions = attractionEntries.map(withListingFields);
export const itineraries = itineraryEntries.map(withListingFields);

// Keep this catalogue empty until current event details are supplied.
// Use this shape when adding time-sensitive event records.
export const eventTemplate = {
  id: "event-slug",
  slug: "event-slug",
  name: "Event name",
  venue: null,
  date: null,
  startTime: null,
  category: "Event",
  image: null,
  description: "Add a concise event description.",
  location: "Malindi",
  verified: false,
  filters: [],
  expiresAt: null,
  highlights: [],
  usefulInfo: [],
  images: [],
  mapUrl: null,
  websiteUrl: null,
  socialUrl: null,
};
export const events = [];

export const searchIndex = [
  ...experiences.map((item) => ({ ...item, type: "Experience", path: `/experience/${item.slug}` })),
  ...stays.map((item) => ({ ...item, type: "Stay", path: `/stay/${item.slug}` })),
  ...foodGuides.map((item) => ({ ...item, type: "Eat & Drink", path: `/eat-and-drink/${item.slug}` })),
  ...nightlife.map((item) => ({ ...item, type: "Nightlife", path: `/nightlife/${item.slug}` })),
  ...transfers.map((item) => ({ ...item, name: item.route, type: "Transfer", path: `/transfer/${item.slug}` })),
  ...attractions.map((item) => ({ ...item, type: "Place to Visit", path: `/attraction/${item.slug}` })),
  ...itineraries.map((item) => ({ ...item, type: "Itinerary", path: `/itinerary/${item.slug}` })),
  ...events.map((item) => ({ ...item, type: "Event", path: `/event/${item.slug}` })),
];

export const pageMeta = {
  "/": ["Visit Malindi — Discover the Coast Your Way.", "Your local guide to where to stay, what to do, where to eat and how to experience Malindi and the Kenyan Coast."],
  "/things-to-do": ["Things to Do in Malindi | Visit Malindi", "Explore marine, nature, culture and adventure experiences in Malindi and Watamu."],
  "/places-to-stay": ["Places to Stay in Malindi | Visit Malindi", "Find the right base for your Malindi or Watamu trip, from beachfront stays to family-friendly options."],
  "/eat-and-drink": ["Eat & Drink in Malindi | Visit Malindi", "Find coastal flavours, seafood, cafés and memorable places to eat in Malindi."],
  "/nightlife": ["Nightlife in Malindi | Visit Malindi", "When the sun goes down, Malindi comes alive. Ask a local what is happening tonight."],
  "/transfers": ["Malindi Airport, SGR & Coastal Transfers | Visit Malindi", "Plan your journey to Malindi with local help for airport, SGR and coastal transfers."],
  "/places-to-visit": ["Places to Visit in Malindi | Visit Malindi", "Beaches, history, nature and culture across Malindi, Watamu and the Kenyan Coast."],
  "/itineraries": ["Malindi Itineraries | Visit Malindi", "Ready-made ideas for one day, three days, a weekend, a family holiday or a honeymoon."],
  "/whats-on": ["What's On in Malindi | Visit Malindi", "Find out what is happening in Malindi tonight and this weekend."],
};

export { photos };