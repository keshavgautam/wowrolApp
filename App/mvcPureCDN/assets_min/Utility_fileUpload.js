/*
*
*/
; (function(W){
   "use strict";
/*
*@des
*/
 function SaveFiles(name,type,data){

    var   SavedFilesInintent=W.U.intentdata.get(name);

    if(SavedFilesInintent==null){
        SavedFilesInintent={main:[],web:[]};
    }
    if(type=='main'){
     SavedFilesInintent.main.push(data);
    }
    if(type=='web'){
     SavedFilesInintent.web.push(data);
    }


      W.U.intentdata.add(name,SavedFilesInintent);

      return data;
 }
 /*
*@des
*/
function UpdatePrivewId(name,type,priviewId,data){
     var   SavedFilesInintent=W.U.intentdata.get(name);

 if(SavedFilesInintent!=null){


     if(W.U.isOK(W.U.isOK( SavedFilesInintent[type]))){
         var allfiles=SavedFilesInintent[type];

for(var q in allfiles){
    if(allfiles[q]){
        if(allfiles[q].priviewId==priviewId){
            data.priviewId=priviewId;
            SavedFilesInintent[type][q]=data;
        }
    }
}


     }




    }

}
 /*
*@des
*/

function GetImageByPrivewId(name,priviewId){
       var   SavedFilesInintent=W.U.intentdata.get(name);
       var image=defaultImage();
        if(SavedFilesInintent!=null){

 var all_image_Data=[],i=0;

 for(var q in SavedFilesInintent.main){
    all_image_Data[i]=SavedFilesInintent.main[q];i++;

 }
  for(var q in SavedFilesInintent.web){
     all_image_Data[i]=SavedFilesInintent.web[q];i++;


 }

   for(var q in all_image_Data){

       if(all_image_Data[q].priviewId==priviewId){
          image= all_image_Data[q];
       }
   }


    }
    return image;
}
 /*
*@des
*/
function DeletePriviewFile(name,priviewId){
     var   SavedFilesInintent=W.U.intentdata.get(name);
if(SavedFilesInintent!=null){

    for(var p in SavedFilesInintent){
      var allfiles=SavedFilesInintent[p];

for(var q in allfiles){
   //  W.U.console(allfiles[q].priviewId);   W.U.console(priviewId);
     if(allfiles[q].priviewId==priviewId){
          delete( allfiles[q]);

        }
}
 SavedFilesInintent[p]=allfiles;
    }



     W.U.intentdata.add(name,SavedFilesInintent);

    }
}
/*
*@des
*/
function EmptySavedFiles(name){
     W.U.intentdata.remove(name);
}



var defaultImage=function(){
    var data ={

    url:'',
    key:'',
    hash:'',
    name:'',
    priviewId:W.U.uId()


};
return  W.U.clone(data);
};
   var  DefaultOption={
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
remainstorage:250*(1024*1024)
};
//-----------------------------
function AjaxUploader(file,formname,url,imagedata,uploaderName,_this){
    this.file=file;
    this.priviewId= imagedata.priviewId;
    this.imagedata=imagedata;
    this.formname= formname;
    this.uploaderName= uploaderName;
    this.url= url;
    this._this= _this;

    if(formname=='file'){
       this.fileinit();
    }
    if(formname=='data'){
       this.datainit();
    }

    W.U.console(this);
}

AjaxUploader.prototype={
 fileinit   :function(){
  var _this=this;

   var priviewId= this.priviewId;
   var formname= this.formname;
   var imagedata= this.imagedata;
   var uploaderName= this.uploaderName;

 var f_value = new FormData();

 f_value.append('filename',  this.file, this.file.name);
 f_value.append('type',   'file');
 f_value.append('visit_data',  JSON.stringify(W.A.page.AcessData.visit_data));


      $.ajax({
                  xhr: function () {
                var xhr = new window.XMLHttpRequest();
               xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100).toFixed(0);
W.U.console('percentComplete');
                        W.U.console(percentComplete);
             $('[data-previewid="' + priviewId + '"]').find('.progress').html(W.T.fileUpload.progress(percentComplete));


                    }
                }, false);

                return xhr;
            },
               processData: false,
contentType: false ,
                    url:  this.url,
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


  var previewBlock=W.T.fileUpload.PhotoTile(uploaderName,response.key ,response.url,priviewId);

  W.U.AttachDom('[data-previewid="' + priviewId + '"]', previewBlock, 'replaceWith',function(){


       W.U.attrclick('[ data-btnclose]',this.mainBlock[0],_this._this.onTileRemove);
   });



    imagedata.url=response.url;
    imagedata.key=response.key;
    imagedata.hash=response.hash;
    imagedata.name=response.name;

  UpdatePrivewId(uploaderName,'main',priviewId,imagedata);
  _this._this.OnImageAdded();

                                }

                    }

                });



},
datainit:function(){
      var _this=this;
       var priviewId= this.priviewId;
   var formname= this.formname;
   var url=this.url;
      var priviewId= this.priviewId;
   var formname= this.formname;
   var imagedata= this.imagedata;
   var uploaderName= this.uploaderName;



     var reader  = new FileReader();
    reader.addEventListener("load", function () {
    var imageData = reader.result;
  imageData = imageData.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

  W.U.console('sdfsdf');
  var f_value={
 imageData:imageData,
 type:'data' ,
 visit_data: JSON.stringify(W.A.page.AcessData.visit_data)
  };



      $.ajax({
         xhr: function () {
                var xhr = new window.XMLHttpRequest();
               xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = ((evt.loaded / evt.total) * 100).toFixed(0);
W.U.console('percentComplete');
                        W.U.console(percentComplete);
             $('[data-previewid="' + priviewId + '"]').find('.progress').html(W.T.fileUpload.progress(percentComplete));


                    }
                }, false);

                return xhr;
            },

                    url:  url,
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





  var previewBlock=W.T.fileUpload.PhotoTile(uploaderName,response.key ,response.url,priviewId);

  W.U.AttachDom('[data-previewid="' + priviewId + '"]', previewBlock, 'replaceWith',function(){


       W.U.attrclick('[ data-btnclose]',this.mainBlock[0],_this._this.onTileRemove);
   });

    imagedata.url=response.url;
    imagedata.key=response.key;
    imagedata.hash=response.hash;
    imagedata.name=response.name;

  UpdatePrivewId(uploaderName,'main',priviewId,imagedata);
    _this._this.OnImageAdded();

                                }

                    }

                });



  }, false);



   reader.readAsDataURL(this.file);
}
}



