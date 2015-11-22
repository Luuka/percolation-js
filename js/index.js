
var forest;
var forestCtx;
var forestTrees = [];
var probability = 0.5;
var size = 100;

window.addEventListener("load", function(){

    forest = document.querySelector('.forest');
    forest.addEventListener('click', function(){
        this.classList.toggle('upscale');
    });
    document.querySelector('.simulation').style.display = "none";

    document.getElementById('probability').addEventListener('change', function(){

        this.nextElementSibling.value = this.value;

    });

    document.querySelector('.initSimulation').addEventListener('click', initSimulation);

});

function initSimulation() {

    size = document.getElementById('size').value;
    probability = document.getElementById('probability').value;

    forest.width = size;
    forest.height = size;

    forestCtx = forest.getContext("2d");

    for(var i=0;i<size;i++){
        var line = [];
        for(var j=0;j<size;j++){
            var tree = new Tree(j, i, forestCtx);
            line.push(tree);
        }
        forestTrees.push(line);
    }

    document.querySelector('.config').style.display = "none";
    document.querySelector('.simulation').style.display = "block";
    document.querySelector('.launchSimulation').addEventListener('click', launchSimulation);
}

function launchSimulation() {

    this.style.display = "none";

    var firstTreePosX = Math.floor(Math.random()*(size-0));
    var firstTreePosY = Math.floor(Math.random()*(size-0));
    forestTrees[firstTreePosY][firstTreePosX].changeStateTo(2);

    while(isBurningTrees()){
        for(var i=0;i<size;i++){
            for(var j=0;j<size;j++){

                if(forestTrees[j][i].state == 2){
                    var tree = forestTrees[j][i];
                    tree.changeStateTo(2);
                    checkNeighboringTrees(tree);
                    tree.changeStateTo(3);
                }

            }
        }
    }

    calcData();

}

function calcData() {

    var trees = 0;
    var ashes = 0;

    for(var i=0;i<size;i++){
        for(var j=0;j<size;j++){
            if(forestTrees[j][i].state == 1){
                trees++;
            }else if(forestTrees[j][i].state == 3) {
                ashes++;
            }
        }
    }

    document.querySelector('.cell-trees').innerHTML = trees;
    document.querySelector('.cell-ashes').innerHTML = ashes;

    document.querySelector('.cell-percent-trees').innerHTML = ((trees*100) / (size*size)) + "%";
    document.querySelector('.cell-percent-ashes').innerHTML = ((ashes*100) / (size*size)) + "%";

    document.querySelector('.reset').addEventListener('click',function(){
        window.location.reload();
    });

    document.querySelector('.data').style.display = "inline-block";

}

function checkNeighboringTrees(tree) {

    var originalPosX = tree.posX;
    var originalPosY = tree.posY;

    var neighbours = [];

    if(originalPosY-1 >= 0) {
        neighbours.push(forestTrees[originalPosY-1][originalPosX]); //TOP
    }

    if(originalPosX+1 < size) {
        neighbours.push(forestTrees[originalPosY][originalPosX+1]); //RIGHT
    }

    if(originalPosY+1 < size) {
        neighbours.push(forestTrees[originalPosY+1][originalPosX]); //BOTTOM
    }

    if(originalPosX-1 >= 0) {
        neighbours.push(forestTrees[originalPosY][originalPosX-1]); //LEFT
    }

    for(var i = 0,len = neighbours.length ; i<len ; i++) {
        if(nextTreeCatchFire() && neighbours[i].state == 1) {
            neighbours[i].changeStateTo(2);
        }
    }
}


function nextTreeCatchFire(){

    var rnd = Math.round(( Math.random() ) * 10) / 10;

    if(rnd < probability) {
        return true;
    } else {
        return false;
    }

}

function isBurningTrees(){
    for(var i=0;i<size;i++){
        for(var j=0;j<size;j++){
            if(forestTrees[j][i].state == 2){
                return true;
            }
        }
    }
    return false;
}
