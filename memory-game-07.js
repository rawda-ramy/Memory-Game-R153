let startGates = document.querySelector(".start"),
  rightSide = document.querySelector(".right-side"),
  leftSide = document.querySelector(".left-side"),
  playerName = document.querySelector(".player-name"),
  startGamebutton = document.querySelectorAll(".start button")[0],
  gameMenubutton = document.querySelectorAll(".start button")[1],
  StylesArray = [
    "fruitstyle_Function",
    "winterstyle_Function",
    "desertstyle_Function",
    "ancientLandmarksstyle_Function",
  ],
  menu = document.querySelector(".menu"),
  styleSheet = document.querySelector(".style-sheet"),
  styleTitle = document.querySelector("title"),
  styles = document.querySelectorAll(".styles img"),
  fruitStyle = document.querySelector(".fruit-style"),
  winterStyle = document.querySelector(".winter-style"),
  ancientLandmarksstyle = document.querySelector(".ancient-landmarks-style"),
  desertStyle = document.querySelector(".desert-style"),
  image1 = document.querySelectorAll("#image1"),
  image2 = document.querySelectorAll("#image2"),
  image3 = document.querySelectorAll("#image3"),
  image4 = document.querySelectorAll("#image4"),
  image5 = document.querySelectorAll("#image5"),
  image6 = document.querySelectorAll("#image6"),
  endingVideo = document.querySelector(".ending-video"),
  overLays = Array.from(document.querySelectorAll(".overlay")),
  cards = Array.from(document.querySelectorAll("#card")),
  trueTries = document.querySelector(".true-tries p"),
  trueLight = document.querySelector(".true-tries .icon"),
  falseTries = document.querySelector(".false-tries p"),
  falseLight = document.querySelector(".false-tries .icon"),
  gameContainer = document.querySelector(".game-container"),
  gameOver = document.querySelector(".game-over"),
  tryAgain = document.querySelector(".try-again"),
  nextLevel = document.querySelector(".next-level"),
  level = document.querySelector(".level"),
  stars = document.querySelectorAll(".rate i");

// Programe Audio
let clickAudio = new Audio("audio/click-sound.mp3"),
  trueAudio = new Audio("audio/true-answer.mp3"),
  falseAudio = new Audio("audio/false-answer.mp3"),
  endingGameAudio = new Audio("audio/ending-game-sound"),
  startGameAudio = new Audio("audio/starting-game-sound.mp3"),
  playAgainAudio = new Audio("audio/play-again-sound"),
  memoryGameaudio = new Audio("audio/memory_game_sound.mp3");

// The function of the primary Turn
function primaryTurn(eo) {
  eo.parentElement.classList.add("flipped");
  eo.nextElementSibling.classList.add("img-turn");
}

// A function to turn the image again if it's wrong turn

let trueCounter = 0;
let falseCounter = 0;

// the function of the right cards

function winTurn(eo) {
  trueCounter = trueCounter + 0.5;
  trueTries.innerHTML = "True tries : " + trueCounter;
  trueAudio.play();
  trueLight.classList.add("true-light");
  setTimeout(() => {
    memoryGameaudio.play();
    trueLight.classList.remove("true-light");
  }, 1000);
  overLays.forEach((overLay) => {
    overLay.parentElement.classList.remove("disabled");
    overLay.parentElement.classList.remove("flipped");
  });
}

function falseTurn(eo) {
  eo.nextElementSibling.classList.remove("img-turn");
  falseAudio.play();
  falseCounter += 0.5;
  falseTries.innerHTML = "False tries : " + falseCounter;
  falseLight.classList.add("false-light");
  setTimeout(() => {
    falseLight.classList.remove("false-light");
    memoryGameaudio.play();
  }, 1000);
  overLays.forEach((overLay) => {
    overLay.parentElement.classList.remove("disabled");
    overLay.parentElement.classList.remove("flipped");
  });
}
// Game Opener Function

function gameOpener() {
  rightSide.classList.add("right-side-animation");
  leftSide.classList.add("left-side-animation");
  setTimeout(() => {
    startGates.classList.add("display-none");
  }, 2000);
  startGameAudio.play();
  setTimeout(() => {
    let YourName = prompt("Hello, What is your name");
    setTimeout(() => {
      overLays.forEach((img) => {
        img.nextElementSibling.classList.add("img-turn");
        img.classList.remove("wrong");
        setTimeout(() => {
          img.nextElementSibling.classList.remove("img-turn");
          memoryGameaudio.play();
        }, 3500);
      });
    }, 1000);
    if (YourName == "") {
      playerName.innerHTML += "Player's Score";
    } else {
      playerName.innerHTML += YourName + " 's Score :";
    }
  }, 2000);
}