//-----------------------------
function Handler(args){

this.initOption=W.U.extend(DefaultOption,args);

this.uploadPageName={upload:W.U.uId(),inseartmedia:W.U.uId(),weburl:W.U.uId()};
this.currentUploadPage=0;
this.LayoutForClickButton();
}
 Handler.prototype.LayoutForClickButton=function(){
     var _this=this;
     switch(this.initOption.usetype){
      case 1:
  var  mainBlock=W.U.Rander(W.T.fileUpload.UseType1());

    var mainNode={};
  mainNode.previewBlockWrap=W.U('[data-block="upload_view"]',mainBlock[0])[0];
  mainNode.previewBlock=W.U('.ul', mainNode.previewBlockWrap)[0];
  mainNode.upload_btn=W.U('[data-block="upload_btn_con"]',mainBlock[0])[0];
  mainNode.helpBlock=W.U('[data-help=""]',mainBlock[0])[0];
 W.U.attrclick('[data-uploadselectbtn]',mainBlock[0],uploadselect);
  this.mainNode=mainNode;
    W.U.Setview(this.initOption.Node,mainBlock,'html');
    this.SaveDefaultData();
    this.createGallery();
      break;
      case 2:
  var  mainBlock=W.U.Rander(W.T.fileUpload.UseType1());

    var mainNode={};
  mainNode.previewBlockWrap=W.U('[data-block="upload_view"]',mainBlock[0])[0];
  mainNode.previewBlock=W.U('.ul', mainNode.previewBlockWrap)[0];
  mainNode.upload_btn=W.U('[data-block="upload_btn_con"]',mainBlock[0])[0];
  mainNode.helpBlock=W.U('[data-help=""]',mainBlock[0])[0];
 W.U.attrclick('[data-uploadselectbtn]',mainBlock[0],uploadselect);
  this.mainNode=mainNode;
    W.U.Setview(this.initOption.Node,mainBlock,'html');
    this.SaveDefaultData();
    this.createGallery();
      break;
     case 3:

  var  mainBlock=W.U.Rander(W.T.fileUpload.Layout_0());

    var mainNode={};
  mainNode.previewBlockWrap=W.U('[data-block="upload_view"]',mainBlock[0])[0];
  mainNode.previewBlock=W.U('.ul', mainNode.previewBlockWrap)[0];
  mainNode.upload_btn=W.U('[data-block="upload_btn_con"]',mainBlock[0])[0];
  mainNode.helpBlock=W.U('[data-help=""]',mainBlock[0])[0];
 W.U.attrclick('[data-uploadselectbtn]',mainBlock[0],uploadselect);
    this.mainNode=mainNode;
    W.U.Setview(this.initOption.Node,mainBlock,'html');
    this.SaveDefaultData();
    this.createGallery();

      break;
    case 4:

  var  mainBlock=W.U.Rander(W.T.fileUpload.Layout_1());

    var mainNode={};
  mainNode.previewBlockWrap=W.U('[data-block="upload_view"]',mainBlock[0])[0];
  mainNode.previewBlock=W.U('.ul', mainNode.previewBlockWrap)[0];
  mainNode.upload_btn=W.U('[data-block="upload_btn_con"]',mainBlock[0])[0];
  mainNode.helpBlock=W.U('[data-help=""]',mainBlock[0])[0];
 W.U.attrclick('[data-uploadselectbtn]',mainBlock[0],uploadselect);
    this.mainNode=mainNode;
    W.U.Setview(this.initOption.Node,mainBlock,'html');
    this.SaveDefaultData();
    this.createGallery();

      break;
     }


function uploadselect(){

  var btnID=W.U.intval(this['data-uploadselectbtn']);
  var uploadPageName,htmlStr;
  var presention=(W.I.wf=='mob')?'page':'model';
  _this.currentUploadPage=btnID;
  switch(btnID){
     case 0:
     uploadPageName=_this.uploadPageName.upload;
     htmlStr=W.T.fileUpload.UploadPage;
     break;
     case 1:
    uploadPageName=_this.uploadPageName.inseartmedia;
    htmlStr=W.T.fileUpload.InsertMediaPage;
     break;
     case 2:
    uploadPageName=_this.uploadPageName.weburl;
    htmlStr=W.T.fileUpload.webUrlPage;
     break;
  }


W.U.Pager.addblockdata({name:uploadPageName, htmlStr:htmlStr,objectdata:_this,presention:presention});

 W.U.Pager.DirectInitPage('mainpage',uploadPageName);
}
 }


 Handler.prototype.createGallery=function(){
     var _this=this;
     var UploaderName=this.initOption.name;

     var previewBlockNode =this.mainNode.previewBlock;

   var   SavedFilesInintent=W.U.intentdata.get(UploaderName);

      if(SavedFilesInintent!=null){
 var all_image_Data=[],i=0;

 for(var q in SavedFilesInintent.main){
    all_image_Data[i]=SavedFilesInintent.main[q];i++;

 }
  for(var q in SavedFilesInintent.web){
     all_image_Data[i]=SavedFilesInintent.web[q];i++;


 }

 $(previewBlockNode).empty();
     for(var q in all_image_Data){
         var imageData={ file: all_image_Data[q].url ,
                width: 200,
                height: 200,
                type: 'resize'
            };
             var image = W.U.loadImage(imageData);

 var previewBlock=W.T.fileUpload.PhotoTile(UploaderName,all_image_Data[q].key ,image,all_image_Data[q].priviewId,this.initOption.usetype);

  W.U.AttachDom(previewBlockNode, previewBlock, 'append',function(){


   W.U.attrclick('[data-btnclose]',this.mainBlock[0],_this.onTileRemove);

  W.U.attrclick('[data-btnontileselect]',this.mainBlock[0],function(){
  var ontileselect=this['data-btnontileselect'];
   if(_this.initOption.usetype==1){

   $(this).parents('.li').parent().children().removeClass('selected');
     $(this).parents('.li').addClass('selected');
 _this.onTileFeatureImageSet(ontileselect);
 }

   });
   });

 }

 //setting featured image
  var   SavedFeatureImage=W.U.intentdata.get(UploaderName+'FeatureImage');

  if(W.U.isOK(SavedFeatureImage)){
     setTimeout(function(){
      $('[data-previewid="' + SavedFeatureImage.priviewId + '"]').addClass('selected');
     },200)
  }
  //--
 }


 }

 Handler.prototype.insertMediaPagingData=function(){
     var _this=this;
     var pagingData={
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
    var mainBlock=W.U.Rander('<div>'+W.T.fileUpload.imageGrid.t0(result,bypass,_this.initOption.name)+'</div>');


     ImgAnimation(mainBlock);


      W.U.attrclick('[data-btnselect]',mainBlock[0],function(){

   var btnclose=this['data-btnselect'];

   _this.onMediaLibrarySelect(btnclose);

});

 return mainBlock[0].childNodes;
}

     return pagingData;
 }


