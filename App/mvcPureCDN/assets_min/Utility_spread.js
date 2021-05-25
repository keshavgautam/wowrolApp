/*
*
*/
; (function(W){
   "use strict";
   var AppId=W.A.page.AppId;
  var retriveMode='hp';
  if(AppId=="ProfilePageBuyer"||AppId=="ProfilePageStore"){
      retriveMode='pp';
  }
  var  defaultSpread={"ESd":[],"sid":"","eid":"","oeid":"","veid":"",ctt:'',"prpo":"","qat":"","cmts":"","sped":"","pyi":0,"date":"","date_gmt":"","tey":[],"aoj":[],"cmti":[],"qati":[],"vtd":"","hdg":"Spreads","sdes":""};
   var spreadNode=[];
  function GetSpreadNode(Selecter){

    if (W.U.Spread.spreadNode.hasOwnProperty(Selecter)) {
      return W.U.Spread.spreadNode[Selecter];

    }else{
        return null;
    }
}
  //-- paging
  var PagingData={
   onsucess:function(_this){


var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=function (result) {
     if(AppId=="spread"){
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+W.T.Spread.S.t1(result)+'</div></div>')[0];
  }else{
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+W.T.Spread.S.t0(result)+'</div></div>')[0];
  }




 var ch=RanderInDiv.childNodes;// do not disturb it


  W.U.attrclick('[data-spreaddeleteask]',ch[0],onSpreadDeleteAsk);

 return ch;
};

      _this.DomInsert(walkWay,mainBlock(result),bypass,result);
      if(bypass==3){
           W.U.Pager.togglePage('mainpage','blockFront');
    }

  },
  TranseData:{ifo: {acm: retriveMode,eid:W.A.page.AppView.EntityStripdata.eid }},
  initent:'spread'


  };


//-----------------


//spread edit

