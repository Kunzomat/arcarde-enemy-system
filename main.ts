let Andreas = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . . 1 1 . . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . 1 d 1 1 d 1 . . . . . 
    . . . . 1 d d 8 8 d d 1 . . . . 
    . . . 1 1 d 8 8 8 8 d 1 1 . . . 
    . . 1 d 1 d 8 8 8 8 d 1 d 1 . . 
    . 1 d d 1 d 8 8 8 8 d 1 d d 1 . 
    1 d d d 1 d 1 d d 1 d 1 d d d 1 
    1 d d d 1 d 1 d d 1 d 1 d d d 1 
    1 d d d 1 1 1 1 1 1 1 1 d d d 1 
    1 d d d 1 1 . 1 1 . 1 1 d d d 1 
    1 1 1 1 1 . 5 2 2 5 . 1 1 d d 1 
    . 1 1 . . . 5 2 2 5 . . . 1 1 . 
    . . . . . . . 5 5 . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Andreas)
Andreas.setStayInScreen(true)
Andreas.setPosition(80, 120)
let myMovement = enemies.createMovementPattern(enemies.MovementType.Straight, enemies.MovementType.ZigZag, enemies.MovementType.SweepRight, 10, 10)
let Fighter = enemies.createEnemy(img`
    . . . . . . . 5 5 . . . . . . . 
    . b b . . . 5 2 2 5 . . . b b . 
    b c c b b . 5 2 2 5 . b b b b b 
    b c c c b b . b b . b b c c c b 
    b c c c b b b b b b b b c c c b 
    b c c c b c b c c b c b c c c b 
    b c c c b c b c c b c b c c c b 
    . b c c b c 8 8 8 8 c b c c b . 
    . . b c b c 8 8 8 8 c b c b . . 
    . . . b b c 8 8 8 8 c b b . . . 
    . . . . b c c 8 8 c c b . . . . 
    . . . . . b c b b c b . . . . . 
    . . . . . . b b b b . . . . . . 
    . . . . . . . b b . . . . . . . 
    . . . . . . . b b . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, enemies.EnemyType.Fighter, 80, 0)
