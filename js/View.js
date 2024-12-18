import { openDB } from 'idb';
import { game } from './Controller.js';
import { start_game } from './Model.js';

const DB_NAME = 'TicTacToeDB';
const DB_VERSION = 1;
const STORE_NAME = 'games';

// Initialize IndexedDB
target="_blank" const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
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

export const deleteGame = async (id) => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
};

// UI integration
document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save Game';
    saveButton.id = 'save-game';

    const listButton = document.createElement('button');
    listButton.innerText = 'List Games';
    listButton.id = 'list-games';

    const loadInput = document.createElement('input');
    loadInput.type = 'number';
    loadInput.placeholder = 'Enter Game ID';
    loadInput.id = 'load-game-id';

    const loadButton = document.createElement('button');
    loadButton.innerText = 'Load Game';
    loadButton.id = 'load-game';

    const controls = document.createElement('div');
    controls.id = 'game-controls';
    controls.append(saveButton, listButton, loadInput, loadButton);

    document.body.appendChild(controls);

    saveButton.addEventListener('click', async () => {
        const currentGameState = {
            // Collect necessary game data
            playerMoves: [],
            pcMoves: [],
            result: document.getElementById('win').innerText,
            date: new Date().toISOString()
        };
        await saveGame(currentGameState);
        alert('Game saved successfully!');
    });

    listButton.addEventListener('click', async () => {
        const games = await getAllGames();
        console.log('Saved games:', games);
        alert(JSON.stringify(games)); // Simplified for debugging
    });

    loadButton.addEventListener('click', async () => {
        const gameId = parseInt(loadInput.value, 10);
        if (!gameId) {
            alert('Please enter a valid Game ID!');
            return;
        }

        const gameData = await getGameById(gameId);
        if (gameData) {
            console.log('Loaded game:', gameData);
            // Integrate with game logic to replay game state
        } else {
            alert('Game not found!');
        }
    });

    start_game();
    game();
});
