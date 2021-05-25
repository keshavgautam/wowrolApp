; (function(W){
   "use strict";

function contentEditable(){
 var CDN=W.I.CDN;
   

 
 function isText(node) {
      return node && node.nodeType === 3;
    };
function encodeEntities (value) {
  return value.replace(/&/g, '&amp;').replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, function (value) {
    var hi = value.charCodeAt(0)
    var low = value.charCodeAt(1)
    return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';'
  }).replace(/([^\#-~| |!])/g, function (value) { // non-alphanumeric
    return '&#' + value.charCodeAt(0) + ';'
  }).replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function insertTextAtCursor(editableDiv,html) {
  
 
  if (window.getSelection) {
        var sel = window.getSelection()
        if (sel.getRangeAt && sel.rangeCount) {
          var el = document.createElement('div')
     el.innerHTML = html;
  //   el.appendChild(document.createTextNode(html));
          var node = el.firstChild
          var range = sel.getRangeAt(0)
          range.deleteContents()
          range.insertNode(document.createTextNode(' '))
          range.insertNode(node)
          range.setStart(node, 0)

          setTimeout(function () {
            range = document.createRange()
            range.setStartAfter(node)
            range.collapse(true)
            sel.removeAllRanges()
            sel.addRange(range)
          }, 0)
        }
      } else if (document.selection && document.selection.type != 'Control') {
        document.selection.createRange().pasteHTML(html)
      }

}
//--

function getRichValueWithCaret (field) {
  if (!field) {
    return []
  }
  var lines = []
  var line = []

  var sel = window.getSelection ? window.getSelection() : false
  var selNode
  var selOffset
  if (sel && sel.rangeCount) {
    var range = sel.getRangeAt(0)
    if (range.startContainer &&
      range.startContainer == range.endContainer &&
      range.startOffset == range.endOffset) {
      selNode = range.startContainer
      selOffset = range.startOffset
    }
  }

  getRichElementValue(field, lines, line, selNode, selOffset)

  if (line.length) {
    lines.push(line.join(''))
  }

  var value = lines.join('\n')
  var caretPos = value.indexOf('\x01')
  if (caretPos != -1) {
    value = value.substr(0, caretPos) + value.substr(caretPos + 1)
  }
  value = value.replace(/\u00A0/g, ' ')

  return [value, caretPos]
}

function getRichElementValue (node, lines, line, selNode, selOffset) {
  if (node.nodeType == 3) { // TEXT
    if (selNode === node) {
      var value = node.nodeValue
      line.push(value.substr(0, selOffset) + '\x01' + value.substr(selOffset))
    } else {
      line.push(node.nodeValue)
    }
    return
  }
  if (node.nodeType != 1) { // NON-ELEMENT
    return
  }
  var isSelected = (selNode === node)
  var isBlock = node.tagName == 'DIV' || node.tagName == 'P'
  var curChild
  if (isBlock && line.length || node.tagName == 'BR') {
    lines.push(line.join(''))
    line.splice(0, line.length)
  }
  else if (node.tagName == 'IMG') {
    if (node.alt) {
      line.push(node.alt)
    }
  }
  if (isSelected && !selOffset) {
    line.push('\x01')
  }
  var curChild = node.firstChild
  while (curChild) {
    getRichElementValue(curChild, lines, line, selNode, selOffset)
    curChild = curChild.nextSibling
  }
  if (isSelected && selOffset) {
    line.push('\x01')
  }
  if (isBlock && line.length) {
    lines.push(line.join(''))
    line.splice(0, line.length)
  }
}
//--

function getEmojiHtml(code,emoji) {
  var emoji = W.I.EmojiHelper.emojis[code];
  //return '<i class="twa twa-lg " style="background-image: url('+CDN + code + '.svg);" ></i>'
    return '<img src="/assets/imgs/pic/blank.gif" alt=":'+emoji[1]+':" class="twa twa-lg " data-code="'+code+'" style="background-image: url('+CDN + code + '.svg);" />'
}








     function Handler(data) {
        
          this.Node=data.Node;
          this.options=W.U.extend(Handler.Default,data.data);
        
       this.inputValueRaw= this.inputValue=this.options.text;
        this.applyinput= false;
        this.autosizeresized=false;//for callback
        this.rowbtnlength=0;
          if(this.options.textarea){
              this.textarea();
          }else{
              
             
             this.init(); 
           
 

          }
          
          

        }

Handler.prototype.textarea=function(){
    var textareaWrap=W.U.Rander('<div class="form-piece"> <label class="control-label">'+this.options.label+'</label> <textarea name="'+this.options.name+'" class="form-mold  m_b5 textarea" placeholder="Address " autocomplete="off" rows="3"></textarea> <div data-help="'+this.options.name+'"></div></div>');

  W.U.Setview(this.Node,textareaWrap,'html');

}
/*DO NOT DISTRUB = time inteval or any structure any chage can case a bug in caret placeing
*
*/

Handler.prototype.init=function(){
    var _this=this;

 this.initcontent=W.U.Rander('<div class="block ">'+this.Template(this.options.layout)+'<div class="hide"><input type="hidden" name="'+this.options.name+'" data-block="inputhidden"></div></div>');
   //this.initcontent=W.U.Rander('<div class="block ">'+this.Template(this.options.layout)+'<div class="hide"><textarea name="'+this.options.name+'" data-block="inputhidden" ></textarea></div></div>');
  
  //--
  W.U.attrclick('[data-btn="submit"]',this.initcontent[0],function(){ _this.options.onsubmit();  
   W.U.ccbk.Run(_this.Node,'autosizeresized'); 
  W.U.ccbk.Run(_this.Node.parentNode,'autosizeresized'); 
      _this.options.onautosize(); });
  //W.U.attrclick('[data-btn="emoji"]',this.initcontent[0],OpenCoversationPlatform);
  //--

this.input=W.U('[data-block="input"]',this.initcontent[0])[0];      
 this.emojibtn=W.U('[data-btn="emoji"]',this.initcontent[0])[0];  
 this.inputhidden=W.U('[data-block="inputhidden"]',this.initcontent[0])[0];  

 //$( this.input).css({'min-height':this.options.minheight,'maxheight':this.options.maxheight,'border':0,'cursor':'text'});

W.U.Setview(this.Node,this.initcontent,'html');

this.input.onfocus=function(){
 
}
this.input.onblur=function(){   }  
this.input.onpaste=this.onRichPaste.bind(this); 







  this.input.oninput=function(e){  setTimeout(function(){
   _this.ProcessInput('input',e);
},1.5);}
 _this.ProcessInput('defaultinit');

 this.emojiSetUp();
W.U.windowresize. Add(
 this.emojiSetUp.bind(this));
 //getting all btn length by subtracting input div for later input div resize width fix


   
          




// W.U.console(this); 
}









Handler.prototype.ProcessInput=function(eventName,e){
  
  

    
       var valueCaret = getRichValueWithCaret(this.input);
    //   W.U.console( valueCaret);
      var fullValue = valueCaret[0];
 

if(/\n/g.test(fullValue)){
        this.autosizeresized=true; 
   }
       this.inputhidden.value= fullValue;

 switch(eventName){
   case 'emoji':
  
 
     break; 
     case 'paste':

 
     break; 
 case 'input':
 
  this.options.ontyping();
     break;
        case 'cut':
 
     break; 
 case 'copy':
  

     break;
  }
  


///autosizeresized

  W.U.ccbk.Run(this.Node,'autosizeresized'); 
  W.U.ccbk.Run(this.Node.parentNode,'autosizeresized'); 
      this.options.onautosize();
     
}



Handler.prototype.onRichPaste = function (e) {
  var cData = (e.originalEvent || e).clipboardData
  var items = cData && cData.items || [],
    i
  for (i = 0; i < items.length; i++) {
    if (items[i].kind == 'file') {
      e.preventDefault()
      return true
    }
  }

  try {
    var text = cData.getData('text/plain')
  } catch (e) {
    return true
  }
  //setZeroTimeout(this.onChange.bind(this), 0)
  if (text.length) {
    document.execCommand('insertText', false, text)
    return e.preventDefault();
  }
  return true
}

Handler.prototype.emojiTabsSetUp=function(){
  var emojis =  W.I.Emoji;
  var shortcuts = {}
  var spritesheetPositions = {}
  var categories=W.I.EmojiCategories ;

  

   var _this=this; 


 var tabList=[],tabContent= [];

  for (var q = 0; q <  categories.length; q++) {
       tabList[q] = '<a href="javascript:void(0);"  class="truncate   _bdy al-c"  role="tab" ><span class="vl-sp "><i class="twa twa-2x " style="background-image: url('+CDN + encodeEntities(categories[q][0]) + '.svg);"></i></span></a>';
      tabContent[q]= _this.getemojiContent(q); 

     }
       var setting={
      TabcssClass:{0:'bg_0 fg_4',1:'',2:''},
      TabContentcssClass:{0:'carousel-inner po-re bg_0 fg_4',1:'',2:''} ,   
      	menuLinecolor: '#00768D',
      TabContent_ContainerSize:[function(){ 
        var w=$('#page').find('.main_pane ').width();
       if(W.I.wf=='mob'){
     w=w-20;
       }
      if(W.I.wf=='web'){
          w=250;   
       
          
      }
            
     return  w;
      
      
       },300],
      itemWidth :50,
      TabPlacement :'top'
    
       };
      


var ch='<div class="block bg_0">'+W.T.TabLayout(tabList,tabContent,setting)+'</div>';
 
W.U.AttachDom(this.emojiDropDown.Dropdown,ch,'html',function(){
 W.U.attrclick('[data-composer_emoji_btn]',this.mainBlock[0],function(){
     var code=this['data-composer_emoji_btn'];
     _this.updateInput(code);
     W.U.console(code);
 });
});


}

Handler.prototype.emojiSetUp=function(){

  if(this.options.layout=='layout1'||this.options.layout=='layout2'){
          this.emojiDropDown=  W.U.DropDown(this.Node,{
       type:'emojibox',
       placement:'auto', 
       trigger:'hover',
       width:function(){
             var w=$('#page').find('.main_pane ').width();
       if(W.I.wf=='mob'){
     w=w-20;
       }
      if(W.I.wf=='web'){
          w=250;   
       
          
      }
            
     return  w;
            },
        button:this.emojibtn,
       Dropdown:W.U('[data-block="menu"]',this.Node)[0]
        });//initialization

        this.emojiTabsSetUp();
    }


}

Handler.prototype.getemojiContent=function(categoryIndex){
    var ch='<div class="block ov-au" style="height:150px;"><div class="block ul ul-menu" >';
  
    var emoticonCodes = W.I.EmojiCategories[categoryIndex];
   var emoticonCode,emoticonData, iconSize = 26,totalColumns=4,x,y;

       for (var i = 0; i < emoticonCodes.length; i++) {
      emoticonCode = emoticonCodes[i]
      emoticonData = W.I.Emoji[emoticonCode]
      x = iconSize * (i % totalColumns)
      y = iconSize * Math.floor(i / totalColumns)

      //ch+='<a class="btn- btn-link btn-xs" title=":' + encodeEntities(emoticonData[1][0]) + ':" data-code="' + encodeEntities(emoticonCode) + '"><i class="emoji emoji-w' + iconSize + ' emoji-spritesheet-' + categoryIndex + '" style="background-position: -' + x + 'px -' + y + 'px;"></i></a>';
ch+='<a class="btn- btn-link btn-xs " data-composer_emoji_btn="'+emoticonCode+'"  title=":' + encodeEntities(emoticonData[1][0]) + ':" ><i class="twa twa-2x " style="background-image: url('+CDN + encodeEntities(emoticonCode) + '.svg);"></i></a>';

    }



    ch+='</div></div>';
      return ch;

}

Handler.prototype.Template=function(name){
    var ch='';
    switch(name){
    case'inputDiv':
    ch='<div class="bg_0  po-re block">  <div class="block  composer_rich_textarea wball" data-block="input" contenteditable="true" dir="auto"  placeholder="'+this.options.placeholder+'" >'+this.inputValue+'</div></div>';
    break;    
  case'sendbtn':
    ch='<div class="di-td vl-t"> <button class="btn " type="button"  data-btn="submit" style="width:60px;" >'+W.T.SVG('sent',16,'#1274c0')+'</button> </div>';

    break;
  case'emojibtn':
    ch='<div class="di-td vl-t"> <div class="po-re left"> <a class="btn btn-link btn-xs" href="javascript:void(0);" data-btn="emoji"><span class="block emojiicon"></span></a> <div class="hide po-ab" data-block="menu">sdfsdfs sdf sd</div></div></div>';

    break;
 case'layout0':
    ch='<div class="block"> '+this.Template('inputDiv')+'</div>';

    break;
 case'layout1':
    ch='<div class="block"> '+this.Template('inputDiv')+this.Template('emojibtn')+' </div>';

  break;
   case'layout2':
    ch='<div class="block"> '+this.Template('emojibtn')+'<div class="di-td vl-t   w212 " >'+this.Template('inputDiv')+'</div>'+this.Template('sendbtn')+'</div>';

  break;
   case'layout3':
    ch='<div class="block"> '+'<div class="di-td vl-t   w212 " >'+this.Template('inputDiv')+'</div>'+this.Template('sendbtn')+' </div>';

  break;




    }



    return ch;


}


Handler.prototype.makeText=function(text){
 
   // text=     text ? text.replace(/(<div>)/g, '') : '\n';
 // text=     text ? text.replace(/(<\/div>)/g, '') : '';
  // text=     text ? text.replace(/(<br>)|(<\/br>)/g, '\n') : '';
  text=     text ? text.replace(/\n/g, '</br>') : '';

 



 //text=     text ? text.replace(/<(?:.|\s)*?>/g, '') : '';

   if(/\n/g.test(text)){
        this.autosizeresized=true; 
   }
  // text=     text ? text.replace(/\n/g, '</br>') : '';

      return text;
}


Handler.prototype.updateInput=function(code){
this.input.focus();
 
   var valueCaret = getRichValueWithCaret(this.input);
      var fullValue = valueCaret[0];
      var pos = valueCaret[1] >= 0 ? valueCaret[1] : fullValue.length;
      var suffix = fullValue.substr(pos)
      var prefix = fullValue.substr(0, pos)
      var matches = prefix.match(/:([\S]*)$/)
      var emoji = W.I.EmojiHelper.emojis[code];
   
      var newValuePrefix
      if (matches && matches[0]) {
        newValuePrefix = prefix.substr(0, matches.index) + ':' + emoji[1] + ':'
      } else {
        newValuePrefix = prefix + ':' + emoji[1] + ':'
      }
    //  this.inputhidden.value =  newValuePrefix

  //  var newstr=':'+emoji[1]+':';
 
   


   insertTextAtCursor(this.input,getEmojiHtml(code));
  this.ProcessInput('emoji');


}




Handler.Default={
  placeholder: "write a comment",   
  button:{emoji:true,link:false,linkbtn:{image:false,vedio:false}},
  label:'Address <i>*</i>',
  name:'',
  pagerName:'',
  textarea:false,
  textareaTransform:false,
  maxheight:'',
  minheight:'',
  text:'',
  layout:'layout0',
  onautosize:W.U.noop,
  ontyping:W.U.noop,
  onsubmit:W.U.noop

};

 new Handler(this);
}


function textareaTransform(Node){
  // W.U.console(Node);

   var text=Node.value;
   var name=Node.name;
   var rows=Node.rows;

   if(!$(Node).hasClass('nochange')){//  if(2==1){
   var newNode= W.U.createElement('div');
   var placeholder=Node.placeholder;
   var refNode=newNode;
  Node.parentNode.replaceChild(newNode, Node);


 W.U.contentEditable.bind({Node: refNode,data:{text:text,name:name,textareaTransform:true,placeholder:placeholder, minheight:(20*rows)}})();

    }else{
        W.U.autosize(Node); 
    }
}





W.U.contentEditable=contentEditable;
W.U.textareaTransform=textareaTransform;

   })(wowrol);


   /*
   layout  [ 0=>inline layout ,1 => bottom layout ]
   button  [ emoli|link=>[image|vedio] ]
    
   */