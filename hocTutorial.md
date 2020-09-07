# Escape your house!

``` template
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (true) {
    	
    } else if (true) {
    	
    } else if (true) {
    	
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
   
})
```

## Introduction @unplugged
We'll need to go through each room until you find the front door. 
You've been in your room all of quarantine so there shouldn't be any obstacles… WAIT! 
It looks like someone locked your door. I guess you'll have to pick the lock using code. 

## Room 1, intro @fullscreen
In order to pick this block, you need to use an Event block. An event is something that 
triggers the code to run. In this case, the event is being near the door, and the code 
that will run is picking the lock.

## Room 1, pt 1
You can only pick the lock when you're close to the door. From the ``||Hoc:Hoc||`` drawer in the Toolbox, 
find the ``||Hoc:When near door||`` Event block and drag it into the workspace.

## Room 1, pt 2
When you're near the door you'll need to pick the lock to make it open. From the ``||Hoc:Hoc||`` drawer, find the 
``||Hoc:pick lock||`` block and drag it into the ``||Hoc:When near door||`` Event block. 

Try going up to the door to pick the lock!

## Room 2, intro @unplugged
You made it to your parent's office! Geez, it looks like no ones dusted in here in weeks. 
Uh oh! Some evil dust bunnies are blocking the door. They look angry. Don't touch them or 
they might attack. Let's use the fan to blow them away. 

## Room 2, pt 1
Let's make the fan turn on when you press the **A button**. That means that we will put our code
in the ``||controller:on A pressed||`` block that's already in the workspace.

``` block
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
```

## Room 2, pt 2 @fullscreen
You can only turn on the fan when you're near it. From the ``||logic:logic||`` Toolbox drawer, find
a ``||logic:if then||`` block. Put this inside the ``||controller:on A pressed||`` block.

``` block
if (true) {

}
```
In coding, we use an **if statement** when our program needs to make a choice. **If** something 
is happening in our game, we want the program to do a certain task. The something that our program 
is looking for, is whether the player is near the fan.

## Room 2, pt 3
From the ``||Hoc:Hoc||`` drawer, find the ``||Hoc:near fan||`` block. Drag this block to the ``||logic: if then||``
block and put it in the **true** slot. Now, when the **B button** is pressed, our code will check
if the player is near the fan.

``` block
if (near_fan) {

}
```
## Room 2, pt 4
When the **A button** is pressed and our player is near the fan, we want to turn the fan on. From
the ``||Hoc:Hoc||`` drawer find the ``||Hoc:fan on||`` block. Put it inside the ``||logic:if then||`` block.
Go next to the fan and press B to try it out! While the fan is on, run to the door!

## Room 3 : Bathroom @unplugged
Phew! There are no evil dust bunnies in here...but it looks like the bathroom is flooded. The sink,
toilet, and shower are all overflowing. You'll need to fix them using code to get to the door.

## Room 3, pt 1
Luckily, we can use more ``||logic:if then||`` blocks to fix these faucets. But this time, we 
need our program to check if the player is near the sink, the toilet, or the shower. For this, 
we'll use the longer ``||logic:if then||`` block that's on the workspace in the ``||controller:on B pressed||``.

``` block
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	if (true) {
    	
    } else if (true) {
    	
    } else if (true) {
    	
    }
})
```
## Room 3, pt 2
From the ``||Hoc:Hoc||`` Toolbox drawer, find the ``||Hoc:near sink||`` block and drop it in place of 
the **true** in the ``||logic:if then||`` block.

``` block
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	if (near_sink) {

    } else if (true) {
    	
    } else if (true) {
    	
    }
})
```

## Room 3, pt 3
From the same ``||Hoc:Hoc||`` drawer, find the ``||Hoc:fix sink||`` block and drag it into the 
``||logic:if near sink then||`` block. Now, when the player is near the sink and pressed the 
**B button** the code will fix the sink. Try it.

``` block
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
	if (near_sink) {
        hoc.fix_sink()
    } else if (true) {
    	
    } else if (true) {
    	
    }
})
```

## Room 3, pt 4
Now, the code will fix the sink. Time to fix the toilet and shower! This is what the two 
``||logic:else if||`` areas are for!

## Room 3, pt 5
Open the ``||Hoc:Hoc||`` drawer and find the ``||Hoc:near toilet||`` block. Drag it next to the ``||logic:else if||``
in the ``||logic:if near sink then||`` block.

``` block
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hoc.near_sink()) {
        hoc.fix_sink()
    } else if (hoc.near_toilet()) {
    	
    } else if (true) {
    	
    }
})
```
Now when we press the **B button** the code will check if the player is near the sink. 
If they're not near the sink, the code will check if the player is near the toilet.

## Room 3, pt 6
From the ``||Hoc:Hoc||`` drawer, find the ``||Hoc:fix toilet||`` block and drag it underneath
``||logic: else if near_toilet||``. Now if the **B button** is pressed and the player is near the 
toilet, the code will fix the toilet. Go ahead and try it out!

```block
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hoc.near_sink()) {
        hoc.fix_sink()
    } else if (hoc.near_toilet()) {
    	hoc.fix_toilet()
    } else if (true) {
    	
    }
})
```

## Room 3, pt 7
Finally, it's time to fix the shower. This can be done in the same way as the sink and toilet.
From the ``||Hoc:Hoc||`` drawer, find the ``||Hoc:near shower||`` block. Drag it next to the last
``||logic:else if ||`` block.

```block
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hoc.near_sink()) {
        hoc.fix_sink()
    } else if (hoc.near_toilet()) {
    	hoc.fix_toilet()
    } else if (hoc.near_shower) {
    	
    }
})
```
Now when the **B button** is pressed, the code will check if the player is near the sink, the toilet, 
then the shower.

## Room 3, pt 8
From the ``||Hoc:Hoc||`` drawer, find the ``||Hoc:fix shower||`` block and drag it underneath
``||logic: else if near_shower||``. Now if the **B button** is pressed and the player is near the 
shower, the code will fix the shower. It's time to finally stop all this flooding!

```block
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (hoc.near_sink()) {
        hoc.fix_sink()
    } else if (hoc.near_toilet()) {
    	hoc.fix_toilet()
    } else if (hoc.near_shower) {
    	hoc.fix_shower()
    }
})
```