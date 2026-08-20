# VISIT MALINDI

## Master Website & Product Specification

### Version 1.0 — Core Subscription Build

---

# 1. PROJECT OVERVIEW

## Product Name

**Visit Malindi**

## Domain

**visitmalindi.co.ke**

## Business Positioning

Visit Malindi is a digital destination guide, tourism discovery platform and WhatsApp concierge for Malindi, Watamu and the surrounding Kenyan Coast.

It helps visitors discover:

* Where to stay
* Things to do
* Places to visit
* Restaurants and cafés
* Nightlife
* Events
* Airport and SGR transfers
* Travel information
* Local experiences
* Ready-made itineraries
* Personalised trip recommendations

The initial product is NOT a full booking platform.

The primary customer journey is:

**Discover → Explore → Enquire → WhatsApp → Visit Malindi coordinates**

The platform should be designed so it can later evolve into:

**Discover → Book → Pay → Confirmation → Partner Management**

without requiring a complete rebuild.

---

# 2. PRODUCT VISION

Visit Malindi should become the digital front desk for visitors coming to Malindi.

A visitor should be able to arrive at the website and answer:

> Where should I stay?

> What should I do?

> Where should I eat?

> What is happening tonight?

> Where should I go?

> How do I get from Mombasa Airport to Malindi?

> How do I get from the SGR station to Malindi?

> What should I do for three days?

> What can I do with my family?

> Where can I go tonight?

> Can someone help me plan my trip?

The answer to the final question is:

**Talk to Visit Malindi on WhatsApp.**

---

# 3. V1 BUSINESS MODEL

V1 is a discovery and enquiry platform.

The website does not initially process:

* Online bookings
* Customer accounts
* Partner accounts
* Online payments
* Availability synchronisation
* Commission calculations
* Automated booking confirmations

Instead, Visit Malindi handles enquiries manually through WhatsApp.

Potential future revenue streams include:

* Hotel commissions
* Accommodation referral fees
* Excursion commissions
* Transfer margins
* Featured listings
* Sponsored experiences
* Event promotion
* Partner listing fees
* Tourism packages
* Future online booking commissions

---

# 4. CORE TECHNICAL PRINCIPLE

KEEP V1 SIMPLE.

The website must be a standard:

**React + Vite**

application.

Do not introduce unnecessary infrastructure.

## V1 must NOT require:

* Backend server
* API server
* Database
* Authentication
* Partner dashboard
* Payment gateway
* Booking engine
* Redis
* WebSockets
* Complex server infrastructure
* Replit-specific preview infrastructure
* Mockup sandbox infrastructure

The architecture should remain deployable as a standard frontend application.

---

# 5. REPLIT STRATEGY

The project will be developed using:

**Replit Core**

Replit is the primary development environment.

The project should remain compatible with external GitHub and Vercel deployment.

Core is sufficient for the V1 build.

Because Agent usage consumes credits, Agent should be used deliberately.

Do not repeatedly ask Agent to redesign or rewrite the entire application.

Tasks should be:

* Specific
* Incremental
* Testable
* Reversible
* Focused on one feature at a time

Never ask Agent to rebuild working architecture unnecessarily.

---

# 6. DEPLOYMENT ARCHITECTURE

Preferred production structure:

Replit
↓
GitHub
↓
Vercel
↓
visitmalindi.co.ke

The application should remain compatible with normal Vite deployment.

Expected build:

```text
npm install
npm run build
```

Expected output:

```text
dist/
```

Do not add:

* PORT requirements
* BASE_PATH requirements
* Custom preview servers
* Replit mockup servers
* API processes

unless explicitly required later.

---

# 7. PROJECT STRUCTURE

Use a clean structure similar to:

