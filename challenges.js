var scores, roundScore, activePlayer, gamePlaying, lastDice1, lastDice2, winningScore;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {   
    if(gamePlaying)
        {
            //1. Random number
            var dice1 = Math.floor(Math.random() * 6)+1;
            var dice2 = Math.floor(Math.random() * 6)+1;
            
            //2. Display result 
            //Die 1
            var diceDOM1 = document.querySelector('.dice1');
            diceDOM1.style.display = 'block';
            diceDOM1.src = 'dice-' + dice1 + '.png';
            
            //Die 2
            var diceDOM2 = document.querySelector('.dice2');
            diceDOM2.style.display = 'block';
            diceDOM2.src = 'dice-' + dice2 + '.png';
              
            //3. Update round score IF the roll number is NOT 1
            if(dice1 === 6 && lastDice1 === 6 || dice2 === 6 && lastDice2 === 6)
                {                   
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = 0;
                    nextPlayer();
                }
            else if (dice1 == 1 || dice2 == 1) 
                {
                     //Next player
                     nextPlayer();      
                }
            else
                {
                    //Add score
                    roundScore += dice1+dice2;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;   //querySelector is used for DOM manipulation to change values and elements of webpage.           
                }
            
            lastDice1 = dice1;
            lastDice2 = dice2;
        }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if(gamePlaying)
        {
            // Add current score to global score
            scores[activePlayer] += roundScore;
    
            //update UI
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
            var input = document.querySelector('.finalscore').value;
            
            if(input) {
                winningScore = input;
            }
            else {
                winningScore = 100;
            }
    
            //Check winner of game
            if(scores[activePlayer] >= winningScore)
                {
                    document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
                    
                    document.querySelector('.dice1').style.display = 'none';
                    document.querySelector('.dice2').style.display = 'none';
                    
                    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                    gamePlaying = false;
                }
            else
                {
                    //Next player
                    nextPlayer();
                }  
        }
    
});

function nextPlayer()
{
    //Next player
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;
            
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';
            
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
            
            //document.querySelector('.player-0-panel').classList.remove('active');
           // document.querySelector('.player-1-panel').classList.add('active');
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init()
{
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
              
}