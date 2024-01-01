"use client"
import { Pause, Play } from 'lucide-react';
import React, { useState } from 'react';

const PlayAudio = ({ audioUrl }: { audioUrl: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio("https://up.myniloomusic2.ir/Niloo/Metallica/Metallica%20-%20Nothing%20Else%20Matters.mp3");

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <button onClick={toggleAudio}>
      {isPlaying ?  <Pause />:<Play/>}
    </button>
  );
};

export default PlayAudio;
