import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../App.css';

const ItemType = 'CARD';

interface DraggableCardProps {
  cat: {
    type: string;
    title: string;
    position: number;
    image: string;
  };
  index: number;
  moveCard: (fromIndex: number, toIndex: number) => void;
  onClick: (image: string) => void;
  onPositionChange: () => void;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ cat, index, moveCard, onClick, onPositionChange }) => {
  const [loading, setLoading] = useState(true);

  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
        onPositionChange();
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} onClick={() => onClick(cat.image)}>
      <div>{cat.title}</div>
      {loading && <div className="spinner"></div>}
      <img
        src={cat.image}
        alt={cat.title}
        width="300"
        height="300"
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
};

export default DraggableCard;