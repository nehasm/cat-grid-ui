import React, { useEffect, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from './components/draggble';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [overlayImage, setOverlayImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());

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
    setUnsavedChanges(true);
  };

  const saveChanges = useCallback(() => {
    if (unsavedChanges) {
      setSaving(true);
      fetch('/cats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cards),
      })
        .then(response => response.json())
        .then(() => {
          setSaving(false);
          setUnsavedChanges(false);
          setLastSaveTime(Date.now());
        })
        .catch(error => {
          console.error('Save error:', error);
          setSaving(false);
        });
    }
  }, [unsavedChanges, cards]);

  useEffect(() => {
    const interval = setInterval(saveChanges, 5000);
    return () => clearInterval(interval);
  }, [saveChanges]);

  const timeSinceLastSave = Math.floor((Date.now() - lastSaveTime) / 1000);

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
            onPositionChange={() => setUnsavedChanges(true)}
          />
        ))}
      </div>
      {overlayImage && (
        <div className="overlay" onClick={() => setOverlayImage(null)}>
          <img src={overlayImage} alt="Overlay" />
        </div>
      )}
      {saving && <div className='spinner'></div>}
      <div>Last saved: {timeSinceLastSave} seconds ago</div>
    </DndProvider>
  );
}

export default App;