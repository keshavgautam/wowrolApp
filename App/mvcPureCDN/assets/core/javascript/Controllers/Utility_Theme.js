/*
* 
*/
; (function(W){
   "use strict";


   function ThemeSetter(){
   function Handler() { 
   this.theme=W.A.page.AppView.theme;
   
   if( typeof ( this.theme)!='undefined'){

    if( typeof (this.theme[0])!='undefined'){
this.theme[0]=(this.theme[0]=='')?0:this.theme[0];
  if( this.theme[0]>=0&&this.theme[0]<21&&(this.theme.length>0)){
     
      this.init();  
   } 
   }
   }
  
  
       
    }
 Handler.prototype.init=function(){
     this.createMarkup();

      this.SetStyle();
    //  W.U.console(this.theme);
    // W.U.console(this);
 }

 Handler.prototype.createMarkup=function(){
     this.Style=createStyle.bind(this)();

     function createStyle(){
         var C=  this.getColor();
         var ch=''; 
 //  W.U.console(C);
      ch+='a {color: '+C.dpc+'!important;}a:active{color: '+C.pc+'!important;} .svgClass{fill: '+C.dpc+'!important;}';
           ch+= btn.bind(this)();
         ch+= border.bind(this)();
         ch+= vander.bind(this)();
         ch+=Set_dpc.bind(this)();
         ch+=Set_pc.bind(this)();
         ch+=Set_lpc.bind(this)();
         ch+=Set_ac.bind(this)();
         ch+=cssClasses.bind(this)();

         return ch;

     }

     function Set_dpc(){
           var ch=''; 
              var C=  this.getColor();
var className=Handler.classList.dpc;

for(var q in className){
    ch+=''+className[q]+'{';
    ch+='background: '+C.dpc+'!important;';
    ch+='color: '+C.ic+'!important;';
    ch+='}';
}


            return ch;
     }
     function Set_pc(){
           var ch=''; 
              var C=  this.getColor();
var className=Handler.classList.pc;

for(var q in className){
    ch+=''+className[q]+'{';
    ch+='background: '+C.pc+'!important;';
    ch+='color: '+C.ic+'!important;';
    ch+='fill: '+C.ic+'!important;';
    ch+='}';
}


            return ch;
     }
     function Set_lpc(){
           var ch=''; 
              var C=  this.getColor();
var className=Handler.classList.lpc;

for(var q in className){
    ch+=''+className[q]+'{';
    ch+='background: '+C.lpc+'!important;';
    ch+='}';
}


            return ch;
     }
     function Set_ac(){
           var ch=''; 
      var C=  this.getColor();
var className=Handler.classList.ac;

for(var q in className){
    ch+=''+className[q]+'{';
    ch+='background: '+C.ac+'!important;';
    ch+='color: '+C.aic+'!important;';
    ch+='fill: '+C.aic+'!important;';
     
    ch+='}';
}


            return ch;
     }
     function btn(){
           var ch=''; 
      var C=  this.getColor();
 ch+='.btn-primary{color: '+C.ic+'!important; background-color: '+C.ac+'!important; border-color: '+C.pc+'!important;}.btn-primary:hover,.btn-primary:focus,.btn-primary:active,.btn-primary.active,.open > .dropdown-toggle.btn-primary{color: '+C.ic+'!important; background-color: '+C.dpc+'!important; border-color: '+C.dpc+'!important;}';


            return ch;
     }
     function border(){
           var ch=''; 
      var C=  this.getColor();
 ch+='.header-link >.b_grl,.header-link >.b_gll,.form-mold:focus{border-color: '+C.dbc+' !important;}'
 +' .lodder { border-top-color: '+C.dbc+'!important; } ';


            return ch;
     }
     function vander(){
           var ch=''; 
      var C=  this.getColor();
var fg=Handler.classList.vanderfg;

for(var q in fg){
    ch+=''+fg[q]+','+fg[q]+':hover{';
  
    ch+='color: '+C.pc+';';
    ch+='fill: '+C.pc+';';
    ch+='}';
}
return ch;
     }
     function cssClasses(){
         var ch='', C=  this.getColor();
         ch+='.progress-bar{ background-color: '+C.ac+';}';
         return ch;
     }

 }


 Handler.prototype.getColor=function(){
    var ColorSwatches=W.U.ColorSwatches;

    var theme=this.theme;
 
    var C={
        dpc:'',
        dbc:'',
        pc:'',
        lpc:'',
        ic:'',
        ac:'',
        dac:'',
        aic:'',
        pt:'#212121',
        st:'#727272',
        dc:'#B6B6B6'
        };
 //    W.U.console(theme[0]); W.U.console(ColorSwatches);
        C.dbc=ColorSwatches[theme[0]].shades[900].hex;
        C.dpc=ColorSwatches[theme[0]].shades[700].hex;
        C.lpc=ColorSwatches[theme[0]].shades[100].hex;
        C.pc=ColorSwatches[theme[0]].shades[500].hex;
        C.ac=ColorSwatches[theme[0]].shades[300].hex;
        C.aic=(ColorSwatches[theme[0]].shades[400].contrast==="white"   ) ? "#FFFFFF":"#212121"  ;
        C.ic=  (ColorSwatches[theme[0]].shades[500].contrast==="white"   ) ? "#FFFFFF":"#212121"  ;

    return C;
 }


 Handler.classList={
  vanderfg:['.pagination > li > .form-mold','.btn-default'],
  vanderbg:[''],  
  dpc:['.dpc'], 
  pc:['.pc','.bg_1','.header-link >.li>a','.header-link-btn','.web-header-link-btn','.header-link >.li>a> svg','.header-link-btn svg','.web-header-link-btn svg'],
  lpc:['.lpc'],
  ipc:['.ic'],
  ic:['.ic'],
  ac:['.ac','.header-link > .li > a:hover,.header-link > .li > a:focus','.header-link > .li > a.active,.header-link > .li > a:active svg','.header-link > .li > a:hover svg','.header-link-btn:hover','.header-link-btn:hover svg','.web-header-link-btn:hover','.web-header-link-btn:hover svg'],
  pt:['.pt','html'],     
  st:['.st'],
  dc:['.dc']       
 };


  Handler.prototype.SetStyle=function(){
    
   


    
//W.U('#themecss')[0].innerHTML= this.Style;

//W.U.innerHTML(W.U('#themecss')[0],this.Style);
 W.U.AddDom(W.U('#themecss')[0],this.Style,'html');

 }

   new Handler();
   }


  function ThemeEditer(){
      
    function Handler(wrap,Value) { 
        this.wrap = wrap;
        this.Value = Value;
        this.Unsaved = 0;
        this.clickCount = 0;
        this.init();
       
    }

 Handler.prototype.init= function (){
          
         this.createMarkup();

   var tableMarkup = '<div class="block ov-hi" >'+this.paletteInput+this.UnsavedStrip+'<div class="block" data-help="theme" ></div>'+this.SelectedColorStrip+'</div></div>';
   
        W.U.ThemeSetter();
        W.U.AddDom(this.wrap, tableMarkup, 'html');
        this.Value.submitbtn.onclick=this.submit.bind(this);
         W.U.SetText(this.Value.submitbtn,'Save','html');
       } 
 Handler.prototype.createMarkup= function (){
          // W.U.console(this);
   this.paletteInput=CreatepaletteInput.bind(this)();
   this.SelectedColorStrip=CreateSelectedColorStrip.bind(this)();
    this.UnsavedStrip = createUnsavedStrip.bind(this)();
   function CreatepaletteInput(){
     var ColorSwatches=W.U.ColorSwatches;
       var ch='<div class="block  m_b10 bg_0 _B-gray"><div class="block  ul "><div class="block li bg_7 _bdy al-c"><span class="fw-b">Palette</span></div><div class="block li  _bdy">';
   
       for(var q in ColorSwatches){
        var bg=ColorSwatches[q].shades[500].hex;
        var name=ColorSwatches[q].name;
        var ChosenColor=this.Value.ChosenColor;
       
        if(ChosenColor[0]==q||ChosenColor[1]==q){
           bg='#000;'; 
           name=(ChosenColor[0]==q)?'[Selected]':'[Accent]';

    ch+='<a href="javascript:void(0);" class="block w2 " style="background-color:'+bg+' ;height:50px;"    >';
       ch+='<span class="block fg_10 tt-c _bdy al-c">'+name+'</span> ';
       ch+='</a>';

        }else{
             ch+='<a href="javascript:void(0);" class="block w2 " style="background-color:'+bg+' ;height:50px;"  data-Junction="PaletteSelect'+q+'"  >';
       ch+='<span class="block fg_10 tt-c _bdy al-c">'+name+'</span> ';
       ch+='</a>';
   var _this=this;
   W.U.JunctionAdd(W.A.page.AppId,'PaletteSelect'+q,function(){
   this.Node.onclick= onselect.bind({_this:_this,Id:this.data.Id});
   },{Id:q});    

        }

    


       }

       ch+='</div></div></div>';
       return ch;
   }
   function CreateSelectedColorStrip(){
   var ColorSwatches=W.U.ColorSwatches;
   var ChosenColor=this.Value.ChosenColor;
       var ch='<div class="block  m_b10 bg_0 _B-gray"><div class="block  ul "><div class="block li bg_7 _bdy al-c"><span class="fw-b ">Selected Color</span></div><div class="block li  _bdy">';
   
      // for(var q in ChosenColor){
          var q=0;
           var i=parseInt(ChosenColor[q]);
        
           var name='';
       if(i >=0&&i<=19&&(!isNaN(i))){
        var bg=ColorSwatches[i].shades[500].hex;
         name='[ '+ColorSwatches[i].name+' ]';
        }else{
        bg='#000;'; 
        }
        
       

       ch+='<a href="javascript:void(0);" class="block  " style="background-color:'+bg+' ;height:50px;">';
       ch+='<span class="block fg_10 tt-c _bdy al-c">'+name+'</span> ';
       ch+='</a>';



     //  }

       ch+='</div></div></div>';
       return ch;
   }

  
    function onselect(){
    var _this=this._this;
    var Id=this.Id;
    _this.UnSaved=1;   
    var C_Id= _this.clickCount;
    _this.Value.ChosenColor[C_Id]=parseInt(Id);


   if(_this.clickCount>=0){
         _this.clickCount=0;  
    }else{
         _this.clickCount++;  
    }
 W.A.page.AppView.theme= _this.Value.ChosenColor;

    _this.init.bind(_this)();
     


             }
 function createUnsavedStrip(){
          var ch='';
          
          if(this.UnSaved==1){
              ch+='<div class="block m_b10 bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">help_69</div></div>';  
          }
        

          return ch;
      }
       }
 Handler.prototype.submit=function(){
       var _this= this;
        var form = 'theme',help=W.U('[data-help="' + form + '"]')[0];
     var  f_value = { theme: this.Value.ChosenColor }
 var formData = {
                    form: form,
                    f_value: f_value
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                  W.U.madianLoading("show");

                    },
                    success: function (data) {



                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
                            W.U.madianLoading("hide");

    var AlertError =  W.T.AlertError({message:ret.mistake.message});
             W.U.AddDom(help,AlertError,'html');
   W.F.alert(); 

                        }
                        if (ret.state == 200) {

                         
W.F.Toast({msg:'successfully_changed'});
                            W.U.madianLoading("hide");
   _this.UnSaved=0;  
    _this.init.bind( _this)();
                   


                        }
                    }

                });

 }
    new Handler(this.Node,this.Value);
  };

   W.U.ThemeEditer=ThemeEditer;
   W.U.ThemeSetter=ThemeSetter;
})(wowrol);