Handler.prototype.FileUploadJunction=function(Node){
   this.SecondNode={};
   this.SecondNode.previewBlock=W.U('[data-block="upload_view"]', Node)[0];
   this.SecondNode.previewBlockul=W.U('.ul', this.SecondNode.previewBlock)[0];
   this.SecondNode.upload_btn_con=W.U('[data-block="upload_btn_con"]', Node)[0];
   this.SecondNode.helpBlock=W.U('[data-help=""]', Node)[0];
   this.SecondNode.upload_btn=W.U('[type="file"]', this.SecondNode.upload_btn_con)[0];
   this.SecondNode.upload_btn.onchange= this.FileUploadOnChange.bind(this);





}

Handler.prototype.UrlAttachJunction=function(Node){

    this.SecondNode={};
    this.SecondNode.previewBlock=W.U('[data-block="upload_view"]', Node)[0];
    this.SecondNode.previewBlockul=W.U('.ul', this.SecondNode.previewBlock)[0];
    this.SecondNode.upload_btn_con=W.U('[data-block="upload_btn_con"]', Node)[0];
    this.SecondNode.helpBlock=W.U('[data-help=""]', Node)[0];
    this.SecondNode.upload_btn=W.U('[type="text"]', this.SecondNode.upload_btn_con)[0];
    this.SecondNode.upload_btn.onchange= this.UrlAttachOnChange.bind(this);

}


