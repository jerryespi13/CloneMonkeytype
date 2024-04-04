//import { words as INIRIAL_WORDS} from './data.js'

const $time = document.querySelector('time')
const $paragraph = document.querySelector('p')
const $input = document.querySelector('input')

const INITIAL_TIME = 30

const TEXT = `este es un texto de prueba para poder
hacer testeo de la app en un inicio así que posiblemente
luego cambie por otro`

let words = []
let currentTime = INITIAL_TIME

initGame()
initEvent()

function initGame(){
    words =TEXT.split(' ').slice(0, 32)
    currentTime = INITIAL_TIME

    $time.textContent = currentTime

    $paragraph.innerHTML = words.map((word, index) => {
        const letters = word.split('')
        console.log(letters)
        
        return `<x-word>
            ${letters
                .map(letter => `<x-letter>${letter}</x-letter>`)
                .join('')}
        </x-word>`
    }).join('')

    const $firstWord = $paragraph.querySelector('x-word')
    $firstWord.classList.add('active')
    $firstWord.querySelector('x-letter').classList.add('active')

    


    const intervalId = setInterval(()=>{
        currentTime--
        $time.textContent = currentTime
        if(currentTime === 0){
            clearInterval(intervalId)
            gameOver()
        }
    }, 1000)
}

function initEvent(){

}

function gameOver(){
    console.log("game over")
}