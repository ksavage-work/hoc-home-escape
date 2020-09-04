controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    // hoc.when_near_door()
    if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile5)) {
    	
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile12)) {
        hoc.when_near_fan()
        for (let index = 0; index < 50; index++) {
            hoc.fanBlowsAir()
        }
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile15)) {
        hoc.near_sink()
        hoc.fix_sink()
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile16)) {
        hoc.near_toilet()
        hoc.fix_toilet()
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile17)) {
        hoc.near_shower()
        hoc.fix_shower()
    } else {
        game.showLongText("failed", DialogLayout.Bottom)
    }
})
hoc.nearDoor(function () {
    hoc.pickLock()
})
