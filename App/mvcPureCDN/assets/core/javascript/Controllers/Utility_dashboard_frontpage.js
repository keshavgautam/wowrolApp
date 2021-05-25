/*
* 
*/
; (function(W){
   "use strict";

function Slider(Node,data){
       function Handler(Node,data){
    this.data=data; 
  this.Node=Node; 

   this.init();
    }
    Handler.prototype.init=function(){
  var _this=this;
   this.CreateMarkup();
  var mainBlock=W.U.Rander('<div class="block">'+this.Header+this.Box+'</div>');


  W.U.attrclick('[data-btn="addslider"]',mainBlock[0],function(){
       OpenForm("");
   });

  W.U.attrclick('[data-btneditslider]',mainBlock[0],function(){
         var index=this['data-btneditslider'];
       OpenForm("edit",index);
   });
  W.U.attrclick('[data-btndeleteslider]',mainBlock[0],function(){
         var index=this['data-btndeleteslider'];
       OpenForm("delete",index);
   }); 
 

  W.U.Setview( this.Node,mainBlock,'html');

  function OpenForm(action,index){


  var objectdata= {webimages:[],mainimages:[],linkto:'',action:1,   i: _this.data.length}  ;


switch(action){
  case 'edit':
  objectdata=_this.data[index];
  objectdata.action=1;
  objectdata.i=index;

  break; 
 case 'delete':
   objectdata=_this.data[index];
   objectdata.action=0;
   objectdata.i=index;
  break; 
}





  W.U.Pager.addblockdata({ name:'sliderform',htmlStr:_this.FormPage.bind(_this),objectdata:objectdata});

  W.U.Pager.DirectInitPage(W.I.dp,'sliderform');  


 }

    }
  Handler.prototype.CreateMarkup=function(){
      var T=W.T.DashboardFrontPage;
   this.Header= T.SliderHeader.bind(this)();
   this.Box=T.SliderBox.bind(this)(); 
      
      
     
    }

 Handler.prototype.FormPage=function(block){
    var _this=this;
  var data=block.objectdata,action=data.action,formData=data;  

var frombody=W.T.DashboardFrontPage.SliderForm;
var formLogic =function() {
    var f_value={},allfield = W.F.walk_way_all('*', this.formname),
      error=0, alert_mes = [];





   var images = [], webimages = [];
   
 var   SavedFilesInintent=W.U.intentdata.get('sliderimages'); 
 if(W.U.isOK(SavedFilesInintent)){
    if(W.U.isOK(SavedFilesInintent['web'])){
     webimages=SavedFilesInintent['web'];
 } 
    if(W.U.isOK(SavedFilesInintent['main'])){
    images=SavedFilesInintent['main'];
 } 
  
 }

 if ((images.length+webimages.length) < 1) {  alert_mes = alert_mes.concat(['ajax_30']);error++; }


  f_value.mainimages = images;
  f_value.webimages =webimages;

  //--
  var category_product= '';
  for(var q in allfield){
      if(allfield[q].name=='category_product'){
        category_product= allfield[q].value;  
      }
  }


   if(category_product!=''){
    
   var li_data= W.U.intentdata.get(category_product);

      f_value.linkto=li_data;
 }

  if(!W.U.isOK(f_value.linkto)){
  alert_mes = alert_mes.concat(['ajax_31']);error++;    
  }
   
      f_value['action']=this.formData.action;//add
       f_value['i']=this.formData.i;//add
 

  var AlertError = W.T.AlertError({message:alert_mes});

  var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };

    return ret;
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

                                W.U.madianLoading("hide");

 if (action== 'delete'){
    
   W.F.Toast({msg:'successfully_deleted'});     
 }else{
      
            W.F.Toast({msg:'successfully_saved'});     
 }
                             
                           

               

 // W.U.console('-------===='); 
   W.U.console(this.data); 
       W.A.page.AppView.sBox=   _this.data=this.data;  
          W.U.intentdata.add('sbox.0',this.data);     
                          
         _this.init();
      //    W.U.console(_this);          
       W.U.Pager.togglePage(W.I.dp,'sliderPage');  
                             

     }
var onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

     if( W.U.browser.opera_mini){
    
     }
 }

  if (action==0){
 var formLogic =function() {
     var   f_value =   formData;
           f_value.action =0;//{cid:data.cid,category:data.cid,action:0,'sort:0':0};

      return {error:0,
              f_value:f_value,//required input value
              AlertError:[] //alert

  }
}    
var frombody=W.T.DashboardFrontPage.SliderDelete;   
  }

var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic
         };

//form data

    var ch ='<form name="addslider"  data-junction="addslider" onsubmit="return false"> </form>';
   
   W.U.JunctionAdd(W.A.page.AppId,'addslider',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);  

    return ch;
}

    new Handler(Node,data);
}




//-----------------------------------------------




