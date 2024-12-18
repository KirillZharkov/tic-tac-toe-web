import { openDB } from "idb";
import { winIn, size, name } from "js/Model.js";

var coor_pc = [];
var coor_pl = [];
var kletki = [];
var hod;
var player = "x";
var pc_player = "o";
var size1;
var area = document.getElementById("area");
var cell = document.getElementsByClassName("cell");

const dbName = "TicTacToeDB";
const storeName = "games";

// Открытие базы данных и создание хранилища
async function initDB() {
  return await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

// Сохранение игры в базу данных
export async function saveGame(winner, moves) {
  const db = await initDB();
  await db.add(storeName, { winner, moves });
}

// Получение всех игр
export async function getAllGames() {
  const db = await initDB();
  return await db.getAll(storeName);
}

// Функция для показа списка игр
export async function showGameList() {
  const games = await getAllGames();
  if (games.length > 0) {
    let list = "Список сыгранных игр:\n";
    games.forEach((game, index) => {
      list += `${index + 1}. Победитель: ${game.winner}, Ходы: ${JSON.stringify(
        game.moves
      )}\n`;
    });
    alert(list);
  } else {
    alert("Нет сохранённых игр.");
  }
}

// Логика игры (упрощенная для примера)
export function game() {
  // Здесь реализована логика игры, уже существующая в Controller.js
  console.log("Игра началась!");
}

export function game() {
  document.getElementById("area").style.width = 52 * parseInt(size);
  size1 = parseInt(size) * parseInt(size);
  console.log(winIn);

  for (var i = 0; i <= size1 - 1; i++) {
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

  function who_one() {
    var pc = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    if (pc === 1) {
      pc_player = "x";
      player = "o";
      pc_hod();
    } else {
      pc_player = "o";
      player = "x";
    }
  }

  who_one();

  function pc_hod() {
    while (true) {
      var rand = Math.floor(Math.random() * kletki.length);
      if (kletki[rand] != 0) break;
    }
    var hod = parseInt(kletki[rand]) - 1;
    document.getElementById(hod).innerHTML = pc_player;
    coor_pc.push(hod);
    kletki[rand] = 0;

    if (checkWin(coor_pc)) {
      document.getElementById("win").innerHTML = "Вы проиграли";
      del_list();
      saveGame("PC", [...coor_pc]); // Сохраняем игру
    } else if (checkWin(coor_pl)) {
      document.getElementById("win").innerHTML = "Победил " + name;
      del_list();
      saveGame(name, [...coor_pl]); // Сохраняем игру
    }
    if (draw) {
      document.getElementById("win").innerHTML = "Ничья";
      del_list();
      saveGame("Draw", [...coor_pc, ...coor_pl]); // Сохраняем игру
    }
  }

  function pl_hod() {
    var data = [];

    if (!this.innerHTML) {
      this.innerHTML = player;
      coor_pl.push(parseInt(this.id));
    } else {
      return;
    }

    for (var i in cell) {
      if (cell[i].innerHTML == player) {
        data.push(parseInt(cell[i].getAttribute("id")));
        kletki[i] = 0;
      }
    }
    if (checkWin(coor_pl)) {
      document.getElementById("win").innerHTML = "Победил " + name;
      del_list();
    } else {
      var draw = true;
      for (var i in cell) {
        if (cell[i].innerHTML == "") draw = false;
      }
      if (draw) {
        document.getElementById("win").innerHTML = "Ничья)";
        del_list();
      }
    }
    if (checkWin(coor_pl) == false && draw == false) setTimeout(pc_hod, 400);
  }

  function checkWin(data) {
    for (var i in winIn) {
      var win = true;
      for (var j in winIn[i]) {
        var id = winIn[i][j];
        var ind = data.includes(id);
        if (ind == false) {
          win = false;
        }
      }
      if (win) return true;
    }
    return false;
  }
}
