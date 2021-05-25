/*
* 
*/
; (function (W) {
    "use strict";
     var AppId=W.A.page.AppId;

function spreadFormBody(x){
   
    var TitleText='Create a Spread',ButtonText='Spread';
  
  var Header=W.T.ActivityHeader({ back: '<a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="mainpage:blockFront"  data-openbtn="mainpage" data-btnid="drawer" >'+W.T.SVG('left',24,'#f1f5fc')+' </a>',
               Title: '<span class=" block header-cell"><span class="vl-sp" >'+TitleText+'</span></span>',
                RightLink: '<div class="di-td"><a href="javascript:void(0);" class="block header-link-btn"  type="submit"    >'+ButtonText+' </a></div>'
            });



            var ch='<div class="block bs-5 bg_0" data-kkcomponent="'+x.kk_jid+'" >'
            +'<div class="block " data-help="spreadform"></div>'
          +'<div class="block ul ul-menu fw-b tt-u"><div class="li"> <a class="block _Bdy hov bs-1" href="javascript:void(0);"  kk-class="{bg_7: (this.tab==0)}" kk-click="this.clicktabchange(0)" >text</a></div><div class="li"> <a class="block _Bdy hov bs-1" href="javascript:void(0);"  kk-class="{bg_7: (this.tab==1)}" kk-click="this.clicktabchange(1)"  >image</a></div></div>'
          +'<div class="block b_gbl b_gtl m_b10  po-re"><input type="hidden" name="sid" value=""> <textarea class="form-mold textarea no-border " name="spread_text" placeholder="Whats new with you?" rows="3" kk-model="this.spread_text"  ></textarea> </div>'
            
          +'<div class="block b_gbl bg_0 m_b10 " kk-show="this.showImages()"   kk-fileuploader="this.fileuploader"></div>'   
           
          +'<div class="block b_gbl  bg_0" kk-show="this.WhatToShow.reaction"  ><div class="form-piece no-border "> <label class="block al-c _bdy fw-b">Reaction</label> <div class="form-token block no-border " kk-listcheckbox="this.reactionCheckBox" ></div></div></div>' 
          +'<div class="block b_gbl  bg_0" kk-show="this.WhatToShow.privacy" ><div class="form-piece no-border "> <label class="block al-c _bdy fw-b">Privacy</label> <div class="form-token block no-border " kk-listcheckbox="this.Privacy" ></div></div></div>' 
         
          +'<div class="block  bg_0" kk-show="this.WhatToShow.tagfriend" ><div class="form-piece no-border "> <label class="block al-c _bdy fw-b">Tag Your friend</label> <div class="form-token block no-border " kk-selectbox="this.FriendSelectbox" ></div></div></div>'

             +'<div class="block  bg_0" kk-show="this.WhatToShow.tagproduct" ><div class="form-piece no-border "> <label class="block al-c _bdy fw-b">Tag Your friend</label> <div class="form-token block no-border " kk-selectbox="this.ProductSelectbox" ></div></div></div>'

           
         +'</div>';








      var form_000=W.T.wrap(Header, ch);
      if((W.A.page.AcessData.visit_data.wf=='web')){
           form_000=W.T.wrapForModal(Header, ch,'',true);
      }
     
            return   form_000;
    }




   var S = {
        t0: function (x) {
            var ch = '';
            for(var q in x){
            ch += S.t00(x[q]);   
            }
         
    
            return ch;

        },
  t1: function (x) {
            var ch = '';
            for(var q in x){
               ch += S.t01(x[q]);   
            }
         
    
            return ch;

        },
        t00: function (x) {
            var ch = '';
         
            ch += '<div class="block bg_0 bs-1 m_b10" data-spreadcard="'+x.sid+'" >';    
            ch += S.actH(x);
            ch += S.header(x);
            ch += S.lagecy(x);
            ch += S.images(x);
            ch += S.text(x);
            ch += S.action(x);
             ch += S.commentwrapweb(x);
            ch += '</div>';
    
            return ch;

        },
         t01:function(x){
          var ch='';
           ch += '<div class="block bg_0 _B-gray m_b10" data-spreadcard="'+x.sid+'"  >';
            ch += S.header(x);
            ch += S.lagecy(x);
           
            ch += S.images(x);
             ch += S.text(x);
            ch += S.action(x);
            ch += S.commentwrap(x);
            ch += '</div>';


         return ch;
        },
      header: function (x) {
            var ch = '';

  //---taged entity
   var tagedentity=x.tey, tagedentitystr='';
  if(W.U.ObjectLength(tagedentity)>0){
   tagedentitystr='<span class="span fg_4 ff_2 fs10"> with  ';
     for(var q in tagedentity){
      tagedentitystr+='<span class="feed-heading"><a href="' + tagedentity[q].entityUrl + '"  title="' +   tagedentity[q].entityName + '">' +  tagedentity[q].entityName + '</a></span> ';
               }
     tagedentitystr+='</span>';  
  }
  


            var p=['public','friends','friends of friends',"","",'onlyme'];
       var moredata=[],EditLink=[];
         moredata.push('<span class="span fg_4 ff_2 fs11">  '+x.hdg+'</span>');
         moredata.push('<span class="span fg_4 ff_2"> <time class="timeago" datetime="'+x.date+'" title="'+x.date+'"></time> </span>');
 moredata.push('<span class="span fg_4 ff_2 fs10">'+x.sdes+' </span>');
    moredata.push(tagedentitystr);
   moredata.push('<span class="span fg_4 ff_2 fs10">To '+p[x.pyi]+' </span>');
   //--edit links
   var editlink_Attr=' data-pagertogglepage="mainpage:ForceLogin" ';
    if(W.A.page.AcessData.LoginStatus){
        editlink_Attr='data-toggle="dropdown"';
           if(x.eid===x.veid){
   EditLink.push({href:'javascript:void(0);',text:'Edit',icon:'',attrStr:'  data-pagerbtn="mainpage:spreadedit:spread:'+x.sid+'"  '});
     EditLink.push({href:'javascript:void(0);',text:'Delete',icon:'',attrStr:'data-spreaddeleteask ="'+x.sid+':d"'});
   }else{

     EditLink.push({href:'javascript:void(0);',text:'Remove',icon:'',attrStr:'data-spreaddeleteask ="'+x.sid+':r"'});
   }
     
   }

      //--edit links
   var dd_menu=' <div class="hide po-ab" data-block="menu">'+
   W.U.CreateMENU(EditLink,['block ul hover bg_0 fg_4 ff_3  bs-0','li bs-1','block _Bdy',' tt-c  ',''])+'</div>';

 

  



            ch += ' <div class="block _Bdy"><div class="w10"> '+W.T.C.C2_EntityStrip(x.ESd,{moredata:moredata})+'</div><div class="w2"><div class="right po-re"  ><a href="javascript:void(0);" class="btn btn-link"  '+editlink_Attr+' >' + W.T.SVG('menuHori', 18, '#1274c0') + '</a>'+dd_menu+'</div></div></div>';
       
          
            return ch;
        },
    lagecy: function (x) {
     //       W.U.console(x.prpo); W.U.console(x.aoj);
            var ch = '<div class="block  " data-spread ="lagecy:'+x.sid+'" >';
            switch(x.prpo){
         case '01'://promostion prodcut
         if(x.aoj.length>0){

             ch+= S.ProductCard(x.aoj,'G2');
         }

         break;
         case '10'://category spread
 if(typeof (x.aojinfo.cN) != 'undefined'){
 ch += ' <div class=" block  bg_6"><div class=" block _bdy al-c "><h2><a href="'+x.aojinfo.slug+'"  title="'+x.aojinfo.cN+'">'+x.aojinfo.cN+'</a></h2></div><!-- images  container--><!-- images  container--></div>';
         }

         if(x.aoj.length>0){

             ch+= S.ProductCard(x.aoj,'G2');
         }

         break;                 
          case '11'://product spread
         if(x.aoj.length>0){
             ch+= S.ProductCard(x.aoj,'G2');
         }

         break; 
         case '13'://product spread
       
        ch+= S.Freindship_ProductCard(x.aoj);

         
         break; 
            }
   
            ch+='</div>';
     //  ch+='<div class="block _bdy "  >pid ='+x.pid+'</br>sid ='+x.sid+'</div>';
            return ch;
        },
    images: function (x) {
         
              var img = x.img;

         
            

            return   W.U.Collage.Create(img);
        },
        text: function (x) {
         
              var text = x.ctt;
var textClass='fs12';
if(text.length<300){
    textClass='fs16';
}
if(text.length<150){
    textClass='fs18';
}

text =W.U.ParseText(text ) ;
            var ch = '<div class="block  " ><div class="block _bdy "  ><div class="block t pt '+textClass+'"><p>' + text + '</p></div></div></div>';


            return ch;
        },
        action: function (x) {
             var ch='';
            //reaction state 0= No, 1 process ,2 done
         
          ch += ' <div class="block " data-junction="spreadaction'+x.sid+'" ></div>';

 W.U.Junction('spreadaction'+x.sid,function(){
 W.U.spread_ViewReaction.SpreadReactionInit(this.Node,this.data);  
  },x.sid); 
 
            return ch;
        },
           ProductCard:function(x,GClass){
          var ch='<div class="block '+GClass+'  m_b10 bg_0"  >';
         for(var q in x){
       ch+='<div class="block grid_gap bg_0" >'+W.T.C.C2_Prductcard(x[q],{})+'</div>'; 

         }
          
           ch+='</div>';
        return ch;
             
        },

        Freindship_ProductCard:function(x){
          
            var ch='';
            if(W.U.isOK(x.a)&&W.U.isOK(x.f)){
              var ch='<div class="block _bdy" >'
            +'<div class="block _bdy" >Both '+x.a.entityName+' and  '+x.f.entityName+'  are friends. </div>'

             +'<div class="block bs-1" >'
             +'<div class="w6 _bdy" >'+W.T.C.C2_EntityStrip(x.a,{})+'</div>'
            
             +'<div class="w6 _bdy" >'+W.T.C.C2_EntityStrip(x.f,{})+'</div>'
             +'</div>'
            
             +'</div>';   
            }
           


            return ch;

        },
       actH:function(x){ //activity header
         var ch='';
         var atyc=x.atyc;
         if(atyc=="100"||atyc=="101"||atyc=="102"){
           ch+='<div class="block _Bdy bg_6">'; 
var moredata=[];
moredata.push(activityDes(x)); 

ch+='<div class="block">'+W.T.C.C2_EntityStrip(x.cESd,{moredata:moredata})+'</div>'; 

           ch+='</div>';
         }

        
          
         return ch;
           },
       commentwrap: function (x) {
            var ch = '<div class="block b_gtl ">'+ W.T.SpreadComment.SpreadPageLayout(x)+'</div>';

 


            return ch;
        } ,
       commentwrapweb: function (x) {
            var ch = '';

            if( W.I.wf=='web'){
      
             ch += W.T.SpreadComment.webLayout(x); 
            }


            return ch;
        } 
        };

 function Layout(){
   var ch='';
var spreadform='<div class="block bg_0 _B-gray  br-2 _bdy m_b10"><div class="left "><div class="block _bdy"><span class="fw-b fs14"> What\'s new with you?</span></div></div> <div class="right "><a href="javascript:void(0);" class="btn _fbtn " data-pagerbtn="mainpage:spreadedit:spread:0" ><span>Spread</span></a></div></div>';


  if(AppId=="ProfilePageBuyer"||AppId=="ProfilePageStore"||AppId=="spread"){
    spreadform='';
  }
 var front='<div class="block">'+spreadform+'<div class="block" data-junction="spreadpaging" ></div></div>';

return front;
     
 }




 var Collage ={
     
ViewZoom:function(block){



  var Jid=W.U.KKJ({
       controller:function(){     
        var   __this =this;
        this.imgs=block.objectdata;
         this.isWhirlgiginstalled=0;   
         this.Whirlgig={setting:function(){
          var URL=W.U.URL;
           var limit=__this.imgs.length,bigImages=[];
         
  for (var q = 0; q < limit; q++) {


  bigImages[q] = '<div class="block"  ><img class="img-responsive m0_auto" style="  background:'+W.U.RandomBGColor() +';"  src="'+ __this.imgs[q].url+'" srsc="'+ __this.imgs[q].url+'" alt="image"></div>';


     }

  var setting={
     items: bigImages,
     name:'Whirlgig_1',
      type:'Carousel',
      singleItem : true,
      pagination : true,
      control : true,
      cssClass:{0:'carousel-inner po-re bg_7 fg_4',1:'',2:''}
      
  };;
  return setting;
  },
  isinstall:function(){   return (__this.isWhirlgiginstalled==0);},
  oninstall:function(){
        __this.isWhirlgiginstalled=1;      
  }
  }

       }


 });


  var Header  =W.T.DashbordFormHeader({titleText:'View Photos',sublitText:''}); 
 var ch='<div class="block"  kk-whirlgig="this.Whirlgig"></div>';
  return   '<div class="block" data-kkcomponent="'+Jid+'" >'+W.T.DialogWrap(Header, ch,'',true)+'</div>';
}

 };



 W.T.Spread = {
  Layout:Layout,
  S:S,
  spreadFormBody:spreadFormBody,
  Collage:Collage
   };
})(wowrol);