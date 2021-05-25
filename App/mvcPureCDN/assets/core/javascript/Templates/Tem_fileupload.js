; (function(W){
   "use strict";
  


//------

  var mainImages=function(y){
      
        var ch='<div class="block bg_6" data-junction="inventorymainimages" >';

 

ch+='<div class="block" data-block="upload_view" style="min-height:200px;"><div class="block ul ul-menu im-pb m_b10"></div></div>';
     ch+='<div data-block="upload_btn_con" class="block m_b10" >'
     +' <div class="block upload_btn al-c ov-hi m_b10"> <span class="po-re fw-b al-v" style=" top: 5px;">Upload Files</span> <input type="file" multiple="true"  accept="image/*" name="files[]"> </div>'
     +' <div class="block upload_btn al-c ov-hi"> <a href="javascript:void(0);" class="po-re fw-b al-v no-t-deco" style=" top: 5px;">Media Library</a>  </div>'
     +'<div class="block" data-help=""></div>';

     ch+='</div>';

     ch+='</div>';

  W.U.Junction('inventorymainimages',function(){
       this.data.type=0;
 W.U.fileUpload.init(this.Node,this.data);

  },y);  

        return ch;
    }
  var webImages=function(z){
       
  var ch='<div class="block bg_7"  data-junction="inventorywebImages"   >';

 

ch+='<div class="block" data-block="upload_view" style="min-height:200px;"><div class="block ul ul-menu im-pb m_b10"></div></div>';
     ch+='<div data-block="upload_btn_con" class="block m_b10"> <div class="block upload_btn form-token"> <input type="text" class="block form-mold" style="height: 26px;text-indent: 5px; background-color: #f9f9f9;" name="link_from_web" value="" placeholder="Paste a Image URL"> </div></div><div class="block" data-help=""></div>';

     ch+='</div>';



    W.U.Junction('inventorywebImages',function(){
       this.data.type=1;
 W.U.fileUpload.init(this.Node,this.data);
  },z);  

       return ch;
  }
  var mymedia=function(x){
      
      var PagingData={
   initent:'mymedia' ,
     TranseData:{}, 
   resultFlow:'bottom',
    onsucess:function(_this){
      W.U.console(_this);
       
var walkWay=_this.TemplateNode.main,
bypass=_this.Data.TranseData.bypass,
result=_this.Data.TranseData.result;
var mainBlock=Render(result,bypass);

      _this.DomInsert(walkWay,mainBlock,bypass,result);

   
     //
   
     $(walkWay).addClass('block ul ul-menu im-pb m_b10');

  }
};

function Render(result,bypass){
    var mainBlock=W.U.Rander(imageGrid.t0(result,bypass));




 return mainBlock;
}

var Jid= W.U.J(function(){
  
     PagingData.Node=  this.Node;
       W.U.paging.init(PagingData);
   var TranseData = W.U.paging.GetTranseData(PagingData.initent);
 W.U.paging.load(PagingData.initent,TranseData);
  },{});  

   var ch='<div class="block bg_7"    >';

 

ch+='<div class="block"  style="min-height:250px;" data-junction="'+Jid+'" ></div>';


     ch+='</div>';
return ch;
  }

//-

   function Images(x){



 
     var tabList=['<a href="javascript:void(0);"   role="tab" ><span class="vl-sp">my media</span></a>','<a href="javascript:void(0);"  role="tab" > <span class="vl-sp">web_images</span></a>','<a href="javascript:void(0);"  role="tab" > <span class="vl-sp">my media</span></a>']; 

     var tabContent=[mainImages(x),webImages(x),mymedia(x)];
 
       var setting={
      TabcssClass:{0:' header-link bg_0 fg_4',1:'',2:''},
      TabContentcssClass:{0:'carousel-inner po-re bg_2 fg_4',1:'',2:''} ,   
      	menuLinecolor: '#fff',
      TabContent_ContainerSize:[function(){ 
      var w=$('#page').find('.main_pane ').width();
       if(W.I.wf=='mob'){
       
       }
      if(W.I.wf=='web'){
          w=1000;   
       
          
      }
      
     return   w;
      
      
       },300],
      itemWidth :100,
      TabPlacement :'top'
    
       };
      
     return W.T.TabLayout(tabList,tabContent,setting);
   //  return webImages(x);
      //  return cloudinary(x);


  }

var imageGrid={
    t0:function(x,bypass,UploaderName){
        var ch='';
        if(x.length>0){
            for(var q  in x){
          //    ch+='<div class="w4"    >';
          
             //   ch+='</div>';
                    ch+=S.SelectPhotoTile(UploaderName,x[q].key,x[q].url,W.U.uId(),x[q].id);
            }
        }else{
            
        }
return ch;
    }
};



var S={
    imageGrid:imageGrid,
dropDown:function(){
    var ch=''
+'<div class="hide po-ab" data-block="menu"> '
+' <ul class="dropdown-menu" >'
+' <li><a href="javascript:void(0);" data-uploadselectbtn="0" >Upload New Photo</a></li>'
+' <li><a href="javascript:void(0);" data-uploadselectbtn="1" >Media Library</a></li>'
+' <li><a href="javascript:void(0);" data-uploadselectbtn="2" >Insert from URL</a></li>'
+'</ul>'
 +' </div>';
 
    return ch;
},
UseType1:function (){
         var ch='<div class="block bg_6"  >';
ch+='<div class="block" data-block="upload_view" style="min-height:200px;"><div class="block ul ul-menu im-pb m_b10"></div></div>';
     ch+='<div data-block="upload_btn_con" class="block m_b10  po-re" style="height:30px;"> <button class="block upload_btn al-c ov-hi" data-toggle="dropdownUP" >add_images</button>'+S.dropDown()+'</div><div class="block" data-help=""></div>';

     ch+='</div>';
    return ch;
},
Layout_0:function (){
         var ch='<div class="block bg_6"  >';
ch+='<div class="block" data-block="upload_view" ><div class="block ul ul-menu  m_b10"></div>'

+'<div class="block  _Bdy"  ><div class="block  bg_6 x80 po-re" data-block="upload_btn_con" ><button class="block upload_btn al-c ov-hi" data-toggle="dropdown" >add_images</button>'+S.dropDown()+'</div></div>'

+'</div>';
     ch+='<div class="block" data-help=""></div>';

     ch+='</div>';
    return ch;
},
Layout_1:function (){
         var ch='<div class="block bg_6"  >';
ch+='<div class="block" data-block="upload_view" ><div class="block ul ul-menu  m_b10"></div>'

+'<div class="block  _Bdy"  ><div class="block  bg_6 x80 po-re" data-block="upload_btn_con" ><button class="block upload_btn al-c ov-hi" data-toggle="dropdown" >add_images</button>'+S.dropDown()+'</div></div>'

+'</div>';
     ch+='<div class="block" data-help=""></div>';

     ch+='</div>';
    return ch;
},
///--------------
UploadPage:function(block){
 var _this=block.objectdata;

 var backblock =(W.I.wf=="web")?'blockFront':_this.initOption.backblock;//dashboardpage block front
  var pager ='mainpage';//dashboardpage block front
 var Header  =W.T.DashbordFormHeader({titleText:'upload Photo',submitbutton:false,backblock:backblock,pager:pager});

 var Jid= W.U.J(function(){
     _this.FileUploadJunction(this.Node);
  },{});  
    var ch='<div class="block bg_6"  data-junction="'+Jid+'"  >';

 

ch+='<div class="block" data-block="upload_view" style="min-height:200px;"><div class="block ul ul-menu im-pb m_b10"></div></div>';
     ch+='<div data-block="upload_btn_con" class="block m_b10 _Bdy" style=" height: 50px; "  >'
     +' <div class="block upload_btn al-c ov-hi m_b10"  > <span class="po-re fw-b al-v" style=" top: 5px;">Upload Files</span> <input type="file"   accept="image/*" name="files[]"> </div>'
   
     +'<div class="block" data-help=""></div>';

     ch+='</div>';

     ch+='</div>';



  return   W.T.DashbordFormWrap(Header, ch);
},
InsertMediaPage:function(block){
     var _this=block.objectdata;

 var backblock =(W.I.wf=="web")?'blockFront':_this.initOption.backblock;//dashboardpage block front
  var pager ='mainpage';//dashboardpage block front
 var Header  =W.T.DashbordFormHeader({titleText:'choose Photo',submitbutton:false,backblock:backblock,pager:pager});


 
var Jid= W.U.J(function(){
   
  var PagingData=_this.insertMediaPagingData();
     PagingData.Node=  this.Node;

       W.U.paging.init(PagingData);

   var TranseData = W.U.paging.GetTranseData(PagingData.initent);
     W.U.paging.load(PagingData.initent,TranseData);   

  },{});  


var ch='<div class="block _bdy bg_0 _B-gray  ">';

ch+='<div class="block"  style="min-height:250px;" data-junction="'+Jid+'" ></div>';

ch+='</div>';

  return   W.T.DashbordFormWrap(Header, ch);
},
webUrlPage:function(block){
         var _this=block.objectdata;

 var backblock =(W.I.wf=="web")?'blockFront':_this.initOption.backblock;//dashboardpage block front
  var pager ='mainpage';//dashboardpage block front
 var Header  =W.T.DashbordFormHeader({titleText:'Insert from URL',submitbutton:false,backblock:backblock,pager:pager});

 var Jid= W.U.J(function(){
       _this.UrlAttachJunction(this.Node);
  },{});  

    var ch='<div class="block bg_6"  data-junction="'+Jid+'"  >';

 

ch+='<div class="block" data-block="upload_view" style="min-height:200px;"><div class="block ul ul-menu im-pb m_b10"></div></div>';
     ch+='<div data-block="upload_btn_con" class="block m_b10 _Bdy"> <div class="block upload_btn form-token"> <input type="text" class="block form-mold" style="height: 26px;text-indent: 5px; background-color: #f9f9f9;" name="link_from_web" value="" placeholder="Paste a Image URL"> </div></div><div class="block" data-help=""></div>';

     ch+='</div>';

 







  return   W.T.DashbordFormWrap(Header, ch);
},
PreviewTile:function(file,priviewId,usetype){
    
   var tile= '<div class="li bg_3 block " data-previewid="' + priviewId + '"><div class="block po-re" ><div class="block po-re img_container"  ><img class="img-responsive m0_auto image-preview" style="  background:'+W.U.RandomBGColor() +';" src="" /></div><div class="block po-ab" style="top: 2px;"  > <div class="progress" > <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div> </div></div></div></div>';
   var ParseTile=W.U.Rander(tile)[0];

    if (typeof FileReader !== "undefined"){
            
            var reader = new FileReader();

            // Last image added
         
            var img=W.U('.image-preview', ParseTile)[0];
             
            reader.onload = function (e) {
              
              $(img).attr('src', e.target.result);
            }

            reader.readAsDataURL(file);

          } 

return ParseTile;
},
PhotoTile:function(name,value,src,priviewId,usetype){
   
    switch(usetype){
        case 4:
     var tile= '<div class=" bg_6 block ov-hi" data-previewid="' + priviewId + '" style=""   ><a href="javascript:void(0);"  role="tab"class="btn btn-xs vl-sp po-ab ad-6 z-1"  data-btnclose="' + name + ':'+ priviewId+'"  > ' + W.T.SVG('cross', 16, '#1274c0') + '</a><div class="img_container"><img class="img-responsive m0_auto csr-p"   src="' + src + '" alt="Photo Preview " data-btnontileselect="' + name + ':'+ priviewId+'"  ></div><input type="hidden" class="ab_input" name="' + name + '" value="' +value + '"></div>';
    return tile;
        break;
       default: 
     var tile= '<div class="li bg_6 block ov-hi" data-previewid="' + priviewId + '"    ><a href="javascript:void(0);"  role="tab"class="btn btn-xs vl-sp po-ab ad-6 z-1"  data-btnclose="' + name + ':'+ priviewId+'"  > ' + W.T.SVG('cross', 16, '#1274c0') + '</a><div class="img_container"><img class="img-responsive m0_auto csr-p"   src="' + src + '" alt="Photo Preview " data-btnontileselect="' + name + ':'+ priviewId+'"  ></div><input type="hidden" class="ab_input" name="' + name + '" value="' +value + '"></div>';
    return tile;
    }
  
},
SelectPhotoTile:function(name,value,src,priviewId,id){
    
      var tile= '<div class="li bg_6 block ov-hi" data-previewid="' + priviewId + '"    ><span  role="tab"class=" vl-sp po-ab ad-1 z-1"    ><label class="checkbox " data-toggle="checkbox" ><input type="checkbox" name="filterli" value="0" data-btnselect="' + name + ':'+ priviewId+':'+ id+'"   ><span class="checkbox__label"></span></label></span><div class="img_container"><img class="img-responsive m0_auto csr-p"  src="' + src + '" alt="Photo Preview " data-btnontileselect="' + name + ':'+ priviewId+'"  ></div><input type="hidden" class="ab_input" name="' + name + '" value="' +value + '"></div>';
 

  

   
   return tile;
},
progress:function(x){
          var ch = '<div class="progress-bar" role="progressbar" aria-valuenow="' + x + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + x + '%;"> <span class="sr-only">' + x + '% </span> </div>';

        return ch;
},

};


  W.T.fileUpload=S;

   })(wowrol);