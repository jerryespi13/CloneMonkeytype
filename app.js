//import { words as INIRIAL_WORDS} from './data.js'

const $time = document.querySelector('time')
const $paragraph = document.querySelector('p')
const $input = document.querySelector('input')

const INITIAL_TIME = 30

let intervalId

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
        return `<x-word>
            ${letters
                .map(letter => `<x-letter>${letter}</x-letter>`)
                .join('')}
        </x-word>`
    }).join('')

    const $firstWord = $paragraph.querySelector('x-word')
    $firstWord.classList.add('active')
    $firstWord.querySelector('x-letter').classList.add('active')
}

function initEvent(){
    document.addEventListener('keydown', ()=>{
        $input.focus()

        if(!intervalId){
            intervalId = setInterval(()=>{
                currentTime--
                $time.textContent = currentTime
                if(currentTime === 0){
                    clearInterval(intervalId)
                    gameOver()
                }
            }, 1000)
        }
    })

    $input.addEventListener('keydown', onKeyDown)
    $input.addEventListener('keyup', onKeyUp)
}

function onKeyDown(){

}

function onKeyUp(){
    // recuperamos los elementos actuales
    const $currentWord = $paragraph.querySelector('x-word.active')
    const $currentLetter = $paragraph.querySelector('x-letter.active')

    const currentWord = $currentWord.innerText.trim()
    $input.maxLength = currentWord.length

    // obtenemos todas las letras de la palabra a escribir
    const $allLetters = $currentWord.querySelectorAll('x-letter')
  

    // quitamos las clases correct e incorrect
    $allLetters.forEach($letter => $letter.classList.remove('correct', 'incorrect'))

    // obtenemos lo que el usuario a escrito y comparamos letra a letra
    $input.value.split('').forEach((char,index) =>{
        // letra a cambiar estilo en dependencia de si 
        // la escribe bien o mal
        const $letter = $allLetters[index]

        // letra a comparar
        const letterToCheck = currentWord[index]

        // char es la letra escrita por el usuario
        // aqui se comparan las letras
        const isCorrect = char === letterToCheck

        // si coinciden se le agrega la clase correct a la letra en el DOM
        // si no, se le agrega incorrect
        const letterClass = isCorrect ? 'correct' : 'incorrect'
        $letter.classList.add(letterClass)

    })
}

function gameOver(){
    console.log("game over")
}