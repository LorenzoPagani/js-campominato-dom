let grid = document.getElementById('grid')
const playBtn = document.getElementById('playGame')
const difficultyToggler = document.getElementById('difficulty')
const score = document.getElementById('score')
let scoreCounter = []
let randombox = []

playBtn.addEventListener('click', function () {
  if (difficultyToggler.value == 'easy') {
    resetGrid()
    resetScore()
    resetBombs()
    createGrid(100)
    createBombs(100)
  } else if (difficultyToggler.value == 'medium') {
    resetGrid()
    resetScore()
    resetBombs()
    createGrid(81)
    createBombs(81)
  } else if (difficultyToggler.value == 'hard') {
    resetGrid()
    resetScore()
    resetBombs()
    createGrid(49)
    createBombs(49)
  }
})

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
  let gridSize
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
