; (function(W){
   "use strict";

function BasicInfoPage(x){
    var ch='';
   var header=W.T.DashbordFormHeader({titleText:'basic_information',sublitText:'save',backblock:W.I.dpbf});

       var ch='<div class="block  bg_0 _bdy m_b10">';
     
       

   ch+='<div class="block m30_0"><div data-help="company_setting_0"></div>';
 ch+='<div class="form-piece"> <label class="control-label">text_365</label> <input type="text" name="company_name" class="form-mold" autocomplete="off" placeholder="Company Name" value="'+x.name+'" > <div data-help="company_name"></div></div>';
    ch+='<div class="form-piece"> <label class="control-label">store_url_address</label> <div class="form-inline"> <div class="input-group "> <div class="input-group-addon">http://wowrol.com/'+x.slug+'</div><p></p> </div></div><div data-help="store_url_address"><span class="block _bdy fg_4 fs-italic fs11">help_5</span></div></div>';

ch+='<div class="form-piece"> <label class="control-label">text_366</label> <input type="text" name="company_industry_category" class="form-mold" autocomplete="off" placeholder="Company Industry Category" value="'+x.company_industry_category+'" > <div data-help="company_industry_category"></div></div>';





    



     



   ch+=' </div>';
   var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 


      ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret;
}


function  buyeraddressPage(x){
     var ch='';
   var header=W.T.DashbordFormHeader({titleText:'text_404',sublitText:'save',backblock:W.I.dpbf});

       var ch='<div class="block  bg_0 _bdy m_b10">';
     


   ch+='<div class="block m30_0"><div data-help="buyer_setting_568"></div>';
 
  var datalocation={Task:1,
   pager:'mainpage',
    backblock:'buyeraddressPage',
    Data:{
    main:{address:x.address,
    landmark:'',
    phone:''},
   other:{address:'asdsadas',
    landmark:'',
    phone:''},
   town:x.town,
    city:x.city,
    state:x.state,
    country:x.country 
    }
    };

ch+=W.U.location.set(datalocation);


   ch+=' </div>';



   var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 


      ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret; 
}

function ProfilePicturePage(x){
  var header=W.T.DashbordFormHeader({titleText:'profilepicture_setting',sublitText:'save',backblock:W.I.dpbf});

       var Jid=W.U.J(function(){
  
 W.U.fileUpload.set({Node:this.Node,data:this.data,usetype:3,name:'profilepicdata',imagecount:1, pager: W.I.dp,
 backblock: 'ProfilePicturePage'});

  },x);  


    var ch='<div class="block" >'
    +'<div class="block _bdy" data-help="setting_profilepic" ></div>'
    +'<div class="block _bdy al-c" ><span class="fs14 fw-b" >help_38</span></div>'


 +'<div class="block" data-junction="'+Jid+'" ></div>'

   +'<div>';



          var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret;  

}

function ProfileBannerPage(x){
     var header=W.T.DashbordFormHeader({titleText:'profilebanner_setting',sublitText:'save',backblock:W.I.dpbf});

     var Jid=W.U.J(function(){
  
 W.U.fileUpload.set({Node:this.Node,data:this.data,usetype:4,name:'bannerdata',imagecount:1, pager: W.I.dp,
 backblock: 'ProfileBannerPage'});

  },x);  


    var ch='<div class="block" >'
    +'<div class="block _bdy" data-help="setting_banner" ></div>'
    +'<div class="block _bdy al-c" ><span class="fs14 fw-b" >help_39</span></div>'


 +'<div class="block" data-junction="'+Jid+'" ></div>'

   +'<div>';



          var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret; 
}

function NotificationPage(x){
   var header=W.T.DashbordFormHeader({titleText:'notifications_setting',submitbutton:false,backblock:W.I.dpbf});

   var links=[];

 links.push({ItemType:'link',ItemData:{text:'text_0',icon:'',help:''},primaryaction:[
 {type:'checkbox',text:'',name:'nss0',icon:'',checked:((x.nss0==1)?'checked':''),attrStr:' data-notichange="nss0" '},
] });  
 links.push({ItemType:'link',ItemData:{text:'text_1',icon:'',help:''},primaryaction:[
 {type:'checkbox',text:'',name:'nss1',icon:'',checked:((x.nss1==1)?'checked':''),attrStr:' data-notichange="nss1" '},
]  });  
 links.push({ItemType:'link',ItemData:{text:'text_2',icon:'',help:''},primaryaction:[
 {type:'checkbox',text:'',name:'nss2',icon:'',checked:((x.nss2==1)?'checked':''),attrStr:' data-notichange="nss2" '},
] });  
/* links.push({ItemType:'link',ItemData:{text:'text_3',icon:'',help:''},primaryaction:[
 {type:'checkbox',text:'',name:'nss3',icon:'',checked:'',attrStr:' data-notichange="nss3" '},
]  }); */

 var Options={
     cssClass:{ textdiv:'di-td vl-t  w212 fg_9',text:'vl-sp  tt-c fs14  ' }
 }



 var Jid=W.U.J(function(){ 

 W.U.AttachDom(this.Node, W.U.CreateList(links,Options),'html',function
 (){               
          W.U.attrclick('[data-notichange]',this.mainBlock,function(){
               
             W.M.setting_buyer.NotificationChanged(); 
            });


             });


     

    },{});
    var ch='<div class="block bs-1 bg_0" ><form name="buyersetting_3" onsubmit="return false">'
    +'<div class="block _bdy" ><div>'
    +'<div class="block _bdy "  data-junction="'+Jid+'" ><div>'


   +'</form><div>';
 


          var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret; 
}

//----
function PrivacyStrip(key,value){
   var valuesname=['Public','Friends','Friends and their friend ','Onlyme'],
           value_input =[0,1,2,5];
 switch(key){
 case 'cp1':
 case 'cp5': 
 case 'cp6':
 valuesname=['Public','No One'],
         value_input =[0,5];
 break;

     
 }


var Jid=W.U.J(function(){
         W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
  
   
},{name: "privacy", values:  value_input, valuesname: valuesname, Selected: value, Class: '', Listid: key, useCompositeName:false,callback:function(){
        setTimeout(function(){   W.M.setting_buyer.PrivacyChanged(); },1000);
  }});






    var ch='<div class="block ">'
    +'<div class="block vl-sp   fs14  ">'+key+'</div>'
    +'<div class="block " data-junction="'+Jid+'" ></div>'
    +'</div>';


    return ch;
}

function PrivacyPage(x){
   var header=W.T.DashbordFormHeader({titleText:'text_261',ssubmitbutton:false,backblock:W.I.dpbf});
  var links=[]; 
  var Group_0=['ip5','ip8','ip9'],Group_1=['cp0','cp1','cp5','cp6'];

  function heading(x){
      return '<div class="block _bdy fw-b" ><span>'+x+'</span></div>';


  }


   links.push({ItemType:'html',ItemData:{bodyhtml:heading('text_325')}});   
  for(var q in x){

      if( W.U.isvalueInArray(q,Group_0)){

        links.push({ItemType:'html',ItemData:{bodyhtml:PrivacyStrip(q,x[q])}});      
      }
     
  }
    links.push({ItemType:'html',ItemData:{bodyhtml:heading('text_326')}});   
for(var q in x){

      if( W.U.isvalueInArray(q,Group_1)){

        links.push({ItemType:'html',ItemData:{bodyhtml:PrivacyStrip(q,x[q])}});      
      }
     
  }

 var Options={
     cssClass:{ ul:'block ul  bg_0 ',textdiv:'di-td vl-t  w212 fg_9',text:'vl-sp  tt-c fs14  ' }
 }



 var Jid=W.U.J(function(){ 

 W.U.AttachDom(this.Node, W.U.CreateList(links,Options),'html',function
 (){               
      


             });


     

    },{});


    var ch='<div class="block bs-1 bg_0" ><form name="buyersetting_5" onsubmit="return false">'
    +'<div class="block" ><div>'
    +'<div class="block  "  data-junction="'+Jid+'" ><div>'


   +'</form><div>';



          var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret; 
}

function BlockingPage(x){

    var Jid=W.U.J(function(){  
    
  
    W.U.blockedUserManageing.init(this.Node);
           },{});




     var header=W.T.DashbordFormHeader({titleText:'blocking_manage',ssubmitbutton:false,backblock:W.I.dpbf});

      var ch='<div class="block bs-1 bg_0" >'
    +'<div class="block _bdy "  >help_43<div>'
    +'<div class="block _bdy" data-junction="'+Jid+'"><div>'



   +'<div>';
          var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret;   
}





W.T.company_settings={
BasicInfoPage:BasicInfoPage,
 buyeraddressPage:buyeraddressPage,
 ProfilePicturePage:ProfilePicturePage,
ProfileBannerPage:ProfileBannerPage,
 NotificationPage:NotificationPage,
 PrivacyPage:PrivacyPage,
  BlockingPage: BlockingPage
    };

 })(wowrol);