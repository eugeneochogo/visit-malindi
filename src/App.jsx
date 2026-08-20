import { useEffect, useMemo, useRef, useState } from "react";
import {
  attractions,
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

const catalogueByRoute = {
  "/things-to-do": { title: "Things to do in Malindi", eyebrow: "Explore", intro: "From the Indian Ocean to coastal forest, find an experience that feels like your kind of day.", data: experiences, type: "experience", filters: ["All", "Marine", "Boat Trips", "Snorkelling", "Diving", "Dolphin Experiences", "Fishing", "Sunset Cruises", "Sandbank", "Water Sports", "Beach Activities", "Nature", "Wildlife", "History & Culture", "Adventure", "Family Activities", "Couples & Romantic", "Photography", "Wellness"], locations: ["All", "Malindi", "Watamu", "Wider Coast"] },
  "/things-to-do-in-malindi": { title: "Things to do in Malindi", eyebrow: "Explore", intro: "Make your time on the Kenyan Coast count with marine, nature, culture and adventure experiences.", data: experiences, type: "experience", filters: ["All", "Marine", "Snorkelling", "Diving", "Sunset Cruises", "Sandbank", "Water Sports", "Beach Activities", "History & Culture", "Adventure"], locations: ["All", "Malindi"], matches: (item) => item.location.includes("Malindi") },
  "/things-to-do-in-watamu": { title: "Things to do in Watamu", eyebrow: "Explore", intro: "Explore water, nature, mangroves, history and easy coast days on the Watamu side of your trip.", data: experiences, type: "experience", filters: ["All", "Marine", "Snorkelling", "Diving", "Dolphin Experiences", "Nature", "Wildlife", "Family Activities", "Couples & Romantic"], locations: ["All", "Watamu"], matches: (item) => item.location.includes("Watamu") },
  "/excursions": { title: "Excursions from Malindi", eyebrow: "Explore further", intro: "Day-trip ideas for the places around Malindi, Watamu and the wider Kenyan Coast.", data: excursions, type: "excursion", filters: ["All", "Day Trip", "Nature", "Culture", "Culture & Nature", "Adventure", "Wildlife"], locations: ["All", "Malindi", "Watamu", "Gede", "Mambrui", "Kilifi", "Marafa", "Mombasa", "Tsavo"] },
  "/malindi-excursions": { title: "Malindi excursions", eyebrow: "Explore further", intro: "Local ideas for getting out on the water, into nature and closer to the coast.", data: excursions, type: "excursion", filters: ["All", "Day Trip", "Nature", "Culture", "Culture & Nature", "Adventure", "Wildlife"], locations: ["All", "Malindi", "Watamu", "Gede", "Mambrui", "Kilifi", "Marafa", "Mombasa", "Tsavo"] },
  "/places-to-stay": { title: "Where to stay", eyebrow: "Stay", intro: "The right base changes the whole trip. Tell us what matters to you and we will help you find your fit.", data: stays, type: "stay", filters: ["All", "Hotels", "Resorts", "Villas", "Apartments", "Guesthouses", "Boutique Stays", "Budget Stays", "Luxury Stays", "Beachfront Stays"], locations: ["All", "Malindi", "Watamu"] },
  "/hotels-in-malindi": { title: "Hotels in Malindi", eyebrow: "Stay", intro: "Explore a starting point for hotels, resorts, villas and guesthouses across the coast.", data: stays, type: "stay", filters: ["All", "Beach Resort", "Boutique Hotel", "Family Stay"], matches: (item) => item.location.includes("Malindi") },
  "/beach-resorts-in-malindi": { title: "Beach resorts in Malindi", eyebrow: "Stay", intro: "A beach-first guide to finding your place by the Indian Ocean.", data: stays, type: "stay", filters: ["All", "Beach Resort", "Boutique Hotel", "Family Stay"], matches: (item) => item.location.includes("Malindi") && item.category === "Beach Resort" },
  "/eat-and-drink": { title: "Eat & drink", eyebrow: "Taste the coast", intro: "Come hungry. From seafood and Swahili flavours to slow café mornings, there is always another table to find.", data: foodGuides, type: "food", filters: ["All", "Restaurants", "Café", "Seafood", "Local food", "Fine Dining", "Beach Restaurants", "Bars", "Casual Dining"], locations: ["All", "Malindi", "Watamu"] },
  "/restaurants-in-malindi": { title: "Restaurants in Malindi", eyebrow: "Taste the coast", intro: "A local starting point for finding your next meal in Malindi.", data: foodGuides, type: "food", filters: ["All", "Seafood", "Local food", "Café", "Romantic Dining"], matches: (item) => item.location.includes("Malindi") },
  "/nightlife": { title: "Nightlife in Malindi", eyebrow: "After dark", intro: "When the sun goes down, Malindi comes alive. Ask a local what is happening tonight.", data: nightlife, type: "nightlife", filters: ["All", "Clubs", "Bars", "Lounges", "Beach Nightlife", "Live Music", "DJ Events", "Parties", "Entertainment"], locations: ["All", "Malindi", "Watamu"] },
  "/malindi-nightlife": { title: "Nightlife in Malindi", eyebrow: "After dark", intro: "When the sun goes down, Malindi comes alive. Ask a local what is happening tonight.", data: nightlife, type: "nightlife", filters: ["All", "DJ", "Lounge", "Live Music", "Beach Party"], matches: (item) => item.location.includes("Malindi") },
  "/transfers": { title: "Getting to and around Malindi", eyebrow: "Move", intro: "Airport, SGR, Watamu and private transport — start the journey with a simple WhatsApp enquiry.", data: transfers, type: "transfer", filters: ["All", "Airport Transfer", "SGR Transfer", "Coastal Transfer", "Private Transport"], locations: ["All", "Malindi", "Watamu", "Mombasa", "Kilifi", "Mambrui", "Lamu"] },
  "/malindi-airport-transfer": { title: "Malindi airport transfers", eyebrow: "Move", intro: "Arrive with less to think about. Ask about airport pickups, hotel transfers and private vehicles.", data: transfers, type: "transfer", filters: ["All", "Airport Transfer", "SGR Transfer", "Coastal Transfer", "Private Transport"], matches: (item) => item.category === "Airport Transfer" },
  "/mombasa-airport-to-malindi": { title: "Mombasa Airport to Malindi", eyebrow: "Move", intro: "Tell us when you land and what you need. We will help you explore transfer options.", data: transfers, type: "transfer", filters: ["All", "Airport Transfer", "SGR Transfer", "Coastal Transfer", "Private Transport"], matches: (item) => item.slug === "mombasa-airport-to-malindi" },
  "/mombasa-to-malindi-transfer": { title: "Mombasa to Malindi transfer", eyebrow: "Move", intro: "Make the coast leg easy with a private transfer enquiry.", data: transfers, type: "transfer", filters: ["All", "Airport Transfer", "SGR Transfer", "Coastal Transfer", "Private Transport"], matches: (item) => item.location === "Mombasa to Malindi" },
  "/sgr-to-malindi": { title: "SGR to Malindi", eyebrow: "Move", intro: "Coming by train? Ask us about the next step from Mombasa SGR to Malindi.", data: transfers, type: "transfer", filters: ["All", "Airport Transfer", "SGR Transfer", "Coastal Transfer", "Private Transport"], matches: (item) => item.slug === "sgr-to-malindi" },
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
          <span className="brand-mark">VM</span>
          <span className="brand-name">Visit <strong>Malindi</strong></span>
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
          <a className="brand brand-light" href="/" onClick={(event) => { event.preventDefault(); navigate("/"); }}><span className="brand-mark">VM</span><span className="brand-name">Visit <strong>Malindi</strong></span></a>
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

function Filters({ filters, active, onChange, className = "" }) {
  return <div className={`filter-row ${className}`} role="group" aria-label="Filter results">{filters.map((filter) => <button key={filter} className={active === filter ? "filter-chip active" : "filter-chip"} onClick={() => onChange(filter)}>{filter}</button>)}</div>;
}

function ListingPage({ config }) {
  const [filter, setFilter] = useState("All");
  const [location, setLocation] = useState("All");
  useEffect(() => { setFilter("All"); setLocation("All"); }, [config.title]);
  const scopedData = config.matches ? config.data.filter(config.matches) : config.data;
  const visible = scopedData.filter((item) => (filter === "All" || item.category === filter || item.duration === filter || item.category.includes(filter) || item.tags?.includes(filter)) && (location === "All" || item.location.includes(location)));
  const featured = visible.filter((item) => item.featured).slice(0, 3);
  const featuredItems = featured.length ? featured : visible.slice(0, 3);
  return <main className="page-shell"><section className="page-hero page-width"><span className="eyebrow">{config.eyebrow}</span><h1>{config.title}</h1><p>{config.intro}</p><div className="page-hero-actions"><WhatsAppButton label="Talk to a Local" />{config.type === "experience" && <a className="button button-outline" href="/excursions" onClick={(e) => { e.preventDefault(); navigate("/excursions"); }}>Explore excursions <Icon name="arrow" size={16} /></a>}{config.type === "itinerary" && <a className="button button-outline" href="/plan-my-trip" onClick={(e) => { e.preventDefault(); navigate("/plan-my-trip"); }}>Build My Experience <Icon name="arrow" size={16} /></a>}</div></section><section className="section page-width listing-section"><Filters filters={config.filters} active={filter} onChange={setFilter} />{config.locations && <div className="location-filter"><span className="eyebrow">Browse by location</span><Filters filters={config.locations} active={location} onChange={setLocation} className="location-filter-row" /></div>}{featuredItems.length > 0 && <div className="featured-listings"><div className="featured-listings-heading"><div><span className="eyebrow">Start here</span><h2>Featured picks</h2></div><span className="result-count">{visible.length} {visible.length === 1 ? "listing" : "listings"}</span></div><div className="listing-grid">{featuredItems.map((item) => <ListingCard key={`featured-${item.id}`} item={item} type={config.type} />)}</div></div>}<div className="listing-grid listing-grid-large">{visible.map((item) => <ListingCard key={item.id} item={item} type={config.type} />)}</div>{visible.length === 0 && <EmptyState />}</section><TrustNote /></main>;
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
  const results = useMemo(() => query.trim().length < 2 ? [] : searchIndex.filter((item) => `${item.name} ${item.category} ${item.location}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query]);
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-labelledby="search-title"><div className="search-dialog" ref={dialogRef}><div className="search-dialog-top"><span className="eyebrow" id="search-title">Search the coast</span><button className="icon-button" onClick={onClose} aria-label="Close search"><Icon name="close" /></button></div><div className="search-input-wrap"><Icon name="search" size={24} /><input ref={inputRef} aria-label="Search Visit Malindi" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “beach”, “Gede Ruins” or “transfers”" /></div>{query.trim().length >= 2 && <div className="search-results">{results.map((item) => <a key={`${item.type}-${item.id}`} href={item.path} onClick={(e) => { e.preventDefault(); onClose(); navigate(item.path); }}><span className="search-result-image"><SmartImage src={item.image} alt="" /></span><span><strong>{item.name}</strong><small>{item.type} · {item.location}</small></span><Icon name="arrow" size={16} /></a>)}{!results.length && <EmptyState compact />}</div>}<div className="search-suggestions"><span>Popular searches</span><button onClick={() => setQuery("beach")}>Beach</button><button onClick={() => setQuery("Malindi")}>Malindi</button><button onClick={() => setQuery("nature")}>Nature</button><button onClick={() => setQuery("transfer")}>Transfers</button></div></div></div>;
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const results = searchIndex.filter((item) => `${item.name} ${item.category} ${item.location}`.toLowerCase().includes(query.toLowerCase()));
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
  else if (pathname === "/whats-on" || pathname === "/malindi-events") content = <EventsPage />;
  else if (pathname === "/privacy") content = <LegalPage title="Privacy Policy"><p>Visit Malindi respects your privacy. This starter policy explains the basics of how this website is intended to work and should be reviewed before launch.</p><h2>Information you share</h2><p>When you choose to contact Visit Malindi through WhatsApp or email, the information you choose to include is sent to that service so we can respond to your enquiry.</p><h2>Website usage</h2><p>This V1 website is a static discovery experience. Any future analytics or contact systems should be added with clear notice and appropriate consent.</p></LegalPage>;
  else if (pathname === "/terms") content = <LegalPage title="Terms of Use"><p>Visit Malindi is a discovery and enquiry platform, not a booking or payment platform. Information on the website is intended to help you plan and should be confirmed before you make arrangements.</p><h2>Accuracy</h2><p>We aim to keep information useful and transparent. Availability, pricing, schedules and event details can change.</p><h2>External services</h2><p>WhatsApp, email and any linked third-party services have their own terms and policies.</p></LegalPage>;
  else if (pathname === "/disclaimer") content = <LegalPage title="Disclaimer"><p>Visit Malindi provides destination guidance and concierge introductions. We do not currently process bookings, payments or availability through this website.</p><p>Always confirm details directly through the Visit Malindi concierge before making travel or financial decisions.</p></LegalPage>;
  else if (catalogueByRoute[pathname]) content = <ListingPage config={catalogueByRoute[pathname]} />;
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