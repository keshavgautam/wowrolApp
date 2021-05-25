/*
* page set up 2
*/
; (function(W){
   "use strict";
/**
   * @description  ListCheckBox
   * @param  this = {Node:Node[i],Value:dataAttrs[a].value}
   */

function ListCheckBox() {


    function Handler(args) {
        this.Node = args.Node;
        this.Value= W.U.extend(Handler.Default, args.Value);
        this.init();
    }
       Handler.Default = {
       name:"test",
       useCompositeName:true,
       values:["en","hi"],
       valuesname:["English","Hindi"],
       Selected:'',
       Class:'',
       Listid:'0',
       callback:W.U.noop
       };

    Handler.prototype.init = function () {
        var list = this.makeList();

        var newView =  W.U.Rander(list);
        var attrloding = 'data-listcheckboxhelp';
    
         this.Value.loading = W.U('[' + attrloding + '="' + this.Value.name + ':' + this.Value.Listid + '"]',newView[0])[0];
        this.Value.loading.removeAttribute(attrloding);


        W.U.Setview(this.Node, newView, 'html');


    }
    Handler.prototype.loadingOn = function () { 
    
    W.U.AddDom(this.Value.loading, W.U.loading_svg(8, 8), 'html')
    }
    Handler.prototype.loadingOff = function () { 
       W.U.AddDom(this.Value.loading,'', 'html')
    
    }
    Handler.prototype.makeList = function () {
        var _this=this;
        var checkboxName = this.Value.name;
    
        var checkboxValue = this.Value.values;
        var checkboxValueName = this.Value.valuesname;
        var checkboxSelected = this.Value.Selected;
        var checkboxClass = this.Value.Class;
        var checkboxListid = this.Value.Listid;
        var callback = this.Value.callback;
        var InputName = (this.Value.useCompositeName)?(checkboxName + ':'+checkboxListid):(checkboxListid);

        var result = '';
        var list = '<ul class="ul ul-menu li_bdy ' + checkboxClass + '">';

        for (var q in checkboxValue) {
            if (checkboxValue[q] == checkboxSelected) {
                list += ' <li class="fw-b "><span class="span mklabel  circular empty bg_1"></span><span>' + checkboxValueName[q] + '</span> </li>';
                result = checkboxValueName[q];
            } else { 

var Jid=W.U.J(function(){ var __this=this;    
this.Node.onclick = function(){  _this.onchange(__this.data); }   
    },{ itemvalue: checkboxValue[q],
                             item: checkboxName + ':' + checkboxListid,
                             ListCheckBox:this
                         });



         list += ' <li class="fw-b "><a  href="javascript:void(0);"   data-junction="' + Jid+'" ><span class="span mklabel  circular empty "></span><span>' + checkboxValueName[q] + '</span></a></li>'; 
  
  
         
         
            
            }
// binding Item to call back


//--

  if(q!=(checkboxValue.length-1)){
                           
                           list += '<li class="fw-b ">&nbsp; |&nbsp; </li>';
                       }

        }

     list += ' <li class="" data-listcheckboxhelp="' + checkboxName + ':'+checkboxListid+'"></li><div class="li hide"><input type="hidden"  name="' + InputName+'" value="'+checkboxSelected+'"></div>';
                 list += ' </ul >';
        return list;
    }
    Handler.prototype.onchange=function(data){
       
this.loadingOn();

//out business area
this.Value.callback.bind(data)();
//out business area  
//call back when item get click
//this call back return the selected value
this.Value.Selected=data.itemvalue;
this.init();
this.loadingOff();
//-- do not remove  it
  }





    new Handler(this);
}



W.U.ListCheckBox=ListCheckBox;

})(wowrol);