

   /*
* page set up 2
*/
; (function(W){
   "use strict";
      var ph=' <h2>Todo</h2>'
    +'<div >'
       +'<ul class="unstyled">'
    +'<li kk-repeat="todo in this.todos  as filtered_result track by todo.id">'
    +'<label class="" kk-class="{strike:todo.done}" ><input type="checkbox" kk-model="todo.done" ><span class="checkbox__label" kk-click="this.pig" >{{todo.text}} {{this.todoText}}</span></label>'

    +'</li>'
    +'</ul>'

    +'<form kk-submit="this.addTodo">'

    +'<input type="text" class="form-mold" kk-model="this.todoText"  size="30"  placeholder="add new todo here">'
    +' <input class="btn " type="submit" value="add">'
    +'</form>'
    +' </div><style>.strike { text-decoration: line-through; } .bold { font-weight: bold; } .red { color: red; } .has-error { color: red; background-color: yellow; } .orange { color: orange; }</style>';

var controller=function () {
   this.count=0;
   this.todoText =  '';
    this.todos = [];
    this.pig = function(){  };
    this.addTodo = function () {
     
        this.count++;
  
        this.todos.push( { text: this.todoText, done: false});
        this.todoText='';
    };
    this.myCol='';
    this.remaining = function () {

        var count = 0;
      W.U.forEach(this.todos, function (todo) {
            count += todo.done ? 1 : 0;
        },this);
           
        return count;
    };
    this.type = 'HISTORY_FLUSH';
    this.friends = {};
    this.index=0;
    this.archive = function () {
          
        var oldTodos = this.todos;
        this.todos = [];
  W.U.forEach(oldTodos, function (todo) {
            if (!todo.done) this.todos.push(todo);
        },this);
       
    };

     
}


   var BootstrapModal = W.KK.createModule({
   controller:controller,
   render:function(){

 
    
    return ph;

}
});


  var Jid= W.U.J(function () {
 
     
  W.KK.InsertComponent(this.Node,BootstrapModal,'html');

     }, {});


 var ch = '<div class="block _bdy"  ><div class="block _bdy" data-junction="'+Jid+'" ></div>';






 //---------






 ch+='</div>';
   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 

 W.U.resize();
})(wowrol);