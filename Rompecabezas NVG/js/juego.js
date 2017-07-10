// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
var movimientos = 0;



// Ac&aacute; vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

// Esta función va a chequear si el Rompecabezas est&aacute; en la posición ganadora
function chequearSiGano(){
  var numero=1
  for (var c = 0; c < 3; c++) {
    for (var i = 0; i < 3; i++) {
      if(grilla[c][i]!=numero){
        return false;
      }
      numero++
    }
  }
  return true
  }


// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
    alert("Ganaste!")
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){
  var valor1 = grilla[fila1][columna1];
  var valor2 = grilla[fila2][columna2];
  grilla[fila1][columna1] = valor2;
  grilla[fila2][columna2] = valor1;
  var pieza1 = document.getElementById('im'+valor1.toString());
  var pieza2 = document.getElementById('im'+valor2.toString());

  var padre = pieza1.parentNode;
  var clonPieza1 = pieza1.cloneNode(true);
  var clonPieza2 = pieza2.cloneNode(true);
  padre.replaceChild(clonPieza2, pieza1);
  padre.replaceChild(clonPieza1, pieza2);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia = {fila: nuevaFila, columna: nuevaColumna};
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  if (fila>=0 && fila<3 && columna>=0 && columna<3) {
    return true
  }else{
    return false
  }
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;

  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaFilaPiezaVacia = posicionVacia.fila;
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }
}



// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    moverEnDireccion(evento.which);
    movimientos=movimientos+1;
    document.getElementById("movimientos").innerText=movimientos;
    var gano = chequearSiGano();
    if(gano){
      setTimeout(function(){
        mostrarCartelGanador();
      },500);
    }
    evento.preventDefault();
  })
}

function iniciar(){
  mezclarPiezas(60);
  capturarTeclas();
}


iniciar();
