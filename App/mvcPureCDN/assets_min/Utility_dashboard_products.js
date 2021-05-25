; (function(W){
   "use strict";




   function productedit(block){
       var ch='pageproductdit';

        var formData=block.objectdata;




  var frombody=W.T.dashboardproducts.productedit;
var formLogic =function() {
     var rv = ['product_name', 'pid', 'sid', 'has_varient'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=4, alert_mes = [];

       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});

       error=glueErrors.error;

   var alert_mes = alert_mes.concat(glueErrors.message);



   var category = Array(),searchword= [''],j=0,i=0;
        $(':hidden.tokenh_input').each(function () {
            if ($(this).attr('name') == 'category') {
                var TYI=W.U.intentdata.get($(this).val());

              category[i]=TYI['id'];
                  i++;
            }
             if ($(this).attr('name') == 'searchword') {
            searchword[j]=W.F.JSONparse($(this).val(),{id:''})['id'];
                 j++;
            }

        });




   if (category.length == 0) { error++; alert_mes.push('<li> text_378</li>');  }

    W.U.extend(f_value, W.F.walk_way_all(['description','varient_1','varient_2','varient_3','keyfeature_0','keyfeature_1','keyfeature_2','keyfeature_3'], this.formname));

    if((f_value['varient_1']==''&&f_value['varient_2']==''&&f_value['varient_3']=='')&&f_value['has_varient']=='1'){
      error++; alert_mes.push('<li>text_379</li>');
    }


  f_value['category']=category;
  f_value['searchword']=searchword;

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







                                  W.U.DashboardTable.updateRow(this.data[0]);


                   W.U.Pager.togglePage(W.I.dp, W.I.dpbf);

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

    var ch ='<form name="product_one"  data-junction="product_one" onsubmit="return false"> </form>';

          W.U.JunctionAdd(W.A.page.AppId,'product_one',function(){

  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);
       return ch;

   }

   function productcopy(block){
          var formData=block.objectdata;




  var frombody=W.T.dashboardproducts.productcopy;
var formLogic =function() {
     var rv = ['product_name', 'pid', 'sid'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=3, alert_mes = [];

       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});

       error=glueErrors.error;

   var alert_mes = alert_mes.concat(glueErrors.message);



    var AlertError = W.T.AlertError({message:alert_mes});





      return {error: error,
              f_value:f_value,
              AlertError:AlertError
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

    var ch ='<form name="product_copy"  data-junction="product_copy" onsubmit="return false"> </form>';

          W.U.JunctionAdd(W.A.page.AppId,'product_copy',function(){

  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);
       return ch;
   }


   function inventoryedit(block){
        var ch='';
   var TriggerData=block.triggerdata;
   var ProductData=block.objectdata;
 var formData={};
 var pvLId=TriggerData[5]
   if(TriggerData[4]=='edit'){
         if(ProductData.pvL.length==0){
 formData=ProductData.pvDD;
   formData.act='edit';
  }else{


    formData=ProductData.pvL[pvLId];
        formData.act='edit';
  }

   }


     if(TriggerData[4]=='addnew'){
         formData=ProductData.pvDD;
  formData.act='new';

      }
  if(TriggerData[4]=='delete'){
         formData=ProductData.pvL[pvLId];
           formData.act='delete';

  }
     formData.TriggerData=TriggerData;


var frombody=W.T.dashboardproducts.inventryFormBody;
var DeleteBody=W.T.dashboardproducts.inventryDeleteBody;


var DeleteLogic =function(){
      var formData=this.formData;
         return {error: 0,
              f_value:formData,//required input value
              AlertError:'' //alert

  }
}
var formLogic =function() {
  var formData=this.formData;
     var rv = ['currency', 'unitsystem', 'pid', 'vid', 'sell_price', 'compare_price', 'sku', 'stock'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=9, alert_mes = [];
      var shippable = W.F.walk_way_all(['shippable'],this.formname);
       W.U.extend(f_value,shippable);
          if(f_value.shippable==1){
           error=error+3;

   var sp_value = W.F.walk_way_all(['weight', 'weightunit', 'shipping_method'], this.formname);
       W.U.extend(f_value,sp_value);



        }

   if(formData.Hvrt){
    var rv=[];var pvN=formData.pvN;
    var j=0;
    for(var q in  pvN){
        if(pvN[q]!=''){
           rv[j]= 'variant_'+q;j++; error++;
        }

    }
        //--picking varient value

     var varient_value =W.F.walk_way_all(rv, this.formname);
        //--
          W.U.extend(f_value,varient_value);
   }






       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});

       error=glueErrors.error;

   alert_mes = alert_mes.concat(glueErrors.message);




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
  debugger;
 var   SavedFeatureImage=W.U.intentdata.get('varientimages'+f_value.vid+'FeatureImage');
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




       f_value.act=formData.act;
       f_value.Hvrt=formData.Hvrt;
       f_value.pvN=formData.pvN;


     var AlertError = W.T.AlertError({message:alert_mes});
  //   W.U.console(error);  W.U.console(f_value); W.U.console( AlertError);

         return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

    var sucessData=this.data[0];
                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert();

var reinitaction="";

if(TriggerData[4]=="edit"){
    ProductData.pvL[pvLId]= sucessData;
         W.F.Toast({msg:' successfully edited'});
}
 if(TriggerData[4]=="addnew"){
    ProductData.pvL.push(sucessData);
          W.F.Toast({msg:' successfully added'});
}
 if(TriggerData[4]=="delete"){
     ProductData.pvL.splice(pvLId, 1);
         W.F.Toast({msg:' successfully deleted'});
           reinitaction="replacePage";

}
   //now we have to reinit inventry list form here



   if(W.U.isOK(sucessData)){
         if(sucessData.Hvrt=="1"){
      reinitaction="replacePage";
   }
   }


   switch(reinitaction){
       case 'replacePage':
         W.U.Pager.replacePage(W.I.dp,'inventorylistedit');
       break;

   }



     }
var onerror=function(){ W.U.madianLoading('hide');

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

if(TriggerData[4]=="delete"){
    Ragisterdata.frombody=DeleteBody;
    Ragisterdata.formLogic=DeleteLogic;
}


 ch ='<form name="addprodctinventory"  data-junction="addprodctinventory" onsubmit="return false"> </form>';

          W.U.JunctionAdd(W.A.page.AppId,'addprodctinventory',function(){
     debugger;
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);




    return ch;
   }


   function inventorylistedit(block){
 return W.T.dashboardproducts.inventoryList(block);
   }


   function specificationList(block){
            var ch='';
   var TriggerData=block.triggerdata;
   var ProductData=block.objectdata;
    if(!W.U.isOK(ProductData.spfl_ischanged)){
     ProductData.spfl =W.U.arraybase64_decode(ProductData.spfl);
     var spfl=ProductData.spfl;
     ProductData.spfl_ischanged=true;
    }else{
          var spfl=ProductData.spfl;
    }


     ch+='<div class="block m_b10 m_t10 _bdy"><a href="javascript:void(0);" class="btn btn-block"  data-pagerbtn="'+ W.I.dp+':specificationedit:sp:'+ProductData.id+':addnew:0:specificationList"  ><span class="vl-sp fw-b">Add New Specifications</span><span class="vl-sp right">'+W.T.SVG('nextarrow',24,'#00768D')+'</span></a></div>';

        if(spfl.length>0){
   ch+='<div class="block m_b10 m_t10 _bdy "><div class="block spfc m_b10 bs-1">';
            for(var i in spfl){

        ch+='<div class="block _bdy h po-re "> <div class="block ov-hi">'+spfl[i].heading+'</div><div class="block ov-hi"> <a href="javascript:void(0);" class="span t_t"  data-pagerbtn="'+ W.I.dp+':specificationedit:sp:'+ProductData.id+':edit:'+i +':specificationList"  style="margin:0px 20px;" >Edit&nbsp;&nbsp;</a><a href="javascript:void(0);"   data-pagerbtn="'+ W.I.dp+':specificationedit:sp:'+ProductData.id+':delete:'+i +':specificationList"  class="span t_t" >&nbsp;&nbsp;delete</a></div> </div>';




    }
       ch+='</div></div>';

        }


   var Header  =W.T.DashbordFormHeader({titleText:'Specifications',submitbutton:false,pager:W.I.dp,backblock:"blockFront"});

         return W.T.DashbordFormWrap(Header, ch);
   }

   function specificationedit(block){

         var ch='';
//block.objectdata.spfl=W.U.arraybase64_decode(block.objectdata.spfl);



//--spflBspflBHandler


function spflBHandler (wrap,block){
      this.wrap=wrap;
 this.TriggerData=block.triggerdata;
 this.ProductData=block.objectdata;


 W.U.console(this.ProductData.spfl);
 var action=this.TriggerData[4];
 var id=this.TriggerData[5];
 if(action=="edit"){
           this.data=this.ProductData.spfl[ id];
            this.data.id=id;
             this.data['act']=1;
 }
  if(action=="delete"){
           this.data=this.ProductData.spfl[ id];
           this.data.id=id;
           this.data['act']=0;
 }
  if(action=="addnew"){
      this.data={"heading":"","specifications":[["",""]],'pid':this.ProductData.pid,'id':'','act':1};
 }


      this.init();
  }

spflBHandler.prototype.init=function(){
      this.createMarkup();
  var tableMarkup = '<div class="block  bg_0" ><div class="block " data-help="sp_row"></div><div class="block spfc  m_b10 " >'+ this.Header+this.Body+this.DeleteBody +'</div></div>';
W.U.console(this);
    W.U.AddDom(this.wrap, tableMarkup, 'html');

W.U.id('spflBsubmit').onclick=this.submit.bind(this);

}
spflBHandler.prototype.createMarkup=function(){
     this.Header = '';
      this.Body = '';
    this.DeleteBody='';

     if( this.TriggerData[4] == 'edit'|| this.TriggerData[4]== 'addnew'){
      this.Header = createHeader.bind(this)();
      this.Body = createBody.bind(this)();
     }
    if(this.TriggerData[4] == 'delete'){
      this.DeleteBody = createDeleteBody.bind(this)();
     }

    //draw
     function createHeader() {
         var ch='<div class="block _bdy h "><div class="w8"><div class="block   po-re"><h3><input type="text" name="sp_heading" class="form-mold no-border " placeholder="Heading Name" data-Junction="sp_heading"  autocomplete="off" value="'+this.data.heading+'"></h3></div></div><div class="w4"><div class="right _bdy"><button type="submit" class="btn btn-xs t_t" data-Junction="addnewspfRow" >Add new row</button></div></div></div>';

 var _this=this;
   W.U.JunctionAdd(W.A.page.AppId,'addnewspfRow',function(){
    this.Node.onclick= AddRow.bind(_this);
   },{});
      W.U.JunctionAdd(W.A.page.AppId,'sp_heading',function(){
    this.Node.onchange= function(){
        var value=this.value;
       _this.data.heading=value;


    }
   },{});


         return ch;


     }
     function createBody(){
         var ch='';
         var specification=this.data.specifications;
      for(var i in specification){
          ch+='<div class="block  po-re rl"><div class="w4 rl0"><input type="text" name="sp_name" class="form-mold " placeholder="Specifications Name" data-Junction="sp_name'+i+'"  autocomplete="off" value="'+specification[i][0]+'" ></div><div class="w8 rl1 ad-7"><textarea name="sp_value" class="form-mold  nochange" placeholder="Specifications Value" data-Junction="sp_value'+i+'"  rows="1" cols="30" autocomplete="off"    >'+specification[i][1]+'</textarea></div><button type="button" class="close po-ab ad-6" data-Junction="sp_close'+i+'" >×</button></div>';
 var _this=this;
   W.U.JunctionAdd(W.A.page.AppId,'sp_value'+i,function(){
        var __this=this;
    this.Node.onchange= function(){
        var i=__this.data.id;
     //   W.U.console(__this);
       //  W.U.console(specification);
        // W.U.console(i);
        var value=this.value;

       _this.data.specifications[i][1]=value;

    }
   },{id:i});
    W.U.JunctionAdd(W.A.page.AppId,'sp_name'+i,function(){
        var __this=this;
    this.Node.onchange= function(){
         var i=__this.data.id;

        var value=this.value;

        _this.data.specifications[i][0]=value;

    }
   },{id:i});
     W.U.JunctionAdd(W.A.page.AppId,'sp_close'+i,function(){
        var __this=this;
    this.Node.onclick= function(){
         var i=__this.data.id;


     _this.data.specifications.splice(i, 1);

      _this.init.bind(_this)();
    }
   },{id:i});
         }

         return ch;
     }
      function createDeleteBody(){
         var ch='<div class="block _bdy fw-b  "><span class="bg_0 fg_2 ff_3">text_47</span></div> <div class="block _bdy fw-b al-c tt-c">'+this.data.heading+'</div> ';


         return ch;
     }



     //
     function AddRow(){
      var empty=this.emptyCheck();

      if(this.data.heading==''){
          empty=1;
      }
       var specification=this.data.specifications;
         for(var i in specification){
        if(specification[i][1]==''||specification[i][0]==''){
               empty=1;
             }

         }


    if(empty==0){
   this.data.specifications.push(['','']);
   this.init.bind(this)();
         }else{
        var AlertError =  W.T.AlertError({message:['Fill the empty fields.']});
        $('[data-help="sp_row"]').html(AlertError);
         W.F.alert();
         }


         }



}

spflBHandler.prototype.submit=function(){
   var empty=this.emptyCheck();
       if(empty==0){

  var spf=this.data;
  var ProductData= this.ProductData;
    var TriggerData=this.TriggerData;
    var id= this.data.id;
    //--
    if(W.U.isArray(spf)){

      spf= {heading:spf['heading'],specifications:spf['specifications'],id:spf['id'],act:spf['act']};
    }




    //--
  var  formData={
      form:'AddSpecifications',
      spf:JSON.stringify(spf),
      pid:ProductData.pid
      };

      // debugger;
    W.U.ajax({
           url: W.U.URL('') + 'ajax/f0/p0',
                data: formData,
                context: this,
                type: 'POST',
                beforeSend:function(){
                W.U.madianLoading('show');
                },
                success: function(data){
               var  ret = JSON.parse(data);
                      if (ret.state == 200) {
           W.U.madianLoading('hide');
          //ret.response

          if(TriggerData[4]=='addnew'){
        ProductData.spfl.push(spf);
        W.F.Toast({msg:'successfully_added'});
          }
        if(TriggerData[4]=='edit'){
        ProductData.spfl[id]=spf;
             W.F.Toast({msg:'successfully_edited'});
          }
       if(TriggerData[4]=='delete'){

    ProductData.spfl.splice(id, 1);
          W.F.Toast({msg:'successfully_deleted'});
          }
          W.U.intentdata.add('sp.'+ProductData.id,ProductData);
         W.U.Pager.replacePage(W.I.dp,'specificationList');
        //debugger;
                      }
        if (ret.state == 500) {
        W.U.madianLoading('hide');
         //ret.mistake
                   W.F.Toast({msg:'unsuccessful_action',theme:'error'});
                      }



                }






       });

       }else{
        var AlertError =  W.T.AlertError({message:['ajax_42']});
        $('[data-help="sp_row"]').html(AlertError);
         W.F.alert();
         }
}
spflBHandler.prototype.emptyCheck=function(){
    var empty=0;

      if(this.data.heading==''){
          empty=1;
      }
       var specification=this.data.specifications;
         for(var i in specification){
        if(specification[i][1]==''||specification[i][0]==''){
               empty=1;
             }

         }
         return empty;
}


//-->>




    ch ='<div class="block" data-junction="specificationedit"></div>';

          W.U.JunctionAdd(W.A.page.AppId,'specificationedit',function(){


  new spflBHandler(this.Node,this.data);
  },block);

  var sublitText='Add';
     if(block.triggerdata[4]=='edit'){
       sublitText='Update';
    }

     if(block.triggerdata[4]=='delete'){
           sublitText='delete';
     }



   var Header  =W.T.DashbordFormHeader({titleText:'text_54',sublitText:sublitText,submitnodeId:true,NodeId:'spflBsubmit',backblock:'specificationList'});
            return W.T.DashbordFormWrap(Header, ch);

   }

   function  productOptionsList(block){
                   var ch='';
   var TriggerData=block.triggerdata;
   var ProductData=block.objectdata;

 ch='<div class="block "><a class="hide" href="javascript:void(0);" data-btnid="poBack"   data-openbtn="productOptionsInner"  ></a>';
    var option=[];
    option.push({name:'text_53',des:'help_67',pageid:"productFilterAttribute"});
      option.push({name:'text_52',des:'help_68',pageid:"productSimilarProduct"});


    var nav='<div class="block ul hover bg_0  ">';
    for(var  q in option){
      nav+='<div class="li bs-1 "> <a class="block _bdy" href="javascript:void(0);" data-pagerbtn="'+ W.I.dp+':'+option[q].pageid+':sp:'+ProductData.id+':edit:0:blockFront"  > <span class="vl-sp fw-b">'+option[q].name+'</span> <span class="vl-sp right">'+W.T.SVG('nextarrow',18,'#1274c0')+'</span> </a> <span class="block fg_4 fs-italic fs11 _bdy">'+option[q].des+'</span> </div>';



    }
    nav+='</div >';
    ch+= nav+'</div >';








   var Header  =W.T.DashbordFormHeader({titleText:'Options',submitbutton:false});

         return W.T.DashbordFormWrap(Header, ch);

      }



 function  productFilterAttribute(block){
         var ch='';
         var TriggerData=block.triggerdata;
   var ProductData=block.objectdata;



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
        W.U.id('filterattributesubmit').onclick=this.Submit.bind(this);
     //   W.U.console(this);

   }
  Handler.prototype.createMarkup = function () {
     this.Form = createForm.bind(this)();
     this.filterList = createfilterList.bind(this)();
     this.UnsavedStrip = createUnsavedStrip.bind(this)();


      function createForm(){
         var ch='<div class="block m_b10 bg_0 bs-1"> <form name="AddFilter" class="form-horizontal _Bdy" onsubmit="return false" ><div class="block form-piece " > <span class="fw-b"> Add Filter name-value pair and Save.</span > </div><div class="form-piece"> <label class="w2 control-label">Name: &nbsp;</label> <div class="w10 "> <input type="text" name="filter_name" autocomplete="off" class="form-mold" placeholder="Name"> </div></div><div class="form-piece"> <label class="w2 control-label">Value: &nbsp;</label> <div class="w10 "> <input type="text" name="filter_value" autocomplete="off" class="form-mold" placeholder="Value"> </div></div><div class="block" data-help="AddFilter"></div><div class="block"> <button type="button" class="btn btn-block" data-Junction="AddFilter" >Add</button> </div></form></div>';
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
     filterList+='<div class="block li bs-1 _bdy"> <div class="block _bdy sr-bgC tt-c"> <button type="button" class="close"  data-Junction="RemoveFilter'+q+'" >×</button><strong class="fw-b">'+fiatr[q].name+'</strong> <ul class="ul"> <li>'+fiatr[q].value+'</li></ul> <input type="hidden" name="option_name" value="fsdf"><input type="hidden" name="option_value" value="sdf"><input type="hidden" name="sfid" value="1032"> </div></div>';

        W.U.JunctionAdd(W.A.page.AppId,'RemoveFilter'+q,function(){
      this.Node.onclick= _this.RemoveFilterRow.bind({_this:_this,index:this.data.index});
   },{index:q});


}


var ch='<div class="block m_b10 bg_0 bs-1"> <div class="block ul "> <div class="block li bg_7 _bdy"><span class="fw-b">Fitters</span></div>'+filterList+'</div></div>';
return ch;
      }

      function createUnsavedStrip(){
          var ch='';

          if(this.UnSaved==1){
              ch+='<div class="block m_b10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">help_69</div></div>';
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
    W.U.console(f_value); W.U.console(error);W.U.console(AlertError);


    if(error==0){
        W.U.console(this.Data);
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
     W.U.console('submited '); W.U.console(this);
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



                            W.U.madianLoading("hide");
_this.Data.fiatr=ret.response;
   _this.UnSaved=_this.Data.FilterAttributeUnSaved=0;
    _this.init.bind( _this)();
               W.F.Toast({msg:' successfully Saved'});
 //  W.U.intentdata.add('sp.'+_this.Data.id,_this.Data);
    // W.U.Pager.togglePage('mainpage','specificationList');

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

















    ch ='<div class="block" data-junction="productFilterAttribute"></div>';

          W.U.JunctionAdd(W.A.page.AppId,'productFilterAttribute',function(){
      new Handler(this.Node,this.data);


  },ProductData);


   var Header  =W.T.DashbordFormHeader({titleText:'Filtering attribute',sublitText:'Save',submitnodeId:true,NodeId:'filterattributesubmit',backblock:'productOptionsList'});

         return W.T.DashbordFormWrap(Header, ch);


      }
 function  productSimilarProduct(block){
     var ch='';
         var TriggerData=block.triggerdata;
   var ProductData=block.objectdata;


function Handler(wrap,Data){
    this.wrap=wrap;
    this.Data=Data;
    this.UnSaved=0;
    this.init();
};
 Handler.prototype.init = function () {

        this.createMarkup();

   var tableMarkup = '<div class="block ov-hi" >'+this.SuggestionInput+this.ProductList+'<div class="block m_bTouch"></div></div>';

        W.U.AddDom(this.wrap,  tableMarkup , 'html');
        W.U.id('SimilarProductsubmit').onclick=this.Submit.bind(this);
    W.U.console(this);

   }

  Handler.prototype.createMarkup = function () {
  this.SuggestionInput=CreateSuggestionInput.bind(this)();
 this.ProductList=CreateProductList.bind(this)();
  var _this=this;
function CreateSuggestionInput(){
       var upS=this.Data.upS;


      var ch='<div class="block  bg_0  _bdy  " ><form name="upsellproduct" onsubmit="return  false"><div class="block ul "  >';
 var token='';
                    var suggestion = {
                        name: 'productsuggestion',
                        fireAfter: 4,
                        type: 1,
                        token: 'chips',
                        placeholder: 'Name  of product'
                    };
  for( var q in upS ){  token += '<div class="li "><div class="token"> <span>' + upS[q].pN+ '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:upS[q].pid})  + '\' > </div></div>';

}


                   token+='<div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';

   ch += '<div class="form-piece"> <label class="control-label">Up-sells Products</label> <div class="form-token block" data-junction="productsuggestion"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div></div>';
         W.U.JunctionAdd(W.A.page.AppId, 'productsuggestion', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
           }, suggestion);


        ch +='</div></form></div>';

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
     W.U.console('submited '); W.U.console(this);
     var _this= this;

         var upsellproduct = Array('');
    $(':hidden.tokenh_input').each(function (i) {
                if ($(this).attr('name') == 'productsuggestion') {
                  upsellproduct[i] = W.F.JSONparse($(this).val(), { id: '' })['id'];

                }


            });


   var formData = {
                form: 'upsellproduct',
                f_value:{upsell:JSON.stringify(upsellproduct),pid:_this.Data.pid}
            };

                W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {

           W.U.madianLoading('show');

                    },
                    success: function (data) {

                   W.U.madianLoading('hide');

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
                  var Hret = ret.mistake;
                W.F.Toast({msg:'Action Not Completed ',theme:'error'});

                        }
                        if (ret.state == 200) {


                _this.Data.upS=ret.response;
                    W.F.Toast({msg:'Action Completed ',theme:'success'});


                        }

                    }

                });









 }



     ch ='<div class="block" data-junction="productSimilarProduct"></div>';

          W.U.JunctionAdd(W.A.page.AppId,'productSimilarProduct',function(){

      new Handler(this.Node,this.data);


  },ProductData);





   var Header  =W.T.DashbordFormHeader({titleText:'Up-Sells',sublitText:'Save',submitnodeId:true,NodeId:'SimilarProductsubmit',backblock:'productOptionsList'});

         return W.T.DashbordFormWrap(Header, ch);

 }


 function brandsearch(block){

           var formData=block.objectdata;




  var frombody=function(){






      return  W.T.DashbordFormWrap(W.T.DashbordFormHeader({titleText:'text_374',sublitText:"text_171"}), W.U.BrandPicker.set());
  };
var formLogic =function() {
     var  f_value={},varient_id=[],all = [],
      error=0, alert_mes = [];

      var category = Array();
          $(':hidden').each(function () {

             if ($(this).attr('name') == 'choosebrand') {
             var li_data= W.U.intentdata.get($(this).val());
               f_value.brand_id=li_data.id;
            }

               if ($(this).attr('name') == 'category') {
             var li_data= W.U.intentdata.get($(this).val());
               category.push(li_data.id);
            }
        });


           $(':checkbox').each(function () {
            if ($(this).attr('name') == 'varient_id') {

                if(this.checked){
                  varient_id.push($(this).val());
                }


            }


        });








if(!W.U.isOK(   f_value.brand_id)){error++; alert_mes.push('<li>text_376</li>');}

   if (varient_id.length == 0) { error++; alert_mes.push('<li>text_377</li>');  }else{

       f_value.varient_id=JSON.stringify(varient_id);
}
  if (category.length == 0) { error++; alert_mes.push('<li>text_378</li>');  }else{

       f_value.varient_id=JSON.stringify(varient_id);
}


    var AlertError = W.T.AlertError({message:alert_mes});





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




    var ch ='<form name="product_brand_copy"  data-junction="product_brand_copy" onsubmit="return false"> </form>';

          W.U.JunctionAdd(W.A.page.AppId,'product_brand_copy',function(){

  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);
       return ch;
 }


 function ProductFilterSet(){

  //------
  function ProductFilter(block){

      var TranseData= W.U.intentdata.get('sp.TranseData');

            W.U.Junction('dashboardproduct',function(){

 W.U.filter.init(this.Node,this.data);
  },{
    TranseData: TranseData,
    LoadData:W.U.DashboardTable.LoadData,
    name:'dashboardproduct',
    pager:W.I.dp,
    backblock:'blockFront'

    });


     return '<div class="block bg_0" data-junction="dashboardproduct"></div>';
 }
   var presention =(W.I.wf=='mob')?'page':'drawerright';
     W.U.Pager.addblockdata({  name:'ProductFilter', htmlStr:ProductFilter,presention:presention});

 }




 function ExcelUpload(e){

     var Node= e.srcElement||e.target;
       var files=  Node.files;
         var file = files[0];
         if(W.U.isOK(file)){
     if ((file.size < (1*(1024*1024)))) {

 var f_value = new FormData();

 f_value.append('filename', file, file.name);
 f_value.append('form',   'ExcelUpload');
 f_value.append('type',   'file');
 f_value.append('visit_data',  JSON.stringify(W.A.page.AcessData.visit_data));


      $.ajax({
                  xhr: function () {
                var xhr = new window.XMLHttpRequest();
               xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100).toFixed(0);





                    }
                }, false);

                return xhr;
            },
               processData: false,
               contentType: false ,
                    url:  W.U.URL('') + 'ajax/f0/p2',
                    data: f_value,
                    type: 'POST',
                    beforeSend: function () {


                    },
                    success: function (data) {



                        var ret = JSON.parse(data);
                        if (ret.state == 500) {

                        }
                      if (ret.state == 200) {
var response =ret.response;




                                }

                    }

                });
}else{
    W.F.Toast('text_420');
}
   }


 }

   function init(walkway){




 W.U.intentdata.add('sp.0',{
                    pN: '',
                    des: '',
                    pid: 0,
                    id: 0,
                    sid: 0,
                    kf:['','','',''],
                    pvN:['','',''],
                    sW:[],
                    pC:[]

                });

var OnRander=Array(function(){
        var data= W.A.page.AppView.defaultcategory;
      W.U.ccbk.Run(W.U.Page,'setTokenselectcategory_0',{id:data.cid,name:data.cN});

    });


 W.U.Pager.addblockdata({  name:'productedit', htmlStr:productedit,onRander:OnRander});
 W.U.Pager.addblockdata({  name:'productcopy', htmlStr:productcopy,onRander:OnRander});
 W.U.Pager.addblockdata({  name:'inventoryedit', htmlStr:inventoryedit,triggerdata:['mainpage','inventoryedit','sp',0,'edit',0,'blockFront']});
W.U.Pager.addblockdata({  name:'inventorylistedit', htmlStr:inventorylistedit});
 W.U.Pager.addblockdata({  name:'specificationList', htmlStr:specificationList});
 W.U.Pager.addblockdata({  name:'specificationedit', htmlStr:specificationedit});
 W.U.Pager.addblockdata({  name:'productOptionsList', htmlStr:productOptionsList});
  W.U.Pager.addblockdata({  name:'productSimilarProduct', htmlStr:productSimilarProduct});
 W.U.Pager.addblockdata({  name:'productFilterAttribute', htmlStr:productFilterAttribute});
  W.U.Pager.addblockdata({  name:'brandsearch', htmlStr:brandsearch,onRander:OnRander});

  W.U.Junction('uploadexcel',function(){
  var inputfile=$(this.Node).find('[type="file"]');
  inputfile[0].onchange= ExcelUpload;
    },{});

   W.U.ccbk.Add(W.U.Page,'DAshboardTableLoaded',ProductFilterSet);


 var mainBlock=W.U.Rander(W.T.dashboardproducts.Layout());

  W.U.Setview(walkway,mainBlock,'html');

}



W.U.dashboardproducts={init:init};


   })(wowrol);
