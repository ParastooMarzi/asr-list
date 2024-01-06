import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

const PlayAudio = ({ audioUrl, audioFormat = 'mp3' }: { audioUrl: string; audioFormat?: 'mp3' | 'wav' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const waveformRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    setAudio(new Audio("https://up.myniloomusic2.ir/Niloo/Metallica/Metallica%20-%20Nothing%20Else%20Matters.mp3"));
  }, [audioUrl]);

  useEffect(() => {
    if (audio) {
      waveformRef.current = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'grey',
        progressColor: 'orange',
      });
      waveformRef.current.load(audio.src);

      return () => {
        waveformRef.current?.destroy();
      };
    }
  }, [audio]);

  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        waveformRef.current?.pause();
      } else {
        audio.play();
        setIsPlaying(true);
        waveformRef.current?.play();
      }
    }
  };

  return (
    <div>
      <button onClick={toggleAudio}>
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <div id="waveform" style={{ height: '100px', width: '100%' }} />
    </div>
  );
};

export default PlayAudio;
