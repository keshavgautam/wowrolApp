/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";


function pagediscountsedit(block){
           W.U.console(block);
       
 var formData=block.objectdata;
 
 
 
var frombody=W.T.dashboarddiscounts.pagediscountseditbody;

var formLogic =function() {
    var  f_value = W.U.intentdata.get('creatediscount'),
      error=2, alert_mes = [];
       
       if(f_value.dc==''){ alert_mes.push('ajax_60'); }else{ error--;}
       switch(f_value.dt){
         case 0:
         case "0":
     if(f_value.d==''){ alert_mes.push('ajax_61'); }else{ error--;}
         break;  
         case 1:
         case "1":
     if(f_value.d==''){ alert_mes.push('ajax_61'); }else{ error--;}
         break; 
     

       }
       
       switch(f_value.at){
    
         case 1:
         case "1":
         error++;
     if(f_value.ms==''){ alert_mes.push('ajax_62'); }else{ error--;}
         break; 
           }

     switch(f_value.ut){
    
         case 1:
         case "1":
      error++;
     if(f_value.v==''){ alert_mes.push('ajax_63'); }else{ error--;}
         break; 
           }
        
     var AlertError = W.T.AlertError({message:alert_mes});




      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

                            
                 W.U.DashboardTable.updateRow(this.data[0]);              

                             
                   W.U.Pager.togglePage(W.I.dp, W.I.dpbf);          

                             

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

 }



var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:''
         };

      var ch= '<form class="block bs-1 " name="creatediscount"  data-junction="creatediscount" onsubmit="return false"></form>';
              W.U.JunctionAdd(W.A.page.AppId,'creatediscount',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata); 


             return ch;  

}




  function init(walkway){
    
W.U.KKJunction('creatediscount',{
       controller:function(){     
   this.dc='';
 this.dt=0;

 this.d=0;
 this.currency_symbol='Rs.';
   
  this.at=0;
  this.ms=0;
  this.ut=0;
 this.bd=W.U.Datepicker.dategive("last",1);
 this.ed=W.U.Datepicker.dategive("next",2);
 this.drt=0;
  this.v='';

       },
       name:'creatediscount'


 });


 W.U.intentdata.add('discount.0',{
                    dc: ' default name',
                    d: 0,
                    description: '',
                    cid: 0,
                    sid: 0

                });
  W.U.Pager.addblockdata({ name:'discountedit', htmlStr:pagediscountsedit});





 var mainBlock=W.U.Rander(W.T.dashboarddiscounts.Layout());

  W.U.Setview(walkway,mainBlock,'html');
}



W.U.dashboarddiscounts={init:init};

 } )(wowrol);