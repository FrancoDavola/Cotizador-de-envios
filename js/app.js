const yearSelect = document.querySelector('#year')
const formulario = document.querySelector('#cotizar-seguro')


function Seguro(marca, year , tipo){
    this.marca  = marca;
    this.year = year ;
    this.tipo = tipo;
}


function iU(){}

iU.prototype.llenarOpciones = () => {
    
    

    for(let i = 1; i <= 35 ; i++){
        const optionYear = document.createElement('option')
        optionYear.textContent = `${i} Km's`
        optionYear.dataset.id = i
        yearSelect.appendChild(optionYear)
    }

}

Seguro.prototype.cotizarSeguro = function(){

     let cantidad;
     let baseCaba = 130
     let baseNorte = 135
     let baseOeste = 140
     let baseSur = 120

    switch(this.marca){
        case '1' : cantidad = baseCaba * Number(this.year.slice(0 ,1))
    break;
        case '2' : cantidad = baseNorte * Number(this.year.slice(0 ,1))
    break;
        case '3' : cantidad = baseOeste * Number(this.year.slice(0 ,1))
    break;
        case '4' : cantidad = baseSur * Number(this.year.slice(0 ,1))
    break;
        default:

        break;
    }
         console.log(this.tipo)

    if(this.tipo === 'basico'){
              cantidad *= 1.30
            }else {
              cantidad *= 1.50
            }

             return cantidad; 
}

iU.prototype.mostrarResultado = (total , seguro) => {

    const div = document.createElement('div')
    div.classList.add('mt-10')

    div.innerHTML = `
       <p class="header"> Tu resumen </p>
       <p class="font-bold"> Total : $${total} </p>
    
    `;

    const resultadoDiv = document.querySelector('#resultado')
    

    const spinner = document.querySelector('#cargando')
          spinner.style.display = 'block'

    setTimeout(() => {
        spinner.style.display = 'none'
        resultadoDiv.appendChild(div)
    }, 2000);
    
}


iU.prototype.mostrarMensaje = (mensaje , tipo) => {

    const div = document.createElement('div')

    if(tipo === 'error'){
        div.classList.add('mensaje' ,'mt-10','error')
    }else {
        div.classList.add('mensaje' ,'mt-10' ,'correcto')
    }

    div.textContent = mensaje
    formulario.insertBefore(div , document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove()
    }, 2000);
}

const iu = new iU();


document.addEventListener('DOMContentLoaded' , () => {
    iu.llenarOpciones()
})

eventListener()
    function eventListener(){
      formulario.addEventListener('submit' , cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault()
    
    const marca = document.querySelector('#marca').value
    const year = document.querySelector('#year').value
    const tipo = document.querySelector('input[name="tipo"]:checked').value
    
    if(marca == '' || year == '' || tipo == ''){
        iu.mostrarMensaje('Los campos estan vacios' , 'error')
        return;
    }

    iu.mostrarMensaje('Cotizando' , 'correcto')

    const resultado = document.querySelector('#resultado div')
           if(resultado != null){
              resultado.remove()
            }


    const seguro = new Seguro(marca, year , tipo)
    const total =  seguro.cotizarSeguro()

    iu.mostrarResultado(total , seguro)


}