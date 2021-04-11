/*
* 
*/
; (function(W){
   "use strict";

   function ToggleView(){
     
     function Handler(href){
         var ret =  W.U.ParseHref(href);
 this.href  = ret.href;


 var site_url_reg = W.U.URL('SITEURLreg');
  var gohref =  this.href;
      if (site_url_reg.test(this.href)) {
        gohref = this.href + '?g=0';
    } else { 
      gohref = this.href + '&g=0';
    }
  var MatchView = this.GetMatchView.bind(this)();
 console.log(MatchView);

  //--
    if (MatchView.url == '') {
             console.log(gohref);
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
              // console.log(ret)

                if (ret.state == 200) {
                    var page = ret.response;
                 W.A[page.AppId] =  W.A.page = page;
                  W.A.page.AppSlug = gohref;
                  console.log(W.A.page);
                   W.C.loader.init(W.A.page);
                }


            }

        });
    } else { // this app is already present in dom


    W.A.page = W.A[MatchView.AppId];
     W.A.page.AppSlug = gohref;
     W.A.page.AppView = MatchView.data;
     W.A[page.AppId] = W.A.page ;
     //recapcha work


     W.C.loader.init(W.A.page);
    
    
    
    }

     }  

Handler.prototype.GetMatchView= function () {

        var view = {url:'',data:'',AppId:''};

        for (var q in W.V) {
            if (W.V[q].url != 'undefined' && typeof (W.V[q].url) != 'undefined') {

                //  // console.log('wowrol.App[q].AppSlug == this.gohref  ' + wowrol.App[q].AppSlug + '  ' + this.gohref);
                // // console.log('this.gohref.indexOf(wowrol.App[q].AppSlug) ' + this.gohref.indexOf(wowrol.App[q].AppSlug));
                if (W.V[q].url == this.gohref) {
                 view = W.V[q];
                    break;
                }
            }

        }


        return  view ;
    }



 function onclick(e) { 
          e.preventDefault();
  
     var href =  this.getAttribute('href');
  
     history.pushState('', "", href );
         new Handler(href);
   
    }


  var href = this.getAttribute('href');
  var rol = this.getAttribute('role');
   var bro=W.U.browser;
  
    if (href != 'javascript:void(0);' && href != '' && href != 'undefined' && href != undefined && rol != "button" && rol != "linkbutton" && rol != "tab"&&  rol !="checkinmenu" && W.U.feature.pushState) {
      W.U.fn.lister('click',this,onclick.bind(this),false);

    }

window.onpopstate = function (e) {
     
        // console.log(e);  
        new Handler(document.location);

    };

   }

   W.U.ToggleView=ToggleView;

})(wowrol);