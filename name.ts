let tileHandler: () => void;

namespace hoc {
    //% block="When near door"
    export function nearDoor(handler: () => void) {
        tileHandler = handler
    }
    
    //%block
    export function pickLock () {
        // replace if with 'when near door'
        tiles.setTileAt(tiles.getTileLocation(9, 5), myTiles.tile11)
        tiles.setWallAt(tiles.getTileLocation(9, 5), false)
    }
    
    //%block="near fan"
    export function nearFan(): boolean { //(handler: () => void) {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile12)) {
            return true;
        }
        return false;
    }

    //%block
    export function fanBlowsAir () {
        for (let i = 0; i < 5; i++) {
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
            pause(200)
        }
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

game.onUpdate(function () {
    if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile5)) {
        tileHandler()
    }
})
