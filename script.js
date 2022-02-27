const gameBoard = (function() {

    const spaces = Array.from(document.querySelectorAll('.space'));
    let gameBoardState = []

    function changeGameBoardState(e) {
        let space = e.target.getAttribute('data-space');
        if(gameBoardState[space] === undefined) {
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
            //Declare winner!
        }
    }

    for (let i = 0; i < spaces.length; i++) {
        spaces[i].addEventListener('click', changeTurn);
        spaces[i].addEventListener('click', checkForWinner);
    }

    return {
        whosTurn
    }

})()