import { useEffect, useMemo, useRef, useState } from "react";
import {
  attractions,
  destinations,
  events,
  excursions,
  exploreCategories,
  experiences,
  foodGuides,
  itineraries,
  navItems,
  nightlife,
  pageMeta,
  searchIndex,
  stays,
  transfers,
  photos,
} from "./data";
import { enquiryMessage, isWhatsAppConfigured, navigate, slugFromPath, whatsappLink } from "./utils";
import ListingCard from "./components/ListingCard";
import ReusableDetailPage from "./components/DetailPage";
import DestinationPage from "./components/DestinationPage";

const catalogueByRoute = {
  "/things-to-do": { title: "Things to do in Malindi", eyebrow: "Explore", intro: "From the Indian Ocean to coastal forest, find an experience that feels like your kind of day.", data: experiences, type: "experience", filters: ["All", "Marine", "Boat Trips", "Snorkelling", "Diving", "Dolphin Experiences", "Fishing", "Sunset Cruises", "Sandbank", "Water Sports", "Beach Activities", "Nature", "Wildlife", "History & Culture", "Adventure", "Family Activities", "Couples & Romantic", "Photography", "Wellness"], locations: ["All", "Malindi", "Watamu", "Gede", "Mida Creek", "Wider Coast"], experienceTypes: ["All", "Marine", "Nature", "Culture", "Adventure", "Family", "Couples", "Photography", "Relaxation"] },
  "/things-to-do-in-malindi": { title: "Things to do in Malindi", eyebrow: "Explore", intro: "Make your time on the Kenyan Coast count with marine, nature, culture and adventure experiences.", data: experiences, type: "experience", filters: ["All", "Marine", "Boat Trips", "Fishing", "Snorkelling", "Diving", "Sunset Cruises", "Sandbank", "Water Sports", "Beach Activities", "History & Culture", "Adventure"], locations: ["All", "Malindi"], experienceTypes: ["All", "Marine", "Culture", "Adventure", "Family", "Couples", "Photography", "Relaxation"], matches: (item) => item.location.includes("Malindi") },
  "/things-to-do-in-watamu": { title: "Things to do in Watamu", eyebrow: "Explore", intro: "Explore water, nature, mangroves, history and easy coast days on the Watamu side of your trip.", data: experiences, type: "experience", filters: ["All", "Marine", "Boat Trips", "Snorkelling", "Diving", "Dolphin Experiences", "Nature", "Wildlife", "Family Activities", "Couples & Romantic"], locations: ["All", "Watamu", "Mida Creek", "Gede"], experienceTypes: ["All", "Marine", "Nature", "Adventure", "Family", "Couples", "Photography", "Relaxation"], matches: (item) => item.location.includes("Watamu") || item.location.includes("Mida") || item.location.includes("Gede") },
  "/excursions": { title: "Excursions from Malindi", eyebrow: "Explore further", intro: "Day-trip ideas for the places around Malindi, Watamu and the wider Kenyan Coast.", data: excursions, type: "excursion", filters: ["All", "Day Trip", "Nature", "Culture", "Culture & Nature", "Adventure", "Wildlife"], locations: ["All", "Malindi", "Watamu", "Gede", "Mambrui", "Kilifi", "Marafa", "Mombasa", "Tsavo"], experienceTypes: ["All", "Day Trip", "Nature", "Culture", "Adventure"] },
  "/malindi-excursions": { title: "Malindi excursions", eyebrow: "Explore further", intro: "Local ideas for getting out on the water, into nature and closer to the coast.", data: excursions, type: "excursion", filters: ["All", "Day Trip", "Nature", "Culture", "Culture & Nature", "Adventure", "Wildlife"], locations: ["All", "Malindi", "Watamu", "Gede", "Mambrui", "Kilifi", "Marafa", "Mombasa", "Tsavo"], experienceTypes: ["All", "Day Trip", "Nature", "Culture", "Adventure"] },
  "/places-to-stay": { title: "Where to stay", eyebrow: "Stay", intro: "The right base changes the whole trip. Tell us what matters to you and we will help you find your fit.", data: stays, type: "stay", filters: ["All", "Residence", "Hotels", "Hotel", "Resorts", "Villas", "Apartments", "Guesthouses", "Boutique Stays", "Boutique Hotel", "Budget Stays", "Luxury Stays", "Luxury Property", "Beachfront Stays", "Accommodation Facility"], locations: ["All", "Malindi", "Casuarina", "Watamu", "Location to confirm"], relationshipFilters: ["All", "Managed by Visit Malindi", "Visit Malindi Partner", "General accommodation"] },
  "/hotels-in-malindi": { title: "Hotels in Malindi", eyebrow: "Stay", intro: "Explore a starting point for hotels, resorts, villas and guesthouses across the coast.", data: stays, type: "stay", filters: ["All", "Residence", "Hotel", "Beach Resort", "Boutique Hotel", "Family Stay"], locations: ["All", "Malindi", "Casuarina"], relationshipFilters: ["All", "Managed by Visit Malindi", "Visit Malindi Partner", "General accommodation"], matches: (item) => item.location.includes("Malindi") },
  "/beach-resorts-in-malindi": { title: "Beach resorts in Malindi", eyebrow: "Stay", intro: "A beach-first guide to finding your place by the Indian Ocean.", data: stays, type: "stay", filters: ["All", "Beach Resort", "Boutique Hotel", "Family Stay"], locations: ["All", "Malindi", "Casuarina"], relationshipFilters: ["All", "Managed by Visit Malindi", "Visit Malindi Partner", "General accommodation"], matches: (item) => item.location.includes("Malindi") && item.category === "Beach Resort" },
  "/eat-and-drink": { title: "Eat & drink", eyebrow: "Taste the coast", intro: "Discover named venues across Malindi and Watamu, then ask Visit Malindi to handle a table request and confirm the practical details.", data: foodGuides, type: "food", filters: ["All", "Restaurants", "Restaurant", "Café", "Seafood", "Local food", "Fine Dining", "Beach Restaurant", "Bars", "Lounges", "Casual Dining"], locations: ["All", "Malindi", "Watamu"], concierge: "food" },
  "/restaurants-in-malindi": { title: "Restaurants in Malindi", eyebrow: "Taste the coast", intro: "Choose a Malindi venue, then ask Visit Malindi to make a table enquiry and confirm the details for your date.", data: foodGuides, type: "food", filters: ["All", "Restaurants", "Restaurant", "Café", "Fine Dining", "Beach Restaurant", "Bars", "Lounges", "Local food"], locations: ["All", "Malindi"], concierge: "food", matches: (item) => item.location.includes("Malindi") },
  "/restaurants-in-watamu": { title: "Restaurants in Watamu", eyebrow: "Taste the coast", intro: "Choose a Watamu venue, then ask Visit Malindi to make a table enquiry and confirm the details for your date.", data: foodGuides, type: "food", filters: ["All", "Restaurants", "Restaurant", "Fine Dining", "Beach Restaurant", "Seafood", "Bars", "Lounges", "Local food"], locations: ["All", "Watamu"], concierge: "food", matches: (item) => item.location.includes("Watamu") },
  "/nightlife": { title: "Nightlife on the coast", eyebrow: "After dark", intro: "Explore permanent venues in Malindi and Watamu, then ask Visit Malindi what is happening tonight and how to shape the whole evening.", data: nightlife, type: "nightlife", filters: ["All", "Clubs", "Club", "Bars", "Beach Bar", "Cocktail Bar", "Lounges", "Lounge", "Creek Bar", "Beach Venue", "Beach Nightlife"], locations: ["All", "Malindi", "Watamu"], concierge: "nightlife", nightlifeDestination: "the coast" },
  "/malindi-nightlife": { title: "Nightlife in Malindi", eyebrow: "After dark", intro: "Start with permanent Malindi venues, then ask Visit Malindi for tonight's local word, reservations and transport support.", data: nightlife, type: "nightlife", filters: ["All", "Clubs", "Club", "Bars", "Beach Bar", "Lounges", "Beach Nightlife"], locations: ["All", "Malindi"], concierge: "nightlife", nightlifeDestination: "Malindi", matches: (item) => item.location.includes("Malindi") },
  "/watamu-nightlife": { title: "Nightlife in Watamu", eyebrow: "After dark", intro: "Start with permanent Watamu venues, then ask Visit Malindi for tonight's local word, reservations and transport support.", data: nightlife, type: "nightlife", filters: ["All", "Bars", "Beach Bar", "Cocktail Bar", "Lounges", "Lounge", "Creek Bar", "Beach Venue", "Beach Nightlife"], locations: ["All", "Watamu"], concierge: "nightlife", nightlifeDestination: "Watamu", matches: (item) => item.location.includes("Watamu") },
  "/transfers": { title: "Transfers & transport concierge", eyebrow: "Move with ease", intro: "Request airport, SGR, intercity and local transport through Visit Malindi. Tell us your route and timing, then we will confirm the current options manually.", data: transfers, type: "transfer", filters: ["All", "Airport Transfers", "SGR Transfers", "Intercity", "Local & Experience Transfers"], locations: ["All", "Malindi", "Watamu", "Mombasa", "Kilifi", "Mambrui", "Lamu"], concierge: "transfer", transferLanding: true },
  "/airport-transfers": { title: "Airport transfers", eyebrow: "Move with ease", intro: "Request a connection between Malindi or Mombasa Airport and Malindi or Watamu. Visit Malindi will confirm the current options, price and arrangements manually.", data: transfers, type: "transfer", filters: ["All", "Airport Transfers"], concierge: "transfer", matches: (item) => item.category === "Airport Transfers" },
  "/sgr-transfers": { title: "Mombasa SGR transfers", eyebrow: "Move with ease", intro: "Request a connection between Mombasa SGR and Malindi or Watamu, then let Visit Malindi confirm the practical details.", data: transfers, type: "transfer", filters: ["All", "SGR Transfers"], concierge: "transfer", matches: (item) => item.category === "SGR Transfers" },
  "/intercity-transfers": { title: "Intercity coast transfers", eyebrow: "Move with ease", intro: "Request the coast leg between Malindi, Watamu, Kilifi, Mombasa, Mambrui or Lamu through the Visit Malindi concierge.", data: transfers, type: "transfer", filters: ["All", "Intercity"], concierge: "transfer", matches: (item) => item.category === "Intercity" },
  "/local-transfers": { title: "Local & experience transfers", eyebrow: "Move with ease", intro: "Request a local connection for dinner, an excursion, nightlife, your airport or SGR departure, a day trip or your group.", data: transfers, type: "transfer", filters: ["All", "Local & Experience Transfers"], concierge: "transfer", matches: (item) => item.category === "Local & Experience Transfers" },
  "/malindi-airport-transfer": { title: "Malindi airport transfers", eyebrow: "Move with ease", intro: "Request a connection between Malindi Airport and Malindi or Watamu, then let the concierge confirm the practical details.", data: transfers, type: "transfer", filters: ["All", "Airport Transfers"], concierge: "transfer", matches: (item) => item.category === "Airport Transfers" && item.route.includes("Malindi Airport") },
  "/mombasa-airport-to-malindi": { title: "Mombasa Airport to Malindi", eyebrow: "Move with ease", intro: "Tell us when you land and what you need. Visit Malindi will confirm the current transfer options manually.", data: transfers, type: "transfer", filters: ["All", "Airport Transfers"], concierge: "transfer", matches: (item) => item.slug === "mombasa-airport-to-malindi" },
  "/mombasa-to-malindi-transfer": { title: "Mombasa to Malindi transfer", eyebrow: "Move with ease", intro: "Request the coast connection between Mombasa and Malindi through the concierge.", data: transfers, type: "transfer", filters: ["All", "Intercity"], concierge: "transfer", matches: (item) => item.slug === "malindi-to-mombasa" },
  "/sgr-to-malindi": { title: "SGR to Malindi", eyebrow: "Move with ease", intro: "Coming by train? Request the next step from Mombasa SGR to Malindi through Visit Malindi.", data: transfers, type: "transfer", filters: ["All", "SGR Transfers"], concierge: "transfer", matches: (item) => item.slug === "sgr-to-malindi" },
  "/places-to-visit": { title: "Places to visit", eyebrow: "Explore", intro: "Beaches, history, nature and culture — the coast has more than one way to surprise you.", data: attractions, type: "attraction", filters: ["All", "Beach", "Historical", "Nature", "Culture"], locations: ["All", "Malindi", "Watamu", "Gede", "Mambrui", "Kilifi", "Mombasa", "Marafa", "Wider Coast", "Wider Kenyan Coast"] },
  "/itineraries": { title: "Find your way to Malindi", eyebrow: "Plan", intro: "Ready-made ideas for a day, a weekend or a longer escape. Use these as a starting point, then make them yours.", data: itineraries, type: "itinerary", filters: ["All", "1 day", "2 days", "3 days", "Weekend", "Flexible"] },
};

