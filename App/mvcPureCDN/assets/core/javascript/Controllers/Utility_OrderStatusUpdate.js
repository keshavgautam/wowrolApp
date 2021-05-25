/*
* 
*/
; (function(W){
   "use strict";

function StatusUpdate(data){
    function Handler(data){
       this.data=data; 
       this.walkWay=getwalkwayNode(); 
       this.init();

    }

    Handler.prototype.init=function(){


         this.CreateMarkUp();
 
      W.U.AddDom(this.walkWay.div0,'<div class="block   " >'+this.component1+'</div>','html');
  W.U.AddDom(this.walkWay.div3,'<div class="block   " >'+this.component3+'</div>','html');

  

    }
    Handler.prototype.CreateMarkUp=function(){
      this.fullfillment=this.GetFullfillment();
      this.component1=W.T.OrderStatusUpdate.Component1.bind(this)(); 
      this.component3=W.T.OrderStatusUpdate.Component3.bind(this)(); 

     

    }
   Handler.prototype.GetFullfillment=function(){
    var status= this.data.status;
   var track= this.data.track;
      var fullfillment=[];
    
      for(var q in track){
          if(track[q].type==1){
            fullfillment.push({status:track[q].status,date:track[q].date});  
          }
         
      }

     return fullfillment;
      }




    function getwalkwayNode(){
    var Node=W.U.id("OrderStatusUpdate").childNodes;
  
    return {div0:Node[0],
            div1:Node[1],
            div2:Node[2],
            div3:Node[3]};
}

    new Handler(data);
}
   



   function init(walkway,Data){


       var mainBlock=W.U.Rander( W.T.OrderStatusUpdate.Wrap(Data));
W.U.Setview(walkway,mainBlock,'html');
         StatusUpdate(Data)
   }

function ApplyStatusChange(oid){
     var f_value = W.F.walk_way_all(['nextorderstatus:0','oid','status_note'],'nextorderstatus'+oid+'');

    var formData = {
                    form: 'nextorderstatus',
                    f_value:f_value
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
 W.U.Pager.togglePage('mainpage','orderchangestatus'); 
                 W.U.madianLoading('show');
       
                    },
                    success: function (data) {
                        W.U.madianLoading('hide');
           var ret = JSON.parse(data);
         
                        if (ret.state == 500) {
  W.F.Toast({msg:'Action Not completed',theme:'error'});
  
                        }
                        if (ret.state == 200) {
 W.F.Toast({msg:'Action completed'});
      W.U.DashboardTable.updateRow(ret.response[0]);
     W.U.Pager.togglePage('mainpage','blockFront');  

           
                              }
 
                    }

                });


}
   W.U.OrderStatusUpdate={
       init:init,
       Apply:ApplyStatusChange
       };

})(wowrol);