import Mobile from './Mobile.js';
import imageBallSrc from '../images/balle.png';

const BALL_SIZE = 24;
const DELTA = 6;

export default class Ball extends Mobile {

    /*
    *  Constructeur de l'objet Ball.
    */
    constructor(x, y) {
        super(x, y, imageBallSrc, DELTA, 0);
        this._toReset = false;
    }
    
    /*
    * get toReset
    */
    get toReset() {
        return this._toReset;
    }

    /*
    * set toReset
    */
    set toReset(toReset){
        throw "Exception : toReset cannot be modfied";
    }
    
    /*
    * Regarde si la balle à touché une raquette.
    */
    hitAPaddle(paddleLeft, paddleRight) {
        let paddle = null;
        if (this.collisionWith(paddleLeft)) {
             paddle = paddleLeft;
        }
        else if (this.collisionWith(paddleRight)) {
             paddle = paddleRight;
        }
        if (paddle) {
            const sizeSlicePaddle = paddle.image.height / 10;
            let pointOfImpact = this.y + (BALL_SIZE / 2);
            if (pointOfImpact >= paddle.y && pointOfImpact < paddle.y + sizeSlicePaddle) {
                this.speedY = -4;
            }
            else if (pointOfImpact >= sizeSlicePaddle && pointOfImpact < paddle.y + 2 * sizeSlicePaddle) {
                this.speedY = -3;
            }
            else if (pointOfImpact >= 2 * sizeSlicePaddle && pointOfImpact < paddle.y + 3 * sizeSlicePaddle) {
                this.speedY = -2;
            }
            else if (pointOfImpact >= 3 * sizeSlicePaddle && pointOfImpact < paddle.y + 4 * sizeSlicePaddle) {
                this.speedY = -2;
            }
            else if (pointOfImpact >= 4 * sizeSlicePaddle && pointOfImpact < paddle.y + 5 * sizeSlicePaddle) {
                this.speedY = -1;
            }
            else if (pointOfImpact >= 5 * sizeSlicePaddle && pointOfImpact < paddle.y + 6 * sizeSlicePaddle) {
                this.speedY = 0;
            }
            else if (pointOfImpact >= 6 * sizeSlicePaddle && pointOfImpact < paddle.y + 7 * sizeSlicePaddle) {
                this.speedY = 1;
            }
            else if (pointOfImpact >= 7 * sizeSlicePaddle && pointOfImpact < paddle.y + 8 * sizeSlicePaddle) {
                this.speedY = 2;
            }
            else if (pointOfImpact >= 8 * sizeSlicePaddle && pointOfImpact < paddle.y + 9 * sizeSlicePaddle) {
                this.speedY = 3;
            }
            else if (pointOfImpact >= 9 * sizeSlicePaddle && pointOfImpact < paddle.y + 10 * sizeSlicePaddle) {
                this.speedY = 4;
            }
            else { return;
            }
            this.speedX = DELTA - Math.abs(this.speedY);
            if (paddle === paddleRight) {
                this.speedX = -this.speedX;
            }
            this.x = this.x + this.speedX;
            this.y = this.y + this.speedY;
        }
    }
    move(canvas) {
        let newX = this.x + this.speedX;
        let newY = this.y + this.speedY;
        if (newX > canvas.width - BALL_SIZE || newX < 0) {
            this.speedX = -this.speedX;
            if (newX <= 0 || (newX + BALL_SIZE) >= canvas.width) {
               this._toReset = true;
            }
        }
        if (newY > canvas.height - BALL_SIZE || newY < 0) {
            this.speedY = -this.speedY;
        }
        this.x = newX;
        this.y = newY;
    }

    /*
    Renvoie true spointOfImpact y a collision entre une balle et la raquette donné en paramètre.
    */
    collisionWith(paddle) {
        if(paddle.isInside(this.x, this.y) || // coin en haut à gauche
        paddle.isInside((this.x + BALL_SIZE), this.y) || // coin en bas à gauche
        paddle.isInside(this.x, (this.y + BALL_SIZE)) || // coin en haut à droite
        paddle.isInside((this.x + BALL_SIZE), (this.y + BALL_SIZE))) { // coin en bas à droite
            return true;
        }
        return false;
    }
}