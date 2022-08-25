const score = document.querySelector(".score");
const gameArea = document.querySelector(".gameArea");
const startScreen = document.querySelector(".startScreen");

let player={speed:5};
let keys ={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false};

startScreen.addEventListener("click",start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);

// To generate Dynamic lines
function moveLines(){
    let divider = document.querySelectorAll(".line");
    divider.forEach( function(item){
        if(item.y>=1500)
            item.y -=1500;

        item.y += player.speed;
        item.style.top = item.y+"px";    
    })
}

function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        (aRect.bottom < bRect.top) || (aRect.top > bRect.bottom)
        ||(aRect.right < bRect.left)||(aRect.left > bRect.right)
    )
}

//To generate Dynamic Enenmy cars
function moveEnemy(car){
    let enemyCar = document.querySelectorAll(".enemy");
    enemyCar.forEach( function(item){
        if(isCollide(car,item))
        {
            console.log("HIT")
            endGame();
        }
        if(item.y>=1500){
            item.y = -600;
            item.style.left = Math.floor(Math.random*370)+"px";
        }    
        item.y += player.speed;
        item.style.top = item.y+"px";    
    })
}


function playGame(){
    let car = document.querySelector(".car");
    //will return the positions of game are
    let road = gameArea.getBoundingClientRect();
    console.log("road ", road);
    moveLines();
    moveEnemy(car);
    let carPos = car.getBoundingClientRect();
    console.log("car" , carPos);
    if(player.start){
        //Changing x and y coordinates
        if(keys.ArrowUp && player.y > road.top)   {player.y -= player.speed;}
        if(keys.ArrowDown && player.y < road.bottom) {player.y += player.speed;}
        if(keys.ArrowLeft && player.x>0)  {player.x -= player.speed;}
        if(keys.ArrowRight && player.x < (road.width-50)){player.x += player.speed;}
        
        car.style.left = player.x+'px';
        car.style.top =  player.y+'px';
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = "Score :- "+player.score;
    }    
}

function pressOn(e){
    e.preventDefault();
    keys[e.key]=true;
    console.log(keys);
}

function pressOff(e){
    e.preventDefault();
    keys[e.key]=false;
    console.log(keys);
}

function endGame(){
    player.start = false;
    score.innerHTML= "Game Over <br> Score was "+player.score;
    startScreen.classList.remove("hide");
}

function start(){
    startScreen.classList.add("hide");
    gameArea.innerHTML ="";
    gameArea.classList.remove("hide");
    //Add start property to player object
    player.start = true;
    player.score =0;
    //Generating 10 Static  Lines for Road
    for(let i=0;i<10;i++)
    {   
        let lines = document.createElement("div");
        lines.classList.add("line")
        lines.y = i * 150;
        lines.style.top = (i*150)+'px';
        gameArea.appendChild(lines);
    }
    //calls a specified function to update an animation before the next repaint
    window.requestAnimationFrame(playGame);

    let car = document.createElement("div");
    //car.innerText = "Car";
    car.setAttribute("class","car");
    gameArea.appendChild(car);
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    for(let i=0;i<11;i++)
    {   
        let enemy = document.createElement("div");
        enemy.classList.add("enemy")
        enemy.y = (i+1)*600*-1;
        enemy.style.top = (enemy.y)+'px';
        enemy.style.backgroundImage = "url(car5.png)";
        enemy.style.backgroundColor ="#DC582A";
        enemy.style.left = Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemy);
    }
}