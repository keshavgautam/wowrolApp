/*
* 
*/
; (function(W){
   "use strict";

//ProcessImages({type:'',data:''});


function GetUploadOption(args){
     var data={crop:false,name:'',imagecount:1,type:1,imageURLs:[]} ;  

       switch(args.type){
        case 'main':
 data.name='varientmainimage';
data.type=0;

        break;     
        case 'web':
data.name='varientwebimage';
data.type=1;

        break;

       }

  return data;
}



function Images(x){
  
   
 /*  x.mainimages=[
  { url:'https://s3-ap-south-1.amazonaws.com/wowrol/0_65.jpg',  key:'0_65', hash:'7wj9j0ppmv', name:'0_65.jpg'},
  { url:'https://s3-ap-south-1.amazonaws.com/wowrol/0_66.jpg',  key:'0_66', hash:'k5vdc6ity8', name:'0_66.jpg'},
     ];
     x.webimages=[
     { url:'https://ae01.alicdn.com/kf/HTB1zERDIXXXXXcXXFXXq6xXFXXXZ/Fashion-water-wash-whisker-denim-short-jacket-denim-coat-plus-size-women-s-clothing-Free-shipping.jpg_350x350.jpg',  key:'', hash:'', name:''},
  { url:'https://ae01.alicdn.com/wsphoto/v1/32319046637_1/Free-Shipping-new-European-Female-denim-Shirt-lapel-plaid-long-sleeved-casual-Blusa-Jeans-Women-Wholesale.jpg_220x220.jpg',  key:'', hash:'', name:''},
     ];
   */
      var Jid=W.U.J(function(){
  
 W.U.fileUpload.set({Node:this.Node,data:this.data,usetype:1,name:'varientimages'+this.data.vid,backblock: 'inventoryedit',imagecount:4});

  },x);  

      var ch='<div class="block" data-junction="'+Jid+'" ></div>';

  


      return ch;
  }
///////////////////////////
function productedit (x){
       var URL =W.U.URL;
        

       var titleText='text_368'; var sublitText='text_171';
    if(x.pid!=0){
        titleText='text_369';  sublitText='text_241';
    }

   var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText});
  x.kfparse= W.U.arraybase64_decode(x.kf);
        var ch='';
         ch += '<div class="block ">';
        ch += '<div class="block   bg_0 "><div class="block  _bdy" data-help="brand_one"></div><input type="hidden" name="pid" value="' + x.pid + '"><input type="hidden" name="sid" value="' + x.sid + '">';

       ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label class="control-label" >text_370<i>*</i></label> <input type="text" name="brand_name" class="form-mold" placeholder="Name" autocomplete="off" value="'+x.pN+'"> <div data-help="brand_name"><p class="di-in fg_4 fs-italic fs11 ">text_371</p></div></div></div>';




       ch+='<div class="block b_gbl _bdy"><div class="form-piece "> <label class="control-label" >text_30</label> <div class="block ul"> <div class="li"><input type="text" class="form-mold" name="keyfeature_0" placeholder="key feature" autocomplete="off" value="'+x.kfparse[0]+'" data-masker="AlphaNum:30:Y:Y" ></div><div class="li"><input type="text" class="form-mold" name="keyfeature_1" placeholder="key feature" autocomplete="off" value="'+x.kfparse[1]+'" data-masker="AlphaNum:30:Y:Y" ></div><div class="li"><input type="text" class="form-mold" name="keyfeature_2" placeholder="key feature" autocomplete="off" value="'+x.kfparse[2]+'" data-masker="AlphaNum:30:Y:Y" ></div><div class="li"><input type="text" class="form-mold" name="keyfeature_3" placeholder="key feature" autocomplete="off" value="'+x.kfparse[3]+'" data-masker="AlphaNum:30:Y:Y" ></div></div><div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_60</p></div></div></div>';

       var checked=(x.Hvrt)?'checked':'';
         ch += '<div class="block b_gbl _bdy"> <div class="form-piece "> <label class="control-label" >text_29</label> <label class="checkbox " data-toggle="checkbox"> <input type="checkbox" name="has_varient" value="1" '+checked+'  onchange="if(this.checked==true){$(\'#varientbox\').show();}else{$(\'#varientbox\').hide();}" ><span class="checkbox__label"> variation</span> </label> <span >help_61</span></div></div>';
           var varientboxdisplay=(x.Hvrt)?'':'display:none;';
         ch += '<div class="block b_gbl _bdy" style="'+varientboxdisplay+'" id="varientbox"><div class="form-piece"> <label class="control-label" >text_28<i>*</i></label> <div class="block "> <div class="w4 col4"><input type="text" name="varient_1" class="form-mold " placeholder="Varient Name" autocomplete="off" value="'+x.pvN[0]+'"></div><div class="w4 col4"><input type="text" name="varient_2" class="form-mold " placeholder="Varient Name" autocomplete="off" value="'+x.pvN[1]+'"></div><div class="w4 col4"><input type="text" name="varient_3" class="form-mold " placeholder="Varient Name" autocomplete="off" value="'+x.pvN[2]+'"></div></div><div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_62</p></div></div></div>';


         ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label  class="control-label" >text_27</label> <textarea name="description" class="form-mold" rows="3" cols="30" placeholder="description" >'+x.des+'</textarea> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_63</p></div></div></div>';


                 
     var selected={};    
      for(var q in x.pC){
     
 selected[x.pC[q].cid]={id:x.pC[q].cid,name:x.pC[q].cN};  

  }
            
  var dataselectbox={
                                                 name:'companycategory',
                                                           fireAfter:1,
                                                           pager:W.I.dp,
                                                           backblock:"productedit",
                                                          TranseData:{},
                                                          selected: selected,
                                                          initSearchText:'most used ',
                                                            type:1,
                                                            token:'chips',
                                                            placeholder:'Select Category',
                                                             onselectCallback:function(){
                                                           },
                                                      onselectRemoveCallback:function(){
                                                      }
                                                                   };                

                 
 
    ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label  class="control-label"  >text_34<i>*</i></label> '+W.U.selectbox.set(dataselectbox)+' <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_64</p></div></div></div>';

    
           W.U.JunctionAdd(W.A.page.AppId, 'categorysuggestionpC', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
                    }, suggestion);  

 var suggestion = {
                        name: 'searchword',
                        fireAfter: 4,
                        type: 3,
                        token: 'chips',
                        placeholder: 'Search Words'
                    }; 
                    var token='';
 for(var q in x.sW){
        token += '<div class="li"><div class="token"> <span>' + x.sW[q]+ '</span> <span class="sclose s_tclose"></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.sW[q]}) + '\' > </div></div>';
  }
   token+='<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';  
   ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label  class="control-label"  >Search Words</label> <div class="form-token block" data-junction="productsw"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_65</p></div></div></div>';//--
         W.U.JunctionAdd(W.A.page.AppId, 'productsw', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
                    }, suggestion);  
   
        ch += '</div>';
     ch += '<div class="block m_bTouch"></div>';
        ch += '</div>';
        return  W.T.DashbordFormWrap(Header, ch);
            };

