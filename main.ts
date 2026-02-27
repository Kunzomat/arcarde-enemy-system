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
let myEnemyFormation = enemies.createFormation(img`
    . 5 5 5 . . . . . . . . 5 5 5 . 
    5 4 4 4 5 . . b b . . 5 4 4 4 5 
    5 4 2 4 5 b b b b b b 5 4 2 4 5 
    . b b b . c b c c b c . b b b . 
    b b b b b c b c c b c b b b b b 
    b c c c b c 8 8 8 8 c b c c c b 
    b c c c b c 8 8 8 8 c b c c c b 
    b c c c b c 8 8 8 8 c b c c c b 
    b c c c b c c 8 8 c c b c c c b 
    b c c c b b c c c c b b c c c b 
    b c c c b . b b b b . b c c c b 
    b c c c b . . . . . . b c c c b 
    b c c c b . . . . . . b c c c b 
    b c c c b . . . . . . b c c c b 
    b c c c b . . . . . . b c c c b 
    b b b b b . . . . . . b b b b b 
    `, enemies.EnemyType.Fighter, enemies.FormationType.VShape, 4, 20, 80, 0)
let myMovement = enemies.createMovementPattern(enemies.MovementType.Straight, enemies.MovementType.Stop, enemies.MovementType.SweepRight, 100, 100)
let myProjectile = enemies.createProjectile(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 4 4 . . . . . . . 
    . . . . . . 4 5 5 4 . . . . . . 
    . . . . . . 2 5 5 2 . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, enemies.ProjectileType.Rocket, enemies.FireType.SpreadWide)
enemies.setEnemyFormationMovement(myEnemyFormation, myMovement)
enemies.setEnemyFormationProjectile(myEnemyFormation, myProjectile)
enemies.spawnFormationAfter(myEnemyFormation, 0)
enemies.spawnFormationAfter(myEnemyFormation, 10)
enemies.spawnFormationAfter(myEnemyFormation, 20)
