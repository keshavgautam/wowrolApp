/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";

     function Load(){
         var form='getmaterial';
   var ParseHref= W.U.ParseHref(location.href);
      var   f_value=ParseHref.vars;
    //Seting lodding app
var page=W.U.defaultAppData({AppId:'getmaterial',AppTitle:'getmaterial'});
         W.U.console('Going to load file ');   W.U.console(f_value);
      
           

            var  formData = {
              form:form,
               f_value: f_value
            };
W.U.ajax({
                url: W.U.URL('staticHTML')+ 'Material/script.php',
                data: formData,
                context: this,
                type: 'POST',
                responseType:"script",
                iframeName:form,
                beforeSend: function () {
           
            
                  
                },
                success: function (data) {
                     W.U.console('success to load file ');   W.U.console(f_value);
        
   
   if(!AllowToload()){
      AfterScript ();  
   }else{
     
           W.U.ccbk.Add(W.U.Page,'materialpleaseinsert',function(Madian){
           
                  var   blockFront= W.T.wrap( W.T.Header.wellcome(),Madian,'');
  var BlockList=[];
BlockList.push({name:"blockFront",htmlStr:blockFront});
var setting ={
    name:'mainpage',
    BlockList:BlockList,
    target:0,
    page:true,
    minheight:'auto'
};
W.U.AddDom(W.U.Page,W.T.Pager(setting),'html');
           });
   }
          var __ = document.createElement("script");
        __.type = "text/javascript";
        __.innerHTML = data;
   document.querySelector("head").appendChild(__);

                }

            });

        function AfterScript (){
             W.U.ajax({
                url: W.U.URL('staticHTML')+ 'Material/get.php',
                data: formData,
                context: this,
                type: 'POST',
                responseType:"text",
                iframeName:form,
                beforeSend: function () {
          
            
                  
                },
                success: function (data) {
              
 var Landing=function(x){
       var ch ='';
      var header= W.T.Header.wellcome({});;
      var footer=W.T.Footer({});;

  
        ch+= W.T.wrap(header,data,footer);
     return  ch;
   }
     
        var newView=W.U.Rander(W.T.Pane(Landing(data)));   


        var AppData=W.U.defaultAppData({AppId:'getmaterial',AppTitle:'getmaterial'});
      
           W.U('#page').html(newView);
 W.U.medianStyleSetup(W.U.Page);
W.U.resize.bind(AppData)();
                }

            });   
         }

    
         function AllowToload(){
             var notallowed=["drawer.php","ToggleBlock.php","TabLayout.php","masker.php","contentEditable.php","table.php","TemplateSVG.php","Palette.php","collapse.php","carousel.php","carouseltab.php","spread-card.php","store-explore-menu.php","CheckInScreen.php","Bottom_fiexd_wrap.php","whirligig.php","Pager.php","Dialog.php","headers.php","Stepper.php","control_lists.php","KK_component.php","todo.php","todo0.1.php","date_time.php","kk_feature_0.php","kk_feature_1.php","welcome_page.php"];
            
          if(notallowed.indexOf(f_value['file']) >= 0 ){
              return true;
          }
         return false; 
         }

     }

   
   var Madian=function(x){
  Load();
     return 'sdfsd';
   }
   
    

   

  W.M[W.A.page.AppId]=  {
     
Madian:Madian

     };

 } )(wowrol);