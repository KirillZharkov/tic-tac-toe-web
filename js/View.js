import { start_game } from "./Model.js";
import { saveGame, getAllGames, getGameById } from "./db.js";

document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.getElementById("save-game");
  const listButton = document.getElementById("list-games");
  const loadButton = document.getElementById("load-game");
  const gameIdInput = document.getElementById("game-id-input");

  saveButton.addEventListener("click", async () => {
    const gameData = {
      playerMoves: coor_pl, // Переменная из Controller.js
      pcMoves: coor_pc, // Переменная из Controller.js
      result: document.getElementById("win").innerText,
      date: new Date().toISOString(),
    };
    await saveGame(gameData);
    alert("Game saved!");
  });

  listButton.addEventListener("click", async () => {
    const games = await getAllGames();
    console.log("Saved games:", games);
    alert(JSON.stringify(games)); // Упрощенный вывод
  });

  loadButton.addEventListener("click", async () => {
    const gameId = parseInt(gameIdInput.value, 10);
    if (!gameId) {
      alert("Please enter a valid Game ID!");
      return;
    }
    const gameData = await getGameById(gameId);
    if (gameData) {
      console.log("Loaded game:", gameData);
      alert(
        `Game loaded:\nPlayer Moves: ${gameData.playerMoves}\nPC Moves: ${gameData.pcMoves}`
      );
      // Добавьте код для воспроизведения игры
    } else {
      alert("Game not found!");
    }
  });
  start_game();
});