Handler.prototype.FileUploadOnChange=function(){
     var files=  this.SecondNode.upload_btn.files,  priviewId;

     for (var i = 0,j=0; i < files.length; i++) {
            var file = files[i];
var sizeCheck=false,TypeCheck=false;
        // Check file size
 if ((file.size < this.initOption.maxFileSize)) {

  sizeCheck=true;
            }

      // Check file size
 if ((file.type.indexOf(this.initOption.allowedTypes))) {

 TypeCheck=true;
            }

   if((sizeCheck)&&(TypeCheck)){
   var imageData= this.SaveFiles(this.initOption.name,'main',defaultImage());
       priviewId =imageData.priviewId;




       j++;
    var previewBlock= W.T.fileUpload.PreviewTile(file,priviewId,this.initOption.usetype);

  W.U.Setview(this.SecondNode.previewBlockul,previewBlock, 'append');

         new AjaxUploader(file,'file',this.initOption.UploadToURL,imageData,this.initOption.name,this);

            }else{

      // this.showHelp('Upload your image of max 2 MiB Size.');
            }



         }

}
Handler.prototype.UrlAttachOnChange=function(){
  debugger;
      var url=  this.SecondNode.upload_btn.value;//http://i.imgur.com/1OJei92.png
       var urlReg = new RegExp('^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|jpeg|gif|png)$');
   var TureImage = urlReg.test(url);//true;//


   if(TureImage){

        var imageData= this.SaveFiles(this.initOption.name,'web',W.U.extend(defaultImage(),{url:url}));

       var priviewId =imageData.priviewId;
      var image = W.U.loadImage({ file: url,
                width: 200,
                height: 200,
                type: 'resize'
            });



   var previewBlock=W.T.fileUpload.PhotoTile(this.initOption.name,priviewId ,image,priviewId,this.initOption.usetype);

  W.U.Setview(this.SecondNode.previewBlockul,previewBlock, 'append');



  this.SecondNode.upload_btn.value='';
  this.OnImageAdded();
   }else{
     // this.showHelp('Past a valid Image Url.');
   }
}

