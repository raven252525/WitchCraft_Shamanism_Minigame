import { k } from "./kaboomCtx";

//function to load img as a sprite, and can dictate frames to use, veets allows direct acccess via .
//3rd param is an obj that specifics how to slice img into frames
k.loadSprite("spritesheet", "./spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
        //hookup specific frames to specific functions
        "idle-down": 936,
        "walk-down" : { from: 936, to: 939, loop:true, speed: 8},
        "idle-side": 975,
        "walk-side" : { from: 975, to: 978, loop:true, speed: 8},
        "idle-down": 1014,
        "walk-down" : { from: 1014, to: 1017, loop:true, speed: 8},
    },
});