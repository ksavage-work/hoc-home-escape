let tileHandler: () => void;

namespace hoc {
    
    //%block
    export function sprite_visual (inputImage:Image) {
        thePlayer = sprites.create(inputImage, SpriteKind.Player)
        tiles.placeOnRandomTile(thePlayer, myTiles.tile3)
        controller.moveSprite(thePlayer)
        scene.cameraFollowSprite(thePlayer)
    }  

    //%block="When near door"
    export function near_door(handler: () => void) {
        tileHandler = handler
    }
    
    //%block="pick lock"
    export function pick_lock () {
        tiles.setTileAt(tiles.getTileLocation(9, 5), myTiles.tile11)
        tiles.setWallAt(tiles.getTileLocation(9, 5), false)
    }
    
    //%block="near fan"
    export function near_fan (): boolean { 
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile12)) {
            return true;
        }
        return false;
    }

    //%block="fan blows air"
    export function fan_blows_air () {
        if (near_fan()) {
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

    //%block="near bathroom sink"
    export function near_bathroom_sink (): boolean {
        if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile7)) {
            //sinkIsFixed = true
            return true;
        }
        return false;
    }
    //%block="fix sink"
    export function fix_sink () {
        if (near_bathroom_sink()) {
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
    //%block="near kitchen sink"
    export function near_kitchen_sink (): boolean {
        if (thePlayer.tileKindAt(TileDirection.Top, myTiles.tile29)) {
            return true;
        }
        return false;
    }
    //%block="clean dishes"
    export function clean_dishes () {
        if (near_kitchen_sink()) {
            if (thePlayer.tileKindAt(TileDirection.Top, myTiles.tile29)) {
                effects.bubbles.startScreenEffect(200)
                wash_dishes(1)
                pause(200)
            }
        }
    }
}

function wash_dishes (count: number) {
	wash_count += count
}

game.onUpdate(function () {
    if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile5)) {
        tileHandler()
    }
})
