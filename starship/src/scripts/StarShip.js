import Mobile from './Mobile.js';
import MoveState from './MoveState.js';
import imageStarShipSrc from '../images/vaisseau-ballon-petit.png';

export default class StarShip extends Mobile {

    /*
    *  Constructeur de l'objet StarShip
    */
    constructor(x, y) {
        super(x, y, imageStarShipSrc, 0, 8);
        this._moving = MoveState.NONE;
        this._isReloading = false;
        this._nbAmmunition = 3;
    }

    /*
    *   Retourn true si le vaiseau effectue un mouvment vers le haut.
    */
    get up () {
        return (this._moving == MoveState.UP);
      }
    
    /*
    *   Retourn true si le vaiseau effectue un mouvment vers le bas.
    */
    get down () {
        return (this._moving == MoveState.DOWN);
    }
    
    /*
    *   get this._moving.
    */
    get moving() {
        return this._moving;
    }

    /*
    *   set this._moving.
    */
    set moving(moving) {
        this._moving = moving;
    }

    /*
    *   get this._isReloading.
    */
    get isReloading() {
        return this._isReloading;
    }

    /*
    *   set this._isReloading.
    */
    set isReloading(isReloading) {
        this._isReloading = isReloading;
    }

    /*
    *   get this._isReloading.
    */
    get nbAmmunition() {
        return this._nbAmmunition;
    }

    /*
    * Deplacement vers le bas.
    */
    moveDown() {
        this.speedY = 8;
        this.moving = MoveState.DOWN;
    }

    /*
    * Deplacement vers le haut.
    */
    moveUp() {
        this.speedY = -8;
        this.moving = MoveState.UP;
    }

    /*
    * Stop le déplacement
    */
    stopMoving() {
        this.moving = MoveState.NONE;
    }

    /*
    * Override
    */
    move(canvas) {
        if (this.moving === MoveState.DOWN) {
            this.y = Math.min(canvas.height - this.image.height, this.y + this.speedY);
        }
        if (this.moving === MoveState.UP) {
            this.y = Math.max(0, this.y + this.speedY);
        }
    }

    /*
    * Methode à invoquer lorsque que le vaisseau rammse un bonus.
    */
    catchBonus(){
        this._nbAmmunition += 1;
    }
}