/*
* 
*/
; (function(W){
   "use strict";

function DefaultOption(){
      var  Data={
Node:null,
data:{},
 name:'images',
 id:W.U.uId(),
 maxFileSize: 2*(1024*1024),
 pager: 'mainpage',
 backblock: 'blockFront',
 allowedTypes: ["image/jpeg","image/png","image/jpg","image/gif"],
 crop:false,
 type:0,//0=>home load, 1=>web url,2=>cloudinary,3=>imgur,
 usetype:0,//0=>product varient image, 1=>stre slider,2=>profile pic,3=>banerpic,4=>spread image,5=>message pic,
 imagecount:1,
 SavedData:[],
 mainNode:{previewBlock:null,previewBlockWrap:null,helpBlock:'',upload_btn:null},
 UploadToURL:W.C.Setting.CDNUPLOAD,
 LayoutForClickButton:function(){return '';},
 remainstorage:250*(1024*1024)
};
return W.U.clone(Data);
}

function defaultImage(){
    var data ={
    progress:{width:0},
    progressOn:true,
    showthumnail:true,
    url:'',
    key:'',
    hash:'',
    name:'',
    isuploading:'',
    priviewId:W.U.uId()

   
};
return  W.U.clone(data);
}

function DefaultOptionAjax(){
      var  Data={};
return W.U.clone(Data);
}
//----------------
function AjaxUploader(args){
   this.initOption=W.U.extend(DefaultOptionAjax(),args); 
   
   
   
   if(   this.initOption.type=='file'){
       this.fileinit();
    }
    if(this.initOption.type=='data'){
       this.datainit();
    } 
   
     
}
AjaxUploader.prototype={
    fileinit:function(){ 
      var _this=this;



 var f_value = new FormData();

 f_value.append('filename', this.initOption.file, this.initOption.file.name);
 f_value.append('type',   'file');
 f_value.append('visit_data',  JSON.stringify(W.A.page.AcessData.visit_data));


      $.ajax({
                  xhr: function () {
                var xhr = new window.XMLHttpRequest();
               xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100).toFixed(0);

                   
         
             _this.initOption.onprogress(percentComplete);

                    }
                }, false);

                return xhr;
            },
               processData: false,  
               contentType: false ,
                    url:  this.initOption.UploadToURL,
                    data: f_value,
                    type: 'POST',
                    beforeSend: function () {
  

                    },
                    success: function (data) {



                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
  
                        }
                      if (ret.state == 200) {
var response =ret.response;
                _this.initOption.onsuccess(response);



                                }
 
                    }

                });
    
           }

 }