///////////////////////////
function productcopy(x){
          var URL =W.U.URL;
          
       var titleText='text_11'; var sublitText='text_10';
       var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText});
    var ch='<div class="block ">';
   ch += '<div class="block   bg_0 "><div class="block  _bdy" data-help="product_copy"></div><input type="hidden" name="pid" value="' + x.pid + '"><input type="hidden" name="sid" value="' + x.sid + '">';

     ch += '<div class="block _Bdy fs14 al-c">help_47</div>';

   ch += '<div class="block  _bdy"><div class="form-piece"> <label class="control-label" >text_31<i>*</i></label> <input type="text" name="product_name" class="form-mold" placeholder="Name" autocomplete="off" value="'+x.pN+'"> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_46</p></div></div></div>';


    ch += '</div>';
        return  W.T.DashbordFormWrap(Header, ch);
}

function inventryFormBody(x){
         var URL =W.U.URL;
      

       var titleText='Add New Variant'; var sublitText='Add';
    if(x.TriggerData[4]=='edit'){
        titleText='Edit variant';  sublitText='Update';
    }
    var Parent=  x.TriggerData[6];

   
   var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText,backblock:Parent});

 var ch='<div class="block "><div class="block" data-help="addbrandinventory"></div><div class="block ul  bg_0"> <input type="hidden" name="currency" value="'+x.currency+'"> <input type="hidden" name="unitsystem" value="'+x.unitsystem+'"> <input type="hidden" name="weightunit" value="'+x.Wu+'"> <input type="hidden" name="pid" value="'+x.pid+'"> <input type="hidden" name="vid" value="'+x.vid+'">';
        

   function CombinationField(x,y){
       var ch='<div class="block li bs-1 _Bdy"> <div class="block m_b5"> <h3>text_36</h3> </div>';var i=0;
       for(var q in x){

           var name='variant_'+i;
           if(x[q]!=''&&W.U.isOK(y[q])){
           ch+='<div class="w4 col4"> <div class="form-piece"> <label>'+x[q]+'<i>*</i></label><input type="text" name="'+name+'" class="form-mold" placeholder="Varient Value" autocomplete="off" value="'+y[q]+'"> <div data-help="'+name+'"></div></div></div>';
           }
           i++;
       }

          ch+='</div>';
       return ch;
   }
   if(x.Hvrt){
     ch+=CombinationField(x.pvN,x.pvV);   
   }
 


     ch+='<div class="li bs-1 _Bdy"> <div class="block m_b5"> <h3>text_37</h3> </div><div class="block "> <div class="w4 col4"> <div class="form-piece"> <label class="control-label">text_38</label><input type="number" name="sell_price" class="form-mold" placeholder="0.00" autocomplete="off" value="'+x.sP+'" > <div data-help="sell_price"></div></div></div><div class="w4 col4"> <div class="form-piece"> <label class="control-label">text_39 </label><input type="number" name="compare_price" class="form-mold" autocomplete="off" placeholder="0.00" value="'+x.cP+'" > <div data-help="compare_price"></div></div></div></div></div>';

          ch+='<div class="li bs-1 _Bdy"> <div class="block ">  <div class="form-piece"> <label class="control-label">text_372</label><input type="text" name="unique_identity" class="form-mold" placeholder="0.00" autocomplete="off" value="'+x.sku+'" > <div class="di-in fg_4 fs-italic fs11" data-help="sell_price">text_373</div></div></div></div>';


        
  ch+= '<div class="li bs-1 _Bdy"> <div class="block m_b5"> <h3>text_46</h3> </div>'+Images(x)+'</div>';
  
   ch+='</div>';//ul

  
   ch+='<div class="block" data-help="addbrandinventory"></div></div>';

   

    return  W.T.DashbordFormWrap(Header, ch);

}

