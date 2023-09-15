document.addEventListener("DOMContentLoaded", function() {
    let level = 1;
    let sequenceArray = [];
    let userClickIndex = 0;
    let gameStarted = false;

    function preview(id) {
        const clicked = document.querySelector(`#${id}`);
        clicked.classList.toggle("pressed");
        const audio = new Audio(`./sounds/${id}.mp3`);
        audio.play();
        setTimeout(function() {
            clicked.classList.toggle("pressed");
        }, 150);
    }

    function pushInArray(num) {
        if (num === 1) {
            sequenceArray.push("green");
        } else if (num === 2) {
            sequenceArray.push("red");
        } else if (num === 3) {
            sequenceArray.push("yellow");
        } else {
            sequenceArray.push("blue");
        }
    }

    document.addEventListener("keypress", function() {
        for(let i=0; i<4; i++) {
            document.querySelectorAll(".btn")[i].addEventListener("click", function() {
                id = this.id;
                preview(id);
                checkPress(id);
            });
        }

        if(!gameStarted) {
            document.removeEventListener("keypress", arguments.callee);
            gameStarted = true;
            startGame();
        }

        function startGame() {
            generateNextStep();
        }

        function generateNextStep() {
            let randomNumber = Math.floor(Math.random()*4) + 1;
            pushInArray(randomNumber);
            document.querySelector("#level-title").innerHTML = `Level: ${level}`;
            level++;
            playSequence();
        }

        function playSequence() {
            let i = 0;
            const interval = setInterval(function() {
                preview(sequenceArray[i]);
                i++;
                if(i===sequenceArray.length) {
                    clearInterval(interval);
                }
            }, 1000);
        }

        function checkPress(id) {
            if(id===sequenceArray[userClickIndex]) {
                userClickIndex++;
                if(userClickIndex===sequenceArray.length) {
                    userClickIndex = 0;
                    setTimeout(generateNextStep, 1000);
                }
            }
            else {
                const audio = new Audio("./sounds/wrong.mp3");
                audio.play();
                let score = level-2;
                if(level<0) score = 0;
                document.querySelector("#level-title").innerHTML = "You lost, your score is " + score;
                setTimeout(function() {
                    location.reload();
                }, 2000);
            }
        }
    });
});