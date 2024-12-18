import { start_game } from "./Model.js";
export function renderGameOptions() {
  const container = document.getElementById("game-options");
  container.innerHTML = `
        <button id="new-game">Новая игра</button>
        <button id="load-games">Показать сыгранные игры</button>
    `;

  document.getElementById("new-game").onclick = () => start_game();
  document.getElementById("load-games").onclick = loadGames;
}
//start_game();
