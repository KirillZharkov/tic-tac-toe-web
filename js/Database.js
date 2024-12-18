import { openDB } from "idb";

export class Database {
  constructor() {
    this.dbPromise = openDB("ticTacToe", 1, {
      upgrade(db) {
        db.createObjectStore("games", { keyPath: "id", autoIncrement: true });
      },
    });
  }

  async addGame(gameData) {
    const db = await this.dbPromise;
    await db.add("games", gameData);
    return (await db.getAll("games")).length - 1; // Возвращаем ID добавленной игры
  }

  async getAllGames() {
    const db = await this.dbPromise;
    return db.getAll("games");
  }

  async getGame(id) {
    const db = await this.dbPromise;
    return db.get("games", parseInt(id));
  }
}
