    function rectangularCollision({rectangle1 , rectangle2}
    ){
        return (
            rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.attackBox.width && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
        )
    }
    
    function determineWinner({player , enemy , timerId}){
        document.querySelector('#displayText').style.display = 'flex'
    
        clearTimeout(timerId)
        if(player.health === enemy.health){
            document.querySelector('#displayText').innerHTML = 'Tie'
        }
    
        else if(player.health > enemy.health){
            document.querySelector('#displayText').innerHTML = 'Kenny Wins'
        }
    
        else if(player.health < enemy.health){
            document.querySelector('#displayText').innerHTML = 'Mat-Dork Wins'
        }
    }
    
    let timer = 60
    let timerId 
    function decreaseTimer(){
        //decreasing time
        if(timer > 0){
            timerId = setTimeout(decreaseTimer, 1000)
            timer--
            document.querySelector('#timer').innerHTML = timer
        }
    
        //determining the winner
        if(timer === 0){
            determineWinner({player , enemy, timerId})
        }
    }