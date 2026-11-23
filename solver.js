/**
 * SudokuEngine - Puzzle generator, validator, and Hybrid AI Step-by-Step Solver
 * Combines human logical strategies (Naked Single, Hidden Single) with MRV Backtracking.
 */
const SudokuEngine = (() => {
  // Exact puzzle from the user's reference image
  const SAMPLE_PUZZLE = [
    [1, 6, 8, 0, 0, 0, 9, 0, 2],
    [0, 0, 0, 3, 0, 1, 0, 0, 0],
    [0, 3, 0, 6, 2, 0, 0, 0, 0],
    [0, 0, 9, 0, 0, 0, 1, 0, 6],
    [0, 0, 1, 0, 0, 0, 3, 7, 0],
    [0, 4, 3, 5, 0, 0, 0, 0, 9],
    [0, 0, 0, 8, 0, 2, 6, 0, 0],
    [0, 0, 0, 9, 0, 5, 0, 2, 3],
    [2, 0, 6, 0, 3, 0, 7, 0, 0]
  ];

  function cloneBoard(board) {
    return board.map((row) => row.slice());
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function isValidPlacement(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === num) return false;
      if (i !== row && board[i][col] === num) return false;
    }
    const br = Math.floor(row / 3) * 3;
    const bc = Math.floor(col / 3) * 3;
    for (let r = br; r < br + 3; r++) {
      for (let c = bc; c < bc + 3; c++) {
        if ((r !== row || c !== col) && board[r][c] === num) return false;
      }
    }
    return true;
  }

  function getCandidates(board, row, col) {
    if (board[row][col] !== 0) return [];
    const used = new Uint8Array(10);
    for (let i = 0; i < 9; i++) {
      used[board[row][i]] = 1;
      used[board[i][col]] = 1;
    }
    const br = Math.floor(row / 3) * 3;
    const bc = Math.floor(col / 3) * 3;
    for (let r = br; r < br + 3; r++) {
      for (let c = bc; c < bc + 3; c++) {
        used[board[r][c]] = 1;
      }
    }
    const list = [];
    for (let n = 1; n <= 9; n++) {
      if (!used[n]) list.push(n);
    }
    return list;
  }

  function findBestEmptyCell(board) {
    let best = null;
    let minLen = 10;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          const cands = getCandidates(board, r, c);
          if (cands.length === 0) return { row: r, col: c, cands: [] };
          if (cands.length < minLen) {
            minLen = cands.length;
            best = { row: r, col: c, cands };
            if (minLen === 1) return best;
          }
        }
      }
    }
    return best;
  }

  // Fast MRV solver that returns a solved board or null
  function solveFast(inputBoard, randomize = false) {
    const board = cloneBoard(inputBoard);

    function backtrack() {
      const cell = findBestEmptyCell(board);
      if (!cell) return true;
      if (cell.cands.length === 0) return false;

      const candidates = randomize ? shuffle(cell.cands) : cell.cands;
      for (const val of candidates) {
        board[cell.row][cell.col] = val;
        if (backtrack()) return true;
        board[cell.row][cell.col] = 0;
      }
      return false;
    }

    return backtrack() ? board : null;
  }

  // Counts solutions up to `limit` (used to guarantee unique puzzle solution)
  function countSolutions(inputBoard, limit = 2) {
    const board = cloneBoard(inputBoard);
    let count = 0;

    function backtrack() {
      if (count >= limit) return;
      const cell = findBestEmptyCell(board);
      if (!cell) {
        count++;
        return;
      }
      if (cell.cands.length === 0) return;

      for (const val of cell.cands) {
        board[cell.row][cell.col] = val;
        backtrack();
        board[cell.row][cell.col] = 0;
        if (count >= limit) return;
      }
    }

    backtrack();
    return count;
  }

  // Evaluate puzzle difficulty using the AI solver
  function evaluateDifficulty(puzzle) {
    const trace = generateAISteps(puzzle, 1200);
    let naked = 0;
    let hidden = 0;
    let tries = 0;
    let backtracks = 0;
    for (const s of trace.steps) {
      if (s.strategy === "naked_single") naked++;
      else if (s.type === "logic") hidden++;
      else if (s.type === "try") tries++;
      else if (s.type === "backtrack") backtracks++;
    }
    const score = hidden * 2 + tries * 15 + backtracks * 5;
    return { solved: trace.solved, naked, hidden, tries, backtracks, score };
  }

  function buildUniquePuzzle(targetClues) {
    const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
    const solution = solveFast(emptyBoard, true);
    const puzzle = cloneBoard(solution);

    const coords = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        coords.push([r, c]);
      }
    }
    const order = shuffle(coords);
    let clues = 81;

    for (const [r, c] of order) {
      if (clues <= targetClues) break;
      const backup = puzzle[r][c];
      puzzle[r][c] = 0;

      if (countSolutions(puzzle, 2) !== 1) {
        puzzle[r][c] = backup;
      } else {
        clues--;
      }
    }

    return { puzzle, solution, clues };
  }

  // Generate a new Sudoku puzzle with guaranteed unique solution and calibrated difficulty:
  // 'easy' (~42 clues), 'medium' (~33 clues), 'hard' (~25-27 clues, higher logical/MRV complexity)
  function generatePuzzle(difficulty = "medium") {
    const config = {
      easy: { targetClues: 42, attempts: 3 },
      medium: { targetClues: 33, attempts: 5 },
      hard: { targetClues: 25, attempts: 10 }
    };
    const cfg = config[difficulty] || config.medium;

    let best = null;
    for (let i = 0; i < cfg.attempts; i++) {
      const candidate = buildUniquePuzzle(cfg.targetClues);
      const metrics = evaluateDifficulty(candidate.puzzle);

      if (difficulty === "easy") {
        // Prefer puzzles that require zero guessing and fewer hidden singles
        if (!best || (metrics.tries === 0 && metrics.score < best.metrics.score)) {
          best = { ...candidate, metrics };
        }
        if (metrics.tries === 0 && metrics.hidden <= 8) break;
      } else if (difficulty === "medium") {
        // Prefer puzzles with solid hidden-single logic and at most 1 light trial
        const dist = Math.abs(metrics.score - 32) + metrics.tries * 10;
        if (!best || dist < best.dist) {
          best = { ...candidate, metrics, dist };
        }
      } else {
        // Hard: prefer puzzles that require MRV trials/backtracking or minimal clues
        const hardRank = metrics.tries * 100 + metrics.score + (40 - candidate.clues) * 4;
        if (!best || hardRank > best.hardRank) {
          best = { ...candidate, metrics, hardRank };
        }
        if (metrics.tries >= 2 && candidate.clues <= 27) break;
      }
    }

    return {
      puzzle: best.puzzle,
      solution: best.solution,
      clues: best.clues,
      metrics: best.metrics
    };
  }

  // Find a single human-like logical deduction step (Naked Single or Hidden Single)
  function findLogicalStep(board) {
    const candGrid = Array.from({ length: 9 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => getCandidates(board, r, c))
    );

    // 1. Naked Single: an empty cell with exactly 1 candidate
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0 && candGrid[r][c].length === 1) {
          return {
            type: "logic",
            strategy: "naked_single",
            row: r,
            col: c,
            value: candGrid[r][c][0]
          };
        }
      }
    }

    // 2. Hidden Single in Rows
    for (let r = 0; r < 9; r++) {
      for (let num = 1; num <= 9; num++) {
        let spots = [];
        for (let c = 0; c < 9; c++) {
          if (board[r][c] === 0 && candGrid[r][c].includes(num)) {
            spots.push(c);
          }
        }
        if (spots.length === 1) {
          return {
            type: "logic",
            strategy: "hidden_row",
            row: r,
            col: spots[0],
            value: num
          };
        }
      }
    }

    // 3. Hidden Single in Columns
    for (let c = 0; c < 9; c++) {
      for (let num = 1; num <= 9; num++) {
        let spots = [];
        for (let r = 0; r < 9; r++) {
          if (board[r][c] === 0 && candGrid[r][c].includes(num)) {
            spots.push(r);
          }
        }
        if (spots.length === 1) {
          return {
            type: "logic",
            strategy: "hidden_col",
            row: spots[0],
            col: c,
            value: num
          };
        }
      }
    }

    // 4. Hidden Single in 3x3 Boxes
    for (let br = 0; br < 9; br += 3) {
      for (let bc = 0; bc < 9; bc += 3) {
        for (let num = 1; num <= 9; num++) {
          let spots = [];
          for (let r = br; r < br + 3; r++) {
            for (let c = bc; c < bc + 3; c++) {
              if (board[r][c] === 0 && candGrid[r][c].includes(num)) {
                spots.push([r, c]);
              }
            }
          }
          if (spots.length === 1) {
            return {
              type: "logic",
              strategy: "hidden_box",
              row: spots[0][0],
              col: spots[0][1],
              value: num
            };
          }
        }
      }
    }

    return null;
  }

  /**
   * Generates a complete step-by-step trace for the AI Solver.
   * Applies logical deductions first, then switches to MRV backtracking (recording tries & backtracks).
   */
  function generateAISteps(inputBoard, maxSteps = 2500) {
    const board = cloneBoard(inputBoard);
    const steps = [];

    function hasContradiction() {
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (board[r][c] === 0 && getCandidates(board, r, c).length === 0) {
            return true;
          }
        }
      }
      return false;
    }

    function solveTrace(isBranching) {
      if (steps.length >= maxSteps) return false;

      // Apply logical deductions while available at this branch
      const localForced = [];
      while (true) {
        const logicStep = findLogicalStep(board);
        if (!logicStep) break;

        board[logicStep.row][logicStep.col] = logicStep.value;
        localForced.push(logicStep);
        steps.push({
          ...logicStep,
          prevValue: 0,
          inBranch: isBranching
        });

        if (steps.length >= maxSteps) return false;
      }

      if (hasContradiction()) {
        // Undo forced deductions in reverse order
        for (let i = localForced.length - 1; i >= 0; i--) {
          const s = localForced[i];
          board[s.row][s.col] = 0;
          steps.push({
            type: "backtrack",
            strategy: "backtrack",
            row: s.row,
            col: s.col,
            value: 0,
            prevValue: s.value
          });
        }
        return false;
      }

      const nextCell = findBestEmptyCell(board);
      if (!nextCell) return true; // Solved!
      if (nextCell.cands.length === 0) {
        for (let i = localForced.length - 1; i >= 0; i--) {
          const s = localForced[i];
          board[s.row][s.col] = 0;
          steps.push({
            type: "backtrack",
            strategy: "backtrack",
            row: s.row,
            col: s.col,
            value: 0,
            prevValue: s.value
          });
        }
        return false;
      }

      for (const val of nextCell.cands) {
        board[nextCell.row][nextCell.col] = val;
        steps.push({
          type: "try",
          strategy: "mrv_try",
          row: nextCell.row,
          col: nextCell.col,
          value: val,
          prevValue: 0,
          candidates: nextCell.cands.slice()
        });

        if (solveTrace(true)) return true;

        board[nextCell.row][nextCell.col] = 0;
        steps.push({
          type: "backtrack",
          strategy: "backtrack",
          row: nextCell.row,
          col: nextCell.col,
          value: 0,
          prevValue: val
        });

        if (steps.length >= maxSteps) break;
      }

      // If all candidates failed, undo localForced before returning
      for (let i = localForced.length - 1; i >= 0; i--) {
        const s = localForced[i];
        board[s.row][s.col] = 0;
        steps.push({
          type: "backtrack",
          strategy: "backtrack",
          row: s.row,
          col: s.col,
          value: 0,
          prevValue: s.value
        });
      }

      return false;
    }

    const solved = solveTrace(false);
    return { solved, steps, finalBoard: board };
  }

  // Returns one helpful hint for Player Mode
  function getHint(currentBoard, solutionBoard) {
    const logic = findLogicalStep(currentBoard);
    if (logic && solutionBoard[logic.row][logic.col] === logic.value) {
      return logic;
    }
    // Otherwise pick the empty cell with fewest candidates (MRV) and reveal from solution
    const best = findBestEmptyCell(currentBoard);
    if (!best) return null;
    return {
      type: "logic",
      strategy: "ai_deduction",
      row: best.row,
      col: best.col,
      value: solutionBoard[best.row][best.col]
    };
  }

  return {
    SAMPLE_PUZZLE,
    cloneBoard,
    isValidPlacement,
    getCandidates,
    solveFast,
    generatePuzzle,
    generateAISteps,
    getHint
  };
})();

window.SudokuEngine = SudokuEngine;
