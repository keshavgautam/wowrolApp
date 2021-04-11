/*
* 
*/
; (function(W){
   "use strict";

   function fileUpload(){
       
function AjaxUploader(file,preview_id){
    this.file=file;
    this.preview_id=preview_id;
     this.init();
}
  AjaxUploader.prototype.init=function(){
   console.log(this);(this);
    
}
/*-------=====-----*/

  function Handler(data){
      this.Node=data.Node;
      this.options=W.U.extend(Handler.Default,data.Value);
      this.init();
  } 
  Handler.prototype.init=function(){
      this.previewBlock=W.U('[data-block="upload_view"]', this.Node)[0];
      this.previewBlockul=W.U('.ul', this.previewBlock)[0];
      this.upload_btn_con=W.U('[data-block="upload_btn_con"]', this.Node)[0];
      this.helpBlock=W.U('[data-help=""]', this.Node)[0];

      switch(this.options.type){
        case 0:
           this.upload_btn=W.U('[type="file"]', this.upload_btn_con)[0];
        
        break;
          case 1:
           this.upload_btn=W.U('[type="text"]', this.upload_btn_con)[0];
        
        break;  
      }
   
      this.createGallery();

       
       this.upload_btn.onchange= this.initMain.bind(this);
     
      console.log(this);
  }


Handler.prototype.createGallery=function(){
     
       var Urls=this.options.imageURLs;
      var imageID=this.options.imageID;
      var name=this.options.name;
      if(Urls.length>0){
         for(var q in Urls){
             var image = W.U.loadImage({ file: Urls[q],
                width: 200,
                height: 200,
                type: 'resize'
            });
   
 var previewBlock=this.PhotoTile(imageID[q],imageID[q],name,image);
  W.U.Setview(this.previewBlockul, previewBlock,'append');
      } 
      }
 


           }


Handler.prototype.initMain=function(){

   switch(this.options.type){
        case 0:
        this.upload.bind(this)();
        
        break;
        case 1:
         this.webload.bind(this)();
        
        break;  
      }


}

Handler.prototype.upload=function(){
 var files=  this.upload_btn.files;
  this.files=[];
      for (var i = 0,j=0; i < files.length; i++) {
            var file = files[i];
var sizeCheck=false,TypeCheck=false;
        // Check file size
 if ((file.size < this.options.maxFileSize)) {

  sizeCheck=true;
            }

      // Check file size
 if ((file.type.indexOf(this.options.allowedTypes))) {

 TypeCheck=true;
            }

   if((sizeCheck)&&(TypeCheck)){
          var preview_id=Handler.preview_id(j);

      this.files[j] =file;j++;
     new AjaxUploader(file);

            }else{
             
       this.showHelp('Upload your image of max 2 MiB Size.'); 
            }



         }


   

}

Handler.prototype.webload=function(){
     var url=  this.upload_btn.value;//http://i.imgur.com/1OJei92.png
       var urlReg = new RegExp('^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|jpeg|gif|png)$');
   var TureImage = urlReg.test(url);
   var preview_id=Handler.preview_id(0);
    var Urls=this.options.imageURLs;
      var imageID=this.options.imageID;
      var name=this.options.name;
   if(TureImage){
       Urls.push(url);imageID.push(url);
      var image = W.U.loadImage({ file: url,
                width: 200,
                height: 200,
                type: 'resize'
            });   


    var previewBlock=this.PhotoTile(url,preview_id,name,image);
    console.log(previewBlock);
  W.U.Setview(this.previewBlockul,previewBlock, 'append');

  this.upload_btn.value='';
   }else{
      this.showHelp('Past a valid Image Url.');   
   }

     console.log(this);


}


Handler.prototype.showHelp=function(msg){
    var AlertError =  W.T.AlertError({message:[msg]});
   W.U.AddDom(this.helpBlock,AlertError,'html');
   W.F.alert(); 


}

Handler.prototype.onclose=function(){
    var _this=this._this;
    $(this.Node).parent().remove();

                
         }


Handler.prototype.PhotoTile=function(id,preview_id,name,src){
    
      var tile= '<div class="li bg_3 block " data-previewid="' + preview_id + '"><a href="javascript:void(0);"  role="tab"class="sclose po-ab ad-6"  data-Junction="imagePreviewclose'+name+id+'" ></a><img src="' + src + '" alt="Photo Preview "><input type="hidden" class="ab_input" name="' + name + '" value="' +id + '"></div>';
 
   var _this=this;
      W.U.JunctionAdd(W.A.page.AppId,'imagePreviewclose'+name+id,function(){
      
      this.Node.onclick= _this.onclose.bind({_this:_this,Node:this.Node,Id:this.data.Id}); 

   },{Id:id}); 

     var ParseTile=W.U.Rander(tile);
   return ParseTile;
}
Handler.prototype.PreviewTile=function(id,file,preview_id){
    
   var tile= '<div class="li bg_3 block " data-previewid="' + preview_id + '"><div class="block po-re" ><div class="block po-re"  ><img src="http://placehold.it/200?text?Preview" class="image-preview" /></div><div class="block po-ab" style="top: 2px;"  > <div class="progress" > <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div> </div></div></div></div>';
   var ParseTile=W.U.Rander(tile)[0];

    if (typeof FileReader !== "undefined"){
            
            var reader = new FileReader();

            // Last image added
         
            var img=W.U('.image-preview', ParseTile)[0];
            reader.onload = function (e) {
              img.attr('src', e.target.result);
            }

            reader.readAsDataURL(file);

          } 

return ParseTile;
}



  Handler.Default={
 name:'images',
 maxFileSize: 2*(1024*1024),
 allowedTypes: ["image/jpeg","image/png","image/jpg","image/gif"],
 crop:false,
 type:0,
 imagecount:1,
 imageURLs:[],
 previewId:[],
 imageID:[]
};

 Handler.preview_id=function(i){
      var d = new Date(), t = d.getMilliseconds(); 
            var sd = Math.floor((Math.random() * 1000) + 1);
         
return i + '' + t + '' + sd
}

new Handler(this);
   }




    W.U.fileUpload=fileUpload;


   } )(wowrol);