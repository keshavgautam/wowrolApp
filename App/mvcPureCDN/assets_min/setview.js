/*
* page set up 2
*/
; (function(W){
   "use strict";
  var cache={};

var EventArr=['data-junction','data-nodeid','data-nodeall','data-learnmore','data-collapse','data-bottomfixwrap','data-spreadnodeid','data-commentnodeid','data-fixedupdateragister','data-panalswitchbtn','data-toggle','data-pagerbtn','data-pagertogglepage','data-location','data-selectbox','data-masker','data-kkcomponent','data-kkcomponentwithrender','data-dynamicspotmanager','data-css'];    
var NodeNameList=['TEXTAREA','A','TIME','P','INPUT'];

/**
* @description  remove event attribute
* @return   Return the appLiveDom
*/  
function bindNode(Node){
      var   dataAttrsToDelete = [];
      if(typeof(Node)!="undefined"){
       for (var i = 0; i < Node.length; i++) {

        var   dataAttrs =Node[i].attributes;
      
          if(W.U.isOK(dataAttrs)){
           for (var a=0; a<dataAttrs.length; a++) {
      
        if(W.U.isOK(dataAttrs[a])){
            if ( EventArr.indexOf(dataAttrs[a].name)>=0|| W.U.iskeyInArray(dataAttrs[a].name,DirectiveNameArr) ) {
      

//first serrch in directive 
       var DirectiveFn = Directive[dataAttrs[a].name];
               if(W.U.isFunction(DirectiveFn)){
                   DirectiveFn(Node[i],dataAttrs[a].value); 
               }


            switch(dataAttrs[a].name){
        case 'data-junction':
      JunctionProcess.bind({Node:Node[i],Value:dataAttrs[a].value})();

             break;
       case 'data-spreadnodeid':
        W.U.Spread.spreadNode[dataAttrs[a].value]=Node[i];
          break;
   case 'data-commentnodeid':
       W.U.SpreadComment.spreadCommentNode[dataAttrs[a].value]=Node[i];
          break;
         case 'data-nodeid':
        W.U.dom[dataAttrs[a].value]=Node[i];
          break;
          case 'data-nodeall':
      
       nodeAll(dataAttrs[a].value,Node[i]);
          break;
          case 'data-learnmore':
      
   W.U.LearnMore.bind({Node:Node[i],docId:dataAttrs[a].value})();
         break;
          case 'data-collapse':
      
   W.U.collapse(Node[i],dataAttrs[a].value);
          break;

  case 'data-bottomfixwrap':
   
W.U.bottomfixwrap(Node[i],dataAttrs[a].value);
  break;
  case 'data-fixedupdateragister':
   
W.U.FixedUpdateRagister(Node[i],dataAttrs[a].value);
  break;
  case 'data-panalswitchbtn':
Node[i].onclick=W.U.PanalSwitch.bind({value:dataAttrs[a].value});
;
  break;

  
    case 'data-toggle':
    W.U.toggle(Node[i],dataAttrs[a].value);

  break;
       case 'data-pagerbtn':
      
     
      Node[i].onclick= W.U.Pager.pagerbtnOnclick.bind({value:dataAttrs[a].value});

          break;
  case 'data-pagertogglepage':
Node[i].onclick=W.U.Pager.SetViewDirectTogglePage.bind({value:dataAttrs[a].value});
;
  break;
          case'data-location':
            W.U.location.init(Node[i],dataAttrs[a].value);
          break;
             case 'data-selectbox':
      
 W.U.selectbox.init(Node[i],dataAttrs[a].value);
          break; 
              case 'data-masker':
      
W.U.m_masker.init(Node[i],dataAttrs[a].value);
          break;   
          
              case 'data-kkcomponent':
       KKJunctionProcess.bind({Node:Node[i],Value:dataAttrs[a].value})(0);

          break;
           case 'data-kkcomponentwithrender':
       KKJunctionProcess.bind({Node:Node[i],Value:dataAttrs[a].value})(1);

          break;   
          case 'data-dynamicspotmanager':
          W.U.DSM.init(Node[i],dataAttrs[a].value);
          break;
            case 'data-css':
        W.U.brain.CssApply(Node[i],dataAttrs[a].value);
          break;


            }
       

 dataAttrsToDelete.push(dataAttrs[a].name);
          
          
             
       }
      
  
       
   
      
       }

     
      

    }
     }
   

      for(var q in dataAttrsToDelete){
    
       if(Node[i].nodeType!=3){

          Node[i].removeAttribute(dataAttrsToDelete[q]);   
       }
   
     }


      //--work on nodename
       
  
    var NodeName=Node[i].nodeName;
      if(NodeNameList.indexOf(NodeName)>=0 ){
          
         switch(NodeName){
        case'A':
           W.U.ToggleView.bind(Node[i])(); 
            break;
           case'TEXTAREA':
       W.U.textareaTransform(Node[i]);
     //     W.U.autosize(Node[i]); 
            break; 
             case'TIME':
             
         W.U.parseTimeNode(Node[i]);  
            break;
            case'P':
             
      W.U.readMore.bind(Node[i])();  
            break;
   
         
         } 
      }

     //--work on nodename
          if (Node[i].hasChildNodes()) {


           bindNode(Node[i].children);
            }

      }
      }

     return Node;
}

/**
* @description  JunctionProcess
* @return   Return the appLiveDom
*/  
function JunctionProcess(){
    var name=this.Value;
 
  
    var JunctionData = W.J[name];
 
  
   if(typeof(JunctionData)!='undefined'){
 JunctionData.callback.bind({data:JunctionData.data,Node:this.Node})();

   // delete(App.Junction[name]);produce a bugs in store menu
   }else{
       console.warn(' Junction Data Not found for '+name+' In app ');
   }
     
}
/**
* @description  JunctionAdd
* @return   
*/  
function JunctionAdd(AppId,name,callback,data){

      W.J[name]={callback:callback,data:data};
}
/**
* @description  JunctionAdd
* @return   
*/  
function Junction(name,callback,data){

      W.J[name]={callback:callback,data:data};
}

/**
* @call  W.U.J();
* @description  JunctionAdd
* @return   
*/  
function JunctionSamrt(callback,data){
    var name=W.U.uId(); 
      W.J[name]={callback:callback,data:data};
      return name;
}

/**
* @description  JunctionProcess
* @return   Return the appLiveDom
*/  
function KKJunctionProcess(isRander){
    var name=this.Value;
 var Rander=this.Node.innerHTML;
   

  
    var JunctionData =  W.KKJ[name];
 
  
   if(W.U.isOK(JunctionData)){
 //JunctionData.callback.bind({data:JunctionData.data,Node:this.Node})();

  if(isRander==0){
     JunctionData.render=function(){ return Rander;}    
    }
   W.KK.InsertComponent(this.Node,W.KK.createModule(JunctionData),'html');

   }else{
       console.warn('KK Junction Data Not found for '+name+' In app ');
   }
     
}
/**
* @call  W.U.KKJunction();
* @description  JunctionAdd
* @return   
*/  
function KKJunction(name,data){

         W.KKJ[name]=data;
}
/**
* @call  W.U.KKJ();
* @description  bind kk component by junction
* @return   
*/
function KKJunctionSamrt(data){
    var name=W.U.uId(); 
      W.KKJ[name]=data;
      return name;
}

/**
* @description 
* @return   
*/
function nodeAll(name,Node){
   

  if (  W.U.domall.hasOwnProperty(name)) {
     W.U.domall[name].push(Node); 

    }else{
       W.U.domall[name]=[Node]; 
    }
}

/**
* @description  remove event attribute
* @return   Return the appLiveDom
*/  
function localization(Node){
    var NodeName=['div','span',''];

   if(typeof W.L != 'undefined'){
  var langArr=W.L.str;
  if( W.U.isOK(langArr)){
 /* for(var q in LangArr){
    var p=q.toLowerCase();
  langArr[q]=LangArr[q];
  }
  */
  
 
 for (var i = 0; i < Node.length; i++) {
     
  
     if(Node[i].nodeType==3){
      
        var text=$.trim(Node[i].textContent);
   //  text = text.toLowerCase();
        if (W.U.isOK(langArr[text])) {
           //  Node[i].textContent=langArr[text].toLowerCase();
          Node[i].textContent=langArr[text];  
         }
     }
  


     //--work on nodename
          if (Node[i].hasChildNodes()) {


         localization(Node[i].childNodes);
            }

 }

  }else{
     // debugger;
  }
  }



     return Node;
}

/**
* @description  remove event attribute
* @return   Return the appLiveDom
*/ 


  W.U.Rander=function(html){
      
 var Node=   W.U.fn.ParseHTML(html).childNodes;
  
 
 return localization(bindNode(Node));
  }



  


  function SetAppView(AppData){

  var AppPot= W.U.Page;

  W.I.pageInitID= W.U.uId();

  W.A[AppData.AppId]=AppData;     
   
    document.title=  AppData.AppTitle;
    W.U.dom={};    W.U.domall={}; 
      SaveView(AppData.AppSlug,AppData.AppView,AppData.AppId);
   

 W.U.ccbk.Run('beforepageloaded' );

    Setview(AppPot,W.U.Rander( W.U.Landing.Landing(AppData.AppView)),'html');
 
   //-- 
 resize.bind(AppData)();


//W.U.Updater.CreteRail({ name:'main',time:W.A.page.refresh});//W.A.page.refresh
  W.U.IU.setRail();
   W.U.ccbk.Run('pageloaded' );
  
    W.U.lazy_load();
  

   W.U.recaptcha.init();

    W.U.brain.analytics();


  }
  /**
* @description save a  view for url
* @return   
*/
function SaveView(url,data,AppId,ViewId){
    var match=0;
   ViewId=(typeof(ViewId)=='undefined')?url:ViewId;
    var view=W.V;
    for(var i=0;i<view.length;i++){
        if(view[i].url==url&&view[i].AppId==AppId){
            view[i].data=data;
            match++;
            break;
        }


    }

    if(match==0){
       W.V.push({url:url,data:data,AppId:AppId,ViewId:ViewId});
    }
}
 

  /**
  @call W.U.Setview(AppPot,'','');
* @description  Set View 
* @return   
*/
function Setview(AppPot,Node,type){
   
      switch(type){
       case 'html':

   $( AppPot).html(Node);
       break;   
       case 'append':
   $( AppPot).append(Node);
       break; 
      case 'prepend':
      $( AppPot).prepend(Node);
    
       break; 
    case 'replaceWith':
      $( AppPot).replaceWith(Node);
    
       break; 
       case 'insertAfter':
       $(Node).insertAfter( $( AppPot ) );
           break; 
       case 'insertBefore':
       $( Node ).insertBefore($( AppPot ) );
       break;
     case 'remove':
      $(Node).remove();
    
       break; 

      }
  W.U.lazy_load();
   }
   /**
* @description  add raw html string in dom 
* @return   
*/
function AddDom(AppPot,Node,type){
     Setview(AppPot, W.U.Rander(Node),type);
}
/**
* @description  add raw html string in dom 
* @return   
*/
function AttachDom(AppPot,str,type,beforeRander){
    //beforeRander=(W.U.isOK(beforeRander))?beforeRander:[];

 
     var  mainBlock=W.U.Rander(str);
     if( W.U.isArray(beforeRander)){
               var len =beforeRander.length;
         for (; index < len; index++) {
      
            beforeRander[index].bind({mainBlock:mainBlock,AppPot:AppPot})();
            }
}
else{
    if( W.U.isFunction(  beforeRander)){
       beforeRander.bind({mainBlock:mainBlock,AppPot:AppPot})();   
    }
    
}


     Setview(AppPot, mainBlock,type);
}
//-- resize
// 
function resize(){

     if(!wowrol.A.page.IsstaticHtml){ 
     if(W.U.browser.height_free){
     
     }else{
        
  document.getElementById('page').setAttribute('style', 'height:' + window.innerHeight + 'px ;overflow: hidden;');  
  
  var webwidths={
      'categoryPageStore':[1200,1060],
       'dashboard_menu':[1200,1060],
     ' messages':[1200,1060],
     'checkins':[1200,1060]
      
  };
  if(W.I.wf=='web'){
      var  widths=[1200,1000];
      if(webwidths.hasOwnProperty(W.I.AppId)){
           widths=webwidths[W.I.AppId];
      }
     
       $('.container').attr('style', 'max-width:'+widths[0]+'px; min-width:'+widths[1]+'px;'); 
  }
   
     }

  // medianStyleSetup(); 
   }

     $('html').attr('lang',W.L.l).attr('dir',W.L.dir);

}



W.U.windowresize.Add(function(){
    resize.bind(W.A.page)();
});
 

function click(Selector,context,fn){
  
  var Node= W.U(Selector,context);

   for(var q=0;q<Node.length;q++){
        
       Node[q].onclick=fn;
       }
}
function attrclick(Selector,context,fn){
  var Node= W.U(Selector,context);

   for(var q=0;q<Node.length;q++){
     WattrSave(Node[q],Selector);
       Node[q].onclick=fn;
      
       }

}
/*@des save attr value in memory
*/

function WattrSave(Node,attrStr){
   var attr=attrStr.replace(/(="\w+")+/ig,'');
 attr=attr.replace(/[[\]]+/ig,'');  
  Node[attr]=Node.getAttribute(attr);
     Node.removeAttribute(attr);
}
function getbyblockattr(attrStr,context){

    var Node= W.U(attrStr,context)[0];
   // WattrSave(Node,attrStr);
    return Node;

}



var DirectiveNameArr = [];
var Directive = {};

/*
@des W.U.RagisterDirective();
*/
function RagisterDirective(name,fn) {
    DirectiveNameArr.push(name);
    Directive[name] = fn;

}


W.U.extend({SetAppView:SetAppView}); 
  W.U.Setview=Setview;
   W.U.AddDom=AddDom;
   W.U.AttachDom=AttachDom;
   W.U.resize=resize;
   W.U.JunctionAdd=JunctionAdd ;
    W.U.click=click;
    W.U.attrclick=attrclick;
    W.U.getbyblockattr=getbyblockattr;
    W.U.Junction=Junction;
    W.U.J=JunctionSamrt;
    W.U.KKJunction=KKJunction;
    W.U.KKJ=KKJunctionSamrt;

    W.U.RagisterDirective=RagisterDirective;
})(wowrol);