import { start_game } from "js/Model.js";
import { showGameList } from "js/Controller.js";

// Обработчик кнопки "Play new" — запускает новую игру
document.getElementById("newGameButton").addEventListener("click", () => {
  start_game();
});

// Обработчик кнопки "Список игр" — показывает список сохраненных игр
document.getElementById("gameListButton").addEventListener("click", () => {
  showGameList();
});
