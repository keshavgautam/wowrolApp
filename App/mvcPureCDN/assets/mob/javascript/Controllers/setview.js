/*
* page set up 2
*/
; (function(W){
   "use strict";
  var cache={};

var EventArr=['data-junction','data-nodeid','data-nodeall','data-learnmore','data-collapse','data-bottomfixwrap','data-spreadnodeid','data-commentnodeid'];    
var NodeNameList=['TEXTAREA','A','TIME','P'];

/**
* @description  remove event attribute
* @return   Return the appLiveDom
*/  
function bindNode(Node){
      var   dataAttrsToDelete = [];
      if(typeof(Node)!="undefined"){
       for (var i = 0; i < Node.length; i++) {

        var   dataAttrs =Node[i].attributes;
      
        if(typeof(dataAttrs) !='undefined'&& dataAttrs!='undefined'&& dataAttrs!=null){
           for (var a=0; a<dataAttrs.length; a++) {
      
       if(typeof(dataAttrs[a]) !='undefined'){
            if ( EventArr.indexOf(dataAttrs[a].name)>=0 ) {
      
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
         
         W.U.autosize(Node[i]); 
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
 
    var App=W.A.page;
    var JunctionData =App.Junction[name];
 
  
   if(typeof(JunctionData)!='undefined'){
 JunctionData.callback.bind({data:JunctionData.data,Node:this.Node})();

   // delete(App.Junction[name]);produce a bugs in store menu
   }else{
       console.warn(' Junction Data Not found for '+name+' In app '+App.AppId);
   }
     
}
/**
* @description  JunctionAdd
* @return   
*/  
function JunctionAdd(AppId,name,callback,data){

    if(typeof( W.A[AppId])!='undefined'){
   W.A[AppId].Junction[name]={callback:callback,data:data};
   }else{
       console.warn(' JunctionAdd try faild for '+name+' on '+W.A[AppId]);
       console.log(W.A);
   }
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
  var LangArr=W.L.str;
  var langArr={};
  for(var q in LangArr){
    var p=q.toLowerCase();
  langArr[p]=LangArr[q];
  }

 for (var i = 0; i < Node.length; i++) {
     
  
     if(Node[i].nodeType==3){
      
        var text=$.trim(Node[i].textContent);
     text = text.toLowerCase();
        if (typeof( langArr[text])!='undefined') {
             Node[i].textContent=langArr[text].toLowerCase();
            
         }
     }
  


     //--work on nodename
          if (Node[i].hasChildNodes()) {


         localization(Node[i].childNodes);
            }

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
var page=W.U('#page');
  var AppPot=page.find('[data-appView="'+AppData.AppId+'"]');
   var Modules= GetModule(AppData.AppId);

  if(Modules.status){
     if(AppPot.length>0){
       
          //   console.log(AppPot);
          //   console.log(Modules);
  W.A[AppData.AppId]=AppData;     
    AppPot[0].style.display="block";
    document.title=  AppData.AppTitle;
    W.U.dom={};    W.U.domall={};
      SaveView(AppData.AppSlug,AppData.AppView,AppData.AppId);
   
    Setview(AppPot[0],W.U.Rander(Modules.Module.m(AppData.AppView)),'html');
 
   //-- 
 resize.bind(AppData)();
  $(AppPot ).triggerHandler('pageloaded' );
  
   lazy_load();
     W.U.recaptcha.init();

       }else{
           var newView=W.U.Rander('<div class="block" data-appView="'+AppData.AppId+'" style="display:none"></div>');   
           page.html(newView);
            SetAppView(AppData);
       }
 
 }else{
     console.log(W.M);
     console.warn('Module Not Found For App '+AppData.AppId);
      
    }


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
* @description  first check localy for module Or load it by ajax
* @return   
**/
function GetModule(AppId) {
    var ch = {
     status: false,
     Module: ''
    };
     
    if (W.M.hasOwnProperty(AppId)) {
     ch.status = true;
     ch.Module = W.M[AppId];

    }else{
  

    }
    return ch;
   }

  /**
* @description  Set View 
* @return   
*/
function Setview(AppPot,Node,type){
  
      switch(type){
       case 'html':
       AppPot.innerHTML='';
    
        for(var q=0;q<Node.length;q++){
         
            AppPot.appendChild(Node[q]); 
          //  console.log(Node[q]);
       }
   
       break;   
       case 'append':
 for(var q=0;q<Node.length;q++){
  
            AppPot.appendChild(Node[q]); 
       }
       break; 
      case 'prepend':
    for(var q=0;q<Node.length;q++){
          AppPot.insertBefore(Node[q], AppPot.firstChild);
       }
    
       break; 

      }
   lazy_load();
   }
   /**
* @description  add raw html string in dom 
* @return   
*/
function AddDom(AppPot,Node,type){
     Setview(AppPot, W.U.Rander(Node),type);
}
//-- resize
function resize(){

     
     if( W.U.browser.opera_mini||W.U.browser.opera_mobile){
     
     }else{
        
  document.getElementById('page').setAttribute('style', 'height:' + window.innerHeight + 'px ;overflow: hidden;');   
     }

   medianStyleSetup(); 
}


$(window).on('resize',resize.bind(W.A.page));

 /**
* @description  set the page script with correct  script loading check
* @param   this => Appdata
*/
function medianStyleSetup(){
  var AppPot=document.getElementById('page');
 var AppId=W.A.page.AppId;

   
   var topFix= W.U('.top_fix')[0];
   var topFixHeight=(topFix!=null)?topFix.clientHeight:56;
  if(topFixHeight==0||topFix!=null){
      topFixHeight=56;
  }else{
     if(AppId!='Material'&&AppId!='Loading'){
        console.warn('top_fix not found for '+AppId);   
        }
  }
    var setHeight=(AppPot.clientHeight-topFixHeight) ;
  
    var median =W.U('[data-appmedian]');
    for(var q=0 ;q < median.length; q++){
      

   

   if( W.U.browser.opera_mini||W.U.browser.opera_mobile){
      //  median[q].setAttribute('style', 'height:' + setHeight + 'px ;overflow-x: -o-paged-x-controls;overflow-y: -o-paged-y;'); 
      // median[q].setAttribute('style', 'height:' + setHeight + 'px ;');      
     }else{
       median[q].setAttribute('style', 'height:' + setHeight + 'px ;overflow-x: hidden;overflow-y: auto;');    
     }


 $(median[q]).scroll(function () {
  lazy_load();
});
    }
}
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
function lazy_load(){
        var all_images = W.U('img');
       
        for (var i = 0; i < all_images.length; i++) {

            if (W.U.IselementInViewport(all_images[i])) {
                if (all_images[i].getAttribute('data-src')!==null) { 
                  var url = all_images[i].getAttribute('data-src');
                if (url != "") {
                    all_images[i].setAttribute('src', url);
                    all_images[i].setAttribute('data-src', "");
                }
                }
              

            }



        }

}
W.U.extend({SetAppView:SetAppView}); 
  W.U.Setview=Setview;
   W.U.AddDom=AddDom;
   W.U.resize=resize;
   W.U.JunctionAdd=JunctionAdd ;
    W.U.click=click;
    W.U.attrclick=attrclick;

})(wowrol);