/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";
     //suppling form to W.F.Forms  which delever to dashbord
     /*
     * The dashborard supply in this varible
     * Object {data: undefined, action: "new"}
     */
W.F.Forms[W.A.page.AppId]=function(){
   var ch = '';
   var data = (typeof (this.data) == 'undefined') ? {} : this.data;  
                 
                if (W.U.id('FWsubmit') != null) {
                     
                    //    W.U.id('FWsubmit').onclick = Submit.F0;
                        if (this.action == 'new') {
                            $(W.U.id('FWtitle')).html('Add New Staff');
                                $(W.U.id('FWsubmit')).text('Add');
                     var formData={ un: 'User Name',
                    pw: '123456',
                    staffid: 0

                };

                        } else {
                            $(W.U.id('FWtitle')).html('Edit Staff');
                            $(W.U.id('FWsubmit')).text('Update');
                            console.log(this.data);
                   var formData={ un: data.un,
                    pw: '123456',//data.pw,
                    staffid: data.staffid

                };
                        }




//from data


  var frombody=function(x){
       var URL =W.U.URL;
           
     var ch='';
           ch += '<div class="block  _bdy bg_0"> <div data-help="addstorestaff"></div><input type="hidden" name="staffid" value="' + x.staffid + '">';

                    ch += '<div class="form-piece"> <label>Staff User Name<i >*</i></label> <input type="text" name="staff_username" class="form-mold" placeholder="Staff User Name" data-required="true" autocomplete="off" value="' +x.un + '" data-junction="checkusername" > <div data-help="staff_username"><p class="help-block " style="font-size: 13px; font-style: italic; ">The username of staff.</p></div></div>';
    W.U.JunctionAdd(W.A.page.AppId,'checkusername',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'AlphaNum',option:{}} })();
        },{}); 
                    ch += '<div class="form-piece"> <label>Password<i >*</i></label> <input type="text" name="password" class="form-mold" placeholder="Password" data-required="true" autocomplete="off" value="' +x.pw + '"> <div data-help="password"><p class="help-block " style="font-size: 13px; font-style: italic; "></p></div></div>';
                        ch += '</div>';
        return ch;
            };

var formLogic =function() {
    var rv = ['staff_username', 'password', 'staffid'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=3, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   
  
      var AlertError = W.T.AlertError({message:alert_mes});


      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 


                               

                                var event = jQuery.Event("hide");

                                $(W.U.id('block.' + 'FW')).parent().triggerHandler(event);

                               
                                

                                $( W.U.id('deshboardwalkway')).triggerHandler("update",this.data);

                             

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

     if( W.U.browser.opera_mini){
      alert(this.data);  
     }
 }

var Ragisterdata={
            option:{sendwith:'ajax4'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:W.U.id('FWsubmit')
         };

//form data

    var ch ='<form name="addstorestaff"  data-junction="addstorestaff" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'addstorestaff',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   












                    }//do not call W.U.form  untill submit btn is not intilise



       

     return  ch;

}
  




   
   var Madian=function(x){
       var ch='';

   //--EntityStrip datab

     
 //-->>   
      ch+='<div class="block m_b10" data-nodeid="deshboardwalkway" >deshboardwalkway</div>';
 W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
       // W.U.deshboard(x);
    });


      ch+='<div class="block _bdy bg_0 _B-gray  m_b10"><div class="block _bdy"><span class="fs12 fw-b">Store Staff Hash </span><span>-</span><span class="fs14 fw-b fg_7"> '+x.StoreStaffHash+'</span></div><div class="block _bdy"><span class="fs12 fw-b"><a href="'+W.U.URL('')+'/storestafflogin">Store Staff Login </a></span><span class="block _bdy fg_4 fs-italic fs11">Store Staff Login Page Visiting  will logout you from wowrol.</span></div></div>';
      ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';

        return ch;
   }
   
    
     
   
    

   
   
  W.M[W.A.page.AppId]=  {
       Madian:Madian
     };
   
   


  

 } )(wowrol);