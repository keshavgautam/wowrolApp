;(function (W) {
     "use strict";


function Wrap(){
  function Handler(Node, data) {
          
            this.pbd = data;
           
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
                   'Favorites Stores':{total:this.pbd[3].total,slug:'favoritestores'}
                   };   
    }
     if(AppId=="ProfilePageStore"){
           this.StripArr={
                  'Store':{total:'&nbsp;&nbsp;',slug:'store'},
                  'Spreads':{total:this.pbd[5].total,slug:'spreads'},
                  'Favoriters':{total:this.pbd[4].total,slug:'favoriters'}
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
 if(typeof href.vars.tab !="undefined"){
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
   var AppSlug=URL('')+W.A[AppId].AppView.EntityStripdata.slug;
     var ch='<div class="ul ul-menu _b1_00 h50 _ml">';
     


     for(var q in this.StripArr){
      ch+='<div class="li h50 tt-c" data-tabli="'+this.StripArr[q].slug+'" > <h2 >'+this.StripArr[q].total+'</h2> <span><a href="'+AppSlug+'&tab='+this.StripArr[q].slug+'" role="tab" data-tab="ProfilePage" title="View '+q+'">'+q+'</a></span> </div>';   
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