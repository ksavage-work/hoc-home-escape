// Add your code here
namespace SpriteKind {
    export const Mold = SpriteKind.create()
    export const DustBunny = SpriteKind.create()
    export const Fan = SpriteKind.create()
    export const BrokenAppliance = SpriteKind.create()
}

//fan wind overlaps dustbunny
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.DustBunny, function (sprite, otherSprite) {
    otherSprite.setVelocity(0, 50)
    sprite.destroy()
})

//player overlaps dustbunny
sprites.onOverlap(SpriteKind.Player, SpriteKind.DustBunny, function (sprite, otherSprite) {
    dustBunny.startEffect(effects.clouds)
    game.showLongText("Too much dust!", DialogLayout.Bottom)
    pause(500)
    game.over(false)
})

//player moves from bedroom (room 1) to offic (room 2)
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

//player moves from office (room 2) to bathroom (room 3)
scene.onOverlapTile(SpriteKind.Player, myTiles.tile13, function (sprite, location) {
    tiles.placeOnTile(thePlayer, tiles.getTileLocation(33, 5))
    hoc.near_fan()
    sinkIsFixed = false
    toiletIsFixed = false
    showerIsFixed = false
})

//places mold on green tiles
scene.onOverlapTile(SpriteKind.Player, myTiles.tile14, function (sprite, location) {
    tiles.placeOnTile(thePlayer, tiles.getTileLocation(48, 5))
    moldyAir()
})

function moldyAir () {
    for (let value of tiles.getTilesByType(myTiles.tile30)) {
        mold = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . 7 6 . 7 6 7 . . . . . . . .
            . . 6 6 7 e 7 6 . . 6 6 7 . . .
            . . . 7 . . . 7 . . . 6 6 . . .
            . . . . . . 7 . 6 . 6 . . . . .
            . . . . . . 6 6 . e . . . . . .
            . 6 . . . 7 6 . . 7 . . 6 . . .
            . . 7 . . . e . . . 6 6 e . . .
            . . . e . 6 . . . . . 6 . . . .
            . . 6 . 6 . 7 . 6 . . . 7 . 6 .
            . . . . . . . . . . . . . 6 . .
            . . . . 7 . . . . . . . . . . .
            . . . . . 6 . . . . 7 . . . . .
            . . . . . . . . . . . 6 . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Mold)
        tiles.placeOnTile(mold, value)
        mold.setVelocity(randint(-50, 50), randint(-50, 50))
    }
    tiles.replaceAllTiles(myTiles.tile30, sprites.dungeon.floorLight0)
}

//makes mold bounce of wall
scene.onHitWall(SpriteKind.Mold, function(sprite: Sprite, location: tiles.Location) {
    sprite.setVelocity(randint(-50, 50), randint(-50, 50))
    sprite.startEffect(effects.spray, 100)
})

// finish game, reach front door
scene.onOverlapTile(SpriteKind.Player, img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . 8 8 . 8 8 . . 8 . 8 8 . . . .
            . 8 . . 8 8 . . 8 . 8 . 8 . . .
            . 8 . . 8 . 8 . 8 . 8 . 8 . . .
            . 8 . . 8 . 8 . 8 . 8 . 8 . . .
            . 8 8 . 8 . . 8 8 . 8 . 8 . . .
            . 8 . . 8 . . 8 8 . 8 . 8 . . .
            . 8 . . 8 . . 8 8 . 8 . 8 . . .
            . 8 . . 8 . . . 8 . 8 . 8 . . .
            . 8 8 . 8 . . . 8 . 8 8 . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, function(sprite: Sprite, location: tiles.Location) {
    game.over(true)
})

// add intro, instructions
let projectile: Sprite = null
let fan: Sprite = null
let toiletIsFixed = false
let sinkIsFixed = false
let talkedToBear = false
let nearDoor = false
let dustBunny: Sprite = null
let mold: Sprite = null
let showerIsFixed = false
let thePlayer: Sprite = null
let wash_count = 0
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
game.showLongText("There shouldn't be any obstacles in here...", DialogLayout.Bottom)
game.showLongText("Uh oh!", DialogLayout.Bottom)
game.showLongText("The door's locked! Pick the lock using code.", DialogLayout.Bottom)
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.DustBunny)) {
        if (value.isHittingTile(CollisionDirection.Top)) {
            value.vy = randint(30, 60)
        } else if (value.isHittingTile(CollisionDirection.Bottom)) {
            value.vy = randint(-30, -60)
        }
    }
    if (wash_count == 5) {
        tiles.setTileAt(tiles.getTileLocation(57, 5), img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . 8 8 . 8 8 . . 8 . 8 8 . . . .
            . 8 . . 8 8 . . 8 . 8 . 8 . . .
            . 8 . . 8 . 8 . 8 . 8 . 8 . . .
            . 8 . . 8 . 8 . 8 . 8 . 8 . . .
            . 8 8 . 8 . . 8 8 . 8 . 8 . . .
            . 8 . . 8 . . 8 8 . 8 . 8 . . .
            . 8 . . 8 . . 8 8 . 8 . 8 . . .
            . 8 . . 8 . . . 8 . 8 . 8 . . .
            . 8 8 . 8 . . . 8 . 8 8 . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)
        tiles.setWallAt(tiles.getTileLocation(57, 5), false)
        let allMoldySprites = sprites.allOfKind(SpriteKind.Mold)
        for (let value of allMoldySprites) {
            value.destroy()
        }
    }
})
