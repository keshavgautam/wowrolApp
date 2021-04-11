/*
* 
*/
; (function(W){
   "use strict";

  function LearnMore(){
     var LoadedDoc={};  
       
        function Handler(btn,docId) { 
        this.btn=btn;
        this.docId=docId;
        this.init();
        }
 Handler.prototype.init=function(){
     this.btn.onclick=this.initMain.bind(this);


    
 }
  Handler.prototype.initMain=function(){
        var event = jQuery.Event("show");
                event.id = 'learnMore';
        $(W.U.id('block.' + 'learnMore')).parent().triggerHandler(event);
           var learnMoreTitle=W.U.id('learnMoreTitle');
if(learnMoreTitle!=null){
    var Title=this.btn.innerText;
    W.U.SetText(learnMoreTitle,Title,'text');
}

      if (typeof(LoadedDoc[this.docId])!='undefined') {
            this.insert();
         
       }else{
           //  this.load();
       }
     this.load();
    
 }
  Handler.prototype.insert=function(){
    var LearnMoreblock=W.U.id('LearnMoreblock');
 
          W.U.AddDom( LearnMoreblock,'<div class="block _bdy bg_0 _B-gray  m_b10" >'+LoadedDoc[this.docId]+'</div>','html');

    
 }
  Handler.prototype.load=function(){
  var _this=this;
         var visit_data=W.A.page.AcessData.visit_data; 
     var formData={
         wg:visit_data.wg,
         AppId:this.docId
     };


     W.U.ajax({
                url: W.U.URL('docHELP'),
                data: formData,
                context: this,
                type: 'POST',
                responseType:"html",
                iframeName:'docHELP',
                beforeSend: function () {
           
                   W.U.madianLoading('show');
                  
                },
                success: function (data) {
                   W.U.madianLoading('hide');
                     console.log('success to load file '); 
                    
       
   LoadedDoc[_this.docId]=data;
           _this.insert();
 

                }

            });

    
 }


      new Handler(this.Node,this.docId); 
     };

 
 W.U.LearnMore= LearnMore;

 W.U.LearnMorewrap= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" data-nodeid="learnMoreTitle" >learnMore</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),'<div class="block ov-au" data-nodeid="LearnMoreblock" ></div>');


})(wowrol);