var spreadedit={
  name:'spreadedit' ,
 htmlStr:function(block){
         var ch='';
          W.U.console(block);

 var formData=block.objectdata;



   //adding spread form juntion
var Ragisterdata= W.U.Spread.spreadRagisterdata(formData);
 W.U.Junction('spreadform',function(){

  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);

     var form='<form name="spreadform"  data-junction="spreadform" onsubmit="return false"></form>', form_000='';
   if((W.A.page.AcessData.visit_data.wf=='web')){
           form_000='<div class="block " >'+ W.T.ColumnWrap540left('',form,'')+'</div>';
      }else{
            form_000='<div class="block " >'+form+'</div>';
      }
             return form_000;
 },
  presention:(W.A.page.AcessData.visit_data.wf=='mob')?'page':'model'
}

var spreadRagisterdata=function(formData){
    var ch='';

   formData.kk_jid= W.U.KKJ({
       controller:function(){     var _this=this;
       this.tab=0;
       this.sid=formData.sid
       this.spread_text=formData.ctt;
       function GETWhatToShow(){

               var form_row={reaction:true,tagfriend:false,tagproduct:false,privacy:false};
      switch(W.A.page.AppId){
       case 'HomePageBuyer':
      form_row.tagfriend=true;
        form_row.privacy=true;
       break;
          case 'HomePageStore':

     //   form_row.tagproduct=true;
       break;



      }
      return  form_row;

       }


       this.WhatToShow=GETWhatToShow();
       this.fileuploader={
 data:formData.img,
 usetype:1,
 name:'spreadImages',
 imagecount:4,
 pager: W.I.dp,
 backblock: 'spreadedit',
 UploadToURL:W.C.Setting.CDNUPLOAD,
 LayoutForClickButton:function(){var ch='<div class="block bg_6"  ><div class="block"  ><div class="block ul ul-menu  m_b10 im-pb" kk-node="upload_view" >'
      //--------
    +'<div class="li bg_3 block " kk-repeat="image in this.images"  ><div class="block po-re" ><a href="javascript:void(0);"  role="tab" class="btn btn-xs vl-sp po-ab ad-6 z-1"  kk-show="(image.progressOn==false)"  kk-click="image.close()" > ' + W.T.SVG('cross', 16, '#1274c0') + '</a>'
    +'<div class="block po-re img_container" kk-show="(image.showthumnail==true)"  ><img class="img-responsive m0_auto image-preview" style="  background:'+W.U.RandomBGColor() +';" src="{{image.url}}"   /></div>'
       +'<div class="block po-re img_container"kk-show="(image.showthumnail==false)"  ><img class="img-responsive m0_auto image-preview" style="  background:'+W.U.RandomBGColor() +';" src="'+W.I.IMAGE_ERROR_PLACEHOLDER+'"   /></div>'

     +'</div></div>'
     //-------
 +'</div><div class="block  _Bdy"  ><div class="block  bg_6  po-re" data-block="upload_btn_con" ><button class="block upload_btn _Bdy al-c ov-hi" data-toggle="dropdown" >add_images</button><div class="hide po-ab" data-block="menu"> <ul class="dropdown-menu" > <li><a href="javascript:void(0);" kk-click="this.upload()" >Upload New Photo</a></li> <li><a href="javascript:void(0);"  kk-click="this.mediachoose()" >Media Library</a></li> <li><a href="javascript:void(0);"  kk-click="this.URLupload()" >Insert from URL</a></li></ul></div></div></div></div><div class="block" data-help=""></div></div>'; return ch;}


  };


      this.reactionCheckBox={name: "fromreaction", values: [0, 1, 2,3], valuesname: ["Wow","Like", "Agree", "FeelSad"], Selected: 0, Class: '', Listid: '0',callback:function(){}};


      this.Privacy={name: "spreadfromprivacy", values: [0,1,2,5], valuesname: ['Public','Friends','Friends Of Friends','Onlyme'], Selected:formData.pyi, Class: '', Listid: '0', callback:function(){ }};

       var selected={};
      this.FriendSelectbox={  name:'buyerfriend',
                                                           fireAfter:1,
                                                           pager:W.I.dp,
                                                           backblock:"spreadedit",
                                                          TranseData:{},
                                                          selected: selected,
                                                          initSearchText:'',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'Search Friends',
                                                             onselectCallback:function(){
                                                           },
                                                      onselectRemoveCallback:function(){
                                                      }
                                                                   };
 this.ProductSelectbox={  name:'buyerfriend',
                                                           fireAfter:1,
                                                           pager:W.I.dp,
                                                           backblock:"spreadedit",
                                                          TranseData:{},
                                                          selected: selected,
                                                          initSearchText:'',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'Search Friends',
                                                             onselectCallback:function(){
                                                           },
                                                      onselectRemoveCallback:function(){
                                                      }
                                                                   };

this.showImages=function(){ return (_this.tab==1)?true:false;}

this.clicktabchange=function(e){ _this.tab=e;}



       }


 });


var formLogic =function() {
     var   f_value={}, error=0, alert_mes = [],
  f_value1 = W.F.walk_way_all(['spread_text', 'fromreaction:0','spreadfromprivacy:0'], this.formname),
   f_value2 = W.F.walk_way_all(['sid'], this.formname);


    var friendTag = Array('');
            $(':hidden.tokenh_input').each(function (i) {
                if ($(this).attr('name') == 'buyerfriend') {
                    friendTag[i] = W.F.JSONparse($(this).val(), { id: '' })['id'];

                }


            });
            var promoteproduct = Array('');
            $(':hidden.tokenh_input').each(function (i) {
                if ($(this).attr('name') == 'productsuggestion') {
                    promoteproduct[i] = W.F.JSONparse($(this).val(), { id: '' })['id'];

                }


            });
var f_value3={},f_value4={};
          f_value3['tagfriend'] = friendTag;
          f_value4['promoteproduct'] = promoteproduct;

          var appclass= W.U.Landing.GetAppClass( W.I.AppId);
          if(appclass=='ProfilePageBuyer'){appclass='HomePageBuyer'; }
          if(appclass=='ProfilePageStore'){appclass='HomePageStore'; }

        switch(appclass){
       case 'HomePageBuyer':
    f_value= W.U.extend(f_value, f_value1);
      error=3;
       var glueErrors = W.F.glueErrors({ f_value: f_value, error: error });

   f_value= W.U.extend(f_value, f_value2,f_value3);
       break;
       case 'HomePageStore':
      f_value= W.U.extend(f_value, f_value1);
       error=3;
     var glueErrors = W.F.glueErrors({ f_value: f_value, error: error });
      f_value= W.U.extend(f_value, f_value2,f_value4);
       break;

        }







   var images = [], webimages = [],featureimage,copyImage,s=0;

 var   SavedFilesInintent=W.U.intentdata.get('spreadImages'+f_value.sid);
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

 //if ((images.length+webimages.length) < 1) {  alert_mes = alert_mes.concat(['Images are required.']);error++; }


  f_value.mainimages = images;
  f_value.webimages =webimages;




      error=glueErrors.error;
      alert_mes=glueErrors.message;

  var AlertError = W.T.AlertError({message:alert_mes});


      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    W.U.madianLoading('hide');
              W.U.console(this);
   W.U.paging.AddRow('spread',this.data,3);


     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert();
 }

    return {
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:W.T.Spread.spreadFormBody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:''
         };

}


//-- delete
function onSpreadDeleteAsk(){
     var Datastr=(this['data-spreaddeleteask']).split(":");
     var  sid=Datastr[0],action=Datastr[1];
     var blockdata= W.U.intentdata.get('spread.'+sid);
     var DialLogData={};
      if(action=="d"){

DialLogData={
name:'onSpreadDeleteAsk',
 Tilte:'Delete',
 body:'Do you sure to delete this Spread?',
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'Yes ',name:'yes',cssClass:'fg_7'}],
YesCallback:function(){ onclickspreaddelete(sid,action);}
};

 }
      if(action=="r"){
DialLogData={
name:'onSpreadDeleteAsk',
 Tilte:'Remove',
 body:'Do you sure to remove this Spread?',
actionbutton:[{text:'No',name:'no',cssClass:'fg_8"',attrStr:' data-pagerbtn="mainpage:blockFront" '},{text:'Yes ',name:'yes',cssClass:'fg_7'}],
YesCallback:function(){ onclickspreaddelete(sid,action);}
};

 }
  W.U.Pager.AddModal(DialLogData);


   W.U.Pager.DirectInitPage('mainpage','onSpreadDeleteAsk');

}
function onclickspreaddelete(sid,action){
      var f_value ={};
     f_value.action=action;
     f_value.sid=sid;
     var SpreadData= W.U.intentdata.get('spread.'+sid);
        var formData = {
                    form: 'spreaddelete',
                    f_value:f_value
                };
    W.F.Toast({msg:'Delete Sucessfull',theme:'sucess',duration:2000});
  W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {


                    },
                    success: function (data) {

                   var ret = JSON.parse(data);

                        if (ret.state == 500) {



   W.F.Toast({msg:'Delete Unsucessfull',theme:'error',duration:2000});
                        }
                        if (ret.state == 200) {

               $('[data-spreadcard="'+SpreadData.sid+'"]').remove();

                      W.F.Toast({msg:'Delete Sucessfull',theme:'sucess',duration:2000});

                              }
      W.U.Pager.togglePage('mainpage','blockFront');
                    }

                });
}

