/*

*/

function ClassDirective(Node, Expression, id, context) { 
  this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
       this.OldaddClass = [];
      this.OldRemoveClass = [];
         
    this.init();



}

ClassDirective.prototype = {
    init: function () {
        var _this = this;
        var evalData = FindAnyValue.bind(this.context.data)(this.Expression, this.context);
        this.addClass = [];
        this.RemoveClass = [];

        if (isObject(evalData)) {
            for (var q in evalData) {
                if (evalData[q]) {
                    this.addClass.push(q);
                } else {
                    this.RemoveClass.push(q);
                }
            }

        } else if (isArray(evalData)) {
            this.addClass = evalData;

        } else if (isString(evalData)) {
            this.addClass = [evalData];
        }
        
        if (this.addClass.join(' ') != this.OldaddClass.join(' ')) {

            $(this.Node).addClass(this.addClass.join(' ')).removeClass(this.OldaddClass.join(' '));
        }
        if (this.RemoveClass.join(' ') != this.OldRemoveClass.join(' ')) {

            $(this.Node).removeClass(this.RemoveClass.join(' '));
        }

        this.OldaddClass = this.addClass;
        this.OldRemoveClass = this.RemoveClass;
    },

    UpdateView: function (context) {
        this.context = context;
        this.init();


    }


}