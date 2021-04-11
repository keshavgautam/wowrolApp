 ;(function (W) {
     "use strict";
function FromWrap() {
             var ch  ='';

   ch += '<div class="block "  data-nodeid="poBackblock" >Form not found</div>';

            var Wrap =W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="productOptionsInner" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><p class="fw-b al-c"><i class="material-icons"> </i><span class="vl-sp" data-nodeid="poBacktitle">Form Title</span></p></span>',
                done: '<div class="li b_gll"><a href="javascript:void(0);"  data-nodeid="poBacksubmit"      ><span>Form Submit</span><i class="badge _gbtn"></i> </a></div>'
            }), ch);

            return Wrap;
        }
var FilterAttribute=function(){
  console.log('--==FilterAttribute==--');console.log(this); 
      var ch='';
          W.U.SetIdText('poBacktitle','Filtering attribute','html');
       W.U.SetIdText('poBacksubmit','Save','text'); 

var productData=this.data; 
var fiatr=productData.fiatr;

function Handler(wrap,Data){
    this.wrap=wrap;
    this.Data=Data;
    this.UnSaved=(typeof (this.Data.FilterAttributeUnSaved)!='undefined')?this.Data.FilterAttributeUnSaved:0;
    this.init();
};
   Handler.prototype.init = function () {
        this.createMarkup();

   var tableMarkup = '<div class="block ov-hi" >'+ this.Form +this.UnsavedStrip+this.filterList+'</div>';
       
        W.U.AddDom(this.wrap, tableMarkup, 'html');
        W.U.id('poBacksubmit').onclick=this.Submit.bind(this);
     //   console.log(this);  
   
   }
  Handler.prototype.createMarkup = function () {
     this.Form = createForm.bind(this)();
     this.filterList = createfilterList.bind(this)();
     this.UnsavedStrip = createUnsavedStrip.bind(this)();


      function createForm(){
         var ch='<div class="block m_b10 bg_0 _B-gray"> <form name="AddFilter" class="form-horizontal _Bdy" onsubmit="return false" ><div class="block form-piece " > <span class="fw-b"> Add Filter name-value pair and Save.</span > </div><div class="form-piece"> <label class="w2 control-label">Name: &nbsp;</label> <div class="w10 "> <input type="text" name="filter_name" autocomplete="off" class="form-mold" placeholder="Name"> </div></div><div class="form-piece"> <label class="w2 control-label">Value: &nbsp;</label> <div class="w10 "> <input type="text" name="filter_value" autocomplete="off" class="form-mold" placeholder="Value"> </div></div><div class="block" data-help="AddFilter"></div><div class="block"> <button type="button" class="btn btn-block" data-Junction="AddFilter" >Add</button> </div></form></div>';
 var _this=this;
     W.U.JunctionAdd(W.A.page.AppId,'AddFilter',function(){
      this.Node.onclick= _this.AddFilterRow.bind(_this);
   },{}); 


        return ch;
      }

      function createfilterList(){
          var filterList='';
          var fiatr=this.Data.fiatr;
           var _this=this;
for(var  q in fiatr){
     filterList+='<div class="block li _B-gray _bdy"> <div class="block _bdy sr-bgC tt-c"> <button type="button" class="close"  data-Junction="RemoveFilter'+q+'" >×</button><strong class="fw-b">'+fiatr[q].name+'</strong> <ul class="ul"> <li>'+fiatr[q].value+'</li></ul> <input type="hidden" name="option_name" value="fsdf"><input type="hidden" name="option_value" value="sdf"><input type="hidden" name="sfid" value="1032"> </div></div>';

        W.U.JunctionAdd(W.A.page.AppId,'RemoveFilter'+q,function(){
      this.Node.onclick= _this.RemoveFilterRow.bind({_this:_this,index:this.data.index});
   },{index:q}); 


}


var ch='<div class="block m_b10 bg_0 _B-gray"> <div class="block ul "> <div class="block li bg_7 _bdy"><span class="fw-b">Fitters</span></div>'+filterList+'</div></div>';
return ch;
      }

      function createUnsavedStrip(){
          var ch='';
          
          if(this.UnSaved==1){
              ch+='<div class="block m_b10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">To save permanently this edit ,click save.</div></div>';  
          }
        

          return ch;
      }


    }


  Handler.prototype.AddFilterRow =function(){
     var rv = ['filter_name', 'filter_value'],
      f_value = W.F.walk_way_all(rv, 'AddFilter'),
      error=2, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
   
    var AlertError = W.T.AlertError({message:alert_mes});
    console.log(f_value); console.log(error);console.log(AlertError);
    

    if(error==0){
     this.Data.fiatr.push({name:f_value.filter_name,value:f_value.filter_value,filter_attributes_id:0}); 
     this.UnSaved=this.Data.FilterAttributeUnSaved=1;   
      this.init.bind(this)();
    }else{
          W.U.AddDom(W.U('[data-help="AddFilter"]')[0],AlertError,'html');
   W.F.alert(); 
    }

}
 Handler.prototype.RemoveFilterRow=function(){
     var _this=this._this;
     _this.Data.fiatr.splice(this.index, 1);
     _this.UnSaved=_this.Data.FilterAttributeUnSaved=1; 
     _this.init.bind(_this)();
 }

 Handler.prototype.Submit=function(){
     console.log('submited '); console.log(this);
     var _this= this;
  
     var productData=this.Data;
     var fiatr=Parsefiatr(productData.fiatr);


     var form = 'AddFilter',help=W.U('[data-help="' + form + '"]')[0];
     var  f_value = { pid: productData.pid, fiatr: fiatr }
 var formData = {
                    form: form,
                    f_value: f_value
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                        W.U.madianLoading("show");

                    },
                    success: function (data) {



                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
                            W.U.madianLoading("hide");
                  var AlertError =  W.T.AlertError({message:ret.mistake.message});
             W.U.AddDom(help,AlertError,'html');
   W.F.alert(); 

                        }
                        if (ret.state == 200) {

                            $(W.U.id('appModal')).modal('hide');

                            W.U.madianLoading("hide");
_this.Data.fiatr=ret.response;
   _this.UnSaved=_this.Data.FilterAttributeUnSaved=0;   
    _this.init.bind( _this)();
                           


                        }
                    }

                });

