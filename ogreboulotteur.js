const MAP_HEIGHT = 20
const MAP_WIDTH = 20
const SCREEN_HEIGHT = 10
const SCREEN_WIDTH = 10
const TREE_SPRITE = 'T'
const CHILD_SPRITE = 'e'
const DEAD_SPRITE = '¤'
const GROUND_SPRITE = ' '
const OGRE_SPRITE = 'ö'
const FOREST_DENSITY = 20
const CHILDREN_DENSITY = 20
const PROMPT = require('prompt-sync')();

let forest = [[]]
let ogrePosition = [MAP_HEIGHT / 2, MAP_WIDTH / 2]
let children = [[]]
for (let row = 0; row < MAP_HEIGHT; row++) {
    forest[row] = []
    children[row] = []
    for (let column = 0; column < MAP_WIDTH; column++) {
        if ((row === 0) || (row === MAP_HEIGHT - 1) || (column === 0) || (column === MAP_WIDTH - 1)) {
            forest[row][column] = TREE_SPRITE;
        } else {
            if (Math.floor(Math.random() * 100) <= FOREST_DENSITY) {
                forest[row][column] = TREE_SPRITE;
            } else {
                forest[row][column] = GROUND_SPRITE;
                if (Math.floor(Math.random() * 100) <= CHILDREN_DENSITY) {
                    children[row][column] = CHILD_SPRITE;
                }
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
            } else if (children[row][column] !== undefined) {
                line += children[row][column];
            } else {
                line += forest[row][column];
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
    if (forest[ogreNewPosition[0]][ogreNewPosition[1]] !== TREE_SPRITE) {
        ogrePosition[0] = ogreNewPosition[0];
        ogrePosition[1] = ogreNewPosition[1];
        if (children[ogrePosition[0]][ogrePosition[1]] === CHILD_SPRITE) {
            children[ogrePosition[0]][ogrePosition[1]] = DEAD_SPRITE;
        }
    }
    for (let i = 0; i < 50; i++) {
        console.log('\r\n');
    }
}
