export class Menu1 {
  show() {
    const main = document.getElementById("main-content");
    main.innerHTML = ""; // ✅ Only clears the dynamic module area

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
    title.textContent = "Choose a Level";
    title.style.marginBottom = "20px";
    container.appendChild(title);

    for (let i = 1; i <= 5; i++) {
      const button = document.createElement("button");
      button.textContent = `Level ${i}`;
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

      button.onclick = () => {
        window.selectedLevel = i;
        import("https://giftedsam-bruh.github.io/SayITandSPELLit/menu2.js")
          .then(({ Menu2 }) => new Menu2().show());
      };

      container.appendChild(button);
    }

    main.appendChild(container); // ✅ Appends only to the content area
  }
}
