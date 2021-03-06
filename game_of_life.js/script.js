var socket = io();
side = 20;




function setup() {
    frameRate(5);
    music();
    createCanvas(30 * side, 30 * side);
    background('#acacac');
    
    
    const labels = [
        'Grass',
        'GrassEater',
        'Predator',
        'Trap',
        'Vampire'
    ];



    const data = {
        labels: labels,
        datasets: [{
            label: ' ',
            backgroundColor: ["green", "yellow", "orange", "red", "black"],
            borderColor: 'rgb(255, 99, 132)',
            hoverOffset: 4,
            data: [70,70,70,70,70],
        }]
    };

    socket.on("send state", (count)=> {
        myChart.data.datasets[0].data = [count.grass,count.grassEater,count.predator,count.trap,count.vampire];
        myChart.update();
    })

    const config = {
        type: 'doughnut',
        data: data,
    }

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}


weath = 'summer';
function winter() {
    weath = 'winter';

}
function spring() {
    weath = 'spring';

}
function summer() {
    weath = 'summer';

}
function autumn() {
    weath = 'autumn';

}



function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            var toBot = side - side * 0.3
            textSize(toBot);
            if (matrix[y][x] == 1) {
                fill("green");
                if (weath == "winter") {
                    fill("white");
                    rect(x * side, y * side, side, side);
                    text('🌿', x * side, y * side + toBot);
                    //setInterval(() => { weath = "spring" }, 8000);
                } else if (weath == "spring") {
                    fill("yellowgreen");
                    rect(x * side, y * side, side, side);
                    text('🌿', x * side, y * side + toBot);
                    //setInterval(() => { weath = "summer" }, 8000);
                } else if (weath == "summer") {
                    fill("green");
                    rect(x * side, y * side, side, side);
                    text('🌿', x * side, y * side + toBot);
                    //setInterval(() => { weath = "autumn" }, 8000);
                } else if (weath == "autumn") {
                    fill("#FED32A");
                    rect(x * side, y * side, side, side);
                    text('🌾', x * side, y * side + toBot);
                    //setInterval(() => { weath = "winter" }, 8000);
                }

            }
            else if (matrix[y][x] == 0) {
                if (weath == 'winter') {
                    fill("#00f5e4");
                }
                else if (weath == 'spring') {
                    fill("#fff799");
                }
                else if (weath == 'summer') {
                    fill("#FCF6B1");
                }
                else if (weath == 'autumn') {
                    fill("#fffaba");
                }
                rect(x * side, y * side, side, side);

            } else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
                text('🐇', x * side, y * side + toBot);
            } else if (matrix[y][x] == 3) {
                fill("orange");
                rect(x * side, y * side, side, side);
                text("🐆", x * side, y * side + toBot);
            } else if (matrix[y][x] == 4) {
                fill("red");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
                text('👾', x * side, y * side + toBot);
            }


        }
    }

}


socket.on('send matrix', nkarel);


function addGrass() {
    socket.emit("add Grass");
}

function addGrassEater() {
    socket.emit("add grassEater");
}

function addPredator() {
    socket.emit("add Predator");
}

function addTrap() {
    socket.emit("add Trap");
}

function addVampire() {
    socket.emit("add Vampire");
}

function kill() {
    socket.emit("kill");
}


//////// music 


function music() {

    const sound = document.querySelector("#sound");
    const music = document.querySelector("#music");
    const musicIcon = document.querySelector("#musicIcon");

    music.src = "music/gameMusic.mp3";

    sound.addEventListener("click", () => {
        if (music.paused == false) {
            music.pause();
            musicIcon.classList.remove("fa-volume-high");
            musicIcon.classList.add("fa-volume-xmark");
        }
        else {
            music.play();
            musicIcon.classList.remove("fa-volume-xmark");
            musicIcon.classList.add("fa-volume-high");
        }
    })

}

///////  game info

// slider
function infoGame() {
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    const info = document.querySelector("#info");
    const infoIcon = document.querySelector("#infoIcon");
    const closeInfo = document.querySelector("#close-info");

    
    infoIcon.addEventListener("click", () => {
        info.style.display = "block";
    });
    closeInfo.addEventListener("click", () => {
        info.style.display = "none";
    });

}

infoGame();
