let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let Msg = document.querySelector("#msg");
let Container = document.querySelector(".Wincontainer");
let newGame = document.querySelector("#NewGame");

let turnX = true;
let count = 0;

const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetBtn = () => {
    turnX = true;
    count = 0;
    enableBoxes();
    Container.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnX){
            box.innerText = "X";
            turnX = false;
        } else {
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        
        if (count === 9 && !isWinner){
            drawGame();
        }
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    Msg.innerText = `Congratulations, Winner is ${winner}`;
    Container.classList.remove("hide");
    disableBoxes();
};

const drawGame = () => {
    Msg.innerText = "DRAW";
    Container.classList.remove("hide");
    
}

const checkWinner = () => {
    for (pattern of winningPattern){
        let position1 = boxes[pattern[0]].innerText;
        let position2 = boxes[pattern[1]].innerText;
        let position3 = boxes[pattern[2]].innerText;

        if (position1 != "" && position2 != "" && position3 != ""){
            if(position1 === position2 && position2 === position3) {
                showWinner(position1);
                return true;
            }
            
        }
    }
    return false;
};

reset.addEventListener("click", resetBtn)
newGame.addEventListener("click", resetBtn)