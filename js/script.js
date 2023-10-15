const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
    x: 0, 
    y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },

    offset: {
        x: 0,
        y: 0
    },

    imageSrc: './img/samuraiMack/Idle.png',
    scale: 2.75,
    framesMax: 8,
    offset: {
        x: 45,
        y: 180   //157
    },

    sprites: {
        idle: {
        imageSrc: './img/samuraiMack/Idle.png',
        framesMax: 8
        },
        run:{
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },

        jump:{
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        },

        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2
        },

        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6
        },

        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },

        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6
        }
    
    },

    attackBox: {
        offset:{
            x: 210,
            y: 50
        },

        width: 150,
        height: 50
    },

})


const enemy = new Fighter({
    position: {
    x: 800,
    y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },

    offset: {
        x: -50,
        y: 0
    },

    imageSrc: './img/kenji/Idle.png',
    scale: 2.75,
    framesMax: 4,
    offset: {
        x: 215,
        y: 195   
    },

    sprites: {
        idle: {
        imageSrc: './img/kenji/Idle.png',
        framesMax: 4
        },
        run:{
            imageSrc: './img/kenji/Run.png',
            framesMax: 8
        },

        jump:{
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2
        },

        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2
        },

        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4
        },

        takeHit: {
            imageSrc: './img/kenji/Take hit.png',
            framesMax: 3
        },

        death: {
            imageSrc: './img/kenji/Death.png',
            framesMax: 7
        }
    },

    attackBox: {
        offset:{
            x: -200,
            y: 50
        },

        width: 150,
        height: 50
    }
})

console.log(player)

const keys = {
    a: {
        pressed : false
    },

    d: {
        pressed : false
    },

    w: {
        pressed : false
    },

    ArrowRight: {
        pressed : false 
    },

    ArrowLeft: {
        pressed : false
    },

    ArrowUp: {
        pressed : false
    }
}

decreaseTimer()

function animate(){
    //calling a function within a fn to get an infinite loop for infinte frame (high fps) to animate ; static image -- motion pictures
    window.requestAnimationFrame(animate)
    //fillRect is use to create a new frame each time this fn is called ; so each time player and enemy will also be called thus creating a continuous motion
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update() 
    //update is calling draw()
    enemy.update()

    //Player Movement
    //player.v.x makes it's velo 0 and then keys pressed event makes it 1 within one iteration of this thus altering it's position.x ; giving the sense of motion
    player.velocity.x = 0

   
    if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
        player.switchSprite('run')
    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    }
    else{
        player.switchSprite('idle')
    }

    //player jumping
    if(player.velocity.y < 0){
        player.switchSprite('jump')
    }
    else if(player.velocity.y > 0){
        player.switchSprite('fall')
    }

    //Enemy Movement
    enemy.velocity.x = 0
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.switchSprite('run')
        enemy.velocity.x = -5
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.switchSprite('run')
        enemy.velocity.x = 5
    }
    else{
        enemy.switchSprite('idle')
    }

    //enemy jumping
    if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    }
    else if(enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }

    //where enemy gets hit
    //detect collision
    if(rectangularCollision({ rectangle1: player, rectangle2: enemy}) && player.isAttacking && player.framesCurrent === 4){
        enemy.takeHit()
        player.isAttacking = false
        
        gsap.to('#enemyHealth' , {
            width: enemy.health + '%',
        })
    }

    //IF player misses
    if(player.isAttacking  && player.framesCurrent === 4){
        player.isAttacking = false
    }

    //this is where player gets hit

    if(rectangularCollision({ rectangle1: enemy, rectangle2: player}) && enemy.isAttacking && enemy.framesCurrent === 2){
        player.takeHit()
        enemy.isAttacking = false

        gsap.to('#playerHealth' , {
            width: player.health + '%',
        })
    }

    //IF enemy misses
    if(enemy.isAttacking  && enemy.framesCurrent === 2){
        enemy.isAttacking = false
    }

    //end game based on no health remaining
    if(enemy.health <= 0 || player.health <=0){
        determineWinner({player , enemy, timerId})
    }
}



animate()

//keydown : whenever any key is pressed
window.addEventListener('keydown', (event) =>{
    //console.log(event) to get all the keydown event properties

    if(!player.dead){
        switch(event.key){
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break

            case 'w':
                player.velocity.y = -20
                break

            case ' ':
                //spacebar for attack
                player.attack()
                break
            }
        }

        if(!enemy.dead){
        switch(event.key){
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break

            case 'ArrowUp':
                enemy.velocity.y = -20
                break
            
            case 'ArrowDown':
                enemy.attack()
                break
        }
    }    
})

//keyUp : when user lift the finger after pressing the keyboard(key down)
window.addEventListener('keyup', (event) =>{
    //as soon as the keydown event is fired , keyup will follow making the computer realise that the user has stop giving input ; update: we have used obj to store keys(a,d,..) and then used if-else in animate to change keys pressed
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break
        
    }    

    //enemy keys
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break

        
    }    
})