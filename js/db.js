import { openDB } from "idb";

const DB_NAME = "TicTacToeDB";
const DB_VERSION = 1;
const STORE_NAME = "games";

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

export const saveGame = async (gameData) => {
  const db = await initDB();
  await db.add(STORE_NAME, gameData);
};

export const getAllGames = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const getGameById = async (id) => {
  const db = await initDB();
  return await db.get(STORE_NAME, id);
};
