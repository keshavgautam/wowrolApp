/*
* 
*/
; (function(W){
   "use strict";


function FindSliderImage(data){
    var img='';
     if(W.U.isOK(data.mainimages)){
    if(W.U.isOK(data.mainimages[0])){
        img=data.mainimages[0].url;
    }}
   if(W.U.isOK(data.webimages)){
    if(W.U.isOK(data.webimages[0])){
        img=data.webimages[0].url;
    }
    }
    return img;
}


function Layout(){
    var MENU=[];var ch='',page='';
     MENU.push({href:'javascript:void(0);',text:'text_87',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':sliderPage:slider:0" ',help:'help_0'});
     MENU.push({href:'javascript:void(0);',text:'text_88',icon:'',attrStr:' data-pagerbtn="'+ W.I.dp+':catalogboxes:cbox:0" ',help:'help_1'});

     ch+='<div class="block bs-1">';
     ch+='<div class="block _Bdy bg_6 bs-1-bottom "><h3>text_89 </h3></div >';
     ch+=W.U.CreateMENU(MENU);
       ch+='</div >';

 if(W.I.wf=="mob"){
page+=ch;
   
 }

 if(W.I.wf=="web"){
var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:ch}],
    target:0,
    page:true,
    minheight:'auto'
};
 page+=  W.T.Pager(setting);
   
 }

    return page;
   }

















