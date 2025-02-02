const griddisplay = document.querySelector("#grid");

let cardArray = [
  { name: "apple", img: "images/apple.webp" },
  { name: "banana", img: "images/banana.webp" },
  { name: "guava", img: "images/guava.jpg" },
  { name: "orange", img: "images/orange.jpg" },
  { name: "strawberry", img: "images/strawberry.jpg" },
  { name: "watermelon", img: "images/watermelon.jpg" },
  { name: "apple", img: "images/apple.webp" },
  { name: "banana", img: "images/banana.webp" },
  { name: "guava", img: "images/guava.jpg" },
  { name: "orange", img: "images/orange.jpg" },
  { name: "strawberry", img: "images/strawberry.jpg" },
  { name: "watermelon", img: "images/watermelon.jpg" },
];

let card_chosen = [];
let card_chosen_id = [];
let matchedPairs = 0;

// Shuffle the cards and create the game board
function createBoard() {
  cardArray.sort(() => 0.5 - Math.random());
  griddisplay.innerHTML = "";
  matchedPairs = 0;
  card_chosen = [];
  card_chosen_id = [];

  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/bg.jpg");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipCard);
    griddisplay.appendChild(card);
  }
}

// Flip a card
function flipCard() {
  const cardId = this.getAttribute("data-id");

  if (card_chosen_id.includes(cardId)) return;

  this.setAttribute("src", cardArray[cardId].img);
  card_chosen.push(cardArray[cardId].name);
  card_chosen_id.push(cardId);

  if (card_chosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

// Check if two flipped cards match
function checkMatch() {
  const cards = document.querySelectorAll("img");
  const [firstId, secondId] = card_chosen_id;

  if (card_chosen[0] === card_chosen[1]) {
    cards[firstId].removeEventListener("click", flipCard);
    cards[secondId].removeEventListener("click", flipCard);
    matchedPairs++;
  } else {
    cards[firstId].setAttribute("src", "images/bg.jpg");
    cards[secondId].setAttribute("src", "images/bg.jpg");
  }

  card_chosen = [];
  card_chosen_id = [];

  if (matchedPairs === cardArray.length / 2) {
    alert("🎉 Congratulations! You won!");
  }
}

// Initialize the game
createBoard();