function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    arrowUp: <><path d="M12 19V5" /><path d="m6 11 6-6 6 6" /></>,
    arrowDown: <><path d="M12 5v14" /><path d="m6 13 6 6 6-6" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    close: <><path d="m6 6 12 12" /><path d="m18 6-12 12" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    whatsapp: <><path d="M20 11.5a8 8 0 0 1-11.7 7L4 20l1.5-4.2A8 8 0 1 1 20 11.5Z" /><path d="M8.5 9.5c.2 1.5 2.4 3.8 4 4.1.7.1 1.3-.3 1.7-.8l.4-.5-1.9-.9-.5.6c-.2.2-.4.2-.7.1-.7-.3-1.5-1-2-1.7-.2-.3-.2-.5 0-.7l.4-.5-.9-1.8-.5.2c-.5.2-.7.7-.6 1.9Z" /></>,
    calendar: <><rect x="3.5" y="5" width="17" height="16" rx="2" /><path d="M16 3v4M8 3v4M3.5 10h17" /></>,
    sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
    heart: <path d="M20.8 8.7c0 5.5-8.8 10.4-8.8 10.4S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function SmartImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  return failed ? <div className={`image-fallback ${className}`} role="img" aria-label={alt}><Icon name="compass" size={36} /></div> : <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}

function WhatsAppButton({ type = "general", name = "", label = "Talk to a Local", className = "", context = "" }) {
  return (
    <a className={`button button-whatsapp ${className}`} href={whatsappLink(enquiryMessage(type, name, context))} target="_blank" rel="noreferrer" onClick={() => window.dispatchEvent(new CustomEvent("whatsapp-click", { detail: { type, name } }))}>
      <Icon name="whatsapp" size={17} /> {label}
    </a>
  );
}

