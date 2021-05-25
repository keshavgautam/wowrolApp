; (function(W){
   "use strict";
  





var S={

UploadPage:function(block){
 var _this=block.objectdata;

 var backblock =(W.I.wf=="web")?'blockFront':_this.initOption.backblock;//dashboardpage block front
  var pager ='mainpage';//dashboardpage block front
 var Header  =W.T.DashbordFormHeader({titleText:'upload Photo',submitbutton:false,backblock:backblock,pager:pager,submitbuttonAttrstr:' kk-show="(this.showsubmitbutton==true)" kk-click="this.onDone"    ',backblockAttrstr:' kk-show="(this.showbackblock==true)"  kk-click="this.onDone"   '});

    var ch='<div class="block bg_6"  >'
     +'<div class="block"  style="min-height:200px;"><div class="block ul ul-menu im-pb m_b10" kk-node="upload_view" >'
     //--------
    +'<div class="li bg_3 block " kk-repeat="image in this.images" ><div class="block po-re" ><a href="javascript:void(0);"  role="tab" class="btn btn-xs vl-sp po-ab ad-6 z-1"  kk-show="(image.progressOn==false)"  kk-click="image.close()" > ' + W.T.SVG('cross', 16, '#1274c0') + '</a>'
    +'<div class="block po-re img_container" kk-show="(image.showthumnail==true)"  ><img class="img-responsive m0_auto image-preview" style="  background:'+W.U.RandomBGColor() +';" src="{{image.url}}"   /></div>'
       +'<div class="block po-re img_container"kk-show="(image.showthumnail==false)"  ><img class="img-responsive m0_auto image-preview" style="  background:'+W.U.RandomBGColor() +';" src="'+W.I.IMAGE_ERROR_PLACEHOLDER+'"   /></div>'
    +'<div class="block po-ab" style="top: 2px;"  kk-show="(image.progressOn==true)" > <div class="progress" > <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" kk-style="image.progress" kk-debug="" ></div> </div></div></div></div>' 
     +'</div></div>'
     //-------
     +'<div kk-node="upload_btn_con"  class="block m_b10 _Bdy" style=" height: 50px; "  >'
     +' <div class="block upload_btn al-c ov-hi m_b10"  > <span class="po-re fw-b al-v" style=" top: 5px;">Upload Files</span> <input type="file" kk-node="upload_btn"   kk-model="this.onchange" accept="image/*" name="files[]"> </div>'
   
    +'<div class="block" data-help="" ></div>' 
    +'</div>'
    +'</div>';

 



   


  return '<div class="block"  data-kkcomponent="'+ _this.kk_UploadPage_layout_jid+'"  >'+W.T.DialogWrap(Header, ch,'',false)+ '</div>';


},

CropPage:function(block){
 var _this=block.objectdata;

 var backblock =(W.I.wf=="web")?'blockFront':_this.initOption.backblock;//dashboardpage block front
  var pager ='mainpage';//dashboardpage block front
 var Header  =W.T.DashbordFormHeader({titleText:'Crop Photo',submitbutton:false,backblock:backblock,pager:pager});

    var ch='<div class="block bg_6"  data-kkcomponent="'+_this.kk_CropPage_layout_jid+'"  >'
+'<div class="image-editor">'
+'<div class="cropit-preview"  kk-node="cropit-preview" ></div>'
+'<div class="image-size-label">Resize image</div>'
+'<input type="range" class="cropit-image-zoom-input"  kk-node="cropit-image-zoom-input" ><button class="export"  kk-click="this.Export">Export</button></div>'
    +'</div>';

 



   


  return  W.T.DialogWrap(Header, ch,'',false);
},
InsertMediaPage:function(block){
 var _this=block.objectdata;

 var backblock =(W.I.wf=="web")?'blockFront':_this.initOption.backblock;//dashboardpage block front
  var pager ='mainpage';//dashboardpage block front
 var Header  =W.T.DashbordFormHeader({titleText:'upload Photo',submitbutton:false,backblock:backblock,pager:pager});

    var ch='<div class="block bg_6"    ></div>';

 



   


  return  W.T.DialogWrap(Header, ch,'',false);
},
webUrlPage:function(block){
 var _this=block.objectdata;

 var backblock =(W.I.wf=="web")?'blockFront':_this.initOption.backblock;//dashboardpage block front
  var pager ='mainpage';//dashboardpage block front
 var Header  =W.T.DashbordFormHeader({titleText:'upload Photo',submitbutton:false,backblock:backblock,pager:pager});

    var ch='<div class="block bg_6"    ></div>';

 



   


  return  W.T.DialogWrap(Header, ch,'',false);
}
};


  W.T.fileUpload_1=S;

   })(wowrol);