

  ; (function(W){
   "use strict";
 
 

  
      var ch='';
var count=6;
var setting ={
    name:'test',
    target:0,
    page:true,
    minheight:'auto'
};
var blockList=[];var blockName=[];
//-- frount block
  var   ActivityHeader=    W.T.ActivityHeader({
    LeftButton:'<a href="javascript:void(0);"  ><i class="material-icons">mode_edit</i></a>',
    Title:'<a class="truncate" href="javascript:void(0);" ><h2 class="left"  title="Block ">Block </h2></a>',
    RightLink:'<div class="li "><a href="javascript:void(0);"  ><i class="material-icons">&#xE876;</i></a></div>',
    dropdown:Array()
    });


   
var blockFront=ActivityHeader;
 blockFront+='<div class="ul _Bdy" >'; 
  for(var i=1;i<count;i++){//must start with one
     
     blockFront+='<div class="block li " ><div class="block _Bdy al-c" ><button class="btn" data-openbtn="'+setting.name+'" data-btnid="'+i+'"    > Block '+i+'</button></div></div>'; 

  }

      blockFront+='</div  >'; 
//--
      for(var i=0;i<count;i++){

   var   ActivityHeader=     W.T.ActivityHeader({
    LeftButton:'<a href="javascript:void(0);" data-closebtn="'+setting.name+'" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a class="truncate" href="javascript:void(0);" ><h2 class="left"  title="Block '+i+'">Block '+i+'</h2></a>',
    RightLink:'<div class="li "><a href="javascript:void(0);"  ><i class="material-icons">&#xE876;</i></a></div>',
    dropdown:Array()
    });




          
             if(i==0){
               blockList[i]=   blockFront; 
               blockName[i]=i;
             }else{
               blockList[i]=ActivityHeader+'<div class="block " style="background:#f4f4f4; height:300px;"><div class="block B_dy" ><p class="al-c"> Block '+i+'<p></div></div>'; 
                 blockName[i]=i;   
             }    
          }



    ch+=   W.T.ToggleBlock(blockList, blockName,setting);


       var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>');   
   



           W.U('#page').html(newView);


})(wowrol);