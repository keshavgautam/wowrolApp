; (function(W){
   "use strict";

var  contentEditable=function(){
    
     function Handler(data) {
        
          this.Node=data.Node;
          this.options=W.U.extend(Handler.Default,data.data);

          if(this.options.textarea){
              this.textarea();
          }else{
             this.init(); 
          }
          
          

        }
Handler.prototype.init=function(){


 this.fakecontent=W.U.Rander('<div class="block form-mold csr-t"><p class="">'+this.options.placeholder+'</p></div>');
  this.maincontent=W.U.Rander('<div class="block form-mold"> <div class="w11 " ><div class="block " data-block="inputdiv" contenteditable="true" >dfg</div></div><div class="right emoji" data-btn="emoji" ></div></div><div class="block"></div>');
 this.inputdiv=$(this.maincontent).find('[data-block="inputdiv"]').get(0);
 this.emojibtn=$(this.maincontent).find('[data-btn="emoji"]').get(0);








 $(this.inputdiv).css({'min-height':this.options.minheight,'border':0});

 
//this.Node.addEventListener("blur", this.fakecontentAdd.bind(this), false);

this.fakecontentAdd.bind(this)();
 console.log(this);
}


Handler.prototype.textarea=function(){
    var textareaWrap=W.U.Rander('<div class="form-piece"> <label class="control-label">'+this.options.label+'</label> <textarea name="'+this.options.name+'" class="form-mold  m_b5 textarea" placeholder="Address " autocomplete="off" rows="3"></textarea> <div data-help="'+this.options.name+'"></div></div>');

  W.U.Setview(this.Node,textareaWrap,'html');

}





Handler.prototype.fakecontentAdd=function(){
  
 


this.fakecontent[0].onclick=this.maincontentAdd.bind(this);
  W.U.Setview(this.Node, this.fakecontent,'html');



}
Handler.prototype.maincontentAdd=function(){
  
 


  


  W.U.Setview(this.Node, this.maincontent,'html');



}







Handler.Default={
  placeholder: "write a comment",   
  emoji:true,
  label:'Address <i>*</i>',
  name:'',
  textarea:false,
  maxheight:'',
  minheight:''
};
 new Handler(this);
}
W.U.contentEditable=contentEditable;


   })(wowrol);