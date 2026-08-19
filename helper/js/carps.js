let currentColor = "RED";

let gridState = Array(8).fill(null).map(() => Array(6).fill(null));
const cellElements = [];


// load the page with html and whatnots
function loadCarps() {
    const style = document.getElementById("style");
    style.textContent = `
        body {
            background-color: #151515;
            margin: 0;
            padding: 0;

            display: grid;
            place-items: center;
            height: 100vh;
        }

        .cell {
            width: 60px;
            height: 60px;
            border: 1px solid #cccccc;
            cursor: pointer;
            box-sizing: border-box;
        }

        .cell[data-color="RED"] { background-color: #f54358; }
        .cell[data-color="GREEN"] { background-color: #43f56a; }
        .cell[data-color="BLUE"] { background-color: #6a5cff; }

        .grid {
            display: grid;
            grid-template-columns: repeat(6, 60px);
            gap: 2px;

            width: 370px;
            height: auto;
        }

        .red {
            background-color: #f54358;

            position: absolute;
            right: 0px;
            top: 62px;
        }

        .green {
            background-color: #2e443e;

            position: absolute;
            right: 0px;
            top: 155px;
        }

        .blue {
            background-color: #322f4f;

            position: absolute;
            right: 0px;
            top: 248px;
        }

        .solve {
            background-color: #cccccc;

            position: absolute;
            right: 0px;
            top: 341px;
        }

        .clear {
            background-color: #1b103b;
            width: 60px;
            height: 30px;
            border: 1px solid #cccccc;
            cursor: pointer;
            box-sizing: border-box;

            position: absolute;
            right: 0px;
            top: 403px;
        }
    `

    document.body.innerHTML = `
        <div style="width: 460px; position: relative">
            <div id="grid" class="grid"></div>
            <input id="red" type="button" class="red cell" onClick="setRed()">
            <input id="green" type="button" class="green cell" onClick="setGreen()">
            <input id="blue" type="button" class="blue cell" onClick="setBlue()">
            <input id="solve" type="button" class="solve cell" onClick="stepGrid()">
            <input id="clear" type="button" class="clear" onClick="clearGrid()">
        </div>
    `;

    // make a grid
    const grid = document.getElementById("grid");
    for (let row = 0; row < 8; row++) {
        cellElements[row] = [];
        for (let col = 0; col < 6; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.addEventListener("click", () => {
                gridState[row][col] = currentColor;
                renderGrid();
            });
            cell.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                gridState[row][col] = null;
                renderGrid();
            });
            grid.appendChild(cell);
            cellElements[row][col] = cell;
        }
    }
}


// ca-rps logic
function stepGrid() {
    const nextState = Array(8).fill(null).map(() => Array(6).fill(null));
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 6; c++) {

            const d = {
                RED: 0,
                GREEN: 0,
                BLUE: 0
            }

            addState(d, gridState[(r+7) % 8][(c+5) % 6]);
            addState(d, gridState[(r+7) % 8][c]);
            addState(d, gridState[(r+7) % 8][(c+1) % 6]);
            addState(d, gridState[r][(c+5) % 6]);
            addState(d, gridState[r][(c+1) % 6]);
            addState(d, gridState[(r+1) % 8][(c+5) % 6]);
            addState(d, gridState[(r+1) % 8][c]);
            addState(d, gridState[(r+1) % 8][(c+1) % 6]);

            const [mostNeighbor, m] = Object.entries(d).reduce(
                (max, entry) => entry[1] > max[1] ? entry : max
            );

            if (!gridState[r][c]) {
                // if empty cell:
                if (d.RED == d.GREEN && d.GREEN == d.BLUE) { nextState[r][c] = null; }
                else if (d.RED == m && d.GREEN == m) { nextState[r][c] = "GREEN"; }
                else if (d.GREEN == m && d.BLUE == m) { nextState[r][c] = "BLUE"; }
                else if (d.BLUE == m && d.RED == m) { nextState[r][c] = "RED"; }
                else { nextState[r][c] = mostNeighbor; }

            } else {
                // if colored cell:
                const currentCell = gridState[r][c];
                switch(currentCell) {
                    case "RED":
                        if (d.BLUE >= d.GREEN) { nextState[r][c] = "RED"; }
                        else { nextState[r][c] = "GREEN"; }
                        break;
                    case "GREEN":
                        if (d.RED >= d.BLUE) { nextState[r][c] = "GREEN"; }
                        else { nextState[r][c] = "BLUE"; }
                        break;
                    case "BLUE":
                        if (d.GREEN >= d.RED) { nextState[r][c] = "BLUE"; }
                        else { nextState[r][c] = "RED"; }
                        break;
                }
            }
        }
    }
    gridState = nextState;
    renderGrid();
}
function addState(d, state) {
    if (state && d[state] !== undefined) {
        d[state]++;
    }
}

// well,,, render the grid
function renderGrid() {
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 6; c++) {
            const color = gridState[r][c];
            const cell = cellElements[r][c];

            if (color) {
                cell.dataset.color = color;
            } else {
                delete cell.dataset.color;
            }
        }
    }
}

// you should play deltarune
function clearGrid() {
    gridState = Array(8).fill(null).map(() => Array(6).fill(null));
    renderGrid();
}

// set current color
function setRed() {
    currentColor = "RED";
    document.getElementById("red").style.backgroundColor = "#f54358";
    document.getElementById("green").style.backgroundColor = "#2e443e";
    document.getElementById("blue").style.backgroundColor = "#322f4f";
}
function setGreen() {
    currentColor = "GREEN";
    document.getElementById("red").style.backgroundColor = "#6b363c";
    document.getElementById("green").style.backgroundColor = "#43f56a";
    document.getElementById("blue").style.backgroundColor = "#322f4f";
}
function setBlue() {
    currentColor = "BLUE";
    document.getElementById("red").style.backgroundColor = "#6b363c";
    document.getElementById("green").style.backgroundColor = "#2e443e";
    document.getElementById("blue").style.backgroundColor = "#6a5cff";
}