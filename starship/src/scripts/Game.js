import Sauceur from './Saucer.js';
import StarShip from './StarShip.js';
import Shoot from './Shoot.js';
import Bonus from './Bonus.js';

const theScore = document.getElementById("score");

class Game {

    /*
    * Constructeur de la clase Game.
    */
    constructor() {
        this._canvas = null;
        this._raf = null;
        this._context = null;
        this._intervalId = null;
        this._score = 0;
        this._starShip = new StarShip(40, 200);
        this._saucers = new Array();
        this._shoots = new Array();
        this._bonus = new Array();
    }

    /*
    * get this._canvas.
    */
    get canvas() {
        return this._canvas;
    }

    /*
    * set this._canvas.
    */
    set canvas(canvas) {
        this._canvas = canvas;
    }

    /*
    * get this._context.
    */
    get context() {
        return this._context;
    }
    
    /*
    * set this._context.
    */
    set context(context) {
        this._context = context
    }

    /*
    * get this._raf.
    */
    get raf() {
        return this._raf;
    }

    /*
    * set this._raf.
    */
    set raf(raf) {
        throw "Exception : raf cannot be modfied";;
    }

    /*
    * get this._score.
    */
    get score() {
        return this._score;
    }

    /*
    * set this._score.
    */
    set score(score) {
        this._score = score;
    }

    /*
    * get this._starShip.
    */
    get starShip() {
        return this._starShip;
    }

    /*
    * set this._starShip.
    */
    set starShip(starShip) {
        throw "Exception : starShip cannot be modfied";
    }

    /*
    * get this._saucers.
    */
    get saucers() {
        return this._saucers;
    }

    /*
    * set this._saucers.
    */
    set saucers(saucers) {
        throw "Exception : saucers cannot be modfied";
    }

    /*
    * get this._shoots.
    */
    get shoots() {
    return this._shoots;
    }

    /*
    * set this._shoots.
    */
    set shoots(saucers) {
        throw "Exception : shoots cannot be modfied";
    }

    /*
    * get this._bonus.
    */
    get bonus() {
        return this._bonus;
    }

    /*
    * set this._bonus.
    */
    set bonus(bonus) {
        throw "Exception : bonus cannot be modfied";
    }

    /*
    * get this._intervalId.
    */
    get intervalId() {
    return this._intervalId;
    }

    /*
    * set this._intervalId.
    */
    set intervalId(saucers) {
        throw "Exception : intervalId cannot be modfied";
    }

    /*
    * Ajoute une soucoupe au tableau de soucoupe.
    */
    addSaucer() {
        const y = Math.floor(Math.random() * ((this.canvas.height - 50) + 1));
        let saucer = new Sauceur((this.canvas.width - 15), y);
        saucer.draw(this.context);
        this.saucers.push(saucer);
    }

    /*
    * Supprime la soucoupe donnée en paramètre du tableau de soucoupe.
    */
    removeSaucer(saucer) {
        this.saucers.splice(this.saucers.indexOf(saucer), 1);
    }

    /*
    * Ajoute un tir au tableau de tirs.
    */
    addShoot() {
        if (!this.starShip.isReloading && this.shoots.length < this.starShip.nbAmmunition) {
            const y = (this.starShip.y + (this.starShip.image.height / 2));
            const x = this.starShip.x + this.starShip.image.width;
            let shoot = new Shoot(x, y);
            shoot.draw(this.context);
            this._shoots.push(shoot);
        }
    }

    /*
    * Supprime le tir donné en paramètre du tableau de tirs.
    */
    removeShoot(shoot) {
        this._shoots.splice(this._shoots.indexOf(shoot), 1);
    }

    /*
    * Ajoute un bonus au tableau de bonus.
    */
    addBonus() {
        if (this.bonus.length < 1) {
            const y = Math.floor(Math.random() * ((this.canvas.height - 50) + 1));
            let newBonus = new Bonus((this.canvas.width - 15), y);
            newBonus.draw(this.context);
            this.bonus.push(newBonus);
        }
    }

    /*
    * Supprime le tir donné en paramètre du tableau de tirs.
    */
    removeBonus(bonusToRemove) {
        this.bonus.splice(this.bonus.indexOf(bonusToRemove), 1);
    }

    /*
    * Gère l'annimation :   - Clean le context
    *                       - Calcul le mouvement de tous les mobiles : Vaiseau du joueurs, les soucoup et les tirs
    *                       - Dessines tous les mobiles 
    */
    moveAndDraw() {
        this.context = this.canvas.getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.starShip.draw(this.context);
        this.starShip.move(this.canvas);
        this.saucers.forEach(saucer => {
            saucer.move(this.canvas);
            saucer.draw(this.context);
            if (saucer.toDelete) {
                this.removeSaucer(saucer);
                if(saucer.isAlive) {
                    this.score = this.score - 1000;
                }
                else {
                    this.score = this.score + 300;
                }
                theScore.textContent = this.score;
            }
            if (!saucer.isAlive) {
                theScore.textContent = this.score;
            } 
        });

        this._shoots.forEach(shoot => {
            shoot.move(this.canvas);
            shoot.draw(this.context);
            shoot.hitASaucer(this.saucers);
            if (shoot.toDelete) {
                this.removeShoot(shoot);
            }   
        });

        this.bonus.forEach(b => {
            b.move(this.canvas);
            b.draw(this.context);
            b.amIcatchedByTheStarship(this.starShip);
            if(b.toDelete) {
              this.removeBonus(b);
            }   
        });

        this._raf = window.requestAnimationFrame(() => this.moveAndDraw());
    }

    /*
    Geston du déplacement : touche enfoncée.
    */
    keyDownActionHandler(event) {
    switch (event.key) {
            case "ArrowUp":
            case "Up":
            case "z" :
                this.starShip.moveUp();
                break;
            case "ArrowDown":
            case "Down":
            case "s":
                this.starShip.moveDown();
                break;
            case " ":
                this.addShoot();
                this.starShip.isReloading = true;
                break;
            default: return;
        }
        event.preventDefault();
    }

    /*
    Geston du déplacement : touche relachée.
    */
    keyUpActionHandler(event) {
        switch (event.key) {
            case "ArrowUp":
            case "Up":
            case "z":
            case "ArrowDown":
            case "Down":
            case "s":
                this.starShip.stopMoving();
                break;
            case " ":
                this.starShip.isReloading = false;
                break;
            default: return;
        }
        event.preventDefault();
    }
    
    /*
    * Demarre l'animation.
    */
    start() {
        this._raf = window.requestAnimationFrame(() => this.moveAndDraw());
    }

    /*
    * Demare l'apparition de soucoupe.
    */
    startFlotteSoucoupe() {
        this._intervalID = window.setInterval(() => this.flotteSoucoupe(), 750);
        console.log("Start flotte");
    }

    /*
    * Apparition de soucoupe
    */
    flotteSoucoupe() {
        let probabilitySauceur = Math.floor(Math.random() * 2 + 1);
        let probabilityBonus = Math.floor(Math.random() * 50 + 1);
        if (probabilitySauceur === 2) {
            this.addSaucer();
        }
        if (probabilityBonus === 50) {
            this.addBonus();
        }
    }

    /*
    * Stop l'apparition de soucoupe.
    */
    stopFlotteSoucoupe() {
        window.clearInterval(this._intervalID);
        console.log("Stop flotte");
    }
}  

const SingletonGame = new Game()
export default SingletonGame;