```text
visit-malindi/

├── public/
│   ├── images/
│   ├── icons/
│   └── favicon/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── MobileMenu.jsx
│   │   ├── Hero.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── CategoryCard.jsx
│   │   ├── ListingCard.jsx
│   │   ├── ExperienceCard.jsx
│   │   ├── StayCard.jsx
│   │   ├── TransferCard.jsx
│   │   ├── RestaurantCard.jsx
│   │   ├── NightlifeCard.jsx
│   │   ├── EventCard.jsx
│   │   ├── ItineraryCard.jsx
│   │   ├── WhatsAppButton.jsx
│   │   ├── WhatsAppCTA.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Breadcrumbs.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── ThingsToDo.jsx
│   │   ├── ExperienceDetail.jsx
│   │   ├── PlacesToStay.jsx
│   │   ├── StayDetail.jsx
│   │   ├── EatAndDrink.jsx
│   │   ├── Nightlife.jsx
│   │   ├── EventDetail.jsx
│   │   ├── Transfers.jsx
│   │   ├── TransferDetail.jsx
│   │   ├── PlacesToVisit.jsx
│   │   ├── AttractionDetail.jsx
│   │   ├── Itineraries.jsx
│   │   ├── ItineraryDetail.jsx
│   │   ├── WhatsOn.jsx
│   │   ├── PlanMyTrip.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   │
│   ├── data/
│   │   ├── experiences.js
│   │   ├── stays.js
│   │   ├── restaurants.js
│   │   ├── nightlife.js
│   │   ├── events.js
│   │   ├── transfers.js
│   │   ├── attractions.js
│   │   └── itineraries.js
│   │
│   ├── utils/
│   │   ├── whatsapp.js
│   │   ├── seo.js
│   │   ├── slugify.js
│   │   └── helpers.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── AGENTS.md
```

The exact implementation may vary slightly, but the architecture must remain simple and understandable.

---

# 8. BRAND POSITIONING

## Primary brand

# VISIT MALINDI

## Core message

**Discover the Coast Your Way.**

## Supporting message

**Stay. Explore. Eat. Party. Move.**

Alternative supporting language:

**Discover Malindi. Stay. Explore. Experience the Coast.**

---

# 9. BRAND PERSONALITY

Visit Malindi should feel:

* Coastal
* Premium
* Local
* Warm
* Modern
* Authentic
* Relaxed
* Helpful
* Adventurous
* Editorial
* Trustworthy

It should NOT feel:

* Cheap
* Overly corporate
* Like a generic tour operator
* Like a hotel booking clone
* Like a government website
* Like a SaaS dashboard
* Overly flashy
* Artificially luxurious
* Overloaded with animations

---

# 10. VISUAL DIRECTION

The design should resemble a high-quality modern travel publication combined with a local concierge.

Priorities:

1. Photography
2. Typography
3. Whitespace
4. Clear hierarchy
5. Strong destination storytelling
6. Simple navigation
7. Excellent mobile experience

Use large imagery where appropriate.

Images should communicate:

* Indian Ocean
* Malindi beaches
* Dhow sailing
* Marine experiences
* Sunsets
* Local culture
* Restaurants
* Nightlife
* Nature
* Travel

Do not use random generic stock imagery when authentic imagery is available.

---

# 11. PRIMARY NAVIGATION

Desktop navigation:

```text
Explore
Stay
Eat & Drink
Nightlife
Transfers
Places to Visit
Itineraries
What's On
```

Primary CTA:

**WhatsApp Concierge**

Mobile navigation should use a clean menu.

The WhatsApp CTA should remain highly visible on mobile.

---

# 12. HOMEPAGE

The homepage is the primary destination landing page.

## Section 1 — Hero

Display:

# VISIT MALINDI

## Discover the Coast Your Way.

Supporting copy:

Discover where to stay, what to do, where to eat, where to go at night and how to experience Malindi and the Kenyan Coast.

Primary CTA:

**Explore Malindi**

Secondary CTA:

**Talk to Visit Malindi**

Use a premium Malindi coastal image.

---

# 13. HOMEPAGE — EXPLORE SECTION

Heading:

# Explore Malindi

Six primary categories:

### Things to Do

Marine experiences, adventure, nature and culture.

### Where to Stay

Hotels, resorts, villas, apartments and guesthouses.

### Eat & Drink

Restaurants, cafés, beach dining and bars.

### Nightlife

Clubs, lounges, DJs, live music and beach parties.

### Transfers

Airport, SGR, Mombasa, Watamu and private transport.

### Places to Visit

Beaches, history, nature and attractions.

---

# 14. HOMEPAGE — FEATURED EXPERIENCES

Display selected experiences.

Initial categories:

