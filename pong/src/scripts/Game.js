import Ball from './Ball.js';
import Paddle from './Paddle.js';

const socket = io();
const pPlayer = document.getElementById('player');

class Game {

    /*
    * Constructeur de la clase Game.
    */
    constructor() {
        this._canvas = null;
        this._raf = null;
        this._context = null;
        this._paddleLeft = new Paddle(40, 256); // place le padlle au millieu de la hauteur du canvas.
        this._paddleRight = new Paddle(740, 256) 
        this._ball = null;
        this._isPlaying = false;
        this._player = null;
        this._scoreHome = 0;
        this._scoreVisitor = 0;

        socket.emit('startGame'); //On envoie un message de debut du jeux
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
    * get this._paddleLeft.
    */
    get paddleLeft() {
        return this._paddleLeft;
    }

    /*
    * set this._paddleLeft.
    */
    set paddleLeft(paddleLeft) {
        throw "Exception : paddleLeft cannot be modfied";
    }

    /*
    * get this._paddleRight.
    */
    get paddleRight() {
        return this._paddleRight;
    }

    /*
    * set this._paddleRight.
    */
    set paddleRight(paddleRight) {
        throw "Exception : paddleRight cannot be modfied";
    }
    
    /*
    * get this._ball.
    */
    get ball() {
        return this._ball;
    }

    /*
    * set this._ball.
    */
    set ball(ball) {
        throw "Exception : ball cannot be modfied";
    }

    /*
    * get this._player.
    */
    get player() {
        return this._player;
    }

    /*
    * set this._player.
    */
    set player(player) {
        this._player = player;
    }

    /*
    * get this._scoreHome.
    */
    get scoreHome() {
        return this._scoreHome;
    }

    /*
    * set this._scoreHome.
    */
    set scoreHome(scoreHome) {
        this._scoreHome = scoreHome;
    }

    /*
    * get this._scoreVisitor.
    */
    get scoreVisitor() {
        return this._scoreVisitor;
    }

    /*
    * set this._scoreVisitor.
    */
    set scoreVisitor(scoreVisitor) {
        this._scoreVisitor = scoreVisitor;
    }

    /*
    * Socket        :   - Gère l'attribut this.player en fonction de quel joueur se connecte
    *                   - Gère les evenement pour le déplacement des paddles
    *                   - Gestion des balles 
    *            
    * Animation     :   - Clean le context
    *                   - Dessine le filet
    *                   - Calcul le mouvement de tous les mobiles : Vaiseau du joueurs, les soucoup et les tirs
    *                   - Dessines tous les mobiles
    * 
    * Autres        :   - Gestion du score
    */
    moveAndDraw() {
        this.contextManagement();
        this.drawNet();
        this.socketManagement();
        this.moveAndDrawPaddles();
        this.ballManagement();
        this._raf = window.requestAnimationFrame(() => this.moveAndDraw());
    }

    /*
    * Clear context + Affichage du score 
    */
    contextManagement() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.font = 'bold 70px serif';
        this.context.fillText(this.scoreHome.toString(), 200, 325);
        this.context.fillText(this.scoreVisitor.toString(), 600, 325);
    }

    /*
    * Dessine le filet
    */
    drawNet() {
        for(let i = 0; i < 20; i++)
        {
            this.context.fillRect(395, (i * 30), 10, 15);
        }
    }
    
    /*
    * Gestion du Déplacement de la balle
    */
    ballManagement() {
        if (this.ball) {
            this.ball.draw(this.context);
            if (!this.ball.toReset) {
                this.ball.hitAPaddle(this.paddleLeft, this.paddleRight);
                this.ball.move(this.canvas);
                this.synchroBall();
            }
            else {
                if (this.ball.x < 40) {
                    this.scoreVisitor = this.scoreVisitor + 1;
                }
                else if (this.ball.x > 760) {
                    this.scoreHome = this.scoreHome + 1;
                }
                this._ball = null;
                socket.emit('!isPlaying');
                this._isPlaying = false;
            }
        }
    }

    /*
    * Gestion déplacement des paddles.
    */
    moveAndDrawPaddles() {
        this.paddleLeft.move(this.canvas);
        this.paddleLeft.draw(this.context);
        this.paddleRight.move(this.canvas);
        this.paddleRight.draw(this.context);
    }

