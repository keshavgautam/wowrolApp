/*
* page set up 2
*/
; (function (W) {
    "use strict";


/**
* @description  generate the drawer layout
* @param  
*/

  function DrawerLayout(drawerContent,mainContent,args){
                 var ch='';
  ch+='<div class="block po-re ov-hi" data-junction="'+args.name+'drawer">';

  W.U.JunctionAdd(W.A.page.AppId,''+args.name+'drawer',function(){
    
     W.U.drawer.bind({Node:this.Node,Value:this.data})();
  },args);  

  if(typeof(args.setting.top)!="undefined"){
    ch+='<div class="block po-ab bg_0" style="display:none;" data-of_2t="'+args.name+'" >'+drawerContent.top+'</div>';   
   }
   if(typeof(args.setting.left)!="undefined"){
    ch+='<div class="block po-ab bg_0" style="display:none;"  data-of_2l="'+args.name+'">'+drawerContent.left+'</div>';   
   }
   ch+='<div class="block po-re "  data-of_2c="'+args.name+'" >'+mainContent+'</div>';
   if(typeof(args.setting.right)!="undefined"){
    ch+='<div class="block po-ab bg_0"  style="display:none;" data-of_2r="'+args.name+'" >'+drawerContent.right+'</div>';   
   }
   if(typeof(args.setting.bottom)!="undefined"){
    ch+='<div class="block po-ab bg_0" style="display:none;" data-of_2b="'+args.name+'" >'+drawerContent.bottom+'</div>';   
   }
 ch+=' <div class="hide" data-of_2bd="'+args.name+'"></div>';
  
       ch+='</div>';
         return ch;


       }

/**
* @description  generate the tab layout
* @param  
*/
function TabLayout(tabList,tabContent,setting){
var TabId=W.U.uId(),TabContentId=W.U.uId();



var TabLayout_setting={
 items:tabList,
 name:TabId,
 type:'tablist',
cssClass:setting.TabcssClass,
itemWidth :setting.itemWidth,
menuLinecolor:setting.menuLinecolor

};

var TabContent_setting={
     items:tabContent,
     name:TabContentId,
      type:'Carousel',
     ContainerSize :(W.U.isOK(setting.TabContent_ContainerSize))?setting.TabContent_ContainerSize: [$('#page').find('.main_pane ').width(),300],
      singleItem : true,
      pagination : false,
      control : false,
      cssClass:setting.TabContentcssClass    

};





     W.U.ccbk.Add(W.U.Page,'whirlgiggoingto'+TabId,function(index){
       
          W.U.WhirlgigUpdate(TabContentId,index);
     });

      W.U.ccbk.Add(W.U.Page,'whirlgiggoingto'+TabContentId,function(index){
           W.U.WhirlgigUpdate(TabId,index);
     });
 

  W.U.Junction('TabLayout_'+TabId, function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();
       
     }, TabLayout_setting);

  W.U.Junction('TabContent_'+TabContentId, function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();
       
     }, TabContent_setting);

var ch='<div class="block" >'; 

  if(setting.TabPlacement=="top"){
        ch += '<div class="block" data-junction="TabLayout_'+TabId+'" ></div>';
  ch += '<div class="block" data-junction="TabContent_'+TabContentId+'" ></div>';
  }else{
     
  ch += '<div class="block" data-junction="TabContent_'+TabContentId+'" ></div>';
   ch += '<div class="block" data-junction="TabLayout_'+TabId+'" ></div>';
  }
         ch+='</div>';
return ch;
} 


function CarouselLayout(tabList,setting){
    var ch=''; 
ch+='<div class="block "   style="opacity: 0;"   data-junction="'+setting.data.name+'tab"  data-nodeid="carousel.'+setting.data.name+'" >'; 
W.U.JunctionAdd(W.A.page.AppId,''+setting.data.name+'tab',function(){
 
      W.U.Carousel.bind({Node:this.Node,Value:this.data})();
  },setting.data);  
ch+='<div class="block  po-re ov-hi '+setting.ulWrapClass+'" ><div class="po-re" ><div data-menulinecon="'+setting.data.name+'" style="position: absolute;top: 0px;left: 0px;width: 0px; height: 3px;z-index: 1; background-color: #fff;-webkit-transition: all 0.25s ease-out;-moz-transition: all 0.25s ease-out;-ms-transition: all 0.25s ease-out;-o-transition: all 0.25s ease-out;transition: all 0.25s ease-out;"></div></div><div class="block ul ul-menu '+setting.ulClass+'" data-tabcontainer="'+setting.data.name+'" >'; 
for( var q in tabList){
    
ch+='<div class="li '+setting.tabLiClass+'">'+tabList[q]+'</div>'; 


}

ch+='</div></div>'; 



ch+='</div>'; 

return  ch;
          }