* Marine excursion
* Mida Creek sunset
* Gede Ruins
* Dhow sailing
* Horse riding
* Deep sea fishing
* Snorkelling
* Nature experiences

Each card should support:

* Image
* Name
* Category
* Location
* Short description
* Duration if known
* Price-from if verified
* CTA

Never invent prices.

Never imply availability unless verified.

---

# 15. THINGS TO DO

Primary categories:

## Marine

* Marine excursions
* Snorkelling
* Diving
* Dolphin experiences
* Sandbank trips
* Boat trips
* Dhow sailing
* Fishing
* Deep sea fishing
* Sunset cruises

## Nature

* Mida Creek
* Mangrove experiences
* Arabuko Sokoke
* Bird watching
* Nature walks
* Wildlife experiences

## History & Culture

* Gede Ruins
* Vasco da Gama Pillar
* Malindi Old Town
* Swahili culture
* Cultural experiences
* Local heritage

## Adventure

* Horse riding
* Water activities
* Fishing
* Outdoor experiences
* Adventure excursions

---

# 16. EXPERIENCE LISTING MODEL

Every experience should be represented as structured data.

Example:

```javascript
{
  id: "malindi-marine-excursion",
  name: "Malindi Marine Excursion",
  category: "Marine",
  location: "Malindi",
  duration: "Half Day",
  priceFrom: null,
  image: "/images/...",
  description: "...",
  highlights: [],
  featured: true,
  slug: "malindi-marine-excursion"
}
```

Do not create fake provider names.

The experience may exist as a category before a verified provider is assigned.

---

# 17. EXPERIENCE DETAIL PAGE

Structure:

1. Hero image
2. Experience name
3. Location
4. Overview
5. Highlights
6. Duration
7. Price information if verified
8. Gallery
9. Important information
10. Location
11. WhatsApp CTA
12. Related experiences

Primary CTA:

**Ask About This Experience**

---

# 18. PLACES TO STAY

Categories:

* Hotels
* Beach resorts
* Boutique hotels
* Villas
* Apartments
* Guesthouses
* Budget stays
* Luxury stays
* Family stays
* Romantic stays

---

# 19. STAY LISTING MODEL

Example:

```javascript
{
  id: "example-property",
  name: "Property Name",
  category: "Beach Resort",
  location: "Malindi",
  description: "...",
  amenities: [],
  image: "/images/...",
  slug: "property-name"
}
```

Only use genuine verified properties in production.

Do not invent:

* Ratings
* Reviews
* Prices
* Availability
* Amenities
* Awards

unless verified.

---

# 20. STAY DETAIL PAGE

Include:

* Property photography
* Property name
* Location
* Description
* Accommodation type
* Amenities
* Highlights
* Gallery
* Location
* Enquiry CTA

CTA:

**Ask About Availability**

The V1 enquiry goes to WhatsApp.

---

# 21. EAT & DRINK

Categories:

### Restaurants

* Seafood
* Swahili
* Italian
* Indian
* International
* Fine dining
* Local food

### Cafés

### Beach Restaurants

### Bars & Lounges

### Romantic Dining

### Family Dining

Restaurant listings should eventually include:

* Name
* Location
* Cuisine
* Price indication where verified
* Opening information where verified
* Image
* Description
* WhatsApp/contact action
* Maps action

Do not invent business information.

---

# 22. NIGHTLIFE

Nightlife is a first-class Visit Malindi category.

Positioning:

# Nightlife in Malindi

**When the sun goes down, Malindi comes alive.**

Categories:

### Clubs & DJs

* Clubs
* DJ nights
* Weekend parties
* Themed nights

### Bars & Lounges

* Cocktail lounges
* Beach lounges
* Rooftops
* Late-night venues

### Beach Parties

* Beach parties
* Sunset parties
* Full moon events
* Special events

### Live Music

* DJs
* Bands
* Acoustic nights
* Local artists

### Shisha

* Shisha experiences
* Shisha venues
* Shisha events

### Events

* Parties
* Festivals
* Special events
* Themed nights

---

# 23. WHAT'S ON

Create a dedicated events discovery page.

Primary message:

# What's Happening?

Filters:

* Tonight
* This Weekend
* Events
* DJ
* Live Music
* Beach Party
* Nightlife
* Family
* Food

Each event should contain:

