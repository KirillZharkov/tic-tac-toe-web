import { game } from "./Controller.js";
import { initDB, saveGame, getAllGames } from "js/database.js";

export var winIn = [];
export let name = prompt("Введите свое имя");
export let size = prompt("Введите размер доски (от 3 до 10)");

export async function start_game() {
  await initDB();

  if (size === null || size === "") {
    size = 3;
  }

  if (name === null || name === "") {
    name = "Guest";
  }

  var increment = 0;
  for (let i = 0; i <= size - 1; i++) {
    winIn[i] = [];
    for (let j = 0; j <= size - 1; j++) {
      winIn[i][j] = increment;
      increment++;
    }
  }

  // Здесь можно добавить код для сохранения игры
  const gameData = {
    name: name,
    size: size,
    board: winIn,
  };
  await saveGame(gameData);

  increment = 0;
  var increment2 = 0;
  for (let i = parseInt(size); i < parseInt(size) + parseInt(size); i++) {
    winIn[i] = [];
    for (let j = 0; j <= parseInt(size) - 1; j++) {
      winIn[i][j] = increment2;
      increment2 = increment2 + parseInt(size);
    }
    increment++;
    increment2 = increment;
  }

  increment = 0;
  for (
    let i = parseInt(size) + parseInt(size);
    i < parseInt(size) + parseInt(size) + 1;
    i++
  ) {
    winIn[i] = [];
    for (let j = 0; j <= parseInt(size) - 1; j++) {
      winIn[i][j] = increment;
      increment = increment + parseInt(size) + 1;
    }
  }

  increment = parseInt(size) - 1;
  for (
    let i = parseInt(size) + parseInt(size) + 1;
    i < parseInt(size) + parseInt(size) + 2;
    i++
  ) {
    winIn[i] = [];
    for (let j = 0; j <= parseInt(size) - 1; j++) {
      winIn[i][j] = increment;
      increment = increment + parseInt(size) - 1;
    }
  }
}
// Функция для получения всех сыгранных партий
export async function loadGames() {
  const games = await getAllGames();
  console.log(games); // Выводим в консоль для проверки
}

game();
