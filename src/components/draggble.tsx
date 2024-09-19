import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../App.css';

const ItemType = 'CARD';

const DraggableCard = ({ cat, index, moveCard, onClick, onPositionChange }) => {
  const [loading, setLoading] = useState(true);

  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item) => {
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
      {loading && <div className="loading-card"><div className='spinner'></div></div>}
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