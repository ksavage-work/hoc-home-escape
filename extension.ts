// Add your code here
namespace SpriteKind {
    export const DustBunny = SpriteKind.create()
    export const Fan = SpriteKind.create()
    export const BrokenAppliance = SpriteKind.create()
}
/**
 * functions to turn into blocks
 */
/**
 * GOAL --
 * 
 * while NEAR FAN
 * 
 *      fanBlowsAir
 */
/**
 * GOAL --
 * 
 * if (near sink) 
 * 
 *      fix sink
 * 
 * else if (near shower)
 * 
 *      fix shower
 * 
 * else if (near toilet)
 * 
 *      fix toilet
 */

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
/**
 * Challenges
 * 
 * rm1 - event
 * 
 * rm2 - loop
 * 
 * rm3 -
 */
// make more instructional
function challenge1 () {
    game.showLongText("Looks like someone locked the door. ", DialogLayout.Bottom)
    game.showLongText("Don't worry, you can pick the lock with code!", DialogLayout.Bottom)
    nearDoor = false
    talkedToBear = true
}

// interact with npc and other things
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile5)) {
        if (talkedToBear == false) {
            game.showLongText("Uh oh! It's locked!", DialogLayout.Bottom)
            game.showLongText("Talk to Bear for some help!", DialogLayout.Bottom)
        } else {
            game.showLongText("You'll need to unlock the door with code!", DialogLayout.Bottom)
        }
    } else if (thePlayer.tileKindAt(TileDirection.Top, myTiles.tile6)) {
        challenge1()
    } else if (thePlayer.tileKindAt(TileDirection.Top, myTiles.tile9)) {
        challenge2()
    } else if (thePlayer.tileKindAt(TileDirection.Left, myTiles.tile4)) {
        game.showLongText("The door won't budge!", DialogLayout.Bottom)
    } else if (thePlayer.tileKindAt(TileDirection.Bottom, myTiles.tile18)) {
        challenge3()
    } else {
    	
    }
})


/**
 * GOAL --
 * 
 * when near door
 * 
 *     pickLock
 */


scene.onOverlapTile(SpriteKind.Player, myTiles.tile11, function (sprite, location) {
    tiles.placeOnTile(thePlayer, tiles.getTileLocation(17, 5))
    createDustBunnies()
})

function challenge3 () {
    game.showLongText("The sink, the toilet, and the shower are flooded!", DialogLayout.Bottom)
    game.showLongText("You'll have to fix each to stop the flooding.", DialogLayout.Bottom)
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
    fanOn = false
    sinkIsFixed = false
    toiletIsFixed = false
    showerIsFixed = false
})
// make more instructional
function challenge2 () {
    game.showLongText("Watch out! Some evil dust bunnies are blocking the door!", DialogLayout.Bottom)
    game.showLongText("If you run into them, you might choke on the dust.", DialogLayout.Bottom)
    game.showLongText("You'll need to defeat them before going to the next room.", DialogLayout.Bottom)
    fanOn = false
}
// add intro, instructions
let projectile: Sprite = null
let fan: Sprite = null
let fanOn = false
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
