const btn_start = document.getElementById('btn-start')
const green = document.getElementById('green')
const red = document.getElementById('red')
const yellow = document.getElementById('yellow')
const blue = document.getElementById('blue')
const level_board = document.getElementById('levelboard')
const txt_level = document.getElementById('level')

const INITIAL_LEVEL = 1
const MAX_LEVEL = 10


class Game {

  constructor() {
    let that = this
    this.inactiveButton()
    txt_level.textContent = INITIAL_LEVEL

    setTimeout(function(){
      that.initialize()
      that.generateSequence()
      that.nextLevel()
    }, 2000)

  }

  initialize() {
    this.nextLevel = this.nextLevel.bind(this)
    this.selectColor = this.selectColor.bind(this)
    this.printLevel = this.printLevel.bind(this)
    this.level = INITIAL_LEVEL
    this.colors = {
      green,
      red,
      yellow,
      blue
    }
  }

  inactiveButton() {
    btn_start.style.display = 'none'
    level_board.style.opacity = 1
  }

  activeButton() {
    btn_start.style.display = 'block'
    level_board.style.opacity = 0
  }

  printLevel() {
    txt_level.textContent = this.level
    this.animationLevel = txt_level.animate([
      {
        fontSize: '45px'
      },
      {
        fontSize: '25px'
      }
    ],{
      duration: 800,
      direction: 'normal',
      easing: 'linear'
    })
  }

  generateSequence() {
    this.sequence = new Array(MAX_LEVEL).fill(0).map(n => Math.floor((Math.random() * 4)))
  }

  nextLevel(){
    this.sublevel = 0
    this.iluminateSequence()
    this.addEventsClick()
  }

  transformNumColor(number) {
    switch (number) {
      case 0:
        return 'green'
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      case 3:
        return 'blue'
    }
  }

  transformColorNum(color) {
    switch (color) {
      case 'green':
        return 0
      case 'red':
        return 1
      case 'yellow':
        return 2
      case 'blue':
        return 3
    }
  }

  iluminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.transformNumColor(this.sequence[i])
      setTimeout(() => this.iluminateColor(color), 1000 * i)
    }
  }

  iluminateColor(color){
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOffColor(color), 350)
  }

  turnOffColor(color){
    this.colors[color].classList.remove('light')
  }

  addEventsClick(){
    this.colors.green.addEventListener('click', this.selectColor)
    this.colors.red.addEventListener('click', this.selectColor)
    this.colors.yellow.addEventListener('click', this.selectColor)
    this.colors.blue.addEventListener('click', this.selectColor)
  }

  removeEventsClick(){
    this.colors.green.removeEventListener('click', this.selectColor)
    this.colors.red.removeEventListener('click', this.selectColor)
    this.colors.yellow.removeEventListener('click', this.selectColor)
    this.colors.blue.removeEventListener('click', this.selectColor)
  }

  selectColor(ev) {
    const nameColor = ev.target.dataset.color
    const numberColor = this.transformColorNum(nameColor)

    this.iluminateColor(nameColor)

    if (numberColor === this.sequence[this.sublevel]) {

      this.sublevel++

      if(this.sublevel === this.level) {

        this.level++
        this.removeEventsClick()

        if (this.level === (MAX_LEVEL + 1)) {
          this.gameWon()

        } else {
          setTimeout(this.nextLevel, 1800)
          setTimeout(this.printLevel, 500)
        }
      }

    } else {
        this.gameOver()
    }
  }

  gameWon(){
    swal('Felicidades!','Has ganado!', 'success')
      .then(this.initialize.bind(this))
      btn_start.style.display = 'block'
      level_board.style.opacity = 0
  }

  gameOver(){
    swal('Oooooh!', 'Has perdido!', 'error')
      .then(() => {
        this.removeEventsClick()
        this.initialize()
        this.activeButton()
      })
  }
}

function startGame() {
  window.game = new Game()
}