// Start Game Button Action

startGamebutton.onclick = () => {
  gameOpener();
  let randomNamberStyle = Math.floor(Math.random() * StylesArray.length),
    randomStyle = StylesArray[randomNamberStyle];

  if (randomNamberStyle == 0) {
    fruitstyle_Function();
  }

  if (randomNamberStyle == 1) {
    winterstyle_Function();
  }

  if (randomNamberStyle == 2) {
    desertstyle_Function();
  }

  if (randomNamberStyle == 3) {
    ancientLandmarksstyle_Function();
  }
};

// Styles Transation

styles.forEach((style) => {
  style.onclick = () => {
    gameOpener();
  };
});

// Main Code
overLays.forEach((overLay, index) => {
  let newArray = Array(overLays.length),
    newArrayKeys = Array(...newArray.keys()),
    randomNamber = Math.floor(Math.random() * newArrayKeys.length);
  overLay.parentElement.style.order = randomNamber;
  overLays[randomNamber].parentElement.style.order = index;

  overLay.addEventListener("click", (eo) => {
    clickAudio.play();
    if ((eo.target.className = "overlay")) {
      primaryTurn(eo.target);
    }

    let flippedCardsOverlay = document.querySelectorAll(".flipped .overlay");
    if (flippedCardsOverlay[0].id == flippedCardsOverlay[1].id) {
      setTimeout(() => {
        winTurn(flippedCardsOverlay[0]);
        winTurn(flippedCardsOverlay[1]);

        // Game Ending

        let hiddenCards = Array.from(document.querySelectorAll(".img-turn"));
        if (hiddenCards.length == cards.length) {
          setTimeout(() => {
            memoryGameaudio.pause();
            memoryGameaudio.currentTime = 0;
            endingGameAudio.play();
            setTimeout(() => {
              cards.forEach((card) => {
                card.classList.add("win-turn");
              });
            }, 1500);
            setTimeout(() => {
              setTimeout(() => {
                playAgainAudio.play();
                gameOver.style.display = "block";

                // Win Stars Conditions

                if (
                  falseCounter == 0 ||
                  falseCounter == 1 ||
                  falseCounter == 2
                ) {
                  level.innerHTML = "Great Job";
                  stars.forEach((star) => {
                    star.style.opacity = "1";
                  });
                  setInterval(() => {
                    stars[0].classList.add("star-animation");
                    setTimeout(() => {
                      stars[0].classList.remove("star-animation");
                      // Start The Second Star Animation
                      stars[1].classList.add("star-animation");
                      setTimeout(() => {
                        stars[1].classList.remove("star-animation");
                        // Start The Third Star Animation
                        stars[2].classList.add("star-animation");
                        setTimeout(() => {
                          stars[2].classList.remove("star-animation");
                        }, 100);
                      }, 100);
                    }, 100);
                  }, 400);
                }

                // if (falseCounter == 2 || falseCounter == 3) {
                if (falseCounter == 3) {
                  level.innerHTML = "Very Good";
                  stars[0].style.opacity = "1";
                  stars[1].style.opacity = "1";
                  setInterval(() => {
                    stars[0].classList.add("star-animation");
                    setTimeout(() => {
                      stars[0].classList.remove("star-animation");
                      // Start The Second Star Animation
                      stars[1].classList.add("star-animation");
                      setTimeout(() => {
                        stars[1].classList.remove("star-animation");
                      }, 100);
                    }, 100);
                  }, 400);
                }

                if (falseCounter == 4 || falseCounter == 5) {
                  level.innerHTML = "Not Bad !";
                  stars[0].style.opacity = "1";
                  setInterval(() => {
                    stars[0].classList.add("star-animation");
                    setTimeout(() => {
                      stars[0].classList.remove("star-animation");
                    }, 100);
                  }, 400);
                }
              }, 1100);

              cards.forEach((card) => {
                card.classList.remove("win-turn");
                overLays.forEach((overlay) => {
                  overlay.nextElementSibling.classList.remove("img-turn");
                });
                card.style.marginLeft = "125px";
                gameContainer.classList.add("ending-game-container");
                setTimeout(() => {
                  marginPx = -100;
                  let cardsRoll = setInterval(() => {
                    marginPx -= 1;
                    let marginValue = marginPx + "px";
                    card.style.marginLeft = marginValue;
                    setTimeout(() => {
                      clearInterval(cardsRoll);
                    }, 258);
                  }, 50);
                }, 100);
              });
            }, 3000);
          }, 1500);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        falseTurn(flippedCardsOverlay[0]);
        falseTurn(flippedCardsOverlay[1]);
      }, 1000);
    }
    let flippedCards = document.querySelectorAll(".flipped");
    if (flippedCards.length === 2) {
      flippedCards.forEach((flippedCard) => {
        flippedCard.classList.add("abled");
      });
      overLays.forEach((item) => {
        item.parentElement.classList.add("disabled");
      });
    }
  });
});

//Try Again Button Action

tryAgain.addEventListener("click", () => {
  window.location.reload();
});

// Menu Button Action

gameMenubutton.onclick = () => {
  menu.style.display = "block";
  menu.classList.add("menu-animation");
  menu.addEventListener("click", (eo) => {
    let title = eo.target.getAttribute("alt");
    styleTitle.innerHTML += ": " + title;
  });
};

// Fruit Style Transition

function fruitstyle_Function() {
  styleSheet.setAttribute("href", "style-01.css");
  memoryGameaudio = new Audio("audio/fruit music.mp3");
  menu.style.display = "none";

  image1.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-01/grapes.jpg");
  });

  image2.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-01/banana.jpg");
  });

  image3.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-01/avocado.jfif");
  });

  image4.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-01/blue berry.jpg"
    );
  });

  image5.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-01/orange.jpg");
  });

  image6.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-01/appel.jpeg");
  });
}

