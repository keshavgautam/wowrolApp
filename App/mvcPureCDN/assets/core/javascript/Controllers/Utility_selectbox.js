/*
* page set up 2
*/
; (function(W){
   "use strict";

function Handler(Node,DataKey){
    this.Node=Node;
    this.Name=DataKey;
    var Data= W.U.intentdata.get(DataKey);
    if( Data!=null){

 this.Data= W.U.extend(defaultselectbox(), Data);
 this.Data.TranseData= W.U.extend(defaultTranseData(), this.Data.TranseData);

    this.TemplateNode=  this.initTemplate();
  

    this.init();
      
       var _this=this;
  W.U.ccbk.Add('setToken'+this.Data.id,function(x){
    if(x.id!=0){
                 
var saveingId='suggestion.'+W.U.uId();
x.saveingId=saveingId;
 W.U.intentdata.add(saveingId,x);

   _this.Data.selected[x.id]=x;
   _this.setcomponent('resulttoken');
    _this.setcomponent('token');   
    }
   
  });
    
    // W.U.console(this);
        
    }else{
     console.info('Null data  found in W.U.selectbox');
    }
   
    
}
function defaultselectbox(){
    var data = {
             id: W.U.uId(),
             name: 'suggestion',
             selected: [],
             hiddenselected: [],
             heading:'Select',//use on pageor model,
             initSearchText:'000',
             pager:'mainpage',
             backblock:'blockFront',
             TranseData:defaultTranseData(),
             fireAfter: 4,
             type:1,//02=>single | 1 =>multiple
             token: 'chips',
             placeholder: 'suggestion',
             dropdownModule:'lia', 
             hover: true,
             onselectCallback: W.U.noop,
             onselectRemoveCallback: W.U.noop,
             onselect: W.U.noop
             };
return  W.U.clone(data);
};
 function defaultTranseData(){
 var data={
          
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
return  W.U.clone(data);
};
   

 Handler.prototype.init = function () {
     
   if (this.Data.hover&&W.I.wf=='we445b') {

          this.TemplateNode.input.onfocus=this.onfocus.bind(this);
      this.TemplateNode.input.onblur=this.onblur.bind(this);
        } else {
       this.TemplateNode.wrap.style.borderColor = "#fff";
        }
     
//--------------------------------------------------------
this.SearchBoard= this.initSearchBoard();

this.TemplateNode.button.onclick=this.TemplateNodebuttononclick.bind(this);
//-----------------
for(var q in this.Data.selected){
    if(this.Data.selected[q].id!=''){
        var saveingId='suggestion.'+W.U.uId();
   this.Data.selected[q].saveingId=saveingId;
 W.U.intentdata.add(saveingId,this.Data.selected[q]);
    }else{
        delete(this.Data.selected[q]);
    }
    
}


   this.setcomponent('resulttoken');
//--------------------------------------------------------
     
   
     
      
    }
Handler.prototype.initTemplate=function(){
   var input,button,ch;
    input='<div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="'+this.Data.placeholder+'"  autocomplete="off"   ></div>';
    button='<div class="li right _bdy"><a class="btn tt-c" data-block="opensuggestionpage" >'+this.Data.placeholder+'</a></div>';

     if(W.I.wf=='mob'){
       
         ch='<div class="form-token block" >'
       +'<div  data-block="up" >'
       +'<div  class="block" >'  
       +'<div  class="di-td  w212 " data-block="token" ></div>'
       +'<div  class="di-td" >'+button+'</div>'
       +'</div>'
       +'</div>'
       +'<div  class="po-re hide" data-block="down" ></div>'
       +'</div>';
       
     var  mainBlock=W.U.Rander(ch);

      var TemplateNode={
      wrap:mainBlock[0],  
      up:W.U('[data-block="up"]',mainBlock[0])[0],   
      down:W.U('[data-block="down"]',mainBlock[0])[0],
      token:W.U('[data-block="token"]',mainBlock[0])[0],
      button:W.U('[data-block="opensuggestionpage"]',mainBlock[0])[0]
  
    }    ;


     }
      if(W.I.wf=='web'){
            ch='<div class="form-token block" >'
       +'<div  data-block="up" >'
       +'<div  class="block" >'  
       +'<div  class="di-td  w212 " data-block="token" ></div>'
       +'<div  class="di-td" >'+button+'</div>'
       +'</div>'
       +'</div>'
        +'<div  class="po-re hide" data-block="down" ></div>'
       +'</div>';
       
     var  mainBlock=W.U.Rander(ch);

      var TemplateNode={
      wrap:mainBlock[0],  
      up:W.U('[data-block="up"]',mainBlock[0])[0],   
     down:W.U('[data-block="down"]',mainBlock[0])[0],
     token:W.U('[data-block="token"]',mainBlock[0])[0],
    button:W.U('[data-block="opensuggestionpage"]',mainBlock[0])[0]
  
    }  
       
      }      

 

  

    W.U.Setview(this.Node,mainBlock,'html');

       return TemplateNode;
}

 Handler.prototype.onfocus = function () {
         this.TemplateNode.wrap.style.borderColor = "#84a0ba";
         
       
      
    }
 Handler.prototype.onblur = function () {
     this.TemplateNode.wrap.style.borderColor = "#d3dbe2";


    }

Handler.prototype.initSearchBoard=function (){
    var _this=this;
    var ret={
         show:W.U.noop,
         hide:W.U.noop,
         input:null,
         listPot:null,
         tokenPot:null
     };

     if(W.I.wf=="web"){
         var ch='<div class="block po-re">'+this.SearchBoardTemplate()+'<div class="po-ab fs11" style="top:10px; right:10px;"><a href="javascript:void(0);" data-btn="close" class="close" >x</a></div></div>';
         W.U.AttachDom(this.TemplateNode.down,ch,'html',function(){
          
             W.U.attrclick('[data-btn="close"]',this.mainBlock[0],function(){   _this.SearchBoard.hide(); });
         });
       var DropDown=  W.U.DropDown(this.TemplateNode.wrap,{
       type:'selectbox',
       placement:'bottom', 
       trigger:'',
       width:function(){
              return  this.parentNode.offsetWidth;
            },
 button:this.TemplateNode.button,
        Dropdown:this.TemplateNode.down});//initialization

     //W.U.console(this.TemplateNode.down);   

     ret.show=function(){DropDown.show();};
     ret.hide=function(){DropDown.hide();};
  
     }

    if(W.I.wf=="mob"){
         
W.U.Pager.addblockdata({name:'selectbox_'+this.Data.id, htmlStr:this.SearchBoardTemplate()});   

  

 ret.show=function (){    W.U.Pager.replacePage(_this.Data.pager,'selectbox_'+_this.Data.id); };


     }
      



     return ret;
}
Handler.prototype.TemplateNodebuttononclick=function (){



  


  this.SearchBoard.show();

// W.U.ccbk.Run(this.Node,'selectboxbuttononclick'+this.Data.id,);
 // W.U.ccbk.Run(this.Node,'realinitselectbox'+this.Data.id,RealInit.bind(this));
    this.RealInit();
             
}

Handler.prototype.SearchBoardTemplate=function(){
    var ch,mid; var URL=W.U.URL,_this=this;

  

    if(W.I.wf=='mob'){
       var header ='<div class=" block " >'
       +W.T.ActivityHeader({back:'<a href="javascript:void(0);"  class="block header-link-btn"  data-pagerbtn="'+this.Data.pager+':'+this.Data.backblock+'" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
  
 Title: '<span  class="block header-cell fg_6 al-l" ><h2 class="truncate title" >'+this.Data.heading+'</h2> </span>',


  RightLink:'<div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn"  data-pagerbtn="'+this.Data.pager+':'+this.Data.backblock+'" >'+W.T.SVG('checkmark',24,'#f1f5fc')+'</a></div>',
    dropdown:Array()
    })
      +'<div class="block _bdy"  data-block="input"></div>'
      +'<div class="block ul ul-menu"  data-block="tokenPot"></div>'
       +'</div>';  
    mid='<div class=" block  " >'
   
  
     +'<div class="block"  data-block="listPot"></div>'
     +'</div>';    

    ch='<div class=" block  " data-junction="SearchBoard'+this.Data.id+'" >'+W.T.wrap(header,mid,'')+'</div>';
    }

    if(W.I.wf=='web'){
   mid='<div class=" block bs-0 _B-gray bg_0" data-junction="SearchBoard'+this.Data.id+'" >'
     +'<div class="block _bdy"  data-block="input"></div>'
     +'<div class="block ul ul-menu _bdy"  data-block="tokenPot"></div>'
     +'<div class="block ov-au "  style="max-height:300px;" data-block="listPot"></div>'
     +'</div>';


        ch= mid;

    }
   


    W.U.Junction('SearchBoard'+this.Data.id,function(){
       //  W.U.console(_this);
       _this.realNode={  
        input:W.U('[data-block="input"]',this.Node)[0],
        tokenPot:W.U('[data-block="tokenPot"]',this.Node)[0],
        listPot:W.U('[data-block="listPot"]',this.Node)[0]
            };

          
       
  },{}); 

    return ch;

}
Handler.prototype.RealInit=function(){

    //W.U.console('real init started');
    
   //    W.U.console(this);
this.setcomponent('suggestioninput');
   this.setcomponent('resulttoken');
    this.setcomponent('token');

this.oninput(this.Data.initSearchText); 

}

Handler.prototype.setcomponent=function(name){
    var _this=this;
   
    var ch='<div></div>';
 switch(name){
     case 'suggestioninput':
     var ch='<input type="text" name="suggestion" class="form-mold " placeholder="'+this.Data.placeholder+'"  autocomplete="off" value="'+_this.Data.TranseData.sstr+'"  >';

      W.U.AttachDom(  this.realNode.input, ch, 'html',function(){this.mainBlock[0].oninput=function(){ var val=this.value; _this.oninput(val)}; });

     break;

      case 'token':
ch='<div class="block ul ul-menu">';
    for(var q in this.Data.selected){
        var li_data= this.Data.selected[q]; 
         var token =_this.maketoken({ 
        type: this.Data.token,
            data: {
                name: li_data.name,
                saveingId:li_data.saveingId
            }
        });
            ch+=token;
      $('[data-suggestionli="'+li_data.saveingId+'"]').parent().addClass('active');  
    

    }
    ch+='</div>';
    if(W.U.isOK(this.realNode)){    $(this.realNode.tokenPot).empty();
           
W.U.AttachDom( this.realNode.tokenPot, ch, 'html',function(){
        var allclose=W.U('.sclose',this.mainBlock[0]); 
 
// debugger;
         $(allclose).click(function(){ 
            var saveingId=this.getAttribute('data-selectboxClose');
         _this.ontokenremove(this,saveingId);        }); 
           
            });

}
     break;
    case 'resulttoken':
    ch='<div class="block ul ul-menu">';
    
    for(var q in this.Data.selected){
        var li_data= this.Data.selected[q]; 
      if(W.U.isOK(li_data.name)){
         var token =_this.maketoken({ 
        type: "result"+_this.Data.token,
            data: {
                name: li_data.name,
                saveingId:li_data.saveingId
            }
        });
            ch+=token;
}
    }
     
    ch+='</div>';
  
     W.U.AttachDom( this.TemplateNode.token,ch, 'html',function(){
        var allclose=W.U('.sclose',this.mainBlock[0]); 
  
// debugger;
         $(allclose).click(function(){ 
            var saveingId=this.getAttribute('data-selectboxClose');
         _this.ontokenremove(this,saveingId);       
       
          }); 
           
            });


     break;
    case 'list':

     break;
  case 'addtolist':

     break;


     }




 }

  Handler.prototype.oninput = function (val){
    var _this=this;
        //W.U.console(val);

     if (this.Data.type == 1 || this.Data.type == 2||this.Data.type == 4||this.Data.type == 5) {//multiple//single//onselect//search
      if (val.length >= this.Data.fireAfter||val=='000') {
          this.Data.TranseData.sstr=val;
          this.load();
      }
     
     }

  }


  Handler.prototype.load=function(){
      var _this=this;
      var Tdata=this.Data.TranseData;
      var selected=[],i=0;

      for(var q in this.Data.selected){
           selected[i]=q;i++;
      }
     for(var q in this.Data.hiddenselected){
           selected[i]=q;i++;
      }
      
    
      var    f_value={ suggest: this.Data.name, selected: selected, ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:Tdata.ifo };

if((W.F.ScrollLoadAllow()||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
       var loadingId= W.F.Load('selectbox',JSON.stringify(f_value));
     W.U.ccbk.Add('progress'+loadingId ,function(){         });
     W.U.ccbk.Add('complete'+loadingId ,function(){        });
     W.U.ccbk.Add('complete500'+loadingId ,function(){   _this.listTemplate({
                                    Module: 'li',
                                    Dropdown: [{ li_data: {},
                                      name: 'No Result Found for "'+Tdata.sstr+'".'
                                    }]
                                });       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      
    
         if (data.length > 0) {
                                _this.listTemplate({
                                        Module:  _this.Data.dropdownModule,
                                        Dropdown: data
                                    });
                                } else {
                                 _this.listTemplate({
                                        Module: 'li',
                                        Dropdown: [{ li_data: {},
                                            name: 'No Result Found for "'+Tdata.sstr+'".'
                                        }]
                                    });
                                }
       });
     W.U.ccbk.Run('load'+loadingId );  
}

  }


  Handler.prototype.listTemplate=function(x){
     var _this=this;
       var input_value=_this.Data.TranseData.sstr;
        var L={
            lia: function (x) {
                var ch = '';
              
              
                for (var q in x) {

                    var li_data = x[q];
var saveingId='suggestion.'+W.U.uId();
li_data.saveingId=saveingId;
 W.U.intentdata.add(saveingId,li_data);
                    ch += '<li  class="li bs-1"  data-suggestionliid="'+saveingId+'" ><a class="block _Bdy"  href="javascript:void(0);"   data-suggestionli="'+saveingId+'" >' + W.U.highlight(x[q].name, input_value) + '</a></li>';
                }

                return ch;
            },
            li: function (x) {
                var ch = '';
                for (var q in x) {

                    ch += '<li class="al-c li _B-gray _Bdy" >' + x[q].name + '</li>';
                }

                return ch;
            },
            cardentity:function(x){
                        var ch = '';
                for (var q in x) {
                
                    var li_data = x[q].li_data;
var card=W.T.C.C2_EntityStrip(li_data,{link:false,moredata:Array()});

        ch += '<li  class="li _B-gray"  ><a class="block _bdy" href="javascript:void(0);"   data-suggestionli=\'' + JSON.stringify({id:li_data.eid,af:li_data.af}) + '\' >' + card + '</a></li>';
       
                }

                return ch; 


            },
            dashboardmenu:function(x){
                    var ch = '';
                for (var q in x) {

                    var li_data = x[q].li_data;
                    li_data.term=x[q].name;
var saveingId='suggestion.'+W.U.uId();
 W.U.intentdata.add(saveingId,li_data);
                    ch += '<li  class="li _B-gray"  ><a class="block _bdy"  href="javascript:void(0);"  data-suggestionli="'+saveingId+'" >' + W.U.highlight(x[q].name, input_value) + '</a></li>';
                }

                return ch;
            }
        };  


      var list = '<ul class="block ul hover bg_0 fg_4 ff_5 fs13 ov-au b_gbl"      >';
        switch (x.Module) {
            case 'li':
                list +=L.li(x.Dropdown);
                break;
            case 'lia':
                list += L.lia(x.Dropdown);
                break;
            case 'cardentity':
              list +=L.cardentity(x.Dropdown);
            break;
               case 'dashboardmenu':
              list += L.dashboardmenu(x.Dropdown);
            break;

        }
        list += '</ul> ';   

 
       W.U.AttachDom( this.realNode.listPot, list, 'html',function(){
        var allLink=W.U(' a ',this.mainBlock[0]); 
 
// debugger;
          $(allLink).click(onNodeLinkclick); 
           
            });
//--
function onNodeLinkclick(){
    //W.U.console(this);
    var saveingId=this.getAttribute('data-suggestionli');
  
    _this.onitemSelect(saveingId,this);

}
    


   }

  Handler.prototype.onitemSelect=function(saveingId,self){
      var _this=this;
        var li_data= W.U.intentdata.get(saveingId);
      
        if(!W.U.isOK(this.Data.selected[li_data.id])){
  

       if(this.Data.type==1){
            this.Data.selected[li_data.id]=li_data;
       }else{
           this.Data.selected=[];
     $(self).parent().parent().children().removeClass('active');  

           this.Data.selected[li_data.id]=li_data; 
       }
        
            $(self).parent().addClass('active');  
 
 this.setcomponent('token');
         this.setcomponent('resulttoken');


 
   this.Data.onselectCallback.bind({suggestion:this,data:li_data})();

//-- Resize for mobile
if(W.I.wf=='mob'){
  W.U.ccbk.Run('resize_'+'selectbox_'+this.Data.id );


}

if(W.I.wf=='web'&&(this.Data.type==0||this.Data.type==2)){

     _this.SearchBoard.hide();

}

//------------  




if(this.Data.type==2){
    W.U.Pager.togglePage(this.Data.pager,this.Data.backblock);
}      

    
        }



  }
  Handler.prototype.maketoken = function (x) {
      var suggestion = this;
 
            var template = {
              chips: function (x) {
                    var ch = '';

              ch += '<div class="li"><div class="token"> <span>' + x.name + '</span> <a  href="javascript:void(0);" class="sclose s_tclose"  data-selectboxClose="'+x.saveingId+'" ></a>  </div></div>';


                    return ch;

                } ,
            resultchips: function (x) {
                    var ch = '';

              ch += '<div class="li"><div class="token"> <span>' + x.name + '</span> <a  href="javascript:void(0);" class="sclose s_tclose"  data-selectboxClose="'+x.saveingId+'" ></a> <input class="tokenh_input" type="hidden"  name="' + suggestion.Data.name + '" value="'+x.saveingId+'"> </div></div>';


                    return ch;

                }        

            };
            var token = '';
            switch (x.type) {
                case 'chips':
                    token += template.chips(x.data);
                    break;
                case 'resultchips':
                    token += template.resultchips(x.data);
                    break;
            }





            return token;
        }
  Handler.prototype.ontokenremove=function(node,saveingId){
        var _this=this;
        var li_data= W.U.intentdata.get(saveingId);
        W.U.console(li_data); W.U.console(this.Data.selected);
        if(W.U.isOK(li_data)){
          if(W.U.isOK(this.Data.selected[li_data.id])){
              delete(this.Data.selected[li_data.id]);
          //  $('[data-selectboxclose="'+saveingId+'"]').parents('.token').parent().remove();
var selectboxclose=W.U('[data-selectboxclose="'+saveingId+'"]');

  //W.U.console(selectboxclose);

for(var q =0; q <selectboxclose.length;q++){
     var toekn_li = selectboxclose[q].parentNode.parentNode;

     toekn_li.parentNode.removeChild(toekn_li);
  
}

       $('[data-suggestionli="'+saveingId+'"]').parent().removeClass('active');  
                   this.setcomponent('resulttoken');

    this.Data.onselectRemoveCallback.bind({suggestion:this,data:this.Data.selected})();
             }   
        }else{
            this.Data.selected=[];
        }
        

  }


//-------------------------------------------------
 


//-------------------

var selectbox={};
function init(Node,DataKey){
    selectbox= new Handler(Node,DataKey);
}

function set(dataselectbox){

    var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,dataselectbox);


return '<div data-selectbox="'+dataKey+'"> </div>';
}


W.U.selectbox={
   selectbox:selectbox,

   init:init,
  
   set:set 
};

})(wowrol);