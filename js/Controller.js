import { saveGame, listGames, loadGame } from "./db.js";

export const saveCurrentGame = (coor_pl, coor_pc, result) => {
  const gameData = {
    playerName: name,
    boardSize: size,
    playerMoves: coor_pl,
    pcMoves: coor_pc,
    result: result,
  };
  saveGame(gameData);
};

export const displayGameList = async () => {
  const games = await listGames();
  const listElement = document.getElementById("game-list");
  listElement.innerHTML = "";
  games.forEach((game) => {
    const item = document.createElement("li");
    item.textContent = `Game ${game.id}: ${game.playerName} (${game.result})`;
    item.addEventListener("click", () => {
      loadGame(game.id).then(loadGameState);
    });
    listElement.appendChild(item);
  });
};

export const loadGameState = (gameData) => {
  coor_pl = gameData.playerMoves;
  coor_pc = gameData.pcMoves;
  gameData.playerMoves.forEach(
    (id) => (document.getElementById(id).innerHTML = "x")
  );
  gameData.pcMoves.forEach(
    (id) => (document.getElementById(id).innerHTML = "o")
  );
  document.getElementById(
    "win"
  ).textContent = `Восстановлена игра: ${gameData.result}`;
};
