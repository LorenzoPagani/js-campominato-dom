let grid = document.getElementById('grid')
const playBtn = document.getElementById('playGame')
const difficultyToggler = document.getElementById('difficulty')
const score = document.getElementById('score')
playGame()
function playGame() {
  let scoreCounter = []
  let randombox = []
  playBtn.addEventListener('click', function () {
    let gridSize = getGridSize()
    resetGrid()
    resetScore()
    resetBombs()
    createGrid(gridSize)
    createBombs(gridSize)
  })
}
function createGrid (cellnum) {
  for (let i = 1; i <= cellnum; i++) {
    let cell = generateSquare(i)
    grid.appendChild(cell)
  }
}
function resetGrid () {
  grid.innerHTML = ''
}
function generateSquare (number) {
  const cell = document.createElement('div')
  cell.classList.add('square')
  cell.classList.add(difficultyToggler.value)
  let gridSize = getGridSize();
  cell.innerHTML = number
  cell.addEventListener('click', function () {
    if (randombox.includes(number)) {
      cell.classList.add('bomba')
      grid.innerHTML = `<video src="Metal gameOver.mp4" autoplay><source src="Metal gameOver.mp4" ></video>`
    } else if (!scoreCounter.includes(number)) {
      scoreCounter.push(number)
      score.innerHTML = `SCORE: ${scoreCounter.length}`
      cell.classList.add('highlight')
    }
    if (scoreCounter.length == gridSize - randombox.length) {
      const winSound = document.getElementById('winSound')
      winSound.play()
      grid.innerHTML = `<img 
        src="https://i.pinimg.com/originals/69/d7/21/69d72110207a680dafb3f4c3f3bd1238.gif"alt>`
    }
  })
  return cell
}
function createBombs (maxNum) {
  while (randombox.length < 16) {
    const random = getRndInteger(1, maxNum)
    if (!randombox.includes(random)) {
      randombox.push(random)
    }
  }
}
function resetBombs () {
  randombox = []
}
function resetScore () {
  score.innerHTML = 'SCORE:'
  scoreCounter = []
}
function getRndInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function getGridSize() {
  if (difficultyToggler.value == 'easy') {
    return 100;
  } else if (difficultyToggler.value == 'medium') {
    return 81;
  } else if (difficultyToggler.value == 'hard') {
    return 49;
  }
}
