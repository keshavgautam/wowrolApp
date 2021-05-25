/*
* 
*/
; (function(W){
   "use strict";
   var Status= ['Processing', 'Dispatched', 'Pending', 'Ready to Collect','Cancelled by buyer','Cancelled by store','Delivered','Failed','To be returned','To be replaced','Cancelled return/replacement',' returned',' replaced','Completed with Good shopping experience','Completed with Bad shopping experience'];
//--status nams

function StatusNamesForFrom(nstatus){
    var Names=[];
    for(var q in nstatus){
        Names.push(Status[nstatus[q]]);
    }


    return Names;
}
//--

 function Component1(){
            var ch ='', x= this.data;
            ch+='<div class="block  bg_0 m_b5"><div class="block _bdy "><span class="span"> Order Id</span>&nbsp;&nbsp;&nbsp;<span class="fw-b tt-c">'+x.oid+'</span></div><div class="block _bdy "><span class="span">text_159</span>&nbsp;&nbsp;&nbsp;<span class="fw-b tt-c">' +  Status[x.status] + '</span></div></div>';
            
            return ch; 
      }
 function Component3(){
            var ch ='', x= this.data;var _this=this;
            ch+='<div class="block bg_0  "> <div class="block _bdy fw-b">text_160</div>';
            var fullfillment=this.fullfillment;
            for(var q in fullfillment){
                ch+=' <div class="block b_gtl bg_0"> <div class="block _bdy "><span class="span">Leval-'+q+'</span>&nbsp;&nbsp;&nbsp;<span class="fw-b tt-c">'+Status[fullfillment[q].status]+'</span>&nbsp;&nbsp;&nbsp;<span class="span">'+fullfillment[q].date+'</span></div></div>';
            }


            ch += '<div class="block b_gtl  bg_0" ><form name="nextorderstatus'+x.oid+'" onsubmit="return false;"><div class="ul  block"><div class="li al-c _bdy fw-b">text_161</div><div class="li " data-junction="nextorderstatus" ></div></div><input type="hidden" name="oid" value="'+x.oid+'"><div class="block "> <textarea class="form-mold textarea no-border " name="status_note" placeholder="Addtional Note" rows="3"></textarea> </div><div class="block " data-help="spreadform"></div></form></div>';

    //--
      W.U.JunctionAdd(W.A.page.AppId,'nextorderstatus',function(){
//call back to biind Listcheckbox
        W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name: "nextorderstatus", values: x.nstatus, valuesname: StatusNamesForFrom(x.nstatus), Selected:'', Class: '', Listid: '0',callback:function(){
this.ListCheckBox.loadingOn();

//out business area
    
 W.U.AddDom(_this.walkWay.div2,'<div class="block   " >'+Component2()+'</div>','html');
//out business area  
//call back when item get click
//this call back return the selected value
this.ListCheckBox.Value.Selected=this.itemvalue;
 
this.ListCheckBox.init();
this.ListCheckBox.loadingOff();
//-- do not remove  it
  }});  

            ch+='</div>'; 
            return ch; 
      }
function Component2(){
    var ch='<div class="block m_b10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">To save permanently this chenge ,click Update.</div></div>';


    return ch;
}


    var S={
    Wrap:function(){
        var ch='';
        ch+='<div class="block" data-nodeid="OrderStatusUpdate" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div>';


        return ch;
    },
   Component1:Component1,
   Component3:Component3
    };

   W.T.OrderStatusUpdate=S;

})(wowrol);