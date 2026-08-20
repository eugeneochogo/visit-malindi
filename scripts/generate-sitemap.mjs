import { attractions, events, excursions, experiences, foodGuides, itineraries, nightlife, stays, transfers } from "../src/data.js";
import { writeFile } from "node:fs/promises";

const origin = "https://visitmalindi.co.ke";
const publicRoutes = [
  "/",
  "/malindi",
  "/watamu",
  "/things-to-do",
  "/things-to-do-in-malindi",
  "/things-to-do-in-watamu",
  "/excursions",
  "/malindi-excursions",
  "/places-to-stay",
  "/hotels-in-malindi",
  "/beach-resorts-in-malindi",
  "/eat-and-drink",
  "/restaurants-in-malindi",
  "/restaurants-in-watamu",
  "/nightlife",
  "/malindi-nightlife",
  "/watamu-nightlife",
  "/transfers",
  "/malindi-airport-transfer",
  "/mombasa-airport-to-malindi",
  "/mombasa-to-malindi-transfer",
  "/sgr-to-malindi",
  "/places-to-visit",
  "/itineraries",
  "/whats-on",
  "/plan-my-trip",
  "/about",
  "/contact",
];

const listingRoutes = [
  ...experiences.map((item) => `/experience/${item.slug}`),
  ...excursions.map((item) => `/excursion/${item.slug}`),
  ...stays.map((item) => `/stay/${item.slug}`),
  ...foodGuides.map((item) => `/eat-and-drink/${item.slug}`),
  ...nightlife.map((item) => `/nightlife/${item.slug}`),
  ...transfers.map((item) => `/transfer/${item.slug}`),
  ...attractions.map((item) => `/attraction/${item.slug}`),
  ...itineraries.map((item) => `/itinerary/${item.slug}`),
  ...events.map((item) => `/event/${item.slug}`),
];

const urls = [...new Set([...publicRoutes, ...listingRoutes])];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((route) => `  <url><loc>${origin}${route}</loc></url>`).join("\n")}\n</urlset>\n`;

await writeFile("public/sitemap.xml", xml);