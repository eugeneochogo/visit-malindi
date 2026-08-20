import Icon from "./Icon";
import SmartImage from "./SmartImage";
import { navigate } from "../utils";

const pathMap = {
  experience: "experience",
  stay: "stay",
  food: "eat-and-drink",
  nightlife: "nightlife",
  transfer: "transfer",
  attraction: "attraction",
  itinerary: "itinerary",
  event: "event",
};

export default function ListingCard({ item, type }) {
  const path = `/${pathMap[type] || type}/${item.slug}`;
  const title = item.route || item.name;
  const eventDetails = [item.venue, item.date, item.startTime].filter(Boolean).join(" · ");
  return (
    <article className="listing-card">
      <a className="listing-image-wrap" href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>
        <SmartImage src={item.image} alt={title} />
        <span className="card-arrow"><Icon name="arrow" size={16} /></span>
      </a>
      <div className="listing-card-body">
        <div className="listing-meta"><span>{item.category}</span><span><Icon name="pin" size={13} /> {item.location}</span></div>
        <a href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}><h3>{title}</h3></a>
        {type === "event" && eventDetails && <p className="event-card-details"><Icon name="calendar" size={13} /> {eventDetails}</p>}
        <p>{item.description}</p>
        <a className="text-link" href={path} onClick={(event) => { event.preventDefault(); navigate(path); }}>Discover more <Icon name="arrow" size={14} /></a>
      </div>
    </article>
  );
}