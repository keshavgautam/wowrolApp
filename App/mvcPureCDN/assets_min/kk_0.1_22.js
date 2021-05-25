/*

@ Expression  Example-
       -n in [42, 42, 43, 43] track by myTrackingFunction(n)
       - model in collection track by model.id
       - item in items | filter : x | orderBy : order | limitTo : limit as results .

@ match Detail for Expression "model in collection | orderBy: 'id' as filtered_result track by model.id"
     - 0 : "model in collection | orderBy: 'id' as filtered_result track by model.id" 1 : "model" 2 : "collection | orderBy: 'id'" 3 : "filtered_result" 4 : "model.id" index : 0 input : "model in collection | orderBy: 'id' as filtered_result track by model.id" length : 5 __proto__ : Array(0)
            
*/

function  RepeatDirective(Node, Expression, id, context,Template) {
    this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
 //  this.Template = Template.replace(/kk-repeat=\"([^"]*)\"/igm,'');
    
    this.Template = Template;
    this.match = this.Expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
   
    this.Oldcollection = []; 
    this.DeleteCollection=[];
    this.bus=new RepeatBus(Node);
    var _this = this;
     if (this.match) {
       setTimeout(function(){
             _this.UpdateView(_this.context);

         },10);
 
      }
     
}

RepeatDirective.prototype = {
    init: function () {
        var lhs = this.match[1];
        var rhs = this.match[2];
        this.aliasAs = this.match[3];
        this.trackByExp = this.match[4];
        this.rhsData = RepeatDirective_rhsData(rhs);
        var lhsmatch = lhs.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/);
        this.valueIdentifier = lhsmatch[3] || lhsmatch[1];
        this.keyIdentifier = lhsmatch[2];
        var rhs_ast = ParseExpression(rhs);
        var keyIdentifier_ast = {};
        if (isOK(this.keyIdentifier)) {
            keyIdentifier_ast = ParseExpression(this.keyIdentifier);
        }

        var valueIdentifier_ast = ParseExpression(this.valueIdentifier);
        this.collection = FindAnyValue.bind(this.context.data)(this.rhsData.objIdentifier, this.context);
       

    },


    CreateitemContext: function (item) {

        var context = {};
        copy(this.context, context);
        context.data = {};
        context.data['$parent'] = this.context.data;
        context.data[this.valueIdentifier] = item;
        context.old_data = {};
        context.To_updateList = [];
        context.is_updatelooprunning = false;
        context.update_source = '';
        context.template = this.Template;
        context.scope_depth++;
        return context;


    },

    UpdateView: function (context) {

        this.context = context;
        this.init();
        this.CreateInsertCollection();
        this.CreateDeleteCollection();
        this.Update();
        this.Oldcollection = clone(this.collection);

    },
    Update: function () {

        for (var q in this.InsertCollection) {
            if (isArray(this.InsertCollection[q].item) || isObject(this.InsertCollection[q].item)) {
                this.collection[intval(this.InsertCollection[q].index)] = this.ItemBody(this.InsertCollection[q].item);
            }

        }

        for (var q in this.DeleteCollection) {

            this.bus.remove(this.DeleteCollection[q].$Index);
        }

    },


    ItemBody: function (item) {

        try {

            item['$Index'] = this.bus.GetIndex();

            item['$Context'] = this.CreateitemContext(item);
            this.context.To_updateList.push(item['$Context']);
            item['$Context'].To_updateList.push(this.context);
            this.bus.AddnewPassanger(item['$Index'], item['$Context']);
        } catch (e) {
            debugger;
        }

        return item;
    },
    CreateInsertCollection: function () {
        this.InsertCollection = [];
        var oneIndexMatch = false;

        for (var p in this.collection) {
            var m = p.match(/\$/igm);
            if (W.U.count(m) <= 0) {



                if (isOK(this.collection[p].$Index)) {
                    for (var q in this.Oldcollection) {
                        if (isOK(this.Oldcollection[q].$Index)) {


                            if (this.collection[p].$Index == this.Oldcollection[q].$Index) {
                                oneIndexMatch = true;
                            }


                        }


                    }

                    if (!oneIndexMatch) {
                        this.InsertCollection.push({ index: p, item: this.collection[p] });


                    }
                    oneIndexMatch = false;

                } else {
                    this.InsertCollection.push({ index: p, item: this.collection[p] });
                }
            }

        }



    },
    CreateDeleteCollection: function () {

        this.DeleteCollection = [];
        var oneIndexMatch = false;

        for (var p in this.Oldcollection) {

            if (isOK(this.Oldcollection[p].$Index)) {
                for (var q in this.collection) {
                    if (isOK(this.collection[q].$Index)) {


                        if (this.Oldcollection[p].$Index == this.collection[q].$Index) {
                            oneIndexMatch = true;
                        }


                    }


                }

                if (!oneIndexMatch) {
                    this.DeleteCollection.push(this.Oldcollection[p]);


                }
                oneIndexMatch = false;

            } else {
                this.DeleteCollection.push(this.Oldcollection[p]);
            }


        }



    }





};






/*
@Totalseats   => object length


*/

function RepeatBus(PaNode) {
    this.PaNode=PaNode;
    this.lastIndex=0;
 
}


RepeatBus.prototype = {
    AddnewPassanger: function ($index, context) {
        var kkId = this.PaNode.kkid + '.' + $index;
      
        var Nodes = Parse(W.U.Rander(context.template), context, kkId);

        this.insert($index, Nodes);

        context.UpdateView();

    },
    insert: function ($index, Node) {

        W.U.Setview(this.PaNode, Node, 'append');


    },
    GetIndex: function () {
        var lastIndex = this.lastIndex;
        this.lastIndex++;
        return lastIndex;
    },
    remove: function ($index) {
        var kkId = this.PaNode.kkid + '.' + $index + '.0';

        var removeNode = [], len = this.PaNode.childNodes.length;

        for (var q = 0; q < len; q++) {
            if (isOK(this.PaNode.childNodes[q])) {
                var P_kkid = this.PaNode.childNodes[q].kkid;
                if (P_kkid == kkId) {
                    W.U.Setview('', this.PaNode.childNodes[q], 'remove');

                }

            }
        }


    }



};


/*
*/
function RepeatDirective_rhsData(rhs) {
    rhs = rhs.replace(/'/igm,'');
    var ret = {objIdentifier:'',orderBy:'',filter:'',limitTo:0};
var   rhsData = rhs.split('|');
var len=rhsData.length;


if(len==4){
   d=rhsData[3].split(':');
   if(d.length==2){
    ret.limitTo=intval(d[1]);

   }
       len = 3;
}
if(len==3){
   d=rhsData[2].split(':');
   if(d.length==2){
      ret[trim(d[0])]=trim(d[1]);
   }
    len = 2;
}

if(len==2){
   d=rhsData[1].split(':');
   if(d.length==2){
      ret[trim(d[0])]=trim(d[1]);
   }
 len = 1;
}
if(len==1){
    ret.objIdentifier =trim(rhsData[0]); ;

}
return ret;
}