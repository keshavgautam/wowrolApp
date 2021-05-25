/*

*/

function ShowDirective(Node, Expression, id, context) { 

  this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
 
        this.init();



}

ShowDirective.prototype = {
    init: function () {
        var Exp_data = FindAnyValue.bind(this.context.data)(this.Expression, this.context);
   
        opk = false;

        if (isObject(Exp_data)) {

            for (var q in Exp_data) {
                if (Exp_data[q]) {
                    opk = true;
                }
            }
        } else {


            var opk = Exp_data; ;

        }

        var IsShow = (opk) ? true : false;
        if (IsShow) {
            $(this.Node).removeClass('hide');
        } else {
            $(this.Node).addClass('hide');
        }


    },
    UpdateView: function (context) {
        this.context = context;
        this.init();


    }

};