// Add your code here
namespace SpriteKind {
    export const DustBunny = SpriteKind.create()
    export const Fan = SpriteKind.create()
    export const BrokenAppliance = SpriteKind.create()
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.DustBunny, function (sprite, otherSprite) {
    otherSprite.setVelocity(0, 50)
    sprite.destroy()
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.DustBunny, function (sprite, otherSprite) {
    dustBunny.startEffect(effects.clouds)
    game.showLongText("Too much dust!", DialogLayout.Bottom)
    pause(500)
    game.over(false)
})

scene.onOverlapTile(SpriteKind.Player, myTiles.tile11, function (sprite, location) {
    tiles.placeOnTile(thePlayer, tiles.getTileLocation(17, 5))
    createDustBunnies()
    createFan()
})

function createFan () {
    fan = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Fan)
    tiles.placeOnRandomTile(fan, myTiles.tile12)
}

function createDustBunnies () {
    for (let value of tiles.getTilesByType(myTiles.tile10)) {
        dustBunny = sprites.create(img`
            . . . c c . . . . . . . . . . . 
            . . . c 1 c . . . c c . . . . . 
            . . . . c 1 . . c 1 c . . . . . 
            . . . . . c 1 c 1 c . . . . . . 
            . . . 2 c b b 1 c c . . . . . . 
            . . . c b 2 b c b . . . . . . . 
            . . c b b b b c b b . . . . . . 
            . . b b b b b b c b b . . . . . 
            . . . . b c b b b b b . . . . . 
            . . . . b c c b b b b 1 1 . . . 
            . . . . b b b b b b b 1 1 . . . 
            . . . c b b c b b b b b . . . . 
            . . . c c b c c b b . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.DustBunny)
        tiles.placeOnTile(dustBunny, value)
        dustBunny.setVelocity(0, 50)
    }
    tiles.replaceAllTiles(myTiles.tile10, myTiles.tile1)
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile13, function (sprite, location) {
    tiles.placeOnTile(thePlayer, tiles.getTileLocation(33, 5))
    hoc.nearFan()
    sinkIsFixed = false
    toiletIsFixed = false
    showerIsFixed = false
})

// add intro, instructions
let projectile: Sprite = null
let fan: Sprite = null
//let fanOn = false
let toiletIsFixed = false
let sinkIsFixed = false
let talkedToBear = false
let nearDoor = false
let dustBunny: Sprite = null
let showerIsFixed = false
let thePlayer: Sprite = null
tiles.setTilemap(tilemap`level`)
thePlayer = sprites.create(img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 5 d f . . 
    . . . . b 5 5 1 f f 5 d 4 c . . 
    . . . . b 5 5 d f b d d 4 4 . . 
    . b b b d 5 5 5 5 5 4 4 4 4 4 b 
    b d d d b b d 5 5 4 4 4 4 4 b . 
    b b d 5 5 5 b 5 5 5 5 5 5 b . . 
    c d c 5 5 5 5 d 5 5 5 5 5 5 b . 
    c b d c d 5 5 b 5 5 5 5 5 5 b . 
    . c d d c c b d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
tiles.placeOnRandomTile(thePlayer, myTiles.tile3)
controller.moveSprite(thePlayer)
scene.cameraFollowSprite(thePlayer)
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.DustBunny)) {
        if (value.isHittingTile(CollisionDirection.Top)) {
            value.vy = randint(30, 60)
        } else if (value.isHittingTile(CollisionDirection.Bottom)) {
            value.vy = randint(-30, -60)
        }
    }
})
