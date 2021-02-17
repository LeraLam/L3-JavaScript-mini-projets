import singletonGame from './Game.js';
import '../style/style.css';
import imageSaucerSrc from '../images/flyingSaucer-petit.png';

const setup = function () {

    const theCanvas = document.getElementById("stars");
    const theGame = singletonGame;
    theGame.canvas = theCanvas;
    
    window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame))
    window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));

    const theButtonNouvelleSoucoupe = document.getElementById("nouvelleSoucoupe");
    const theButtonFlotteSoucoupe = document.getElementById("flotteSoucoupes");
    const imageSaucer = new Image();
    var srcButton = theButtonFlotteSoucoupe.getAttribute("src");
    srcButton = imageSaucerSrc;
    theButtonFlotteSoucoupe.value = "Start";
    

    theGame.start();
    theButtonFlotteSoucoupe.addEventListener('click', () => {
        if (theButtonFlotteSoucoupe.value === 'Start') {
            theGame.startFlotteSoucoupe();
            theButtonFlotteSoucoupe.value = 'Stop';
        } else {
            theGame.stopFlotteSoucoupe();
            theButtonFlotteSoucoupe.value = 'Start'
        }
        theButtonFlotteSoucoupe.blur;
    });

    theButtonNouvelleSoucoupe.addEventListener('click', () => {
         theGame.addSaucer();
         theButtonNouvelleSoucoupe.blur;
    })
}

window.addEventListener("DOMContentLoaded", setup);