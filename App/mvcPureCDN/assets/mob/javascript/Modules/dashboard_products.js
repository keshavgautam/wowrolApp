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
    W.U.SetIdText('FWtitle','Add Product','html');
       W.U.SetIdText('FWsubmit','Add','text');               
           $(W.U.id('FWsubmit')).show();;
                     var formData={
                    pN: 'default',
                    des: '',
                    pid: 0,
                    sid: 0,
                    kf:['','','',''],
                    pvN:['','',''],
                    sW:[],
                    pC:[{cN:'default&nbsp;namewer','cid':1}]
                };

                        } else {
    W.U.SetIdText('FWtitle','Edit Product','html');
       W.U.SetIdText('FWsubmit','Update','text'); 
       $(W.U.id('FWsubmit')).show();;

                        console.log(this.data);
                   var formData=data;
                        }

           
var frombody=function(x){
       var URL =W.U.URL;
          // console.log(x);
        var ch='';
         ch += '<div class="block ">';
        ch += '<div class="block  bg_0"><div class="block  _bdy" data-help="product_one"></div><input type="hidden" name="pid" value="' + x.pid + '"><input type="hidden" name="sid" value="' + x.sid + '">';

       ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label>Product Name<i>*</i></label> <input type="text" name="product_name" class="form-mold" placeholder="Name" autocomplete="off" value="'+x.pN+'"> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">The name of product.</p></div></div></div>';

       ch+='<div class="block b_gbl _bdy"><div class="form-piece "> <label>Key Features</label> <div class="block ul"> <div class="li"><input type="text" class="form-mold" name="keyfeature_0" placeholder="key feature" autocomplete="off" value="'+x.kf[0]+'"></div><div class="li"><input type="text" class="form-mold" name="keyfeature_1" placeholder="key feature" autocomplete="off" value="'+x.kf[1]+'"></div><div class="li"><input type="text" class="form-mold" name="keyfeature_2" placeholder="key feature" autocomplete="off" value="'+x.kf[2]+'"></div><div class="li"><input type="text" class="form-mold" name="keyfeature_3" placeholder="key feature" autocomplete="off" value="'+x.kf[3]+'"></div></div><div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">Key Features of product (30 charactor each).</p></div></div></div>';

       var checked=(x.Hvrt)?'checked':'';
         ch += '<div class="block b_gbl _bdy"> <div class="form-piece "> <label>Has Variant ?</label> <div class="checkbox"> <label> <input type="checkbox" name="has_varient" value="1" '+checked+' onclick="if(this.checked==true){$(\'#varientbox\').show();}else{$(\'#varientbox\').hide();}" ><span></span> This product has variation in property such as color ,size ,length. </label> </div></div></div>';
           var varientboxdisplay=(x.Hvrt)?'':'display:none;';
         ch += '<div class="block b_gbl _bdy" style="'+varientboxdisplay+'" id="varientbox"><div class="form-piece"> <label>Varient Name<i>*</i></label> <div class="block "> <div class="w4 col4"><input type="text" name="varient_1" class="form-mold " placeholder="Varient Name" autocomplete="off" value="'+x.pvN[0]+'"></div><div class="w4 col4"><input type="text" name="varient_2" class="form-mold " placeholder="Varient Name" autocomplete="off" value="'+x.pvN[1]+'"></div><div class="w4 col4"><input type="text" name="varient_3" class="form-mold " placeholder="Varient Name" autocomplete="off" value="'+x.pvN[2]+'"></div></div><div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">Chose a varient name. Out of three one name is required.</p></div></div></div>';


         ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label>Description</label> <textarea name="description" class="form-mold" rows="1" cols="30" placeholder="description" >'+x.des+'</textarea> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">description of product.</p></div></div></div>';
   var token='';
                    var suggestion = {
                        name: 'category',
                        fireAfter: 4,
                        type: 1,
                        token: 'chips',
                        placeholder: 'Select Category'
                    }; 
 for(var q in x.pC){
        token += '<div class="li"><div class="token"> <span>' + x.pC[q].cN + '</span> <span class="sclose s_tclose"></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.pC[q].cid}) + '\' > </div></div>';
  }
    token+='<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"   autocomplete="off"   ></div>';  

                 
                 

                 



        ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label>Select Category<i>*</i></label> <div class="form-token block" data-junction="categorysuggestionpC"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">Categories of product.</p></div></div></div>';
           W.U.JunctionAdd(W.A.page.AppId, 'categorysuggestionpC', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
                    }, suggestion);  

 var suggestion = {
                        name: 'searchword',
                        fireAfter: 4,
                        type: 3,
                        token: 'chips',
                        placeholder: 'Search Words'
                    }; 
                    token='';
 for(var q in x.sW){
        token += '<div class="li"><div class="token"> <span>' + x.sW[q]+ '</span> <span class="sclose s_tclose"></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:x.sW[q]}) + '\' > </div></div>';
  }
   token+='<div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';  
   ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label>Search Words</label> <div class="form-token block" data-junction="productsw"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div> <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">Comma separated list of words and word phrases about the product.</p></div></div></div>';//--
         W.U.JunctionAdd(W.A.page.AppId, 'productsw', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
                    }, suggestion);  
   
        ch += '</div>';
     ch += '<div class="block m_bTouch"></div>';
        ch += '</div>';
        return ch;
            };
var formLogic =function() {
     var rv = ['product_name', 'pid', 'sid', 'has_varient'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=4, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
 

   var category = Array(),searchword= [''],j=0,i=0;
        $(':hidden.tokenh_input').each(function () {
            if ($(this).attr('name') == 'category') {
              category[i]=W.F.JSONparse($(this).val(),{id:''})['id'];
                  i++;
            }
             if ($(this).attr('name') == 'searchword') {
            searchword[j]=W.F.JSONparse($(this).val(),{id:''})['id'];
                 j++;
            }

        });
   if (category.length == 0) { error++; alert_mes.push('<li> Select a category.</li>');  }

    W.U.extend(f_value, W.F.walk_way_all(['description','varient_1','varient_2','varient_3','keyfeature_0','keyfeature_1','keyfeature_2','keyfeature_3'], this.formname));

    if((f_value['varient_1']==''&&f_value['varient_2']==''&&f_value['varient_3']=='')&&f_value['has_varient']=='1'){
      error++; alert_mes.push('<li> Chose a varient  name.</li>');   
    }


  f_value['category']=category;
  f_value['searchword']=searchword;

    var AlertError = W.T.AlertError({message:alert_mes});

// console.log(f_value); console.log(error);console.log(AlertError);


      
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

    var ch ='<form name="product_one"  data-junction="product_one" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'product_one',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);  
                  }


   // console.log(this);
    return ch;
}
//-->>

   
   var Madian=function(x){
       var ch='';    
   var header= W.T.C.C3_subPageheader({Title: '<a href="'+W.U.URL('dashboard_products')+'" class="left"><h2 class="truncate title" >Products</h2><i class="badge _gbtn"></i> </a>'});
   var footer=W.T.Footer({});;
   //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 _B-gray  m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>';
 //-->>   
      ch+='<div class="block m_b10" data-nodeid="deshboardwalkway" >deshboardwalkway</div>';
    $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
        W.U.deshboard(x);
    });


      ch+= '<a href="javascript:void(0);"  data-learnmore="dashboard_products"  >Learn More</a>';


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
//-search
var search= W.T.C.C5_SearchDrawer();


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