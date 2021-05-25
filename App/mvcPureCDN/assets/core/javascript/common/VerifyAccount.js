/*
* 
*/
; (function(W){
   "use strict";


   
var Varify=function(x){
     var form = 'AccountVerification',help=W.U('[data-help="' + form + '"]')[0];
   var rv = ['verification_code'],
        f_value = W.F.walk_way_all(rv, form),error=1, alert_mes = [];
         var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
     alert_mes = alert_mes.concat(glueErrors.message);
 var formData = {
                    form: form,
                    f_value: f_value
                };
if(error==0){
    

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                  W.U.madianLoading("show");

                    },
                    success: function (data) {



                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
                        
 W.U.madianLoading("hide");
    var AlertError =  W.T.AlertError({message:ret.mistake.message});
             W.U.AddDom(help,AlertError,'html');
   W.F.alert(); 

                        }
                        if (ret.state == 200) {

                      

                            W.U.madianLoading("hide");
  /*set the login cookies and load the apropiate cookie .*/
     
            W.U.GotoHref(W.U.URL(''));         


                        }
                    }

                });
}else{
        var AlertError =  W.T.AlertError({message:alert_mes});
             W.U.AddDom(help,AlertError,'html');
   W.F.alert(); 
}
  
}
 var Resend=function(x){
     var form = 'Resend_verification_code',help=W.U('[data-help="Resend_verification_code"]')[0];

      
 var formData = {
                    form: form,
                    f_value: {}
                };
 W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                  W.U.madianLoading("show");

                    },
                    success: function (data) {



                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
                            W.U.madianLoading("hide");

    var AlertError =  W.T.AlertError({message:ret.mistake.message});
             W.U.AddDom(help,AlertError,'html');
   W.F.alert(); 

                        }
                        if (ret.state == 200) {

                    

                            W.U.madianLoading("hide");
    var Alert=  W.T.AlertSuccess({heading:'',message:'New Verification Code has been sent.'});
             W.U.AddDom(help,Alert,'html');
   W.F.alert(); 
                   


                        }
                    }

                });
  
}

 W.U.Junction('Varify',function(){
      this.Node.onclick=Varify;
  },{});
W.U.Junction('Resend',function(){
      this.Node.onclick=Resend;
  },{});


function form(x){
          var identityNAme=(x.identity_type=="email")?'Email Address':"Phone Number"
    var ch=' <div class="block w-max400auto"> <div class="block bs-1 bg_0 m_b10" ><div class="block "> <div class="block _bdy"> <h3 class="m_b5">Varify your '+identityNAme+'</h3> <p class="m_b5">Varify your '+identityNAme+' to full acess your wowrol account.</p><p class="m_b5">We have sent a 6 digit verification code to your '+identityNAme+' <br> <span class="fw-b">'+x.identity+'</span>. </p></div><div class="block _bdy "> <form id="AccountVerification" onsubmit="return false;"> <div class="block form-piece"> <div class="input-group"> <label class="control-label">Verification Code</label> <input type="text" class="form-mold" name="verification_code" autocomplete="off" placeholder="######" data-required="true"> <span class="input-group-btn"> <button class="btn btn-success" type="button" data-junction="Varify" >Varify</button> </span> </div><div data-help="verification_code"> </div></div><div data-help="AccountVerification"></div></form> </div><div class="block _bdy "> <span class="m_b5">Get another code if any trouble. </span > <button class="btn right" type="button"   data-junction="Resend" >Resend</button> </div><div class="block _bdy" data-help="Resend_verification_code"> </div></div></div>';

    return ch;
}

function init(walkway){
     W.U.AddDom(walkway,form(W.A.page.AppView),'html'); 
}

//---------------------
   var Madian=function(x){
   var ch='',page='';

 


//-----------------------
    


     ch+='<div class="block ">';
    
    ch+='<div  data-nodeid="walkway" class="block " style="margin-bottom: 100px;"> </div>'; 
       ch+='</div >';

 if(W.I.wf=="mob"){
 var header=  '';

    
      var footer=W.T.Footer({});; 
     page+=ch;  
 }

 if(W.I.wf=="web"){
var blockFront=  W.T.ColumnWrapXXX(['', ch, ''],['w-x-6','w-x-12','w-x-6']);;

var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:blockFront}],
    target:0,
    page:true,
    minheight:'auto'
};
 page+=  W.T.Pager(setting);
   
 }


 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
        init(W.U.id('walkway')) ;

    });

    return page;
   }

  W.M[W.A.page.AppId]=  {
       Madian:Madian
     };

 })(wowrol);