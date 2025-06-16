// SpellIt.js
// Placeholder activity module

export class SpellIt {
  show() {
    const main = document.getElementById("main-content");
    main.innerHTML = "";

    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.alignItems = "center";
    container.style.height = "100%";
    container.style.color = "#00FF00";
    container.style.fontFamily = "'VT323', monospace";
    container.style.fontSize = "32px";
    container.textContent = "Spell It Activity";

    main.appendChild(container);

    const level = window.selectedLevel;
    if (!level) {
      container.textContent = "Error: No level selected.";
      return;
    }

    const levelFile = `https://giftedsam-bruh.github.io/SayITandSPELLit/Level${level}words.js`;

    import(levelFile)
      .catch(() => {
        container.textContent = `Error loading Level ${level} word list.`;
      });
  }
}
