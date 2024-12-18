// js/database.js
import { openDB } from "idb";

const DB_NAME = "gameDatabase";
const STORE_NAME = "games";

export async function initDB() {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    },
  });
}

export async function saveGame(data) {
  const db = await openDB(DB_NAME, 1);
  await db.add(STORE_NAME, data);
}

export async function getAllGames() {
  const db = await openDB(DB_NAME, 1);
  return await db.getAll(STORE_NAME);
}

export async function getGameById(id) {
  const db = await openDB(DB_NAME, 1);
  return await db.get(STORE_NAME, id);
}