var S ={
  Layout:Layout  ,

CboxHeader:function(){
    var btn='<a href="javascript:void(0);" class="btn btn-xs btn-primary " data-btn="addCbox" >text_90</a>';
    if(this.data.length>=4){
       btn=''; 
    }

    var ch='<div class="block  _bdy "> <div class="block "> <div class="left"> <h3 style="margin-top: 3px;">text_88</h3> </div><div class="right">'+btn+'</div></div><div class="block "> <p class="block _bdy fg_4 fs-italic fs11">help_1</p></div></div>';


    return ch;

},
CboxBox:function(){
    var ch='<div class="block    bg_0  ">';
 
    if(this.data.length>0){
 ch+='<div class="block ul ">'; 
        for(var q in this.data){

          ch+='<div class="li bs-1 " > <div class="block _bdy"> <span class="fw-b tt-c">'+this.data[q].cN+'</span><br><div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);" data-btneditcbox="'+q+'" >edit</a></span> <span> <a href="javascript:void(0);" data-btndeletecbox="'+q+'" >delete</a></span></div></div></div>';      
        }
     ch+='</div>'; 
    }else{
       ch+='<div class="block m_b5 bg_0 _bdy"><div class="block"><div class="block al-c"><h3>help_76</h3> </div></div></div>'; 
    }
     ch+='</div>'; 
    return ch;

},
CboxForm:function(x){
 
 var Header  =W.T.DashbordFormHeader({titleText:'text_88',sublitText:'save',backblock:'catalogboxes'});
  if (x.action== 'edit'){
 var Header  =W.T.DashbordFormHeader({titleText:'text_98',sublitText:'update',backblock:'catalogboxes'});     
  }





     var ch='<div class="block _bdy bg_0 _B-gray  ">';  var URL =W.U.URL;
    ch += '<div class="block  _bdy bg_0"><div data-help="addcategorybox"></div><input  type="hidden"  name="id" value="'+ x.i + '" >'; 
   
     
     var selected={};    
     if(x.cid!=''){
     
 selected[x.cid]={id:x.cid,name:x.cN};  

 }
                     var dataselectbox={
                                                 name:'category',
                                                           fireAfter:1,
                                                           pager:W.I.dp,
                                                           backblock:"catalogboxesform",
                                                          TranseData:{},
                                                          selected: selected,
                                                          initSearchText:'most used ',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'Select Category',
                                                             onselectCallback:function(){
                                                           },
                                                      onselectRemoveCallback:function(){
                                                      }
                                                                   };    


    

    ch += '<div class="block b_gbl _bdy"><div class="form-piece"> <label  class="control-label"  >category<i>*</i></label> '+W.U.selectbox.set(dataselectbox)+' <div data-help="category_name"><p class="di-in fg_4 fs-italic fs11 ">help_64</p></div></div></div>';

        ch += '<div class="block b_gtl  bg_0" ><div class="ul  block"><div class="li  _bdy fw-b">text_91</div><div class="li " data-junction="cboxProductType" ></div></div></div>';

    //--
      W.U.Junction('cboxProductType',function(){
//call back to biind Listcheckbox
        W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name: "sort", values: [0, 1, 2], valuesname: ["FRESH ARRIVALS","HIGH PRICE","LOW PRICE"], Selected: x.sort, Class: '', Listid: '0',callback:function(){
this.ListCheckBox.loadingOn();

//out business area
    

//out business area  
//call back when item get click
//this call back return the selected value
this.ListCheckBox.Value.Selected=this.itemvalue;
 
this.ListCheckBox.init();
this.ListCheckBox.loadingOff();
//-- do not remove  it
  }});  





     ch+='</div>'; 
    return   W.T.DashbordFormWrap(Header, ch);

},
CboxDelete:function(x){

 var Header  =W.T.DashbordFormHeader({titleText:'text_97',sublitText:'delete',backblock:'catalogboxes'});
    var ch='<div class="block _bdy bg_0 _B-gray  ">'; 
    ch += '<div class="block  _bdy bg_0"><div data-help="addcategorybox"></div>'; 
    ch+='<div class="block spfc  m_b10 "><div class="block _bdy fw-b  "><span class="bg_0 fg_2 ff_3">delete_ask</span></div> <div class="block _bdy fw-b al-c tt-c">' + x.cN + '</div> </div>';
 ch+='</div>'; 
    return   W.T.DashbordFormWrap(Header, ch);
},

SliderHeader:function(){
    var btn='<a href="javascript:void(0);" class="btn btn-xs btn-primary " data-btn="addslider" >text_90</a>';
    if(this.data.length>=4){
       btn=''; 
    }

    var ch='<div class="block  _bdy "> <div class="block "> <div class="left"> <h3 style="margin-top: 3px;">text_87</h3> </div><div class="right">'+btn+'</div></div><div class="block "> <p class="block _bdy fg_4 fs-italic fs11">help_0</p></div></div>';


    return ch;

},
SliderBox:function(){
    var URL=W.U.URL;
    var ch='<div class="block    bg_0  ">';

    if(this.data.length>0){
ch += '<div class="block" data-junction="SliderWhirlgig" ></div>';
var items = [];
  for (var q = 0; q < this.data.length; q++) {
     
    var img= FindSliderImage(this.data[q]);

        var imageData={ file: img,
                width: 300,
                height: 250,
                type: 'slider'
            };
             var image = W.U.loadImage(imageData);
    items[q] = '<div class="block"  > <div class="block"  ><img class="img-responsive m0_auto" src="' + URL('')+ '/assets/imgs/pic/placeholder_loading.png" data-src="'+image+'"alt="image"></div><div class=" _Bdy w23  m0_auto"  ><div class="fs11 td-cell-link"><span><a href="javascript:void(0);"  data-btneditslider="'+q+'" >edit</a></span><span><a href="javascript:void(0);" data-btndeleteslider="'+q+'" >delete</a></span></div></div><div class="block _Bdy"  ></div></div>';
     }
  
  var setting={
     items:items,
     name:'SliderWhirlgig',
      type:'Carousel',
      singleItem : true,
      pagination : true,
    ContainerSize:[function(){ 
      var w=$('#page').find('.main_pane ').width();
       if(W.I.wf=='mob'){
     
       }
      if(W.I.wf=='web'){
          if(w<1000){
               w=638;   
          }else{
             w=770; 
          }
       
          
      }
      
     return   w;
      
      
       },300],
      control : true,
      cssClass:{0:'carousel-inner po-re ',1:'',2:''}
      
  };

   W.U.JunctionAdd(W.A.page.AppId, 'SliderWhirlgig', function () {
        W.U.Whirlgig.bind({Node:this.Node,Value:this.data})();
       
     }, setting);


    }else{
       ch+='<div class="block m_b5 bg_0 _bdy"><div class="block"><div class="block al-c"><h3>text_92</h3> </div></div></div>'; 
    }
     ch+='</div>'; 
    return ch;

},
SliderForm:function(x){
 var Header  =W.T.DashbordFormHeader({titleText:'text_95',sublitText:'save',backblock:'sliderPage'});
  if (x.action== 'edit'){
 var Header  =W.T.DashbordFormHeader({titleText:'text_96',sublitText:'update',backblock:'sliderPage'});   
   } 
  

      var Jid=W.U.J(function(){

 W.U.fileUpload.set({Node:this.Node,data:this.data,usetype:2,name:'sliderimages',backblock:'sliderform'});

  },x);  

  //------------------------------------
   //  var selected={};    selected[x.Data.town.id]=x.Data.town;  
       //   var ifo={id:x.Data.city.id}; 
 var dataselectbox={
                                                 name:'category_product',
                                                 fireAfter:2,
                                                 backblock:'sliderform',
                                                         // TranseData:{ifo:ifo},
                                                       //   selected:selected,
                                                          initSearchText:'me',
                                                            type:2,
                                                            token:'chips',
                                                            placeholder:'search...'
                                                           
                                                                   };

  //------------------------------------

     var ch='<div class="block _bdy bg_0   "><div data-help="addslider"></div>'; 
   
  
   ch+='<div class="block" data-junction="'+Jid+'" ></div>';

   ch+='<div class="form-piece"> <label class="control-label">text_93</label> '+W.U.selectbox.set(dataselectbox)+'<span class="block _bdy fg_4 fs-italic fs11">help_18</span></div>';

     ch+='</div>';
   


     return   W.T.DashbordFormWrap(Header, ch);



},
SliderDelete:function(x){
     
     var Header  =W.T.DashbordFormHeader({titleText:'text_94',sublitText:'delete',backblock:'sliderPage'});

var linktoType=(x.linkto.type==0)?'category':'product';
var text=W.U.strformat("linked to {0} , {1} ", linktoType,x.linkto.name); 

    var ch='<div class="block _bdy bg_0 _B-gray  ">'; 
    ch += '<div class="block  _bdy bg_0"><div data-help="addslider"></div>'; 
    ch+='<div class="block spfc  m_b10 "><div class="block _bdy fw-b  "><span class="bg_0 fg_2 ff_3">text_47</span></div> <div class="block _bdy fw-b al-c tt-c">' + text + '</div> </div>';
 ch+='</div>'; 
    return   W.T.DashbordFormWrap(Header, ch);

}
};



 W.T.DashboardFrontPage=S;
})(wowrol);