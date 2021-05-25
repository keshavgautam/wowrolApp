/*

*/


function eval_data_in_recurse(ast,data,evaluate_args) {
    evaluate_args = (!isOK(evaluate_args)) ? {} : evaluate_args;
    
    var eval_data = null;

    switch (ast.type) {

        case AST.Program:
     forEach(ast.body, function (expression, pos) {
        eval_data  = eval_data_in_recurse(expression.expression, data);

            });
            break;
  case AST.Literal:
   var eval_data = ast.value;
      break;
    case AST.UnaryExpression:
   
      break;
  case AST.BinaryExpression:
   
      var left = eval_data_in_recurse(ast.left, data);
      var right = eval_data_in_recurse(ast.right, data);
      var operator = ast.operator;
    
        

      eval_data =LogicalCompaire(left ,ast.operator, right) 
      break;
    case AST.LogicalExpression:
  
      var left = eval_data_in_recurse(ast.left, data);
      var right = eval_data_in_recurse(ast.right, data);
      var operator = ast.operator;
    
        

      eval_data =LogicalCompaire(left ,ast.operator, right) 
      break;
    case AST.ConditionalExpression:
    var alternate=eval_data_in_recurse(ast.alternate, data);
    var consequent=eval_data_in_recurse(ast.consequent, data);
    var test=eval_data_in_recurse(ast.test, data);

      eval_data  = (test)?alternate:consequent;
      break;
      case AST.ExpressionStatement:
     eval_data = eval_data_in_recurse(ast.expression, data);

      break;
  case AST.Identifier:
      if (isOK(evaluate_args['evaluate_object'])) {
          var the_name = evaluate_args['evaluate_object'][ast.name];
          eval_data = (isOK(the_name)) ? the_name : null;
      } else { 
            var the_name = data[ast.name];
          eval_data = (isOK(the_name)) ? the_name : null;
      }
        
      break;
    case AST.MemberExpression:
   
 var obj =eval_data_in_recurse(ast.object, data);

 eval_data= eval_data_in_recurse(ast.property, data,{'evaluate_object':obj});

      break;
  case AST.CallExpression:

      var args = [], eval_given_args;

      forEach(ast.arguments, function (expression, pos) {

          eval_given_args = eval_data_in_recurse(expression, data);
          if (isOK(eval_given_args)) {
              args.push(eval_given_args);
          }

      });

      var callee = eval_data_in_recurse(ast.callee, data);
      var fn = noop;

      if(isFunction(callee)){
          fn = callee.bind(data);
      }

      eval_data = fn.call(this, args[0],args[1],args[2],args[3],args[4],args[5]);
      break;
  case AST.AssignmentExpression:
   
      var left = eval_data_in_recurse(ast.left, data);
      var right = eval_data_in_recurse(ast.right, data);
      var operator = ast.operator;
      var path = CreateVariblePath(ast.left);
      data[path] = right
      break;
  case AST.ArrayExpression:
     eval_data = [];
      forEach(ast.elements, function (expression, pos) {
          var arrValue=eval_data_in_recurse(expression, data);
 eval_data.push(arrValue);
      });
       
      break;
  case AST.ObjectExpression:

      eval_data = {};
      forEach(ast.properties, function (expression, pos) {

          var obj = eval_data_in_recurse(expression, data);

          W.U.extend(eval_data,obj);
      });

      break;
  case AST.ThisExpression:
      eval_data = data;
      break;
    case AST.LocalsExpression:

      break;
    case AST.NGValueParameter:

      break;
    case  AST.Property:
     eval_data = {};
   
        var key = eval_data_in_recurse(ast.key, data);
        if(isOK(ast.kind)&&(ast.key.type!=AST.Literal)){
             if(ast.kind=='init'){
            key = ast.key.name;
        } 
        }
        var Value = eval_data_in_recurse(ast.value, data);
          eval_data[key]=Value;
     break;
    }


    return eval_data;
}


/*
*/
function LogicalCompaire(left ,operator, right) {
    var ret = false;  


      switch(operator){
        case '!=':
        ret = (left!=right);
        break;
        case '!==':
        ret = (left!==right);
        break;
        case '==':
        ret = (left==right);
        break;
        case '===':
        ret = (left===right);
        break;
        case '%':
        ret = (left%right);
        break;
        case '*':
        ret = (left*right);
        break;
        case '+':
        ret = (left+right);
        break;
        case '-':
        ret = (left-right);
        break;
        case '/':
        ret = (left/right);
        break;
        case '<':
        ret = (left<right);
        break;
         case '>':
        ret = (left>right);
        break;
        case '>=':
        ret = (left>=right);
        break;
        case '<=':
        ret = (left<=right);
        break;
        case '||':
        ret = (left||right);
        break;
        case '&&':
        ret = (left&&right);
        break;                            
      }

    return ret;
}

/*
*/
function CreateVariblePath(ast,eval_data) {
    eval_data = (isOK(eval_data)) ? eval_data : '';

     switch (ast.type) {

        case AST.Program:
     forEach(ast.body, function (expression, pos) {
        eval_data  = CreateVariblePath(expression.expression, eval_data);

            });
            break;
 case AST.Identifier:
 
 eval_data+= (eval_data.length==0)?ast.name:'.'+ast.name;
   break;
      case AST.MemberExpression:
        
eval_data=CreateVariblePath(ast.object, eval_data);
  eval_data=CreateVariblePath(ast.property, eval_data);

      break;
    }
    return eval_data;
    
     }