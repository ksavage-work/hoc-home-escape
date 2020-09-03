namespace hoc {
    //%block
    export function when_near_door () {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile5)) {
            nearDoor = true
        }
    }
    //%block
    export function pickLock () {
        // replace if with 'when near door'
        if (nearDoor) {
            tiles.setTileAt(tiles.getTileLocation(9, 5), myTiles.tile11)
            tiles.setWallAt(tiles.getTileLocation(9, 5), false)
        } else {
            game.showLongText("The door is still locked", DialogLayout.Bottom)
        }
    }
    //%block
    export function when_near_fan () {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile12) || (thePlayer.tileKindAt(TileDirection.Top, myTiles.tile12) || thePlayer.tileKindAt(TileDirection.Left, myTiles.tile12))) {
            fanOn = true
        }
    }
    //%block
    export function fanBlowsAir () {
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
    //%block
    export function near_sink () {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile15)) {
            sinkIsFixed = true
        }
    }
    //%block
    export function fix_sink () {
        if (sinkIsFixed) {
            for (let index = 0; index <= 6; index++) {
                tiles.setWallAt(tiles.getTileLocation(35, index + 2), false)
                tiles.setTileAt(tiles.getTileLocation(35, index + 2), sprites.dungeon.floorLight0)
                pause(200)
            }
        }
    }
    //% block
    export function near_shower () {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile17)) {
            showerIsFixed = true
        }
    }
    //% block
    export function fix_shower () {
        if (showerIsFixed) {
            for (let index = 0; index <= 6; index++) {
                tiles.setWallAt(tiles.getTileLocation(37, index + 2), false)
                tiles.setTileAt(tiles.getTileLocation(37, index + 2), sprites.dungeon.floorLight0)
                pause(200)
            }
        }
    }
    //%block
    export function near_toilet () {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile16)) {
            toiletIsFixed = true
        }
    }
    //%block
    export function fix_toilet () {
        if (toiletIsFixed) {
            for (let index = 0; index <= 6; index++) {
                tiles.setWallAt(tiles.getTileLocation(36, 7 - index), false)
                tiles.setTileAt(tiles.getTileLocation(36, 7 - index), sprites.dungeon.floorLight0)
                pause(200)
            }
        }
    }
}