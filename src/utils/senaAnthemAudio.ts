// Web Audio API synthesizer for the SENA Anthem fanfare and melody
// Enables zero-external-dependency multimedia playback in any browser environment

class SenaAnthemSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTimeout: any = null;
  private onStepCallback: ((verseIndex: number, lineIndex: number) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  // Simple solemn march melody notes for SENA Anthem (Luis Alfredo Sarmiento / Daniel Marlez)
  // C major / G major uplifting patriotic educational fanfare
  private notes = [
    { pitch: 261.63, dur: 0.4 }, // C4
    { pitch: 329.63, dur: 0.4 }, // E4
    { pitch: 392.00, dur: 0.6 }, // G4
    { pitch: 523.25, dur: 0.8 }, // C5
    { pitch: 392.00, dur: 0.4 }, // G4
    { pitch: 440.00, dur: 0.4 }, // A4
    { pitch: 392.00, dur: 0.6 }, // G4
    { pitch: 349.23, dur: 0.4 }, // F4
    { pitch: 329.63, dur: 0.8 }, // E4
    { pitch: 293.66, dur: 0.4 }, // D4
    { pitch: 329.63, dur: 0.4 }, // E4
    { pitch: 261.63, dur: 1.0 }  // C4
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playNote(freq: number, durationSec: number) {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Brass-like fanfare timbre
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationSec);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + durationSec);
    } catch {
      // Audio fallback handling
    }
  }

  public startAnthemSequence(
    onStep: (verseIndex: number, lineIndex: number) => void,
    onEnd: () => void
  ) {
    this.init();
    this.isPlaying = true;
    this.onStepCallback = onStep;
    this.onEndCallback = onEnd;

    let totalSteps = 0;
    const maxSteps = 16; // 4 verses * 4 lines roughly

    const tick = () => {
      if (!this.isPlaying) return;

      const verseIdx = Math.floor(totalSteps / 4) % 5;
      const lineIdx = totalSteps % 4;

      this.onStepCallback?.(verseIdx, lineIdx);

      // Play note sequence
      const note = this.notes[totalSteps % this.notes.length];
      this.playNote(note.pitch, note.dur);

      totalSteps++;
      if (totalSteps >= maxSteps * 2) {
        this.stop();
        this.onEndCallback?.();
        return;
      }

      this.currentTimeout = setTimeout(tick, 1800);
    };

    tick();
  }

  public stop() {
    this.isPlaying = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const senaAnthemSynthesizer = new SenaAnthemSynthesizer();
