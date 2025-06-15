// Splash.js
// Retro-styled Splash screen for Say It and Spell It

import * as Tone from 'https://cdn.skypack.dev/tone';

export class Splash {
  constructor(container = document.getElementById("main-content")) {
    // === UI SETUP ===
    this.container = document.createElement("div");
    this.container.id = "splash";
    this.container.style.position = "absolute";
    this.container.style.top = "50%";
    this.container.style.left = "50%";
    this.container.style.transform = "translate(-50%, -50%)";
    this.container.style.textAlign = "center";
    this.container.style.fontFamily = "'VT323', monospace";
    this.container.style.backgroundColor = "black";
    this.container.style.border = "3px solid lime";
    this.container.style.padding = "20px";
    this.container.style.color = "lime";
    this.container.style.zIndex = "1000";
    this.container.style.fontSize = "24px";
    this.container.style.boxShadow = "0 0 10px lime";
    this.container.style.width = "220px";
    this.container.style.height = "140px";
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.justifyContent = "center";
    this.container.style.alignItems = "center";

    // === START BUTTON ===
    const startButton = document.createElement("button");
    startButton.innerHTML = `<div style='line-height:1; font-size:18px;'>press to</div><div style='font-size:32px;'>START</div>`;
    startButton.style.width = "200px";
    startButton.style.height = "100px";
    startButton.style.backgroundColor = "black";
    startButton.style.color = "lime";
    startButton.style.border = "2px solid lime";
    startButton.style.fontFamily = "'VT323', monospace";
    startButton.style.cursor = "pointer";
    startButton.style.display = "flex";
    startButton.style.flexDirection = "column";
    startButton.style.alignItems = "center";
    startButton.style.justifyContent = "center";
    startButton.onmouseenter = () => {
      startButton.style.backgroundColor = "#003300";
    };
    startButton.onmouseleave = () => {
      startButton.style.backgroundColor = "black";
    };
    startButton.onclick = async () => {
      await Tone.start();
      this.stopMusic();
      this.destroy();
      if (typeof window.menu1 === 'function') {
        window.menu1();
      } else {
        console.warn("menu1() is not defined");
      }
    };
    this.container.appendChild(startButton);

    // === MUTE TOGGLE ===
    this.muteButton = document.createElement("button");
    this.muteButton.innerHTML = "🔇";
    this.muteButton.style.marginTop = "10px";
    this.muteButton.style.fontSize = "20px";
    this.muteButton.style.background = "none";
    this.muteButton.style.border = "none";
    this.muteButton.style.color = "lime";
    this.muteButton.style.cursor = "pointer";
    this.muteButton.title = "Toggle sound";
    this.muteButton.onclick = () => this.toggleMute();
    this.container.appendChild(this.muteButton);

    container.appendChild(this.container);

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
  }

  show() {
    this.container.style.display = "flex";
    if (!this.isMuted) this.startMusic();
  }

  hide() {
    this.container.style.display = "none";
  }

  destroy() {
    this.container.remove();
    this.stopMusic();
    this.container = null;
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
