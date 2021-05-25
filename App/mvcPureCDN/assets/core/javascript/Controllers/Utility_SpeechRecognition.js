;(function(W){
   "use strict";

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;




function DefaultOptions(){
    var data={
        mikeNode:null

        };



    return W.U.clone(data);

}


function init(x){
    var Options=W.U.extend(DefaultOptions(),x);
    if(W.U.isOK(Options.mikeNode)){
        
    
      var recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.onresult = function(event) {
    debugger;
}

recognition.onspeechend = function() {
  recognition.stop();
}
recognition.onnomatch = function(event) {
        debugger;
}
recognition.onerror = function(event) {
     debugger;
}

recognition.onstart = function(event) {
    
}
  recognition.start();
}else{
    W.U.console('mike Node null found');
}

}



    W.U.SpeechRecognition={
     has:W.U.feature.SpeechRecognition,
     init:init
   };

   })(wowrol);