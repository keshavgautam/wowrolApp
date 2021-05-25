/*
* 
*/
; (function(W){
   "use strict";

       function Handler(href){
         var ret =  W.U.ParseHref(href);
 this.href  = ret.href;
 //making pager on block frount
  W.U.Pager.togglePage('mainpage','blockFront');

 var site_url_reg = W.U.URL('SITEURLreg');
  var gohref =  this.href;
      if (site_url_reg.test(this.href)) {
        gohref = this.href + '?g=0';
    } else { 
      gohref = this.href + '&g=0';
    }
  var MatchView = this.GetMatchView.bind(this)();
 W.U.console(MatchView);

  //--
    if (MatchView.url == '') {
             W.U.console(gohref);
        var form = 'gogohref';
       W.U.iFePost({
            url: gohref,
            data: {},
            context: this,
            type: 'POST',
            iframeName: form,
            beforeSend: function () {
           W.U.madianLoading('show');
            },
            success: function (data) {


                var ret = JSON.parse(data);
              // W.U.console(ret)

                if (ret.state == 200) {
                    var page = ret.response;
                 W.A[page.AppId] =  W.A.page = page;
                  W.A.page.AppSlug = gohref;
                   W.U.ccbk.Run('viewloaded' );
                   W.U.ccbk.Clear('pageloaded' );
                     W.U.Updater.DeleteRail('main');
                      W.U.intentdata.bank ={};
                       W.C.loader.init(W.A.page);
                        W.U.ccbk.Clear('viewloaded' );
                }


            }

        });
    } else { // this app is already present in dom

   
 
    W.A.page = W.A[MatchView.AppId];
     W.A.page.AppSlug = gohref;
     W.A.page.AppView = MatchView.data;
     W.A[page.AppId] = W.A.page ;
     //recapcha work
    // W.U.console();
   W.U.ccbk.Run('viewloaded' );
    W.U.ccbk.Clear('pageloaded' );
 W.U.intentdata.bank ={};
     W.C.loader.init(W.A.page);
     W.U.ccbk.Clear('viewloaded' );
    
    
    }

     }  

Handler.prototype.GetMatchView= function () {

        var view = {url:'',data:'',AppId:''};

        for (var q in W.V) {
            if (W.V[q].url != 'undefined' && typeof (W.V[q].url) != 'undefined') {

                //  // W.U.console('wowrol.App[q].AppSlug == this.gohref  ' + wowrol.App[q].AppSlug + '  ' + this.gohref);
                // // W.U.console('this.gohref.indexOf(wowrol.App[q].AppSlug) ' + this.gohref.indexOf(wowrol.App[q].AppSlug));
                if (W.V[q].url == this.gohref) {
                 view = W.V[q];
                    break;
                }
            }

        }


        return  view ;
    }



   //---------

   function ToggleView(){
     
 



 function onclick(e) { 
          e.preventDefault();
  
     var href =  this.getAttribute('href');
  
   // history.pushState('', "", href );
     history.replaceState('', "", href); 
         new Handler(href);
   
    }


  var href = this.getAttribute('href');
  var rol = this.getAttribute('role');
   var bro=W.U.browser;
  var NotAllowed=/(ordertracking)|(orderdetails)/ig;


    if (href != 'javascript:void(0);' && href != '' && href != 'undefined'&& href != '#' && href != undefined && rol != "button" && rol != "linkbutton" && rol != "tab"&&  rol !="checkinmenu" && W.U.feature.pushState&&(!NotAllowed.test(href))) {
 
      this.onclick=onclick;
   

    }


    if(rol =="checkinmenu"){
       this.onclick= W.U.CheckInStoreBrowser.OnCheckInMenuClick;
        
    }

window.onpopstate = function (e) {
    // debugger;
        // W.U.console(e);  
        new Handler(document.location);

    };

   }

   function GotoHref(href){
       if(W.U.feature.pushState){
  history.pushState('', "", href );
             new Handler(href);
       }else{
            location.assign(href);
       }
      
   }
   W.U.ToggleView=ToggleView;

   W.U.GotoHref=GotoHref;

})(wowrol);