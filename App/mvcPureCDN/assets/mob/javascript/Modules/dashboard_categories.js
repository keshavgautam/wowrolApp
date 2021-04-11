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
                     
                
                        if (this.action == 'new') {
                            $(W.U.id('FWtitle')).html('Add Category');
                                $(W.U.id('FWsubmit')).text('Add');

  W.U.SetIdText('FWtitle','Add Category','html');
       W.U.SetIdText('FWsubmit','Add','text');               
           $(W.U.id('FWsubmit')).show();;

                     var formData={
                    cN: ' default name',
                    pa: { cid: '', cN: '' },
                    description: '',
                    cid: 0,
                    sid: 0

                };

                        } else {
        W.U.SetIdText('FWtitle','Edit Category','html');
       W.U.SetIdText('FWsubmit','Update','text'); 
                
                            console.log(this.data);
                   var formData={
                    cN: data.cN,
                    pa: data.pa,
                    description: data.description,
                    cid: data.cid,
                    sid: data.sid

                };
                        }




//from data


  var frombody=function(x){
       var URL =W.U.URL;
           console.log(x);
     var ch='';
             ch += '<div class="block  _bdy bg_0"><div data-help="addstorecategory"></div>';

                    ch += '<div class="form-piece"> <label>Name<i >*</i></label> <input type="text" name="category_name" class="form-mold" placeholder="Name" data-required="true" autocomplete="off" value="' + x.cN + '"> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">The name is how it appears on your Store Menu.</p></div></div>';
                    var token='';
                    var suggestion = {
                        name: 'category',
                        fireAfter: 4,
                        type: 2,
                        token: 'chips',
                        placeholder: 'Parent'
                    }; 
                    if(x.pa.cid!=''){
              token='<div class="li"><div class="token"> <span>' + x.pa.cN + '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.pa.cid})  + '\' > </div></div>';
  token += '<div class="li hidden"><input type="text" name="suggestion" class="form-mold " placeholder="Pincode"  autocomplete="off"   ></div>';
                    }else{
                  token='<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';    
                    }
                 

   ch += '<div class="form-piece"> <label class="control-label">Parent</label> <div class="form-token block" data-junction="categorysuggestion0"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div></div>';
                    W.U.JunctionAdd(W.A.page.AppId, 'categorysuggestion0', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
                    }, suggestion);  

                    ch += '<div class="form-piece"> <label>Description</label> <textarea name="description" class="form-mold" rows="3" >' + x.description + '</textarea> <input type="hidden" name="cid" value="' + x.cid + '"><input type="hidden" name="sid" value="' + data.sid + '"> <div data-help="description"></div></div>';

                        ch += '</div>';
        return ch;
            };

var formLogic =function() {
    var rv = ['category_name', 'cid', 'sid'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=3, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
      var AlertError = W.T.AlertError({message:alert_mes});

   var rv = ['category'];
   var parentJson=W.F.walk_way_all(rv, this.formname);
   console.log(parentJson);
  f_value['parent']= W.F.JSONparse(parentJson['category'],{id:''})['id'];
 

   var rv = ['description'];
   W.U.extend(f_value, W.F.walk_way_all(rv, this.formname));




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
var onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

     if( W.U.browser.opera_mini){
      alert(this.data);  
     }
 }

var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:W.U.id('FWsubmit')
         };

//form data

    var ch ='<form name="addstorecategory"  data-junction="addstorecategory" onsubmit="return false"></form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'addstorecategory',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   












                    }//do not call W.U.form  untill submit btn is not intilise



       

     return  ch;

}
//-->>

  //== 
   var Madian=function(x){
       var ch='';
   var header= W.T.C.C3_storehomeheader(x);
   var footer=W.T.Footer({});;
   //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 _B-gray  m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>';
 //-->>   
      ch+='<div class="block m_b10" data-nodeid="deshboardwalkway" >deshboardwalkway</div>';
    $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
        W.U.deshboard(x);
    });


    ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';


        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   
 var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);
//--blockFront

var drawer= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Drawer</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.T.C.C1_drawer_HomePageStore(x));
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Alert</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.C.C4_hederAlertStore(x));
//--drawer
var search= W.T.C.C5_SearchDrawer();
//--learn more
     //--learn more
var learnMore=  W.U.LearnMorewrap;











//--search
var blockList=[blockFront,drawer,hederAlert,search,learnMore];
var blockName=["blockFront","drawer","hederAlert","search","learnMore"];
var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};
    ch+=   W.T.ToggleBlock(blockList, blockName,setting);
       return ch;
  
   }

     W.M[W.A.page.AppId]=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };
   


  

 } )(wowrol);