function Header({ onSearch }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);
  const go = (path) => { setOpen(false); navigate(path); };
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="/" onClick={(event) => { event.preventDefault(); go("/"); }}>
          <img className="brand-logo" src="/visit-malindi-logo.png" alt="Visit Malindi" />
        </a>
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
          <div className="mobile-nav-heading"><span>Explore the coast</span><button className="icon-button" aria-label="Close menu" onClick={() => setOpen(false)}><Icon name="close" /></button></div>
          {navItems.map((item) => <a key={item.path} href={item.path} onClick={(event) => { event.preventDefault(); go(item.path); }}>{item.label}</a>)}
          <div className="mobile-nav-cta"><WhatsAppButton label="Talk to Visit Malindi" /></div>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-trigger" onClick={onSearch} aria-label="Search"><Icon name="search" /></button>
          <WhatsAppButton label="WhatsApp Concierge" className="header-cta" />
          <button className="icon-button menu-trigger" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a className="brand brand-light" href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }}><img className="brand-logo" src="/visit-malindi-logo.png" alt="Visit Malindi" /></a>
          <p>Discover the Coast Your Way.</p>
          <WhatsAppButton label="Talk to a Local" />
        </div>
        <div className="footer-links"><h3>Explore</h3>{navItems.slice(0, 5).map((item) => <a key={item.path} href={item.path} onClick={(e) => { e.preventDefault(); navigate(item.path); }}>{item.label}</a>)}</div>
        <div className="footer-links"><h3>Plan</h3>{["/itineraries", "/transfers", "/whats-on", "/plan-my-trip"].map((path) => <a key={path} href={path} onClick={(e) => { e.preventDefault(); navigate(path); }}>{path === "/plan-my-trip" ? "Build My Experience" : path.replace("/", "").replaceAll("-", " ")}</a>)}</div>
        <div className="footer-links footer-contact"><h3>Contact</h3><WhatsAppButton label="WhatsApp" /><a href="mailto:travel@visitmalindi.co.ke">travel@visitmalindi.co.ke</a><span>Malindi Complex, Malindi</span></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Visit Malindi</span><div><a href="/privacy" onClick={(e) => { e.preventDefault(); navigate("/privacy"); }}>Privacy</a><a href="/terms" onClick={(e) => { e.preventDefault(); navigate("/terms"); }}>Terms</a><a href="/disclaimer" onClick={(e) => { e.preventDefault(); navigate("/disclaimer"); }}>Disclaimer</a></div><span>Made for the coast</span></div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return <a className="floating-whatsapp" href={whatsappLink(enquiryMessage("general", ""))} target="_blank" rel="noreferrer" aria-label="Talk to Visit Malindi on WhatsApp"><Icon name="whatsapp" size={22} /><span>Talk to a Local</span></a>;
}

function SectionHeading({ eyebrow, title, text, action, dark = false }) {
  return <div className={`section-heading ${dark ? "section-heading-dark" : ""}`}><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>;
}

function ExploreCard({ item, index }) {
  return <a className={`explore-card explore-card-${item.tone}`} href={item.path} onClick={(e) => { e.preventDefault(); navigate(item.path); }}><SmartImage src={item.image} alt={item.title} /><div className="explore-card-shade" /><span className="explore-number">0{index + 1}</span><div className="explore-card-copy"><h3>{item.title}</h3><p>{item.text}</p><span className="text-link">Explore <Icon name="arrow" size={15} /></span></div></a>;
}

function HomePage() {
  return <>
    <main>
      <section className="hero">
        <SmartImage src={photos.hero} alt="Turquoise Indian Ocean along the Kenyan Coast" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content page-width">
          <span className="eyebrow eyebrow-light">Malindi · Watamu · The Kenyan Coast</span>
          <h1>Discover the<br /><em>coast</em> your way.</h1>
          <p>Where to stay, what to do, where to eat and how to experience the coast — with a local helping hand when you need it.</p>
          <div className="hero-actions"><a className="button button-primary" href="/things-to-do" onClick={(e) => { e.preventDefault(); navigate("/things-to-do"); }}>Explore Malindi <Icon name="arrow" size={17} /></a><WhatsAppButton label="Talk to Visit Malindi" /></div>
        </div>
        <div className="hero-note"><span className="hero-note-line" /> <span>You're coming to Malindi.<br /><strong>We've got you.</strong></span></div>
        <div className="scroll-cue"><span>Scroll to explore</span><Icon name="arrowDown" size={16} /></div>
      </section>

      <section className="intro-strip page-width"><div className="intro-mark">VM</div><p>Visit Malindi is your digital front desk for the coast — a curated guide to the places, experiences and moments that make this corner of Kenya unforgettable.</p><a className="text-link" href="/about" onClick={(e) => { e.preventDefault(); navigate("/about"); }}>Our story <Icon name="arrow" size={15} /></a></section>

      <section className="section page-width explore-section"><SectionHeading eyebrow="Start here" title="Explore Malindi" text="However you like to travel, begin with what you want to feel." /><div className="explore-grid">{exploreCategories.map((item, index) => <ExploreCard key={item.path} item={item} index={index} />)}</div></section>

      <section className="section section-tint page-width feature-section"><SectionHeading eyebrow="Curated for you" title="Make a day of it" text="A few ways to get closer to the coast. Ask us about the details, availability and the best fit for your trip." action={<a className="text-link text-link-dark" href="/things-to-do" onClick={(e) => { e.preventDefault(); navigate("/things-to-do"); }}>See all experiences <Icon name="arrow" size={15} /></a>} /><div className="listing-grid listing-grid-featured">{experiences.filter((item) => item.featured).slice(0, 4).map((item) => <ListingCard key={item.id} item={item} type="experience" showEnquiry={false} />)}</div></section>

      <section className="split-story page-width"><div className="split-story-image"><SmartImage src={photos.mangrove} alt="Mangrove-lined waters on the Kenyan Coast" /></div><div className="split-story-copy"><span className="eyebrow">A different kind of guide</span><h2>More than a list of places.</h2><p>Malindi is a feeling — warm water, late lunches, old stories, easy conversations and the freedom to change your plans. We bring the local context that helps you find your version of it.</p><a className="button button-outline" href="/plan-my-trip" onClick={(e) => { e.preventDefault(); navigate("/plan-my-trip"); }}>Build My Experience <Icon name="arrow" size={17} /></a></div></section>

      <section className="nightlife-banner"><SmartImage src={photos.night} alt="Nightlife lights by the coast" /><div className="nightlife-banner-shade" /><div className="nightlife-banner-content page-width"><span className="eyebrow eyebrow-light">After dark</span><h2>When the sun goes down,<br /><em>Malindi comes alive.</em></h2><p>Clubs, DJs, live music, beach lounges and the night's best plans — ask a local.</p><WhatsAppButton type="nightlife" name="Club / DJ / Live Music / Beach Party / Lounge" label="Ask What's Happening Tonight" /></div></section>

      <section className="section page-width stay-preview"><SectionHeading eyebrow="Stay awhile" title="Find your place by the sea" text="From a quiet base to a full beach escape, we can help you look in the right direction." action={<a className="text-link text-link-dark" href="/places-to-stay" onClick={(e) => { e.preventDefault(); navigate("/places-to-stay"); }}>Explore stays <Icon name="arrow" size={15} /></a>} /><div className="listing-grid">{stays.map((item) => <ListingCard key={item.id} item={item} type="stay" showEnquiry={false} />)}</div></section>

      <section className="planning-band page-width"><div><span className="eyebrow">Not sure where to start?</span><h2>Tell us what your<br /><em>perfect coast day</em> looks like.</h2></div><a className="button button-dark" href="/plan-my-trip" onClick={(e) => { e.preventDefault(); navigate("/plan-my-trip"); }}>Build My Experience <Icon name="arrow" size={17} /></a></section>
    </main>
  </>;
}

