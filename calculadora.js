
// CALCULADORA JULIAN DAVID =================================================================

// localizamos los tres elementos basicos
const screenOperation = document.getElementById('screen-operation');
const screenResult = document.getElementById('screen-result');
const buttons = document.getElementById('buttons');
// variable para saber si hemos terminado la operacion o no
let operationComplete = false;
// funcion para saber cual es el ultimo digito introduido (devuelve el ultimovalor de la pantalla)
const lastValue = () => screenOperation.textContent.substring(screenOperation.textContent.length-1)
// la funcion inicialmente tiene 0, si es 0 lo quita y agrega etxto a medida que vamos escribiendo
const writeOperation = text =>{
    if(screenOperation.textContent=='0' && text != '.') screenOperation.textContent = '';
// si operationComplete
    if(operationComplete && isNaN(text)){
        screenOperation.textContent = screenResult.textContent;
        operationComplete = false;
    }
// si la operacion esta completa y escribimos un nuevo numero en resultado se pone a 0 y en screen operation se agrega el nuevo numero para empezar otra operacion
    if(operationComplete && !isNaN(text)){
        screenOperation.textContent = '';
        screenResult.textContent = '0';
        operationComplete = false;
    }

    if(isNaN(lastValue()) && isNaN(text)){
       screenOperation.textContent = screenOperation.textContent.substring(0,screenOperation.textContent.length-1)
//eveitamos que el texto se desborde disminuyendo el tamaño de letra en el screen opération
    }else if(screenOperation.textContent.length<24){
        screenOperation.textContent += text;
    }
}
// ecribimos la funion para agregar operaciones
const writeResult = () =>{
// si last value no es un numero 
    if(isNaN(lastValue()) && lastValue()!== ')') screenOperation.textContent = screenOperation.textContent.substring(0,screenOperation.textContent.length-1)
// eval recibe un string y si es una operacion matematica la resuelve
    screenResult.textContent = eval(screenOperation.textContent)
    operationComplete = true;
//eveitamos que el texto se desborde disminuyendo el tamaño de letra en screen result
    if(screenResult.textContent.length>9){
        screenResult.style.fontSize = '2em';
        screenResult.style.marginTop = '1em';
    }
}
// esta funcion cambia elsigno 
const changeSign = () =>{
    let lastNumber='';
    let position = 0;
// si el ultimo caracter es un numero
    if(!isNaN(lastValue())){
        for(let i = screenOperation.textContent.length-1; i>0; i--){
            if(isNaN(screenOperation.textContent[i])){
                position = i+1;
                break;
            }
        }
    }

    lastNumber = screenOperation.textContent.substring(position);
    screenOperation.textContent = screenOperation.textContent.replace(lastNumber, `(${lastNumber*-1})`)
}
// esta funcion generada por la letra c resetea lo que tengamos en pantalla
const resetScreen = () =>{
    screenOperation.textContent = '0';
    screenResult.textContent = '0';
}
// creamos un evento de escucha para os botones (evento click)
buttons.addEventListener('click', e=>{
    if(e.target.textContent !== ''){
      // si la tecla que se pulsa es diferente de vacia hacemos algo
        switch (e.target.textContent) {
          // lamamos las funciones 
            case '=': writeResult();break;
            case 'C': resetScreen();break;
            case '+/-': changeSign();break;
            case ',': writeOperation('.');break;
            default: writeOperation(e.target.textContent);break;
        }
    }
})