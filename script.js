console.log('Test')

let music = new Audio('music.mp3');
let tapSound = new Audio('tapSound.mp3');
let gameOverSound = new Audio('gameOver.mp3');

let turn = 'X';
let gameOver = false;

// Function to change turn...
const changeTurn = () => {
    return turn === 'X' ? 'O' : 'X';
}


// Function to check for winner
const checkWin = () => {
    let boxText = document.getElementsByClassName('boxText');
    let wins;

    const mediaFire = window.matchMedia("(max-width: 425px)");
    if (mediaFire.matches) {
        wins = [
            [0, 1, 2, 0, 9, 0],
            [3, 4, 5, 0, 29, 0],
            [6, 7, 8, 0, 49, 0],
            [0, 3, 6, -20, 30, 90],
            [1, 4, 7, 0, 30, 90],
            [2, 5, 8, 20, 30, 90],
            [0, 4, 8, 0, 30, 45],
            [2, 4, 6, 0, 30, 135]
        ]
    }
    else {
        wins = [
            [0, 1, 2, 0, 5, 0],
            [3, 4, 5, 0, 15, 0],
            [6, 7, 8, 0, 25, 0],
            [0, 3, 6, -10, 15, 90],
            [1, 4, 7, 0, 15, 90],
            [2, 5, 8, 10, 15, 90],
            [0, 4, 8, 0, 15, 45],
            [2, 4, 6, 0, 15, 135]
        ]
    }
    wins.forEach(e => {
        if ((boxText[e[0]].innerText === boxText[e[1]].innerText) && (boxText[e[1]].innerText === boxText[e[2]].innerText) && (boxText[e[0]].innerText !== "")) {
            gameOver = true;
            document.querySelector('.info').innerText = boxText[e[0]].innerText + ' Won!!';
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '20vw';
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            if (mediaFire.matches) {
                document.querySelector('.line').style.width = "60vw";
            }
            else {
                document.querySelector('.line').style.width = "30vw";
            }
        }
    })
}

// Game logic
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxText = element.querySelector('.boxText');
    element.addEventListener('click', () => {
        if (boxText.innerText === '') {
            boxText.innerText = turn;
            tapSound.play();
            turn = changeTurn();
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = 'Turn for ' + turn;
            }
        }
    })
})

// Logic to play background music
let playMusic = document.getElementsByClassName('fa-solid');
Array.from(playMusic).forEach(element => {
    element.addEventListener('click', () => {
        if (element.classList.contains("fa-volume-xmark")) {
            music.play();
            element.classList.remove("fa-volume-xmark");
            element.classList.add("fa-volume-high");
        }
        else {
            music.pause();
            element.classList.add("fa-volume-xmark");
            element.classList.remove("fa-volume-high");
        }
        // music.play();
    });
});

// Add onClick listener to reset button
reset.addEventListener('click', () => {
    let boxText = document.querySelectorAll('.boxText');
    Array.from(boxText).forEach(element => {
        element.innerText = "";
    });
    gameOver = false;
    turn = "X";
    document.getElementsByClassName("info")[0].innerText = 'Turn for ' + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = '0vw';
    document.querySelector('.line').style.width = "0vw";
});