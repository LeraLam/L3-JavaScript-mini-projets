import singletonGame from './Game.js';
import '../style/style.css';

const setup = function () {

    const theCanvas = document.getElementById("field");
    const theGame = singletonGame;
    theGame.canvas = theCanvas;
    
    theGame.start();
    window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame))
    window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));

    
}

window.addEventListener("DOMContentLoaded", setup);