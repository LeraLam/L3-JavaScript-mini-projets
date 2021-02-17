import Mobile from './Mobile.js';
import imageBonusSrc from '../images/bonus.png';

export default class Bonus extends Mobile {

    /*
    *  Constructeur de l'objet Sauceur.
    */
    constructor(x, y) {
        super(x, y, imageBonusSrc, -5, 0);
        this._toDelete = false;
    }

    /*
    * Override
    */
    move(canvas) {
        let newX = this.x + this.speedX;
        if (newX  < 0)  {
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
    se trouve à l'interieur de la hitbox du bonus.
    */
    isInside(x, y) {
        if((this.x <= x && x <= (this.x + this.image.width)) && (this.y <= y && y <= (this.y + this.image.height))) {
            return true;
        }
        return false;
    }

    /*
    * Regarde si le Bonus à touché le vaisseau du joueur.
    */
    amIcatchedByTheStarship(starShip) {
        for (let i = starShip.y; i < starShip.y + starShip.image.height; i++) {
            if (this.isInside(starShip.x, i)) {
                starShip.catchBonus();
                i = starShip.y + starShip.image.height;
                this._toDelete = true;
            }
        }
    }
}