//-------------------
function Handler(args){

this.initOption=W.U.extend(DefaultOption(),args);  

this.uploadPageName={upload:W.U.uId(),inseartmedia:W.U.uId(),weburl:W.U.uId()};
this.currentUploadPage=0;
this.init();
}



 Handler.prototype={
  init:function(){
      var _this=this;
 
       function show(x){
       
  var presention=(W.I.wf=='mob')?'page':'model'; 
 W.U.Pager.addblockdata({name:x.name, htmlStr:x.htmlStr,objectdata:x.objectdata,presention:presention});

 W.U.Pager.DirectInitPage('mainpage',x.name); 
    }

    _this.kk_layout_jid= W.U.uId();
W.U.KKJunction(_this.kk_layout_jid,{
    name:_this.kk_layout_jid,
    controller:function(){   
    var __this=this;  
    this.fileuploader=_this;
      this.main_images=[ defaultImage(),defaultImage()];
      this.web_images=[];
      this.feature_images=[];

    this.upload=function(){
       show({name:_this.uploadPageName.upload,htmlStr:W.T.fileUpload_1.UploadPage,objectdata:_this});
    }
    this.mediachoose=function(){
       show({name:_this.uploadPageName.inseartmedia,htmlStr:W.T.fileUpload_1.InsertMediaPage,objectdata:_this});
    }
    this.URLupload=function(){
       show({name:_this.uploadPageName.weburl,htmlStr:W.T.fileUpload_1.webUrlPage,objectdata:_this});
    }

    function GetImages(){
    
     return __this.main_images;   
    }

    this.images=GetImages();   




       }


 });





_this.kk_UploadPage_layout_jid= W.U.uId();

W.U.KKJunction(_this.kk_UploadPage_layout_jid,{
        name:_this.kk_UploadPage_layout_jid,
       controller:function(){ 
       var __this=this;    
    this.fileuploader=_this;
    this.images=[];
    this.showsubmitbutton=true;
    this.showbackblock=true;
    //upload_btn => from kkNode
    this.onchange=function(){
        this;
        __this;
     
    
         var files=  __this.upload_btn.files,  priviewId;
for (var i = 0,j=0; i < files.length; i++) {
            var file = files[i];
var sizeCheck=false,TypeCheck=false;
        // Check file size
 if ((file.size < _this.initOption.maxFileSize)) {

  sizeCheck=true;
            }

      // Check file size
 if ((file.type.indexOf(_this.initOption.allowedTypes))) {

 TypeCheck=true;
            }

   if((sizeCheck)&&(TypeCheck)){
   var imageData= defaultImage();
       priviewId =imageData.priviewId;

      if(_this.initOption.crop){// is alllow crop
      
      /*
       _this.kk_CropPage_layout_jid= W.U.uId();

W.U.KKJunction(_this.kk_CropPage_layout_jid,{
       name:_this.kk_CropPage_layout_jid,
       controller:function(){ 
       var __this=this;    
       this.fileuploader=_this;
       this.file=_this;
 this.Export=function(){
     

 };


   


       }


 });



         show({name:_this.uploadPageName.upload,htmlStr:W.T.fileUpload_1.CropPage,objectdata:{
       file:file,
       onsucess:function(data){   
       debugger;
       
      new AjaxUploader({
                 kk_name:_this.kk_UploadPage_layout_jid,
                 file:data,
                 type:'data',
                 UploadToURL:_this.initOption.UploadToURL,
                 onprogress:function(x){
  
         __this.images[(W.U.count(__this.images)-1)].progress={width:x};
      W.U.ccbk.Run(W.U.Page,'KK_update_data_'+_this.kk_UploadPage_layout_jid,  __this);     
                 },
                 onsuccess:function(x){
             x.progressOn=false;  
             x.showthumnail   =true;
      W.U.extend( __this.images[(W.U.count(__this.images)-1)], x);
      W.U.ccbk.Run(W.U.Page,'KK_update_data_'+_this.kk_UploadPage_layout_jid,  __this);            
                 }

                                                 });
       
       
       
             }
       }});
      */
          
      }else{
          
 new AjaxUploader({
                 kk_name:_this.kk_UploadPage_layout_jid,
                 file:file,
                 type:'file',
                 UploadToURL:_this.initOption.UploadToURL,
                 onprogress:function(x){
  
         __this.images[(W.U.count(__this.images)-1)].progress={width:x};
      W.U.ccbk.Run(W.U.Page,'KK_update_data_'+_this.kk_UploadPage_layout_jid,  __this);     
                 },
                 onsuccess:function(x){
             x.progressOn=false;  
             x.showthumnail   =true;
      W.U.extend( __this.images[(W.U.count(__this.images)-1)], x);
      W.U.ccbk.Run(W.U.Page,'KK_update_data_'+_this.kk_UploadPage_layout_jid,  __this);            
                 }

                                                 });


      }
    
      
  
       imageData.close=function(){
        
      __this.images.splice(  __this.images[(W.U.count(__this.images)-1)] ,1 );
       W.U.ccbk.Run(W.U.Page,'KK_update_data_'+_this.kk_UploadPage_layout_jid,  __this);
       }

      
      imageData.reader=  new FileReader();

          if (  imageData.reader !== "undefined"){
        imageData.reader.onload = function (e) {
            this;
        
          __this.images[(W.U.count(__this.images)-1)].url=e.target.result;
      W.U.ccbk.Run(W.U.Page,'KK_update_data_'+_this.kk_UploadPage_layout_jid,  __this); 
            }

          imageData.reader.readAsDataURL(file);
          }else{
             imageData.showthumnail=false;
          }
   
   
       
       __this.images.push(imageData);
     
            }else{
             
      // this.showHelp('Upload your image of max 2 MiB Size.'); 
            }



         }
       
    }

    this.onDone=function(){
       _this.main_images =__this.images;
           W.U.ccbk.Run(W.U.Page,'KK_update_data_'+_this.kk_layout_jid,  _this);  
    }




       }


 });












 var  mainBlock=W.U.Rander('<div data-kkcomponent="'+_this.kk_layout_jid+'" >'+this.initOption.LayoutForClickButton()+'</div>'); 
  
  W.U.Setview(this.initOption.Node,mainBlock,'html');




  }
  
    
}


/*

*/

function set(args){
   
 new Handler(args);


}


      W.U.fileUpload_1={
        set:set,
        kk_fileuploader:Handler
    };

   
   } )(wowrol);