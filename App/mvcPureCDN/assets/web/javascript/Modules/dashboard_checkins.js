/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";
  
//-->>

  //== 
   var Madian=function(x){
       var ch='';

   //--EntityStrip datab
      
    
 //-->>   
      ch+='<div class="block m_b10 _bdy" data-nodeid="deshboardwalkway" >deshboardwalkway</div>';
   W.U.ccbk.Add('pageloaded',function(){
        // Always call inside from function 
      
       W.U.dashbordCheckins.init(W.U.id('deshboardwalkway'));
    });


    ch+= '<a href="javascript:void(0);" data-learnmore="'+ W.A.page.AppId +'" >Learn More</a>';


        return ch;
   }
   
    
     
   
    


   
     W.M[W.A.page.AppId]=  {
       Madian:Madian
     };

  

 } )(wowrol);