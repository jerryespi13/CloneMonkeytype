//import { words as INIRIAL_WORDS} from './data.js'

const $time = document.querySelector('time')
const $paragraph = document.querySelector('p')
const $input = document.querySelector('input')

const INITIAL_TIME = 300

const TEXT = `este es un texto de prueba para poder
hacar testeo de la app en un inicio así que posiblemente
luego cambie por otro`

let words = []
let currentTime = INITIAL_TIME

initGame()
initEvent()

function initGame(){
    words =TEXT.split(' ').slice(0, 32)
    currentTime = INITIAL_TIME

    $time.innerHTML = currentTime

    $paragraph.textContent = words.map(word => word + ' ').join('')
}

function initEvent(){

}