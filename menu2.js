// Menu2.js
// Activity selection menu

export class Menu2 {
  show() {
    const main = document.getElementById("main-content");
    main.innerHTML = ""; // Clear module area only

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.height = "100%";
    container.style.color = "#00FF00";
    container.style.fontFamily = "'VT323', monospace";
    container.style.fontSize = "24px";

    const title = document.createElement("div");
    title.textContent = "Choose an Activity";
    title.style.marginBottom = "20px";
    container.appendChild(title);

    const activities = [
      { label: "Say it", module: "SayIt" },
      { label: "Spell it", module: "SpellIt" },
      { label: "What is it", module: "WhatIsIt" },
      { label: "Fill it", module: "FillIt" },
      { label: "Under construction", module: null }
    ];

    activities.forEach(({ label, module }) => {
      const button = document.createElement("button");
      button.textContent = label;
      button.style.margin = "8px";
      button.style.padding = "10px 20px";
      button.style.backgroundColor = "#000000";
      button.style.color = "#00FF00";
      button.style.border = "1px solid #00FF00";
      button.style.fontSize = "20px";
      button.style.cursor = "pointer";
      button.style.fontFamily = "'VT323', monospace";

      button.onmouseenter = () => {
        button.style.backgroundColor = "#00FF00";
        button.style.color = "#000000";
      };
      button.onmouseleave = () => {
        button.style.backgroundColor = "#000000";
        button.style.color = "#00FF00";
      };

      button.onclick = async () => {
        if (!module) {
          alert("That activity isn't ready yet.");
          return;
        }
        window.selectedActivity = module;
        try {
          const imported = await import(`https://giftedsam-bruh.github.io/SayITandSPELLit/${module}.js`);
          if (typeof imported[module] === 'function') {
            new imported[module]().show();
          } else {
            console.warn(`${module}.js did not export a class named ${module}`);
          }
        } catch (err) {
          console.error(`Failed to load module ${module}.js:`, err);
        }
      };

      container.appendChild(button);
    });

    main.appendChild(container);
  }
}
