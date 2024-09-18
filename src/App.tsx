import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import catsData from './constants/cats.json';

const ItemType = 'CARD';

const DraggableCard = ({ cat, index, moveCard, onClick }) => {
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
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} onClick={() => onClick(cat.image)}>
      <div>{cat.title}</div>
      {loading && <div className="spinner">Loading...</div>}
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

function App() {
  const [cards, setCards] = useState([]);
  const [overlayImage, setOverlayImage] = useState(null);

  useEffect(() => {
    setCards(catsData);
  }, []);

  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOverlayImage(null);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div>Cat Portfolio</div>
      <div className="cats-container">
        {cards.map((cat, index) => (
          <DraggableCard
            key={index}
            index={index}
            cat={cat}
            moveCard={moveCard}
            onClick={setOverlayImage}
          />
        ))}
      </div>
      {overlayImage && (
        <div className="overlay" onClick={() => setOverlayImage(null)}>
          <img src={overlayImage} alt="Overlay" />
        </div>
      )}
    </DndProvider>
  );
}

export default App;