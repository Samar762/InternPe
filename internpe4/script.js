document.addEventListener("DOMContentLoaded", () => {
    const columns = 7;
    const rows = 6;
    const board = [];
    let currentPlayer = 'red';
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const resetButton = document.getElementById('reset');

    function createBoard() {
        boardElement.innerHTML = '';
        for (let r = 0; r < rows; r++) {
            board[r] = [];
            for (let c = 0; c < columns; c++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener('click', handleCellClick);
                boardElement.appendChild(cell);
                board[r][c] = null;
            }
        }
    }

    function handleCellClick(event) {
        const col = parseInt(event.target.dataset.col);
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][col]) {
                board[r][col] = currentPlayer;
                event.target.closest('#board').children[r * columns + col].classList.add(currentPlayer);
                if (checkWinner(r, col)) {
                    statusElement.textContent = `${currentPlayer.toUpperCase()} wins!`;
                    disableBoard();
                    return;
                }
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                statusElement.textContent = `${currentPlayer.toUpperCase()}'s turn`;
                return;
            }
        }
    }

    function checkWinner(row, col) {
        return (
            checkDirection(row, col, 1, 0) || // Horizontal
            checkDirection(row, col, 0, 1) || // Vertical
            checkDirection(row, col, 1, 1) || // Diagonal /
            checkDirection(row, col, 1, -1)   // Diagonal \
        );
    }

    function checkDirection(row, col, rowDir, colDir) {
        let count = 0;
        for (let i = -3; i <= 3; i++) {
            const r = row + i * rowDir;
            const c = col + i * colDir;
            if (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
                count++;
                if (count === 4) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }

    function disableBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
    }

    resetButton.addEventListener('click', () => {
        createBoard();
        currentPlayer = 'red';
        statusElement.textContent = `${currentPlayer.toUpperCase()}'s turn`;
    });

    createBoard();
});
