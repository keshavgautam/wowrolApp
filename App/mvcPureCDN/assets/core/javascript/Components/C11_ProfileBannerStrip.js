;(function (W) {
     "use strict";


function Wrap(){
  function Handler(Node, data) {
           this.data = data ;
           this.owr = data.owr ;
            this.pbd = data.pbd;
           this.eid=data.owr.feid;
            this.af=data.owr.af;
            this.Node = Node;
            this.init();
        }

Handler.prototype.init=function(){
    var AppId=W.A.page.AppId;
    this.StripArr={};
    if(AppId=="ProfilePageBuyer"){
    this.StripArr={'Spreads':{total:this.pbd[5].total,slug:'spreads'},
                   'Friends':{total:this.pbd[0].total,slug:'friends'},
                   'Followers':{total:this.pbd[1].total,slug:'followers'},
                   'Followings':{total:this.pbd[2].total,slug:'followings'},
                   'Favorites Stores':{total:this.pbd[3].total,slug:'favoritestores'},
                   'Info':{total:'&nbsp;&nbsp;',slug:'info0'}
                   };   
    }
     if(AppId=="ProfilePageStore"){
           this.StripArr={
                  'Store':{total:'&nbsp;&nbsp;',slug:'store'},
                  'Spreads':{total:this.pbd[5].total,slug:'spreads'},
                  'Favoriters':{total:this.pbd[4].total,slug:'favoriters'},
                  'text_382':{total:'&nbsp;&nbsp;',slug:'all_categories'},
                  'text_383':{total:'&nbsp;&nbsp;',slug:'all_products'},
                  'Info':{total:'&nbsp;&nbsp;',slug:'info1'},
                  'feedBack':{total:'&nbsp;&nbsp;',slug:'feedback'}
                   };  
    }

    this.CreateMarkup();
  var mainBlock=W.U.Rander(this.strip);

    W.U.attrclick('[data-tab="ProfilePage"]',mainBlock[0],function(e){
        e.preventDefault();
  var href = W.U.ParseHref(this.getAttribute('href'));
 
if(W.U.feature.pushState){
     history.pushState('', "", href.href ); 
}

  var tab="spreads";
 if(W.U.isOK(href.vars.tab)){
     tab=href.vars.tab; 
      }
  
  W.U.ProfilePage.setpage(tab);
         });
  W.U.Setview(this.Node,mainBlock, 'html');
  

}

Handler.prototype.CreateMarkup=function(){
 this.strip=CreateStrip.bind(this)();


 function CreateStrip(){
        var AppId=W.A.page.AppId;
  var URL=W.U.URL;
  var eid=0;
  var AppSlug=URL('')+W.A[AppId].AppView.EntityStripdata.slug;
  var MoreLink=[];
   if(W.A.page.AcessData.LoginStatus){
 if(this.owr.status!=0){
    MoreLink.push({href:'javascript:void(0);',text:'block',icon:'',attrStr:'  data-junction="blockuser"  data-eid="'+ this.eid+'" data-af="'+ this.af+'"  data-action="1" '});   
    var reportObject=(this.data.EntityStripdata.type==0)?'reportuser':'reportstore';
    MoreLink.push({href:'javascript:void(0);',text:'Report',icon:'',attrStr:'   data-junction="'+reportObject+'"  data-eid="'+ this.eid+'" data-af="'+ this.af+'"  '});
 }else{
       MoreLink.push({href:'javascript:void(0);',text:'unblock',icon:'',attrStr:'  data-junction="unblockuser"  data-eid="'+ this.eid+'" data-af="'+ this.af+'"  data-action="0" '});
 }
  }

 //--edit links
   var dd_menu=' <div class="hide po-ab" data-block="menu">'+
   W.U.CreateMENU(MoreLink,['block ul hover bg_0 fg_4 ff_3  bs-0','li bs-1','block _Bdy',' tt-c  ',''])+'</div>';


     var ch='<div class="ul ul-menu _b1_00 h50 _ml">';
     


     for(var q in this.StripArr){
var total=numeral(this.StripArr[q].total).format('0 a');;
 total=( total==0)?'<i class="hidden">0</i>':total;
      ch+='<div class="li h50 tt-c fg_11 " data-tabli="'+this.StripArr[q].slug+'" > <span class="block fs18 fw-b">'+total+'</span> <span><a href="'+AppSlug+'&tab='+this.StripArr[q].slug+'" role="tab" data-tab="ProfilePage" title="View '+q+'">'+q+'</a></span> </div>';   
     }

     if( this.owr.status!=1&&W.A.page.AcessData.LoginStatus){
    ch+='<div class="li h50 tt-c fg_11 po-re"    ><div class="block " data-toggle="dropdown"> <span class="block fs18 fw-b"><i class="hidden">0</i></span> <span><a href="javascript:void(0);" role="tab"  title="more">more</a></span></div>'+dd_menu+' </div>';    
    }
         ch+='</div>';
     return ch;
 }

}

          new Handler(this.Node, this.data);   
}


function Strip(x){
     var ch='<div class="block " data-junction="ProfileBannerStrip" ></div>';

  W.U.JunctionAdd(W.A.page.AppId,'ProfileBannerStrip',function(){
     
Wrap.bind({ Node: this.Node, data: this.data })();
  },x);  
    return ch;
}


W.T.C.ProfileBannerStrip=Strip;

 })(wowrol);