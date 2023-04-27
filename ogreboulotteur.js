const MAP_HEIGHT = 20
const MAP_WIDTH = 20
const TREE_SPRITE = 'T'
const GROUND_SPRITE = ' '
const OGRE_SPRITE = 'ö'
const FOREST_DENSITY = 20
const PROMPT = require('prompt-sync')();

let ogrePosition = [MAP_HEIGHT / 2, MAP_WIDTH / 2]

let map = [[]]
for (let row = 0; row < MAP_HEIGHT; row++) {
    map[row] = []
    for (let column = 0; column < MAP_WIDTH; column++) {
        if ((row === 0) || (row === MAP_HEIGHT - 1) || (column === 0) || (column === MAP_WIDTH - 1)) {
            map[row][column] = TREE_SPRITE;
        } else {
            if (Math.floor(Math.random() * 100) <= FOREST_DENSITY) {
                map[row][column] = TREE_SPRITE;
            } else {
                map[row][column] = GROUND_SPRITE;
            }
        }
    }
}

while (true) {
    for (let row = 0; row < MAP_HEIGHT; row++) {
        let line = ""
        for (let column = 0; column < MAP_WIDTH; column++) {
            if ((ogrePosition[0] === row) && (ogrePosition[1] === column)) {
                line += OGRE_SPRITE;
            } else {
                line += map[row][column];
            }
        }
        console.log(line);
    }
    let userDirection = 0
    do {
        userDirection = PROMPT("");
    } while (userDirection < 0 || userDirection > 3);
    switch (userDirection) {
        case '0':
            ogrePosition[0] -= 1;
            break;
        case '1':
            ogrePosition[1] -= 1;
            break;
        case '2':
            ogrePosition[0] += 1;
            break;
        case '3':
            ogrePosition[1] += 1;
            break;
        default:
            break;
    }
}
