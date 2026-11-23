(() => {
  // ===== Localization (VI / EN) =====
  const I18N = {
    vi: {
      subtitle: "Chế độ Người chơi & AI tự động giải từng bước",
      modePlayer: "Người chơi",
      modeAI: "AI Tự giải",
      langLabel: "Tiếng Việt",
      difficultyLabel: "Độ khó",
      cluesLabel: "Ô cho sẵn",
      diffEasy: "Dễ",
      diffMedium: "Trung bình",
      diffHard: "Khó",
      mistakesLabel: "Lỗi",
      timerLabel: "Thời gian",
      newGame: "✦ Tự sinh màn mới",
      playerControlsTitle: "Bảng điều khiển Người chơi",
      btnUndo: "Hoàn tác",
      btnErase: "Xóa",
      btnNotes: "Ghi chú",
      btnHint: "Gợi ý AI",
      hintBoxTitle: "Mẹo & Giải thích AI",
      hintBoxDefault:
        "Chọn một ô trống và nhấn phím 1–9 để điền số. Nhấn N để bật/tắt ghi chú, hoặc nhấn \"Gợi ý AI\" để xem lời giải thích bước tiếp theo.",
      soundLegendTitle: "Hiệu ứng âm thanh",
      soundLegendDesc:
        "Mỗi phím số (1–9) phát ra một nốt marimba riêng; nút Xóa, Ghi chú, Hoàn tác, Gợi ý và báo lỗi đều có âm sắc riêng biệt.",
      aiControlsTitle: "AI Tự động giải từng bước",
      aiStepLabel: "Bước",
      aiStrategyLabel: "Chiến lược",
      aiStart: "Bắt đầu giải",
      aiPause: "Tạm dừng",
      aiResume: "Tiếp tục",
      aiDone: "Đã giải xong",
      aiPrev: "Lùi 1 bước",
      aiNext: "Tiến 1 bước",
      aiReset: "Đặt lại",
      aiSpeedLabel: "Tốc độ giải",
      speedFast: "Nhanh",
      speedSlow: "Chậm",
      legendLogic: "Suy luận logic",
      legendTry: "Thử nghiệm (MRV)",
      legendBacktrack: "Quay lui",
      aiLogTitle: "Nhật ký suy luận AI",
      aiLogEmpty:
        "Nhấn \"Bắt đầu giải\" hoặc \"Tiến 1 bước\" để xem AI phân tích bảng Sudoku từng bước một.",
      winPlayer: "Chúc mừng! Bạn đã hoàn thành bảng Sudoku xuất sắc!",
      winAI: "AI đã giải hoàn tất bảng Sudoku!",
      gameOver: "Bạn đã mắc 3/3 lỗi! Hãy nhấn \"Ván mới\" hoặc chuyển sang chế độ AI để xem lời giải.",
      remainingText: (n) => `Còn ${n}`,
      stratNames: {
        naked_single: "Naked Single",
        hidden_row: "Hidden Single (Hàng)",
        hidden_col: "Hidden Single (Cột)",
        hidden_box: "Hidden Single (Khối 3×3)",
        mrv_try: "Thử nghiệm MRV",
        backtrack: "Quay lui (Backtrack)",
        ai_deduction: "Suy luận sâu AI"
      },
      describeStep: (step) => {
        const coord = `R${step.row + 1}C${step.col + 1}`;
        switch (step.strategy) {
          case "naked_single":
            return `Ô ${coord} chỉ còn duy nhất ứng viên ${step.value} → Điền ${step.value}.`;
          case "hidden_row":
            return `Số ${step.value} chỉ có thể đứng tại ${coord} trong hàng ${step.row + 1} → Điền ${step.value}.`;
          case "hidden_col":
            return `Số ${step.value} chỉ có thể đứng tại ${coord} trong cột ${step.col + 1} → Điền ${step.value}.`;
          case "hidden_box":
            return `Số ${step.value} chỉ có thể đứng tại ${coord} trong khối 3×3 → Điền ${step.value}.`;
          case "mrv_try":
            return `Ô ${coord} ít ứng viên nhất [${(step.candidates || []).join(", ")}] → Thử ${step.value}.`;
          case "backtrack":
            return `Nhánh mâu thuẫn → Quay lui, xóa ${step.prevValue} tại ô ${coord}.`;
          default:
            return `AI suy luận ô ${coord} = ${step.value}.`;
        }
      }
    },
    en: {
      subtitle: "Player Mode & Step-by-Step AI Solver",
      modePlayer: "Player",
      modeAI: "AI Solver",
      langLabel: "English",
      difficultyLabel: "Difficulty",
      cluesLabel: "Given Clues",
      diffEasy: "Easy",
      diffMedium: "Medium",
      diffHard: "Hard",
      mistakesLabel: "Mistakes",
      timerLabel: "Time",
      newGame: "✦ Generate Puzzle",
      playerControlsTitle: "Player Controls",
      btnUndo: "Undo",
      btnErase: "Erase",
      btnNotes: "Notes",
      btnHint: "AI Hint",
      hintBoxTitle: "Tips & AI Explanation",
      hintBoxDefault:
        "Select an empty cell and press 1–9 to place a digit. Press N to toggle notes, or click \"AI Hint\" for a step-by-step logical clue.",
      soundLegendTitle: "Sound Design",
      soundLegendDesc:
        "Each digit (1–9) plays a distinct marimba pitch; Erase, Notes, Undo, Hint, Mode switches, and errors each have unique audio cues.",
      aiControlsTitle: "AI Step-by-Step Solver",
      aiStepLabel: "Step",
      aiStrategyLabel: "Strategy",
      aiStart: "Start Solving",
      aiPause: "Pause",
      aiResume: "Resume",
      aiDone: "Solved",
      aiPrev: "Prev Step",
      aiNext: "Next Step",
      aiReset: "Reset",
      aiSpeedLabel: "Solver Speed",
      speedFast: "Fast",
      speedSlow: "Slow",
      legendLogic: "Logical Deduction",
      legendTry: "MRV Trial",
      legendBacktrack: "Backtrack",
      aiLogTitle: "AI Reasoning Log",
      aiLogEmpty:
        "Click \"Start Solving\" or \"Next Step\" to watch the AI analyze and solve the Sudoku step by step.",
      winPlayer: "Congratulations! You solved the Sudoku puzzle!",
      winAI: "AI has finished solving the Sudoku puzzle!",
      gameOver: "3/3 mistakes reached! Start a \"New Game\" or switch to AI Mode to see the solution.",
      remainingText: (n) => `${n} left`,
      stratNames: {
        naked_single: "Naked Single",
        hidden_row: "Hidden Single (Row)",
        hidden_col: "Hidden Single (Col)",
        hidden_box: "Hidden Single (3×3 Box)",
        mrv_try: "MRV Trial",
        backtrack: "Backtrack",
        ai_deduction: "Deep AI Deduction"
      },
      describeStep: (step) => {
        const coord = `R${step.row + 1}C${step.col + 1}`;
        switch (step.strategy) {
          case "naked_single":
            return `Cell ${coord} has only one candidate (${step.value}) → Place ${step.value}.`;
          case "hidden_row":
            return `Digit ${step.value} only fits at ${coord} in Row ${step.row + 1} → Place ${step.value}.`;
          case "hidden_col":
            return `Digit ${step.value} only fits at ${coord} in Column ${step.col + 1} → Place ${step.value}.`;
          case "hidden_box":
            return `Digit ${step.value} only fits at ${coord} in its 3×3 box → Place ${step.value}.`;
          case "mrv_try":
            return `Cell ${coord} has fewest candidates [${(step.candidates || []).join(", ")}] → Try ${step.value}.`;
          case "backtrack":
            return `Contradiction reached → Backtrack & clear ${step.prevValue} at ${coord}.`;
          default:
            return `AI deduces ${coord} = ${step.value}.`;
        }
      }
    }
  };

  // ===== Application State =====
  const sound = new window.SoundEngine();

  const state = {
    lang: "vi",
    mode: "player", // 'player' | 'ai'
    difficulty: "medium",
    clues: 0,
    puzzle: [],
    solution: [],
    board: [],
    notes: [], // 9x9 array of Set
    cellSource: [], // 9x9: 'given' | 'user' | 'ai-logic' | 'ai-try' | ''
    selected: null, // { row, col }
    notesMode: false,
    mistakes: 0,
    maxMistakes: 3,
    history: [],
    gameOver: false,
    won: false,

    // Timer
    seconds: 0,
    timerId: null,

    // AI Step-by-Step state
    aiSteps: [],
    aiStepIndex: 0,
    aiRunning: false,
    aiTimerId: null,
    aiSpeedMs: 320,
    aiActiveCell: null // { row, col, type }
  };

  // ===== DOM References =====
  const els = {
    board: document.getElementById("sudokuBoard"),
    numpad: document.getElementById("numpad"),
    diffButtons: Array.from(document.querySelectorAll(".diff-btn")),
    clueCount: document.getElementById("clueCount"),
    mistakeCount: document.getElementById("mistakeCount"),
    timerDisplay: document.getElementById("timerDisplay"),
    banner: document.getElementById("bannerMessage"),
    confettiCanvas: document.getElementById("confettiCanvas"),

    btnModePlayer: document.getElementById("btnModePlayer"),
    btnModeAI: document.getElementById("btnModeAI"),
    btnLang: document.getElementById("btnLang"),
    btnSound: document.getElementById("btnSound"),
    iconSoundOn: document.getElementById("iconSoundOn"),
    iconSoundOff: document.getElementById("iconSoundOff"),
    volumeSlider: document.getElementById("volumeSlider"),
    btnNewGame: document.getElementById("btnNewGame"),

    playerPanel: document.getElementById("playerPanel"),
    aiPanel: document.getElementById("aiPanel"),

    btnUndo: document.getElementById("btnUndo"),
    btnErase: document.getElementById("btnErase"),
    btnNotes: document.getElementById("btnNotes"),
    notesBadge: document.getElementById("notesBadge"),
    btnHint: document.getElementById("btnHint"),
    playerHintText: document.getElementById("playerHintText"),

    aiStepCounter: document.getElementById("aiStepCounter"),
    aiStrategyName: document.getElementById("aiStrategyName"),
    btnAiPlayPause: document.getElementById("btnAiPlayPause"),
    aiPlayIcon: document.getElementById("aiPlayIcon"),
    aiPlayText: document.getElementById("aiPlayText"),
    btnAiPrev: document.getElementById("btnAiPrev"),
    btnAiNext: document.getElementById("btnAiNext"),
    btnAiReset: document.getElementById("btnAiReset"),
    aiSpeedSlider: document.getElementById("aiSpeedSlider"),
    aiSpeedValue: document.getElementById("aiSpeedValue"),
    aiLogList: document.getElementById("aiLogList")
  };

  const cellElements = [];
  const numButtons = [];

  // ===== Initialization =====
  function initDOM() {
    // Build 9x9 grid cells
    els.board.innerHTML = "";
    for (let r = 0; r < 9; r++) {
      cellElements[r] = [];
      for (let c = 0; c < 9; c++) {
        const div = document.createElement("div");
        const boxParity = (Math.floor(r / 3) + Math.floor(c / 3)) % 2;
        div.className = `cell ${boxParity === 0 ? "box-amber" : "box-cream"}`;
        div.dataset.row = r;
        div.dataset.col = c;
        div.tabIndex = 0;
        div.setAttribute("role", "gridcell");
        div.addEventListener("click", () => selectCell(r, c, true));
        els.board.appendChild(div);
        cellElements[r][c] = div;
      }
    }

    // Build numpad 1..9
    els.numpad.innerHTML = "";
    for (let d = 1; d <= 9; d++) {
      const btn = document.createElement("button");
      btn.className = "num-btn";
      btn.dataset.digit = d;
      btn.innerHTML = `<span class="digit">${d}</span><span class="remaining"></span>`;
      btn.addEventListener("click", () => handleNumberInput(d));
      els.numpad.appendChild(btn);
      numButtons[d] = btn;
    }
  }

  function createEmptyNotes() {
    return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Set()));
  }

  function cloneNotes(notes) {
    return notes.map((row) => row.map((s) => new Set(s)));
  }

  // ===== Game Lifecycle =====
  function startNewGame(difficulty = state.difficulty, playSound = false) {
    stopAI();
    stopTimer();

    state.difficulty = difficulty;
    const { puzzle, solution, clues } = window.SudokuEngine.generatePuzzle(difficulty);
    state.puzzle = puzzle;
    state.solution = solution;
    state.clues = clues;
    state.board = window.SudokuEngine.cloneBoard(puzzle);
    els.diffButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.difficulty === difficulty);
    });
    state.notes = createEmptyNotes();
    state.cellSource = Array.from({ length: 9 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => (puzzle[r][c] !== 0 ? "given" : ""))
    );
    state.selected = null;
    state.mistakes = 0;
    state.history = [];
    state.gameOver = false;
    state.won = false;
    state.seconds = 0;
    state.aiActiveCell = null;

    // Precompute AI steps for the fresh puzzle
    prepareAIStepsFromCurrent();

    hideBanner();
    stopConfetti();
    els.playerHintText.textContent = I18N[state.lang].hintBoxDefault;

    if (playSound) sound.playNewGame();

    updateTimerDisplay();
    if (state.mode === "player") startTimer();
    renderAll();
  }

  function prepareAIStepsFromCurrent() {
    const trace = window.SudokuEngine.generateAISteps(state.puzzle);
    state.aiSteps = trace.steps;
    state.aiStepIndex = 0;
    state.aiActiveCell = null;
    updateAIControlsUI();
    renderAILog();
  }

  // ===== Timer =====
  function startTimer() {
    stopTimer();
    state.timerId = setInterval(() => {
      if (state.mode === "player" && !state.gameOver && !state.won) {
        state.seconds++;
        updateTimerDisplay();
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function updateTimerDisplay() {
    const mins = String(Math.floor(state.seconds / 60)).padStart(2, "0");
    const secs = String(state.seconds % 60).padStart(2, "0");
    els.timerDisplay.textContent = `${mins}:${secs}`;
  }

  // ===== Mode Switching =====
  function setMode(newMode) {
    if (state.mode === newMode) return;
    sound.playSwitch();
    stopAI();

    state.mode = newMode;
    els.btnModePlayer.classList.toggle("active", newMode === "player");
    els.btnModeAI.classList.toggle("active", newMode === "ai");
    els.playerPanel.classList.toggle("hidden", newMode !== "player");
    els.aiPanel.classList.toggle("hidden", newMode !== "ai");

    hideBanner();

    if (newMode === "ai") {
      stopTimer();
      // Reset board to puzzle start for clean step-by-step AI demonstration
      resetAIBoardToStart(false);
    } else {
      // Return to player mode cleanly from puzzle start if AI modified board
      state.board = window.SudokuEngine.cloneBoard(state.puzzle);
      state.notes = createEmptyNotes();
      state.cellSource = Array.from({ length: 9 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (state.puzzle[r][c] !== 0 ? "given" : ""))
      );
      state.mistakes = 0;
      state.history = [];
      state.gameOver = false;
      state.won = false;
      state.aiActiveCell = null;
      startTimer();
    }

    renderAll();
  }

  // ===== Player Interactions =====
  function selectCell(row, col, withSound = false) {
    state.selected = { row, col };
    if (withSound) sound.playCellSelect();
    renderBoard();
  }

  function saveSnapshot() {
    state.history.push({
      board: window.SudokuEngine.cloneBoard(state.board),
      notes: cloneNotes(state.notes),
      cellSource: state.cellSource.map((r) => r.slice())
    });
    if (state.history.length > 80) state.history.shift();
  }

  function handleNumberInput(digit) {
    if (state.mode !== "player" || state.gameOver || state.won) return;
    if (!state.selected) {
      sound.playCellSelect();
      return;
    }

    const { row, col } = state.selected;
    if (state.puzzle[row][col] !== 0) {
      sound.playError();
      return;
    }

    if (state.notesMode) {
      if (state.board[row][col] !== 0) return;
      saveSnapshot();
      const cellNotes = state.notes[row][col];
      if (cellNotes.has(digit)) cellNotes.delete(digit);
      else cellNotes.add(digit);
      sound.playNote();
      renderAll();
      return;
    }

    // Direct number placement
    if (state.board[row][col] === digit) return;
    saveSnapshot();
    state.board[row][col] = digit;
    state.cellSource[row][col] = "user";
    state.notes[row][col].clear();

    const isCorrect = state.solution[row][col] === digit;
    if (isCorrect) {
      sound.playNumber(digit);
      clearPeerNotes(row, col, digit);
      animateCell(row, col);
      checkPlayerWin();
    } else {
      state.mistakes++;
      sound.playError();
      if (state.mistakes >= state.maxMistakes) {
        state.gameOver = true;
        stopTimer();
        sound.playGameOver();
        showBanner(I18N[state.lang].gameOver, "lose");
      }
    }

    renderAll();
  }

  function clearPeerNotes(row, col, digit) {
    for (let i = 0; i < 9; i++) {
      state.notes[row][i].delete(digit);
      state.notes[i][col].delete(digit);
    }
    const br = Math.floor(row / 3) * 3;
    const bc = Math.floor(col / 3) * 3;
    for (let r = br; r < br + 3; r++) {
      for (let c = bc; c < bc + 3; c++) {
        state.notes[r][c].delete(digit);
      }
    }
  }

  function handleErase() {
    if (state.mode !== "player" || state.gameOver || state.won) return;
    if (!state.selected) return;
    const { row, col } = state.selected;
    if (state.puzzle[row][col] !== 0) {
      sound.playError();
      return;
    }
    if (state.board[row][col] === 0 && state.notes[row][col].size === 0) return;

    saveSnapshot();
    state.board[row][col] = 0;
    state.cellSource[row][col] = "";
    state.notes[row][col].clear();
    sound.playErase();
    renderAll();
  }

  function handleUndo() {
    if (state.mode !== "player" || state.gameOver || state.won) return;
    if (state.history.length === 0) return;

    const prev = state.history.pop();
    state.board = prev.board;
    state.notes = prev.notes;
    state.cellSource = prev.cellSource;
    sound.playUndo();
    renderAll();
  }

  function toggleNotesMode() {
    if (state.mode !== "player") return;
    state.notesMode = !state.notesMode;
    sound.playNote();
    updateNotesToggleUI();
  }

  function handleHint() {
    if (state.mode !== "player" || state.gameOver || state.won) return;

    // Create a clean board where wrong user entries are treated as empty for logical deduction
    const cleanBoard = state.board.map((row, r) =>
      row.map((val, c) => (val === state.solution[r][c] ? val : 0))
    );

    const hint = window.SudokuEngine.getHint(cleanBoard, state.solution);
    if (!hint) return;

    saveSnapshot();
    state.board[hint.row][hint.col] = hint.value;
    state.cellSource[hint.row][hint.col] = "ai-logic";
    state.notes[hint.row][hint.col].clear();
    clearPeerNotes(hint.row, hint.col, hint.value);
    state.selected = { row: hint.row, col: hint.col };

    els.playerHintText.textContent = I18N[state.lang].describeStep(hint);
    sound.playHint();
    animateCell(hint.row, hint.col);
    checkPlayerWin();
    renderAll();
  }

  function checkPlayerWin() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (state.board[r][c] !== state.solution[r][c]) return false;
      }
    }
    state.won = true;
    stopTimer();
    sound.playVictory();
    showBanner(I18N[state.lang].winPlayer, "win");
    launchConfetti();
    return true;
  }

  // ===== AI Step-by-Step Controller =====
  function resetAIBoardToStart(playSound = true) {
    stopAI();
    state.board = window.SudokuEngine.cloneBoard(state.puzzle);
    state.notes = createEmptyNotes();
    state.cellSource = Array.from({ length: 9 }, (_, r) =>
      Array.from({ length: 9 }, (_, c) => (state.puzzle[r][c] !== 0 ? "given" : ""))
    );
    state.aiStepIndex = 0;
    state.aiActiveCell = null;
    hideBanner();
    stopConfetti();
    if (playSound) sound.playNewGame();
    updateAIControlsUI();
    renderAILog();
    renderBoard();
  }

  function applyAIStepForward(withSound = true) {
    if (state.aiStepIndex >= state.aiSteps.length) {
      stopAI();
      return false;
    }

    const step = state.aiSteps[state.aiStepIndex];
    state.board[step.row][step.col] = step.value;

    if (step.type === "logic") {
      state.cellSource[step.row][step.col] = "ai-logic";
      if (withSound) sound.playAILogic(step.value);
    } else if (step.type === "try") {
      state.cellSource[step.row][step.col] = "ai-try";
      if (withSound) sound.playAITry(step.value);
    } else if (step.type === "backtrack") {
      state.cellSource[step.row][step.col] = "";
      if (withSound) sound.playAIBacktrack();
    }

    state.aiActiveCell = { row: step.row, col: step.col, type: step.type };
    state.aiStepIndex++;

    animateCell(step.row, step.col);
    updateAIControlsUI();
    renderAILog();
    renderBoard();

    if (state.aiStepIndex >= state.aiSteps.length) {
      stopAI();
      sound.playVictory();
      showBanner(I18N[state.lang].winAI, "win");
      launchConfetti();
    }
    return true;
  }

  function applyAIStepBackward() {
    if (state.aiStepIndex <= 0) return;
    stopAI();
    hideBanner();

    state.aiStepIndex--;
    const step = state.aiSteps[state.aiStepIndex];
    state.board[step.row][step.col] = step.prevValue;
    if (step.prevValue === 0) {
      state.cellSource[step.row][step.col] = "";
    } else {
      state.cellSource[step.row][step.col] = "ai-try";
    }

    if (state.aiStepIndex > 0) {
      const prevStep = state.aiSteps[state.aiStepIndex - 1];
      state.aiActiveCell = { row: prevStep.row, col: prevStep.col, type: prevStep.type };
    } else {
      state.aiActiveCell = null;
    }

    sound.playUndo();
    updateAIControlsUI();
    renderAILog();
    renderBoard();
  }

  function startAI() {
    if (state.aiStepIndex >= state.aiSteps.length) {
      resetAIBoardToStart(false);
    }
    state.aiRunning = true;
    sound.playSwitch();
    updateAIControlsUI();

    const tick = () => {
      if (!state.aiRunning) return;
      const ok = applyAIStepForward(true);
      if (ok && state.aiRunning) {
        state.aiTimerId = setTimeout(tick, state.aiSpeedMs);
      }
    };
    state.aiTimerId = setTimeout(tick, Math.min(state.aiSpeedMs, 120));
  }

  function stopAI() {
    state.aiRunning = false;
    if (state.aiTimerId) {
      clearTimeout(state.aiTimerId);
      state.aiTimerId = null;
    }
    updateAIControlsUI();
  }

  function toggleAIPlayPause() {
    if (state.aiRunning) {
      sound.playSwitch();
      stopAI();
    } else {
      startAI();
    }
  }

  // ===== Rendering =====
  function renderAll() {
    renderBoard();
    renderNumpad();
    updateStatsUI();
    updateNotesToggleUI();
    updateAIControlsUI();
  }

  function renderBoard() {
    const sel = state.selected;
    const selectedVal = sel ? state.board[sel.row][sel.col] : 0;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const el = cellElements[r][c];
        const val = state.board[r][c];
        const src = state.cellSource[r][c];
        const boxParity = (Math.floor(r / 3) + Math.floor(c / 3)) % 2;

        el.className = `cell ${boxParity === 0 ? "box-amber" : "box-cream"}`;

        if (src === "given") el.classList.add("given");
        else if (src === "user") el.classList.add("user-val");
        else if (src === "ai-logic") el.classList.add("ai-logic");
        else if (src === "ai-try") el.classList.add("ai-try");

        // Player mode highlights
        if (state.mode === "player" && sel) {
          const sameRow = sel.row === r;
          const sameCol = sel.col === c;
          const sameBox =
            Math.floor(sel.row / 3) === Math.floor(r / 3) &&
            Math.floor(sel.col / 3) === Math.floor(c / 3);

          if (sameRow && sameCol) {
            el.classList.add("selected");
          } else if (selectedVal !== 0 && val === selectedVal) {
            el.classList.add("same-number");
          } else if (sameRow || sameCol || sameBox) {
            el.classList.add("peer");
          }
        }

        // Error highlight in player mode
        if (state.mode === "player" && val !== 0 && src === "user" && val !== state.solution[r][c]) {
          el.classList.add("error");
        }

        // AI active cell highlight
        if (state.mode === "ai" && state.aiActiveCell && state.aiActiveCell.row === r && state.aiActiveCell.col === c) {
          if (state.aiActiveCell.type === "logic") el.classList.add("ai-active-logic");
          else if (state.aiActiveCell.type === "try") el.classList.add("ai-active-try");
          else if (state.aiActiveCell.type === "backtrack") el.classList.add("ai-active-backtrack");
        }

        // Content: digit or notes
        if (val !== 0) {
          el.textContent = String(val);
        } else if (state.notes[r][c].size > 0) {
          let html = '<div class="notes-grid">';
          for (let n = 1; n <= 9; n++) {
            html += `<span class="note-digit">${state.notes[r][c].has(n) ? n : ""}</span>`;
          }
          html += "</div>";
          el.innerHTML = html;
        } else {
          el.textContent = "";
        }
      }
    }
  }

  function renderNumpad() {
    const counts = Array(10).fill(0);
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const v = state.board[r][c];
        if (v >= 1 && v <= 9 && v === state.solution[r][c]) {
          counts[v]++;
        }
      }
    }

    for (let d = 1; d <= 9; d++) {
      const btn = numButtons[d];
      const left = Math.max(0, 9 - counts[d]);
      btn.querySelector(".remaining").textContent = I18N[state.lang].remainingText(left);
      btn.classList.toggle("completed", left === 0);
    }
  }

  function updateStatsUI() {
    els.clueCount.textContent = `${state.clues} / 81`;
    els.mistakeCount.textContent = `${state.mistakes} / ${state.maxMistakes}`;
    els.btnUndo.disabled = state.history.length === 0 || state.gameOver || state.won;
  }

  function updateNotesToggleUI() {
    els.btnNotes.classList.toggle("active-toggle", state.notesMode);
    els.notesBadge.textContent = state.notesMode ? "ON" : "OFF";
  }

  function updateAIControlsUI() {
    const t = I18N[state.lang];
    const total = state.aiSteps.length;
    const idx = state.aiStepIndex;

    els.aiStepCounter.textContent = `${idx} / ${total}`;
    els.btnAiPrev.disabled = idx <= 0 || state.aiRunning;
    els.btnAiNext.disabled = idx >= total || state.aiRunning;

    if (idx > 0 && idx <= total) {
      const currentStep = state.aiSteps[idx - 1];
      els.aiStrategyName.textContent = t.stratNames[currentStep.strategy] || "—";
    } else {
      els.aiStrategyName.textContent = "—";
    }

    els.btnAiPlayPause.classList.toggle("running", state.aiRunning);
    if (state.aiRunning) {
      els.aiPlayIcon.textContent = "⏸";
      els.aiPlayText.textContent = t.aiPause;
    } else if (idx >= total && total > 0) {
      els.aiPlayIcon.textContent = "↻";
      els.aiPlayText.textContent = t.aiDone;
    } else if (idx > 0) {
      els.aiPlayIcon.textContent = "▶";
      els.aiPlayText.textContent = t.aiResume;
    } else {
      els.aiPlayIcon.textContent = "▶";
      els.aiPlayText.textContent = t.aiStart;
    }
  }

  function renderAILog() {
    const t = I18N[state.lang];
    if (state.aiStepIndex === 0) {
      els.aiLogList.innerHTML = `<div class="ai-log-empty">${t.aiLogEmpty}</div>`;
      return;
    }

    // Show the most recent 40 steps (newest at top)
    const start = Math.max(0, state.aiStepIndex - 40);
    const items = [];
    for (let i = state.aiStepIndex - 1; i >= start; i--) {
      const step = state.aiSteps[i];
      items.push(
        `<div class="ai-log-item ${step.type}">
          <span class="step-num">#${i + 1}</span>${t.describeStep(step)}
        </div>`
      );
    }
    els.aiLogList.innerHTML = items.join("");
  }

  function animateCell(r, c) {
    const el = cellElements[r][c];
    el.classList.remove("pop-anim");
    void el.offsetWidth;
    el.classList.add("pop-anim");
  }

  function showBanner(msg, type = "info") {
    els.banner.textContent = msg;
    els.banner.className = `banner-message ${type}`;
  }

  function hideBanner() {
    els.banner.className = "banner-message hidden";
  }

  // ===== Language Switching =====
  function applyLanguage() {
    const t = I18N[state.lang];
    document.documentElement.lang = state.lang;
    els.btnLang.querySelector(".pill-badge").textContent = state.lang.toUpperCase();

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (typeof t[key] === "string") {
        el.textContent = t[key];
      }
    });

    renderNumpad();
    updateAIControlsUI();
    renderAILog();
  }

  // ===== Confetti Celebration =====
  let confettiAnimId = null;
  function launchConfetti() {
    const canvas = els.confettiCanvas;
    canvas.classList.remove("hidden");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const ctx = canvas.getContext("2d");

    const colors = ["#c89242", "#0f6b3c", "#1d4ed8", "#e11d48", "#f59e0b", "#7c3aed"];
    const pieces = Array.from({ length: 75 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 140,
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 6,
      vx: (Math.random() - 0.5) * 3.2,
      vy: 2.2 + Math.random() * 3.4,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.16,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    let frames = 0;
    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      frames++;
      if (frames < 170) {
        confettiAnimId = requestAnimationFrame(frame);
      } else {
        stopConfetti();
      }
    }
    confettiAnimId = requestAnimationFrame(frame);
  }

  function stopConfetti() {
    if (confettiAnimId) {
      cancelAnimationFrame(confettiAnimId);
      confettiAnimId = null;
    }
    els.confettiCanvas.classList.add("hidden");
  }

  // ===== Event Bindings =====
  function bindEvents() {
    els.btnModePlayer.addEventListener("click", () => setMode("player"));
    els.btnModeAI.addEventListener("click", () => setMode("ai"));

    els.btnLang.addEventListener("click", () => {
      state.lang = state.lang === "vi" ? "en" : "vi";
      sound.playSwitch();
      applyLanguage();
    });

    els.btnSound.addEventListener("click", () => {
      const next = !sound.enabled;
      sound.setEnabled(next);
      els.iconSoundOn.classList.toggle("hidden", !next);
      els.iconSoundOff.classList.toggle("hidden", next);
      if (next) sound.playSwitch();
    });

    els.volumeSlider.addEventListener("input", (e) => {
      sound.setVolume(Number(e.target.value) / 100);
    });

    els.diffButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const diff = btn.dataset.difficulty;
        sound.playDifficulty(diff);
        startNewGame(diff, false);
      });
    });

    els.btnNewGame.addEventListener("click", () => startNewGame(state.difficulty, true));

    // Player controls
    els.btnUndo.addEventListener("click", handleUndo);
    els.btnErase.addEventListener("click", handleErase);
    els.btnNotes.addEventListener("click", toggleNotesMode);
    els.btnHint.addEventListener("click", handleHint);

    // AI controls
    els.btnAiPlayPause.addEventListener("click", toggleAIPlayPause);
    els.btnAiNext.addEventListener("click", () => applyAIStepForward(true));
    els.btnAiPrev.addEventListener("click", applyAIStepBackward);
    els.btnAiReset.addEventListener("click", () => resetAIBoardToStart(true));

    els.aiSpeedSlider.addEventListener("input", (e) => {
      state.aiSpeedMs = Number(e.target.value);
      els.aiSpeedValue.textContent = `${state.aiSpeedMs} ms`;
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (state.mode !== "player") {
        if (e.code === "Space") {
          e.preventDefault();
          toggleAIPlayPause();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          if (!state.aiRunning) applyAIStepForward(true);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (!state.aiRunning) applyAIStepBackward();
        }
        return;
      }

      if (e.key >= "1" && e.key <= "9") {
        handleNumberInput(Number(e.key));
      } else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        handleErase();
      } else if (e.key.toLowerCase() === "n") {
        toggleNotesMode();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        handleUndo();
      } else if (e.key.toLowerCase() === "h") {
        handleHint();
      } else if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const cur = state.selected || { row: 0, col: 0 };
        let { row, col } = cur;
        if (e.key === "ArrowUp") row = (row + 8) % 9;
        if (e.key === "ArrowDown") row = (row + 1) % 9;
        if (e.key === "ArrowLeft") col = (col + 8) % 9;
        if (e.key === "ArrowRight") col = (col + 1) % 9;
        selectCell(row, col, true);
      }
    });
  }

  // ===== Bootstrap =====
  initDOM();
  bindEvents();
  applyLanguage();
  startNewGame("medium", false);
})();
