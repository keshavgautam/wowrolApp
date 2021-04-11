 ;(function (W) {
     "use strict";
//function process saved images and create the input for the image upaload plugin
//ProcessImages({type:'',data:''});
function ProcessImages(args){
  var data={crop:false,name:'',imagecount:1,type:1,imageURLs:[],previewId:[],imageID:[]} ; 
var imageURLs=[],previewId=[],imageID=[];

  console.log(args.data);
    switch(args.type){
        case 'main':
var images=args.data.mainimages;
for(var q in images){
   imageURLs[q]= images[q];
 previewId[q]= q;
imageID[q]= images[q];
}
data.name='varienmainimage';
data.type=0;
        break;
       case 'web':
var images=args.data.webimages;
for(var q in images){
   imageURLs[q]= images[q];
 previewId[q]= q;
imageID[q]=images[q];
}


data.name='varientwebimage';
data.type=1;
        break;
    }
  
  //
  data.imageURLs=imageURLs;
  data.previewId=previewId;
  data.imageID=imageID;
  return data;
   
}


function FromWrap(x) {
             var ch  ='';

   ch += '<div class="block "  data-nodeid="vFromblock" >Form not found</div>';

            var Wrap =W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="varientListFrom" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><p class="fw-b al-c"><i class="material-icons"> </i><span class="vl-sp" data-nodeid="vFromtitle">Form Title</span></p></span>',
                done: '<div class="li b_gll"><a href="javascript:void(0);"  data-nodeid="vFromsubmit"  data-check="vFromsubmit"    ><span>Form Submit</span><i class="badge _gbtn"></i> </a></div>'
            }), ch);

            return Wrap;
        }