function CarouselTabLayout(tabList,tabContent,tabsetting,tabContentsetting){
var ch=''; 
var CarouselTabId= 'CarouselTabId'+W.U.uId();
ch+='<div class="block ">'; 

if(tabList.length==tabContent.length){
ch+=CarouselLayout(tabList,tabsetting); 
ch+=CarouselLayout(tabContent,tabContentsetting);   
var checkInterval=  setInterval(bindTab, 200);
var tries=0;



  

}else{
    console.warn('Tab List are not equal');
}

function bindTab(){

      if(W.U.id('carousel.'+tabsetting.data.name)!=null&&W.U.id('carousel.'+tabContentsetting.data.name)!=null){
            clearInterval(checkInterval ); 


           $(W.U.id('carousel.'+tabsetting.data.name)).on('updaten',function(e){
             
     var value=e.activeIndex;  
          var event = jQuery.Event('updateouter');
                event.activeIndex = value;  
  $(W.U.id('carousel.'+tabContentsetting.data.name)).triggerHandler(event);
 });

  $(W.U.id('carousel.'+tabContentsetting.data.name)).on('updaten',function(e){
     var value=e.activeIndex;
          var event = jQuery.Event('updateouter');
                event.activeIndex = value;
  $(W.U.id('carousel.'+tabsetting.data.name)).triggerHandler(event);
 });     
      }
      tries++;  
      if(tries>100){
             clearInterval(checkInterval ); 
console.warn('Tab enent are bined');
      }else{
          console.warn('Tab List checking');
      }

     }

ch+='</div>'; 



return ch;
} 

/**
* @description  generate the tab layout
* @param  
*/
function ToggleBlock(blockList, blockName,setting){
    
     var ch='';
   

if(typeof(blockList)=='object'){

    ch+='<div class="block " data-junction="'+setting.name+'tb" >';

     W.U.JunctionAdd(W.A.page.AppId,''+setting.name+'tb',function(){
    
       W.U.ToggleBlock.bind({Node:this.Node,Value:this.data})();
  },setting);  
    for(var i=0;i<blockList.length;i++){
        if(i==0){
    ch+='<div class="block  " data-blockname="'+blockName[i]+'" data-nodeid="block.'+blockName[i]+'" >'   ;  
    ch+=blockList[i];   
     ch+='</div>';   
        }else{
       ch+='<div class="block  " data-blockname="'+blockName[i]+'" style="display:none;" data-nodeid="block.'+blockName[i]+'">';  
       ch+=blockList[i];    
       ch+='</div>'; 

        }



    }

    ch+='</div>'; 
    }

     
    return ch;
}

/**
* @description  generate the form header
* @param  
*/
function Table(x){
     var ch='';
       ch+='<div class="block " data-junction="'+x.setting.name+'table"  data-nodeid="'+x.setting.name+'table" >';
  W.U.JunctionAdd(W.A.page.AppId,x.setting.name+'table',function(){
    
    W.U.Table.bind({Node:this.Node,Value:this.data})();
  },x);  
         ch+='</div>'; 

      return ch;
}



/**
* @description  BottomFixWrap
* @param  
*/

function BottomFixWrap(top,mid,foot,ID,margintop){
   var ch='';
    var  TopRow=(top =="")?'':'<div class="block po-re top_fix" data-block="top" >'+top+'</div>';
   ID=(typeof ID == 'undefined' )?'page':ID;
  margintop=(typeof margintop == 'undefined' )?0:margintop;
  W.U.intentdata.add('bottomfixwrap.'+ID,{margintop:margintop});
   ch+='<div class="block " style="opacity: 0;" data-bottomfixwrap="'+ID+'" data-nodeid="bottomfixwrap.'+ID+'" >';
   ch+= TopRow;
   ch+='<div class="block" data-block="mid" ><div class="block po-ab"  data-loading="median" style="display:none;" ></div><div class="block">'+mid+'</div></div>';
 
    
   ch+='<div class="block" data-block="foot" >'+foot+'</div>';
   ch+='</div>';
   return ch; 
}


