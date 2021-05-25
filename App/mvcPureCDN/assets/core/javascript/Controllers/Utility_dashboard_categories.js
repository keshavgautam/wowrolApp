/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";


function pagecategoriesedit(block){
         
       
 var formData=block.objectdata;
 
 
 
var frombody=W.T.dashboardcategories.pagecategorieseditbody;

var formLogic =function() {
    var rv = ['category_name', 'cid', 'sid', 'is_default'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=4, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
      var AlertError = W.T.AlertError({message:alert_mes});

   var category = 0;
        $(':hidden.tokenh_input').each(function () {
            if ($(this).attr('name') == 'category') {
                var TYI=W.U.intentdata.get($(this).val());
           
              category=TYI['id'];
              
            }
       

        });

  f_value['parent']= category;
 

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

      var ch= '<form class="block bs-1 " name="addstorecategory"  data-junction="addstoreshipping" onsubmit="return false"></form>';
              W.U.JunctionAdd(W.A.page.AppId,'addstoreshipping',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata); 


             return ch;  

}




  function init(walkway){
    



 W.U.intentdata.add('dc.0',{
                    cN: '',
                    pa: { cid: '', cN: '' },
                    description: '',
                    cid: 0,
                    sid: 0

                });
  W.U.Pager.addblockdata({ name:'categoriesedit', htmlStr:pagecategoriesedit});





 var mainBlock=W.U.Rander(W.T.dashboardcategories.Layout());

  W.U.Setview(walkway,mainBlock,'html');
}



W.U.dashboardcategories={init:init};

 } )(wowrol);