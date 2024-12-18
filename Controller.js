import { saveGame, getAllGames, getGameById } from "./Database.js";
import { winIn, size, name } from "./Model.js";

var coor_pc = [];
var coor_pl = [];
var kletki = [];
var startTime;

var coor_pc = [];
var coor_pl = [];
var kletki = [];
var hod;
var player = "x";
var pc_player = "o";
var size1;
var area = document.getElementById("area");
var cell = document.getElementsByClassName("cell");

export function game() {
  startTime = new Date();
  document.getElementById("area").style.width = 52 * parseInt(size);

  for (var i = 0; i <= size * size - 1; i++) {
    area.innerHTML += "<div class='cell' id=" + i + "></div>";
    kletki[i] = i + 1;
  }

  for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", pl_hod, false);
  }

  function del_list() {
    for (var i = 0; i < cell.length; i++) {
      cell[i].removeEventListener("click", pl_hod, false);
    }
  }

  function pc_hod() {
    while (true) {
      var rand = Math.floor(Math.random() * kletki.length);
      if (kletki[rand] != 0) break;
    }
    var hod = parseInt(kletki[rand]) - 1;
    document.getElementById(hod).innerHTML = pc_player;
    coor_pc.push(hod);
    kletki[rand] = 0;
    checkGameEnd(coor_pc, "Computer");
  }

  function pl_hod() {
    if (!this.innerHTML) {
      this.innerHTML = player;
      coor_pl.push(parseInt(this.id));
      checkGameEnd(coor_pl, name);
      setTimeout(pc_hod, 400);
    }
  }

  function checkGameEnd(coords, winnerName) {
    if (checkWin(coords)) {
      const endTime = new Date();
      const gameData = {
        winner: winnerName,
        moves: { player: coor_pl, computer: coor_pc },
        startTime: startTime,
        endTime: endTime,
      };
      saveGame(gameData);
      document.getElementById("win").innerHTML = `Победитель: ${winnerName}`;
      del_list();
    }
  }

  function checkWin(data) {
    for (var i in winIn) {
      if (winIn[i].every((id) => data.includes(id))) {
        return true;
      }
    }
    return false;
  }
}