/**
* @description  pager
* @param  
*/

function Pager(setting){
     var ch='';
     ch+='<div class="block " data-junction="'+setting.name+'pager" ></div>';
     
     W.U.JunctionAdd(W.A.page.AppId,''+setting.name+'pager',function(){
    
      W.U.Pager.Pager(this.Node,this.data);
  },setting);  

  return ch;
}


function AlertSuccess(x) {

        var ch = '<div class="alert success" ><strong class="fw-b">' + x.heading + '</strong><ul class="ul">' + x.message + ' </ul></div>';

        return ch;


    }
function AlertError(x) {
var error=x.message.length;
var alert_h = ( (error) == 1) ? 'There is an  error.' : 'There are ' +  error + ' errors.';
var message='';

for(var q in x.message){
    message+='<li>'+x.message[q]+'</li>';
}
var ch = '<div class="alert error" ><strong class="fw-b">' + alert_h + '</strong><ul class="ul">' +message + ' </ul></div>';

        return ch;


    }
function DummyDiv(x){
var bg=['#FFEB3B','#4efaaf',' #FFECB3',' #0094ff',' #ff00dc',' #ff006e'];
var bg_color = bg[Math.floor(Math.random()*bg.length)];
   var ch='<div class="block al-c " style="height:220px;  background:'+W.U.RandomBGColor() +';"><h1 class="m30_0">'+W.U.uId()+'</h1><h1 class="">'+x+'</h1></div>';
   
   return ch; 
}

function Dialog(args){
 var defaultArgs={Tilte:'Tilte',
 msg:'Message',
 body:'Message',
actionbutton:[]
 };
  args = W.U.extend(defaultArgs, args);    
function defaultbutton(){
     var btn={text:'',name:'',onclick:W.U.noop,isLink:false,cssClass:'',attrStr:'',href:'javascript:void(0);',Callback:W.U.noop};
    return  W.U.clone(btn);
};


 var body='';
 if( W.U.isFunction(args.body)){
     body= '<div class="block li _Bdy bg_0 fg_4 ff_1 fs16">'+args.body()+' </div>';  

 }else{
   body= '<div class="block li _Bdy bg_0 fg_4 ff_1 fs16">'+args.body+' </div>';  
 }
 var button='';var actionbutton=args.actionbutton;
  for (var i = 0; i < actionbutton.length; i++) {
    actionbutton[i] = W.U.extend(defaultbutton(), actionbutton[i]);      
 button += '<div class=" li"><a href="javascript:void(0);" class=" flatbtn '+actionbutton[i].cssClass+'" '+actionbutton[i].attrStr+' data-dialogbtn="'+actionbutton[i].name+'" >'+actionbutton[i].text+'</a></div>';
            }


 var ch='<div class="block bg_0 bs-0">';
 ch+='<div class="block ul ">';
 ch+=' <div class="block li _Bdy b_gbl fs22 ff_3">'+args.Tilte+' </div>';
 ch+=body;
 ch+='</div>';

 ch+='<div class="block _bdy"> <div class=" right">';
 ch+='<div class="block ul ul-menu"> '+button+'</div>';

 ch+='</div></div>';
 ch+='</div>';
 var Modal='<div data-dialog="root"><div data-dialog="view">'+ch+'</div><div data-dialog="backdrop"></div><div>';

 return Modal;
 }


  W.T.Dialog = Dialog;
  W.T.DummyDiv = DummyDiv;
  W.T.DrawerLayout = DrawerLayout;
  W.T.CarouselLayout = CarouselLayout;
  W.T.CarouselTabLayout = CarouselTabLayout;
  W.T.TabLayout = TabLayout;
  W.T.ToggleBlock = ToggleBlock;
  W.T.Table = Table;
 
  W.T.BottomFixWrap = BottomFixWrap;
  W.T.AlertSuccess =  AlertSuccess;
  W.T.AlertError =  AlertError;
  W.T.Pager =  Pager;
})(wowrol);