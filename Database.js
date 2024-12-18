// Модуль работы с IndexedDB (Database.js)
import { openDB } from "idb";

const DB_NAME = "TicTacToeDB";
const STORE_NAME = "Games";

export async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return db;
}

export async function saveGame(gameData) {
  const db = await initDB();
  await db.add(STORE_NAME, gameData);
}

export async function getAllGames() {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function getGameById(id) {
  const db = await initDB();
  return await db.get(STORE_NAME, id);
}
