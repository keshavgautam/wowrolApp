
/**
@ supported expression example

  - this.todos.length
  - this.archive()
  - this.todos[0]
  - this.archive.do(this.todos[0])
  - myVar=== "two" ? "its true" : "its false"  -ExpressionStatement
  - "friends = [{name:\'John\', phone:\'555-1276\'},{name:\'Mary\', phone:\'800-BIG-MARY\'}]"
  -{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}  - ng-class 
  -{\'btn-md-danger\': type == \'RESET_ACCOUNT\' || type == \'HISTORY_LEAVE_AND_FLUSH\' || type == \'HISTORY_FLUSH_AND_DELETE\' || type == \'HISTORY_FLUSH\'}  - ng-class 
  - {\'z-index\': 1040 + (index && 1 || 0) + index*10}  -ng -style

*/
function ParseExpression(value) {
    var options = {
        csp: false,
        literals: {
            'true': true,
            'false': false,
            'null': null,
            'undefined': undefined
        },
        isIdentifierStart: false,
        isIdentifierContinue: false
    };
   var lexer = new Lexer(options);
   var   astBuilder = new  AST(lexer, options);
 
  return astBuilder.ast(value);
}


function FindfunctionOFAttrValue(value,context) { 
    var fn=W.U.noop;
    
   
  
      var Exp_data=ParseExpression(value);
       
     var eval_data=  eval_data_in_recurse(Exp_data, this);
       //check for parent data in repeat
        if(isOK(this.$parent)&&(eval_data==null)){
  eval_data=  eval_data_in_recurse(Exp_data, this.$parent); 
        }
     if(isFunction(eval_data)){
         fn = eval_data;
     }
     
    return fn;
}

function FindtextValue(value,context) { 
    var text='';
    
   
   
      var Exp_data=ParseExpression(value);
    
     var eval_data=  eval_data_in_recurse(Exp_data, this);
    
     if(isFunction(eval_data)){
        
     }else{
          text = eval_data;
     }
     
    return text;
}
function FindAnyValue(value,context) { 

    
   
   
      var Exp_data=ParseExpression(value);
       

    
    
     
    return eval_data_in_recurse(Exp_data, this);
}
/*
@used at -modal directive
*/
function FindPathValue(value,obj) {
    var val = null;
    var data = value.split('.');
    
    
    while(data.length>0&&(isObject(obj)||isArray(obj))){
         if(isOK(obj[data[0]])){
             obj = obj[data[0]];
             data.shift();
        }
    }
    val = obj; 

    return val;
}
/*
@used at -modal directive
*/
function SetPathValue(obj, prop, value) {
  if (typeof prop === "string")
        prop = prop.split(".");

    if (prop.length > 1) {
        var e = prop.shift();
      SetPathValue(obj[e] =
                 Object.prototype.toString.call(obj[e]) === "[object Object]"
                 ? obj[e]
                 : {},
               prop,
               value);
    } else
        obj[prop[0]] = value;
}
