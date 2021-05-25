/*
*
*/

function NoneKKAttrDirective(Node,attribute, Expression, id, context, Template) { 
   
  this.Node = Node;
//    this.Expression =Expression.substring(2, (Expression.length - 2)); 
 this.Expression =Expression; 
  this.attribute = attribute;
    this.context = context;
    this.id = id;

        this.init();
    

}


NoneKKAttrDirective.prototype = {
    init: function () {
   
   
        var str = this.Expression;


        var match = this.Expression.match(braketMatch);

        for (var q = 0; q < match.length; q++) {
            match[q] = match[q].substring(2, (match[q].length - 2));
            var Exp_data = FindAnyValue.bind(this.context.data)(match[q], this.context);

          if (isObject(Exp_data)) {
      

        } else if (isArray(Exp_data)) {
         

        } else if (isString(Exp_data)) {
                str = str.replace('{{' + match[q]+ '}}', Exp_data);
            }



        }

           
        this.Node.setAttribute(this.attribute,str);

              //for debugger
            if (isOK(this.Node.kk_debugger)) {
                this.Node.kk_debugger();
            }
    },

    UpdateView: function (context) {

        this.context = context;
        this.init();


    }



};