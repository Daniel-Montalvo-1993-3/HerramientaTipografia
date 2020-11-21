eventListener();

function eventListener(){
    if(document.getElementById('btnCopy')){
        document.getElementById('btnCopy').addEventListener('click', copiar);  
    }
    document.getElementById('btnCalcular').addEventListener('click', calculaClamp); 
}

function calculaClamp(){
    let inputFontMax = document.getElementById('fontMax').value;
    let inputFontMin = document.getElementById('fontMin').value;
    let inputSizeMin = document.getElementById('sizeMin').value;
    let inputSizeMax = document.getElementById('sizeMax').value;
    let response = document.getElementById('response');

    if(inputFontMax === '' || inputFontMin === '' || inputSizeMin === '' || inputSizeMax === ''){
        response.innerHTML =`
            <span id="textCopy">Ingresa todos los valores</span>
        `
    }else{
        let numbers = /^[0-9]+$/;
        if(inputFontMax.match(numbers) && inputFontMin.match(numbers) && inputSizeMin.match(numbers) && inputSizeMax.match(numbers)){
            let FontMinRem = inputFontMin / 16;
            let FontMaxRem = inputFontMax / 16;
            let SizeMinRem = inputSizeMin / 16;
            let SizeMaxRem = inputSizeMax / 16;
            let slope = (FontMaxRem.toFixed(2) - FontMinRem.toFixed(2)) / (SizeMaxRem.toFixed(2) - SizeMinRem.toFixed(2));
            slope.toFixed(4);
            let yAxisIntersection = -SizeMinRem * slope + FontMinRem;
            yAxisIntersection.toFixed(4);
        
            let html = `
            <input type='text' id="textCopy" spellcheck="false" value="clamp(${FontMinRem}rem, ${yAxisIntersection}rem + ${slope*100}vw, ${FontMaxRem}rem)"/>
            <div class="tooltip">
                <button id="btnCopy">
                <span class="tooltiptext" id="myTooltip">Copiar Clamp()</span>
                Copiar</button>
            </div>
            `;
            response.innerHTML = html;
            eventListener();
        }
        else{
            response.innerHTML =`
            <span id="textCopy">Solo se aceptan numeros</span>`
        }
    }
}
function copiar(){
    let textCopy = document.getElementById('textCopy');
    textCopy.select();
    textCopy.setSelectionRange(0, 99999);
    document.execCommand("copy");
    let tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copiado: " + textCopy.value;
}