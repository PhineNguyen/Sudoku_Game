/**
 * SoundEngine - Web Audio API synthesizer with distinct tones for every button & game event.
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.volume = 0.7;

    // Warm pentatonic marimba frequencies for digits 1..9
    this.numberFreqs = [
      261.63, // 1 - C4
      293.66, // 2 - D4
      329.63, // 3 - E4
      392.00, // 4 - G4
      440.00, // 5 - A4
      523.25, // 6 - C5
      587.33, // 7 - D5
      659.25, // 8 - E5
      783.99  // 9 - G5
    ];
  }

  _ensureContext() {
    if (!this.enabled) return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  setEnabled(flag) {
    this.enabled = Boolean(flag);
  }

  setVolume(val0to1) {
    this.volume = Math.max(0, Math.min(1, val0to1));
  }

  _playTone({
    freq = 440,
    endFreq = null,
    type = "sine",
    duration = 0.12,
    gain = 0.25,
    attack = 0.008,
    delay = 0
  }) {
    const ctx = this._ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (endFreq !== null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), now + duration);
    }

    const peak = Math.max(0.0001, gain * this.volume);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.linearRampToValueAtTime(peak, now + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(g);
    g.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  // Soft wooden tap when selecting a cell
  playCellSelect() {
    this._playTone({
      freq: 210,
      endFreq: 130,
      type: "triangle",
      duration: 0.055,
      gain: 0.22,
      attack: 0.003
    });
  }

  // Distinct marimba-like note for each digit 1..9
  playNumber(digit) {
    const idx = Math.max(1, Math.min(9, digit)) - 1;
    const base = this.numberFreqs[idx];
    // Fundamental
    this._playTone({
      freq: base,
      type: "triangle",
      duration: 0.17,
      gain: 0.26,
      attack: 0.005
    });
    // Gentle harmonic overtone
    this._playTone({
      freq: base * 2,
      type: "sine",
      duration: 0.08,
      gain: 0.08,
      attack: 0.004
    });
  }

  // Crisp pencil scratch/click for notes toggle or note entry
  playNote() {
    this._playTone({
      freq: 920,
      endFreq: 1240,
      type: "sine",
      duration: 0.05,
      gain: 0.14,
      attack: 0.003
    });
  }

  // Soft downward sweep for Erase button
  playErase() {
    this._playTone({
      freq: 360,
      endFreq: 140,
      type: "sine",
      duration: 0.11,
      gain: 0.22,
      attack: 0.005
    });
  }

  // Two-step descending blip for Undo
  playUndo() {
    this._playTone({
      freq: 460,
      type: "triangle",
      duration: 0.065,
      gain: 0.19,
      delay: 0
    });
    this._playTone({
      freq: 330,
      type: "triangle",
      duration: 0.08,
      gain: 0.19,
      delay: 0.055
    });
  }

  // Sparkling chime for AI Hint
  playHint() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => {
      this._playTone({
        freq: f,
        type: "sine",
        duration: 0.18,
        gain: 0.16,
        delay: i * 0.055
      });
    });
  }

  // Distinct buzzer for invalid placement
  playError() {
    this._playTone({
      freq: 165,
      endFreq: 118,
      type: "sawtooth",
      duration: 0.18,
      gain: 0.17,
      attack: 0.005
    });
    this._playTone({
      freq: 148,
      endFreq: 105,
      type: "square",
      duration: 0.16,
      gain: 0.08,
      delay: 0.03
    });
  }

  // Mechanical switch click for Mode / Language / Difficulty
  playSwitch() {
    this._playTone({
      freq: 520,
      endFreq: 680,
      type: "square",
      duration: 0.045,
      gain: 0.1,
      attack: 0.002
    });
  }

  // Distinct tones for Easy / Medium / Hard difficulty buttons
  playDifficulty(level) {
    const freqMap = { easy: 440, medium: 349.23, hard: 261.63 };
    const f = freqMap[level] || 392;
    this._playTone({
      freq: f,
      endFreq: f * 1.15,
      type: "triangle",
      duration: 0.1,
      gain: 0.2,
      attack: 0.004
    });
  }

  // Fresh chord for New Game / Reset
  playNewGame() {
    this._playTone({ freq: 392.0, type: "triangle", duration: 0.12, gain: 0.18, delay: 0 });
    this._playTone({ freq: 493.88, type: "triangle", duration: 0.12, gain: 0.18, delay: 0.06 });
    this._playTone({ freq: 587.33, type: "triangle", duration: 0.16, gain: 0.2, delay: 0.12 });
  }

  // AI step sounds: distinct for Logic deduction, MRV Try, and Backtrack
  playAILogic(digit = 5) {
    const freq = 420 + digit * 38;
    this._playTone({
      freq,
      type: "sine",
      duration: 0.09,
      gain: 0.17,
      attack: 0.004
    });
  }

  playAITry(digit = 5) {
    const freq = 340 + digit * 28;
    this._playTone({
      freq,
      endFreq: freq * 1.06,
      type: "triangle",
      duration: 0.075,
      gain: 0.15,
      attack: 0.004
    });
  }

  playAIBacktrack() {
    this._playTone({
      freq: 280,
      endFreq: 160,
      type: "sawtooth",
      duration: 0.09,
      gain: 0.1,
      attack: 0.004
    });
  }

  // Celebratory arpeggio for Victory
  playVictory() {
    const chord = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    chord.forEach((f, i) => {
      this._playTone({
        freq: f,
        type: "triangle",
        duration: 0.28,
        gain: 0.22,
        delay: i * 0.08
      });
    });
  }

  // Sad descending motif for Game Over
  playGameOver() {
    const notes = [330, 293.66, 246.94, 196];
    notes.forEach((f, i) => {
      this._playTone({
        freq: f,
        type: "sawtooth",
        duration: 0.2,
        gain: 0.12,
        delay: i * 0.11
      });
    });
  }
}

window.SoundEngine = SoundEngine;
