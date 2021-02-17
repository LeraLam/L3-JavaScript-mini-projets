import Mobile from './Mobile.js';
import imageShootSrc from '../images/tir.png';

export default class Shoot extends Mobile {

    /*
    *  Constructeur de l'objet Sauceur.
    */
    constructor(x, y) {
        super(x, y, imageShootSrc, 8, 0);
        this._toDelete = false;
    }

    /*
    * Override
    */
    move(canvas) {
        let newX = this.x + this.speedX;
        if ((newX + this.image.width) > canvas.width)  {
            this._toDelete = true;
        }
        this.x = newX;
    }

    /*
    * get ToDelete
    */
    get toDelete() {
        return this._toDelete;
    }

    /*
    * set toDelete
    */
    set toDelete(toDelete){
        throw "Exception : toDelete cannot be modfied";
    }

    /*
    Retourne true si le point de coordonnées (x, y),
    se trouve à l'interieur de la hitbox du tir.
    */
    isInside(x, y) {
        if((this.x <= x && x <= (this.x + this.image.width)) && (this.y <= y && y <= (this.y + this.image.height))) {
            return true;
        }
        return false;
    }

    /*
    * Regarde si le tir à touché une soucoupe, si cette soucoupe est tué demande a game de la supprimé et incremente le score.
    */
    hitASaucer(saucers) {
        saucers.forEach(saucer => {
            for (let i = saucer.y; i < saucer.y + saucer.image.height; i++) {
                if (this.isInside(saucer.x, i) && saucer.isAlive) {
                    saucer.die();
                    i = saucer.y + saucer.image.height;
                    this._toDelete = true;
                }
            }
        });
    }
}