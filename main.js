let grid = document.getElementById('grid')
const playBtn = document.getElementById('playGame')
const difficultyToggler = document.getElementById('difficulty')
const score = document.getElementById('score')
let scoreCounter = []
let randombox = []

playBtn.addEventListener('click', function () {
  if (difficultyToggler.value == 'easy') {
    eraseGrid()
    resetScore()
    generateGrid(100)
    resetBombs()
    createBombs(100)
  } else if (difficultyToggler.value == 'medium') {
    eraseGrid()
    resetScore()
    generateGrid(81)
    resetBombs()
    createBombs(81)
  } else if (difficultyToggler.value == 'hard') {
    eraseGrid()
    resetScore()
    generateGrid(49)
    resetBombs()
    createBombs(49)
  }
})
function generateGrid (cellnum) {
  for (let i = 1; i <= cellnum; i++) {
    let cell = generateSquare(i)
    grid.appendChild(cell)
  }
}
function eraseGrid () {
  grid.innerHTML = ''
}
function generateSquare (number) {
  const cell = document.createElement('div')
  cell.classList.add('square')
  let gridSize;
  if (difficultyToggler.value == 'easy') {
    cell.classList.add('easy')
    gridSize = 100
  } else if (difficultyToggler.value == 'medium') {
    cell.classList.add('medium')
    gridSize = 81
  } else if (difficultyToggler.value == 'hard') {
    cell.classList.add('hard')
    gridSize = 49
  }
  cell.innerHTML = number
  cell.addEventListener('click', function () {
    if (randombox.includes(number)) {
      cell.classList.add('bomba')
      grid.innerHTML = 'hai perso'
    } else if (!scoreCounter.includes(number)) {
      scoreCounter.push(number)
      score.innerHTML = `SCORE: ${scoreCounter.length}`
      cell.classList.add('highlight')
    }
    if (scoreCounter.length == gridSize - randombox.length) {
      grid.innerHTML = 'hai Vinto!!!'
    }
  })
  return cell
}
function createBombs (maxNum) {
  for (let i = 0; i < 16; i++) {
    const random = getRndInteger(1, maxNum)
    randombox.push(random)
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
