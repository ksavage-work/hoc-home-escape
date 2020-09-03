namespace SpriteKind {
    export const DustBunny = SpriteKind.create()
    export const Fan = SpriteKind.create()
}
/**
 * functions to turn into blocks
 */
/**
 * GOAL --
 * 
 * when near door
 * 
 *     pickLock
 */
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.DustBunny, function (sprite, otherSprite) {
    otherSprite.setVelocity(0, 50)
    sprite.destroy()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    when_near_door()
    pickLock()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.DustBunny, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    dustBunny.startEffect(effects.clouds)
    pause(500)
})
/**
 * Challenges
 */
// make more instructional
function challenge1 () {
    game.showLongText("Looks like someone locked the door. ", DialogLayout.Bottom)
    game.showLongText("Don't worry, you can pick the lock with code!", DialogLayout.Bottom)
    nearDoor = false
    talkedToBear = true
}
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
    } else {
    	
    }
})
function when_near_door () {
    if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile5)) {
        nearDoor = true
    }
}
/**
 * Test
 */
function pickLock () {
    // replace if with 'when near door'
    if (nearDoor) {
        tiles.setTileAt(tiles.getTileLocation(9, 5), myTiles.tile11)
        tiles.setWallAt(tiles.getTileLocation(9, 5), false)
    } else {
        game.showLongText("The door is still locked", DialogLayout.Bottom)
    }
}
scene.onOverlapTile(SpriteKind.Player, myTiles.tile11, function (sprite, location) {
    tiles.placeOnTile(thePlayer, tiles.getTileLocation(17, 5))
    createDustBunnies()
})
/**
 * GOAL --
 * 
 * while NEAR FAN
 * 
 *      fanBlowsAir
 */
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    near_fan()
    while (fanOn) {
        fanBlowsAir()
    }
})
info.onLifeZero(function () {
    game.over(false)
})
function fanBlowsAir () {
    if (fanOn) {
        fan = sprites.create(img`
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
            `, SpriteKind.Fan)
        tiles.placeOnRandomTile(fan, myTiles.tile12)
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 9 . . . . . . . . 
            . . . . . . . 9 . . . . . . . . 
            . . . . . 9 9 . . . . . . . . . 
            . . . . 9 9 . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . 9 . . 9 9 . . . . . . . . 
            . . . 9 . 9 9 9 9 . . . . . . . 
            . . . 9 . 9 . . 9 . 9 . . . . . 
            . . . 9 . . . 9 . . . 9 . . . . 
            . . . 9 9 9 9 9 . . . . 9 . . . 
            . . . . . . . . 9 9 . . 9 . . . 
            . . . . . . . 9 9 9 9 . 9 . . . 
            . . . . . . . 9 . . 9 . 9 9 . . 
            . . . . . . . 9 9 . . . 9 . . . 
            . . . . . . . . 9 9 9 9 9 . . . 
            `, fan, 0, 50)
    }
    pause(200)
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
})
function near_fan () {
    if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile12) || (thePlayer.tileKindAt(TileDirection.Top, myTiles.tile12) || thePlayer.tileKindAt(TileDirection.Left, myTiles.tile12))) {
        fanOn = true
    }
}
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
let talkedToBear = false
let nearDoor = false
let dustBunny: Sprite = null
let thePlayer: Sprite = null
tiles.setTilemap(tiles.createTilemap(hex`400040000202020202020202020200000000000002020202020202020202000000000000020202020202020202020000000000000000000000000000000000000000000002010101010105010102000000000000020101050101010701020000000000000201010101010101010200000000000000000000000000000000000000000000020101010101010101020000000000000201010101010101010200000000000002010101010101010102000000000000000000000000000000000000000000000201010101010101010200000000000002010101010101060102000000000000020101010101010101020000000000000000000000000000000000000000000002010301010101010102000000000000020101010101010101020000000000000201010101010101010200000000000000000000000000000000000000000000020101010101010101040000000000000a0101010101010601080000000000000a0101010101010101090000000000000000000000000000000000000000000002010101010101010102000000000000020101010101010601020000000000000201010101010101010200000000000000000000000000000000000000000000020101010101010101020000000000000201010101010106010200000000000002010101010101010102000000000000000000000000000000000000000000000201010101010101010200000000000002010101010101060102000000000000020101010101010101020000000000000000000000000000000000000000000002020202020202020202000000000000020202020202020202020000000000000202020202020202020200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
    2 2 2 2 2 2 2 2 2 2 . . . . . . 2 2 2 2 2 2 2 2 2 2 . . . . . . 2 2 2 2 2 2 2 2 2 2 . . . . . . . . . . . . . . . . . . . . . . 
    2 . . . . . 2 . . 2 . . . . . . 2 . . 2 . . . 2 . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . 
    2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . 
    2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . 
    2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . 
    2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . 
    2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . 
    2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . 2 . . . . . . . . 2 . . . . . . . . . . . . . . . . . . . . . . 
    2 2 2 2 2 2 2 2 2 2 . . . . . . 2 2 2 2 2 2 2 2 2 2 . . . . . . 2 2 2 2 2 2 2 2 2 2 . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
    `, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile5,myTiles.tile6,myTiles.tile10,myTiles.tile12,myTiles.tile13,myTiles.tile14,myTiles.tile4], TileScale.Sixteen))
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
info.setLife(5)
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.DustBunny)) {
        if (value.isHittingTile(CollisionDirection.Top)) {
            value.vy = randint(30, 60)
        } else if (value.isHittingTile(CollisionDirection.Bottom)) {
            value.vy = randint(-30, -60)
        }
    }
})
