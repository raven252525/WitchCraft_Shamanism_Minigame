import { scaleFactor } from "./constants";
import { k } from "./kaboomCtx";
import { displayDialogue } from "./utils";

// function to load img as a sprite, and can dictate frames to use, veets allows direct acccess via .
// 3rd param is an obj that specifics how to slice img into frames
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

// import map sprite 
k.loadSprite("map", "./map.png");

k.setBackground(k.Color.fromHex("#311047"));

// first scene, async bc we need the map.json data via fetch call
k.scene("main", async () => {
    //function that occurs in scene

    // we await bc fetch is asnyc, so we wana wait until 
    // fetch(basic Web API) is done to continue, then jsonify
    const mapData = await (await fetch("./map.png")).json();
    const layers = mapData.layers;

    // first game obj, has a collection of components(arrays), ex: position, players, props,
    // that determine properties of how obj acts - MUST CALL ADD AFTER TO DISPLAY
    const map = k.add([k.sprite("map"), k.pos(0), k.scale(scaleFactor)]);

    const player = k.make([
        k.sprite("spritesheet",{anims: "idle-down"}), 
        k.area({
            shape: new k.Rect(k.vec2(0,3), 10, 10) // drawing hitbox, using vectors for x y coord, and goes from player out 3
        }),
        k.body(),
        k.anchor("center"),
        k.pos(),
        k.scale(scaleFactor),
        {
            speed: 250,
            direction: "down",
            isInDialogue: false,
        },
        "player", // tag for oncolide function, to be able to see which objects collided with what
    ]);

    for (const layer of layers) {
        if (layer.name === "boundaries") {
            for (const boundary of layer.objects) {
                map.add([//adding extra child function to map game obj
                    k.area({
                        shape: new k.Rect(vsc2(0), boundary.width, boundary.height),
                    }), // creation of shape 
                    k.body({isStatic: true}),// player will not be able to overlap with this(for walls)
                    k.pos(boundary.x, boundary.y), // pos of obj
                    boundary.name, // tag of game obj
                ])
              
                if (boundary.name) {
                    // set collision events btwn player and boundary.name
                    player.onCollide(boundary.name, () => {
                        player.isInDialogue = true; // prevents player from moving when text box
                        displayDialogue("TODO", () => (player.isInDialogue = false))
                    });
                }
            }


            continue;
        }
        
        if (layer.name === "spawnpoints") {
            for (const entity of layer.objects) {
                if (entity.name === "player") {
                    player.pos = k.vec2(
                        (map.pos.x + entity.x) * scaleFactor,
                        (map.pos.y + entity.y) * scaleFactor
                    );
                    k.add(player);
                    continue;
                }
            }
        }
    }

    k.onUpdate(() => {
        k.camPos(player.pos.x, player.pos.y + 100)
    })
})

//specifies default scene
k.go("main")