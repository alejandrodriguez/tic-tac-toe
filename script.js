const gameBoard = (function() {
    const spaces = Array.from(document.querySelectorAll('.space'));
    let gameBoardState = [] //Change to player input later

    function changeGameBoardState(e) {
        let space = e.target.getAttribute('data-space');
        if(gameBoardState[space] === undefined) {
            gameBoardState[space] = 'X'
            console.log(gameBoardState[0])
            spaces[space].textContent = gameBoardState[space];
        }
    }

    spaces[0].addEventListener('click', changeGameBoardState)
    spaces[1].addEventListener('click', changeGameBoardState)
    spaces[2].addEventListener('click', changeGameBoardState)
    spaces[3].addEventListener('click', changeGameBoardState)
    spaces[4].addEventListener('click', changeGameBoardState)
    spaces[5].addEventListener('click', changeGameBoardState)
    spaces[6].addEventListener('click', changeGameBoardState)
    spaces[7].addEventListener('click', changeGameBoardState)
    spaces[8].addEventListener('click', changeGameBoardState)
})()