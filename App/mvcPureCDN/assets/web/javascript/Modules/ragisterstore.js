/*
* 
*/
; (function(W){
   "use strict";

  

   var ragisterationform=function(x){
        var URL =W.U.URL;
    var ch='<div class="block _bdy ">';
     ch+='<div class="block fw-b"> <div class="block _bdy"><h2>Open Wowrol Store</h2></div><div class="block _bdy t"><span>Open a Wowrol Store to reach and engage with millions of online consumers.</span></div></div>';



   
   ch+='<div class="form-piece"> <label class="control-label">Store Name <i >*</i></label> <input type="text" name="store_name" class="form-mold" autocomplete="off" placeholder="Store Name" value="Test mob Store" > <div data-help="store_name"></div></div>';
   
   ch+='<div class="form-piece"> <label class="control-label">Store URL Address <i >*</i></label> <div class="form-inline"> <div class="input-group "> <div class="input-group-addon">http://wowrol.com/</div><input type="text" name="store_url_address" class="form-mold" placeholder="URL Address" autocomplete="off" data-junction="checkURL"  value="Test-mob-Store" > </div></div><div data-help="store_url_address"><span class="block _bdy fg_4 fs-italic fs11">You can choose a store url address that is easier to memorize and looks better on business cards.</span></div></div>';
   W.U.JunctionAdd(W.A.page.AppId,'checkURL',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'URL',option:{}} })();
        },{}); 
                                   var suggestion={
                                                            name:'storecategory',
                                                            fireAfter:4,
                                                            type:'1',
                                                            token:'chips',
                                                            placeholder:'storecategory'
                                                                   };
   ch+='<div class="form-piece"> <label class="control-label">What Will You Sell?</label> <div class="form-token block" data-junction="suggestion0"> <div class="block bd"><div class="block ul ul-menu"><div class="li"><div class="token"> <span>Kota Doria Sari</span> <span class="sclose s_tclose" > ></span> <input class="tokenh_input" type="hidden" name="storecategory" value="{&quot;id&quot;:&quot;Kota Doria Sari&quot;}"> </div></div><div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="Sell Tag"  autocomplete="off"   ></div></div><div class="block d po-re"> </div></div></div></div>';
      W.U.JunctionAdd(W.A.page.AppId,'suggestion0',function(){
    W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },suggestion);  
                                        var dataselectbox={
                                                         name:'maincollection',
                                                           fireAfter:2,
                                                            type:'1',
                                                            token:'chips',
                                                            placeholder:'search...'
                                                                   };
    var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,dataselectbox);

ch+='<div class="form-piece"> <label class="control-label">What Will You Sell?</label> <div data-selectbox="'+dataKey+'"> </div></div>';

    var datalocation={Task:0,
    Data:{
    main:{address:'',
    landmark:'',
    phone:''},
   other:{address:'',
    landmark:'',
    phone:''},
    town:{id:0,name:''},
    city:{id:0,name:''},
    state:{id:0,name:''},
    country:{id:0,name:''}    
    }
    };
    var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,datalocation);


ch+='<div class="block" data-location="'+dataKey+'" ></div>';
ch+='<div class="form-piece"> <div data-help="terms"> <div class="fs11">By clicking get start, you agree to our <a href="'+URL('terms')+'" class="fs11" target="_blank" tabindex="">Terms </a> . </div></div></div>';
   ch+='<div class="block m30_0"><div data-help="Ragister_Store"></div>';
ch+='<div class="form-piece clearfix"> <button type="submit" class="block btn _dbtn right">Get Start</button> </div>';
   ch+=' </div>';



ch+='</div>';
       return ch;
   };

   var frombody=function(x){
       var URL =W.U.URL;
           
     var ch='';

      ch+= '<div class="block _Bdy"><div class=" bs-1 w6  _bdy bg_0">'+ragisterationform(x)+'</div></div>';
  
   
        return ch;
            };

var formLogic =function() {
     var rv =   ['store_name', 'store_url_address', 'address', 'pincode','phone'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=5, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
    alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
          // collecting sell tag
        var storecategory = Array('');
        $(':hidden.tokenh_input').each(function (i) {
            if ($(this).attr('name') == 'storecategory') {
              storecategory[i]=W.F.JSONparse($(this).val(),{id:''})['id'];
                 
            }


        });
        
        f_value['pincode']=W.F.JSONparse(f_value['pincode'],{id:''})['id'];
         f_value['storecategory']=storecategory;

      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){
    location.assign(W.U.URL(''));

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
        W.F.alert(); 
 }

    var Ragisterdata={
            option:{sendwith:'ajax4'},
            formData:{store_name:'Test-mob-Store',
                      store_url_address:'Test-mob-Store',
                     storecategory:{},
                     address:'',
                     pincode:''

            },
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic

         };


var Madian1=function(x){
     var ch ='<form name="Ragister_Store"  data-junction="Ragister_Store" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'Ragister_Store',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   
       

     return  ch;
   }



var Madian=function(x){
var  one='<div  class="block _bdy" data-nodeid="walkway"  style="margin-bottom: 100px;"> </div>';
var two='';
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
       
       W.U.ragisterStore.init(W.U.id('walkway'),{});
    });

 return W.T.ColumnWrapXXX([one,two],['w-x-10','w-x-14 ma-l-5']); 
   }
   
    

   


  var Landing=function(x){
        var ch ='';
  var DrawerMEnu=  W.I.LOGOUT_MENU
       if(W.A.page.AcessData.LoginStatus){
          DrawerMEnu=  W.I.LOGIN_MENU.concat(W.I.LOGOUT_MENU);

       }
   /*    var headerRow1=W.T.WebHeader({  actiondropdown:DrawerMEnu  });
      var header= [];
      header.push({Isfixed:true,html:headerRow1});
   */
     var header=W.T.WebHeader({  actiondropdown:DrawerMEnu  });
      var footer=W.T.Footer({});;

  
 var   blockFront= W.T.wrap(header,Madian(x),footer);
  var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
BlockList.push({name:"search",htmlStr:W.T.Search.page()});
var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
   
       return W.T.Pager(setting);
   }
   
    

   


      W.M[W.A.page.AppId]=  {
       Madian:Madian,
       Landing:Landing
     };


})(wowrol);