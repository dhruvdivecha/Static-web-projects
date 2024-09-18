let choices =document.querySelectorAll(".choice");
let userscorepara = document.querySelector("#user-score");
let compscorepara = document.querySelector("#comp-score");
let msg = document.querySelector("#msg");
let resetBtn = document.querySelector("#reset")

userscore = 0;
compscore = 0;

const gencompchoice = () => {
    const opts = ["rock", "paper", "scissors"];
    const random = Math.floor(Math.random() * 3);
    return opts[random];
};

const checkWinner = (userwin,userchoice,compchoice) => {
    if (userwin){
        msg.innerText = `USER WON! ${userchoice} beats ${compchoice}` ;
        msg.style.backgroundColor = "green";
        userscore++;
        userscorepara.innerText = userscore;

    }else{
        msg.innerText = `COMP WON! ${compchoice} beats ${userchoice}`;
        msg.style.backgroundColor = "red";
        compscore++;
        compscorepara.innerText = compscore;
    }
};



resetBtn.addEventListener("click", () =>{
        userscore = 0;
        userscorepara.innerText = userscore;
        compscore = 0;
        compscorepara.innerText = compscore;
});

const game = (userchoice) => {
    const compchoice = gencompchoice();
    console.log("user choice is", userchoice);
    console.log("comp choice is", compchoice);
    
    if (userchoice === compchoice) {
        msg.innerText = "DRAW!"
        msg.style.backgroundColor = "#5C80BC"
    } else{
        let userwin = true;
        if (userchoice === "rock"){
            userwin = compchoice === "paper" ? false : true;
            
        } else if (userchoice === "paper"){
            userwin = compchoice === "rock" ? true : false;
            
        }else {
            userwin = compchoice === "rock" ? false : true;
            
        }
        checkWinner(userwin,userchoice,compchoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userchoice = choice.getAttribute("id");
        game(userchoice);
    }) 
});