function init(walkway){


  W.U.Junction('spreadpaging',function(){
PagingData.Node=  this.Node;

  W.U.paging.init(PagingData);
  },PagingData);



 W.U.intentdata.add('spread.0',defaultSpread);



   W.U.Pager.addblockdata(spreadedit);









  W.U.AddDom(walkway,W.T.Spread.Layout(),'html');

      W.U.paging.load('spread');


}




function initForSpreadPage(walkway){

 var SData=W.A.page.AppView.SData;
var SpreadData=SData.spread;
var commentData=SData.comment;

  W.U.Junction('spreadpaging',function(){
PagingData.Node=  this.Node;
   PagingData.paging=false;
  W.U.paging.init(PagingData);

   W.U.paging.AddRow('spread',this.data,3);
  },SpreadData);



 W.U.intentdata.add('spread.0',defaultSpread);
   W.U.Pager.addblockdata(spreadedit);
    var mainBlock=W.U.Rander(W.T.Spread.Layout());



  W.U.Setview(walkway,mainBlock,'html');
}
/*
@ des  init for feed back
*/
function FeedBackSpreadInit(walkway,data){
    W.U.intentdata.add('spread.0',defaultSpread);
    W.U.intentdata.add('spread.'+data.id,data);


     var mainBlock=W.U.Rander(W.T.Spread.S.commentwrap(data.spread[0]));



  W.U.Setview(walkway,mainBlock,'html');
}

 W.U.Spread= {init:init,
initForSpreadPage:initForSpreadPage,
 spreadRagisterdata:spreadRagisterdata,
 spreadNode:spreadNode,
GetSpreadNode:GetSpreadNode,
FeedBackSpreadInit:FeedBackSpreadInit
};






})(wowrol);
