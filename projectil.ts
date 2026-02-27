namespace SpriteKind {
    export const GameProjektil = SpriteKind.create()
}

namespace enemies {

    export enum FireType {
        //% block="Single"
        Single = 0,
        //% block="Twin"
        Twin = 1,
        //% block="SpreadNarrow"
        SpreadNarrow = 2,
        //% block="SpreadWide"
        SpreadWide = 3,
        //% block="Side"
        Side = 4,
        //% block="Aimed at player"
        Aimed = 5
    }

    export enum ProjectileType {
        //% block="laser"
        Laser = 0,
        //% block="rocket"
        Rocket = 1,
        //% block="kinetic"
        Kinetic = 2,
    }

    export class ProjectileDefinition {

        image: Image
        speed: number
        p_type: ProjectileType
        f_type: FireType
        damage: number
        lifetime: number
        fireAfterFrames: number

        constructor(
            image: Image,
            speed: number,
            p_type: ProjectileType,
            f_type: FireType,
            damage: number,
            lifetime: number = 200,
            fireAfterFrames: number = 100
        ) {
            this.image = image
            this.speed = speed
            this.p_type = p_type
            this.f_type = f_type
            this.damage = damage
            this.lifetime = lifetime
            this.fireAfterFrames = fireAfterFrames
        }
    }

    export class Projectile {

        projectiles: Sprite[] = []
        definition: ProjectileDefinition
        private time: number = 0

        private spawnSingle(
            x: number,
            y: number,
            def: ProjectileDefinition,
            angleDeg: number
        ) {
            let s = sprites.create(
                def.image,
                SpriteKind.GameProjektil
            )
            s.setPosition(x, y)
            let rad = angleDeg * Math.PI / 180
            let vx = Math.sin(rad) * def.speed
            let vy = Math.cos(rad) * def.speed
            s.setVelocity(vx, vy)

            return s
        }

        constructor(x: number, y: number, def: ProjectileDefinition) {

            switch (this.definition.f_type) {
                case FireType.Single:
                    this.projectiles.push(this.spawnSingle(x, y, def, 0))
                    break
                case FireType.Twin:
                    this.projectiles.push(this.spawnSingle(x - 5, y, def, 0))
                    this.projectiles.push(this.spawnSingle(x + 5, y, def, 0))
                    break
                case FireType.SpreadNarrow:
                    this.projectiles.push(this.spawnSingle(x, y, def, -15))
                    this.projectiles.push(this.spawnSingle(x, y, def, 0))
                    this.projectiles.push(this.spawnSingle(x, y, def, 15))
                    break
                case FireType.SpreadWide:
                    this.projectiles.push(this.spawnSingle(x, y, def, -30))
                    this.projectiles.push(this.spawnSingle(x, y, def, 0))
                    this.projectiles.push(this.spawnSingle(x, y, def, 30))
                    break
                case FireType.Side:
                    this.projectiles.push(this.spawnSingle(x, y, def, -45))
                    this.projectiles.push(this.spawnSingle(x, y, def, 45))
                    break
                case FireType.Aimed:
                    let player = sprites.allOfKind(SpriteKind.Player)[0]
                    if (player) {
                        let dx = player.x - x
                        let dy = player.y - y
                        let angle = Math.atan2(dx, dy) * 180 / Math.PI
                        this.projectiles.push(this.spawnSingle(x, y, def, angle))
                    }
                    break
            }
        }

        update() {
            this.time++
            if (this.time > this.definition.lifetime) {
                for (let p of this.projectiles) {
                    p.destroy()
                }
            }
        }

    }
}