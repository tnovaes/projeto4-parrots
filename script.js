let count = 0;
let nCards = 0;
let deck = [];
let firstCard;
let points = 0;
let time = 0;
let idInterval;
let click = true;

function start() {
    nCards = Number(prompt("Quantas cartas terão no jogo?"));
    while (!(nCards % 2 === 0 && nCards >= 4 && nCards <= 14)) {
        nCards = prompt("Só é permitido números pares entre 4 e 14!")
    }
    displayCards(nCards);
    idInterval = setInterval(clock, 1000);
}

function displayCards(nCards) {
    for (let i = (nCards / 2); i > 0; i--) {
        deck.push(i);
        deck.push(i);
    }

    deck.sort(compare);

    for (let i = (deck.length - 1); i >= 0; i--) {
        document.querySelector(".container").innerHTML += `
            <div data-test="card" class="card" onclick="turnCard(this)">
                <div class="face">
                    <img data-test="face-down-image" src="./imagens/back.png" alt="Verso da Carta">
                </div>
                <div class="back-face face">
                    <img data-test="face-up-image" src="./imagens/carta${deck[i]}.gif" alt="Frente da Carta">
                </div>
            </div>`;
    }
}

function compare() {
    return Math.random() - 0.5;
}

function turnCard(card) {
    if (click === true) {
        card.firstElementChild.classList.add("back-face");
        card.lastElementChild.classList.remove("back-face");

        if (count === 0) {
            firstCard = card;
        }

        if (firstCard !== card) {

            if (count % 2 !== 0) {
                if (card.innerHTML === firstCard.innerHTML) {
                    card.removeAttribute("onclick");
                    firstCard.removeAttribute("onclick");
                    points++;

                }
                else {
                    click = false;
                    setTimeout(turnBack, 1000, card);
                    setTimeout(turnBack, 1000, firstCard);

                }

            }
        }

        firstCard = card;

        count++;
        console.log(count);

        if (points === nCards / 2) {
            alert("Você ganhou em " + count + " jogadas! A duração do jogo foi de " + time + " segundos!");
            let restart;
            while (restart !== "não") {
                restart = prompt("Você deseja jogar novamente? (Digite 'sim' ou 'não')");
                if (restart === "sim") {
                    clearInterval(idInterval);
                    location.reload();
                }

            }
        }
    }
}

function turnBack(card) {
    card.firstElementChild.classList.remove("back-face");
    card.lastElementChild.classList.add("back-face");
    click = true;
}

function clock() {
    time++;
    document.querySelector('.timer').innerHTML = time;
}

start();