```javascript
{
  id: "...",
  name: "...",
  venue: "...",
  date: "...",
  startTime: "...",
  category: "...",
  image: "...",
  description: "...",
  location: "...",
  verified: false
}
```

Events are time-sensitive.

Do not retain expired events as active listings.

---

# 24. PLACES TO VISIT

Categories:

## Beaches

* Malindi beaches
* Watamu beaches
* Quiet beaches
* Family beaches
* Romantic beaches

## Historical

* Gede Ruins
* Vasco da Gama Pillar
* Old Town

## Nature

* Marine Park
* Mida Creek
* Arabuko Sokoke
* Mangroves

## Family

Family-friendly attractions.

## Romantic

Romantic experiences and locations.

---

# 25. TRANSFERS

This is a major commercial category.

## Airport

* Malindi Airport → Hotel
* Hotel → Malindi Airport
* Mombasa Airport → Malindi
* Malindi → Mombasa Airport

## SGR

* Mombasa SGR → Malindi
* Malindi → Mombasa SGR

## Coastal

* Malindi ↔ Watamu
* Malindi ↔ Kilifi
* Malindi ↔ Mombasa
* Malindi ↔ Lamu

## Private transport

* Private car
* Van
* Group transfer
* Vehicle hire

---

# 26. TRANSFER LISTING MODEL

```javascript
{
  id: "mombasa-airport-malindi",
  route: "Mombasa Airport → Malindi",
  category: "Airport Transfer",
  vehicle: "Private vehicle",
  capacity: null,
  priceFrom: null,
  description: "...",
  slug: "mombasa-airport-to-malindi"
}
```

Never invent journey times or prices.

Use verified information once suppliers are onboarded.

---

# 27. TRANSFER DETAIL PAGE

Display:

* Route
* Vehicle
* Passenger capacity if verified
* Approximate duration if verified
* Pickup information
* Destination information
* Pricing if verified
* WhatsApp CTA

CTA:

**Arrange This Transfer**

---

# 28. SGR & TRAVEL INFORMATION

Create informational content covering:

* SGR travel to Mombasa
* Getting from Mombasa SGR to Malindi
* SGR → Malindi transfer
* Malindi → SGR
* Mombasa Airport → Malindi
* Malindi Airport
* Travel assistance

Do not present outdated travel schedules as permanent facts.

Where information changes frequently, clearly indicate that users should confirm current schedules.

---

# 29. ITINERARIES

Create:

### 1 Day in Malindi

### 2 Days in Malindi

### 3 Days in Malindi

### Weekend in Malindi

### Malindi + Watamu

### Malindi + Tsavo

### Honeymoon

### Couple's Getaway

### Family Holiday

### Adventure Trip

### Relaxation Trip

---

# 30. ITINERARY MODEL

```javascript
{
  id: "3-days-malindi",
  name: "3 Days in Malindi",
  duration: "3 Days",
  audience: "General",
  description: "...",
  days: [
    {
      day: 1,
      activities: []
    }
  ],
  image: "..."
}
```

Each itinerary should eventually link to actual experiences and attractions.

---

# 31. BUILD MY MALINDI EXPERIENCE

Create a trip-planning interface.

Questions:

## How long are you staying?

* 1 day
* 2 days
* 3–5 days
* 1 week+

## Who are you travelling with?

* Couple
* Family
* Friends
* Solo

## What do you enjoy?

* Beach
* Adventure
* Food
* Nature
* History
* Nightlife
* Relaxation
* Culture

Primary CTA:

# Build My Malindi Experience

---

# 32. V1 TRIP PLANNER BEHAVIOUR

V1 does NOT need an AI itinerary engine.

It should collect the selections and generate a contextual WhatsApp message.

Example:

```text
Hello Visit Malindi 👋

I'd like help planning my trip.

Duration: 3 days
Travelling: Couple
Interests: Beach, Food, Nightlife
```

Later this can become an automated itinerary generator.

---

# 33. WHATSAPP CONCIERGE

WhatsApp is the primary V1 conversion mechanism.

Create one central WhatsApp utility.

Do not hardcode WhatsApp URLs throughout the project.

The utility should accept:

* Message
* Listing type
* Listing name
* Optional context

and generate the appropriate WhatsApp link.

---

