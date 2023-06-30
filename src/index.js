import "./styles/style.css"
import Battleground from "./modules/battleground";

const initialize = () => {
    const info = document.createElement("div");
    const turn = document.createElement("h2");
    const infoBoth = document.createElement("div");
    const playerInfo = document.createElement("div");
    const enemyInfo = document.createElement("div");
    const playerInfoText = document.createElement("p");
    const enemyInfoText = document.createElement("p");
    const playerShipsRemaining = document.createElement("h3");
    const enemyShipsRemaining = document.createElement("h3");
    const main = document.createElement("div");

    turn.id = "turn";     
    turn.setAttribute("data-index", "1");
    // if id is 1, it's the player's turn else it's enemy's turn
    turn.textContent = "Your turn"

    turn.textContent = "Your Turn";
    playerInfoText.textContent = "Ships remaining: ";
    enemyInfoText.textContent = "Enemy ships remaining: ";
    playerShipsRemaining.textContent = "10";
    enemyShipsRemaining.textContent = "10";

    playerInfo.classList.add("player-info");
    enemyInfo.classList.add("enemy-info");

    playerInfo.appendChild(playerInfoText);
    playerInfo.appendChild(playerShipsRemaining);

    enemyInfo.appendChild(enemyInfoText);
    enemyInfo.appendChild(enemyShipsRemaining);

    infoBoth.appendChild(playerInfo);
    infoBoth.appendChild(enemyInfo);

    info.classList.add("info");
    info.appendChild(turn)
    info.appendChild(infoBoth);

    main.classList.add("main");

    main.appendChild(player.grid);
    main.appendChild(enemy.grid);

    document.body.appendChild(info);
    document.body.appendChild(main);
}


const player = new Battleground();
const enemy = new Battleground(true);
initialize();

export default player;