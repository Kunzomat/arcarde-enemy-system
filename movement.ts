namespace enemies {

    //% block="movement $entrytype for $entryDuration $active for $activeDuration and $exit"
    //% blockSetVariable=myMovement
    //% img.shadow=screen_image_picker
    //% inlineInputMode=inline
    export function createMovementPattern(
        entrytype: MovementType,
        active: MovementType,
        exit: MovementType,
        entryDuration: number,
        activeDuration: number
    ): MovementPattern {

        return new MovementPattern(entrytype, active, exit, entryDuration, activeDuration)
    }

    export class MovementPattern {

        entry: MovementType
        active: MovementType
        exit: MovementType

        entryDuration: number
        activeDuration: number

        constructor(
            entry: MovementType,
            active: MovementType,
            exit: MovementType,
            entryDuration: number,
            activeDuration: number
        ) {
            this.entry = entry
            this.active = active
            this.exit = exit
            this.entryDuration = entryDuration
            this.activeDuration = activeDuration
        }
    }

    game.onUpdate(function () {

        for (let e of allEnemies) {
            e.update()
        }
    })
}