function Parsefiatr(fiatr){
    var parse=[];
    for(var q in fiatr){
    parse[q]={name:fiatr[q].name,value:fiatr[q].value}; 
    }

    return JSON.stringify(parse);

}

 }
  new Handler(W.U.id('poBackblock'),productData);
 
}
var SimilarProduct=function(){
    console.log('--==SimilarProduct==--');console.log(this); 
  var ch='';
       W.U.SetIdText('poBacktitle','Up-Sells','html');
       W.U.SetIdText('poBacksubmit','Save','text'); 
var productData=this.data; 
function Handler(wrap,Data){
    this.wrap=wrap;
    this.Data=Data;
    this.UnSaved=(typeof (this.Data.FilterAttributeUnSaved)!='undefined')?this.Data.FilterAttributeUnSaved:0;
    this.init();
};
 Handler.prototype.init = function () {
        this.createMarkup();

   var tableMarkup = '<div class="block ov-hi" >'+this.SuggestionInput+this.ProductList+'<div class="block m_bTouch"></div></div>';
 
        W.U.AddDom(this.wrap,  tableMarkup , 'html');
        W.U.id('poBacksubmit').onclick=this.Submit.bind(this);
    console.log(this);  
   
   }

  Handler.prototype.createMarkup = function () {
  this.SuggestionInput=CreateSuggestionInput.bind(this)();
 this.ProductList=CreateProductList.bind(this)();
  var _this=this;
function CreateSuggestionInput(){
       var upS=this.Data.upS;
      var ch='<div class="block  bg_0  _bdy  " ><div class="block ul "  >';  
 var token='';
                    var suggestion = {
                        name: 'productsuggestion',
                        fireAfter: 4,
                        type: 4,
                        token: 'chips',
                        placeholder: 'Name  of product',
                        onselect: onselect
                    }; 
  for( var q in upS ){  token += '<div class="li hide"><div class="token"> <span>' + upS[q].pN+ '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:upS[q].pid})  + '\' > </div></div>';

}    
  
                  
                   token+='<div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';           

   ch += '<div class="form-piece"> <label class="control-label">Up-sells Products</label> <div class="form-token block" data-junction="productsuggestion"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div></div>';
         W.U.JunctionAdd(W.A.page.AppId, 'productsuggestion', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
           }, suggestion);  


           ch +='</div></div>';
               
            return ch;
}
function CreateProductList(){
    var ch='';


    return ch;
}

 function onselect() {
    
var id=this.data.li_data.id;
var name=this.data.name;
 //_this.Value.lif.push([id,0.00,name]);
 //_this.init.bind(_this)();
       }

    }

    
 Handler.prototype.Submit=function(){
     console.log('submited '); console.log(this);
     var _this= this;
  

 }

  new Handler(W.U.id('poBackblock'),productData);
}
var productOptions=function(data){
    var ch='<div class="block "><a class="hide" href="javascript:void(0);" data-btnid="poBack"   data-openbtn="productOptionsInner"  ></a>';
    var option=[];
    option.push({name:'Fittering Attribute',des:'Filtering attribute are  name-value pairs which are used in filter operation on category page.',act:"filter"});
      option.push({name:'Upsells',des:'Upsells products are those which you recommend instead of the this product.',act:"upsell"});


    var nav='<div class="block ul hover bg_0  ">';
    for(var  q in option){
      nav+='<div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" data-junction="productOptions'+q+'" > <span class="vl-sp fw-b">'+option[q].name+'</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span> </a> <span class="block fg_4 fs-italic fs11 _bdy">'+option[q].des+'</span> </div>';  

   W.U.JunctionAdd(W.A.page.AppId,'productOptions'+q, function () {
          var _this=this;
                    this.Node.onclick = function () {
          switch(_this.data.act){
           case 'filter':
     var newFrom= FilterAttribute.bind({data:data,  action: _this.data.act})(); 
           
           break;
           case 'upsell':
       var newFrom= SimilarProduct.bind({data:data,  action: _this.data.act})(); 
         
           break;    
          }           



  

         var event = jQuery.Event("show");
                event.id = 'poBack';
                $(W.U.id('block.' + 'poBack')).parent().triggerHandler(event);

                    }

                }, {act:option[q].act});

    }
    nav+='</div >';
    ch+= nav+'</div >';
    return ch;
}


W.F.Forms["productOptions"]=function(){
// console.log('--==productOptions==--');console.log(this);
   var data = (typeof (this.data) == 'undefined') ? {} : this.data;
   var ch='';
      W.U.SetIdText('opttitle','Options','html');
       $(W.U.id('optsubmit')).hide(); 
       
  


var blockList=[productOptions(data),FromWrap()];
var blockName=["poFront","poBack"];
var setting ={
    name:'productOptionsInner',
    target:"poFront",
    page:true,
    minheight:'auto'
};

  ch+=   W.T.ToggleBlock(blockList, blockName,setting);

  return ch;
}




 } )(wowrol);