# 34. WHATSAPP CTA TYPES

Use contextual CTAs.

Do NOT use "WhatsApp Us" everywhere.

Use:

### Experiences

**Ask About This Experience**

### Accommodation

**Ask About Availability**

### Transfers

**Arrange Transfer**

### Nightlife

**Ask What's Happening Tonight**

### Itineraries

**Plan My Trip**

### General

**Talk to a Local**

### Concierge

**Talk to Visit Malindi**

---

# 35. WHATSAPP MESSAGE EXAMPLES

## Experience

```text
Hello Visit Malindi 👋

I'm interested in the [Experience Name].

Date:
Number of people:

Please share availability and pricing.
```

## Accommodation

```text
Hello Visit Malindi 👋

I'm interested in [Property Name].

Check-in:
Check-out:
Number of guests:

Please share availability and rates.
```

## Transfer

```text
Hello Visit Malindi 👋

I'd like to arrange:
[Route]

Date:
Number of passengers:
Pickup/arrival time:

Please share the available options and price.
```

## Nightlife

```text
Hello Visit Malindi 👋

What's happening in Malindi tonight?

We're interested in:
Club / DJ / Live Music / Beach Party / Lounge

Please recommend some options.
```

---

# 36. GLOBAL WHATSAPP BUTTON

A floating WhatsApp CTA should appear throughout the website.

Desktop:

Bottom-right floating button.

Mobile:

Use a mobile-friendly fixed CTA that does not obstruct content.

It must not cover important buttons or navigation.

---

# 37. SEARCH

V1 should support basic site search.

Search should be able to find:

* Experiences
* Hotels
* Restaurants
* Attractions
* Nightlife
* Transfers
* Itineraries

Search results should indicate the content type.

Example:

```text
Malindi Marine Excursion
Experience

Ocean Beach Resort
Stay

Gede Ruins
Attraction
```

---

# 38. FILTERING

Each major catalogue should support relevant filters.

Things to Do:

* Marine
* Nature
* Culture
* Adventure

Stay:

* Hotel
* Resort
* Villa
* Apartment
* Guesthouse

Nightlife:

* Club
* Lounge
* DJ
* Live Music
* Beach Party

Transfers:

* Airport
* SGR
* Mombasa
* Watamu
* Kilifi
* Lamu

---

# 39. MOBILE-FIRST DESIGN

The majority of tourism users will likely access the website on mobile.

Mobile must be treated as a primary design target, not a secondary adaptation.

Test:

* 320px
* 375px
* 390px
* 414px
* 768px
* Desktop

Requirements:

* No horizontal scrolling
* Touch-friendly buttons
* Legible text
* Fast image loading
* Simple navigation
* Fixed WhatsApp access
* Proper card stacking
* Good spacing

---

# 40. SEO STRATEGY

Create dedicated indexable pages for important searches.

Examples:

```text
/things-to-do-in-malindi
/things-to-do-in-watamu
/malindi-excursions
/hotels-in-malindi
/beach-resorts-in-malindi
/restaurants-in-malindi
/malindi-nightlife
/malindi-events
/malindi-airport-transfer
/mombasa-airport-to-malindi
/mombasa-to-malindi-transfer
/sgr-to-malindi
/weekend-in-malindi
/3-days-in-malindi
```

Use clean, readable URLs.

---

# 41. PAGE METADATA

Every indexable page should have:

* Unique title
* Meta description
* Canonical URL where appropriate
* OpenGraph title
* OpenGraph description
* OpenGraph image

Do not duplicate homepage metadata across every page.

---

# 42. STRUCTURED DATA

Where appropriate, prepare the site architecture for structured data such as:

* Tourist attraction
* Local business
* Event
* Hotel/accommodation
* Article
* Breadcrumb

Only publish structured information that is accurate.

---

# 43. IMAGE STRATEGY

Photography is a core part of the product.

Prioritise authentic imagery.

Image categories:

* Beaches
* Ocean
* Marine experiences
* Hotels
* Restaurants
* Nightlife
* Events
* Transfers
* Attractions
* Culture
* Nature
* Sunsets

Images must:

* Load efficiently
* Use appropriate dimensions
* Have alt text
* Use lazy loading where appropriate
* Avoid unnecessary full-resolution assets

---

