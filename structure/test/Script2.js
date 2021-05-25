W.U.ccbk.Add('pageloaded',function(){



  W.U.Pager.addblockdata({  name:'selectVarient', htmlStr:function(block){
          var data=block.objectdata;
     
  
     var header  =W.T.DashbordFormHeader({titleText:'select vareint',sublitText:'done',submitbuttonAttrstr:''}); 
  var Jid=W.U.KKJ({
       name:data.id+'selectVarient',
       controller:function(){    
       var _this=this;
     this.x=data;
      function get_varient(vid){
           var i=[],names=_this.x.pvN,values=[],p={};
            for(var q in _this.x.pvL){
                    if(_this.x.pvL[q].vid==vid){
                    values=_this.x.pvL[q].pvV;  
                    break;    
                    }
                 
                }


 for(var q in names){
        if(names[q]!=''&&W.U.isOK(values[q])){
       i.push({name:names[q],value:values[q]});     

        }
        }
           return i;


       }   
       
       
      function vareint_List(){
           var i=[];
    
            for(var q in _this.x.pvL){
         i.push({v:get_varient(_this.x.pvL[q].vid),cartAdd:function(e){ 
   var __this =this.varientrow,Node=e.srcElement||e.target,vid=__this.i.vid;
     __this.quantity++;
             W.U.Browsing.AddInCart(_this.x.pid,vid,__this.quantity,Node,function(){
                  W.F.Toast('text_411');
                  W.U.Browsing.cartIconUpdate('update');
                 
            },'add to cart','+',false);
     
   
        },cartRemove:function(e){ 
   var __this =this.varientrow,Node=e.srcElement||e.target,vid=__this.i.vid;
     __this.quantity--;
             W.U.Browsing.AddInCart(_this.x.pid,vid,__this.quantity,Node,function(){
                  W.F.Toast('text_411');
                  W.U.Browsing.cartIconUpdate('update');
                 
            },'-','-',false);
     
   
        },quantity:0,pid:_this.x.pid,i:_this.x.pvL[q]}); 
                }

return i;
      }  


 this.varient=vareint_List();
  
       }


 });    
 var ch='<div class="block _Bdy"  data-kkcomponent="'+Jid+'" >'

 +'<div class="block  bs-1"  ><div class="block bs-1 _Bdy  bg_0" kk-repeat="varientrow in this.varient" ><div  class="w8 ov-hi" >'
 +'<span class="" kk-repeat="varient in varientrow.v" > <span  class="span">{{varient.name}}</span><span  class="span fw-b" >{{varient.value}}</span></span>'
 +'</div><div class="w4"  >'
 +'<a class="btn btn-xs" href="javascript:void(0);" kk-show="(varientrow.quantity==0)"  kk-click="varientrow.cartAdd" >add to cart</a>'
 +'<div class="block" kk-show="(varientrow.quantity>0)" ><span class="span"><a href="javascript:void(0);" class="btn btn-xs fs14 fw-b ad-4" kk-click="varientrow.cartRemove" >-</a></span> <span class=" span fw-b">{{varientrow.quantity}}</span><span class="span"><a class="btn btn-xs  fs14 fw-b ad-4" href="javascript:void(0);" kk-click="varientrow.cartAdd" >+</a></span></div>'
 
 +'</div></div></div></div>'

 +'<div>';
   var ret= '';

  switch(W.I.initType){
      case 2:
 var  col=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'',true)+'</div>';    
       ret= W.T.ColumnWrapXXX(['',col, ''],['w-x-6','w-x-12','w-x-6']); 
      break;
      case 3:
   
       ret= W.T.wrapForModal(header,ch,''); 
      break;
      default:
 ret=  W.T.wrap(header,ch,''); 
  }

     
  return ret; 
  }});


   });