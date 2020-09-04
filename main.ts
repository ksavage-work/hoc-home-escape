controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    // hoc.when_near_door()
    if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile15)) {
        hoc.near_sink()
        hoc.fix_sink()
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile16)) {
        hoc.near_toilet()
        hoc.fix_toilet()
    } else if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile17)) {
        hoc.near_shower()
        hoc.fix_shower()
    } else if (hoc.nearFan()) {
        while (hoc.nearFan()) {
            hoc.fanBlowsAir()
        }
    } else {
        game.showLongText("failed", DialogLayout.Bottom)
    }
})
// hoc.nearFan(function () {
// for (let index = 0; index < 50; index++) {
// hoc.fanBlowsAir()
// }
// })
hoc.nearDoor(function () {
    hoc.pickLock()
})
