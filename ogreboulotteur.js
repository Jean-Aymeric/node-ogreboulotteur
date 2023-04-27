const MAP_HEIGHT = 100
const MAP_WIDTH = 100
const TREE_SPRITE = 'T'
const GROUND_SPRITE = ' '
const FOREST_DENSITY = 20

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

for (let row = 0; row < MAP_HEIGHT; row++) {
    let line = ""
    for (let column = 0; column < MAP_WIDTH; column++) {
        line += map[row][column];
    }
    console.log(line);
}
