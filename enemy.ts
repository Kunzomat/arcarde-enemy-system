namespace SpriteKind {
    export const GameEnemy = SpriteKind.create()
}

//% color=#8B0000 icon="\uf188" block="Enemies"
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
        movement: MovementPattern
        definition: ProjectileDefinition

        private hasFired: boolean = false
        private baseX: number = 0
        private time: number = 0
        private phase: number = 0
        private phaseTime: number = 0

        constructor(img: Image, type: EnemyType, x: number, y: number) {

            this.sprite = sprites.create(img, SpriteKind.GameEnemy)
            this.sprite.setPosition(x, y)

            this.type = type
            this.movement = new MovementPattern(enemies.MovementType.Straight, enemies.MovementType.Straight, enemies.MovementType.Straight, 30, 60)

            this.baseX = x

            allEnemies.push(this)
        }

        setMovement(m: MovementPattern) {
            this.movement = m
            this.phase = 0
            this.phaseTime = 0
        }

        setProjectileDefinition(d: ProjectileDefinition) {
            this.definition = d
        }

        update() {

            this.time++
            this.phaseTime++

            // Phase wechseln
            if (this.phase == 0 && this.phaseTime > this.movement.entryDuration) {
                this.phase = 1
                this.phaseTime = 0
            }

            if (this.phase == 1 && this.phaseTime > this.movement.activeDuration) {
                this.phase = 2
                this.phaseTime = 0
            }

            // Aktuellen MovementType bestimmen
            let currentMovement: MovementType

            if (this.phase == 0) {
                currentMovement = this.movement.entry
            } else if (this.phase == 1) {
                currentMovement = this.movement.active
            } else {
                currentMovement = this.movement.exit
            }

            this.applyMovement(currentMovement)

            // Feuerlogik
            if (!this.hasFired && this.definition.fireAfterFrames >= 0) {
                if (this.time >= this.definition.fireAfterFrames) {
                    this.spawnProjectile()
                    this.hasFired = true
                }
            }
        }

        private spawnProjectile() {

            if (!this.definition) return
            new Projectile(
                this.sprite.x,
                this.sprite.bottom,
                this.definition
            )
        }

        private applyMovement(m: MovementType) {
            switch (m) {
                case MovementType.Straight:
                    this.sprite.vx = 0
                    this.sprite.vy = 30
                    this.sprite.ay = 0
                    break
                case MovementType.ZigZag:
                    this.sprite.vy = 20
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
                    this.sprite.ay = 150
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
                    this.sprite.vx = 0
                    this.sprite.vy = 0
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


    //% block="projectile sprite $img of type $p_type with fire $f_type"
    //% blockSetVariable=myProjectile
    //% img.shadow=screen_image_picker
    //% inlineInputMode=inline
    export function createProjectile(
        img: Image,
        p_type: ProjectileType,
        f_type: FireType

    ): ProjectileDefinition {
        let speed = 10
        let damage = 10
        return new ProjectileDefinition(img, speed, p_type, f_type, damage)
    }

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
        movement: MovementPattern
    ) {
        enemy.setMovement(movement)
    }

    //% block="set $enemy projectile definition to $definition"
    export function setEnemyProjectileDefinition(
        enemy: Enemy,
        definition: ProjectileDefinition
    ) {
        enemy.setProjectileDefinition(definition)
    }

    //% block="set $formation formation movement to $movement"
    export function setEnemyFormationMovement(
        formation: Formation,
        movement: MovementPattern
    ) {
        formation.movement = movement
    }

    //% block="set $formation formation projectile definition to $projectile"
    export function setEnemyFormationProjectile(
        formation: Formation,
        projectile: ProjectileDefinition
    ) {
        formation.projectile = projectile
    }

    //% block="spawn $formation after $seconds seconds"
    export function spawnFormationAfter(
        formation: Formation,
        seconds: number
    ) {
        control.runInParallel(function () {
            pause(seconds * 1000)
            formation.spawn()
        })
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
    ): Formation {

        return new Formation(
            img,
            type,
            formation,
            count,
            spacing,
            x,
            y
        )
    }
}
