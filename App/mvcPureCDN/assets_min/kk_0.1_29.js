/*

*/

function DebugDirective(Node, Expression, id, context) { 

    this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;


    this.Node.kk_debugger = function () {

        debugger;
    }
   
}

DebugDirective.prototype = {
    init: function () {
    






    },
    UpdateView: function (context) {
      


    }

};
/*

*/

function WhirlgigDirective(Node, Expression, id, context) { 

    this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
 
    this.init();



}

WhirlgigDirective.prototype = {
    init: function () {
        var Exp_data = FindAnyValue.bind(this.context.data)(this.Expression, this.context);


        if (isOK(Exp_data.isinstall) && isOK(Exp_data.setting) && isOK(Exp_data.oninstall)) {
            if (Exp_data.isinstall) {
           
                W.U.Whirlgig.bind({Node :this.Node,Value:Exp_data.setting()})();
                Exp_data.oninstall();
            }


        }






    },
    UpdateView: function (context) {
        this.context = context;
        this.init();


    }

};
/*

*/

function StyleDirective(Node, Expression, id, context) { 

    this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
 
    this.init();



}

StyleDirective.prototype = {
    init: function () {
        var Exp_data = FindAnyValue.bind(this.context.data)(this.Expression, this.context);


   
        if (isObject(Exp_data)) {

            $(this.Node).attr("style", '');



            $(this.Node).css(Exp_data);
        } else {

            $(this.Node).attr("style", '');


        }




    },
    UpdateView: function (context) {
        this.context = context;
        this.init();


    }

};


/*

*/

function PagerDirective(Node, Expression, id, context) { 

    this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
 
    this.init();



}

PagerDirective.prototype = {
    init: function () {
        var _this = this;
    






    },
    UpdateView: function (context) {
        this.context = context;
        this.init();


    }

};



/*
23
*/
/*

*/

function FileUploaderDirective(Node, Expression, id, context) { 

    this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
 
     

    this.init();



}

FileUploaderDirective.prototype = {
    init: function () {
        var _this = this;
        var Exp_data = FindAnyValue.bind(this.context.data)(this.Expression, this.context);

        if (isObject(Exp_data)) {
            Exp_data.Node = this.Node;
            new W.U.fileUpload.kk_fileuploader(Exp_data);
        }




    },
    UpdateView: function (context) {
        this.context = context;
        this.init();


    }

};



/*

*/

function LISTCheckBoxDirective(Node, Expression, id, context) { 

    this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
 
     

    this.init();



}

LISTCheckBoxDirective.prototype = {
    init: function () {
        var _this = this;
        var Exp_data = FindAnyValue.bind(this.context.data)(this.Expression, this.context);

        if (isObject(Exp_data)) {
        
            W.U.ListCheckBox.bind({Node:this.Node,Value:Exp_data})();
        }




    },
    UpdateView: function (context) {
        this.context = context;
      //  this.init();


    }

};



/*

*/

function SelectBoxDirective(Node, Expression, id, context) { 

    this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
 
     

    this.init();



}

SelectBoxDirective.prototype = {
    init: function () {
        var _this = this;
        var Exp_data = FindAnyValue.bind(this.context.data)(this.Expression, this.context);

        if (isObject(Exp_data)) {

            W.U.intentdata.add(this.id, Exp_data);
            W.U.selectbox.init(this.Node, this.id);

        }




    },
    UpdateView: function (context) {
        this.context = context;
        this.init();


    }

};