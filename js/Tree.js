var Tree = function(posX, posY, ctx){

    this.state = 1; //1=Arbre - 2=Brule - 3=Cendre
    this.posX = posX;
    this.posY = posY;
    this.ctx = ctx;

    ctx.fillStyle = "green";
    ctx.fillRect(posX,posY,1,1);


};


Tree.prototype.changeStateTo = function(newState) {

    if(newState == 2){
        this.ctx.fillStyle = "orange";
    }else if(newState == 3) {
        this.ctx.fillStyle = "black";
    }

    this.ctx.fillRect(this.posX,this.posY,1,1);

    this.state = newState;

}
