import { useState } from "react";
import Icon from "./Icon";

export default function SmartImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return <div className={`image-fallback ${className}`} role="img" aria-label={alt}><Icon name="compass" size={36} /></div>;
  }
  return <img className={className} src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />;
}