/*
* Basic //Controllers loader
*/
; (function(W){
   "use strict";



var S={
    list:function(data,options,intentId){
    var links=[],text,addressUse=0;
    W.U.intentdata.add('buyeraddress.0',{
                     'address_id':0,
                     'address':'',
                     'landmark':'',
                     'phone':'',
                      'otheraddress':'',
                     'otherlandmark':'',
                     'otherphone':'',
                     'location':{'id':'','name':''},
                     'postalCode':{'id':'','name':''},
                     'town':{'id':'','name':''},
                     'city':{'id':'','name':''},
                     'state':{'id':'','name':''},
                     'country':{'id':'','name':''}
                     });
 

   var links=[],text,button_V1=[],button_V2=[];
 
 links.push({ItemType:'link',ItemData:{text:'new_address_for_delivery',icon:'add',attrStr:' data-pagerbtn="'+ options.pager+':buyeraddressdetailPage:buyeraddress:0:'+options.pager+':'+options.backblock+':'+intentId+'"  '}
     });  
//--Only for checkout
if(options.usetype=='checkout'){
  links.push({ItemType:'info',ItemData:{bodyhtml:'<div class="block _Bdy bg_0 fg_5 ff_3 al-c fs14">help_22</div>'}
     });  
     addressUse=1;
 
}
//--

   for(var q in data){
           if(data[q].address_id!=0){
    

if(options.usetype=='checkout'){
    if(data[q].da==1){
  button_V2=[
 {type:'radio',text:'',name:'buyeraddress',icon:'',value:data[q].address_id,checked:'', attrStr:'  '},
];
}else{
     button_V2=[];    
}
}
 button_V1=[
 {type:'icon',text:'',name:'',icon:'edit',iconsize:16, attrStr:' data-pagerbtn="'+ options.pager+':buyeraddressdetailPage:buyeraddress:'+data[q].address_id+':'+options.pager+':'+options.backblock+':'+intentId+'" '},
];


links.push({ItemType:'html',ItemData:{bodyhtml:W.T.Address(data[q],{usefor:addressUse})} ,primaryaction:button_V2,secondaryaction:button_V1});    


 W.U.intentdata.add('buyeraddress.'+data[q].address_id,data[q]);
           }

       }


//---------
var Options={
    cssClass:{ul:'block ul  bg_0'}
}
         var ch='<div class="block bs-1">';

         ch+= W.U.CreateList(links,Options);
 
        ch+='</div>' ;
       return ch; 
    },

buyeraddressdetailPage:function(block){
  
     var ch='',x=block.objectdata,y=block.triggerdata;
     var rt={titleText:'text_404',sublitText:'save',pager:y[4],backblock:y[5]};
   var header=W.T.DashbordFormHeader(rt);

       var ch='<div class="block  bg_0 _bdy m_b10">';
     

      
   ch+='<div class="block m30_0"><div data-help="buyer_setting_568"></div>';
 
  var datalocation={Task:1,
    Data:{
    main:{address:x.address,
    landmark:x.landmark,
    phone:x.phone},
   other:{address:'asdsadas',
    landmark:'',
    phone:''},
   town:x.town,
    city:x.city,
    state:x.state,
    country:x.country ,
    pager:y[4],
    backblock:'buyeraddressdetailPage'
    }
    };

ch+=W.U.location.set(datalocation);


   ch+=' </div>';



   var ret= '';

  switch(W.I.initType){
      case 2:
 var  col=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'',true)+'</div>';    
       ret= W.T.ColumnWrapXXX(['',col, ''],['w-x-6','w-x-12','w-x-6']); 
      break;
      case 3:
   
       ret= W.T.wrapForModal(header,ch,''); 
      break;
      default:
 ret=  W.T.wrap(header,ch,''); 
  }

     
  return ret; 
},

shippingCheckLayout:function(){
    var ch= '<div class="block">'
   +'<div class="block" data-block="button" ></div >' 
    
    
              +'</div >' ;


    return ch;
},
shippingInfoBlock:function(x){
  var address_id,buyerAddess,storeAddess,address,addr,SBData;
    var ch='';
address=x.address;
SBData=x.SBData;

    var Purchasemethod='<div class="form-piece"> <span>text_107</span></br><span class="fw-b al-l">text_109</span></div>';
var Delivery='<span class="span fg_2  al-l"> <i ></i> help_78</span>';
if(address.da==1){
 Purchasemethod='<div class="form-piece"> <span >text_107</span></br><span class="fw-b al-l">text_108</span></div>';
   Delivery='<span class="span   fg_13  al-l" >help_79</span>'; 
}
ch+='<div class="block  _bdy m_b5">'+Purchasemethod+'<div class="form-piece"> '+Delivery+'<p class="fw-b al-l tt-u">'+address.postalCode.name+'-'+address.town.name+'-'+address.city.name+'-'+address.state.name+'-'+address.country.name+' </p></div>'
+'<div class="form-piece"><a href="javascript:void(0);"class="btn btn-xs btn-link"  data-btn="shippingLocationChange"   >Change</a></div>'

+'<div class="form-piece"><p class="al-l">'+address.d_des+'</p></div></div>';


 return ch;
},
shippingLocationChangePage:function(block){
    var x =block.objectdata;
   
      var header=W.T.DashbordFormHeader({titleText:'select_address',sublitText:'save',pager:x.options.pager,backblock: x.options.backblock});

     

      








      var ch= '';
       var Jid=W.U.J(function(){
     var SBData=W.U.StoreBrowsing.hi_SBdata(); 
     var  pager=(W.I.wf=="mob")?W.I.checkinPager:'ShippingCheckModal';
     var  backblock=(W.I.wf=="mob")?'shippingLocationChangePage':'blockShippingCheckModalFront';
     W.U.DeliveryAddres.init(this.Node,SBData.addr[1],{ is_select:true, pager: pager,
       backblock:backblock,usetype:'checkout'}); 
 },{});
 ch+='<div class="block" data-help="buyeraddressSelect" ></div>'
ch+='<div class="block" data-junction="'+Jid+'" ></div>'

             var ret= '';
  if(W.I.wf=="web"){

     var  col=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'',true)+'</div>';    
   var blockShippingCheckModalFront= W.T.ColumnWrapXXX(['',col, ''],['w-x-6','w-x-12','w-x-6']); 
  var BlockList=[];
BlockList.push({name:"blockShippingCheckModalFront",htmlStr:blockShippingCheckModalFront});

     var setting ={
    name:'ShippingCheckModal',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
      ret= W.T.Pager(setting);
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret;  
}
};





   W.T.DeliveryAddres=S;

   })(wowrol);