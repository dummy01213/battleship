import Battleship from "./battleship";
import player from "..";

const defaultShips = {
    4: 1,
    3: 2,
    2: 3,
    1: 4,
}

class Battleground {
    constructor(isEnemy=false, row=10, col=10, ships=defaultShips){
        this.shipCoordinates = new Set();
        this.markedCoordinates = new Set();
        this.battleships = [];
        this.isEnemy = isEnemy;
        this.idSuffix = isEnemy ? "e" : "";
        this.battleshipsLeft = 10;
        this.grid = this.generateGrid(row, col, ships);
    }

    generateGrid(row, col, ships){
        const grid = document.createElement("div");
        grid.classList.add("grid");
        for (let r = 0; r < row; r ++){
            for (let c = 0; c < col; c ++){
                const element = document.createElement("div");
                element.id = `${r}${c}${this.idSuffix}`;
                element.classList.add("cell" + this.idSuffix);
                element.onclick = (e) => {this.handleClick(e)};
                grid.appendChild(element);
            }
        }
        this.populateGrid(ships);    // place battleships on empty grid
        return grid;
    }

    populateGrid(ships){
        // generate coordinates for ships and store them 
        for (let [length, count] of Object.entries(ships)){
            while (count){
                const {x, y, isVertical} = this.getRandomCoordinates(length);
                const battleship = new Battleship(x, y, length, isVertical);
                this.battleships.push(battleship);       // all battleships
                this.updateShipCoordinates(battleship);  // all coordinates where there is a ship
                count -= 1
            }
        }
    }

    getRandomCoordinates(length){
        // try random coordinates until valid coordinates are found
        while (true){
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
            const isVertical = Math.floor(Math.random() * 2);
            if (this.coordinateIsValid(x, y, length, isVertical)){
                return {x, y, isVertical};
            }
        }
    }

    coordinateIsValid(x, y, length, isVertical){
        for (let i = 0; i < length; i ++){
            const r = isVertical ? x + i : x;
            const c = isVertical ? y : y + i;
            if (r >= 10 || c >= 10 || this.shipCoordinates.has(`${r}${c}${this.idSuffix}`)){
                return false
            }
        }
        return true;
    }

    updateShipCoordinates(battleship){
        for (const coordinate of battleship.coordinates){
            this.shipCoordinates.add(coordinate);
        }
    }

    handleClick(e) {
        if (!this.isEnemy) return
        const cell = e.target;
        const coordinates = cell.id.slice(0, 2);
        const enemyShipsRemaining = document.querySelector(".enemy-info > h3");
        if (this.markedCoordinates.has(coordinates)){
            console.log("Already marked");
            return;
        }
        this.markedCoordinates.add(coordinates);
        cell.classList.add("marked");
        if (this.shipCoordinates.has(coordinates)){
            cell.classList.add("ship");
            const shipIndex = this.getShipFromCoordinates(coordinates);
            const destroyed = this.battleships[shipIndex].hit();
            if (destroyed){
                this.battleships[shipIndex] = "Destroyed";
                this.battleshipsLeft -= 1;
                enemyShipsRemaining.textContent = this.battleshipsLeft;
                if (this.battleshipsLeft == 0){
                    alert("Game is finished")
                }
            }
        }
        if (this.isEnemy) {
            this.handleEnemyMove();
        }
    }

    getShipFromCoordinates(coordinates){
        for (let i = 0; i < this.battleships.length; i++){
            if (this.battleships[i] != "Destroyed" &&
                this.battleships[i].coordinates.has(coordinates)) {
                return i
            }
        }
    }

    handleEnemyMove = () => {
        let x = 0;
        let y = 0
        while (player.markedCoordinates.has(`${x}${y}`)){
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        }
        const coordinates = `${x}${y}`;
        const playerShipsRemaining = document.querySelector(".player-info > h3");
        const cell = document.getElementById(`${x}${y}`);
        console.log(cell)
        player.markedCoordinates.add(coordinates);
        cell.classList.add("marked");
        if (player.shipCoordinates.has(coordinates)){
            cell.classList.add("ship");
            const shipIndex = player.getShipFromCoordinates(coordinates);
            const destroyed = player.battleships[shipIndex].hit();
            if (destroyed){
                player.battleships[shipIndex] = "Destroyed";
                player.battleshipsLeft -= 1;
                playerShipsRemaining.textContent = player.battleshipsLeft;
                if (player.battleshipsLeft == 0){
                    alert("Game is finished")
                }
            }
        }
    }
}

export default Battleground;