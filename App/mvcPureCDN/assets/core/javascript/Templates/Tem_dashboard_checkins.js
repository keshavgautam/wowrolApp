/*
* 
*/
; (function(W){
   "use strict";

/*
@call W.U.Browsing.ParseEntityData();
*/

function ParseEntityData(x){
      var y={
          entityName:'',
          avatar:''
          };
var z=[],p=0;
for(var q in x){
    if(x[q].eid!=W.A.page.AppView.EntityStripdata.eid){
      z[p]=  x[q];p++;
    }
}
//W.U.console(z);
var names=[];
      for(var q in z ){
         
      
        names.push(z[q].entityName);
          y.avatar= z[q].avatar;
      }
  
      if(names.length>1){
        y.avatar= W.C.Setting.staticHTML+'/assets/imgs/pic/GroupAvatar1@2x.png'   
      }
        y.entityName+= names.join(',&nbsp;') ;



      return y
  }
/*
@call W.U.Browsing.CheckInDescrition();
*/
function CheckInDescrition(x){
    var ret={
        avatar:'',
        date:'',
        name:'',
        line1:''
    };
    var storeEd=x.Ed[0],buyerEd=x.Ed[1],selfEd=x.Ed[x.role],friends=[];
    switch(x.role){
        case 0:
ret.line1=W.U.strformat("shopping of {0} ",buyerEd.entityName); 
ret.name=buyerEd.entityName; 
        break;
        case 1:
ret.line1=W.U.strformat("shopping at {0} ",storeEd.entityName); 
ret.name=storeEd.entityName; 
        break;
        default:
ret.line1=W.U.strformat("shopping of {0} ",buyerEd.entityName); 
ret.name=buyerEd.entityName; 
    }

    if(x.Ed.length>2){
 ret.line1+=' with ';

        for(var p=2;p<x.Ed.length;p++){
      
         friends.push(x.Ed[p].entityName);
         if(p>5){p=x.Ed.length;}     
        }
           ret.line1+= friends.join(','); 
          if(x.Ed.length>5){
               ret.line1+=' and other friends.';
              }     
    }

    return  ret;
}


function Information(x){
    var URL =W.U.URL;
        var y=ParseEntityData(x.Ed);
        var desData=CheckInDescrition(x);
 
     x.updater_id=(x.updater_id)?x.updater_id:0; 
   var ch='<a class="block fg_11 no-t-deco"  href="'+URL('checkins')+'&id='+x.id+'"   data-point="'+x.updater_id+'" data-id="'+x.id+'" > <div class="di-td _bdy"><img class=" x48" alt="64x64" src="'+W.I.IMAGE_PLACEHOLDER+'"  data-src="'+y.avatar+'"  ></div><div class="di-td vl-t  _bdy w212"> <div class="block fw-b">'+desData.name+'</div><div class="block "> <div class=" wball  "  >'+desData.line1+'</div></div></div><div class="di-td bs-1-bottom _bdy po-re"> <div class="block"> <div class="block  "><span class="block fg_12 fs11 time "></span></div><div class="block m_t5"><span class="badge-0 right br-10 br-10px bg_10 "></span></div></div></div></a>';
  return ch;   
}

/**/







   var S ={
       
/*
*/
Layout :function (Jid0,Jid1){

    var ch='<div class="block">';
  var FilterBtn={name:'Filter',attrStr:' data-pagerbtn="'+W.I.dp+':checkinfilter:dashboard_checkins:0" '};


function infoBlock(){

     
    var ch= '<div class="block _bdy"  data-kkcomponent="checkininfoBlock" ><div class="block fs13 " >showing {{this.activefilter}} </div> </div>';
     W.U.AddDom(this.TemplateNode.info,ch,'html');
}

 function bodybuilder(Data){
 
return {
                            id: Data.oid,
                            information: Information(Data),
                            date: Data.checkInTime
                        };
 }


 var TranseData={
          
                ifo: {AppId:W.A.page.AppId, Afiatr: [], Mfiatr: [],Cfiatr:[],type:0 },  //info
               bypass: 0,
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 3,  //pagesize
                tp: 1,  //total page
                tr: 1,  //total result
                pgd: 1   //paged
            };
//--
 var Options={
title:'text_20',
name:'dashboard_checkins',
description:'help_59',
headerbutton:[FilterBtn],
Tablecolumn:['information','date'],
bodybuilder:bodybuilder,
infoBlock:infoBlock,
TranseData:TranseData 

 };



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




   };
   


     W.T.dashbordCheckins = S;
})(wowrol);