var varientList=function(data){
    var  ch='';
   

  var createVarient='<div class="block m_b10 m_t10 _bdy"><a href="javascript:void(0);" class="btn btn-block" data-openbtn="varientListFrom"  data-btnid="vFrom"   data-junction="varientNew"  ><span class="vl-sp fw-b">Add New Varient</span><span class="vl-sp right">'+W.T.SVG('nextarrow',24,'#1d8ec0')+'</span></a></div>';

    W.U.JunctionAdd(W.A.page.AppId, 'varientNew', function () {
                    this.Node.onclick = function () {
                     
    var newFrom= varientFrom.bind({data:data,  action: 'new',Id:0 })();
   W.U.AddDom(W.U.id('vFromblock'),newFrom,'html');

                    }

                }, {});

//--List
  var List='<div class="block bg_0 m_b10 ul "> <div class="block li bg_7 _bdy"> <span class="fw-b">Varient List</span></div>';var pvL=data.pvL;
  //console.log(data);



  for(var q in pvL){
    List+='<div class="block li _B-gray _bdy"><div class="block ul ul-menu dc_divider truncate">'; 
    var pvV= pvL[q].pvV; var pvN= pvL[q].pvN;
    var VarientName='';
 //   console.log(pvL[q]);
    for(var p in pvN){
        var liRow='';
        if(pvN[p]!=''){
  liRow='<div class="li"> <span class="dc_0">'+pvN[p]+'</span> <span class="dc_1">'+pvV[p]+'</span> </div>'; 
  List+=liRow;
  VarientName+=liRow;   
        }
     
    }



     List+='</div> <div class="fs11 td-cell-link"><span><a href="javascript:void(0);"  data-junction="varientedit'+pvL[q].id+'"  >View Inventory</a></span><span><a href="javascript:void(0);" data-junction="varientdelete'+pvL[q].id+'" >Delete</a></span><span></span></div></div>';  

      W.U.JunctionAdd(W.A.page.AppId,'varientedit'+pvL[q].id, function () {
          var _this=this;
                    this.Node.onclick = function () {
                     
    var newFrom= varientFrom.bind({data:data,  action: 'edit',Id:_this.data.Id })();
      W.U.AddDom(W.U.id('vFromblock'),newFrom,'html');

         var event = jQuery.Event("show");
                event.id = 'vFrom';
                $(W.U.id('block.' + 'vFrom')).parent().triggerHandler(event);

                    }

                }, {Id:q});
      W.U.JunctionAdd(W.A.page.AppId,'varientdelete'+pvL[q].id, function () {
          var _this=this;
                    this.Node.onclick = function () {
                     
    var newFrom= varientFrom.bind({data:data,  action: 'delete',Id:_this.data.Id,VN:_this.data.VN })();
      W.U.AddDom(W.U.id('vFromblock'),newFrom,'html');

         var event = jQuery.Event("show");
                event.id = 'vFrom';
                $(W.U.id('block.' + 'vFrom')).parent().triggerHandler(event);

                    }

                }, {Id:q,VN:VarientName});
  }
   List+='</div>';  
//-->>List

  ch+=createVarient+List;

    return ch;

};
var varientFrom=function(){
   
 //console.log(this);

    //from data
    var ProductData=this.data;
     var formData={};var pvLId=this.Id ;
   var formbtn=W.U.id('vFromsubmit'); 
   var action =this.action;
    if(action=="new"){
  formData=ProductData.pvDD; 
 
    }
      if(action=="edit"){
  if(this.data.pvL.length==0){
 formData=ProductData.pvDD; 
  }else{


    formData=ProductData.pvL[pvLId];   
  }
 
    }
   
   //  console.log(formData);  console.log(((formData.Hvrt)||(parseInt(formData.Hvrt)==1)));
       if((formData.Hvrt)||(parseInt(formData.Hvrt)==1)){
       W.U.SetIdText('vFromtitle','Inventory','html');
     W.U.SetText(formbtn,'Add','text');
      $(formbtn).show();

   }else{
     formbtn=   W.U.id('intsubmit');
     W.U.SetText(formbtn,'Add','text');
      $(formbtn).show();

   }   
     
 

     if(action=="edit"){
       W.U.SetText(formbtn,'Update','text');
     }
      if(action=="delete"){
    
    W.U.SetIdText('vFromtitle','Inventory','html');
 
   
    formbtn=W.U.id('vFromsubmit') ;
    W.U.SetText( formbtn,'Delete','text'); 
      $(formbtn).show();  $(W.U.id('intsubmit')).hide();
     formData=ProductData.pvL[pvLId];   
}

     formData.act=action;
   

  function Images(x){
  var mainImages=function(x){
        var ch='<div class="block bg_6" data-junction="inventorymainimages" >';

 

ch+='<div class="block" data-block="upload_view" style="min-height:200px;"><div class="block ul ul-menu im-pb m_b10"></div></div>';
     ch+='<div data-block="upload_btn_con" class="block m_b10" style="display: block;"> <div class="block upload_btn al-c ov-hi"> <span class="po-re fw-b al-v" style=" top: 5px;">Upload Photos</span> <input type="file"  accept="image/*" name="files[]"> </div></div><div class="block" data-help=""></div>';

     ch+='</div>';
var ImagesData= ProcessImages({type:'main',data:x});
  W.U.JunctionAdd(W.A.page.AppId,'inventorymainimages',function(){
     
   W.U.fileUpload.bind({Node:this.Node,Value:this.data})();
  },ImagesData);  

        return ch;
    }
  var webImages=function(x){
      
       var ch='<div class="block bg_7"  data-junction="inventorywebImages"   >';

 

ch+='<div class="block" data-block="upload_view" style="min-height:200px;"><div class="block ul ul-menu im-pb m_b10"></div></div>';
     ch+='<div data-block="upload_btn_con" class="block m_b10"> <div class="block upload_btn form-token"> <input type="text" class="block form-mold" style="height: 26px;text-indent: 5px; background-color: #f9f9f9;" name="link_from_web" value="" placeholder="Paste a Image URL"> </div></div><div class="block" data-help=""></div>';

     ch+='</div>';

var ImagesData= ProcessImages({type:'web',data:x});

   W.U.JunctionAdd(W.A.page.AppId,'inventorywebImages',function(){
     
   W.U.fileUpload.bind({Node:this.Node,Value:this.data})();
  },ImagesData);  

       return ch;
  }

 
     var tabList=['<a href="javascript:void(0);"   role="tab" ><span class="vl-sp">&nbsp;&nbsp;Main&nbsp;&nbsp;</span></a>','<a href="javascript:void(0);"  role="tab" > <span class="vl-sp">Additional </span></a>']; 

     var tabContent=[mainImages(x),webImages(x)];
     var setting={OnlyList:false,
       ulClass:'header-link bg_0 fg_4',
       data:{name:'Images',
             activeIndex:0
            }
       };
      
    //  return W.T.TabLayout(tabList,tabContent,setting);

        return webImages(x);
  }

 var frombody=function(x){
       var URL =W.U.URL;
  //   console.log('--==frombody==--');  console.log(x);
     var ch='<div class="block"><div class="block" data-help="addprodctinventory"></div><div class="block ul hover bg_0"> <input type="hidden" name="currency" value="'+x.currency+'"> <input type="hidden" name="unitsystem" value="'+x.unitsystem+'"> <input type="hidden" name="weightunit" value="'+x.Wu+'"> <input type="hidden" name="pid" value="'+x.pid+'"> <input type="hidden" name="vid" value="'+x.vid+'">';
        

   function CombinationField(x){
       var ch='<div class="block li _B-gray _Bdy"> <div class="block m_b5"> <h3>Variant Combination.</h3> </div>';var i=0;
       for(var q in x){

           var name='variant_'+i;
           if(x[q]!=''){
           ch+='<div class="w4 col4"> <div class="form-piece"> <label>'+x[q]+'<i>*</i></label><input type="text" name="'+name+'" class="form-mold" placeholder="Name" autocomplete="off" value="default"> <div data-help="'+name+'"></div></div></div>';
           }
           i++;
       }

          ch+='</div>';
       return ch;
   }
   if(x.Hvrt){
     ch+=CombinationField(x.pvN);   
   }
 


     ch+='<div class="li _B-gray _Bdy"> <div class="block m_b5"> <h3>Pricing</h3> </div><div class="block "> <div class="w4 col4"> <div class="form-piece"> <label for="title">Sell Price</label><input type="text" name="sell_price" class="form-mold" placeholder="0.00" autocomplete="off" value="'+x.sP+'" > <div data-help="sell_price"></div></div></div><div class="w4 col4"> <div class="form-piece"> <label for="title">Compare Price </label><input type="text" name="compare_price" class="form-mold" autocomplete="off" placeholder="0.00" value="'+x.cP+'" > <div data-help="compare_price"></div></div></div></div></div>';

          ch+='<div class="li _B-gray _Bdy"> <div class="block m_b5"> <h3>Store Internal Information</h3> </div><div class="block "> <div class="w4 col4"> <div class="form-piece"> <label for="title">SKU(Stock Keeping Unit)</label><input type="text" name="sku" class="form-mold" placeholder="0.00" autocomplete="off" value="'+x.sku+'" > <div data-help="sell_price"></div></div></div><div class="w4 col4"> <div class="form-piece"> <label for="title">Quantity in stock </label><input type="text" name="stock" class="form-mold" autocomplete="off" placeholder="0.00" value="'+x.stk+'" > <div data-help="stock"></div></div></div></div></div>';

  var checked=(x.Issh)?'checked':'';
   var shippingboxdisplay=(x.Issh)?'':'display:none;';
  ch+='<div class="li _B-gray _Bdy"> <div class="block m_b5"> <h3>shipping</h3> </div><div class="block "> <div class="w4 col4"> <div class="checkbox"><label><input type="checkbox" name="shippable" value="1" '+checked+'  onclick="if(this.checked==true){$(\'#shippingbox\').show();}else{$(\'#shippingbox\').hide();}"><span></span> This product is shippable. </label></div></div> </div>';
  var Wu='';var WuUnit=["kg","g"];var Wunames=["kilogram","gram"];
  for(var o in WuUnit){
      if(x.Wu==WuUnit[o]){
        Wu+='<option selected="selected" value="'+WuUnit[o]+'">'+Wunames[o]+'</option>';  
      }else{
          Wu+='<option  value="'+WuUnit[o]+'">'+Wunames[o]+'</option>';   
      }
  }

  ch+='<div class="block" id="shippingbox" style="'+shippingboxdisplay+'"  > <div class="w4 col4"><div class="form-piece"> <label class=" control-label">Shipping Method</label> <select name="shipping_method" class="form-mold"> <option value="0" selected="selected">Home Delivery [HD]</option> <option value="1">Self Collect [SC]</option> </select> <div data-help="shipping_method"></div></div></div><div class="w4 col4"> <div class="form-piece"> <label class=" control-label">Weight</label> <div class="input-group"  > <input class="form-mold" style="width: 100px;" name="weight" type="text" value="'+x.W+'" ><select class="input-group-addon" name="weightunit" style="width: 100px;"  >'+Wu+'</select> </div><div data-help="weight"></div></div></div></div>';
  ch+='</div>';

  ch+= '<div class="li _B-gray _Bdy"> <div class="block m_b5"> <h3>Images</h3> </div>'+Images(x)+'</div>';
  
   ch+='</div>';//ul

   ch+='<div class="block m_bTouch"></div>';
   ch+='<div class="block" data-help="addprodctinventory"></div></div>';

        return ch;
            };
var DeleteBody=function(x){
  //    console.log('--==DeleteBody==--');  console.log(x);
      var ch='<div class="block"><div class="block" data-help="addprodctinventory"></div><div class="block ul hover bg_0"> <input type="hidden" name="currency" value="'+x.currency+'"> <input type="hidden" name="unitsystem" value="'+x.unitsystem+'"> <input type="hidden" name="weightunit" value="'+x.Wu+'"> <input type="hidden" name="pid" value="'+x.pid+'"> <input type="hidden" name="vid" value="'+x.vid+'">';

         var pvV=x.pvV; var pvN= x.pvN;
    var VarientName='';
 //   console.log(pvL[q]);
    for(var p in pvN){
        var liRow='';
        if(pvN[p]!=''){
  liRow='<div class="li"> <span class="dc_0">'+pvN[p]+'</span> <span class="dc_1">'+pvV[p]+'</span> </div>'; 

  VarientName+=liRow;   
        }
     
    }

 ch+='<div class="block  bg_0"><div class="block _bdy fw-b  bg_0"><span class=" fg_2 ff_3">Do you want to delete it?</span></div> <div class="block _bdy fw-b al-c tt-c"><div class="block ul ul-menu dc_divider truncate">'+VarientName+'</div></div></div>';

    return ch;
}
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
  
   


   var images = [], webimages = [];
        var p =0, o = 0;
        $(':hidden.ab_input').each(function (i) {
            if ($(this).attr('name') == 'varientmainimage' && $(this).val() != '') {
                images[p] = $(this).val(); p++;

            }
            if ($(this).attr('name') == 'varientwebimage' && $(this).val() != '') {
                webimages[o] = $(this).val(); o++;

            }
        });
 
 if ((images.length+webimages.length) < 1) {  alert_mes = alert_mes.concat(['Images are required.']);error++; }


  f_value.mainimages = images;
  f_value.webimages =webimages;
     

     // console.log((images.length+webimages.length));


       f_value.act=formData.act;
       f_value.Hvrt=formData.Hvrt;
       f_value.pvN=formData.pvN;
     

     var AlertError = W.T.AlertError({message:alert_mes});
  //   console.log(error);  console.log(f_value); console.log( AlertError);

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


               //   console.log(sucessData );          
if(action=="edit"){
    ProductData.pvL[pvLId]= sucessData;  
}
 if(action=="new"){
    ProductData.pvL.push(sucessData);  
}                             
 if(action=="delete"){
     ProductData.pvL.splice(pvLId, 1);
    
} 
       var newFrom=W.F.Forms["productInventory"].bind({ data: ProductData, action: 'edit' })();
           W.U.AddDom(W.U.id('intblock'),newFrom,'html');  
           
           
             var event = jQuery.Event("show");
                event.id = 'int';
                $(W.U.id('block.int')).parent().triggerHandler(event);                       

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
            formbtn:formbtn
         };

          var ch ='';
if(action=="delete"){
    Ragisterdata.frombody=DeleteBody;
    Ragisterdata.formLogic=DeleteLogic;
}

   ch ='<form name="addprodctinventory"  data-junction="addprodctinventory" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'addprodctinventory',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);  
  



    return ch;
};



W.F.Forms["productInventory"]=function(){
     // console.log('--==productInventory==--'); // console.log(this);
    
var data = (typeof (this.data) == 'undefined') ? {} : this.data;
          W.U.SetIdText('inttitle','Inventory','html');
               $(W.U.id('intsubmit')).hide();







var ch='';

if(data.Hvrt){
    

var blockList=[varientList(data),FromWrap()];
var blockName=["vList","vFrom"];
var setting ={
    name:'varientListFrom',
    target:"vList",
    page:true,
    minheight:'auto'
};

  ch+=   W.T.ToggleBlock(blockList, blockName,setting);
   }else{
   
    ch+=   varientFrom.bind({data:data,  action: 'edit',Id:0 })() ;     
   }


 
return ch;
}




 } )(wowrol);