controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hoc.near_sink()) {
        hoc.fix_sink()
    } else if (hoc.near_toilet()) {
        hoc.fix_toilet()
    } else if (hoc.near_shower()) {
        hoc.fix_shower()
    } else {
        game.showLongText("failed", DialogLayout.Bottom)
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hoc.nearFan()) {
        hoc.fanBlowsAir()
    }
})
// event
hoc.nearDoor(function () {
    hoc.pickLock()
})
