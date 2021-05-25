/*
* 
*/
; (function(W){
   "use strict";
   


   function  ProfileProgrss(total,score){
       var ch='';
       var Progress=W.U.positive((score/total)*100);
       ch+='<div class="block "   > <div class="block _bdy ff_5"><span>text_276</span></div><div class="progress" > <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: '+Progress+'%;">'+Progress+'%</div> </div></div>';
       return ch;
   }

 


//--------------------
   function init(Node){
    function Handler(Node){
     var AppView= W.A.page.AppView;
        this.Node=Node;
        this.entity_type=AppView.EntityStripdata.type;
        this.PCC =AppView.PCC ;
        this.init();

    }  
       
    Handler.prototype={
        init:function(){

            switch(this.entity_type){
            case 0:
            this. buyerinit();
            break;
            case 1:
            this.storeinit();
            break;

            }



              },
         buyerinit:function(){
      var SettingLink=[]; var total=4,score=0;
   if(this.PCC.profile_pic==0){
     
SettingLink.push({ItemType:'link',ItemData:{href:'setting_buyer',text:'text_254',icon:'',help:'text_272'} });  

         }else{   score++;}
   if(this.PCC.profile_banner==0){
        
SettingLink.push({ItemType:'link',ItemData:{href:'setting_buyer',text:'text_255',icon:'',help:'text_273'} });  

         }else{   score++;}
   if(this.PCC.address==0){
        

SettingLink.push({ItemType:'link',ItemData:{href:'setting_buyer?p=mainpage.StoreaddressPage.setting.1',text:'text_279',icon:'',help:'help_14'} });  

         }else{   score++;}
   if(this.PCC.favoritestore_count<10){
        
SettingLink.push({ItemType:'link',ItemData:{href:'market',text:'text_274',icon:'',help:'text_275'} });  

          }else{   score++;}
         

SettingLink.push({ItemType:'html',ItemData:{bodyhtml:ProfileProgrss(total,score)},secondaryaction:{href:'market',text:'text_274',icon:'',help:'text_275'} } );  
if(total!=score){
      var ch='';
            ch+='<div class="block bs-1 m_b5">';
     ch+='<div class="block _Bdy bg_6 bs-1-bottom "><h3>text_253</h3></div >';
     ch+=W.U.CreateList(SettingLink);
       ch+='</div >';

   W.U.AttachDom(this.Node,ch,'html',function(){
             

         });  
}
       


         },
         storeinit:function(){
               var SettingLink=[];var total=6,score=0;

    
        if(this.PCC.address==0){
          //  Task('task_0',this.Node);

SettingLink.push({ItemType:'link',ItemData:{href:'store_settings?p=mainpage.StoreaddressPage.setting.1',text:'text_243',icon:'',help:'help_14'} });  

            }else{   score++;}
        
 if(this.PCC.category_count==0){
      

SettingLink.push({ItemType:'link',ItemData:{href:'dashboard_categories',text:'text_244',icon:'',help:'text_245'} });  

         }else{   score++;}
 if(this.PCC.product_count==0){
      

SettingLink.push({ItemType:'link',ItemData:{href:'dashboard_products',text:'text_248',icon:'',help:'text_249'} });  

              }else{   score++;}

 if(this.PCC.menu_set==0){
        

SettingLink.push({ItemType:'link',ItemData:{href:'dashboard_menu',text:'text_247',icon:'',help:'text_246'} });  

          }else{   score++;}
       if(this.PCC.slider==0){
          //  Task('task_0',this.Node);

SettingLink.push({ItemType:'link',ItemData:{href:'dashboard_frontpage',text:'text_87',icon:'',help:'text_250'} });  

              }else{   score++;}
    if(this.PCC.profile_pic==0){
          //  Task('task_0',this.Node);

SettingLink.push({ItemType:'link',ItemData:{href:'store_settings',text:'text_251',icon:'',help:'text_252'} });  

            }else{   score++;}



if(SettingLink.length>0){
     SettingLink.push({ItemType:'html',ItemData:{bodyhtml:ProfileProgrss(total,score)}} );  

          

       if(total!=score){
         var ch='';
            ch+='<div class="block bs-1 m_b5">';
     ch+='<div class="block _Bdy bg_6 bs-1-bottom "><h3>text_253 </h3></div >';
     ch+=W.U.CreateList(SettingLink);
     
       ch+='</div >';

   W.U.AttachDom(this.Node,ch,'html',function(){
             

         });  

         }
  }

         }



    };

    new Handler(Node);
   }


   W.U.ProfileCheckWizard={
    init:init   

   };
   })(wowrol);