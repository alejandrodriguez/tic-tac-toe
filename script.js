const gameBoard = (function() {

    const spaces = Array.from(document.querySelectorAll('.space'));
    let gameBoardState = [null, null, null, null, null, null, null, null, null];

    function changeGameBoardState(e) {
        let space = e.target.getAttribute('data-space');
        if(!gameBoardState[space]) {
            switch(displayController.readWhosTurn()) {
                case 'X':
                    gameBoardState[space] = 'X';
                    break;
                case 'O':
                    gameBoardState[space] = 'O';
                    break;
            }
            spaces[space].textContent = gameBoardState[space];
        }
    }

    for (let i = 0; i < spaces.length; i++) {
        spaces[i].addEventListener('click', changeGameBoardState);
    }

    const readGameBoardState = () => gameBoardState;

    function resetGameBoard() {
        gameBoardState = [null, null, null, null, null, null, null, null, null];
        for (let i = 0; i < spaces.length; i++) {
            spaces[i].textContent = '';
        }
    }

    return {
        readGameBoardState,
        resetGameBoard
    }

})()

const displayController = (function() {

    const startBtn = document.querySelector('.startbtn');
    const playersModal = document.querySelector('#playersmodal')
    const nameInputs = document.querySelectorAll('input');
    const spaces = Array.from(document.querySelectorAll('.space'));
    const restartBtn = document.querySelector('.restartbtn');
    const resetBtn = document.querySelector('.resetbtn');
    const winnerModal = document.querySelector('#winnermodal');
    const winnerModalContent = document.querySelector('#winnermodalcontent');
    let whosTurn = 'X'

    function changeTurn() {
        switch(whosTurn) {
            case 'X':
                whosTurn = 'O';
                break;
            case 'O':
                whosTurn = 'X';
                break;
        }
    }

    let readWhosTurn = () => whosTurn;

    function checkForWinner() {

        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        
    function declareWinner(winner) {
        if(winner === 'tie') {
            winnerModalContent.firstChild.textContent = 'It\'s a tie!'
        } else if(winnerIsX) {
            winnerModalContent.firstChild.textContent = `${player1.readName()} wins!`
        } else if(winnerIsO) {
            winnerModalContent.firstChild.textContent = `${player2.readName()} wins!`
        }
        winnerModal.style.display = 'block';
        winnerIsX = false;
        winnerIsO = false;
    }
    
        let winnerIsX = winningCombos.some(combo => {
            return combo.every(space => {
                return gameBoard.readGameBoardState()[space] === 'X'
            })
        })

        let winnerIsO = winningCombos.some(combo => {
            return combo.every(space => {
                return gameBoard.readGameBoardState()[space] === 'O'
            })
        })

        if (winnerIsX || winnerIsO) {
            let winner = winnerIsX ? 'X' : 'O';
            declareWinner(winner);
        }

        if (gameBoard.readGameBoardState().every((index) => typeof index === 'string')){
            declareWinner('tie');
        }
    }

    function startGame() {
        playersModal.style.display = 'none';
    }

    function restartGame() {
        winnerModal.style.display = 'none';
        winnerModalContent.firstChild.textContent = '';
        gameBoard.resetGameBoard();
        whosTurn = 'X';
    }

    function resetGame() {
        gameBoard.resetGameBoard();
        whosTurn = 'X';
        for (let i = 0; i < nameInputs.length; i++) {
            nameInputs[i].value = '';
        }
        playersModal.style.display = 'block';
    }

    for (let i = 0; i < spaces.length; i++) {
        spaces[i].addEventListener('click', changeTurn);
        spaces[i].addEventListener('click', checkForWinner);
    }

    restartBtn.addEventListener('click', restartGame);

    resetBtn.addEventListener('click', resetGame);

    startBtn.addEventListener('click', startGame);

    return {
        readWhosTurn
    }

})()

const createPlayer = function (name, playerNumber) {
    const nameInput = document.querySelector(`#name${playerNumber}`)
    const startBtn = document.querySelector('.startbtn');
    const changeName = () => {
        if(nameInput.value) {
            name = nameInput.value;
        }
    }
    startBtn.addEventListener('click', changeName);
    const readName = () => name;
    return {
        readName,
        changeName
    }
}

const player1 = createPlayer('X', 1)

const player2 = createPlayer('O', 2);