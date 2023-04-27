const MAP_HEIGHT = 20
const MAP_WIDTH = 20
const SCREEN_HEIGHT = 10
const SCREEN_WIDTH = 10
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

let running = true;
while (running) {

    for (let row = ogrePosition[0] - Math.floor(SCREEN_HEIGHT / 2); row < ogrePosition[0] + Math.floor(SCREEN_HEIGHT / 2) + (SCREEN_HEIGHT % 2); row++) {
        let line = ""
        for (let column = ogrePosition[1] - Math.floor(SCREEN_WIDTH / 2); column < ogrePosition[1] + Math.floor(SCREEN_WIDTH / 2) + (SCREEN_WIDTH % 2); column++) {
            if ((ogrePosition[0] === row) && (ogrePosition[1] === column)) {
                line += OGRE_SPRITE;
            } else if ((row < 0) || (row >= MAP_HEIGHT) || (column < 0) || (column >= MAP_WIDTH)) {
                line += TREE_SPRITE;
            } else {
                line += map[row][column];
            }
        }
        console.log(line);
    }
    let userDirection = 0
    do {
        userDirection = PROMPT("");
    } while (userDirection < 0 || userDirection > 4);
    let ogreNewPosition = []
    ogreNewPosition[0] = ogrePosition[0];
    ogreNewPosition[1] = ogrePosition[1];
    switch (userDirection) {
        case '0':
            ogreNewPosition[0] -= 1;
            break;
        case '1':
            ogreNewPosition[1] -= 1;
            break;
        case '2':
            ogreNewPosition[0] += 1;
            break;
        case '3':
            ogreNewPosition[1] += 1;
            break;
        case '4':
            running = false;
            break
        default:
            break;
    }
    if (map[ogreNewPosition[0]][ogreNewPosition[1]] !== TREE_SPRITE) {
        ogrePosition[0] = ogreNewPosition[0];
        ogrePosition[1] = ogreNewPosition[1];
    }
     for(let i = 0; i < 50; i++) {
        console.log('\r\n');
    }
}
