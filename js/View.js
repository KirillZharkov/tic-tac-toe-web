import { start_game } from "./Model.js";
import { saveCurrentGame, displayGameList } from "./Controller.js";

start_game();

document.getElementById("save").addEventListener("click", () => {
  saveCurrentGame(coor_pl, coor_pc, document.getElementById("win").textContent);
});

document.getElementById("load").addEventListener("click", displayGameList);