fruitStyle.addEventListener("click", () => {
  fruitstyle_Function();
});

// Winter Style Transition

function winterstyle_Function() {
  styleSheet.setAttribute("href", "style-02.css");
  memoryGameaudio = new Audio("/audio/winter music.wav");
  menu.style.display = "none";

  image1.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-02/winter love.jpg"
    );
  });

  image2.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-02/winter festival.webp"
    );
  });

  image3.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-02/winter snowman.jpg"
    );
  });

  image4.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-02/winter view.jpg"
    );
  });

  image5.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-02/winter drink.jpg"
    );
  });

  image6.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-02/winter wolf.jpg"
    );
  });

  endingVideo.setAttribute(
    "src",
    "Images/style-02/winter ending background.mp4"
  );
}

winterStyle.addEventListener("click", () => {
  winterstyle_Function();
});

// Desert Style Transition

function desertstyle_Function() {
  styleSheet.setAttribute("href", "style-03.css");
  memoryGameaudio = new Audio("audio/desert misic.m4a");
  menu.style.display = "none";

  image1.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-03/cactus.jpg");
  });

  image2.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-03/camels.jpg");
  });

  image3.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-03/safari.jpg");
  });

  image4.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-03/desert night.jfif"
    );
  });

  image5.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-03/desert cars.jpg"
    );
  });
  image6.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-03/desert camping.jpg"
    );
  });

  endingVideo.setAttribute(
    "src",
    "Images/style-03/desert ending background.mp4"
  );
}

desertStyle.addEventListener("click", () => {
  desertstyle_Function();
});

// Ancient Landmarks Style Transition

function ancientLandmarksstyle_Function() {
  styleSheet.setAttribute("href", "style-04.css");
  memoryGameaudio = new Audio("audio/ancient music.mp3");
  menu.style.display = "none";

  image1.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-04/sphinx.jpg");
  });

  image2.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-04/liberty statue.jpeg"
    );
  });

  image3.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-04/big ben.jpg");
  });

  image4.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-04/effil tower.jpg"
    );
  });

  image5.forEach((img) => {
    img.nextElementSibling.setAttribute(
      "src",
      "Images/style-04/khalifa tower.jpg"
    );
  });
  image6.forEach((img) => {
    img.nextElementSibling.setAttribute("src", "Images/style-04/greak.jpg");
  });

  endingVideo.setAttribute(
    "src",
    "Images/style-04/ancient landmarks ending background.mp4"
  );
}

ancientLandmarksstyle.addEventListener("click", () => {
  ancientLandmarksstyle_Function();
});
