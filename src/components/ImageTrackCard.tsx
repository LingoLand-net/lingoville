export function ImageTrackCard({ image, alt, tone, label, title, text }: {
  image: string; alt: string; tone: string; label: string; title: string; text: string;
}) {
  return (
    <article className={`track-card image-track-card ${tone}`}>
      <div className="track-image-frame"><img src={image} alt={alt} /></div>
      <div className="image-track-copy">
        <span className="card-number">{label}</span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </article>
  );
}
