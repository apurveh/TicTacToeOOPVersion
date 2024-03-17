class TicTacToe {
    constructor(cells, statusDisplay, restartButton) {
        this.cells = cells;
        this.statusDisplay = statusDisplay;
        this.restartButton = restartButton;
        this.turn = 'X';
        this.winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        this.initializeGame();
    }

    initializeGame() {
        this.setStatusMessage();
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.removeEventListener('click', this.handleCellClick);
            cell.addEventListener('click', this.handleCellClick.bind(this), { once: true });
        });
        this.restartButton.addEventListener('click', this.restartGame.bind(this));
        document.body.style.backgroundColor = "";
    }

    handleCellClick(e) {
        const cell = e.target;
        if (cell.textContent || this.checkWin()) {
            return;
        }

        cell.textContent = this.turn;
        if (this.checkWin()) {
            this.statusDisplay.textContent = `${this.turn} wins!`;
            this.endGame();
        } else if (this.isDraw()) {
            this.statusDisplay.textContent = 'Draw!';
            this.endGame();
        } else {
            this.turn = this.turn === 'X' ? 'O' : 'X';
            this.setStatusMessage();
        }
    }

    checkWin() {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.cells[index].textContent === this.turn;
            });
        });
    }

    isDraw() {
        return [...this.cells].every(cell => cell.textContent);
    }

    setStatusMessage() {
        this.statusDisplay.textContent = `${this.turn}'s turn`;
    }

    clearCells() {
        this.cells.forEach(cell => {
            cell.textContent = '';
        });
    }

    changeBackgroundToGreen() {
        document.body.style.backgroundColor = "#90ee90";
    }

    endGame() {
        this.cells.forEach(cell => cell.removeEventListener('click', this.handleCellClick));
        setTimeout(() => {
            this.changeBackgroundToGreen();
            this.clearCells();
        }, 500);
    }

    restartGame() {
        this.turn = 'X';
        this.initializeGame();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const statusDisplay = document.getElementById('statusDisplay');
    const restartButton = document.getElementById('restartButton');
    new TicTacToe(cells, statusDisplay, restartButton);
});
