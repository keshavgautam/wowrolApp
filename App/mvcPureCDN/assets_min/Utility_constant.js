/*
* 
*/
; (function(W){
   "use strict";
  var BUYER_MENU=[],STORE_MENU=[],LM_MENU=[],COMPANY_MENU=[],LOGIN_MENU=[],LOGOUT_MENU=[],MENU_DIVIDER=[],STOREAlERT_MENU=[],BUYERAlERT_MENU=[],LMAlERT_MENU=[],COMPANYALERT_MENU=[];
 //   BUYER_MENU.push({href:'',text:'',icon:'',iconSize:24,attrStr:''});

  BUYER_MENU.push({ItemType:'link',ItemData:{href:'',text:'text_262',icon:'home'} });
  BUYER_MENU.push({ItemType:'link',ItemData:{href:'checkins',text:'text_263',icon:'checkIn',attrStr:''} });    
  BUYER_MENU.push({ItemType:'link',ItemData:{href:'myorders',text:'text_264',icon:'orders',attrStr:''} });  
  BUYER_MENU.push({ItemType:'link',ItemData:{href:'myshops',text:'text_265',icon:'store',attrStr:''} });  
  BUYER_MENU.push({ItemType:'link',ItemData:{href:'market',text:'text_266',icon:'place',attrStr:''} }); 
//  BUYER_MENU.push({ItemType:'link',ItemData:{href:'browsinghistory',text:'text_313',icon:'history',attrStr:''} });   
  BUYER_MENU.push({ItemType:'link',ItemData:{href:'setting_buyer',text:'text_267',icon:'setting',attrStr:''} });  
//--


 LM_MENU.push({ItemType:'link',ItemData:{href:'',text:'text_262',icon:'home'} });
 LM_MENU.push({ItemType:'link',ItemData:{href:'',text:'text_321',icon:''} });
 LM_MENU.push({ItemType:'link',ItemData:{href:'',text:'text_322',icon:''} });
 LM_MENU.push({ItemType:'link',ItemData:{href:'locationshops',text:'text_418',icon:''} });
/*
STORE_MENU.push({href:'dashboard_frontpage',text:'frontpage',icon:'frontpage',attrStr:'',haschildren:true,childrenMenu:[
{href:'dashboard_frontpage',text:'slider',icon:'',attrStr:''},
{href:'dashboard_frontpage',text:'category_boxes',icon:'',attrStr:''}
]});*/
 COMPANY_MENU.push({ItemType:'link',ItemData:{href:'',text:'text_262',icon:'home'} });
 COMPANY_MENU.push({ItemType:'link',ItemData:{href:'dashboard_companycategories',text:'text_269',icon:'category'} });
 COMPANY_MENU.push({ItemType:'link',ItemData:{href:'dashboard_companymenu',text:'text_247',icon:'storemenu'} });
 COMPANY_MENU.push({ItemType:'link',ItemData:{href:'dashboard_brands',text:'text_367',icon:'box'} });
 COMPANY_MENU.push({ItemType:'link',ItemData:{href:'company_settings',text:'text_267',icon:'setting'} });

STORE_MENU.push({ItemType:'link',ItemData:{href:'',text:'text_262',icon:'home',attrStr:''} });  
STORE_MENU.push({ItemType:'link',ItemData:{href:'dashboard_categories',text:'text_269',icon:'category'} });
STORE_MENU.push({ItemType:'link',ItemData:{href:'dashboard_menu',text:'text_247',icon:'storemenu'} });
STORE_MENU.push({ItemType:'link',ItemData:{href:'dashboard_products',text:'text_268',icon:'box'} });
STORE_MENU.push({ItemType:'link',ItemData:{href:'dashboard_orders',text:'text_270',icon:'orders',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 "    data-fixedupdateragister="orderalert"  ></span></div>'} });
STORE_MENU.push({ItemType:'link',ItemData:{href:'dashboard_shipping',text:'text_271',icon:'Shippping'} });
STORE_MENU.push({ItemType:'link',ItemData:{href:'dashboard_frontpage',text:'text_86',icon:'frontpage'} });
STORE_MENU.push({ItemType:'link',ItemData:{href:'dashboard_checkins',text:'text_82',icon:'checkIn'} });
//STORE_MENU.push({ItemType:'link',ItemData:{href:'dashboard_discounts',text:'text_386',icon:'report'} });
STORE_MENU.push({ItemType:'link',ItemData:{href:'dashboard_reports',text:'text_70',icon:'report'} });
//STORE_MENU.push({ItemType:'link',ItemData:{href:'storestaff',text:'text_69',icon:'staff'} });
STORE_MENU.push({ItemType:'link',ItemData:{href:'store_settings',text:'text_267',icon:'setting'} });
//--

LOGIN_MENU.push({ItemType:'link',ItemData:{href:'ragisterbuyer',text:'text_71',icon:'user',attrStr:''} });
LOGIN_MENU.push({ItemType:'link',ItemData:{href:'ragisterstore',text:'text_72',icon:'store',attrStr:''} });
LOGIN_MENU.push({ItemType:'link',ItemData:{href:'Ragister',text:'text_73',icon:'changeEntity',attrStr:''} });
LOGIN_MENU.push({ItemType:'link',ItemData:{href:'javascript:void(0);',text:'text_74',icon:'logout',attrStr:' data-junction="Logout" '} });


LOGOUT_MENU.push({ItemType:'link',ItemData:{href:'javascript:void(0);',text:'text_74',icon:'logout',attrStr:' data-junction="Logout" '} });


MENU_DIVIDER.push({ItemType:'link',ItemData:{href:'javascript:void(0);',text:'',icon:'',attrStr:''} });
//--BUYERAlERT_MENU

BUYERAlERT_MENU.push({ItemType:'link',ItemData:{href:'requests',text:'text_75',icon:'staff',attrStr:' ',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 "   data-fixedupdateragister="reqalert"></span></div>'} });  
BUYERAlERT_MENU.push({ItemType:'link',ItemData:{href:'notifications',text:'text_76',icon:'alert',attrStr:'  ',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 " data-fixedupdateragister="notialert"></span></div>'} });  
BUYERAlERT_MENU.push({ItemType:'link',ItemData:{href:'checkins',text:'text_77',icon:'checkIn',attrStr:' ',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 "  data-fixedupdateragister="checkinalert" ></span></div>'} }); 
BUYERAlERT_MENU.push({ItemType:'link',ItemData:{href:'messages',text:'text_78',icon:'chats',attrStr:' ',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 " data-fixedupdateragister="msgalert"  ></span></div>'} }); 



//--




STOREAlERT_MENU.push({ItemType:'link',ItemData:{href:'notifications',text:'text_76',icon:'alert',attrStr:' ',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 "   data-fixedupdateragister="notialert"></span></div>'} }); 
STOREAlERT_MENU.push({ItemType:'link',ItemData:{href:'checkins',text:'text_77',icon:'checkIn',attrStr:' ',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 "   data-fixedupdateragister="checkinalert" ></span></div>'} }); 
STOREAlERT_MENU.push({ItemType:'link',ItemData:{href:'messages',text:'text_78',icon:'chats',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 "   data-fixedupdateragister="msgalert"></span></div>'} }); 
STOREAlERT_MENU.push({ItemType:'link',ItemData:{href:'dashboard_orders',text:'text_79',icon:'orders',attrStr:' ',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 "   data-fixedupdateragister="orderalert"></span></div>'} }); 
//--

LMAlERT_MENU.push({ItemType:'link',ItemData:{href:'javascript:void(0);',text:'text_323',icon:'chats',attrStr:' ',badge:'<div class="block "><span class="badge-0 right br-10 br-10px bg_10 "   ></span></div>'} });

//--

   W.I.BUYERAlERT_MENU=BUYERAlERT_MENU;
   W.I.STOREAlERT_MENU=STOREAlERT_MENU;
   W.I.LMAlERT_MENU=LMAlERT_MENU;

   W.I.BUYER_MENU=BUYER_MENU;
   W.I.LM_MENU=LM_MENU;
   W.I.COMPANY_MENU=COMPANY_MENU;
   W.I.STORE_MENU=STORE_MENU;
   W.I.LOGIN_MENU=LOGIN_MENU;
   W.I.LOGOUT_MENU=LOGOUT_MENU;
   W.I.MENU_DIVIDER=MENU_DIVIDER;
   W.I.COMPANYALERT_MENU=COMPANYALERT_MENU;


   W.I.regExp= {
   bracket: /\[(.*)\]/i,
   decimal: /^\d*(\.)\d+/,
   email: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
   escape: /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
   flags: /^\/(.*)\/(.*)?/,
   integer: /^\-?\d+$/,
   number: /^\-?\d*(\.\d+)?$/,
   url: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/i,
   commentRegExp : /\/\*[\s\S]*?\*\/|([^:"'=]|^)\/\/.*$/mg,
   videoIdMatches: /(?:youtu.be\/|v=)([^&]*)/
  };


  W.I.KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DEL: 8,
  TAB: 9,
  RETURN: 13,
  ENTER: 13,
  ESC: 27,
  PAGEUP: 33,
  PAGEDOWN: 34,
  SPACE: 32
};
 
 W.I.DefaultAddress = {
address_id:0,
address:'',
landmark:'',
phone:'',
otheraddress:'',
otherlandmark:'',
otherphone:'',
location:{id:'',name:''},
postalCode:{id:'',name:''},
town:{id:'',name:''},
city:{id:'',name:''},
state:{id:'',name:''},
country:{id:'',name:''},
 da:0,
d_type:[],
d_ch:'',
d_sch:'',
d_des:''

};


 W.I.WebLinkOptionForList={
     cssClass:{ li:'li bs-1 '}

 }

 W.I.location_info={"name":"","location":{"id":0,"name":""},"postalCode":{"id":"","name":""},"town":{"id":"","name":""},"city":{"id":"","name":""},"state":{"id":"","name":""},"country":{"id":"","name":""},"u_country":"","neighbours":[]}; 

 
})(wowrol);


