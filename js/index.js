const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const direccionFlex = {
    "horizontal" : "column",
    "vertical" : "row"
}

const $botonCargar = $("#cargar-lanas");
const $orientacion = $("#modo-lanas");
const $cantColores = $("#cant-lanas");
const $secDibujar = $("#seccion-dib");

let estadoRender = false;

const limpiarPantalla = () => { $secDibujar.innerHTML = "" };

//Eventos
$botonCargar.addEventListener("click", obtenerInfo );

// Funciones
function obtenerInfo(event){

    event.preventDefault();

    if( $orientacion.value == "" || $cantColores.value <= 0 ) return;

    $secDibujar.style.display = "flex";

    limpiarPantalla();

    for(let i=0; i < $cantColores.value ; i++ ){
        crearLanas(i, $orientacion.value );
    }

    estadoRender = true;

}

function crearLanas( numLana, orientacion ){
    
    const seccionDibujar = $("#seccion-dib");
    const article = document.createElement("article");

    seccionDibujar.style.flexDirection = direccionFlex[orientacion];

    if( orientacion == "vertical" ){
        article.style.width = `${100/$cantColores.value}%`;
    }

    article.className = `article-lana-${orientacion}`;
    article.setAttribute("id", `lana-${numLana}`);

    article.innerHTML = `
        <div class="dibujo-lana-${orientacion}" id="dibujo-lana-${numLana}" ></div>
        <div class="opc-lana-${orientacion}" >
            <input class="color-lana" type="color" name="color-lana-${numLana}" id="color-lana-${numLana}">
            <button class="btn-for-lanas btn-color-lanas" type="submit" id="btn-color-lana-${numLana}">Cargar</button>
        </div>
    `;

    $secDibujar.appendChild(article);
}

$secDibujar.addEventListener( "click", (event) => {
    
    if(event.target.nodeName != "BUTTON") return;

    const posicionId = event.target.id.length - 1;
    const btnPresionado = event.target.id[posicionId];
    
    const nombreInputColor = `#color-lana-${btnPresionado}`;
    const inputColor = $(nombreInputColor);
    
    const nombreCanvas = `#dibujo-lana-${btnPresionado}`;
    const canvas = $(nombreCanvas);

    canvas.style.backgroundColor = inputColor.value;

    console.log(inputColor.value);
    

});
