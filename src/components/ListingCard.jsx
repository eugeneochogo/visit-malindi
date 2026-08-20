import Icon from "./Icon";
import SmartImage from "./SmartImage";
import { enquiryMessage, navigate, whatsappLink } from "../utils";

const pathMap = {
  experience: "experience",
  stay: "stay",
  food: "eat-and-drink",
  nightlife: "nightlife",
  transfer: "transfer",
  attraction: "attraction",
  excursion: "excursion",
  itinerary: "itinerary",
  event: "event",
};

export default function ListingCard({ item, type, showEnquiry = true }) {
  const path = `/${pathMap[type] || type}/${item.slug}`;
  const title = item.route || item.name;
  const eventDetails = [item.venue, item.date, item.startTime].filter(Boolean).join(" · ");
  const enquiryContext = type === "event" ? eventDetails : type === "transfer" ? title : "";
  const enquiryLabel = type === "food" ? "Book / Enquire" : type === "nightlife" ? "Go Out With Us" : type === "transfer" ? "Request Transfer" : "Enquire on WhatsApp";
  return (
    <article className="listing-card">
      <a className="listing-image-wrap" href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>
        <SmartImage src={item.image} alt={item.imageIsIllustrative ? "Illustrative coastal image" : title} />
        {item.relationship && <span className="listing-relationship">{item.relationship}</span>}
        {item.imageIsIllustrative && <span className="listing-image-note">Illustrative image</span>}
        <span className="card-arrow"><Icon name="arrow" size={16} /></span>
      </a>
      <div className="listing-card-body">
        <div className="listing-meta"><span>{item.category}</span><span><Icon name="pin" size={13} /> {item.location}</span></div>
        {item.listingKind && <span className="listing-kind">{item.listingKind}</span>}
        <a href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}><h3>{title}</h3></a>
        {type === "event" && eventDetails && <p className="event-card-details"><Icon name="calendar" size={13} /> {eventDetails}</p>}
        <p>{item.description}</p>
        <div className="listing-card-actions">{showEnquiry && <a className="button button-whatsapp button-whatsapp-small" href={whatsappLink(enquiryMessage(type, title, enquiryContext))} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={14} /> {enquiryLabel}</a>}<a className="text-link" href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>Discover more <Icon name="arrow" size={14} /></a></div>
      </div>
    </article>
  );
}