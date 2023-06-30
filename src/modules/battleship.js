class Battleship {
    constructor(x, y, length, isVertical=false){
        this.hp = +length;
        this.coordinates = this.getCoordinates(x, y, +length, isVertical);
    }

    getCoordinates(x, y, length, isVertical){
        const coordinates =  new Set();
        for (let i = 0; i < length; i++){
            const cur = isVertical ? `${x+i}${y}` : `${x}${y+i}`;
            coordinates.add(cur);
        }
        return coordinates;
    }

    hit(){
        // return 1 if ship is destroyed else 0
        this.hp -= 1;
        return this.hp === 0 ? 1 : 0;
    }
}

export default Battleship;