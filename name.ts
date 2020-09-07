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
    export function nearFan(): boolean { 
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile12)) {
            return true;
        }
        return false;
    }

    //%block="fan blows air"
    export function fanBlowsAir () {
        if (nearFan()) {
            for (let i = 0; i < 50; i++) {
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
    }

    //%block="near sink"
    export function near_sink (): boolean {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile7)) {
            //sinkIsFixed = true
            return true;
        }
        return false;
    }
    //%block="fix sink"
    export function fix_sink () {
        if (near_sink()) {
            for (let index = 0; index <= 6; index++) {
                tiles.setWallAt(tiles.getTileLocation(35, index + 2), false)
                tiles.setTileAt(tiles.getTileLocation(35, index + 2), sprites.dungeon.floorLight0)
                pause(200)
            }
        }
    }
    //% block="near shower"
    export function near_shower (): boolean {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile17)) {
            //showerIsFixed = true
            return true;
        }
        return false;
    }
    //% block="fix shower"
    export function fix_shower () {
        if (near_shower()) {
            for (let index = 0; index <= 6; index++) {
                tiles.setWallAt(tiles.getTileLocation(37, index + 2), false)
                tiles.setTileAt(tiles.getTileLocation(37, index + 2), sprites.dungeon.floorLight0)
                pause(200)
            }
        }
    }
    //%block="near toilet"
    export function near_toilet (): boolean {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile16)) {
            //toiletIsFixed = true
            return true;
        }
        return false;
    }
    //%block="fix toilet"
    export function fix_toilet () {
        if (near_toilet()) {
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
