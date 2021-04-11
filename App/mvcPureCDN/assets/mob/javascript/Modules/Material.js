/**
 * Material.js
 */
 ;(function () {
     "use strict";

     wowrol.Modules.Material = (function () {
             var URL= wowrol.Controllers.Utility.GetPageURL;
       var Utility=wowrol.Controllers.Utility;
        var Control=wowrol.Controllers;
           var URL= wowrol.Controllers.Utility.GetPageURL;
     var M= wowrol.Modules;
     var C=wowrol.Controllers;
     var U = C.Utility;
     var J = C.SetView.JunctionAdd;
    var P = wowrol.App.page.AppId;
 /**
  * @description  Component
  */
  var Component={
   ListCheckBox:function(){
       var ch='<div class="block _Bdy" data-junction=\'{"App":"'+wowrol.App.page.AppId+'","Name":"localizationlang"}\'   >wer</div>';
       /*console.log(JSON.stringify({name:'',
             values:['value1','value2'],
             valuesname:['value1name','value2name'],
             Selected:'value1',
             Class:'',
             Listid:''
             }))*/
       


 Control.SetView.JunctionAdd(wowrol.App.page.AppId,'localizationlang',function(){
//call back to biind Listcheckbox
       Control.fn.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name:"localization",values:["en","hi","pn"],valuesname:["English","Hindi","punjabi"],Selected:'en',Class:'',Listid:'lang',callback:function(){
this.ListCheckBox.loadingOn();

//out business area
      console.log('hi am in call back');
      alert('sdf');
//out business area  
//call back when item get click
//this call back return the selected value
this.ListCheckBox.Value.Selected=this.itemvalue;
  console.log(this);
this.ListCheckBox.init();
this.ListCheckBox.loadingOff();
//-- do not remove  it
  }}); 

       return ch;

   }   ,
   tab:function(){
          var ch='';
     var tabList=[];  var tabContent=[];
       var setting={OnlyList:false,
       data:{name:'demotab',
             activeIndex:0
            }
       };

       for(var q=0;q<62;q++){
      tabList[q]='<a href="javascript:void(0);"  role="tab" > <i class="material-icons">question_answer</i><span class="vl-sp">Tab '+q+'</span><i class="badge _gbtn">s</i></a>';   
       }
        for(var q=0;q<12;q++){
     tabContent[q]='<div role="tabpanel" class="tab-pane" >Tab  '+q+'</div>';   
       }


ch+=  wowrol.Modules.Main.TabLayout(tabList,tabContent,setting);

return ch;
   },

   ToggleBlock:function(){

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
  var   ActivityHeader=     wowrol.Modules.Main.ActivityHeader({
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

   var   ActivityHeader=     wowrol.Modules.Main.ActivityHeader({
    LeftButton:'<a href="javascript:void(0);" data-closebtn="'+setting.name+'" >'+C.fn.SVG('left',24,'#f1f5fc')+'</a>',
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



    ch+=  wowrol.Modules.Main.ToggleBlock(blockList, blockName,setting);
       return ch;
 
   },

   drawer:function(){
       var ch='';
var drawerContent={};
   drawerContent.left='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title left</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';
     drawerContent.top='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title top</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';

    drawerContent.bottom='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title bottom</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';

   drawerContent.right='<div class="block bg_4"> <div class="block _bdy"><span class="fw-b al-c">Title bottom</span></div><nav class="block ul hover bg_0"> <div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">question_answer</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "> <a class="block _bdy" href="javascript:void(0);" > <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div><div class="li _B-gray "><a class="block _bdy" href="javascript:void(0);"> <i class="material-icons">payment</i><span class="vl-sp">Cras justo odio</span></a></div></nav></div>';

   var setting={};
  setting.left={minWidth:240,Drawerheight:window.innerHeight};
   setting.right={minWidth:240,Drawerheight:window.innerHeight};
setting.top={minheight:240};
setting.bottom={minheight:240};
      var mainContent='<main class="block"> <div class="block _bdy">Main contain<button class="btn" data-of_2lBtn="demoleft" >data-of_2lBtn</button></div><div class="block _bdy"><button class="btn" data-of_2rbtn="demoleft" >data-of_2rbtn</button></div><div class="block _bdy"><button class="btn" data-of_2tbtn="demoleft" >data-of_2tbtn</button></div><div class="block _bdy"><button class="btn" data-of_2bbtn="demoleft" >data-of_2bbtn</button></div></main>';
   var args={setting:setting,name:'demoleft',Iswindow:true};
      ch+=  wowrol.Modules.Main.DrawerLayout( drawerContent, mainContent,args);
       return ch;
   },
   table:function(){
      var ch; 
      var tabledata={
          header:["name","parent",'date','product','order'],
          body:[{
    id: 'Steve Brown',
    name: 'Steve Brown',
    parent: 'Employed',
    date:'sdfsdf',
    product:'sdfsdf' ,
   order:'order'
  },
  { id: 'Steve Brown',
    name: 'Steve Brown',
    parent: 'Employed',
    date:'sdfsdf',
    product:'sdfsdf' ,
   order:'order'
  },],
  setting:{
     rowcheck:false,
     type:'category',
     name:'demotable'  
  },
  onedit:function(){
      console.log('i m  edited');

  },
  ondelete:function(){
      console.log('i m  ondelete');

  }
  }; 

       ch+='<div class="block _bdy bg_0 bs-2dp">'+wowrol.Modules.Main.Table(tabledata)+'</div>';

       return ch;
   },
   parseTime:function(){
       
var ch='';


  ch+='<div class="block _bdy bg_0 bs-2dp">';

  ch+='<div class="block _bdy bg_0 "><time datetime="2016-04-21 11:58:38">2016-04-21 11:58:38</time></div>';
   ch+='<div class="block _bdy bg_0 "><time datetime="'+ new Date().toDateString()+'"></time></div>';
   ch+='<div class="block _bdy bg_0 "><time datetime="'+ new Date().toISOString()+'"></time></div>';
   ch+='<div class="block _bdy bg_0 "><time datetime="'+ new Date().toLocaleDateString()+'"></time></div>';
   ch+='<div class="block _bdy bg_0 "><time datetime="'+ new Date().toLocaleString()+'"></time></div>';
   ch+='<div class="block _bdy bg_0 "><time datetime="'+ new Date().toString()+'"></time></div>';
   ch+='<div class="block _bdy bg_0 "><time datetime="'+ new Date().toTimeString()+'"></time></div>';
    ch+='<div class="block _bdy bg_0 "><time datetime="'+ new Date().getDate()+'"></time></div>';;
    ch+='<div class="block _bdy bg_0 "><span >new Date().toLocaleString()</span><span >'+ new Date().toLocaleString()+'</span></div>';
       ch+='<div class="block _bdy bg_0 "><span >future data </span><time datetime="2017-04-21 11:58:38"></time></div>';
              ch+='<div class="block _bdy bg_0 "><span >future data </span><time datetime="2016-09-21 11:58:38"></time></div>';
   ch+='<div class="block _bdy bg_0 "><span >future data </span><time datetime="2016-04-29 11:58:38"></time></div>';
    ch+='<div class="block _bdy bg_0 "><span >new Date().getUTCHours()</span><span >'+ new Date().getUTCHours()+'</span></div>';

    ch+='<div class="block _bdy bg_0 "><span >new Date().getHours()</span><span >'+ new Date().getHours()+'</span></div>';

  ch+='</div>';



       return ch;

   },
   readMore:function(){
   var ch='';    
   
  ch+='<div class="block _bdy bg_0 bs-2dp">';

  ch+='<div class="block _bdy bg_0 "><p>From this distant vantage point, the Earth might not seem of any particular interest. But for us, its different. Consider again that dot. Thats here. Thats home. Thats us. On it everyone you love, everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives. The aggregate of our joy and suffering, thousands of confident religions, ideologies, and economic doctrines, every hunter and forager, every hero and coward, every creator and destroyer of civilization, every king and peasant, every young couple in love, every mother and father, hopeful child, inventor and explorer, every teacher of morals, every corrupt politician, every "superstar," every "supreme leader," every saint and sinner in the history of our species lived there – on a mote of dust suspended in a sunbeam.</p></div>';
 

  ch+='</div>';



       return ch;
   },

   autosize:function(){
   var ch='';    
   
  ch+='<div class="block _bdy bg_0 bs-2dp">';

  ch+='<div class="block _bdy bg_0 "><textarea class="form-mold" placeholder="Try typing something..." ></textarea></div>';
 
    ch+='<div class="block _bdy bg_0 "><textarea class="form-mold" placeholder="Try typing something..."  style="max-height:250px;" ></textarea></div>';

  
  ch+='</div>';



       return ch;
   },
   masker:function(){
         var ch='';    
   
  ch+='<div class="block _bdy bg_0 bs-2dp">';

  var masker=[];
masker.push({data:{type:'Money',option:{}}});//Money
masker.push({data:{type:'Money',option:{zeroCents: true}}});//Money
masker.push({data:{type:'Money',option:{unit: '₹'}}});//Money
masker.push({data:{type:'Money',option:{suffixUnit: '₹'}}});//Money

masker.push({data:{type:'Number',option:{}}});// number



  for(var q in masker){
    ch+='<div class="block _bdy bg_0 "><div class="block form-piece"><label class="" for="sample1">'+masker[q].data.type+'</label><input class="form-mold" type="text" placeholder="'+masker[q].data.type+'"  data-junction=\'{"App":"' + P + '","Name":"masker'+q+'"}\' ></div></div>'; 
    
     J(P, 'masker'+q, function () {
                //call back to biind Listcheckbox
        Control.fn.masker.bind({ Node: this.Node, Value: this.data })();

            },masker[q].data);
       
  }

    

  
  ch+='</div>';



       return ch;

   }

  };

         return {
             t0:function(x){
                 var ch='';
              
                switch(x.Component){
           case 'ListCheckBox':
         
              ch+=Component.ListCheckBox(x);

           break;                    
            case 'drawer':
         
           ch+=Component.drawer(x);

           break; 
           case 'ToggleBlock':
         
           ch+=Component.ToggleBlock(x);

           break;
           case 'tab':
         
           ch+=Component.tab(x);

           break;
           case 'Table':
         
           ch+=Component.table(x);

           break;
          case 'ParseTime':
         
         ch+=Component.parseTime(x);

           break;
         case 'readMore':
        ch+=Component.readMore(x);
           break;
         case 'autosize':
        ch+=Component.autosize(x);
           break;
            case 'masker':
        ch+=Component.masker(x);
           break;
                }
             
               
               return  '<div id="median" data-appMedian="Ragister" class="block bg_13"> <div class="content"><!--start-->'+ch+' <!--end--></div>';  ; 
             }
         };

     })();


   




 } ());