class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = {x:0 , y:0}}) {
        this.position =  position
        this.width = 50
        this.height = 150
        this.image =  new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElasped = 0
        this.framesHold = 5
        this.offset = offset

    }

    draw(){
        ctx.drawImage(
            this.image, 
            //cropping the shop png to 1 shop 
            this.framesCurrent * (this.image.width /this.framesMax),
            0,
            this.image.width /this.framesMax,
            this.image.height,

            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width /this.framesMax)* this.scale, 
            this.image.height * this.scale)
    }

    animateFrames(){
        this.framesElasped++

        if(this.framesElasped % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax -1){
            this.framesCurrent++
        }
        else{
            this.framesCurrent = 0
            }
        }
    }

    //to implement game motion , mechanics and changes 
    update(){
        this.draw() //referencing to above fn
        this.animateFrames()
    }
}


class Fighter extends Sprite{
    constructor({position, velocity, color = 'red' , imageSrc, scale = 1, framesMax = 1 ,offset = {x:0 , y:0} , sprites, attackBox = {
        offset: {}, width: undefined, height: undefined
    }}) {

        super({
            position,
            imageSrc,
            framesMax,
            offset
        })

        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            //following the players position
            position: {
                x: this.position.x,
                y: this.position.y
            },

            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        },

        this.color = color
        this.isAttacking
        this.health = 150
        this.scale = scale
        this.framesCurrent = 0
        this.framesElasped = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    
    //to implement game motion , mechanics and changes 
    update(){
        this.draw() //referencing to above fn
        if(!this.dead) //not dead then continue animating
        this.animateFrames()

        //Attack Boxes ; Sword Swing
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        //draw the attack box
        // ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        //to stop player from escaping the bottom end ; gravity function
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 96){
            this.velocity.y = 0
            this.position.y = 330
        }
        else{
            this.velocity.y += gravity
        }
    }

    attack(){
        this.switchSprite('attack1')
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 1000);
    }

    takeHit(){
        
        this.health -= 20

        if(this.health <= 0){
            this.switchSprite('death')
        }else{
            this.switchSprite('takeHit')
        }
    }

    switchSprite(sprite){
        if(this.image === this.sprites.death.image) {   
            if(this.framesCurrent === this.sprites.death.framesMax -1) 
            this.dead = true
            return
        }
        //overwriting all the other attacks with the attack animation
        if(this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax -1)
         return 

        //override when fighter gets hit
        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax -1)
         return 

        switch(sprite){
            case 'idle':
                if(this.image !== this.sprites.idle.image){
                this.image = this.sprites.idle.image
                this.framesMax = this.sprites.idle.framesMax
                this.framesCurrent = 0
                }
                break
            
            case 'run':
                if(this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image
                this.framesMax = this.sprites.run.framesMax
                this.framesCurrent = 0
                }
                break

            case 'jump':
                if(this.image !== this.sprites.jump.image){
                this.image = this.sprites.jump.image
                this.framesMax = this.sprites.jump.framesMax
                this.framesCurrent = 0
                }
                break


            case 'fall':
                if(this.image !== this.sprites.fall.image){
                this.image = this.sprites.fall.image
                this.framesMax = this.sprites.fall.framesMax
                this.framesCurrent = 0
                }
                break

            case 'attack1':
                if(this.image !== this.sprites.attack1.image){
                this.image = this.sprites.attack1.image
                this.framesMax = this.sprites.attack1.framesMax
                this.framesCurrent = 0
                }
                break
            
            case 'takeHit':
                if(this.image !== this.sprites.takeHit.image){
                this.image = this.sprites.takeHit.image
                this.framesMax = this.sprites.takeHit.framesMax
                this.framesCurrent = 0
                }
                break

            case 'death':
                if(this.image !== this.sprites.death.image){
                this.image = this.sprites.death.image
                this.framesMax = this.sprites.death.framesMax
                this.framesCurrent = 0
                }
                break
        }
    }
}