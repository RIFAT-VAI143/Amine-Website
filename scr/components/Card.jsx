// ================= FILE: src/components/Card.jsx =================
export default function Card({ anime, onClick }) {
  const poster = anime.poster || anime.image || 'https://via.placeholder.com/170x220?text=No+Image';
  const title = anime.title || 'Untitled';
  
  return (
    <div className="card" onClick={onClick}>
      <img className="card-img" src={poster} alt={title} loading="lazy" onError={(e) => { e.target.src = 'https://via.placeholder.com/170x220?text=Error'; }} />
      <h3>{title.length > 35 ? title.slice(0, 32) + '...' : title}</h3>
    </div>
  );
}
