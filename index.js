const Score = function(){
  this.data = {
    jugando: false,
    entrada: 1,
    turno: 'casa',
    outs: 0
  }
}
Score.prototype.init = function(){
  // comprobamos si en sessionStorage hay gurdado un score 
  const score = sessionStorage.getItem('score');

  if(score){
    this.data = JSON.parse(score);
    this.update();
  }else{
    sessionStorage.setItem('score', JSON.stringify(this.data));
  }
}
Score.prototype.newJuego = function(){
  let nombreVisitante = document.getElementById('nombre_visitante').value;
  let nombreCasa = document.getElementById('nombre_casa').value;
  
  if(nombreVisitante.trim() && nombreCasa.trim()){
    this.data.jugando = true;
    this.data.casa = {
      nombre: nombreCasa,
      carreras: 0,
    }
    this.data.visitante = {
      nombre: nombreVisitante,
      carreras: 0
    }
    this.update();
    
  }else{
    alert('Ingresa datos')
  }
}
Score.prototype.update = function(){
  if(this.data.jugando){
    document.getElementById('formulario').classList.add('oculto');
    document.getElementById('board').classList.remove('oculto');
    document.getElementsByClassName('titulo-main')[0].classList.add('board-mode');

    document.getElementById('nombreCasa').innerHTML = this.data.casa.nombre;
    document.getElementById('carrerasCasa').innerHTML = this.data.casa.carreras;

    document.getElementById('nombreVisitante').innerHTML = this.data.visitante.nombre;
    document.getElementById('carrerasVisitante').innerHTML = this.data.visitante.carreras;

    document.getElementById('entrada').innerHTML = this.data.entrada;

    if(this.data.turno == 'casa'){
      document.getElementById('board-score').classList.add('turno-casa');
      document.getElementById('board-score').classList.remove('turno-vis');
    }else{
      document.getElementById('board-score').classList.add('turno-vis');
      document.getElementById('board-score').classList.remove('turno-casa');
    }

    document.getElementById('outs').innerHTML = this.data.outs;
    
  }else{
    document.getElementById('board').classList.add('oculto');
    document.getElementById('formulario').classList.remove('oculto');
    document.getElementById('titulo-main').classList.remove('board-mode');
  }

  sessionStorage.setItem('score', JSON.stringify(this.data));
}
Score.prototype.removeCarrera = function(){
  console.log(this.data.turno);
  carreras = this.data[this.data.turno].carreras
  if(carreras > 0){
    this.data[this.data.turno].carreras = carreras - 1;
  }
  this.update();
}
Score.prototype.addCarrera = function(){
  carreras = this.data[this.data.turno].carreras
  this.data[this.data.turno].carreras = carreras + 1;
  this.update();
}
Score.prototype.addOut = function(){
  this.data.outs = this.data.outs + 1;
  if(this.data.outs >= 3){
    if(this.data.turno == 'casa'){
      this.data.turno = 'visitante';
    }else{
      this.data.entrada = this.data.entrada + 1;
      this.data.turno = 'casa';
    }
    this.data.outs = 0;
  }
  this.update();
}
Score.prototype.endGame = function(){
  document.getElementById('nombreCasaEnd').innerHTML = this.data.casa.nombre;
  document.getElementById('carrerasCasaEnd').innerHTML = this.data.casa.carreras;

  document.getElementById('nombreVisitanteEnd').innerHTML = this.data.visitante.nombre;
  document.getElementById('carrerasVisitanteEnd').innerHTML = this.data.visitante.carreras;

  if(this.data.casa.carreras > this.data.visitante.carreras){
    document.getElementById('ganador').innerHTML = this.data.casa.nombre;
  }else if(this.data.casa.carreras < this.data.visitante.carreras){
    document.getElementById('ganador').innerHTML = this.data.visitante.nombre;
  }else{
    document.getElementById('ganador').innerHTML = "Empate!";
  }

  document.getElementById('board').classList.add('oculto');
  document.getElementById('gameOver').classList.remove('oculto');
  sessionStorage.removeItem('score');
  confetti.start();
}
const score = new Score();

document.getElementById('agregar_equipos').addEventListener('click', () => score.newJuego());
document.getElementById('addCarrera').addEventListener('click', () => score.addCarrera());
document.getElementById('removeCarrera').addEventListener('click', () => score.removeCarrera());
document.getElementById('addOut').addEventListener('click', () => score.addOut());
document.getElementById('endGame').addEventListener('click', () => score.endGame());
document.getElementById('nuevoJuego').addEventListener('click', () => window.location.reload());

score.init();
