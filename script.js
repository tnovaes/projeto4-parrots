let count = 0;
let nCards = 0;
let deck = [];


function turnCard(card) {
    card.firstElementChild.classList.add("back-face");
    card.lastElementChild.classList.remove("back-face");
}

function start() {
    nCards = Number(prompt("Quantas cartas terão no jogo?"));
    while (!(nCards % 2 === 0 && nCards >= 4 && nCards <= 14)) {
        nCards = prompt("Só é permitido números pares entre 4 e 14!")
    }
}

function displayCards(nCards) {
    for (let i = (nCards / 2); i > 0; i--) {
        deck.push(i);
        deck.push(i);
    }
    deck.sort(compare);
    console.log(deck);
    console.log(deck.length);
    for(let i = (deck.length - 1); i >= 0; i--){
        console.log(deck[i]);
        document.querySelector(".container").innerHTML += `
            <div class="card" onclick="turnCard(this)">
                <div class="face">
                    <img src="./imagens/back.png" alt="Verso da Carta">
                </div>
                <div class="back-face face">
                    <img src="./imagens/carta${deck[i]}.gif" alt="Frente da Carta">
                </div>
            </div>`;
    }
}

function compare() {
    return Math.random() - 0.5;
}

start();
displayCards(nCards);