    /*
    * Gestion Reception de Socket
    */
    socketManagement() {
        socket.on('firstPlayerConnected', this.firstPlayerConnected());
        socket.on('secondPlayerConnected', this.secondPlayerConnected());
        socket.on('youCanStart', this.youCanStart());
        socket.on('paddleRightUp', () => this.rightPaddleUp());
        socket.on('paddleRightDown', () => this.rightPaddleDown());
        socket.on('paddleRightStop', this.paddleRightstop());
        socket.on('newBallWasSend', this.newBallWasSend());
        socket.on('synchroBallWasSend', this.synchroBallWasSend());
    }

    
    synchroBallWasSend() {
        return (x, y, speedX, speedY) => {
            this._ball = new Ball(Math.abs(x - 800), y);
            this._ball.speedX = -speedX;
            this._ball.speedY = speedY;
        };
    }

    newBallWasSend() {
        return (x, y, speedX, speedY) => {
            this._ball = new Ball(Math.abs(x - 800), y);
            this._ball.speedX = -speedX;
            this._ball.speedY = speedY;
        };
    }

    paddleRightstop() {
        return (currentY) => {
            this.paddleRight.y = currentY;
            this.rightPaddleStopMoving();
        };
    }

    youCanStart() {
        return () => {
            window.addEventListener('keyup', this.startNewPoint.bind(this));
        };
    }

    secondPlayerConnected() {
        return () => {
            pPlayer.textContent = "Second Player";
            this.player = "second";
        };
    }

    firstPlayerConnected() {
        return () => {
            pPlayer.textContent = "First Player";
            this.player = "first";
        };
    }

    /*
    * Dessine le filet
    */
    drawNet() {
        for(let i = 0; i < 20; i++)
        {
            this.context.fillRect(395, (i * 30), 10, 15);
        }
    }

    synchroBall(){
        switch(this.ball.x) {
            case 200 :
                socket.emit('synchroBall', this.ball.x, this.ball.y, this.ball.speedX, this.ball.speedY);
                break;
            case 400 :
                socket.emit('synchroBall', this.ball.x, this.ball.y, this.ball.speedX, this.ball.speedY);
                break;
            case 600 :
                socket.emit('synchroBall', this.ball.x, this.ball.y, this.ball.speedX, this.ball.speedY);
                break;
            default: return;
        }
    }

    /*
    * Déplacement du paddle droit vers le haut
    */
    rightPaddleUp() {
        this.paddleRight.moveUp();
    }

    /*
    * Déplacement du paddle droit vers le bas
    */
    rightPaddleDown()
    {   
        this.paddleRight.moveDown();
    }

    /*
    *  Arret de déplacement du paddle droit
    */
    rightPaddleStopMoving()
    {   
        this.paddleRight.stopMoving();
    }
    
    /*
    * Si possible (cf : condition) lance une nouvelle balle lorsque qu'on appui sur la touche espace
    */
    startNewPoint(event) {
        if (!this._isPlaying){
            if (event.key == " ") {
                if (!this._ball || this._ball.x <= 400) {
                    this._ball = new Ball(this.paddleLeft.x + 30, this.paddleLeft.y + 32); // place la balle au millieu de la raquette.
                }
                else {
                    this._ball = new Ball(this.paddleRight.x - 50, this.paddleRight.y + 32); // place la balle au millieu de la raquette.
                    this._ball.speedX = -6
                }
                socket.emit('newBall', this.ball.x, this.ball.y, this.ball.speedX, this.ball.speedY);
                this._isPlaying = true;
                event.preventDefault(); 
            }
        } 
    }  


    /*
    Geston du déplacement : touche enfoncée.
    */
    keyDownActionHandler(event) {
    switch (event.key) {
            case "ArrowUp":
            case "Up":
            case "z" :
                this.paddleLeft.moveUp();
                socket.emit('paddleLeftUp');
                break;
            case "ArrowDown":
            case "Down":
            case "s":
                this.paddleLeft.moveDown();
                socket.emit('paddleLeftDown');
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
                this.paddleLeft.stopMoving();
                socket.emit('paddleLeftStop', this.paddleLeft.y);
                break;
            default: return;
        }
        event.preventDefault();
    }

    /*
    * Demarre l'animation.
    */
    start() {
        this._context = this.canvas.getContext("2d");
        this._raf = window.requestAnimationFrame(() => this.moveAndDraw());
    }
}

const SingletonGame = new Game() //singleton
export default SingletonGame;