function Filters({ filters, active, onChange, className = "", label = "Filter results" }) {
  return <div className={`filter-row ${className}`} role="group" aria-label={label}>{filters.map((filter) => <button key={filter} type="button" aria-pressed={active === filter} className={active === filter ? "filter-chip active" : "filter-chip"} onClick={() => onChange(filter)}>{filter}</button>)}</div>;
}

function ConciergePanel({ kind, nightlifeDestination }) {
  const nightlifePanel = kind === "nightlife";
  const transferPanel = kind === "transfer";
  const title = nightlifePanel ? "Go Out With Visit Malindi" : transferPanel ? "Arrange My Transport" : "Book / Enquire With Visit Malindi";
  const text = nightlifePanel
    ? "The permanent venues below are a starting point, not a live events calendar. Tell us your mood and group, and we can help shape an evening around the latest local information."
    : transferPanel
      ? "Choose a route or tell us what you need. Share your date, group and timing on WhatsApp, then Visit Malindi will confirm the available options, price and arrangements manually."
      : "Choose a venue, then let Visit Malindi send a table request and help connect your meal to the rest of your coast plans.";
  const services = nightlifePanel
    ? ["Where to go tonight", "Dinner + nightlife plans", "Reservations", "Transport", "Group outings", "Local guidance"]
    : transferPanel
      ? ["Airport transfers", "Mombasa SGR transfers", "Intercity travel", "Hotel connections", "Private day trips", "Group transport"]
      : ["Table requests", "Restaurant recommendations", "Food + nightlife plans", "Group dining", "Transfers", "Local guidance"];
  const messageType = nightlifePanel ? "nightlife" : transferPanel ? "transferGeneral" : "food";
  const messageName = nightlifePanel ? nightlifeDestination : transferPanel ? "" : "a restaurant or venue";
  const ctaLabel = nightlifePanel ? "Go Out With Visit Malindi" : transferPanel ? "Arrange My Transport" : "Book / Enquire with Visit Malindi";
  return <section className={`concierge-panel ${nightlifePanel ? "concierge-panel-night" : ""}`}><div><span className="eyebrow">{nightlifePanel ? "After-dark concierge" : transferPanel ? "Transport concierge" : "Dining concierge"}</span><h2>{title}</h2><p>{text}</p><WhatsAppButton type={messageType} name={messageName} label={ctaLabel} /></div><ul>{services.map((service) => <li key={service}><span>✓</span>{service}</li>)}</ul></section>;
}

