/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";


function pagecategoriesedit(block){
           W.U.console(block);
       
 var formData=block.objectdata;
 
 
 
var frombody=W.T.dashboardcollections.pagecategorieseditbody;

var formLogic =function() {
    var rv = ['collection_name', 'svg_icon','cid'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=3, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
      var AlertError = W.T.AlertError({message:alert_mes});

 
   var allcollection=W.F.walk_way_all(['allcollection'], this.formname);
   W.U.console(allcollection);
   for(var q in allcollection){
   var selectbox_data= W.U.intentdata.get(allcollection[q]);
   if(W.U.isOK(selectbox_data)){
         f_value['parent']= selectbox_data['id'];    
   }
  
   }
 
 

   var rv = ['description'];
   W.U.extend(f_value, W.F.walk_way_all(rv, this.formname));




      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
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

      var ch= '<form class="block bs-1 " name="addstorecollection"  data-junction="addstorecollection" onsubmit="return false"></form>';
              W.U.JunctionAdd(W.A.page.AppId,'addstorecollection',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata); 


             return ch;  

}




  function init(walkway){
    



 W.U.intentdata.add('collection.0',{
                    cN: ' default name',
                    pa: { cid: '', cN: '' },
                    des: '',
                    is: '',
                    ut:0,
                    z: {id:'',name:''},
                    cid: 0

                });
  W.U.Pager.addblockdata({ name:'collectionedit', htmlStr:pagecategoriesedit});





 var mainBlock=W.U.Rander(W.T.dashboardcollections.Layout());

  W.U.Setview(walkway,mainBlock,'html');
}



W.U.dashboardcollections={init:init};

 } )(wowrol);