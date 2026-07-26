/**
 * audioEngine.js
 * Procedural audio system using the Web Audio API.
 * No external audio files — all sounds synthesized in real-time.
 * Enhanced for Phase 6 – Global Outbreak Simulator & WHO Emergency Response Center.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.initialized = false;
    this.nodes = new Map();
  }

  /** Initialize AudioContext on first user interaction */
  init() {
    if (this.initialized) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
    this.initialized = true;
  }

  /** Resume context if suspended (autoplay policy) */
  async resume() {
    if (this.ctx?.state === 'suspended') {
      await this.ctx.resume();
    }
  }

  /** ── Utilities ── */

  _createOscillator(type, frequency, gainValue = 0.1, duration = 0.5) {
    const osc  = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
    gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
    return { osc, gain };
  }

  /** ── Space Ambience ── */
  startSpaceAmbience() {
    if (!this.initialized) return;
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer     = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data       = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source  = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop   = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type            = 'lowpass';
    filter.frequency.value = 180;
    filter.Q.value         = 0.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 3);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    this.nodes.set('spaceAmbience', { source, gain });
  }

  stopSpaceAmbience() {
    const node = this.nodes.get('spaceAmbience');
    if (!node) return;
    node.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2);
    setTimeout(() => { try { node.source.stop(); } catch {} }, 2500);
    this.nodes.delete('spaceAmbience');
  }

  /** ── Phase 4: Microscopic Bloodstream Ambience ── */
  startBloodstreamAudio() {
    if (!this.initialized) return;
    if (this.nodes.has('bloodstreamAmbience')) return;

    const bufferSize = this.ctx.sampleRate * 4;
    const buffer     = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data       = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source  = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop   = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type            = 'lowpass';
    filter.frequency.value = 140;
    filter.Q.value         = 1.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 2);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    this.nodes.set('bloodstreamAmbience', { source, gain });
  }

  stopBloodstreamAudio() {
    const node = this.nodes.get('bloodstreamAmbience');
    if (!node) return;
    node.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
    setTimeout(() => { try { node.source.stop(); } catch {} }, 1200);
    this.nodes.delete('bloodstreamAmbience');
  }

  /** ── Phase 5: AI Research Laboratory Ambience ── */
  startLabAmbience() {
    if (!this.initialized) return;
    if (this.nodes.has('labAmbience')) return;

    const bufferSize = this.ctx.sampleRate * 4;
    const buffer     = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data       = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source  = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop   = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type            = 'bandpass';
    filter.frequency.value = 450;
    filter.Q.value         = 2.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 2);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    this.nodes.set('labAmbience', { source, gain });
  }

  stopLabAmbience() {
    const node = this.nodes.get('labAmbience');
    if (!node) return;
    node.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
    setTimeout(() => { try { node.source.stop(); } catch {} }, 1200);
    this.nodes.delete('labAmbience');
  }

  /** ── Phase 6: Emergency WHO Siren & Policy Sounds ── */
  playEmergencySiren() {
    if (!this.initialized) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(750, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(950, this.ctx.currentTime + 0.3);
    osc.frequency.linearRampToValueAtTime(750, this.ctx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
    osc.connect(gain); gain.connect(this.masterGain);
    osc.start(); osc.stop(this.ctx.currentTime + 0.6);
  }

  playSatellitePing() {
    if (!this.initialized) return;
    this._createOscillator('sine', 1800, 0.06, 0.1);
  }

  playPolicyChime() {
    if (!this.initialized) return;
    [440, 554.37, 659.25, 880].forEach((freq, i) => {
      setTimeout(() => this._createOscillator('sine', freq, 0.08, 0.18), i * 70);
    });
  }

  /** Laser Scanner Sweep Beep */
  playScanBeep() {
    if (!this.initialized) return;
    const osc  = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  /** Servomotor Robotic Click */
  playRoboticArmClick() {
    if (!this.initialized) return;
    this._createOscillator('square', 320, 0.08, 0.04);
  }

  /** Cell Entry Pitch Bend Sound */
  playCellEntrySound() {
    if (!this.initialized) return;
    const osc  = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(240, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }

  /** Immune Activation Pulse */
  playImmuneActivation() {
    if (!this.initialized) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => this._createOscillator('triangle', freq, 0.08, 0.2), i * 90);
    });
  }

  /** Computer Hum */
  startComputerHum() {
    if (!this.initialized) return;
    const osc  = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, this.ctx.currentTime);

    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(120, this.ctx.currentTime);
    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.02, this.ctx.currentTime);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 2);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(this.masterGain);
    gain2.connect(this.masterGain);
    osc.start();
    osc2.start();
    this.nodes.set('computerHum', { osc, osc2, gain, gain2 });
  }

  stopComputerHum() {
    const node = this.nodes.get('computerHum');
    if (!node) return;
    node.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 1);
    setTimeout(() => {
      try { node.osc.stop(); node.osc2.stop(); } catch {}
    }, 1500);
    this.nodes.delete('computerHum');
  }

  /** UI Beep */
  beep(frequency = 880, duration = 0.12, gain = 0.15) {
    if (!this.initialized) return;
    this._createOscillator('sine', frequency, gain, duration);
  }

  /** Mission Control Beep */
  missionBeep() {
    if (!this.initialized) return;
    this._createOscillator('square', 440, 0.05, 0.08);
    setTimeout(() => this._createOscillator('square', 660, 0.05, 0.08), 100);
  }

  /** Rocket Engine Rumble */
  startRocketEngine() {
    if (!this.initialized) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer     = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data       = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop   = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type            = 'lowpass';
    filter.frequency.value = 300;

    const distortion = this.ctx.createWaveShaper();
    const curve      = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i * 2) / 256 - 1;
      curve[i] = (Math.PI + 200) * x / (Math.PI + 200 * Math.abs(x));
    }
    distortion.curve = curve;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1.5);

    source.connect(filter);
    filter.connect(distortion);
    distortion.connect(gain);
    gain.connect(this.masterGain);
    source.start();
    this.nodes.set('rocketEngine', { source, gain });
  }

  stopRocketEngine() {
    const node = this.nodes.get('rocketEngine');
    if (!node) return;
    node.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2);
    setTimeout(() => { try { node.source.stop(); } catch {} }, 2500);
    this.nodes.delete('rocketEngine');
  }

  /** Docking Sound */
  playDockingSound() {
    if (!this.initialized) return;
    this._createOscillator('sine', 80, 0.4, 0.3);
    setTimeout(() => {
      const buf  = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.1, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      const src = this.ctx.createBufferSource();
      src.buffer = buf;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.3, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      const f = this.ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = 2000;
      src.connect(f); f.connect(g); g.connect(this.masterGain);
      src.start();
    }, 200);
  }

  /** Airlock Door Hiss & Opening */
  playAirlockDoor() {
    if (!this.initialized) return;
    const duration = 1.8;
    const buf  = this.ctx.createBuffer(1, this.ctx.sampleRate * duration, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const src  = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    src.connect(filter); filter.connect(gain); gain.connect(this.masterGain);
    src.start();
  }

  /** Pressure Equalization Hiss */
  playPressureRelease() {
    if (!this.initialized) return;
    const duration = 1.2;
    const buf  = this.ctx.createBuffer(1, this.ctx.sampleRate * duration, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const src  = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    src.connect(filter); filter.connect(gain); gain.connect(this.masterGain);
    src.start();
  }

  /** Telemetry / Radio Chatter */
  playRadioChatter() {
    if (!this.initialized) return;
    const freqs = [1200, 1500, 900, 1800, 1100];
    freqs.forEach((f, i) => {
      setTimeout(() => {
        this._createOscillator('triangle', f, 0.04, 0.06);
      }, i * 90);
    });
  }

  /** AI Voice Effect */
  playAIVoice() {
    if (!this.initialized) return;
    [440, 550, 660, 440].forEach((freq, i) => {
      setTimeout(() => this._createOscillator('triangle', freq, 0.06, 0.15), i * 80);
    });
  }

  /** Button Click */
  playButtonClick() {
    if (!this.initialized) return;
    this._createOscillator('square', 1200, 0.08, 0.05);
  }

  /** Transition Whoosh */
  playWhoosh() {
    if (!this.initialized) return;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer     = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data       = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const src  = this.ctx.createBufferSource();
    src.buffer = buffer;
    const f    = this.ctx.createBiquadFilter();
    f.type            = 'bandpass';
    f.frequency.value = 800;
    f.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.4);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.2, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    src.connect(f); f.connect(g); g.connect(this.masterGain);
    src.start();
  }

  /** Set master volume (0–1) */
  setVolume(value) {
    if (!this.initialized) return;
    this.masterGain.gain.linearRampToValueAtTime(value, this.ctx.currentTime + 0.1);
  }
}

// Singleton export
export const audioEngine = new AudioEngine();
