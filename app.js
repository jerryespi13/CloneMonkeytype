import { words_english as WORDS_ENGLISH} from './data.js'
import { words_spanish as WORDS_SPANISH} from './data.js'


const $time = document.querySelector('time')
const $paragraph = document.querySelector('p')
const $input = document.querySelector('input')

const INITIAL_TIME = 30

let intervalId


let words = []
let currentTime = INITIAL_TIME

initGame()
initEvent()


function initGame(){
    words =WORDS_SPANISH.toSorted(
    () => Math.random() - 0.5
    ).slice(0, 50)
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

function onKeyDown(event){
    const $currentWord = $paragraph.querySelector('x-word.active')
    const $currentLetter= $paragraph.querySelector('x-letter.active')
    
    const { key } = event
    if(key === ' '){
        event.preventDefault()

        // recuperamos el siguiente elemento hermano, en este caso la siguiente palabra
        const $nextWord = $currentWord.nextElementSibling
        // recuperamos la primera letra de la siguiente palabra
        const $nextLetter = $nextWord.querySelector('x-letter')

        // quitamos el active a la palabra y letra actual
        $currentWord.classList.remove('active', 'marked')
        $currentLetter.classList.remove('active')

        // añadimos el active a la siguiente palabra
        $nextWord.classList.add('active')
        $nextLetter.classList.add('active')

        // limpiamos el input para poder comparar la siguiente palabra
        $input.value = ''

        // verificamos si alguna letra sin escribir
        const hasMissedLetter = $currentWord
            .querySelectorAll('x-letter:not(.correct)').length > 0
        
        // si se ha olvidado escribir una letra sin escribir le agragamos
        // la clase marked para poder añadir un estilo con css e indicar 
        //que la palabra no fue escrita correctamente y 
        const classToAdd = hasMissedLetter ? 'marked' : 'correct'
        $currentWord.classList.add(classToAdd)
        return
    }

    if(key === 'Backspace'){
        // recuperamos el antarior elemento hermano, en este caso la anterior palabra
        const $prevWord = $currentWord.previousElementSibling
        // recuperamos la primera letra de la anterior palabra
        const $prevLetter = $currentLetter.previousElementSibling
        
        // si no hay palabra anterior no regresa a ninguna palabra anterior
        if(!$prevWord && !$prevLetter){
            event.preventDefault()
            return
        }

        // recuperamos la palabra mal escrita
        const $wordMarked = $paragraph.querySelector('x-word.marked')
        // si existe una palabra marcada(mal escrita) y no existe una letra anterio
        if($wordMarked && !$prevLetter){
            event.preventDefault()
            // a la palabra anterior que esta marcada se desmarca
            $prevWord.classList.remove('marked')
            // y se pone activa
            $prevWord.classList.add('active')

            // recuperamos a que letra de la palabra que estaba marcada debemos ir
            const $letterToGo = $prevWord.querySelector('x-letter:last-child')

            // le quitiamos el activo a la palabra actual
            $currentLetter.classList.remove('active')
            // y le ponemos el activo a la palabra que hay que corregir
            $letterToGo.classList.add('active')

            // llenamos el input con lo que el usuario habia mal escrito
            $input.value = [
                ...$prevWord.querySelectorAll('x-letter.correct, x-letter.incorrect')
            ].map($el => {
                return $el.classList.contains('correct') ? $el.innerText : '*'
            })
            .join('')
        }
    }

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
    // movemos el cursor
    // quitamos la clase active a la letra anterior
    $currentLetter.classList.remove('active', 'is-last')
    const inputLength = $input.value.length
    const $nextActiveLetter = $allLetters[inputLength]

    // ponemos la clase active a la letra actual
    if($nextActiveLetter){
        $nextActiveLetter.classList.add('active')
    }
    else{
        $currentLetter.classList.add('active', 'is-last')
        // TO DO: gameover() si no hay proxima palabra
    }

}

function gameOver(){
    console.log("game over")
}