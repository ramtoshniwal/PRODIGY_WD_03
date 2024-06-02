const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
const winningLine = document.getElementById('winningLine');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleResultValidation = () => {
    let roundWon = false;
    let winningCells = [];
    for (let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningCells = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusMessage.innerHTML = ` Player ${currentPlayer} wins! `;
        isGameActive = false;
        restartButton.style.display = 'block';
        displayWinningLine(winningCells);
        return;
    }

    if (!board.includes('')) {
        statusMessage.innerHTML = 'It\'s a Draw!';
        isGameActive = false;
        restartButton.style.display = 'block';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.innerHTML = `It's ${currentPlayer}'s turn`;
};

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.setAttribute('data-content', currentPlayer);
    clickedCell.classList.add('selected', currentPlayer.toLowerCase());

    handleResultValidation();
};

const handleRestartGame = () => {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    statusMessage.innerHTML = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.removeAttribute('data-content');
        cell.classList.remove('selected', 'x', 'o');
    });
    restartButton.style.display = 'none';
    winningLine.classList.remove('show');
};

const displayWinningLine = (winningCells) => {
    const cellPositions = [
        { top: '15%', left: '15%' },
        { top: '15%', left: '50%' },
        { top: '15%', left: '85%' },
        { top: '50%', left: '15%' },
        { top: '50%', left: '50%' },
        { top: '50%', left: '85%' },
        { top: '85%', left: '15%' },
        { top: '85%', left: '50%' },
        { top: '85%', left: '85%' },
    ];

    const start = cellPositions[winningCells[0]];
    const end = cellPositions[winningCells[2]];
    const dx = end.left - start.left;
    const dy = end.top - start.top;

    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    const distance = Math.sqrt(dx * dx + dy * dy);

    winningLine.style.top = start.top;
    winningLine.style.left = start.left;
    winningLine.style.transform = `rotate(${angle}deg)`;
    winningLine.style.width = `${distance}px`;
    winningLine.classList.add('show');
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

statusMessage.innerHTML = `It's ${currentPlayer}'s turn`;
