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
         console.log('Going to load file ');   console.log(f_value);
      
           

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
                     console.log('success to load file ');   console.log(f_value);
                 var __ = document.createElement("script");
        __.type = "text/javascript";
        __.innerHTML = data;
   document.querySelector("head").appendChild(__);
   
   if(!AllowToload()){
      AfterScript ();  
   }
 

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
     
        var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(Landing(data))+'</div>');   
   

        var AppData=W.U.defaultAppData({AppId:'getmaterial',AppTitle:'getmaterial'});

           W.U('#page').html(newView);

W.U.resize.bind(AppData)();
                }

            });   
         }

    
         function AllowToload(){
             var notallowed=["drawer.php","ToggleBlock.php","TabLayout.php","masker.php","contentEditable.php","table.php","TemplateSVG.php","Palette.php","collapse.php","carousel.php","carouseltab.php","spread-card.php","store-explore-menu.php","CheckInScreen.php","Bottom_fiexd_wrap.php"];
            
          if(notallowed.indexOf(f_value['file']) >= 0 ){
              return true;
          }
         return false; 
         }

     }

   
   var Landing=function(x){
  Load();
     return 'sdfsd';
   }
   
    

   


     W.M.getmaterial=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };

 } )(wowrol);