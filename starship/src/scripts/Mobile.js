export default class Mobile {
     /*
    * Constructeur pour l'objet Mobile
    */
    constructor(x, y, srcImage, speedX, speedY) {
        this._x = x;
        this._y = y;
        this._image = new Image();
        this._image.src = srcImage;
        this._speedX = speedX || 0;
        this._speedY = speedY || 0;
    }

    /*
    * Get this_x
    */
    get x() {
        return this._x;
    }

    /*
    * Set this_x
    */
    set x(x) {
        this._x = x;
    }

    /*
    * Get this_y
    */
    get y() {
        return this._y;
    }

    /*
    * Set this_y
    */
    set y(y) {
        this._y = y;
    }

    /*
    * Get this_image
    */
    get image() {
        return this._image;
    }

    /*
    * Get this_image
    */
    set image(image) {
        throw "Exception : image cannot be modfied";
    }

    /*
    * Get this_speedX
    */
    get speedX() {
        return this._speedX;
    }

    /*
    * Set this_speedX
    */
    set speedX(speedX) {
        this._speedX = speedX;
    }

    /*
    * Get this_speedY
    */
    get speedY() {
        return this._speedY;
    }

    /*
    * set this_speedY
    */
    set speedY(speedY) {
        this._speedY = speedY;
    }

    /* 
    * Dessine l'objet mobile grâce au contexte de rendu fourni en paramètre de la méthode.
    */
    draw(context) {
        context.drawImage(this.image, this.x, this.y);
    }

    /*
    * Gère les déplacement de l'objet en fontion de ses vitesse horizontale et verticale.
    */
    move(canvas) {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
    }

}