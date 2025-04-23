const emojis = ['🍕', '🎈', '🎮', '🚀', '🍩', '🐱', '🍓', '⚽'];
let gameBoard = document.getElementById('gameBoard');
let restartBtn = document.getElementById('restart');
let cards = [];
let flipped = [];
let lock = false;

function shuffle(array) {
  return [...array, ...array].sort(() => 0.5 - Math.random());
}

function createBoard() {
  gameBoard.innerHTML = '';
  flipped = [];
  lock = false;
  const shuffled = shuffle(emojis);
  cards = [];

  shuffled.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = '❓';

    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
    cards.push(card);
  });
}

function flipCard(card) {
  if (lock || flipped.includes(card) || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  card.innerText = card.dataset.emoji;
  flipped.push(card);

  if (flipped.length === 2) {
    lock = true;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    card1.classList.add('matched');
    card2.classList.add('matched');
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    card1.innerText = '❓';
    card2.innerText = '❓';
  }
  flipped = [];
  lock = false;

  if (document.querySelectorAll('.card.matched').length === cards.length) {
    setTimeout(() => alert('🎉 You matched all the cards!'), 200);
  }
}

restartBtn.addEventListener('click', createBoard);

createBoard();
