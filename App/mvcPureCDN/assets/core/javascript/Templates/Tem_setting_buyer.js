; (function(W){
   "use strict";

function buyerbasicinfoPage(x){
    var ch='';
   var header=W.T.DashbordFormHeader({titleText:'basic_information',sublitText:'save',backblock:W.I.dpbf});

       var ch='<div class="block  bg_0 _bdy m_b10">';
     


   ch+='<div class="block m30_0"><div data-help="buyersetting_0"></div>';
      ch+=' <div class="block"><div class="w6"><div class="form-piece"> <label class="control-label">First Name</label> <input type="text" name="first_name" class="form-mold" autocomplete="off" placeholder="First Name" value="'+x.first_name+'"> <div data-help="first_name"></div></div></div><div class="w6"><div class="form-piece"> <label class="control-label">Last Name</label> <input type="text" name="last_name" class="form-mold" autocomplete="off" placeholder="Last Name" value="'+x.last_name+'"> <div data-help="last_name"></div></div></div></div>';

 ch+='<div class="form-piece"> <label class="control-label">Sex</label><div class="block" data-junction="sex"> <select class="form-mold w6" name="sex" ><option value="">Sex</option> <option value="0" selected="selected">Male</option> <option value="1">Female</option> </select> </div><div data-help="sex"></div></div>';


          W.U.JunctionAdd(W.A.page.AppId,'sex',function(){
               W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
        },{name:"sex",values:[0,1],valuesname:["Male","Female"],Selected:x.sex,Class:''});

    ch+='<div class="form-piece"> <label class="control-label">Birthday</label><div class="block"> <div class="block"  data-junction="Birthday" ></div></div><div data-help="birthday"><span class="fs11 fg_5 ">Verify you are 13 year old.</span></div></div>';

      W.U.JunctionAdd(W.A.page.AppId,'Birthday',function(){
  
     $(this.Node).date_fill(this.data);
        },{selected:x.birthday,class:"form-mold  w4 ",name:"birthday_"});  

ch+='<div class="form-piece"> <label class="control-label"> Country</label><div class="block"> <div class="block"  data-junction="Country"></div></div><div data-help="birthday"><span class="fs11 fg_5 ">Select your country.</span></div></div>';

       W.U.JunctionAdd(W.A.page.AppId,'Country',function(){
           var List=W.A.page.AppView.countryList;
           var ch='<select class="form-mold  w6 " name="country" title="country">';
           var selected='';
           for(var q in List){
               if(List[q].countryinfo_id==this.data.countryinfo_id){
                  selected='selected="selected"'; 
               }else{
                   selected='';
               }
               ch+=' <option value="'+List[q].countryinfo_id+'" '+selected+' >'+List[q].country+'</option>';
           }

           ch+='</select>';
            $(this.Node).html(ch);
        },x);  



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





W.T.setting_buyer={
 buyerbasicinfoPage:buyerbasicinfoPage,
 buyeraddressPage:buyeraddressPage,
 ProfilePicturePage:ProfilePicturePage,
ProfileBannerPage:ProfileBannerPage,
 NotificationPage:NotificationPage,
 PrivacyPage:PrivacyPage,
  BlockingPage: BlockingPage
    };

 })(wowrol);