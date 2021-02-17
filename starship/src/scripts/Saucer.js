import Mobile from './Mobile.js';
import imageSaucerSrc from '../images/flyingSaucer-petit.png';
import imageExplodedSrc from '../images/ExplodedFlyingSaucer.png'

export default class Sauceur extends Mobile {

    /*
    *  Constructeur de l'objet Sauceur.
    */
    constructor(x, y) {
        super(x, y, imageSaucerSrc, -3, 0);
        this.x = this.x - (this.image.height / 2)
        this._toDelete = false;
        this._isAlive = true;
    }

    /*
    * Override
    */
    move(canvas) {
        let newX = this.x + this.speedX;
        let newY = this.y + this.speedY;
        if ((newX < 0) || (newY > (canvas.height - this.image.height))) {
            this._toDelete = true;
        }
        this.x = newX;
        this.y = newY;
    }

    /*
    * Get this_toDelete
    */
    get toDelete() {
        return this._toDelete;
    }

    /*
    * Set this_toDelete
    */
    set toDelete(toDelete) {
        throw "Exception : toDelete cannot be modfied";
    }

    /*
    * Get this_isAlive
    */
    get isAlive() {
        return this._isAlive;
    }

    /*
    * Set this_isAlive
    */
    set isAlive(isAlive) {
        throw "Exception : isAlive cannot be modfied";
    }

    /*
    * Fonction à éxecuter lorsque la soucoupe est touchée par un tir.
    */
    die() {
        this._image.src = imageExplodedSrc;
        this._isAlive = false;
        this.speedX = 0;
        this.speedY = 3;
    }
}