import { getAllGames, getGameById } from "./Database.js";

async function showGameList() {
  const games = await getAllGames();
  const listElement = document.getElementById("gameList");
  listElement.innerHTML = "";
  games.forEach((game) => {
    const item = document.createElement("li");
    item.textContent = `Игра #${game.id}: Победитель - ${game.winner}`;
    item.addEventListener("click", () => replayGame(game.id));
    listElement.appendChild(item);
  });
}
async function replayGame(id) {
  const game = await getGameById(id);
  if (game) {
    const area = document.getElementById("area");
    const cells = document.getElementsByClassName("cell");
    area.innerHTML = ""; // Очистка игрового поля

    // Создание клеток заново
    for (let i = 0; i < size * size; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = i;
      area.appendChild(cell);
    }

    // Последовательное воспроизведение ходов
    const allMoves = [
      ...game.moves.player.map((m) => ({ player: "X", cell: m })),
      ...game.moves.computer.map((m) => ({ player: "O", cell: m })),
    ].sort((a, b) => a.cell - b.cell); // Сортировка ходов по порядку

    for (const move of allMoves) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Задержка для анимации
      const cell = document.getElementById(move.cell);
      if (cell) {
        cell.textContent = move.player; // Отображение хода
      }
    }

    alert(`Реплей завершён. Победитель: ${game.winner}`);
  }
  // Запуск новой игры
  document.getElementById("newGameButton").addEventListener("click", () => {
    start_game();
  });

  // Показ списка сохранённых игр
  document.getElementById("gameListButton").addEventListener("click", () => {
    showGameList();
  });
}
