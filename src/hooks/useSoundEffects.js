import { useCallback, useRef } from 'react';

export const useSoundEffects = () => {
  const audioCtxRef = useRef(null);

  const playSound = useCallback((type) => {
    // Initialise context only once
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      audioCtxRef.current = new AudioContext();
    }

    const ctx = audioCtxRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    switch (type) {
      case 'pop': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.1);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      case 'win': {
        const playNote = (freq, delay) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'sine';
          osc.frequency.value = freq;

          gain.gain.setValueAtTime(0, now + delay);
          gain.gain.linearRampToValueAtTime(0.15, now + delay + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.6);

          osc.start(now + delay);
          osc.stop(now + delay + 0.6);
        };

        //  Arpeggio (C5, E5, G5 and high C)
        playNote(523.25, 0);
        playNote(659.25, 0.1);
        playNote(783.99, 0.2);
        playNote(1046.5, 0.3);
        break;
      }

      case 'error': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.3);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }

      default:
        break;
    }
  }, []);

  return playSound;
};
