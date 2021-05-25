/*
* 
*/
; (function(W){
   "use strict";

     var Status= ['Draft','To be Approve','Required to review' ,'running'];


   function AdTemplate(x){

     

       return W.T.C.C2_AdCard(x,{link:false});
   }



  
   function pageadvertisebasicedit(x){
   var titleText='text_342'; var sublitText='text_171';
    if(x.adid!=0){
        titleText='text_343';  sublitText='text_241';
    }


   var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText});   
   var ch='<div class="block _bdy">';
     ch += '<div class="block  _bdy bg_0 bs-1"><div data-help="advertisebasic"></div>';

     ch += '<div class="form-piece"> <label class="control-label" >text_344<i >*</i></label> <input type="text" name="heading_1" class="form-mold"  data-required="true" autocomplete="off" value="' + x.h1 + '" data-masker="AlphaNum:30:Y:Y" > <div data-help="heading_1"><p class="di-in fg_4 fs-italic fs11 ">text_345</p></div></div>';

      ch += '<div class="form-piece"> <label class="control-label" >text_346<i >*</i></label> <input type="text" name="heading_2" class="form-mold"  data-required="true" autocomplete="off" value="' + x.h2 + '" data-masker="AlphaNum:30:Y:Y" > <div data-help="heading_2"><p class="di-in fg_4 fs-italic fs11 ">text_347</p></div></div>';

    ch += '<div class="form-piece"> <label class="control-label" >text_27<i >*</i></label> <input type="text" name="description" class="form-mold"  data-required="true" autocomplete="off" value="' + x.des + '" data-masker="AlphaNum:50:Y:Y"> <div data-help="description"><p class="di-in fg_4 fs-italic fs11 ">text_350</p></div></div>';

      ch += '<div class="form-piece"> <label class="control-label" >text_348<i >*</i></label> <input type="text" name="url" class="form-mold"  data-required="true" autocomplete="off" value="' + x.url + '"> <div data-help="url"><p class="di-in fg_4 fs-italic fs11 ">text_349</p></div></div>';

     ch += '<input type="hidden" name="adid" value="' + x.adid + '"><input type="hidden" name="ct" value="' + x.ct + '">';

      ch+='</div>';

     return   W.T.DashbordFormWrap(Header, ch);
   }


   function Layout(){

     var AddNewBtn={name:'text_329',attrStr:' data-pagerbtn="'+ W.I.dp+':advertisebasicedit:advertise:0" '};

 function bodybuilder(Data){
  
 
    

return {
                            id: Data.adid,
                            text_351:AdTemplate(Data),
                            text_158: Status[Data.status],
                            text_356: '',
                            text_357: '',
                            text_358: '',
                            text_359:'',
                            Data:Data
                        };
 }


 var Options={
title:'text_327',
name:'dashboard_advertise',
description:'text_328',
headerbutton:[AddNewBtn],
Tablecolumn:['text_351','text_158','text_356','text_357','text_358','text_359'],
bodybuilder:bodybuilder 

 }

var Jtable=  W.U.J(function(){

      W.U.DashboardTable.init(this.Node,Options);
             },{}); 
 
    var ch='<div class="block">';
ch+='<div class="block"  ></div>';
ch+='<div class="block" data-junction="'+Jtable+'" ></div>';

      ch+='</div>';



   return ch;
}


 

           W.T.dashboard_advertise={
            AdTemplate :AdTemplate,
           Layout:Layout,
           pageadvertisebasicedit:pageadvertisebasicedit,

           inputsuggestion:function(x){
         
          var locData=x.l;
       
       var  HiddenSelected=[];    

    for( var q in locData ){ 
   HiddenSelected[locData[q][0]] ={id: locData[q][0],name: locData[q][2]};

}  

   var datalocation={Task:9,
    Data:{
   pager:W.I.dp,
  backblock:'AdvertiseLocationEdit',
  locallocation:{id:0,name:''},
    town:{id:0,name:''},
    city:{id:0,name:''},
    state:{id:0,name:''},
   multypostalCodebycountry:{id:0,name:''},
    country:{id:0,name:''}    
    },
    HiddenSelected:{
  multypostalCodebycountry:HiddenSelected
    }
    };
  
    var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,datalocation);

             
        //   // W.U.console(this);
          var ch='<div class="block  bg_0   " >';  

    ch+='<div class="block _bdy fs13 fw-b" >text_360</div>';
   ch+='<div class="block  _bdy"  data-location="'+dataKey+'"  ></div>';


           ch +='</div>';
               
            return ch;
},

LocationSuggestionTableHeader:function(x){
      var cellwidth = x.cellwidth;
             var ch='<div class="block ul ul-menu bg_7"><div class="li" style="width:'+cellwidth.col1+'"><div class="block _bdy"> <span class="fw-b tt-c">text_65</span></div></div><div class="li" style="width:'+cellwidth.col2+'"><div class="block _bdy"> <span class="fw-b tt-c">@</span><span class="fw-b tt-c">text_355</span></div></div><div class="li" style="width:'+cellwidth.col3+'"><div class="block _bdy"> <span class="fw-b tt-c"></span></div></div></div>';


            return ch;   
},

LocationSuggestionTableBody:function(x){
    var ch='';
         var input=x.LocationTableCellInputForm;
         var locData=x.Data.l;
          var cellwidth = x.cellwidth;
     var ch='<div class="block ul bg_0"  >'; 
           var _this=x;
            
      for(var i=(locData.length-1);i>=0;i--){
     var onchange=function(){
       var newPrice=W.U.floatval(this.Node.value);
  this.Node.value=newPrice;
    _this.Data.l[this.Id][1]=newPrice;

       
      };    
       
  var Row='<div class="block li b_gtl " ><div class="block ul ul-menu" >';
 Row+='<div class="li " style="width:'+cellwidth.col1+'"  ><div class="block _bdy" >'+locData[i][2]+'</div></div>';

 Row+='<div class="li " style="width:'+cellwidth.col2+'"  ><div class="block _bdy" >'+input(locData[i][1],'surcharge',i,onchange)+'</div></div>';
  Row+='<div class="li " style="width:'+cellwidth.col3+'"  ><div class="block _bdy" ><span class="sclose " data-locationtablerowonremove="'+i+'" style="margin-top:10px;margin-right:12px;"></span></div></div>';

Row+='</div></div>'; 

 ch+=Row;



      }

   
   
       ch += '</div>';


           return ch;

}


           };

   })(wowrol);