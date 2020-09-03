controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile5)) {
        when_near_door()
pickLock()
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile12)) {
        when_near_fan()
for (let index = 0; index < 50; index++) {
            fanBlowsAir()
        }
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile15)) {
        near_sink()
fix_sink()
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile16)) {
        near_toilet()
fix_toilet()
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile17)) {
        hoc.near_shower()
        fix_shower()
    } else {
        game.showLongText("failed", DialogLayout.Bottom)
    }
})
