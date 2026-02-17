namespace SpriteKind {
    export const GameEnemy = SpriteKind.create()
}

//% color=#8B0000 icon="\uf6e2" block="Enemies"
namespace enemies {

    export enum EnemyType {
        //% block="fighter"
        Fighter = 0,
        //% block="bomber"
        Bomber = 1,
        //% block="kamikaze"
        Kamikaze = 2
    }

    export enum FormationType {
        //% block="line"
        Line = 0,

        //% block="v shape"
        VShape = 1,

        //% block="wide arc"
        Arc = 2
    }

    export enum MovementType {
        //% block="straight"
        Straight = 0,

        //% block="zigzag"
        ZigZag = 1,

        //% block="follow player"
        Follow = 3,

        //% block="dive"
        Dive = 4,

        //% block="sweep right"
        SweepRight = 5,

        //% block="sweep left"
        SweepLeft = 6,

        //% block="stop"
        Stop = 8,

        //% block="bounce"
        Bounce = 10
    }

    export class Enemy {

        sprite: Sprite
        type: EnemyType
        movement: MovementType

        private baseX: number = 0
        private time: number = 0

        constructor(img: Image, type: EnemyType, x: number, y: number) {

            this.sprite = sprites.create(img, SpriteKind.GameEnemy)
            this.sprite.setPosition(x, y)

            this.type = type
            this.movement = MovementType.Straight

            this.baseX = x

            allEnemies.push(this)
        }

        setMovement(m: MovementType) {
            this.movement = m
        }

        update() {

            this.time += 1

            switch (this.movement) {

                case MovementType.Straight:
                    this.sprite.vx = 0
                    this.sprite.vy = 30
                    break

                case MovementType.ZigZag:
                    this.sprite.x = this.baseX + Math.sin(this.time / 15) * 50
                    break

                case MovementType.Follow:
                    let player = sprites.allOfKind(SpriteKind.Player)[0]
                    if (player) {
                        this.sprite.follow(player, 40)
                    }
                    break

                case MovementType.Dive:
                    this.sprite.vx = 0
                    this.sprite.ay = 100
                    break

                case MovementType.SweepRight:
                    this.sprite.vx = 40
                    this.sprite.vy = 20
                    break

                case MovementType.SweepLeft:
                    this.sprite.vx = -40
                    this.sprite.vy = 20
                    break

                case MovementType.Stop:
                    if (this.sprite.y < 40) {
                        this.sprite.vy = 30
                    } else {
                        this.sprite.vy = 0
                        this.sprite.vx = 0
                    }
                    break

                case MovementType.Bounce:

                    if (this.sprite.vx == 0) {
                        this.sprite.vx = 40
                        this.sprite.vy = 20
                    }

                    if (this.sprite.left < 0 || this.sprite.right > scene.screenWidth()) {
                        this.sprite.vx *= -1
                    }
                    break
            }
        }

    }

    // Zentrale Enemy-Liste
    export let allEnemies: Enemy[] = []

    //% block="enemy sprite $img of type $type at x $x y $y"
    //% blockSetVariable=myEnemy
    //% img.shadow=screen_image_picker
    //% inlineInputMode=inline
    export function createEnemy(
        img: Image,
        type: EnemyType,
        x: number,
        y: number
    ): Enemy {

        return new Enemy(img, type, x, y)
    }

    //% block="set $enemy movement to $movement"
    export function setEnemyMovement(
        enemy: Enemy,
        movement: MovementType
    ) {
        enemy.setMovement(movement)
    }    

    //% block="enemy formation $img type $type formation $formation count $count spacing $spacing at x $x y $y"
    //% blockSetVariable=myEnemyFormation
    //% img.shadow=screen_image_picker
    //% inlineInputMode=inline
    export function createFormation(
        img: Image,
        type: EnemyType,
        formation: FormationType,
        count: number,
        spacing: number,
        x: number,
        y: number
    ): Enemy[] {

        let created: Enemy[] = []

        // Mittelpunkt-Index
        let center = (count - 1) / 2

        for (let i = 0; i < count; i++) {

            let offsetX = 0
            let offsetY = 0

            let relative = i - center

            switch (formation) {

                case FormationType.Line:
                    offsetX = relative * spacing
                    break

                case FormationType.VShape:
                    offsetX = relative * spacing
                    offsetY = Math.abs(relative) * 8
                    break

                case FormationType.Arc:
                    offsetX = relative * spacing
                    offsetY = Math.sin(relative / center * Math.PI) * 20
                    break
            }

            let e = new Enemy(
                img,
                type,
                x + offsetX,
                y + offsetY
            )

            created.push(e)
        }

        return created
    }

}