function TransferLandingGuide() {
  const steps = [
    ["1", "Choose a service", "Browse airport, SGR, intercity or local transport and open the route that fits your plans."],
    ["2", "Request transfer", "Use the route card or detail page to send a request with your date, group and timing."],
    ["3", "Chat on WhatsApp", "Visit Malindi receives your request and can ask for any practical details that are still needed."],
    ["4", "Confirm manually", "Visit Malindi confirms the current availability, price and arrangements before anything is finalised."],
  ];
  return <section className="transfer-landing-guide"><div className="transfer-why"><span className="eyebrow">Why use Visit Malindi</span><h2>Keep the moving parts in one conversation.</h2><p>Whether you are arriving, changing destinations, heading to dinner or planning a day out, the concierge can connect transport to the rest of your coast plans.</p><ul><li>Tell us the route, date, group and timing that matter to you.</li><li>Get current practical details confirmed manually, rather than relying on fixed assumptions.</li><li>Pair transport with your stay, activities, dining, nightlife or itinerary.</li></ul></div><div className="transfer-enquiry-flow"><span className="eyebrow">Simple enquiry flow</span><h2>From request to arrangements.</h2><ol>{steps.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>;
}

function ListingPage({ config }) {
  const [filter, setFilter] = useState("All");
  const [location, setLocation] = useState("All");
  const [experienceType, setExperienceType] = useState("All");
  const [relationship, setRelationship] = useState("All");
  useEffect(() => { setFilter("All"); setLocation("All"); setExperienceType("All"); setRelationship("All"); }, [config.title]);
  const scopedData = config.matches ? config.data.filter(config.matches) : config.data;
  const matchesCategory = (item, candidate) => {
    if (candidate === "All") return true;
    const normalized = candidate.toLowerCase();
    return [item.category, item.duration, ...(item.tags || [])].filter(Boolean).some((value) => value.toLowerCase() === normalized || value.toLowerCase().includes(normalized));
  };
  const availableFilters = config.filters?.filter((candidate) => scopedData.some((item) => matchesCategory(item, candidate))) || [];
  const availableLocations = config.locations?.filter((candidate) => candidate === "All" || scopedData.some((item) => item.location.includes(candidate))) || [];
  const availableRelationships = config.relationshipFilters?.filter((candidate) => candidate === "All" || scopedData.some((item) => item.relationship === candidate)) || [];
  const availableExperienceTypes = config.experienceTypes?.filter((candidate) => candidate === "All" || scopedData.some((item) => item.experienceTypes?.includes(candidate))) || [];
  const visible = scopedData.filter((item) => {
    const categoryMatch = matchesCategory(item, filter);
    return categoryMatch && (location === "All" || item.location.includes(location)) && (experienceType === "All" || item.experienceTypes?.includes(experienceType)) && (relationship === "All" || item.relationship === relationship);
  });
  const featured = visible.filter((item) => item.featured).slice(0, 3);
  const popular = visible.filter((item) => item.popular && !item.featured).slice(0, 3);
  const featuredItems = featured.length ? featured : visible.slice(0, 3);
  const primaryConcierge = config.type === "nightlife"
    ? <WhatsAppButton type="nightlife" name={config.nightlifeDestination} label="Go Out With Visit Malindi" />
    : config.type === "food"
      ? <WhatsAppButton type="food" name="a restaurant or venue" label="Book / Enquire with Visit Malindi" />
      : config.type === "transfer"
        ? <WhatsAppButton type="transferGeneral" label="Arrange My Transport" />
      : <WhatsAppButton label="Talk to a Local" />;
  return <main className="page-shell"><section className="page-hero page-width"><span className="eyebrow">{config.eyebrow}</span><h1>{config.title}</h1><p>{config.intro}</p><div className="page-hero-actions">{primaryConcierge}{config.type === "experience" && <a className="button button-outline" href="/excursions" onClick={(e) => { e.preventDefault(); navigate("/excursions"); }}>Explore excursions <Icon name="arrow" size={16} /></a>}{config.type === "itinerary" && <a className="button button-outline" href="/plan-my-trip" onClick={(e) => { e.preventDefault(); navigate("/plan-my-trip"); }}>Build My Experience <Icon name="arrow" size={16} /></a>}</div></section><section className="section page-width listing-section">{config.concierge && <ConciergePanel kind={config.concierge} nightlifeDestination={config.nightlifeDestination} />}{config.transferLanding && <TransferLandingGuide />}<Filters filters={availableFilters} active={filter} onChange={setFilter} label="Filter by category" />{availableLocations.length > 1 && <div className="location-filter"><span className="eyebrow">Browse by location</span><Filters filters={availableLocations} active={location} onChange={setLocation} className="location-filter-row" label="Filter by location" /></div>}{availableRelationships.length > 1 && <div className="relationship-filter"><span className="eyebrow">How Visit Malindi is involved</span><Filters filters={availableRelationships} active={relationship} onChange={setRelationship} className="location-filter-row" label="Filter by Visit Malindi relationship" /></div>}{availableExperienceTypes.length > 1 && <div className="experience-type-filter"><span className="eyebrow">Choose an experience type</span><Filters filters={availableExperienceTypes} active={experienceType} onChange={setExperienceType} className="location-filter-row" label="Filter by experience type" /></div>}{featuredItems.length > 0 && <div className="featured-listings"><div className="featured-listings-heading"><div><span className="eyebrow">Start here</span><h2>Featured picks</h2></div><span className="result-count">{visible.length} {visible.length === 1 ? "listing" : "listings"}</span></div><div className="listing-grid">{featuredItems.map((item) => <ListingCard key={`featured-${item.id}`} item={item} type={config.type} />)}</div></div>}{popular.length > 0 && <div className="popular-listings"><div className="featured-listings-heading"><div><span className="eyebrow">Editorial picks</span><h2>Suggested starting points</h2></div></div><div className="listing-grid">{popular.map((item) => <ListingCard key={`popular-${item.id}`} item={item} type={config.type} />)}</div></div>}<div className="listing-grid listing-grid-large">{visible.map((item) => <ListingCard key={item.id} item={item} type={config.type} />)}</div>{visible.length === 0 && <EmptyState />}</section><TrustNote /></main>;
}

function EventsPage() {
  const [filter, setFilter] = useState("Tonight");
  const filters = ["Tonight", "This Weekend", "Events", "DJ", "Live Music", "Beach Party", "Nightlife", "Family", "Food"];
  const activeEvents = events.filter((event) => !event.expiresAt || new Date(event.expiresAt) >= new Date());
  const visible = activeEvents.filter((event) => filter === "Events" || event.filters?.includes(filter) || event.category === filter);
  return <main className="page-shell"><section className="page-hero page-width"><span className="eyebrow">Stay in the know</span><h1>What's happening?</h1><p>Events are time-sensitive. Ask us what is happening tonight, this weekend or while you are in town.</p><div className="page-hero-actions"><WhatsAppButton type="nightlife" name="Club / DJ / Live Music / Beach Party / Lounge" label="Ask What's Happening Tonight" /></div></section><section className="page-width event-filters"><Filters filters={filters} active={filter} onChange={setFilter} /></section>{visible.length ? <section className="section page-width listing-section"><div className="listing-grid listing-grid-large">{visible.map((event) => <ListingCard key={event.id} item={event} type="event" />)}</div></section> : <section className="empty-events page-width"><div className="empty-events-art"><Icon name="calendar" size={35} /></div><span className="eyebrow">No active {filter.toLowerCase()} listings yet</span><h2>Let's make a plan.</h2><p>We keep this guide current rather than filling it with expired events. Message us for the latest local word.</p><WhatsAppButton type="nightlife" name="Club / DJ / Live Music / Beach Party / Lounge" label="Ask What's Happening Tonight" /></section>}<TrustNote /></main>;
}

function Planner() {
  const [duration, setDuration] = useState("");
  const [travelling, setTravelling] = useState("");
  const [interests, setInterests] = useState([]);
  const interestOptions = ["Beach", "Adventure", "Food", "Nature", "History", "Nightlife", "Relaxation", "Culture"];
  const toggle = (interest) => setInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest]);
  const ready = duration && travelling && interests.length;
  const message = enquiryMessage("general", "", `I'd like help planning my trip.\n\nDuration: ${duration || "Not sure yet"}\nTravelling: ${travelling || "Not sure yet"}\nInterests: ${interests.length ? interests.join(", ") : "Open to recommendations"}`);
  return <main className="planner-page"><section className="planner-intro page-width"><span className="eyebrow">Your coast, your way</span><h1>Build My<br /><em>Malindi Experience.</em></h1><p>Give us a sense of your trip. We will take it from there on WhatsApp — with local ideas, honest context and room for the unexpected.</p></section><section className="planner-form-wrap page-width"><div className="planner-progress"><span className={duration ? "done" : "current"}>01</span><i /><span className={travelling ? "done" : duration ? "current" : ""}>02</span><i /><span className={interests.length ? "done" : travelling ? "current" : ""}>03</span></div><div className="planner-question"><span className="eyebrow">Question 01</span><h2>How long are you staying?</h2><div className="choice-grid">{["1 day", "2 days", "3–5 days", "1 week+"].map((choice) => <button key={choice} className={duration === choice ? "choice-card selected" : "choice-card"} onClick={() => setDuration(choice)}><span>{choice}</span><Icon name="arrow" size={16} /></button>)}</div></div><div className="planner-question"><span className="eyebrow">Question 02</span><h2>Who are you travelling with?</h2><div className="choice-grid choice-grid-four">{["Couple", "Family", "Friends", "Solo"].map((choice) => <button key={choice} className={travelling === choice ? "choice-card selected" : "choice-card"} onClick={() => setTravelling(choice)}><span>{choice}</span><Icon name={choice === "Couple" ? "heart" : "compass"} size={16} /></button>)}</div></div><div className="planner-question"><span className="eyebrow">Question 03</span><h2>What do you enjoy?</h2><div className="interest-grid">{interestOptions.map((interest) => <button key={interest} className={interests.includes(interest) ? "interest-chip selected" : "interest-chip"} onClick={() => toggle(interest)}>{interests.includes(interest) && <span>✓</span>}{interest}</button>)}</div></div><div className="planner-submit"><div><span className="eyebrow">Ready when you are</span><p>{ready ? "Your preferences are ready to share." : "Choose as much or as little as you know."}</p></div><a className={`button button-dark ${!ready ? "button-muted" : ""}`} href={whatsappLink(message)} target="_blank" rel="noreferrer">Build My Experience <Icon name="arrow" size={17} /></a></div></section></main>;
}

