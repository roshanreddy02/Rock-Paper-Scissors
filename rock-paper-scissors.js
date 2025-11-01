let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
};    

updateScoreElement();

let intervalId;
let isAutoPlaying=false;

function autoPlay(){
    if(!isAutoPlaying){
        intervalId= setInterval(() => {
            const playerMove=pickComputerMove();
            playGame(playerMove);
        },1000);
        isAutoPlaying=true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying=false;
    }
}
function pickComputerMove(){
    const randomNumber=Math.random();

    let computerMove= '';

    if(randomNumber >=0 && randomNumber<1/3){
        computerMove='Rock';
    } else if(randomNumber >=1/3 && randomNumber<2/3){
        computerMove='Paper';
    } else{
        computerMove='Scissors';
    }

    return computerMove;
}

function playGame(playerMove){

    const computerMove=pickComputerMove();

    let result='';

    if(playerMove === 'Scissors'){
        if(computerMove==='Rock'){
        result='You Lose';
        }
        else if(computerMove==='Scissors'){
            result='Tie';
        }
        else if(computerMove==='Paper'){
            result='You Win';
        }
    }
    else if(playerMove === 'Paper'){
        if(computerMove==='Rock'){
            result='You Win';
        }
        else if(computerMove==='Scissors'){
            result='You Lose';
        }
        else if(computerMove==='Paper'){
            result='Tie';
        }
    }
    else if(playerMove === 'Rock'){
        if(computerMove==='Rock'){
            result='Tie';
        }
        else if(computerMove==='Scissors'){
            result='You Win';
        }
        else if(computerMove==='Paper'){
            result='You Lose';
        }
    }

    if (result === 'You Win') {
        score.wins += 1;
    }
    else if(result === 'You Lose'){
        score.losses += 1;
    }
    else if(result=== 'Tie'){
        score.ties += 1;
    }

    localStorage.setItem('score',JSON.stringify(score));
    
    updateScoreElement();

    document.querySelector('.js-result').
        innerHTML = result;

    document.querySelector('.js-moves').
        innerHTML = `You
            <img src="${playerMove}-emoji.png" class="move-icon">
            <img src="${computerMove}-emoji.png" class="move-icon">
            Computer`;
        
    // alert(`You picked ${playerMove},Computer picked ${computerMove}.${result}
    // Wins: ${score.wins}, Losses: ${score.losses},Ties ${score.ties}`);
}

function updateScoreElement(){
    document.querySelector('.js-score')
    .innerHTML=`Wins: ${score.wins}, Losses: ${score.losses},Ties ${score.ties}`;
}