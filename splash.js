<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=900, height=650" />
  <title>Say it & Spell it</title>
  <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">
  <style>
    #say-spell-app {
      width: 900px;
      height: 650px;
      background-color: black;
      font-family: 'VT323', monospace;
      color: #00FF00;
      display: flex;
      flex-direction: column;
      padding: 5px;
      box-sizing: border-box;
      outline: none;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      position: relative;
    }

    .header .title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 32px;
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background-color: transparent;
    }

    .icon-container:hover {
      background-color: #00FF00;
      cursor: pointer;
    }

    .icon-container:hover .icon {
      background-color: black;
    }

    .icon-container:active {
      background-color: yellow;
    }

    .icon {
      width: 20px;
      height: 20px;
      background-color: #00FF00;
      clip-path: polygon(
        50% 0%, 0% 50%, 20% 50%, 20% 100%, 80% 100%, 80% 50%, 100% 50%
      );
      pointer-events: none;
    }

    .main-content {
      flex: 1;
      margin-top: 10px;
      border: 5px solid #00FF00;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }

    .footer {
      text-align: right;
      font-size: 16px;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div id="say-spell-app" tabindex="0">
    <div class="header">
      <div class="icon-container" id="home-icon">
        <div class="icon"></div>
      </div>
      <div class="title">Say it &amp; Spell it©</div>
      <div></div>
    </div>

    <div class="main-content" id="main-content">
      <!-- MODULE CONTENT GOES HERE -->
    </div>

    <div class="footer">Gifted Academy 2025 © All rights reserved</div>
  </div>

  <script>
    const app = document.getElementById("say-spell-app");
    const homeIcon = document.getElementById("home-icon");
    const mainContent = document.getElementById("main-content");
    const synth = window.speechSynthesis;

    function speak(char) {
      if (synth.speaking) synth.cancel();
      const utterance = new SpeechSynthesisUtterance(char);
      utterance.rate = 1.2;
      synth.speak(utterance);
    }

    function loadSplashModule() {
      import("https://giftedsam-bruh.github.io/SayITandSPELLit/splash.js")
        .then(({ Splash }) => {
          const splash = new Splash();
          splash.show();
        })
        .catch(err => {
          console.error("Failed to load splash module:", err);
        });
    }

    app.addEventListener("keydown", (e) => {
      const char = e.key;
      if (char.length === 1 && /^[a-zA-Z0-9]$/.test(char)) {
        speak(char);
      }
    });

    app.addEventListener("click", () => {
      app.focus();
    });

    homeIcon.addEventListener("mousedown", () => {
      speak("home");
      loadSplashModule();
    });

    // Load splash on startup
    loadSplashModule();
  </script>
</body>
</html>
