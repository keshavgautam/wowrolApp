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
        this.Value=args.Value;
        this.init();
    }
    Handler.prototype.init = function () {
        var list = this.makeList();

        var newView =  W.U.Rander(list);
        var attrloding = 'data-listcheckboxhelp';
    
         this.Value.loading = W.U('[' + attrloding + '="' + this.Value.name + ':' + this.Value.Listid + '"]',newView[0])[0];
        this.Value.loading.removeAttribute(attrloding);


        W.U.Setview(this.Node, newView, 'html');


    }
    Handler.prototype.loadingOn = function () { 
    
    W.U.AddDom(this.Value.loading, W.U.loading_svg(20, 20), 'html')
    }
    Handler.prototype.loadingOff = function () { 
       W.U.AddDom(this.Value.loading,'', 'html')
    
    }
    Handler.prototype.makeList = function () {

        var checkboxName = this.Value.name;
        var checkboxValue = this.Value.values;
        var checkboxValueName = this.Value.valuesname;
        var checkboxSelected = this.Value.Selected;
        var checkboxClass = this.Value.Class;
        var checkboxListid = this.Value.Listid;
        var callback = this.Value.callback;
        var result = '';
        var list = '<ul class="ul ul-menu li_bdy ' + checkboxClass + '">';

        for (var q in checkboxValue) {
            if (checkboxValue[q] == checkboxSelected) {
                list += ' <li class="fw-b "><span>' + checkboxValueName[q] + '</span> </li>';
                result = checkboxValueName[q];
            } else { 
         list += ' <li class="fw-b "><a  href="javascript:void(0);"   data-junction="' + checkboxName + ':'+checkboxListid+q+'" >' + checkboxValueName[q] + '</a></li>'; 
  
  
         
         
            
            }
// binding Item to call back
  
W.U.JunctionAdd(W.A.page.AppId, checkboxName + ':' + checkboxListid+q, function () {
//call back when item get click
                this.Node.onclick = callback.bind(this.data);
                         }, { itemvalue: checkboxValue[q],
                             item: checkboxName + ':' + checkboxListid,
                             ListCheckBox:this
                         }); 

//--

  if(q!=(checkboxValue.length-1)){
                           
                           list += '<li class="fw-b ">&nbsp; |&nbsp; </li>';
                       }

        }

     list += ' <li class="" data-listcheckboxhelp="' + checkboxName + ':'+checkboxListid+'"></li><div class="li hide"><input type="hidden"  name="' + checkboxName + ':'+checkboxListid+'" value="'+checkboxSelected+'"></div>';
                 list += ' </ul >';
        return list;
    }






    new Handler(this)
}



W.U.ListCheckBox=ListCheckBox;

})(wowrol);