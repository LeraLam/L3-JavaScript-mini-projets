import Mobile from './Mobile.js';
import MoveState from './MoveState.js';
import imagePaddleSrc from '../images/paddle.png';

export default class Paddle extends Mobile {

    /*
    * Constructeur de l'objet Paddle.
    */
    constructor(x, y) {
        super(x, y, imagePaddleSrc, 0, 8);
        this._moving = MoveState.NONE;
    }

    /*
    *  Retourn true si la raquette effectue un mouvment vers le haut.
    */
    get up () {
        return (this._moving == MoveState.UP);
    }
    
    /*
    *   Retourn true si la raquette effectue un mouvment vers le bas.
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
    Retourne true si le point de coordonnées (x, y),
    se trouve à l'interieur de la hitbox de la balle.
    */
    isInside(x, y) {
    if((this.x <= x && x <= (this.x + this.image.width)) && (this.y <= y && y <= (this.y + this.image.height))) {
        return true;
    }
    return false;
}
}