# 44. CONTENT RULE

NEVER invent real-world facts.

Do not fabricate:

* Hotels
* Restaurants
* Clubs
* DJs
* Events
* Prices
* Reviews
* Ratings
* Phone numbers
* Addresses
* Availability
* Awards
* Amenities

Use placeholder/demo content only where clearly identified.

Production content must be verified.

---

# 45. TRUST & TRANSPARENCY

Visit Malindi should communicate that it is a local discovery and concierge platform.

Where appropriate:

**Information may change. Please confirm availability, pricing and schedules with Visit Malindi before making arrangements.**

This is especially important for:

* Events
* Transfers
* Accommodation
* Prices
* Travel schedules

---

# 46. ABOUT PAGE

Explain:

### What is Visit Malindi?

Visit Malindi helps visitors discover Malindi, Watamu and the Kenyan Coast.

We connect travellers with:

* Places to stay
* Local experiences
* Restaurants
* Attractions
* Nightlife
* Transfers
* Local recommendations

The platform is designed to make planning a trip to Malindi easier.

---

# 47. CONTACT

Primary contact mechanism:

**WhatsApp**

Secondary:

**[travel@visitmalindi.co.ke](mailto:travel@visitmalindi.co.ke)**

Location:

**Malindi Complex, Malindi**

Do not publish additional personal contact information unless explicitly provided and approved.

---

# 48. FOOTER

Footer sections:

## Visit Malindi

Discover the Coast Your Way.

## Explore

Things to Do
Places to Visit
Places to Stay
Eat & Drink
Nightlife

## Plan

Itineraries
Transfers
Travel Information
What's On

## Contact

WhatsApp
Email
Malindi Complex, Malindi

## Legal

Privacy Policy
Terms
Disclaimer

---

# 49. LEGAL PAGES

Create basic:

* Privacy Policy
* Terms of Use
* Disclaimer

The content should be reviewed before final production launch.

Do not claim legal compliance that has not been verified.

---

# 50. ANALYTICS

The architecture should be prepared for analytics.

Track important actions such as:

* Page views
* Search
* Experience views
* Stay views
* Transfer views
* WhatsApp clicks
* Plan My Trip clicks
* What's On clicks

The most important V1 metric is:

# WhatsApp enquiries generated

---

# 51. ADMINISTRATION — V1

There is NO admin dashboard in V1.

Content is maintained through structured data files.

Example:

```text
src/data/experiences.js
src/data/stays.js
src/data/transfers.js
src/data/restaurants.js
src/data/nightlife.js
src/data/events.js
```

This keeps V1 simple and inexpensive.

---

# 52. FUTURE CONTENT MANAGEMENT

The architecture must make it possible to replace static data with a database later.

Future:

```text
Static data
     ↓
Database
     ↓
Admin dashboard
     ↓
Partner management
```

Do not build the database now solely for future possibilities.

---

# 53. FUTURE PARTNER SYSTEM

Not part of V1.

Eventually partners may have:

* Login
* Business profile
* Listing management
* Photos
* Availability
* Pricing
* Enquiries
* Bookings
* Commission information

This should be a future phase.

---

# 54. FUTURE BOOKING SYSTEM

Not part of V1.

Future customer flow:

```text
Discover
↓
Select
↓
Check availability
↓
Book
↓
Pay
↓
Confirmation
```

The current architecture should not prevent this future evolution.

---

# 55. FUTURE PAYMENT SYSTEM

Not part of V1.

Possible future payment methods may include:

* M-Pesa
* Card
* Other supported payment providers

Do not install or configure payment infrastructure during V1.

---

# 56. FUTURE DATABASE

Potential future data entities:

```text
Users
Partners
Listings
Experiences
Hotels
Restaurants
Events
Transfers
Bookings
Payments
Commissions
Reviews
Availability
Messages
```

These are future requirements only.

---

# 57. FUTURE CONCIERGE ENGINE

V1:

**WhatsApp concierge**

Future:

**Website trip planner**

Eventually:

**AI/local recommendation engine**

Potential flow:

```text
Traveller preferences
        ↓
Available experiences
        ↓
Accommodation
        ↓
Transport
        ↓
Restaurants
        ↓
Nightlife
        ↓
Personalised itinerary
```

---

