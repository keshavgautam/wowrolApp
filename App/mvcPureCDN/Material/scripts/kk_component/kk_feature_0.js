

   /*
* page set up 2
*/
; (function(W){
   "use strict";
 

  


 var ch = '<div class="block _bdy"  >';


 /////////////////Direct bind

 W.U.KKJunction('kkshow',{
       controller:function(){     
       this.checked=true;    this.type=1;
       this.go=function(){
          this.type=(this.checked)?0:1;
          return this.type;
       }
       }


 });


 W.U.KKJunction('kkswitch',{
       controller:function(){     
       var _this=this;
     this.items = ['settings', 'home', 'options', 'other'];
  this.selection = this.items[0];
  this.myStyle={};
    this.setmyStyle=function(){
        _this.myStyle={color:'red'};
    }; 
    
      this.setmyStylebackground=function(){
      _this.myStyle=  {'background-color':'blue'};
    };    
        
       }


 });

  W.U.KKJunction('kkswitch',{
       controller:function(){     
       var _this=this;
     this.items = ['settings', 'home', 'options', 'other'];
  this.selection = this.items[0];
  
        
       }


 });

 W.U.KKJunction('kkstyle',{
       controller:function(){     
       var _this=this;

  this.myStyle={};
    this.setmyStyle=function(){
        _this.myStyle={color:'red'};
    }; 
    
      this.setmyStylebackground=function(){
      _this.myStyle=  {'background-color':'blue'};
    };    
    this.clear=function(){
_this.myStyle={}
    };         
       }


 });


 W.U.KKJunction('kkrepeat',{
       controller:function(){     
       var _this=this;

      this.todos = [
      [{name:'color',value:'red'},{name:'size',value:'XL'},{name:'length',value:'78'}],
      [{name:'color',value:'green'},{name:'size',value:'XLL'},{name:'length',value:'79'}]
      ];    

       /*  this.todos = [
      { text: 'learn angular', done: false },
       { text: 'learn angular piga', done: false },
      { text: 'build an angular app', done: true}];*/
       }


 });


ch+='<div class="block _bdy" data-kkcomponent="kkshow"  ><div class="block _bdy"  >Show: <input type="checkbox" kk-model="this.checked" ><br /><div class="block" kk-show="this.checked">I show up when your checkbox is checked.</div></div><div class="block" kk-show="{show :this.go()==0}">I show up when your checkbox is checked.</div></div>';



ch+='<div class="block _bdy" data-kkcomponent="kkswitch"  ><select kk-model="this.selection" ><option label="settings" value="settings"  >settings</option><option label="home" value="home">home</option><option label="options" value="options">options</option><option label="other" value="other">other</option></select><code>selection={{this.selection}}</code><hr/>'
+'<div class="animate-switch-container" kk-switch="this.selection"><div class="animate-switch" kk-switch-when="settings|options" kk-switch-when-separator="|">Settings Div</div><div class="animate-switch" kk-switch-when="home">Home Span</div><div class="animate-switch" kk-switch-default>default</div></div></div>';


 //---------

 ch+='<div class="block _bdy" data-kkcomponent="kkstyle"  ><input type="button" class="btn" value="set color" kk-click="this.setmyStyle()"><input type="button" class="btn" value="set background" kk-click="this.setmyStylebackground()"><input type="button" class="btn" value="clear" kk-click="this.clear()"><br/><span kk-style="this.myStyle">Sample Text</span><pre>{{this.myStyle}}</pre></div>';

  ch+='<div class="block _bdy" data-kkcomponent="kkrepeat"  ><ul> <li kk-repeat="todo in this.todos" >'
  +'<span ><span kk-repeat="row in todo" ><span >{{row.name}}</span><span >{{row.value}}</span></span></span>'
  +'</li></ul> </div>';


 ch+='</div>';
   var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 

 W.U.resize();
})(wowrol);