function inventryDeleteBody(x){
     var Parent=  x.TriggerData[6];
   
   var Header  =W.T.DashbordFormHeader({titleText:'Delete variant',sublitText:'Delete',backblock:Parent});

      var ch='<div class="block"><div class="block" data-help="addprodctinventory"></div><div class="block ul hover bg_0"> <input type="hidden" name="currency" value="'+x.currency+'"> <input type="hidden" name="unitsystem" value="'+x.unitsystem+'"> <input type="hidden" name="weightunit" value="'+x.Wu+'"> <input type="hidden" name="pid" value="'+x.pid+'"> <input type="hidden" name="vid" value="'+x.vid+'">';

         var pvV=x.pvV; var pvN= x.pvN;
    var VarientName='';
 //   W.U.console(pvL[q]);
    for(var p in pvN){
        var liRow='';
        if(pvN[p]!=''){
  liRow='<div class="li"> <span class="dc_0">'+pvN[p]+'</span> <span class="dc_1">'+pvV[p]+'</span> </div>'; 

  VarientName+=liRow;   
        }
     
    }

 ch+='<div class="block  bg_0"><div class="block _bdy fw-b  bg_0"><span class=" fg_2 ff_3">text_47</span></div> <div class="block _bdy fw-b al-c tt-c"><div class="block ul ul-menu dc_divider truncate">'+VarientName+'</div></div></div>';

    return  W.T.DashbordFormWrap(Header, ch);

}