# 58. FUTURE MARKETPLACE

Long-term:

```text
VISIT MALINDI
      │
      ├── Hotels
      ├── Villas
      ├── Activities
      ├── Restaurants
      ├── Transfers
      ├── Events
      └── Nightlife
              │
              ▼
         BOOKING ENGINE
              │
              ▼
           PAYMENT
              │
              ▼
        PARTNER SYSTEM
              │
              ▼
        COMMISSION ENGINE
```

---

# 59. PERFORMANCE REQUIREMENTS

The site should:

* Load quickly
* Avoid unnecessary JavaScript
* Optimise images
* Lazy-load below-the-fold images
* Avoid excessive animation
* Avoid large unnecessary libraries
* Avoid unnecessary dependencies
* Avoid layout shifts
* Maintain responsive design

Do not sacrifice performance for visual effects.

---

# 60. ACCESSIBILITY

Ensure:

* Semantic HTML
* Proper heading hierarchy
* Alt text
* Keyboard navigation
* Visible focus states
* Sufficient text contrast
* Accessible buttons
* Accessible mobile navigation
* Form labels
* Meaningful link text

---

# 61. ERROR HANDLING

Create:

### 404 page

Message:

**Lost in Malindi?**

Then:

**Explore Malindi**

Also handle:

* Missing images
* Missing listings
* Invalid routes
* Empty search results

Example:

> We couldn't find what you're looking for.

Then provide useful alternatives.

---

# 62. CODE QUALITY

Agent must:

* Reuse components
* Avoid duplicated code
* Keep components reasonably small
* Keep data separate from presentation
* Use meaningful names
* Avoid unnecessary dependencies
* Preserve existing features
* Test builds after major changes

---

# 63. AGENT BEHAVIOUR RULES

When working on Visit Malindi:

1. Do not rewrite the whole project unless explicitly instructed.
2. Do not change the framework.
3. Do not introduce a backend without approval.
4. Do not introduce a database without approval.
5. Do not add authentication without approval.
6. Do not add payments without approval.
7. Do not fabricate tourism information.
8. Do not remove working features while adding new ones.
9. Reuse existing components.
10. Reuse existing data structures.
11. Ask before making architectural changes.
12. Run the build after significant changes.
13. Fix errors before adding unrelated features.
14. Keep the application Vercel-compatible.
15. Keep the application understandable to a non-expert owner.

---

# 64. DEVELOPMENT PHASES

## PHASE 1 — FOUNDATION

* React/Vite
* Project structure
* Brand system
* Navbar
* Footer
* Routing
* Responsive framework

## PHASE 2 — HOMEPAGE

* Hero
* Explore categories
* Featured experiences
* Stay
* Nightlife
* What's On
* Transfers
* Itineraries
* Concierge CTA

## PHASE 3 — CONTENT PLATFORM

* Things to Do
* Places to Stay
* Eat & Drink
* Nightlife
* Transfers
* Places to Visit
* Itineraries

## PHASE 4 — DETAIL PAGES

* Experience detail
* Stay detail
* Attraction detail
* Transfer detail
* Event detail
* Itinerary detail

## PHASE 5 — DISCOVERY

* Search
* Filtering
* Related content
* Categories
* Breadcrumbs

## PHASE 6 — WHATSAPP

* Central utility
* Contextual messages
* Floating CTA
* Concierge
* Trip planner

## PHASE 7 — SEO

* Metadata
* URLs
* OpenGraph
* Structured data
* Sitemap
* Robots
* Search Console preparation

## PHASE 8 — POLISH

* Mobile
* Performance
* Accessibility
* Error states
* Image optimisation
* Final QA

## PHASE 9 — LAUNCH

* GitHub
* Vercel
* Domain
* SSL
* Analytics
* Real content
* Real WhatsApp number
* Production testing

---

# 65. V1 DEFINITION OF DONE

V1 is considered complete when:

### Website

* Homepage works
* All main navigation works
* Mobile navigation works
* All major sections exist
* Individual listing templates work
* Search works
* Filters work

### Content

* Experiences can be added through structured data
* Stays can be added
* Restaurants can be added
* Nightlife can be added
* Events can be added
* Transfers can be added
* Attractions can be added
* Itineraries can be added

### WhatsApp

