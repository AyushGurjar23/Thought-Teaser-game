let gameseq = [];
let userSeq = [];

let btns = ["red", "blue", "yellow", "purple"]

let started = false;
let level = 0;

let h2 = document.querySelector("h2")

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game start");
        started = true;

        levelup();
    }
});

function gameflash(btn){ 
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
    
}


function userflash(btn){
    btn.classList.add("userflash");

    setTimeout(function(){
        btn.classList.remove("userflash");
    },250)
    
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level: ${level}`; 
    
    let randidx = Math.floor(Math.random() * 3);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    
     gameseq.push(randcolor);
     console.log(gameseq);
    gameflash(randbtn);
}

function checkans(idx){
    if (userSeq[idx] == gameseq[idx]) {
        if (userSeq.length == gameseq.length){
            setTimeout(levelup,1000)
        }
    } else {
        h2.innerHTML = `GAME OVER...!  You'r score was: <b>${level}</b> </br> Press any Key to Start. `; 
        document.querySelector("body").style.backgroundColor = "red"
        setTimeout( function(){
           document.querySelector("body").style.backgroundColor = "white"
        }, 150)
        reset();
    }
}

function btnpress(){
    
    let btn = this;
    userflash(btn);

    usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkans(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".box");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset(){
    started = false;
    gameseq = [];
    userSeq  = [];
    level = 0;
    
}
    
// code for move line

let path = "M 0 100   Q 500 100  990 100"
let fpath = "M 0 100   Q 500 100  990 100"
let line = document.querySelector(".line")

line.addEventListener("mousemove", function(dets){
    path = `M 0 100   Q 500 ${dets.y} 990 100`

    gsap.to("svg path",{
        attr:{d:path},
        duration:0.1,
        ease:"power3.out"
    })
})

line.addEventListener("mouseleave", function(){
    gsap.to("svg path",{
        attr:{d:fpath},
        duration:0.2,
        sase:"elastic.out(1,0.2)"
    })
})