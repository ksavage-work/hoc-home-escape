namespace hoc {
//% block
export function near_shower () {
    if (thePlayer.tileKindAt(TileDirection.Right, myTiles.tile17)) {
        showerIsFixed = true
    }
}
}