* Experience enquiry works
* Stay enquiry works
* Transfer enquiry works
* Nightlife enquiry works
* General concierge works
* Trip planner works

### Technical

* Production build succeeds
* No major console errors
* Responsive
* Fast
* Accessible
* SEO-ready
* GitHub-backed
* Vercel-compatible

### Business

A real visitor can:

1. Discover Visit Malindi.
2. Find something they want.
3. Understand what it is.
4. Ask about it.
5. Reach Visit Malindi on WhatsApp.
6. Receive human assistance.

If that works, V1 works.

---

# 66. SUCCESS METRIC

The first version should NOT be judged by:

* Number of features
* Number of pages
* Amount of code
* Number of animations
* Number of dependencies

The primary success metric is:

# How many qualified tourism enquiries does Visit Malindi generate?

Secondary metrics:

* Organic traffic
* WhatsApp clicks
* Experience views
* Transfer enquiries
* Accommodation enquiries
* Nightlife searches
* Itinerary engagement
* Returning visitors

---

# 67. LONG-TERM PRODUCT ROADMAP

```text
V1
DIGITAL DESTINATION GUIDE
        ↓
Discover
        ↓
WhatsApp
        ↓
Concierge

V2
CURATED MARKETPLACE
        ↓
Verified partners
        ↓
Structured enquiries
        ↓
Packages

V3
BOOKING PLATFORM
        ↓
Availability
        ↓
Booking
        ↓
Payment
        ↓
Confirmation

V4
PARTNER PLATFORM
        ↓
Partner accounts
        ↓
Listings
        ↓
Availability
        ↓
Bookings
        ↓
Commissions

V5
FULL VISIT MALINDI ECOSYSTEM
        ↓
Accommodation
Experiences
Transfers
Food
Nightlife
Events
Itineraries
Payments
Concierge
Partner network
```

---

# 68. FINAL PRODUCT PRINCIPLE

Visit Malindi should never feel like:

> "Here is a list of businesses."

It should feel like:

> **"You're coming to Malindi. We've got you."**

The website should inspire discovery.

The content should answer questions.

The listings should create confidence.

The itineraries should reduce planning effort.

The WhatsApp concierge should provide human assistance.

The partner ecosystem should eventually create revenue.

The technology should remain simple until the business proves that more complexity is necessary.

---

# 69. MASTER ARCHITECTURE

```text
                         VISIT MALINDI
                              │
                   DIGITAL DESTINATION
                         PLATFORM
                              │
       ┌──────────────┬───────┼───────┬──────────────┐
       │              │       │       │              │
     EXPLORE         STAY    EAT    NIGHTLIFE       MOVE
       │              │       │       │              │
 Experiences       Hotels  Restaurants Clubs       Transfers
 Attractions       Villas  Cafés      DJs          Airport
 Beaches           Resorts Bars       Events       SGR
 Nature            Apartments         Parties      Mombasa
 Culture            Guesthouses       Live Music   Watamu
       │              │       │       │              │
       └──────────────┴───────┼───────┴──────────────┘
                              │
                         ITINERARIES
                              │
                       BUILD MY TRIP
                              │
                              ▼
                     WHATSAPP CONCIERGE
                              │
                              ▼
                       VISIT MALINDI
                         OPERATIONS
                              │
                              ▼
                       LOCAL PARTNERS
                              │
                              ▼
                     FUTURE MARKETPLACE
                              │
                   ┌──────────┴──────────┐
                   │                     │
                BOOKINGS              PAYMENTS
                   │                     │
                   └──────────┬──────────┘
                              │
                       PARTNER SYSTEM
                              │
                       COMMISSIONS
```

---

# 70. FINAL INSTRUCTION TO REPLIT AGENT

This specification is the source of truth for the Visit Malindi project.

Build the product progressively.

Do not attempt to implement every future feature immediately.

Start with the V1 foundation and implement features in phases.

Whenever a requested change conflicts with this specification, explain the conflict before changing the architecture.

The goal is not to build the largest possible application.

The goal is to build a **beautiful, fast, useful and commercially viable digital destination platform for Malindi**, beginning with discovery and WhatsApp concierge and leaving a clean path toward a full tourism marketplace.

**Build simple. Build beautifully. Build for real visitors.**
