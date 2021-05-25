/*
* 
*/
; (function(W){
    
function t(x){
      var image='',blockmain='';
    if(x.imags.length>0){
    image='<img  class="img-responsive m0_auto"   src="'+x.imags[0]+'"  >'; 
    blockmain='<div class="block"><div class="w4 _bdy" >'+image+'</div><div class="w8 _bdy fs-14" >'+x.text+'</div></div>';  
    }else{
         blockmain='<div class="block">'+x.text+'</div>';  
    }
  


    var ch='<div class=" block _bdy" >'
         +'<span>'+x.title+'</span><br>'
        +   blockmain
         +'</div>';
    return ch;

}

 /*
 W.U.snoopy.load
 
 */
 function load(Node,url){
     url=W.F.makeHTML(url);
 var  f_value={url:url}

         var loadingId= W.F.Load('parseurl',f_value,W.C.Setting.URLParseURL);
     W.U.ccbk.Add('progress'+loadingId ,function(){  
       W.F.ButtonState(Node,{'state':'loading',text:'',LoadingText:'Loading',svg:true} ); 
             });
     W.U.ccbk.Add('complete'+loadingId ,function(){        });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      
  
      if(data.errno==0){
          W.U.AddDom(Node,t(data),'html');
      }else{
         $(Node).remove();
      }

       });
     W.U.ccbk.Run('load'+loadingId ); 

    
 }





    W.U.snoopy={load:load};

})(wowrol);