// ================= FILE: src/components/Row.jsx =================
import Card from './Card';

export default function Row({ title, items, onCardClick }) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="row">
      <div className="row-header">
        <h2 className="row-title">{title}</h2>
        <span className="row-count">{items.length} titles</span>
      </div>
      <div className="scroll-x">
        {items.map((item, idx) => (
          <Card key={item.id || item.slug || idx} anime={item} onClick={() => onCardClick(item)} />
        ))}
      </div>
    </div>
  );
}
