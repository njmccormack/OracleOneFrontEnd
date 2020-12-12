var tempoInicial= $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//$(document).ready(function(){
$(function(){
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicializaMarcadores();
  $("#botao-reiniciar").click(reiniciaJogo);
});


function atualizaTamanhoFrase(){
  var frase = $(".frase").text();
  var numPalavras = frase.split(" ").length;
  var tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
  campo.on("input", function() {
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-palavras").text(qtdPalavras);//Retira os espaço da String

    var conteudoSemEspaco = conteudo.replace(/\s+/g,'');

    var qtdCaracteres = conteudoSemEspaco.length;
    $('#contador-caracteres').text(qtdCaracteres);
  });
}

function inicializaCronometro(){

  campo.one("focus", function() {
      var tempoRestante = $("#tempo-digitacao").text();
      var cronometroID = setInterval(function() {
          tempoRestante--;
          $("#tempo-digitacao").text(tempoRestante);
          if (tempoRestante < 1) {
            clearInterval(cronometroID);
            finalizaJogo();
          }
      }, 1000);
  });
}

function reiniciaJogo(){
  //$("#botao-reiniciar").on("click", function(){
  //  console.log("Botao clicado");
  //});

    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

function inicializaMarcadores() {
    campo.on("input", function() {
      var frase = $(".frase").text();
      var digitado = campo.val();
      var comparavel = frase.substr(0 , digitado.length);
      if(digitado == comparavel) {
          campo.addClass("borda-verde");
          campo.removeClass("borda-vermelha");
      } else {
          campo.addClass("borda-vermelha");
          campo.removeClass("borda-verde");
      }
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}
