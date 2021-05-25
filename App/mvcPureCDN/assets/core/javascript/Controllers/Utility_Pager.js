/*
* 
*/
; (function(W){
   "use strict";
   var bankpager=[];  var bankBlock=[];  var bankblockData=[]; 
   var TranseData={
          
                ifo: { },  //info
               bypass: 0,
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 3,  //pagesize
                tp: 1,  //total page
                tr: 1,  //total result
                pgd: 1   //paged
            };
   var blockDataDefault={
        name:'',
        htmlStr:'',
        parent:'',
        presention:'page',//page|model|drawerleft|drawerright|drawertop|drawerbottom|subpage
        TranseData: TranseData,
        EntrancesAnimation:'fadeIn',
        ExitAnimation:'',
        objectdata:{},// this data is used  as view for rander html in this block
        triggerdata:[],
        scrollTop:0,
        onRander: []//list of call back

    }

   var BACKDROP_BOCK={name:'backdrop',htmlStr:'<div class="hide"></div>'};
   function animationcss (t){
        
         return {'-webkit-animation-duration':t+'ms',
         '-webkit-animation-fill-mode':t+'ms',
            'animation-fill-mode':'both'
         }
     }
   var cssClasses={
    Modalroot:function(){
        return {
 'position' : 'fixed',
  'top': 0,
  'right': 0,
  'bottom': 0,
  'left': 0,
  'z-index': 1500,
  'display': 'block',
  'overflow': 'hidden',
 '-webkit-overflow-scrolling': 'touch',
  'outline': 0
};
    },
    Dialogview:function(){
          return {    
    'position': 'relative',
    'width': '75%',
   'maxWidth':540,
     'z-index': 1600,
    'margin': '0px auto', 
    'top': 164
    };
    },
   Modalview:function(){
          return {    
    'position': 'relative',
    'width': '75%',
   'maxWidth':1000,
     'z-index': 1600,
    'margin': '0px auto', 
    'top': 0
    };
    },
  backDrop:function(){
           return {  
  'position' : 'fixed',
  'top': 0,
  'right': 0,
  'bottom': 0,
  'left': 0,
  'z-index': 1000,
  'opacity':.5,
  'background-color'  : '#000'
  
  };
    }
}


   function blockDataDefault_Fn (){   return  W.U.clone(blockDataDefault);}
   function AddInBank(Name,Node,type){
     if(type=="pager"){
          
         bankpager[Name]=Node; 
     }
       if(type=="block"){//internal use 
         
       bankBlock[Name]=Node; 
     }
         if(type=="blockData"){
       
       bankblockData[Name]=Node; 
     }

 }
   function GetFromBank(Name,type){
     var Node=null;
   



       if(type=="pager"){
       if(typeof  bankpager[Name] != 'undefined'){
      Node=  bankpager[Name] ;
  }
     }
       if(type=="block"){
     if(typeof bankBlock[Name] != 'undefined'){
      Node= bankBlock[Name] ;
  }
     }

       if(type=="blockData"){
     if(typeof bankblockData[Name] != 'undefined'){
      Node= bankblockData[Name] ;
  }
     }
    return Node;
 }

 ////////////////////////////






 /////////////////

function Pager(Node,Options){




     function Handler(Node,Options){
      this.Node=Node;
      this.Options = W.U.extend(Handler.Defaults, Options);  
   
      var _this=this;
    
      
      for(var q in   this.Options.BlockList){
  
   

     this.Options.BlockList[q] = W.U.extend(blockDataDefault_Fn(),    this.Options.BlockList[q]);
  this.Options.BlockList[q].TranseData = W.U.extend(TranseData,  this.Options.BlockList[q].TranseData);   
            addblockdata(  this.Options.BlockList[q]);
      } 
       
   
      AddInBank(this.Options.name,this,"pager");
      this.initTemplate();
      //Name of the block that is in current focus
      this.CurrentActiveBlock=this.GetNextBlockName();   

      //Name of the current page that owning stack
      this.CurrentActivePage=this.GetNextBlockName();  

      // stack mantain the current page viewed block name in order to they activated
      // the stack empty we have to show current block
      this.stack=[];  

       setTimeout(this.init.bind(this),100);
        //W.U.console( this);
W.U.windowresize.Add(function(){
       var CBN=_this.GetNextBlockName();//CurrentBlockName
       var BlockData=getblockdata( CBN);
       if(W.U.isOK(BlockData)){
       var  Block =getBlock(BlockData.name);   
         W.U.medianStyleSetup(Block);  

         }
});

     }

     Handler.Defaults={
   name:'mainpage',
   target:'',
   BlockList:[blockDataDefault],
   onRander: function () { /* ////W.U.console(this) */},
   onRanderAddPage: function () { /* ////W.U.console(this) */}
 };

   Handler.prototype={
       
init:function(){
      this.ToggleBlock();//set by default page
     /* 
   var BlockName= GetBlockNameFromURL(this.Options.name);
   if(W.U.isOK(BlockName)){  
  // W.U.console(BlockName);
setTimeout(function(){  DirectPagerbtnOnclick(BlockName);},100);
   
       }*/
      
   setTimeout(function(){   GoToblockFromURL();},100);

     },
pagerbtnOnclick:function(value){
       this.Options.target=value;
          if(!W.U.browser.height_free){  
      this.SetBlockNameInURL(value);
      }
    
  
               this.ToggleBlock();
 
      


     },
PushInStack:function(data){
         
           this.stack.push();
            var match=0, matchIndex=0;
    for(var q in this.stack){
        if(this.stack[q].name==data.name){
             match=1;matchIndex=q;
        }
    }

    if(match==0){
         this.stack.push(data);
    }else{
             this.stack.splice(matchIndex,1);
              this.stack.push(data);
    }
    return  this.stack;

     },
ToggleBlock:function(){
            var blocksArr= this.Options.BlockList;var _this=this;
            
             var height =window.innerHeight;
         var CBN=this.GetNextBlockName();//CurrentBlockName
    
        var ActiveBlockData=getblockdata( this.CurrentActiveBlock);
       var NextBlockData=getblockdata( CBN);
       //W.U.browser.height_free

       if((NextBlockData.presention!='page')&&(W.U.browser.height_free)){
           NextBlockData.presention='page';
       }
    

///--next block correction 


       if(NextBlockData.presention=='page'){

//setting Some varible
 W.I.activeBlock=NextBlockData.name;

    if(this.stack.length>0){
         var index=this.stack.length-1;
   NextBlockData=getblockdata(this.stack[index].name);
    NextBlockData.presention=this.stack[index].presention;
// W.U.console(index);    W.U.console( this.stack);
     this.stack.splice(index,1);
         //W.U.console( this.stack);
     }

      
  

}
//W.U.console( NextBlockData);
///--next block correction 
        var  ActiveBlock =getBlock(ActiveBlockData.name);
       var  NextBlock =getBlock(NextBlockData.name);      



 
         switch(NextBlockData.presention){
    case 'model':

// animation zoomIn <> zoomOut
var modelroot=W.U('[data-dialog="root"]',NextBlock)[0];
var modelview=W.U('[data-dialog="view"]',NextBlock)[0];
var modelbackdrop=W.U('[data-dialog="backdrop"]',NextBlock)[0];
//W.U.console(modelroot);
//W.U.console(modelview);
//W.U.console(modelbackdrop);
$(NextBlock).removeClass('hide');
$(modelview).css(animationcss(200));


$(modelroot).css(cssClasses.Modalroot());
$(modelview).addClass('zoomIn').css(cssClasses.Modalview());
$(modelbackdrop).css(cssClasses.backDrop());

 this.PushInStack({name:NextBlockData.name,presention:'hidemodel'});


modelbackdrop.onclick=function(){
   
    _this.pagerbtnOnclick(ActiveBlockData.name);
}
break; 

    case 'hidemodel':
  
var modelroot=W.U('[data-dialog="root"]',NextBlock)[0];
var modelview=W.U('[data-dialog="view"]',NextBlock)[0];
var modelbackdrop=W.U('[data-dialog="backdrop"]',NextBlock)[0];
//W.U.console(modelroot);
//W.U.console(modelview);
//W.U.console(modelbackdrop);
$(modelview).removeClass('zoomIn').addClass('zoomOut'); 
 setTimeout(function(){
$(NextBlock).addClass('hide');
$(modelroot).removeAttr('style')

$(modelview).removeClass('zoomOut').removeAttr('style')
$(modelbackdrop).removeAttr('style')
    },200);


  NextBlockData.presention='model';//for next aaction
break; 
    case 'hidedialog':
  
var modelroot=W.U('[data-dialog="root"]',NextBlock)[0];
var modelview=W.U('[data-dialog="view"]',NextBlock)[0];
var modelbackdrop=W.U('[data-dialog="backdrop"]',NextBlock)[0];
//W.U.console(modelroot);
//W.U.console(modelview);
//W.U.console(modelbackdrop);
$(modelview).removeClass('zoomIn').addClass('zoomOut'); 
 setTimeout(function(){
$(NextBlock).addClass('hide');
$(modelroot).removeAttr('style')

$(modelview).removeClass('zoomOut').removeAttr('style')
$(modelbackdrop).removeAttr('style')
    },200);


  NextBlockData.presention='dialog';//for next aaction
break; 
    case 'dialog':
// animation zoomIn <> zoomOut
var modelroot=W.U('[data-dialog="root"]',NextBlock)[0];
var modelview=W.U('[data-dialog="view"]',NextBlock)[0];
var modelbackdrop=W.U('[data-dialog="backdrop"]',NextBlock)[0];
//W.U.console(modelroot);
//W.U.console(modelview);
//W.U.console(modelbackdrop);
$(NextBlock).removeClass('hide');
$(modelview).css(animationcss(200));


$(modelroot).css(cssClasses.Modalroot());
$(modelview).addClass('zoomIn').css(cssClasses.Dialogview());
$(modelbackdrop).css(cssClasses.backDrop());

 this.PushInStack({name:NextBlockData.name,presention:'hidedialog'});


modelbackdrop.onclick=function(){
   
    _this.pagerbtnOnclick(ActiveBlockData.name);
}
break; 
case 'drawerleft':
// animation | slideInLeft<>slideOutLeft
//pushing

var backdrop=W.U('[data-pager="backdrop"]',NextBlock)[0];
var view=W.U('[data-pager="view"]',NextBlock)[0];
$(NextBlock).removeClass('hide');
$(view).css(animationcss(400));
$(view).addClass('block po-ab slideInLeft ').css({'width':280,'z-index': 1500,'top': 0,'left':0});
$(backdrop).css(cssClasses.backDrop());

   backdrop.onclick=function(){
   
    _this.pagerbtnOnclick(ActiveBlockData.name);
}
  
    this.stack.push({name:NextBlockData.name,presention:'hidedrawerleft'});
   W.U.medianStyleSetup(NextBlock);

break;
case 'hidedrawerleft':
// animation | slideInLeft<>slideOutLeft
//pushing
var backdrop=W.U('[data-pager="backdrop"]',NextBlock)[0];
var view=W.U('[data-pager="view"]',NextBlock)[0];
  $(view).css(animationcss(400));
  $(view).removeClass('slideInLeft animated').addClass('slideOutLeft');  
  $(backdrop).removeAttr('style')
    setTimeout(function(){
        $(NextBlock).addClass('hide');
        $(view).removeClass('block po-ab slideOutLeft animated').removeAttr('style');  ;
    },400);
  NextBlockData.presention='drawerleft';//for next aaction
   
break;  
case 'drawertop':
// animation | slideInDown<>slideOutUp 
//pushing

var backdrop=W.U('[data-pager="backdrop"]',NextBlock)[0];
var view=W.U('[data-pager="view"]',NextBlock)[0];
$(NextBlock).removeClass('hide');
$(view).css(animationcss(400));
$(view).addClass('block po-ab slideInDown ').css({ 'width': '100%','z-index': 1500,'top': 0,'left':0});
$(backdrop).css(cssClasses.backDrop());

   backdrop.onclick=function(){
   
    _this.pagerbtnOnclick(ActiveBlockData.name);
}
  
    this.stack.push({name:NextBlockData.name,presention:'hidedrawertop'});
   W.U.medianStyleSetup(NextBlock);

break;
case 'hidedrawertop':
// animation | slideInDown<>slideOutUp 
//pushing
var backdrop=W.U('[data-pager="backdrop"]',NextBlock)[0];
var view=W.U('[data-pager="view"]',NextBlock)[0];
  $(view).css(animationcss(400));
  $(view).removeClass('slideInDown animated').addClass('slideOutUp ');  
  $(backdrop).removeAttr('style')
    setTimeout(function(){
        $(NextBlock).addClass('hide');
        $(view).removeClass('block po-ab slideOutUp  animated').removeAttr('style');  ;
    },400);
  NextBlockData.presention='drawertop';//for next aaction
   
break;    
case 'drawerright':
// animation | slideInRight <>slideOutRight
//pushing

var backdrop=W.U('[data-pager="backdrop"]',NextBlock)[0];
var view=W.U('[data-pager="view"]',NextBlock)[0];
$(NextBlock).removeClass('hide');
$(view).css(animationcss(400));
$(view).addClass('block po-ab slideInRight ').css({'width':280,'z-index': 1500,'top': 0,'right':0});
$(backdrop).css(cssClasses.backDrop());

   backdrop.onclick=function(){
   
    _this.pagerbtnOnclick(ActiveBlockData.name);
}
  
    this.stack.push({name:NextBlockData.name,presention:'hidedrawerright'});
   W.U.medianStyleSetup(NextBlock);

break;
case 'hidedrawerright':
// animation | slideInRight <>slideOutRight
//pushing
var backdrop=W.U('[data-pager="backdrop"]',NextBlock)[0];
var view=W.U('[data-pager="view"]',NextBlock)[0];
  $(view).css(animationcss(400));
  $(view).removeClass('slideInRight animated').addClass('slideOutRight');  
  $(backdrop).removeAttr('style')
    setTimeout(function(){
        $(NextBlock).addClass('hide');
        $(view).removeClass('block po-ab slideOutRight animated').removeAttr('style');  ;
    },400);
  NextBlockData.presention='drawerright';//for next aaction
   
break;
  
case 'drawerbottom':
// animation | slideInUp<>slideOutDown
//pushing

var backdrop=W.U('[data-pager="backdrop"]',NextBlock)[0];
var view=W.U('[data-pager="view"]',NextBlock)[0];
$(NextBlock).removeClass('hide');
$(view).css(animationcss(400));
$(view).addClass('block po-ab slideInUp ').css({'width': '100%','z-index': 1500,'left': 0,'bottom':0});
$(backdrop).css(cssClasses.backDrop());

   backdrop.onclick=function(){
   
    _this.pagerbtnOnclick(ActiveBlockData.name);
}
  
    this.stack.push({name:NextBlockData.name,presention:'hidedrawerbottom'});
   W.U.medianStyleSetup(NextBlock);

break;
case 'hidedrawerbottom':
// animation | slideInUp<>slideOutDown
//pushing
var backdrop=W.U('[data-pager="backdrop"]',NextBlock)[0];
var view=W.U('[data-pager="view"]',NextBlock)[0];
  $(view).css(animationcss(400));
  $(view).removeClass('slideInUp animated').addClass('slideOutDown');  
  $(backdrop).removeAttr('style')
    setTimeout(function(){
        $(NextBlock).addClass('hide');
        $(view).removeClass('block po-ab slideOutDown animated').removeAttr('style');  ;
    },400);
  NextBlockData.presention='drawerbottom';//for next aaction
   
break;   

//---

//---  
      case 'page':
     


      //hideing
             $(ActiveBlock).removeClass('block  '+ActiveBlockData.EntrancesAnimation).addClass('hide'+ActiveBlockData.ExitAnimation).removeAttr('style');
             

  this.updateBlockinBank(ActiveBlockData.name);  

      //showing

    $(NextBlock).addClass('block').removeClass('hide');  
        if(W.U.feature.supportCSS3){
                  $(NextBlock).addClass('fadeIn animated');        
   setTimeout(removeShowAnimation.bind({name:NextBlockData.name}),1000);
   

                                     } 
  this.updateBlockinBank(NextBlockData.name);

   W.U.medianStyleSetup(NextBlock);
          W.U.windowresize.Add(function(){
                 W.U.medianStyleSetup(NextBlock);
          });
// resize this block  name by ccbk call back over the time
// @call  W.U.ccbk.Run('resize_' );
 W.U.ccbk.Add('resize_'+NextBlockData.name,function(){    W.U.medianStyleSetup(NextBlock);  } );


    this.CurrentActiveBlock=NextBlockData.name;
    this.CurrentActivePage=NextBlockData.name;
       break;


   

         }


///////////////////////

    function removeShowAnimation(){
          var   block =getBlock(this.name);    
               $(block).removeClass('fadeIn animated');
              
            } 
    
  setTimeout(function(){  W.U.lazy_load(); },1000);

  // @call  W.U.ccbk.Run('onTogglePage_' );
   
 W.U.ccbk.Run(W.U.Page,'onTogglePage_'+NextBlockData.name,  NextBlockData );
 W.U.ccbk.Run(W.U.Page,'onHidePage_'+ActiveBlockData.name, ActiveBlockData );

     },
updateBlockinBank:function(blockdata){
         var index =0;   var blockName=  this.Options.BlockList;
           for(var q in  blockName){
            if(blockName[q].name==blockdata.name){
              index =q;
              break;  

            }
         }

      // W.U.console( this.Options.BlockList);
      
           AddInBank(blockdata.name,this.Node.childNodes[index],"block");

     },
GetNextBlockName:function(){
         var CurrentBlockName=this.Options.target;     
           var blocksArr= this.Options.BlockList;
          var blockName= [];

          for(var q in blocksArr){
              
     blockName[q]=blocksArr[q].name;
          }

     //W.U.console(blockName);
         if(blockName.indexOf(CurrentBlockName)<=0){
             CurrentBlockName=blockName[0];
         }
          
         return  CurrentBlockName;
     },
initTemplate:function(){
          var blocksArr= this.Options.BlockList;
        

         for(var q in  blocksArr){
             this.AddBlockItem(blocksArr[q],'init');
         }


     },
AddBlockItem:function(block,type,callback){
         callback=(W.U.isFunction(callback))?callback:W.U.noop;
         var _this=this;
         var HTMLBulider=block.htmlStr;
         var html=(W.U.isFunction(HTMLBulider))? HTMLBulider.call(this,block):HTMLBulider;
  
     var htmltoRander='<div class="hide"  >'+html+'</div>';
     if(
     block.presention=="drawerleft"||
     block.presention=="drawerright"||
     block.presention=="drawertop"||
     block.presention=="drawerbottom"
     ){//|model|dialog|drawerleft|drawerright|drawertop|drawerbottom
  htmltoRander='<div class="hide" ><div data-pager="view">'+html+'</div><div data-pager="backdrop"></div><div>';  
     }
   
     if( block.presention=="model"){
  htmltoRander='<div class="hide" ><div data-dialog="root"><div data-dialog="view">'+html+'</div><div data-dialog="backdrop"></div><div><div>';
     }

     var mainblock=W.U.Rander( htmltoRander);
 


      this.Options. onRanderAddPage.bind({mainblock:mainblock,_this:this,block:block})();
      this.Options.onRander.bind({mainblock:mainblock,_this:this,block:block})();
  
      BlockcallbackRun({mainblock:mainblock,_this:this, block: block});

      callback.bind({mainblock:mainblock,_this:this})();
        //W.U.console('type = '+type);
      switch(type){
        case 'update':
         var index =this.GetPageIndex(block.name); 
         var referenceNode= this.Node.childNodes[index];

 

 this.Node.replaceChild(mainblock[0], referenceNode);

        break;
  
        default:
         W.U.Setview(this.Node,mainblock,'append');  
      }

     
       

       this.updateBlockinBank(block);
           
     },
AddNewPage:function(block,callback){
             var BlockList=  this.Options.BlockList;    
            var IsNewBlock=true;
               var index =this.GetPageIndex(block.name); 

       for(var q in  BlockList){
            if(BlockList[q].name==block.name){
           IsNewBlock=false;
              break;  

            }
         }

         this.Options.BlockList[index]=block;
             
         this.Options.target=block.name;
          index =this.GetPageIndex(block.name); //cross check 
        
            if(IsNewBlock){
                   this.AddBlockItem(block,'init',callback);
            }else{
                    this.AddBlockItem(block,'update',callback);
            }
       


    this.SetBlockNameInURL(block.name);
            this.ToggleBlock();
            //updating
             //   AddInBank(this.Options.name,this,"pager");
     },
GetPageIndex:function(name){
          var BlockList=  this.Options.BlockList;
               var index =BlockList.length; 
           for(var q in  BlockList){
            if(BlockList[q].name==name){
              index =q;
              break;  

            }
         }

         return index;
     },
SetBlockNameInURL:function(value){
           var block =getblockdata(value);  
           var intent_id=0,intent_name='';
  if(W.U.isOK(block)){
 if( block.triggerdata.length==4){

     intent_id =W.U.intval(block.triggerdata[3]);
     intent_name=block.triggerdata[2];

 }
    SetBlockNameInURL(this.Options.name,value,intent_name,intent_id);
      }
}

   };



  





   






   
   



 new Handler(Node,Options);

}



/**


*/

function GoToblockFromURL (){
    var ret = W.U.ParseHref(location.href);  
 var p = W.U.isOK(ret.vars.p)?ret.vars.p:null;

 if(W.U.isOK(p)){
      var $href = p.split('-');var dotsplit = [];
     for (var p in $href) {
        if (/./.test($href[p])) {
                    dotsplit = $href[p].split('.');
                    if (dotsplit.length > 1) {//must have length==3
                     
                ParseForGoToBlock(dotsplit);




                    }
                  

                }
     } 
 }else{
      // ParseForGoToBlock(W.I.activePage, W.I.activeBlock);
         var _this=GetFromBank('mainpage','pager');
 
     
        if(_this!=null){
            
            _this.ToggleBlock();
        }


 }

}


/*
*@des set the active block name in url with base 64 
*/
function  SetBlockNameInURL(pager,BlockName,intent_name,intent_id){
     var usebase64=false;
     var ret = W.U.ParseHref(location.href);
     var newVars='';var new_p='',new_URL='';
  
for(var q in ret.vars){
    if(q!='p'){
        newVars+=q+'='+ret.vars[q];
    }else{
      var  p= (usebase64)? W.U.Encription.base64decode(ret.vars[q]):ret.vars[q]; 
    var $href = p.split('-');var dotsplit = [];
   var OneMatchForpager=false;
     for (var c in $href) {
       
        if (/./.test($href[c])) {
                    dotsplit = $href[c].split('.');
           
          
             if (dotsplit.length >= 2) {//must have length==3
                
                    if(dotsplit[0]==pager){
                         OneMatchForpager=true;
                      if(intent_name!=''&&W.U.isOK(intent_name)){
              new_p+= dotsplit[0]+'.'+BlockName+'.'+intent_name+'.'+intent_id;  
                      }else{
                new_p+= dotsplit[0]+'.'+BlockName;     
                      }
                  
                 
                    }else{
                  new_p+= $href[c];        
                    }

                    }

    new_p+=(  new_p!='')?'-':'';

                

                }
     }
    
 

                     if(!OneMatchForpager){ 
        new_p+=(  new_p!='')?'-':'';      
        if(intent_name!=''&&W.U.isOK(intent_name)){
              new_p+= pager+'.'+BlockName+'.'+intent_name+'.'+intent_id;  
                      }else{
                new_p+= pager+'.'+BlockName;     
                      }
                  }

 new_p= (usebase64)?W.U.Encription.base64encode(new_p):new_p; 
    }
}






if(new_p==''){
  var newblockstr=pager+'.'+BlockName ;
   new_p= (usebase64)? W.U.Encription.base64encode(newblockstr):newblockstr; 
}
//-------

if (/\?/.test(ret.href)) {
    var $href = ret.href.split('?');
   new_URL= $href[0];
 
}else if(ret.pathurl!=''){
    new_URL=ret.pathurl;
}else{
        var $href = ret.href.split('&');
   new_URL= $href[0];
   
}





for(var q in ret.vars){
    if(q!='p'){
  new_URL+=  '&'+q+'='+ret.vars[q]; 
    }

}

if ((/\?/.test(  new_URL))||(/\&/.test(  new_URL))) {
     new_URL+=  '&p='+new_p; 
}else{
     new_URL+=  '?p='+new_p; 
}


   
    if(W.U.feature.pushState){
//history.pushState('', "", new_URL); 
history.replaceState('', "", new_URL); 

//var numberOfEntries = window.history.length;
//debugger;
}

}

/*
*
*/
function BlockcallbackRun(x){
 var mainblock=x.mainblock;
 var _this=x._this;
 var block=x.block;
 
        var len =x.block.onRander.length,
    index = 0;

            for (; index < len; index++) {
      
           x.block.onRander[index].bind({mainblock:mainblock,_this:_this,block: x.block})();
            }   
}
//------
function getWrap(name){
    var _this=GetFromBank(name,'pager');

   return  _this.Node;
}

function getBlock(name){//internal use ony
 

   return  GetFromBank(name,'block');
}


function getblockdata(name){
      return  GetFromBank(name,'blockData');
}
//------
function addblockdata(blockdata){
blockdata = W.U.extend(blockDataDefault_Fn(),blockdata);  
 blockdata.TranseData = W.U.extend(TranseData,  blockdata.TranseData);  

AddInBank(blockdata.name,blockdata,"blockData");

    
}
function AddPage(name,block,callback){
      block = W.U.extend(blockDataDefault_Fn(),block);  
      block.TranseData = W.U.extend(TranseData,    block.TranseData);  

      var _this=GetFromBank(name,'pager');

      _this.AddNewPage(block,callback);
}
//------Load ing Data
function GetintentLoadData(pagerdata){
    var Data ={
        url:W.U.URL('ajax/f0/p0'),
        data:{form:'loadblockdata',f_value:{object:pagerdata[2],id:pagerdata[3]}},
   sucess:function(pagerdata,data){    if(data['state']==200){  if(W.U.ObjectLength(data['response'])>0){
       SaveintentLoadData(pagerdata,data['response']);

   }    } }

    };
 
    switch(pagerdata[2]){
      case 'learnmore':
    
    
       Data.url=W.C.Setting.docHELP;
       Data.data={
           wg:W.A.page.AcessData.visit_data.wg,
           AppId:pagerdata[3]
       };
        Data.sucess=function(pagerdata,data){     SaveintentLoadData(pagerdata,data); }
   
      
       break;
    }
    return Data;
}
function SaveintentLoadData(pagerdata,result){
   
    switch(pagerdata[2]){
      case 'learnmore':
     W.U.intentdata.add(pagerdata[2]+'.'+pagerdata[3],result);
    
        break;
    }
   
}


function LoadIntentData(pagerdata){
    var LoadData=GetintentLoadData(pagerdata);


      W.U.ajax({
                url:LoadData.url,
                data: LoadData.data,
                context: this,
                type: 'POST',
                beforeSend: function () {
           
                   W.U.madianLoading('show');
                  
                },
                success: function (data) {
                   W.U.madianLoading('hide');
                   W.U.console('success to load file '); 
                    
       
               LoadData.sucess(pagerdata,data);

               
     setPage(pagerdata);

                }

            });


function setPage(pagerdata){
          var blockdata= W.U.intentdata.get(pagerdata[2]+'.'+pagerdata[3]);
               var _this=GetFromBank(pagerdata[0],'pager');

            if(W.U.isOK(blockdata)){
              var block =getblockdata(pagerdata[1]);
                 if(W.U.isOK(block)){

                  block.objectdata=blockdata;
                  block.triggerdata=pagerdata;
                   AddPage(pagerdata[0],block);
                  _this.pagerbtnOnclick(pagerdata[1]);  
                  W.U.resize();  

                 }else{
                     W.F.Toast("text_242");
                     _this.pagerbtnOnclick(W.I.activeBlock);   
                 }
               
                  }else{
                       _this.pagerbtnOnclick(W.I.activeBlock);    
                  }
}



}

//------

/*
@private Parse for go to block
@ call 0  data-pagerbtn="`mainpage`:`blockName`"
@ call 1  data-pagerbtn="`mainpage`:`blockName`:'anydata'"
@ call 2  data-pagerbtn="`mainpage`:`blockName`:'intent_name':`intent_id`"
@ call 4  data-pagerbtn="`mainpage`:`blockName`:'intent_name':`intent_id`:`togglemethode`"
*/
function ParseForGoToBlock(data){
          var _this=GetFromBank(data[0],'pager');
 
     
        if(_this!=null){

            if(data.length==2){
                _this.pagerbtnOnclick(data[1]);  
            }else  if(data.length==3){
                 var block =getblockdata(data[1]);
                   if( W.U.isOK(block)){
                       block.triggerdata=data;
               AddPage(data[0],block);
                  _this.pagerbtnOnclick(data[1]);  
                   }else{
                 
               _this.pagerbtnOnclick(W.I.activeBlock);  
                   }
              

            }else{
            


     var blockdata= W.U.intentdata.get(data[2]+'.'+data[3]);

                if(blockdata==null){
                 
                 W.U.console('block data is null');
                 LoadIntentData(data);
                    
                }else{// we konow that this block data is already presesnted 
          
              var block =getblockdata(data[1]);
          
                 if( W.U.isOK(block)){
// look for any special data for toggling page
var toggleWay='';
    if(data.length==5){
    
       if(data[4]=='togglePage'||data[4]=='replacePage'){
             toggleWay=data[4]; 
       }
    }

    switch(toggleWay){
        case 'togglePage':
           block.objectdata=blockdata;
                  block.triggerdata=data;
       

    var blocksArr= _this.Options.BlockList;
          var blockName= [];

          for(var q in blocksArr){
              
     blockName[q]=blocksArr[q].name;
          }

  
         if(W.U.iskeyInArray(data[1],blockName)){

               togglePage(data[0],data[1]);
         }else{

          replacePage(data[0],data[1]);
         }

        break;

        default:
   block.objectdata=blockdata;
                  block.triggerdata=data;
                  AddPage(data[0],block);
                //  _this.pagerbtnOnclick(data[1]);  
                  W.U.resize();
    }
   


                  }else{
                 console.warn('Null block Data found For' );
                   W.U.console(data);
                 
                  }
                }


            }

         


        }

}


/* 
@pagerbtn structure
  pagerbtn "[pagername]:[blockname]:[objectname]:[objectId]:[action..n]"

*/
function pagerbtnOnclick(){
    var value=this.value;
          var data=value.split(':');
   
           ParseForGoToBlock(data);


}
//  W.U.Pager.togglePage('','');
function togglePage(pagername,goTopage,callback){
     var _this=GetFromBank(pagername,'pager');

       if(_this!=null){
          W.I.activePage=pagername;
         _this.pagerbtnOnclick(goTopage);  
       }
}
function replacePage(pagername,goTopage,callback){
 
     var _this=GetFromBank(pagername,'pager');

       if(_this!=null){
                  W.I.activePage=pagername;

           AddPage(pagername,getblockdata(goTopage),callback)
       }
}

//@ DirectInitPage
// show the newly added page with out need to open it from button click
// W.U.Pager.DirectInitPage('','');
function DirectInitPage(pagername,goTopage,callback){
   replacePage(pagername,goTopage,callback);
   togglePage(pagername,goTopage,callback)
}
//@ DirectPagerbtnOnclick
// get the behaveer of btn click
function DirectPagerbtnOnclick(value){
     pagerbtnOnclick.bind({value:value})();
}
// W.U.Pager.AddModal();
//@des AddModal to pager with run modal callback
function AddModal(args){
     var defaultArgs={
name:'testmodal',
 Tilte:'Tilte',
 msg:'Message',
 body:'Message',
actionbutton:[],
YesCallback:W.U.noop,
onRander:[]
 };
 args = W.U.extend(defaultArgs, args);    
 var ch=W.T.Dialog(args);


 

//@des this rander important modal callback 
// and sepretly rander blockdata onrander funtion in another callback
//--
// @this {mainblock:mainblock,_this:this}
function YesCallback(){
    var mainblock=this.mainblock;
 W.U.attrclick('[data-dialogbtn="yes"]', mainblock[0],args.YesCallback);


}
 args.onRander.push(YesCallback);

   W.U.Pager.addblockdata({ name:args.name, htmlStr:ch, presention:'dialog',onRander:args.onRander});
}
/*
*@description  first  Check that page is in dom or not
               than if it there than show it or
               add page than show it    
*/
function DirectTogglePage(pagername,goTopage,callback){
        var _this=GetFromBank(pagername,'pager');
      if(_this!=null){
      
        var blocksArr= _this.Options.BlockList;
          var blockName= [];

          for(var q in blocksArr){
              
     blockName[q]=blocksArr[q].name;
          }

  
         if(W.U.iskeyInArray(goTopage,blockName)){

               togglePage(pagername,goTopage,callback);
         }else{

          replacePage(pagername,goTopage,callback);
         }




       }
}
/*@description toggle the page form setview tab

*/
function SetViewDirectTogglePage(){
       var value=this.value;
         var data=value.split(':');
         var block =getblockdata(data[1]);
              if( W.U.isOK(block)){
                       block.triggerdata=data;
         DirectTogglePage(data[0],data[1]);


                   }
       
}
/*@description check  is add or not in block BlockList
@call  W.U.Pager.IspagerAdded();
*/
function IsblockAdded(pagername,goTopage){
       var _this=GetFromBank(pagername,'pager');
       var ret=false;
      if(_this!=null){
      
        var blocksArr= _this.Options.BlockList;
          var blockName= [];

          for(var q in blocksArr){
              
     blockName[q]=blocksArr[q].name;
          }


         if(W.U.iskeyInArray(goTopage,blockName)){
             ret=true;
              
         }
    

}
    return ret;
}
function IspagerAdded(pagername){
     var _this=GetFromBank(pagername,'pager');
       var ret=false;
      if(_this!=null){
              ret=true;
      } 
       return ret;
}
/*
@call   W.U.Pager.DeletePager();
*/
function DeletePager(pagername){
        AddInBank(pagername,null,"pager");
}
/*
*@call   W.U.Pager.DeleteBlock();
*/
function DeleteBlock(name){
    
AddInBank(name,null,"blockData");

}

   W.U.Pager={
Pager: Pager, 
togglePage: togglePage,  
replacePage: replacePage,      
getWrap:getWrap,
getblockdata:getblockdata,
addblockdata:addblockdata,
AddPage:AddPage,
DeletePager:DeletePager,
pagerbtnOnclick:pagerbtnOnclick,
AddModal:AddModal,
DirectPagerbtnOnclick:DirectPagerbtnOnclick,
DirectInitPage:DirectInitPage,
DirectTogglePage:DirectTogglePage,
SetViewDirectTogglePage:SetViewDirectTogglePage,
IsblockAdded:IsblockAdded,
IspagerAdded:IspagerAdded,
DeleteBlock:DeleteBlock,
ParseForGoToBlock:ParseForGoToBlock

   };

})(wowrol);
/*
//-- Flow 
1. addblockdata    
|->W.U.Pager.addblockdata
|->AddInBank      
     
2. DirectInitPage
|->W.U.Pager.DirectInitPage
|->replacePage
|->togglePage

3. replacePage
|->  replacePage
|->  AddPage

4. togglePage
|->  togglePage
|->  pagerbtnOnclick

5.pagerbtnOnclick
|->   _this.pagerbtnOnclick(data[1]);  || < AddPage > _this.pagerbtnOnclick(data[1])


*/

/*
===beahavior of presention
@Value page|model|drawerleft|drawerright|drawertop|drawerbottom|subpage

@beahavior 
page =get the full page beahavior
model = modal beahvior with width of 70% ,and return on parent page automatically
drawer = drawer beahvior with width of 70% ,and return on parent page automatically
subpage = ful page beahvior on mobile ,in web flaver modal behavior and return on parent page automatically


    
*/