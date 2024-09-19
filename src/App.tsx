import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from './components/draggble';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [overlayImage, setOverlayImage] = useState(null);

  useEffect(() => {
    fetch('/cats')
      .then(response => response.json())
      .then(data => setCards(data));
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