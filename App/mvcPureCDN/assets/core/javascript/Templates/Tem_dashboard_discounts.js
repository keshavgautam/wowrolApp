/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

   function pagediscountseditbody(x){
         var ch='';




       var titleText='text_387'; var sublitText='text_171';
    if(x.cid!=0){
        titleText='text_388';  sublitText='text_241';
    }


   var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText});

 var ch='<div class="block "><div data-help="creatediscount"></div><div class="block ul bs-1 bg_0"  data-kkcomponent="creatediscount"  >'
 +'<div class="block li bs-1 _Bdy "> <div class="block m_b5"> <h3>text_389</h3> </div><div class="form-piece"> <input type="text" name="discount_code" class="form-mold" placeholder="" data-required="true" autocomplete="off" value="" kk-model="this.dc" > <div data-help="discount_code"></div></div></div>'

 +'<!--=Conditions=--><div class="block li bs-1 _Bdy"> <div class="block m_b5"> <h3>text_390</h3> </div>'
 +'<div class="block _Bdy"><select class="form-mold"   kk-model="this.dt" ><option value="0">Value discount </option><option value="1">Persent Discount</option><option value="2">Free Shipping</option></select></div>'
 
 +'<div class="block" kk-switch="this.dt" > <div   kk-switch-when="0"> <div class="di-td vl-t"> <div class="block _bdy"> takes </div></div><div class="di-td vl-t"> <div class=" form-piece"> <div class="input-group"> <span class="input-group-addon">{{ this.currency_symbol}}</span> <input type="number" class="form-mold" kk-model="this.d" > <span class="input-group-addon">.00</span></div></div></div></div><div kk-switch-when="1" > <div class="di-td vl-t"> <div class="block _bdy"> takes </div></div><div class="di-td vl-t"> <div class=" form-piece"> <div class="input-group"> <input type="number" class="form-mold" kk-model="this.d" > <span class="input-group-addon">%</span></div></div></div></div></div>'




 +'<div class="block m_b10"> <div class="di-td vl-t"> <div class="block _bdy"> off for </div></div><div class="di-td vl-t"> <select class="form-mold"  kk-model="this.at" > <option value="0">all orders</option> <option value="1">orders over</option>   </select> </div></div>'



 +'<div class="block" kk-show ="(this.at==1)" > <div class="di-td vl-t"> <div class="block _bdy"> Minimum ammount of order </div></div><div class="di-td vl-t"> <div class=" form-piece"> <div class="input-group"> <span class="input-group-addon">{{ this.currency_symbol}}</span> <input type="number" class="form-mold" kk-model="this.ms" > <span class="input-group-addon">.00</span> </div></div></div></div>'


 +'<div class="block"  kk-show ="(this.at==2)"  > <div class="di-td vl-t"> <div class="block _bdy"> category for </div></div><div class="di-td vl-t"> </div></div>'

 +'<div class="block" kk-show ="(this.at==3)" > <div class="di-td vl-t"> <div class="block _bdy"> Product for </div></div><div class="di-td vl-t"> </div></div>'



 +'</div><!--=Conditions=-->'
  +'<!--=Usage limits=--><div class="block li bs-1 _Bdy"> <div class="block m_b5"> <h3>text_391</h3> </div>'

 +'<div class="block m_b10"><select class="form-mold"  kk-model="this.ut" > <option value="0">Unlimited</option> <option value="1">Limited number of uses</option>   </select></div>'

  +'<div class="block" kk-show ="(this.ut==1)" > <div class="di-td vl-t"> <div class="block _bdy">text_392 </div></div><div class="di-td vl-t"> <div class=" form-piece"> <div class="input-group">  <input type="number" class="form-mold" kk-model="this.v" > <span class="input-group-addon">times</span> </div></div></div></div>'


 +'</div><!--=Usage limits=-->'




 +'<!--=Date range=--><div class="hide li bs-1 _Bdy"> <div class="block m_b5"> <h3>text_393</h3> </div>'


 +'<div class="form-piece ">  <label class="checkbox " data-toggle="checkbox"> <input type="checkbox" kk-model="this.drt"  ><span class="checkbox__label">No end date</span> </label> <span> Specify the usage limit.</span></div>'

  +'<div class="block"> <div class="w4 col4"> <div class="form-piece"> <label class="control-label" >Discounts begins <i>*</i></label><input type="date"  class="form-mold"  kk-model="this.bd" placeholder="yyyy-MM-dd" min="this.bd" max="this.ed"  >  <div data-help="variant_0"></div></div></div><div class="w4 col4" kk-show ="(this.drt==0)"> <div class="form-piece"> <label class="control-label" >Discounts Expire (end of day) <i>*</i></label><input type="date"  class="form-mold"  kk-model="this.ed" placeholder="yyyy-MM-dd" min="this.bd" max="this.ed"  >  <div data-help="variant_0"></div></div></div></div>'



 +'</div><!--=Date range=-->'

 +'</div></div>';


         return   W.T.DashbordFormWrap(Header, ch);

     }

  
function Layout(){

    var ch='<div class="block">';
     var AddNewBtn={name:'text_90',attrStr:' data-pagerbtn="'+ W.I.dp+':discountedit:discount:0" '};

 function bodybuilder(Data){
    var discount_type=['value off','persent off',' free shipping'],
    usestype=['one time by each coustomer','No limit on use'],
    applytype=['on cart','on specifice products','on specifice category '];


return {
                            id: Data.id,
                            name: Data.dc,
                            discount: Data.d,
                            discounttype: (W.U.isOK(discount_type[Data.dt]))?discount_type[Data.dt]:'',
                            usestype: (W.U.isOK(usestype[Data.ut]))?usestype[Data.ut]:'',
                            applytype: (W.U.isOK(applytype[Data.at]))?applytype[Data.at]:'',
                            expiresdate: '',
                           validity: Data.v,
                            Data:Data
                        };
 }


 var Options={
title:'Discounts',
name:'dashboard_discounts',
description:'Offering discounts can be a vital marketing strategy for your store',
headerbutton:[AddNewBtn],
Tablecolumn:['name','discount','discounttype','usestype','applytype','validity','expiresdate'],
bodybuilder:bodybuilder 

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

W.T.dashboarddiscounts={
    pagediscountseditbody:pagediscountseditbody,
    Layout:Layout
    };
 } )(wowrol);