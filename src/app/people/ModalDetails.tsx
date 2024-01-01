
import React from 'react';
import Modal from 'react-modal';
import { playAudio } from './PlayAudio';
import { Play } from 'lucide-react';

interface ModalDetailsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  recordingFile: string;
}

export const ModalDetails: React.FC<ModalDetailsProps> = ({ isOpen, onRequestClose, recordingFile }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      <div>
        <p>Recording File: {recordingFile}</p>
        <button onClick={() => PlayAudio(recordingFile)}> <Play /></button>
      </div>
      <button onClick={onRequestClose}>Close Modal</button>
    </Modal>
  );
};
