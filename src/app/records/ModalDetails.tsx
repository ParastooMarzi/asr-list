import PlayAudio from "./playAudio";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const modalBackdropStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };

  const modalWindowStyle = {
    backgroundColor: 'black',
    padding: '20px',
    borderRadius: '8px',
    border: '3px solid #FFA500', // Neon orange border
    width: '80%',
    height: '60%',
    maxWidth: '800px',
    maxHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };

  const modalContentStyle = {
    textAlign: 'center',
    width: '100%',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Align content vertically
    alignItems: 'center', // Align content horizontally
  };

  const closeButtonStyle = {
    alignSelf: 'flex-start',
    marginTop: 'auto',
  };

  const playAudioStyle = {
    fontSize: '24px',
  };

  return (
    <div style={modalBackdropStyle}>
      <div style={modalWindowStyle}>
        <div style={modalContentStyle}>
          <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>پخش صدا</h2>
          <div style={{ width: '100%' }}>
            <PlayAudio style={playAudioStyle} />
          </div>
          <div id="waveform" style={{ width: '100%', height: '100px', marginTop: '20px' }} />
        </div>
        <button onClick={onClose} style={closeButtonStyle}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
