export function solve(state) {
  console.log(state);
  let puzzle = transform(state);
  let boxes = createBoxes(state.size*2, puzzle);
  console.log(puzzle);
}

function transform(state) {
  let puzzle = [];
  let s = state.size;
  for (let j = 0; j < state.size; j++) {
    let row = [];
    for (let i = 0; i < state.size; i++) {
      if (state.hasOwnProperty(i + s * j) && state[i + s * j].up) {
        row.push(-1);
        row.push(-1);
      } else {
        row.push(-1);
        row.push(0);
      }
    }
    puzzle.push(row);
    row = [];

    for (let i = 0; i < state.size; i++) {
      if (state.hasOwnProperty(i + s * j)) {
        state[i + s * j].left ? row.push(-1) : row.push(0);
        state[i + s * j].number ? row.push(state[i + s * j].number) : row.push(0);
      } else {
        row.push(0);
        row.push(0);
      }
    }
    puzzle.push(row);
    row = [];
  }

  return puzzle;
}

function createBoxes(size, puzzle) {
  let boxes = [];
  let i;
  let visited = new Array(size);
  for (i = 0; i < size; i++) {
    visited[i] = new Array(size).fill(0);
  }
  for (i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let box = [];
      traverse(puzzle, visited, i, j, box, size);
      if (box.length > 0) {
        boxes.push(box);
      }
    }
  }
  console.log(boxes);
}

function traverse(puzzle, visited, i, j, box, size) {
  if (i < 0 || i >= size || j < 0 || j >= size || puzzle[i][j] === -1 || visited[i][j] === 1) {
    return;
  } else {
    if (puzzle[i][j] !== 0) {
      box.push(puzzle[i][j]);
    }
    visited[i][j] = 1;
    traverse(puzzle,visited, i + 1, j, box, size);
    traverse(puzzle,visited, i - 1, j, box, size);
    traverse(puzzle,visited, i, j + 1, box, size);
    traverse(puzzle,visited, i, j - 1, box, size);
  }


}
