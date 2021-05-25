; (function(W){
   "use strict";


function BasicInfoPage(x){
      var header=W.T.DashbordFormHeader({titleText:'update_basic_information',sublitText:'save',backblock:W.I.dpbf});

    var ch='<div class="block  bg_0 _bdy m_b10" >';
       ch+='<div class="block m30_0"><div data-help="store_setting_0"></div>';
   
   ch+='<div class="form-piece"> <label class="control-label">store_name <i >*</i></label> <input type="text" name="store_name" class="form-mold" autocomplete="off" placeholder="Store Name" value="'+x.store_name+'" > <div data-help="store_name"></div></div>';
   

     ch+='<div class="form-piece"> <label class="control-label">store_url_address</label> <div class="form-inline"> <div class="input-group "> <div class="input-group-addon">http://wowrol.com/'+x.slug+'</div><p></p> </div></div><div data-help="store_url_address"><span class="block _bdy fg_4 fs-italic fs11">help_5</span></div></div>';



ch+='<div class="form-piece fs11"><label class="control-label">website :</label><input type="text" name="website" class="form-mold fm_sm" autocomplete="off" value="'+x.website+'"><div data-help="website"></div></div>';


     ch+='</div>';

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
  
 W.U.fileUpload.set({Node:this.Node,
 data:this.data,
 usetype:3,
 name:'profilepicdata',
 imagecount:1,
 pager: W.I.dp,
 backblock: 'ProfilePicturePage',
 LayoutForClickButton:function(){var ch='<div class="block bg_6"  ><div class="block"  ><div class="block ul ul-menu  m_b10" kk-node="upload_view" ></div><div class="block  _Bdy"  ><div class="block  bg_6  po-re" data-block="upload_btn_con" ><button class="block upload_btn _Bdy al-c ov-hi" data-toggle="dropdown" >add_images</button><div class="hide po-ab" data-block="menu"> <ul class="dropdown-menu" > <li><a href="javascript:void(0);" kk-click="this.upload()" >Upload New Photo</a></li> <li><a href="javascript:void(0);"  kk-click="this.mediachoose()" >Media Library</a></li> <li><a href="javascript:void(0);"  kk-click="this.URLupload()" >Insert from URL</a></li></ul></div></div></div></div><div class="block" data-help=""></div></div>'; return ch;}


  },x);  

  });


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
function StoreaddressPage(x){
      var header=W.T.DashbordFormHeader({titleText:'update_store_address',sublitText:'save',backblock:W.I.dpbf});

    var ch='<div class="block  bg_0 _bdy m_b10" >';
       ch+='<div class="block m30_0"><div data-help="store_setting_1"></div><input type="hidden" name="address_id" value="'+x.address_id+'" >';
   
  var datalocation={Task:0,
    Data:{

    pager:'mainpage',
    backblock:'StoreaddressPage',
    main:{address:x.address,
    landmark:x.landmark,
    phone:x.phone},
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


     ch+='</div>';

          var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret;    

}

function CollectionPage(x){
   var header=W.T.DashbordFormHeader({titleText:'update_store_collection',sublitText:'save',backblock:W.I.dpbf});


   var selected=[];

   for(var q in x){
    selected[x[q].id]={id:x[q].id,name:x[q].cN};   
   }

    var ch='<div class="block  bg_0 _bdy m_b10" >';
       ch+='<div class="block m30_0"><div data-help="setting_store_collection"></div>';
   
                 var dataselectbox={
                                                         name:'maincollection',
                                                           backblock:'CollectionPage',
                                                           selected:selected,
                                                           fireAfter:2,
                                                            type:'1',
                                                            token:'chips',
                                                            placeholder:'search...'
                                                                   };
  

ch+='<div class="form-piece"> <label class="control-label">What Will You Sell?</label> '+W.U.selectbox.set(dataselectbox)+'</div>';


     ch+='</div>';

          var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret;      
}

function AboutStorePage(x){
     var header=W.T.DashbordFormHeader({titleText:'update_about_store',sublitText:'save',backblock:W.I.dpbf});
    
    var ch='<div class="block  bg_0 _bdy m_b10" >';
       ch+='<div class="block m30_0"><div data-help="store_setting_457"></div>';
   
   ch+='<div class="form-piece"> <label class="control-label">about_store <i >*</i></label> <textarea name="about_store" class="form-mold nochange" autocomplete="off" placeholder="About Store" data-masker="AlphaNum:250:Y:Y"  >'+x.about_store+'</textarea> <div data-help="about_store"></div></div>';
   




     ch+='</div>';

          var ret= '';
  if(W.I.wf=="web"){
   
       ret=  '<div class="block _bdy" >'+W.T.wrapForModal(header,ch,'')+'</div>';    
  
  }

    if(W.I.wf=="mob"){
 
    ret=  W.T.wrap(header,ch,''); 
  }
     
  return ret;     
}
function PolicyStorePage(x){
   var header=W.T.DashbordFormHeader({titleText:'update_policy_store',sublitText:'save',backblock:W.I.dpbf});

    var ch='<div class="block  bg_0 _bdy m_b10" >';
       ch+='<div class="block m30_0"><div data-help="store_setting_456"></div>';
   
   ch+='<div class="form-piece"> <label class="control-label">policy_store <i >*</i></label> <textarea name="store_policy" class="form-mold nochange" autocomplete="off" placeholder="Store Policy" data-masker="AlphaNum:250:Y:Y"   >'+x.store_policy+'</textarea> <div data-help="store_policy">help_16</div></div>';

 ch+='<div class="form-piece"> <label class="control-label">return_policy</label><div class="block" ><div class="block _bdy" >help_15</div><div class="block" data-junction="return_policy">  </div> </div><div data-help="return_policy"></div></div>';


          W.U.JunctionAdd(W.A.page.AppId,'return_policy',function(){
               W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
        },{name:"return_policy",values:[0,1],valuesname:["Yes","No"],Selected:x.return_policy,Class:''});


     ch+='</div>';

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
               
             W.M.store_settings.NotificationChanged(); 
            });


             });


     

    },{});
    var ch='<div class="block bs-1 bg_0" ><form name="store_setting_3" onsubmit="return false">'
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

function ThemePage(x){
   var header=W.T.DashbordFormHeader({titleText:'theme_setting',sublitText:'save',backblock:W.I.dpbf,submitnodeId:true,NodeId:'storethemsubmit'});

    var ch='<div class="block" data-junction="store_theme"></div>';



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



W.T.store_settings={
BasicInfoPage:BasicInfoPage,
CollectionPage:CollectionPage,
AboutStorePage:AboutStorePage,
PolicyStorePage:PolicyStorePage,
ProfilePicturePage:ProfilePicturePage,
ThemePage:ThemePage,
NotificationPage:NotificationPage,
StoreaddressPage:StoreaddressPage,
BlockingPage:BlockingPage
    };

 })(wowrol);