function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState("");
  const dialogRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = [...dialogRef.current.querySelectorAll('button:not([disabled]), a[href], input:not([disabled])')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!focusable.length) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);
  const results = useMemo(() => query.trim().length < 2 ? [] : searchIndex.filter((item) => `${item.name} ${item.category} ${item.location} ${item.relationship || ""} ${(item.tags || []).join(" ")}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query]);
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-title"><div className="search-dialog" ref={dialogRef}><div className="search-dialog-top"><span className="eyebrow" id="search-title">Search the coast</span><button className="icon-button" onClick={onClose} aria-label="Close search"><Icon name="close" /></button></div><div className="search-input-wrap"><Icon name="search" size={24} /><input ref={inputRef} aria-label="Search Visit Malindi" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “beach”, “Gede Ruins” or “transfers”" /></div>{query.trim().length >= 2 && <div className="search-results">{results.map((item) => <a key={`${item.type}-${item.id}`} href={item.path} onClick={(e) => { e.preventDefault(); onClose(); navigate(item.path); }}><span className="search-result-image"><SmartImage src={item.image} alt="" /></span><span><strong>{item.name}</strong><small>{item.type} · {item.location}</small></span><Icon name="arrow" size={16} /></a>)}{!results.length && <EmptyState compact />}</div>}<div className="search-suggestions"><span>Popular searches</span><button onClick={() => setQuery("beach")}>Beach</button><button onClick={() => setQuery("Malindi")}>Malindi</button><button onClick={() => setQuery("nature")}>Nature</button><button onClick={() => setQuery("transfer")}>Transfers</button></div></div></div>;
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const results = searchIndex.filter((item) => `${item.name} ${item.category} ${item.location} ${item.relationship || ""} ${(item.tags || []).join(" ")}`.toLowerCase().includes(query.toLowerCase()));
  return <main className="page-shell"><section className="page-hero page-width search-page-hero"><span className="eyebrow">Find your way</span><h1>Search the coast.</h1><p>Experiences, places to stay, food, nightlife, transfers and more.</p><div className="full-search-input"><Icon name="search" size={22} /><input aria-label="Search Visit Malindi" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" /></div></section><section className="section page-width search-page-results">{query && <p className="result-count">{results.length} result{results.length === 1 ? "" : "s"} for “{query}”</p>}<div className="search-result-list">{results.map((item) => <a className="search-result-row" key={`${item.type}-${item.id}`} href={item.path} onClick={(e) => { e.preventDefault(); navigate(item.path); }}><span className="search-result-image"><SmartImage src={item.image} alt="" /></span><span><small>{item.type}</small><strong>{item.name}</strong><em>{item.location}</em></span><Icon name="arrow" size={18} /></a>)}</div>{query && !results.length && <EmptyState />}{!query && <div className="search-empty"><Icon name="compass" size={34} /><h2>Start with a feeling.</h2><p>Try “marine”, “family”, “nightlife” or “three days”.</p></div>}</section></main>;
}

function AboutPage() {
  return <main className="editorial-page"><section className="editorial-hero page-width"><span className="eyebrow">About Visit Malindi</span><h1>The coast is better<br /><em>when you know where to look.</em></h1><p>Visit Malindi helps visitors discover Malindi, Watamu and the Kenyan Coast — with a little local context and a human being on the other end of WhatsApp.</p></section><section className="editorial-image page-width"><SmartImage src={photos.hero} alt="Ocean and beach on the Kenyan Coast" /></section><section className="editorial-copy page-width"><div><span className="eyebrow">What we do</span></div><div><p>We connect travellers with places to stay, local experiences, restaurants, attractions, nightlife, transfers and itineraries.</p><p>We are not here to give you a long list and send you on your way. We are here to make planning a trip to Malindi feel easier — to help you choose, ask better questions and find the moments that stay with you.</p><WhatsAppButton label="Talk to Visit Malindi" /></div></section><section className="values-grid page-width">{[["01", "Local, not generic", "The coast has its own rhythm. We keep the guide rooted in place."], ["02", "Helpful, not pushy", "We give you context so you can make decisions that feel right."], ["03", "Simple, for now", "Discovery and human connection first. Complexity only when it makes the experience better."]].map(([number, title, text]) => <div key={number}><span className="value-number">{number}</span><h3>{title}</h3><p>{text}</p></div>)}</section></main>;
}

function ContactPage() {
  return <main className="contact-page page-width"><section className="contact-hero"><span className="eyebrow">Say hello</span><h1>Got a question?<br /><em>We’ve got you.</em></h1><p>Whether you are planning a trip, looking for a place to stay or simply wondering what is happening tonight, start a conversation.</p></section><div className="contact-grid"><div className="contact-card contact-card-primary"><span className="eyebrow">Fastest way to reach us</span><h2>Talk to a local on WhatsApp.</h2><p>Tell us what you are looking for and we will help you take the next step.</p><WhatsAppButton label="Open WhatsApp Concierge" />{!isWhatsAppConfigured && <small className="contact-setup-note">The final concierge number still needs to be configured before launch.</small>}</div><div className="contact-card"><span className="eyebrow">Email</span><h2>Prefer email?</h2><p>For longer enquiries or general questions, write to us at:</p><a className="contact-email" href="mailto:travel@visitmalindi.co.ke">travel@visitmalindi.co.ke</a><span className="contact-address"><Icon name="pin" size={16} /> Malindi Complex, Malindi</span></div></div></main>;
}

function LegalPage({ title, children }) {
  return <main className="legal-page page-width"><span className="eyebrow">Visit Malindi</span><h1>{title}</h1><p className="legal-note">This page is a starting point and should be reviewed before final production launch.</p><div className="legal-copy">{children}</div></main>;
}

function PrivacyPolicyPage() {
  return (
    <main className="legal-page page-width">
      <span className="eyebrow">Visit Malindi</span>
      <h1>Privacy Policy</h1>
      <p className="legal-note">Last updated: 22 August 2026</p>
      <div className="legal-copy">
        <p>This Privacy Policy explains how Visit Malindi handles personal information when you use visitmalindi.co.ke or contact us about your trip.</p>

        <h2>1. Who we are</h2>
        <p>Visit Malindi is a destination discovery and local concierge service for Malindi, Watamu and the Kenyan Coast. We help visitors discover and enquire about accommodation, restaurants, nightlife, excursions, activities, itineraries and transport.</p>
        <p>We are not necessarily the direct provider of every accommodation, restaurant, activity or transport service described on this website. We may introduce you to or coordinate with independent providers when you ask us to help with a request.</p>

        <h2>2. Information we may collect</h2>
        <p>We only seek information that is reasonably necessary to respond to a request or provide the concierge service. Depending on what you choose to share, this may include:</p>
        <ul>
          <li>Your name and phone or WhatsApp number</li>
          <li>Your email address</li>
          <li>Travel dates and number of travellers</li>
          <li>Accommodation preferences</li>
          <li>Transport requirements</li>
          <li>Excursion or activity interests</li>
          <li>Restaurant or nightlife enquiries</li>
          <li>Itinerary preferences</li>
          <li>Messages and other information you voluntarily provide</li>
        </ul>
        <p>When applicable, technical information such as your IP address, browser or device information and website usage data may also be processed by the systems used to deliver and protect the website. The website does not currently require registration or account creation.</p>

        <h2>3. How we use information</h2>
        <p>We may use information you provide to:</p>
        <ul>
          <li>Respond to your questions and enquiries</li>
          <li>Arrange accommodation enquiries</li>
          <li>Assist with restaurant and nightlife requests</li>
          <li>Arrange transport enquiries</li>
          <li>Assist with excursions and activities</li>
          <li>Build or customise itineraries</li>
          <li>Communicate with you about a requested service</li>
          <li>Connect you with relevant accommodation, restaurant, activity, transport or other service partners where needed to fulfil your request</li>
          <li>Improve the website and visitor experience</li>
          <li>Maintain website security</li>
          <li>Meet applicable legal obligations</li>
        </ul>

        <h2>4. WhatsApp concierge</h2>
        <p>You may voluntarily contact Visit Malindi through WhatsApp using the links on this website. Information you choose to share there is used to respond to your enquiry and coordinate the services you have requested.</p>
        <p>WhatsApp is operated by an independent third party, not by Visit Malindi. WhatsApp has its own privacy policy, terms and security practices, which apply to your use of that service.</p>

        <h2>5. Third-party service providers</h2>
        <p>If you ask us to arrange accommodation, transport, dining, nightlife or activities, we may need to share relevant information with the provider concerned so that they can respond to or fulfil your request.</p>
        <p>We aim to share only information reasonably necessary for the requested service. Independent providers have their own privacy practices and Visit Malindi is not responsible for how those providers independently handle information after receiving it.</p>

        <h2>6. Accommodation enquiries</h2>
        <p>Visit Malindi may promote selected accommodation properties, manage enquiries for selected properties or connect visitors with accommodation providers. This does not mean that Visit Malindi owns every property listed on the website.</p>

        <h2>7. Bookings and payments</h2>
        <p>This website does not currently process automated online bookings or payments. Where an enquiry is handled manually, availability, pricing and final arrangements are confirmed separately with the relevant parties.</p>
        <p>We do not ask this website to store card or payment information.</p>

        <h2>8. Cookies and analytics</h2>
        <p>The website does not currently use Google Analytics, advertising pixels, marketing cookies or a visitor account system. It does not intentionally use cookies to build an advertising profile. Your browser or hosting and security services may process basic technical request information needed to deliver and protect a website, subject to the practices of those services.</p>

        <h2>9. Data retention</h2>
        <p>Personal information is retained only for as long as reasonably necessary for the purpose for which it was collected, legitimate business purposes, dispute resolution, security and applicable legal obligations. We do not claim a fixed retention period where one has not been established.</p>

        <h2>10. Data security</h2>
        <p>Visit Malindi takes reasonable technical and organisational steps to protect personal information against unauthorised access, loss, misuse or disclosure. No method of transmission or storage can be guaranteed to be completely secure.</p>

        <h2>11. Your data protection rights</h2>
        <p>Subject to applicable Kenyan data protection law, including the Data Protection Act, 2019, you may have the right to:</p>
        <ul>
          <li>Be informed about how your personal data is used</li>
          <li>Request access to personal data we hold about you</li>
          <li>Request correction or rectification of inaccurate information</li>
          <li>Object to processing in appropriate circumstances</li>
          <li>Request deletion or erasure where applicable</li>
          <li>Request restriction of processing where applicable</li>
          <li>Request data portability where applicable</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
        <p>To exercise a right or ask a privacy question, contact Visit Malindi at <a href="mailto:travel@visitmalindi.co.ke">travel@visitmalindi.co.ke</a> or through the Visit Malindi WhatsApp concierge. We may need to verify your request and will respond in line with applicable requirements.</p>

        <h2>12. Children</h2>
        <p>Visit Malindi does not knowingly seek unnecessary personal information from children. Where a service involves children, information should be provided by a parent, guardian or other authorised adult where appropriate.</p>

        <h2>13. International or third-country processing</h2>
        <p>Some third-party platforms or service providers used to operate communications, hosting or website services may process information outside Kenya. Where this occurs, we will consider and apply safeguards required by applicable Kenyan law. We do not claim that all processing takes place in one particular country.</p>

        <h2>14. Data breaches</h2>
        <p>Visit Malindi takes reasonable steps to protect personal information. If we become aware of a personal-data incident, we will assess and handle it, including any required notifications or other action, in accordance with applicable legal requirements.</p>

        <h2>15. Complaints</h2>
        <p>If you have a privacy concern, please contact Visit Malindi first so we can understand and address it. Where applicable, you may also raise a concern with Kenya’s Office of the Data Protection Commissioner (ODPC), the relevant supervisory authority.</p>

        <h2>16. Changes to this policy</h2>
        <p>We may update this Privacy Policy when our services, technology or legal requirements change. The “Last updated” date at the top of this page shows when the current version was published.</p>
      </div>
    </main>
  );
}

function TermsOfUsePage() {
  return (
    <main className="legal-page page-width">
      <span className="eyebrow">Visit Malindi</span>
      <h1>Terms of Use</h1>
      <p className="legal-note">Last updated: 22 August 2026</p>
      <div className="legal-copy">
        <p>These Terms of Use explain the rules for using visitmalindi.co.ke. By using this website, you agree to use it responsibly and to these terms.</p>

        <h2>1. About Visit Malindi</h2>
        <p>Visit Malindi is a destination guide and local concierge service for Malindi, Watamu and the Kenyan Coast. We help visitors discover and enquire about accommodation, restaurants, nightlife, excursions, activities, itineraries and transport.</p>
        <p>Visit Malindi is not the owner, operator or direct provider of every business, property, activity or transport service listed or discussed on this website. Some listings may be independent providers or selected properties for which we manage or facilitate enquiries.</p>

        <h2>2. Using the website</h2>
        <p>You may use this website for lawful personal travel research and planning. Please provide accurate information when making an enquiry and do not use the website to mislead, harass, impersonate another person, interfere with its operation or attempt to gain unauthorised access to any system.</p>
        <p>You are responsible for ensuring that your use of the website and any arrangements you make comply with applicable laws.</p>

        <h2>3. Enquiries and arrangements</h2>
        <p>You may contact Visit Malindi about accommodation, restaurants, nightlife, excursions, activities, itineraries and transport. An enquiry, WhatsApp message, email or other request is not a confirmed booking or guaranteed arrangement.</p>
        <p>A request becomes an arrangement only when Visit Malindi or the relevant provider separately confirms the details. The website does not currently process automated online bookings or payments.</p>

        <h2>4. Independent providers</h2>
        <p>Accommodation properties, restaurants, nightlife venues, excursion and activity providers, transport providers and other businesses control their own services. They are responsible for their own prices, availability, opening hours, schedules, booking terms, cancellations, rules, standards and delivery.</p>
        <p>Where appropriate, Visit Malindi may pass relevant enquiry information to a provider or help coordinate communication. You should review and confirm the provider’s terms before making arrangements.</p>

        <h2>5. Information may change</h2>
        <p>Prices, availability, opening hours, schedules, venue details, listings and other destination information can change without notice. Website information is provided as a planning starting point and should be confirmed with Visit Malindi or the relevant provider before you rely on it.</p>

        <h2>6. Visitor responsibilities</h2>
        <p>You are responsible for checking that you have the passports, visas, permits, vaccinations, insurance, licences and other travel documents or requirements relevant to your journey. You are also responsible for sharing accurate dates, group details, preferences and accessibility or other practical information needed for a requested service.</p>
        <p>Please follow the safety instructions, house rules, venue rules and provider instructions that apply to any arrangement you choose to make.</p>

        <h2>7. Intellectual property</h2>
        <p>Unless stated otherwise, the Visit Malindi name, branding, website design, text and original materials on this website belong to Visit Malindi or are used with permission. You may view and use them for personal, non-commercial travel planning. You must not copy, republish, sell, modify, distribute or use them commercially without permission.</p>
        <p>Third-party names, logos, photographs and links belong to their respective owners.</p>

        <h2>8. External links</h2>
        <p>This website may link to WhatsApp, maps, provider websites, social profiles and other external services. These links are provided for convenience. External services operate independently, may change or become unavailable, and have their own terms and privacy practices. Visit Malindi does not control or endorse every external service.</p>

        <h2>9. Website availability and liability</h2>
        <p>We aim to keep the website useful and available, but we do not promise that it will always be uninterrupted, error-free, complete or current. We may update, suspend or remove content or features when necessary.</p>
        <p>To the extent permitted by applicable law, Visit Malindi is not responsible for losses arising from reliance on changing destination information, provider services, external websites, travel interruptions or arrangements made with independent providers. Nothing in these terms excludes or limits liability that cannot lawfully be excluded or limited.</p>

        <h2>10. Events outside our control</h2>
        <p>Visit Malindi is not responsible for delay, interruption or failure caused by events outside reasonable control, including severe weather, natural disasters, illness outbreaks, government action, transport disruption, strikes, civil unrest, communication failures or failures of third-party services.</p>

        <h2>11. Privacy</h2>
        <p>Our <a href="/privacy">Privacy Policy</a> explains how Visit Malindi handles personal information shared through the website and concierge channels.</p>

        <h2>12. Kenyan law</h2>
        <p>These Terms of Use are governed by the laws of Kenya. Any dispute relating to these terms or the use of this website will be subject to the applicable courts and laws of Kenya.</p>

        <h2>13. Changes to these terms</h2>
        <p>We may update these Terms of Use when our services, website or legal requirements change. The “Last updated” date at the top of this page shows when the current version was published. Your continued use of the website after an update means that you accept the revised terms.</p>

        <h2>14. Contact</h2>
        <p>For questions about these Terms of Use or a Visit Malindi enquiry, contact us at <a href="mailto:travel@visitmalindi.co.ke">travel@visitmalindi.co.ke</a> or through the Visit Malindi WhatsApp concierge. Website: visitmalindi.co.ke.</p>
      </div>
    </main>
  );
}

function TrustNote() {
  return <div className="trust-note page-width"><Icon name="compass" size={19} /><p>Information may change — please confirm availability, pricing and schedules with Visit Malindi before making arrangements.</p></div>;
}

function EmptyState({ compact = false }) {
  return <div className={`empty-state ${compact ? "empty-state-compact" : ""}`}><Icon name="compass" size={compact ? 25 : 32} /><h3>We couldn't find what you're looking for.</h3><p>Try another search or ask a local for a recommendation.</p>{!compact && <WhatsAppButton label="Talk to a Local" />}</div>;
}

function NotFound() {
  return <main className="not-found page-width"><span className="eyebrow">404 · A wrong turn</span><h1>Lost in<br /><em>Malindi?</em></h1><p>We couldn't find that page, but there is plenty more coast to explore.</p><a className="button button-dark" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Explore Malindi <Icon name="arrow" size={17} /></a></main>;
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname.replace(/\/$/, "") || "/");
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const handlePop = () => setPathname(window.location.pathname.replace(/\/$/, "") || "/");
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);
  useEffect(() => {
    const base = pathname.split("/").slice(0, 2).join("/") || "/";
    const searchItem = searchIndex.find((item) => item.path === pathname);
    const catalogueMeta = catalogueByRoute[pathname];
    const meta = searchItem
      ? [`${searchItem.name} | Visit Malindi`, searchItem.description]
      : catalogueMeta
        ? [`${catalogueMeta.title} | Visit Malindi`, catalogueMeta.intro]
        : pathname === "/whats-on" || pathname === "/malindi-events"
          ? ["What's On in Malindi | Visit Malindi", "Find out what is happening in Malindi tonight and this weekend."]
          : pageMeta[pathname] || pageMeta[base] || pageMeta["/"];
    document.title = meta[0];
    let description = document.querySelector('meta[name="description"]');
    if (!description) { description = document.createElement("meta"); description.name = "description"; document.head.appendChild(description); }
    description.content = meta[1];
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = meta[0];
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = meta[1];
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `https://visitmalindi.co.ke${pathname}`;
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) { ogImage = document.createElement("meta"); ogImage.setAttribute("property", "og:image"); document.head.appendChild(ogImage); }
    ogImage.content = searchItem?.image || photos.hero;
  }, [pathname]);

  let content;
  if (pathname === "/") content = <HomePage />;
  else if (pathname === "/plan-my-trip") content = <Planner />;
  else if (pathname === "/search") content = <SearchPage />;
  else if (pathname === "/about") content = <AboutPage />;
  else if (pathname === "/contact") content = <ContactPage />;
  else if (pathname === "/malindi") content = <DestinationPage destination={destinations.malindi} WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} />;
  else if (pathname === "/watamu") content = <DestinationPage destination={destinations.watamu} WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} />;
  else if (pathname === "/whats-on" || pathname === "/malindi-events") content = <EventsPage />;
  else if (pathname === "/privacy") content = <PrivacyPolicyPage />;
  else if (pathname === "/terms") content = <TermsOfUsePage />;
  else if (pathname === "/disclaimer") content = <LegalPage title="Disclaimer"><p>Visit Malindi provides destination guidance and concierge introductions. We do not currently process bookings, payments or availability through this website.</p><p>Always confirm details directly through the Visit Malindi concierge before making travel or financial decisions.</p></LegalPage>;
  else if (catalogueByRoute[pathname]) content = <ListingPage key={pathname} config={catalogueByRoute[pathname]} />;
  else if (pathname.startsWith("/experience/")) content = <ReusableDetailPage type="experience" item={experiences.find((item) => item.slug === slugFromPath(pathname))} experiences={experiences} relatedItems={experiences} relatedType="experience" WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} ListingCard={ListingCard} NotFound={NotFound} />;
  else if (pathname.startsWith("/excursion/")) content = <ReusableDetailPage type="excursion" item={excursions.find((item) => item.slug === slugFromPath(pathname))} experiences={excursions} relatedItems={excursions} relatedType="excursion" WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} ListingCard={ListingCard} NotFound={NotFound} />;
  else if (pathname.startsWith("/stay/")) content = <ReusableDetailPage type="stay" item={stays.find((item) => item.slug === slugFromPath(pathname))} experiences={stays} relatedItems={stays} relatedType="stay" WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} ListingCard={ListingCard} NotFound={NotFound} />;
  else if (pathname.startsWith("/eat-and-drink/")) content = <ReusableDetailPage type="food" item={foodGuides.find((item) => item.slug === slugFromPath(pathname))} experiences={foodGuides} relatedItems={foodGuides} relatedType="food" WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} ListingCard={ListingCard} NotFound={NotFound} />;
  else if (pathname.startsWith("/nightlife/")) content = <ReusableDetailPage type="nightlife" item={nightlife.find((item) => item.slug === slugFromPath(pathname))} experiences={nightlife} relatedItems={nightlife} relatedType="nightlife" WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} ListingCard={ListingCard} NotFound={NotFound} />;
  else if (pathname.startsWith("/transfer/")) content = <ReusableDetailPage type="transfer" item={transfers.find((item) => item.slug === slugFromPath(pathname))} experiences={transfers} relatedItems={transfers} relatedType="transfer" WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} ListingCard={ListingCard} NotFound={NotFound} />;
  else if (pathname.startsWith("/attraction/")) content = <ReusableDetailPage type="attraction" item={attractions.find((item) => item.slug === slugFromPath(pathname))} experiences={attractions} relatedItems={attractions} relatedType="attraction" WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} ListingCard={ListingCard} NotFound={NotFound} />;
  else if (pathname.startsWith("/itinerary/")) content = <ReusableDetailPage type="itinerary" item={itineraries.find((item) => item.slug === slugFromPath(pathname))} experiences={itineraries} relatedItems={itineraries} relatedType="itinerary" WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} ListingCard={ListingCard} NotFound={NotFound} />;
  else if (pathname.startsWith("/event/")) content = <ReusableDetailPage type="event" item={events.find((item) => item.slug === slugFromPath(pathname))} experiences={events} relatedItems={events} relatedType="event" WhatsAppButton={WhatsAppButton} SectionHeading={SectionHeading} ListingCard={ListingCard} NotFound={NotFound} />;
  else content = <NotFound />;

  return <><Header onSearch={() => setSearchOpen(true)} />{content}<Footer /><FloatingWhatsApp />{searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}</>;
}

export default App;