Handler.prototype.OnImageAdded=function(){

      this.createGallery();



  var backblock =(W.I.wf=="web")?'blockFront':this.initOption.backblock;//dashboardpage block front
     W.U.Pager.togglePage('mainpage',backblock);


}


Handler.prototype.onTileRemove=function(){
     var btnclose=this['data-btnclose'];

 if(W.U.isOK( btnclose)){
   var data=btnclose.split(':');

   DeletePriviewFile(data[0],data[1]);

   $(this).parent().remove();

   }
}
Handler.prototype.onTileFeatureImageSet=function(ontileselect){
 debugger;


 if(W.U.isOK(ontileselect)){
   var data=ontileselect.split(':');
       var image= GetImageByPrivewId(this.initOption.name,data[1]);

   W.U.intentdata.add(this.initOption.name+'FeatureImage',image);

   }
}
Handler.prototype.onMediaLibrarySelect=function(btnclose){

     if(W.U.isOK( btnclose)){
   var data=btnclose.split(':');
 var response=     W.U.intentdata.get('mymedia.'+data[2]);
 var uploaderName=data[0];
     if(W.U.isOK( response)){
    var imagedata=defaultImage();
    imagedata.url=response.url;
    imagedata.key=response.key;
    imagedata.hash=response.hash;
    imagedata.name=response.name;

  this.SaveFiles(uploaderName,'main',imagedata);
  this.OnImageAdded();

    }
   }





}

Handler.prototype.SaveFiles=function(name,type,data){
    var ret;

    if(this.initOption.imagecount==1){
        EmptySavedFiles(name);
       ret=     SaveFiles(name,type,data);
    }else{
        ret=     SaveFiles(name,type,data);
    }
    return  ret;
}

Handler.prototype.SaveDefaultData=function(){
   EmptySavedFiles(this.initOption.name);
   var images =defaultImage();

 for(var q in this.initOption.data.mainimages){

     if(W.U.isObject(this.initOption.data.mainimages[q])){
        images=  this.initOption.data.mainimages[q];
     }

    this.SaveFiles(this.initOption.name,'main',images);
     }
  for(var q in this.initOption.data.webimages){

   if(W.U.isObject(this.initOption.data.webimages[q])){
        images=  this.initOption.data.webimages[q];
     }

    this.SaveFiles(this.initOption.name,'web',images);
     }
       if(W.U.isOK(this.initOption.data.featureimage)){
             W.U.intentdata.add(this.initOption.name+'FeatureImage',this.initOption.data.featureimage);

  }

}
//Img scale animation
function ImgAnimation(mainBlock){
      var imgs=  $('img',mainBlock);
   function handlerIn(){
       $(this).addClass('animMov0').removeClass('animMov1');
   }
   function handlerOut(){
         $(this).addClass('animMov1').removeClass('animMov0');
   }


   imgs.hover( handlerIn, handlerOut );

}



/*

*/

function set(args){


 new Handler(args);

}


    W.U.fileUpload={
        set:set,
        kk_fileuploader:Handler
    };


   } )(wowrol);
