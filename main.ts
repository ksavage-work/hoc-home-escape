controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hoc.near_sink()) {
        hoc.fix_sink()
    } else if (hoc.near_toilet()) {
        hoc.fix_toilet()
    } else if (hoc.near_shower()) {
        hoc.fix_shower()
    } else {
        hoc.clean_dishes()
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hoc.near_fan()) {
        hoc.fan_blows_air()
    }
})
hoc.near_door(function () {
    hoc.pick_lock()
})
