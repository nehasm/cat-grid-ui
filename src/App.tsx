import { useEffect, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableCard from './components/draggble';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  const [timeSinceLastSave, setTimeSinceLastSave] = useState(0);
  const [initialSave, setInitialSave] = useState(false);

  useEffect(() => {
    fetch('/cats')
      .then(response => response.json())
      .then(data => setCards(data));
  }, []);

  const moveCard = (fromIndex : number, toIndex : number) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
    setSaving(true);
    setUnsavedChanges(true);
  };

  const saveChanges = useCallback(() => {
    if (unsavedChanges) {
      fetch('/cats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cards),
      })
        .then(response => response.json())
        .then(() => {
          setLastSaveTime(Date.now());
          setTimeSinceLastSave(0);
          setSaving(false);
          setUnsavedChanges(false);
          setInitialSave(true);
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

  useEffect(() => {
    if (initialSave) {
      const timeInterval = setInterval(() => {
        setTimeSinceLastSave(Math.floor((Date.now() - lastSaveTime) / 1000));
      }, 1000);
      return () => clearInterval(timeInterval);
    }
  }, [initialSave, lastSaveTime]);

  const handleKeyDown = (event : any) => {
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
      <div>
        <span className='cats-title'>Cat Portfolio</span>
        {saving ? (
          <span className='spinner'></span>
        ) : (
          initialSave && <span className='time-stamp'>Last saved: {timeSinceLastSave} seconds ago</span>
        )}
      </div>
      <div className="cats-container">
        {cards.map((cat, index) => (
          <DraggableCard
            key={index}
            index={index}
            cat={cat}
            moveCard={moveCard}
            overlay={setOverlayImage}
            onPositionChange={() => setUnsavedChanges(true)}
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