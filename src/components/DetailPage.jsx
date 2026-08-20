import Icon from "./Icon";
import SmartImage from "./SmartImage";
import { navigate } from "../utils";

export default function DetailPage({ type, item, experiences, WhatsAppButton, SectionHeading, ListingCard, NotFound }) {
  if (!item) return <NotFound />;
  const singular = type === "experience" ? "experience" : type === "stay" ? "accommodation" : type === "transfer" ? "transfer" : type === "nightlife" ? "nightlife" : type === "itinerary" ? "itinerary" : type === "event" ? "event" : "place";
  const cta = { experience: "Ask About This Experience", stay: "Ask About Availability", transfer: "Arrange This Transfer", nightlife: "Ask What's Happening Tonight", itinerary: "Plan My Trip", event: "Ask About This Event", food: "Ask About This Place", attraction: "Ask About This Place" }[type] || "Talk to a Local";
  const messageName = item.route || item.name;
  const gallery = item.images?.length ? item.images : item.gallery?.length ? item.gallery : item.image ? [item.image] : [];
  const usefulInfo = item.usefulInfo || [];
  const related = experiences.filter((experience) => experience.id !== item.id).slice(0, 3);

  return (
    <main className="detail-page">
      <div className="detail-hero page-width">
        <div className="detail-hero-image"><SmartImage src={item.image} alt={messageName} /></div>
        <div className="detail-hero-copy">
          <span className="eyebrow">{item.category || singular}</span>
          <h1>{messageName}</h1>
          <p className="detail-location"><Icon name="pin" size={16} /> {item.location}</p>
          <p>{item.description}</p>
          <WhatsAppButton type={type} name={messageName} label={cta} context={type === "event" ? `${item.venue ? `Venue: ${item.venue}\n` : ""}${item.date ? `Date: ${item.date}\n` : ""}${item.startTime ? `Starts: ${item.startTime}` : ""}`.trim() : ""} />
        </div>
      </div>

      <div className="detail-body page-width">
        <div className="detail-main">
          <SectionHeading eyebrow="Good to know" title={type === "itinerary" ? "A starting point, not a script." : "Make it yours."} text={type === "itinerary" ? "Use this idea as a framework, then tell us what you want to add, skip or change." : "Every trip is different. We can help with the details that matter to you."} />
          {(item.highlights || item.amenities) && <div className="highlight-list">{(item.highlights || item.amenities).map((highlight) => <div key={highlight}><span className="highlight-dot" />{highlight}</div>)}</div>}
          {(item.duration || item.vehicle || item.priceFrom || item.venue || item.date || item.startTime) && <div className="detail-facts">{item.duration && <div><span className="eyebrow">Duration</span><strong>{item.duration}</strong></div>}{item.vehicle && <div><span className="eyebrow">Vehicle</span><strong>{item.vehicle}</strong></div>}{item.priceFrom && <div><span className="eyebrow">From</span><strong>{item.priceFrom}</strong></div>}{item.venue && <div><span className="eyebrow">Venue</span><strong>{item.venue}</strong></div>}{item.date && <div><span className="eyebrow">Date</span><strong>{item.date}</strong></div>}{item.startTime && <div><span className="eyebrow">Starts</span><strong>{item.startTime}</strong></div>}</div>}
          {item.days && <div className="itinerary-days">{item.days.map((day) => <div className="itinerary-day" key={day.day}><span className="day-number">0{day.day}</span><div><span className="eyebrow">Day {day.day}</span>{day.activities.map((activity) => <p key={activity}>{activity}</p>)}</div></div>)}</div>}
          <section className="detail-information"><span className="eyebrow">Useful information</span><h2>Before you make plans</h2>{usefulInfo.length ? <ul>{usefulInfo.map((info) => <li key={info}>{info}</li>)}</ul> : <p>Ask Visit Malindi for the latest information before arranging this.</p>}</section>
          {gallery.length > 1 && <section className="detail-gallery"><span className="eyebrow">Gallery</span><div>{gallery.map((image, index) => <SmartImage key={`${image}-${index}`} src={image} alt={`${messageName} view ${index + 1}`} />)}</div></section>}
          <section className="detail-location-panel"><div><span className="eyebrow">Location</span><h2>{item.location}</h2><p>Location details and directions can be confirmed with the Visit Malindi concierge.</p></div>{item.mapUrl && <a className="text-link" href={item.mapUrl} target="_blank" rel="noreferrer">View on map <Icon name="external" size={15} /></a>}</section>
          {(item.websiteUrl || item.socialUrl) && <div className="detail-links"><span className="eyebrow">More from this listing</span>{item.websiteUrl && <a href={item.websiteUrl} target="_blank" rel="noreferrer">Website <Icon name="external" size={14} /></a>}{item.socialUrl && <a href={item.socialUrl} target="_blank" rel="noreferrer">Social profile <Icon name="external" size={14} /></a>}</div>}
          <div className="detail-callout"><span className="eyebrow">Keep it flexible</span><p>Information may change. Confirm availability, pricing and schedules with Visit Malindi before making arrangements.</p></div>
        </div>
        <aside className="detail-aside"><div className="aside-card"><span className="eyebrow">Plan with a local</span><h3>Have a question about this {singular}?</h3><p>Tell us what you are looking for and we will help you take the next step.</p><WhatsAppButton type={type} name={messageName} label={cta} context={type === "event" ? `${item.venue ? `Venue: ${item.venue}\n` : ""}${item.date ? `Date: ${item.date}\n` : ""}${item.startTime ? `Starts: ${item.startTime}` : ""}`.trim() : ""} /><a className="text-link" href="/plan-my-trip" onClick={(event) => { event.preventDefault(); navigate("/plan-my-trip"); }}>Build a bigger plan <Icon name="arrow" size={15} /></a></div></aside>
      </div>

      <section className="section page-width related-section"><SectionHeading eyebrow="Keep exploring" title="More for your trip" action={<a className="text-link text-link-dark" href="/things-to-do" onClick={(event) => { event.preventDefault(); navigate("/things-to-do"); }}>Back to Explore <Icon name="arrow" size={15} /></a>} /><div className="listing-grid">{related.map((experience) => <ListingCard key={experience.id} item={experience} type="experience" />)}</div></section>
    </main>
  );
}