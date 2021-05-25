/*
* 
*/
; (function(W){
   "use strict";


   /**
* @description create DataPanal(x)
* @param  

*@ button attribute name [data-panalswitchbtn ]    
*/

function DefaultPanalData(){
    var data={
     heading:'DataPanal Heading',
    panalID:'',
    uID:'panal'+W.U.uId(),
    frontbody:W.T.RNF_banner,
    backbody:W.T.RNF_banner,
    onprogress:W.U.noop,
    onerror:W.U.noop,
    onsuccess:W.U.noop,
    formLogic:W.U.noop,
    formData:{},
    formbtn:'',//sinple pass to W.U.form
    page:false,
    showheading:true,
    panalClass:"bs-1  m_b10",
    formOption:{sendwith:'ajax'}
    };
    return W.U.clone(data);
}

function DataPanal(x){
    var ch='';
    function Handler(x){
        this.options=W.U.extend(DefaultPanalData(),x);
   
       ch= this.init();
        }
    

    Handler.prototype.init=function(){
        var pid=this.options.uID,
         _this=this,
         formname='infoUpdate:'+pid,
          infofront='infofront:'+pid,
         infofront_Jid,formname_Jid ;

infofront_Jid=   W.U.J(function(){
     _this.infofront=this.Node; 
 _this.infofrontUpdate();
  },{}); 
formname_Jid=   W.U.J(function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },this.creatformData());

   var F='<div class="block"><div class="block"  data-junction="'+infofront_Jid+'" ></div> <a  class="hide" data-openbtn="'+pid+'"  data-btnid="B'+pid+'"  ></a> </div>';
  

var B='<div class="block"><form name="'+formname+'"  data-junction="'+formname_Jid+'" onsubmit="return false"> </form> <a  class="hide" data-closebtn="'+pid+'" ></a> </div>';


 

var heading ='';
if(this.options.showheading){
  heading ='<div class="block _Bdy fw-b bg_7 b_gbl"> '+this.options.heading+' </div>';  
}


var blockList=[F,B];
var blockName=['F'+pid,'B'+pid];
var setting ={
    name:pid,
    target:'F'+pid,
    page:this.options.page,
    minheight:'auto'
};



          return '<div class="block '+this.options.panalClass+'">'+heading+W.T.ToggleBlock(blockList, blockName,setting)+'</div>' ;
    }

    Handler.prototype.creatformData=function(){
        var _this=this;
        return {
            option:this.options.formOption,
            formData:this.options.formData,
            frombody:function(){  return _this.options.backbody.bind({datapanal:_this,form:this})();},
            onprogress:function(){    W.F.ButtonState(this.form.formbtnMain,{LoadingText:'Saving',state:'loading'}); },
            onsuccess:function(){ W.F.ButtonState(this.form.formbtnMain,{text:'Save',state:'loadingoff'});
            
           _this.options.formData= this.data.data;
            _this.infofrontUpdate();
            W.U.formReset(this.form.formname,_this.options.formData);
              W.F.Toast({msg:'text_287'});
             W.U.SwitchBlock('hide','B'+ _this.options.uID);

             W.U.ccbk.Run(W.U.Page,'DataPanalUpdate'+_this.options.panalID,  _this.options.formData );

             },
            onerror: function(){ W.F.ButtonState(this.form.formbtnMain,{text:'Save',state:'loadingoff'});
            W.F.Toast({msg:'action_not_completed',theme:'error'}); },
            formLogic:this.options.formLogic,
            formbtn:this.options.formbtn
         }
    }
    Handler.prototype.infofrontUpdate=function(){
     
      //W.U.console(this);
           W.U.AddDom(this.infofront,this.options.frontbody.bind(this)(),'html');
    }
  

new Handler(x);

return ch;
}



W.U.PanalSwitch=function(){
var data=this.value.split(':');
var action =data[0];
var uID =data[1];
switch(action){
    case 'open':

  W.U.SwitchBlock('show','B'+uID);
    break;
     case 'close':
 W.U.SwitchBlock('hide','B'+uID);

    break;
}
//W.U.console(data);

};

W.U.DataPanal=DataPanal;


})(wowrol);