/**
 * Created by Martin on 2015-10-14.
 */

var game = new SD();

function preload() {
    game.preload();
}

function setup() {

    game.setup();
}

function draw() {

    game.update();

    game.draw();

}

function keyPressed() {

    game.keyPressed();

}