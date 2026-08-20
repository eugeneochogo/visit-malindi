import Icon from "./Icon";
import SmartImage from "./SmartImage";
import { navigate } from "../utils";

function DestinationLink({ item, className = "" }) {
  return <a className={`destination-link ${className}`} href={item.path} onClick={(event) => { event.preventDefault(); navigate(item.path); }}><span><strong>{item.title}</strong>{item.text && <small>{item.text}</small>}</span><Icon name="arrow" size={15} /></a>;
}

function DestinationSection({ section }) {
  return <section className="destination-guide-section" id={section.id}><div className="destination-section-intro"><span className="eyebrow">{section.eyebrow}</span><h2>{section.title}</h2><p>{section.text}</p></div><div className="destination-link-grid">{section.links.map((item) => <DestinationLink key={item.path} item={item} />)}</div></section>;
}

export default function DestinationPage({ destination, WhatsAppButton, SectionHeading }) {
  const conciergeName = destination.name;
  return <main className="destination-page">
    <section className="destination-hero page-width">
      <div className="destination-hero-image"><SmartImage src={destination.image} alt={destination.imageAlt} /></div>
      <div className="destination-hero-copy">
        <span className="eyebrow">{destination.eyebrow}</span>
        <h1>{destination.title}</h1>
        <p className="destination-hero-lead">{destination.intro}</p>
        <div className="destination-hero-actions"><WhatsAppButton type="destination" name={conciergeName} label={`Plan ${conciergeName} on WhatsApp`} /><a className="button button-outline" href="#guide" onClick={(event) => { event.preventDefault(); document.getElementById("guide")?.scrollIntoView({ behavior: "smooth" }); }}>Explore the guide <Icon name="arrowDown" size={16} /></a></div>
      </div>
    </section>

    <nav className="destination-nav page-width" aria-label={`${destination.name} guide sections`}>{destination.navLinks.map((item) => <a key={item.path} href={item.path} onClick={(event) => { event.preventDefault(); navigate(item.path); }}>{item.label}</a>)}</nav>

    <section className="destination-intro page-width">
      <div className="destination-intro-mark">{destination.mark}</div>
      <div><span className="eyebrow">Why visit {destination.name}?</span><h2>{destination.whyVisit.title}</h2><p>{destination.whyVisit.text}</p></div>
      <WhatsAppButton type="destination" name={conciergeName} label="Talk to the concierge" />
    </section>

    <section className="destination-focus section page-width" id="guide">
      <SectionHeading eyebrow="Start with a feeling" title={`Make your ${destination.name} days your own.`} text={destination.focusText} />
      <div className="destination-focus-grid">{destination.focusCards.map((item) => <DestinationLink key={item.path} item={item} className="destination-focus-card" />)}</div>
    </section>

    <section className="destination-guides page-width">{destination.sections.map((section) => <DestinationSection key={section.id} section={section} />)}</section>

    <section className="destination-practical page-width">
      <SectionHeading eyebrow="The practical bit" title={`Getting to and around ${destination.name}`} text={destination.practicalIntro} />
      <div className="destination-practical-grid">{destination.practical.map((item) => <DestinationLink key={item.path} item={item} className="destination-practical-card" />)}</div>
    </section>

    <section className="destination-nearby section page-width">
      <SectionHeading eyebrow="Keep exploring" title="Nearby destinations" text={destination.nearbyText} />
      <div className="destination-link-grid destination-nearby-grid">{destination.nearby.map((item) => <DestinationLink key={item.path} item={item} />)}</div>
    </section>

    <section className="destination-itineraries page-width">
      <div><span className="eyebrow">Suggested ways to go</span><h2>Start with a plan, then leave room for the coast.</h2><p>{destination.itineraryText}</p></div>
      <div className="destination-itinerary-links">{destination.itineraries.map((item) => <DestinationLink key={item.path} item={item} />)}</div>
    </section>

    <section className="destination-cta page-width"><div><span className="eyebrow eyebrow-light">Your local starting point</span><h2>Tell us what you want from {destination.name}.</h2><p>Share your dates, interests or simply the feeling you are after. We will help you take the next step.</p></div><WhatsAppButton type="destination" name={conciergeName} label={`Ask about ${destination.name}`} /></section>
  </main>;
}