function inventoryList(block){
 var ch='';
  var TriggerData=block.triggerdata;
   var ProductData=block.objectdata;


   
   var Header  =W.T.DashbordFormHeader({titleText:'Variant List',submitbutton:false,pager:W.I.dp,backblock:"blockFront" });

  var createVarient='<div class="block m_b10 m_t10 _bdy"><a href="javascript:void(0);" class="btn btn-block" data-pagerbtn="'+W.I.dp+':inventoryedit:db:'+ProductData.id+':addnew:0:inventorylistedit"  ><span class="vl-sp fw-b">text_48</span><span class="vl-sp right">'+W.T.SVG('nextarrow',24,'#00768D')+'</span></a></div>';





   var pvL=ProductData.pvL;
  //W.U.console(data);   
  
//--List
  var List='<div class="block m_b10 m_t10 _bdy"><div class="block bg_0  ul bs-1"> <div class="block li bg_7 _bdy"> <span class="fw-b">text_49</span></div>';
  




  for(var q in pvL){
    List+='<div class="block li bs-1  _bdy"><div class="block ul ul-menu dc_divider truncate">'; 
    var pvV= pvL[q].pvV; var pvN= pvL[q].pvN;
    var VarientName='';
 //   W.U.console(pvL[q]);
    for(var p in pvN){
        var liRow='';
        if(pvN[p]!=''){
  liRow='<div class="li"> <span class="dc_0">'+pvN[p]+'</span> <span class="dc_1">'+pvV[p]+'</span> </div>'; 
  List+=liRow;
  VarientName+=liRow;   
        }
     
    }



     List+='</div> <div class="fs11 td-cell-link"><span><a href="javascript:void(0);"  data-pagerbtn="'+W.I.dp+':inventoryedit:db:'+ProductData.id+':edit:'+q+':inventorylistedit"  >text_50</a></span><span><a href="javascript:void(0);" data-pagerbtn="'+W.I.dp+':inventoryedit:db:'+ProductData.id+':delete:'+q+':inventorylistedit"  >text_51</a></span><span></span></div></div>';  

    
  }
   List+='</div></div>';  
//-->>List

  ch+=createVarient+List;

   return  W.T.DashbordFormWrap(Header, ch);
}
//----------------------------------
function  TableNameCell(Data){
      
    var TheImage = W.U.ProductImage(Data.pvL,'featureimage');
      var image = W.U.loadImage({ file: TheImage,
                    width: 250,
                    height: 250,
                    type: 'resize'
                });
    var ch='<div class="block">'
    +'<div class="d3 p0 di-td"><img class="sr-img-45" src="'+image +'" alt="image"></div>'
    +'<div class="di-td p1 al-l vl-t "><span class="span  wball">'+Data.pN+'</span></div>'

              +'</div>';
    return ch;
}



//---------------------------------

function Layout(){

    var ch='<div class="block">';

 var AddNewBtn={name:'text_324',attrStr:' data-pagerbtn="'+ W.I.dp+':productedit:db:0" '};

 function bodybuilder(Data){
  var sku=[],stock=[],price=[];
 
    for(var q in Data.pvL ){
        var  currency=W.U.GetCurrencyData(Data.pvL[q].currency);
       sku.push(Data.pvL[q].sku);
      stock.push(Data.pvL[q].stk);
       price.push(currency.symbol+' '+numeral( Data.pvL[q].sP).format('0,0.00'));
    }
   
return {
                            id: Data.pid,
                            name:TableNameCell(Data) ,
                            Hvrt:Data.Hvrt,
                            text_149: W.U.DateDay(Data.date),
                            text_150:sku.join(','),
                            text_152:price.join(','),
                            Data:Data
                        };
 }
 
 function onDelete(id){
     var _this=this;
     var f_value={id:id,AppId:_this.Options.name};
 var loadingId= W.F.Load('deshboardtabletrdelete',f_value);
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      
     var trNode=W.U.id(''+W.U.DashboardTable.intentAbbr[_this.Options.name]+'.'+id+'');
   
     if(W.U.isOK(trNode)){
       $(trNode).remove();
       W.F.Toast('successfully_deleted');
     }
   
       });
     W.U.ccbk.Run('load'+loadingId );  


 }

 

 var TranseData={ ifo: {AppId:W.A.page.AppId, Afiatr: {'stock':0}, Mfiatr: {},Cfiatr:{} } };


 var Options={
title:'text_367',
name:'dashboard_brands',
description:'help_40',
headerbutton:[AddNewBtn],
Tablecolumn:['name','text_149','text_150','text_152'],
bodybuilder:bodybuilder,
TranseData:TranseData ,
onDelete:onDelete 

 }
 var DashboardTable='<div class="block" data-junction="DashboardTablemob" ></div>';
 if(W.I.wf=="mob"){
ch+=DashboardTable;

   
 }

  if(W.I.wf=="web"){
var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:DashboardTable}],
    target:0,
    page:true,
    minheight:'auto'
};
 ch+=  W.T.Pager(setting);
   
 }

      ch+='</div>';

 W.U.Junction('DashboardTablemob',function(){

      W.U.DashboardTable.init(this.Node,Options);
             },{}); 

   return ch;
}

W.T.dashboard_brands={
    productedit:productedit,
    productcopy:productcopy,
    inventryFormBody:inventryFormBody,
    inventryDeleteBody:inventryDeleteBody,
    inventoryList:inventoryList,
    Layout:Layout
    
    };


})(wowrol);