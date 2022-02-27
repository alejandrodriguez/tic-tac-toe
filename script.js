const gameBoard = (function() {

    const spaces = Array.from(document.querySelectorAll('.space'));
    let gameBoardState = []

    function changeGameBoardState(e) {
        let space = e.target.getAttribute('data-space');
        if(!gameBoardState[space]) {
            switch(displayController.whosTurn) {
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

    return {
        gameBoardState
    }

})()

const displayController = (function() {

    const spaces = Array.from(document.querySelectorAll('.space'));
    const restartBtn = document.querySelector('.restartbtn');
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    let whosTurn = 'X' //Change to allow Player Selection

    function changeTurn() {
        switch(displayController.whosTurn) {
            case 'X':
                displayController.whosTurn = 'O';
                break;
            case 'O':
                displayController.whosTurn = 'X';
                break;
        }
    }

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

        modalContent.firstChild.textContent = `${winner} wins!`
        modal.style.display = 'block';

    }
    
        let winnerIsX = winningCombos.some(combo => {
            return combo.every(space => {
                return gameBoard.gameBoardState[space] === 'X'
            })
        })

        let winnerIsO = winningCombos.some(combo => {
            return combo.every(space => {
                return gameBoard.gameBoardState[space] === 'O'
            })
        })

        if (winnerIsX || winnerIsO) {
            let winner = winnerIsX ? 'X' : 'O';
            declareWinner(winner);
        }

    }

    function restartGame () {
        modal.style.display = 'none';
        modalContent.firstChild.textContent = '';
        gameBoard.gameBoardState = [];
        for (let i = 0; i < spaces.length; i++) {
            spaces[i].textContent = '';
        }
    }

    for (let i = 0; i < spaces.length; i++) {
        spaces[i].addEventListener('click', changeTurn);
        spaces[i].addEventListener('click', checkForWinner);
    }

    restartBtn.addEventListener('click', restartGame)

    return {
        whosTurn
    }

})()

/* Current bug likely stems from local variables in factory functions != obj properties declared from those variables.
    Research factory function syntax to see how to set object properties that also change local variables of the same name. */