function CategoryBox(Node,data){
    var CBox={id:0,sortBy:0};

    function Handler(Node,data){
    this.data=data; 
  this.Node=Node; 
   this.init();
    }
    Handler.prototype.init=function(){
  var _this=this;
   this.CreateMarkup();
  var mainBlock=W.U.Rander('<div class="block">'+this.Header+this.Box+'</div>');


  W.U.attrclick('[data-btn="addCbox"]',mainBlock[0],function(){
       OpenForm("");
   });

  W.U.attrclick('[data-btneditcbox]',mainBlock[0],function(){
         var index=this['data-btneditcbox'];
       OpenForm("edit",index);
   });
  W.U.attrclick('[data-btndeletecbox]',mainBlock[0],function(){
         var index=this['data-btndeletecbox'];
       OpenForm("delete",index);
   }); 
 

  W.U.Setview( this.Node,mainBlock,'html');

  function OpenForm(action,index){


  var objectdata={
                    cN: ' default name',
                    cid: 0,
                    i: _this.data.length,
                    slug:'',
                    sort:0

                };
 objectdata.action="new";

switch(action){
  case 'edit':
  objectdata=_this.data[index];
  objectdata.action="edit";
  objectdata.i=index;

  break; 
 case 'delete':
   objectdata=_this.data[index];
   objectdata.action="delete";
   objectdata.i=index;
  break; 
}





  W.U.Pager.addblockdata({ name:'catalogboxesform',htmlStr:_this.FormPage.bind(_this),objectdata:objectdata});

  W.U.Pager.DirectInitPage(W.I.dp,'catalogboxesform');  


 }

    }
  Handler.prototype.CreateMarkup=function(){
      var T=W.T.DashboardFrontPage;
   this.Header= T.CboxHeader.bind(this)();
   this.Box=T.CboxBox.bind(this)(); 
      
      
     
    }

 Handler.prototype.FormPage=function(block){
    var _this=this;
  var data=block.objectdata,action=data.action,formData=data;  
 // W.U.console(this);
var frombody=W.T.DashboardFrontPage.CboxForm;
var formLogic =function() {
    var rv = ['category', 'sort:0','id'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=3, alert_mes = [];
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});   


 
        $(':hidden.tokenh_input').each(function () {
            if ($(this).attr('name') == 'category') {
                var TYI=W.U.intentdata.get($(this).val());
           
             f_value['cid']=TYI['id'];
               
            }
           

        });

   





  
     

     
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
      var AlertError = W.T.AlertError({message:alert_mes});




    f_value['category']= f_value['cid'];

      f_value['action']=1;//add
 
      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

                                W.U.madianLoading("hide");

 if (action== 'delete'){
    
   W.F.Toast({msg:'successfully_deleted'});     
 }else{
      
            W.F.Toast({msg:'successfully_saved'});     
 }
                             
                           

               

 // W.U.console('-------===='); 
   W.U.console(this.data); 
       W.A.page.AppView.cBox=   _this.data=this.data;  
          W.U.intentdata.add('cbox.0',this.data);     
                          
         _this.init();
      //    W.U.console(_this);          
       W.U.Pager.togglePage(W.I.dp,'catalogboxes');  
                             

     }
var onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

     if( W.U.browser.opera_mini){
      alert(this.data);  
     }
 }

  if (action== 'delete'){
 var formLogic =function() {
   var   f_value ={cid:data.cid,category:data.cid,action:0,'sort:0':0};
 
      return {error:0,
              f_value:f_value,//required input value
              AlertError:[] //alert

  }
}    
var frombody=W.T.DashboardFrontPage.CboxDelete;   
  }

var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic
         };

//form data

    var ch ='<form name="addcategorybox"  data-junction="addcategorybox" onsubmit="return false"> </form>';
   
   W.U.JunctionAdd(W.A.page.AppId,'addcategorybox',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);  

    return ch;
}

    new Handler(Node,data);
}




//-----------------------------------------------
/*
*/
 function sliderPage(block){
   
    var data=block.objectdata;   
 var Header  =W.T.DashbordFormHeader({titleText:'text_95',sublitText:'',submitbutton:false});
var ch='<div class="block" data-junction="sliderinit"  ><div>'; 


W.U.Junction('sliderinit',function(){
   Slider( this.Node,data);
},{});


         return   W.T.DashbordFormWrap(Header, ch);
  
   
       
   }
/*
*/
 function catalogboxesPage(block){
    var cbox=block.objectdata;   
 var Header  =W.T.DashbordFormHeader({titleText:'text_88',sublitText:'',submitbutton:false});
var ch='<div class="block" data-junction="catalogboxesinit"  ><div>'; 


W.U.Junction('catalogboxesinit',function(){
   CategoryBox( this.Node,cbox);
},{});


         return   W.T.DashbordFormWrap(Header, ch);
   }




//---
function init(walkway,x){
  
   W.U.intentdata.add('cbox.0',W.A.page.AppView.cBox);
   W.U.intentdata.add('slider.0',W.A.page.AppView.sBox);
   
  W.U.Pager.addblockdata({ name:'sliderPage', htmlStr:sliderPage});
  W.U.Pager.addblockdata({ name:'catalogboxes', htmlStr:catalogboxesPage});


  var mainBlock=W.U.Rander(W.T.DashboardFrontPage.Layout(x));


  W.U.Setview(walkway,mainBlock,'html');

}
//-- category box-->>
 W.U.DashboardFrontPage={
    init:init

 };
})(wowrol);