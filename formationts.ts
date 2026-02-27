namespace enemies {
    export class Formation {

        img: Image
        type: EnemyType
        formationType: FormationType
        count: number
        spacing: number
        x: number
        y: number

        movement: MovementPattern
        projectile: ProjectileDefinition

        constructor(
            img: Image,
            type: EnemyType,
            formationType: FormationType,
            count: number,
            spacing: number,
            x: number,
            y: number
        ) {
            this.img = img
            this.type = type
            this.formationType = formationType
            this.count = count
            this.spacing = spacing
            this.x = x
            this.y = y
        }

        spawn() {

            let center = (this.count - 1) / 2

            for (let i = 0; i < this.count; i++) {

                let offsetX = 0
                let offsetY = 0

                let relative = i - center

                switch (this.formationType) {

                    case FormationType.Line:
                        offsetX = relative * this.spacing
                        break

                    case FormationType.VShape:
                        offsetX = relative * this.spacing
                        offsetY = Math.abs(relative) * 8
                        break

                    case FormationType.Arc:
                        offsetX = relative * this.spacing
                        offsetY = Math.sin(relative / center * Math.PI) * 20
                        break
                }

                let e = new Enemy(
                    this.img,
                    this.type,
                    this.x + offsetX,
                    this.y + offsetY
                )

                if (this.movement)
                    e.setMovement(this.movement)

                if (this.projectile)
                    e.setProjectileDefinition(this.projectile)
            }
        }
    }
}