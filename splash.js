// Splash.js
// Splash screen module for Say It and Spell It with embedded synth music and mute toggle

import * as Tone from 'https://cdn.skypack.dev/tone';

export class Splash {
  constructor() {
    // === UI SETUP ===
    this.container = document.createElement("div");
    this.container.id = "splash";
    this.container.style.position = "absolute";
    this.container.style.top = "50%";
    this.container.style.left = "50%";
    this.container.style.transform = "translate(-50%, -50%)";
    this.container.style.textAlign = "center";
    this.container.style.backgroundColor = "white";
    this.container.style.padding = "40px";
    this.container.style.borderRadius = "10px";
    this.container.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.2)";
    this.container.style.zIndex = "1000";

    const title = document.createElement("h1");
    title.textContent = "Say It and Spell It";
    title.style.fontSize = "3em";
    title.style.marginBottom = "20px";
    this.container.appendChild(title);

    const startButton = document.createElement("button");
    startButton.innerHTML = `<div style="line-height:1.2; font-size:1em;">press to</div><div style="font-size:2em; font-weight:bold;">START</div>`;
    startButton.style.width = "200px";
    startButton.style.height = "100px";
    startButton.style.cursor = "pointer";
    startButton.style.backgroundColor = "white";
    startButton.style.border = "4px solid limegreen";
    startButton.style.borderRadius = "10px";
    startButton.style.display = "flex";
    startButton.style.flexDirection = "column";
    startButton.style.alignItems = "center";
    startButton.style.justifyContent = "center";
    startButton.onmouseenter = () => {
      startButton.style.backgroundColor = "#eaffea";
    };
    startButton.onmouseleave = () => {
      startButton.style.backgroundColor = "white";
    };
    startButton.onclick = () => {
      this.stopMusic();
      this.destroy();
      if (typeof window.menu1 === 'function') {
        window.menu1();
      }
    };
    this.container.appendChild(startButton);

    // === MUTE TOGGLE ===
    this.muteButton = document.createElement("button");
    this.muteButton.innerHTML = "🔇";
    this.muteButton.style.marginTop = "20px";
    this.muteButton.style.fontSize = "1.5em";
    this.muteButton.style.background = "none";
    this.muteButton.style.border = "none";
    this.muteButton.style.cursor = "pointer";
    this.muteButton.title = "Toggle sound";
    this.muteButton.onclick = () => this.toggleMute();
    this.container.appendChild(document.createElement("br"));
    this.container.appendChild(this.muteButton);

    document.body.appendChild(this.container);

    // === TONE.JS SYNTH SETUP ===
    this.isMuted = true;
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    this.loop = new Tone.Loop((time) => {
      this.synth.triggerAttackRelease(["C4", "E4", "G4"], "8n", time);
      this.synth.triggerAttackRelease(["F4"], "8n", time + 0.25);
      this.synth.triggerAttackRelease(["D4", "B3"], "8n", time + 0.5);
    }, "1n");

    Tone.Transport.bpm.value = 120;
    Tone.Transport.scheduleRepeat(this.loop, "1n");

    Tone.start().then(() => {
      if (!this.isMuted) this.startMusic();
    });
  }

  show() {
    this.container.style.display = "block";
    if (!this.isMuted) this.startMusic();
  }

  hide() {
    this.container.style.display = "none";
  }

  destroy() {
    this.container.remove();
    this.stopMusic();
  }

  startMusic() {
    Tone.Transport.start();
  }

  stopMusic() {
    Tone.Transport.stop();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.muteButton.innerHTML = this.isMuted ? "🔇" : "🔊";
    if (this.isMuted) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }

  onStart = null;
}
