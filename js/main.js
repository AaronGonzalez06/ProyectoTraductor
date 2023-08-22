let aux = 0;
const translate = document.getElementById('textareaTraducir');
let textareaTranslate = document.getElementById('textareaTraduccion');
let character = document.getElementById('caracter');
let origin = "es";
let destiny = "en";
let showHistory = document.querySelectorAll('.hisFav');
character.textContent= aux;
translate.addEventListener('input', async function() {
    character.textContent= translate.value.length;
});
const btn_translate = document.getElementById('btn-translate');
const btn_clear = document.getElementById('clear');
btn_clear.addEventListener('click', async function() {
    textareaTranslate.textContent = "";
});
btn_translate.addEventListener('click', async function() {
    if(translate.value.length == 0){
        alert("No hay nada que traducir.");
    } else {
        translated(translate.value, destiny, origin)
        .then(result => {
            textareaTranslate.textContent =  result.data.translations[0].translatedText;

            if(!localStorage.getItem('historial')){
                localStorage.setItem('historial',JSON.stringify([]));
            }
            let addHistory = JSON.parse(localStorage.getItem('historial'));
            addHistory.push({"textOrigin" : translate.value, "text" : result.data.translations[0].translatedText, "origen" : origin, "destino" : destiny});
            localStorage.setItem('historial',JSON.stringify(addHistory));
            let p = document.createElement('p');
            let divTextOrigin = document.createElement('span');
            let divTrastale = document.createElement('span');
            p.classList.add('cabecera_btn');
            p.classList.add('translateHisFav');
            divTextOrigin.textContent = translate.value;
            divTrastale.textContent = result.data.translations[0].translatedText;
            p.appendChild(divTextOrigin);
            p.appendChild(divTrastale);
            showHistory[0].appendChild(p);
        })
        .catch(error => {
        console.error(error);
        });
    }    
});

/** saved */

let save = document.getElementById('save');

save.addEventListener('click', function() {
    if(textareaTranslate.value.length == 0){
        alert("No hay nada que añadir a guardar.");
    }else{
        if(!localStorage.getItem('guardado')){
            localStorage.setItem('guardado',JSON.stringify([]));
        }
        let addHistory = JSON.parse(localStorage.getItem('guardado'));
        addHistory.push({"textOrigin" : translate.value, "text" : textareaTranslate.value, "origen" : origin, "destino" : destiny});
        localStorage.setItem('guardado',JSON.stringify(addHistory));
        let p = document.createElement('p');
        let divTextOrigin = document.createElement('span');
        let divTrastale = document.createElement('span');
        p.classList.add('cabecera_btn');
        p.classList.add('translateHisFav');
        divTextOrigin.textContent = translate.value;
        divTrastale.textContent = textareaTranslate.value;
        p.appendChild(divTextOrigin);
        p.appendChild(divTrastale);
        showHistory[1].appendChild(p);
    }
});

/* seleccionar idioma */
const esp = document.getElementById('esp');
const ing = document.getElementById('ing');
const espTr = document.getElementById('espTr');
const ingTr = document.getElementById('ingTr');

esp.addEventListener('click', async function() {
    //add
    esp.classList.add('color');
    ingTr.classList.add('color');
    //borrar
    ing.classList.remove('color');
    espTr.classList.remove('color');
    //variables
    origin = "es";
    destiny = "en";
});

espTr.addEventListener('click', async function() {
    //add
    espTr.classList.add('color');
    ing.classList.add('color');
    //borrar
    ingTr.classList.remove('color');
    esp.classList.remove('color');
    //variables
    origin = "en";
    destiny = "es";
});

ing.addEventListener('click', async function() {
    //add
    ing.classList.add('color');
    espTr.classList.add('color');
    //borrar
    esp.classList.remove('color');
    ingTr.classList.remove('color');
    //variables
    origin = "en";
    destiny = "es";
});

ingTr.addEventListener('click', async function() {
    //add
    ingTr.classList.add('color');
    esp.classList.add('color');
    //borrar
    espTr.classList.remove('color');
    ing.classList.remove('color');
    //variables
    origin = "es";
    destiny = "en";
});


/** mostrar historial */
showHistory[0].style.display = 'none';
showHistory[1].style.display = 'none';
if(localStorage.getItem('historial')){
    let datos = JSON.parse(localStorage.getItem('historial'));
    datos.forEach(element => {
        let p = document.createElement('p');
        let divTextOrigin = document.createElement('span');
        let divTrastale = document.createElement('span');
        p.classList.add('cabecera_btn');
        p.classList.add('translateHisFav');
        divTextOrigin.textContent = element.textOrigin;
        divTrastale.textContent = element.text;
        p.appendChild(divTextOrigin);
        p.appendChild(divTrastale);
        showHistory[0].appendChild(p);
    });
};


/** mostrar fav */
if(localStorage.getItem('guardado')){
    let datos = JSON.parse(localStorage.getItem('guardado'));
    datos.forEach(element => {
        let p = document.createElement('p');
        let divTextOrigin = document.createElement('span');
        let divTrastale = document.createElement('span');
        p.classList.add('cabecera_btn');
        p.classList.add('translateHisFav');
        divTextOrigin.textContent = element.textOrigin;
        divTrastale.textContent = element.text;
        p.appendChild(divTextOrigin);
        p.appendChild(divTrastale);
        showHistory[1].appendChild(p);
    });
};

/**  cambiar div */

let btnAccion = document.querySelectorAll('.btn_accion');

btnAccion[0].addEventListener('click', async function() {
    if(!localStorage.getItem('historial')){
        alert("Vacío");
    }else{
        showHistory[0].style.display = 'block';
        showHistory[1].style.display = 'none';
    }
});

btnAccion[1].addEventListener('click', async function() {
    if(!localStorage.getItem('guardado')){
        alert("Vacío");
    }else{
        showHistory[0].style.display = 'none';
        showHistory[1].style.display = 'block';
    }
});

btnAccion[0].addEventListener('dblclick', async function() {
    showHistory[0].style.display = 'none';
    showHistory[1].style.display = 'none';
});

btnAccion[1].addEventListener('dblclick', async function() {
    showHistory[0].style.display = 'none';
    showHistory[1].style.display = 'none';
});