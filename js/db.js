import { openDB } from "idb";

const dbPromise = openDB("tic-tac-toe-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("games")) {
      db.createObjectStore("games", { keyPath: "id", autoIncrement: true });
    }
  },
});

export const saveGame = async (gameData) => {
  const db = await dbPromise;
  const tx = db.transaction("games", "readwrite");
  await tx.objectStore("games").add(gameData);
  await tx.done;
  console.log("Игра сохранена:", gameData);
};

export const listGames = async () => {
  const db = await dbPromise;
  return await db
    .transaction("games", "readonly")
    .objectStore("games")
    .getAll();
};

export const loadGame = async (id) => {
  const db = await dbPromise;
  return await db.transaction("games", "readonly").objectStore("games").get(id);
};
