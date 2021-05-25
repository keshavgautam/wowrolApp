/*
* 
*/
; (function(W){
   "use strict";

  


function QuickaddProduct(block){
 

     
  
     

 var formData=block.objectdata;

var frombody=W.T.QuickAdd.QuickaddProduct;
var formLogic =function() {
     var rv = ['product_name', 'pid', 'sid',   'vid', 'sell_price', 'compare_price', 'sku', 'stock'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=8, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
 

   var category = Array(),searchword= [''],i=0;
        $(':hidden.tokenh_input').each(function () {
            if ($(this).attr('name') == 'category') {
                var TYI=W.U.intentdata.get($(this).val());
           
              category[i]=TYI['id'];
                  i++;
            }
        

        });

   


   if (category.length == 0) { error++; alert_mes.push('<li> text_378</li>');  }

    W.U.extend(f_value, W.F.walk_way_all(['description','varient_1','varient_2','varient_3','keyfeature_0','keyfeature_1','keyfeature_2','keyfeature_3'], this.formname));

    if((f_value['varient_1']==''&&f_value['varient_2']==''&&f_value['varient_3']=='')&&f_value['has_varient']=='1'){
      error++; alert_mes.push('<li>text_379</li>');   
    }


  f_value['category']=category;








     var images = [], webimages = [],featureimage,copyImage,s=0;
   
 var   SavedFilesInintent=W.U.intentdata.get('varientimages'+f_value.vid); 
 if(W.U.isOK(SavedFilesInintent)){
    if(W.U.isOK(SavedFilesInintent['web'])){
     copyImage=SavedFilesInintent['web'];
     for(var q in  copyImage){
       if(W.U.isOK(copyImage[q].url)){
           webimages.push(copyImage[q]) ; 
       }  
     }
     
 } 
    if(W.U.isOK(SavedFilesInintent['main'])){
    copyImage=SavedFilesInintent['main'];
     for(var q in  copyImage){
       if(W.U.isOK(copyImage[q].url)){
         images.push(copyImage[q]) ; 
       }  
     }
 } 
  
 }

 if ((images.length+webimages.length) < 1) {  alert_mes = alert_mes.concat(['Images are required.']);error++; }


  f_value.mainimages = images;
  f_value.webimages =webimages;
  //--
 var   SavedFeatureImage=W.U.intentdata.get('varientimages'+f_value.vid+'FeatureImage'); 
  if(!W.U.isOK(SavedFeatureImage)){
    
        if(webimages.length>0){
         featureimage=webimages[0];   
      }
        if(images.length>0){
         featureimage=images[0];   
      }
  }else{
      featureimage=SavedFeatureImage;
  }

  f_value.featureimage =featureimage;  







    var AlertError = W.T.AlertError({message:alert_mes});

// W.U.console(f_value); W.U.console(error);W.U.console(AlertError);


      
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


                               

                            
                             switch(W.A.page.AppId){
                              case 'dashboard_products':
                        W.U.DashboardTable.updateRow(this.data[0]);              
                        W.U.Pager.togglePage(W.I.dp, W.I.dpbf);       
                    
                                break;   

                             }
                               
                      W.F.Toast('text_283');          

                             

     }
var onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

     if( W.U.browser.opera_mini){
      alert(this.data);  
     }
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
//form data

    var ch ='<form name="QuickaddProduct"  data-junction="QuickaddProduct" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'QuickaddProduct',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);  


    return ch;
}

function QuickaddCategory(block){
    
       
 var formData=block.objectdata;
 
 
 
var frombody=W.T.QuickAdd.QuickaddCategory;

var formLogic =function() {
    var rv = ['category_name', 'cid', 'sid', 'is_default'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=4, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
      var AlertError = W.T.AlertError({message:alert_mes});

   var rv = ['category'];
   var parentJson=W.F.walk_way_all(rv, this.formname);
   W.U.console(parentJson);
  f_value['parent']= W.F.JSONparse(parentJson['category'],{id:''})['id'];
 

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

                            
              
                             switch(W.A.page.AppId){
                              case 'dashboard_products':
       
                    W.U.Pager.togglePage(W.I.dp, block.triggerdata[4]);       
                    W.U.ccbk.Run(W.U.Page,'setTokenselectcategory_0',{id:this.data[0].cid,name:this.data[0].cN});
                    W.U.ccbk.Run(W.U.Page,'setTokenselectcategory_1',{id:this.data[0].cid,name:this.data[0].cN});
                    W.A.page.AppView.defaultcategory=this.data[0];
                                break;   

                             }
                               
                      W.F.Toast('text_283');              

                             

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

 function init(){
      
 W.U.intentdata.add('sp_a.0',{
                    pN: '',
                    des: '',
                    pid: 0,
                    vid: 0,
                    sku:'',
                    stk:'',
                    sP:'',
                    cP:'',
                    Issh:'',
                    W:'',
                    Wu:'g',
                    id: 0,
                    sid: 0,
                    kf:['','','',''],
                    pvN:['','',''],
                    sW:[],
                    pC:[]

                });
 W.U.intentdata.add('dc_a.0',{
                    cN: '',
                    pa: { cid: '', cN: '' },
                    description: '',
                    cid: 0,
                    sid: 0

                });

    W.U.Pager.addblockdata({  name:'QuickaddProduct', htmlStr:QuickaddProduct,onRander:Array(function(){
        var data= W.A.page.AppView.defaultcategory;
     W.U.ccbk.Run(W.U.Page,'setTokenselectcategory_1',{id:data.cid,name:data.cN});
    })});
    W.U.Pager.addblockdata({  name:'QuickaddCategory', htmlStr:QuickaddCategory});
   }

  W.U.ccbk.Add('pageloaded',function(){
       
    init();
    });

           W.U.QuickAdd={
            


           };

   })(wowrol);