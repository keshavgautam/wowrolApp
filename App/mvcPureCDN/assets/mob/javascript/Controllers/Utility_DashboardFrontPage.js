/*
* 
*/
; (function(W){
   "use strict";

function backBinds(args){
    var defaultdata={title:'view spread title',btntext:'Spread',submitshow:false,submitcallback:null};
    args = W.U.extend(defaultdata, args);

    var Title=W.U('[data-jqid="frontpagebackTitle"]',W.U.id('block.spreadoneback'))[0]; 
  W.U.SetText(Title,args.title,'html');
    var submit=W.U('[data-jqid="frontpagebacksubmit"]',W.U.id('block.spreadoneback'))[0];
  if(args.submitshow){
  
    submit.onclick=args.submitcallback;
    submit.style.display="block";
      W.U.SetText(submit,args.btntext,'html');   
  }else{
        submit.style.display="none";
  }
}

//-- category box
function CategoryBox(x){
    var CBox={id:0,sortBy:0};

    function Handler(list){
    this.data=x; 
   this.init();
    }
    Handler.prototype.init=function(){
   var walkway= getwalkwayNode();var _this=this;
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


  W.U.Setview(walkway.categorybox,mainBlock,'html');

  function OpenForm(action,index){
   var event = jQuery.Event("show");
                event.id = 'frontpageback';
                $(W.U.id('block.frontpageback')).parent().triggerHandler(event);

  var mainBlock=W.U.Rander('<div class="block">'+_this.Form("new")+'</div>');
switch(action){
  case 'edit':
  var mainBlock=W.U.Rander('<div class="block">'+_this.Form("edit", _this.data[index])+'</div>');
  break; 
 case 'delete':
  var mainBlock=W.U.Rander('<div class="block">'+_this.Form("delete", _this.data[index])+'</div>');
  break; 
}


W.U.Setview(walkway.back,mainBlock,'html');
 }

    }
  Handler.prototype.CreateMarkup=function(){
      var T=W.T.DashboardFrontPage;
   this.Header= T.CboxHeader.bind(this)();
   this.Box=T.CboxBox.bind(this)(); 
      
      
     
    }
 Handler.prototype.Form=function(action,data){
     var _this=this;
        var ch='A form form own app';
     var data = (typeof (data) == 'undefined') ? {} : data;  
 var Title=W.U('[data-jqid="frontpagebackTitle"]',W.U.id('block.spreadoneback'))[0]; 
 var submit=W.U('[data-jqid="frontpagebacksubmit"]',W.U.id('block.spreadoneback'))[0];
           if (action== 'new') {
     

       W.U.SetText(Title,'Category boxes','html');
       W.U.SetText(submit,'Add New','text');               
           $(submit).show();

                     var formData={
                    cN: ' default name',
                    cid: 0,
                    slug:'',
                    sort:0

                };

                        } else {
    
      W.U.SetText(Title,'Edit Category boxes','html');
       W.U.SetText(submit,'Update','text');               
           $(submit).show();     
              console.log(data);
                   var formData={
                    cN: data.cN,
                    slug:data.slug,
                    cid: data.cid,
                    sort:data.sort
                };



                        }
  if (action== 'delete'){
        W.U.SetText(Title,'Delete Category boxes','html');
       W.U.SetText(submit,'Delete','text');       
  }
//from data


var frombody=W.T.DashboardFrontPage.CboxForm;

var formLogic =function() {
    var rv = ['category', 'sort:0'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=2, alert_mes = [];
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});   
       f_value['cid']= W.F.JSONparse(f_value['category'],{id:''})['id'];
     

     
     
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
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

                   var event = jQuery.Event("hide");
   $(W.U.id('block.frontpageback')).parent().triggerHandler(event);

   console.log('-------===='); 
    console.log(this.data); 
          _this.data=this.data;                      
         _this.init();
          console.log(_this);          

                             

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
            formLogic:formLogic,
            formbtn:submit
         };

//form data

    var ch ='<form name="addcategorybox"  data-junction="addcategorybox" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'addcategorybox',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);  

    return ch;
 }


    new Handler(x);
}



//--
function getwalkwayNode(){
    var Node=W.U.id("frontpagefront").childNodes;
    var backNode=W.U.id("frontpageback");
    return {categorybox:Node[0],
            slidebox:Node[1],
            back:backNode
            };
}



function init(walkway,x){
   
  var mainBlock=W.U.Rander(W.T.DashboardFrontPage.Wrap(x));


  W.U.Setview(walkway,mainBlock,'html');
  CategoryBox(x.cBox);
}
//-- category box-->>
 W.U.DashboardFrontPage={
    init:init

 };
})(wowrol);