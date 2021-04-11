/*
* 
*/
; (function(W){
   "use strict";

    var S={
    Wrap:function(){
        var ch='';
        ch+='<div class="block" data-nodeid="ProfieTabViewerWrap" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div>';


        return ch;
    },
    t0:function(x){
         var ch = ''; console.log(x);
            for(var q in x){
               ch += S.t1(x[q]);   
            }
         
    
            return ch;
    },
    t00: function (x) {
     var ch = ''; console.log(x);
            for(var q in x){
               ch += S.t1(x[q]);   
            }
         
    
            return ch;

        },
    t1: function (x) {
        
       
    
            return W.T.C.C2_EntityCard(x)

        },
    store:function(x){
       var ch='';
       console.log(x);  
     for(var q in x.cdata){
      ch+=S.storeCard(x.cdata[q],x.pdata[q]);   
       }
           
       return ch; 
    },
    storeCard:function(cdata,pdata){
         var URL=W.U.URL;
       var ch='<div class="block _B-gray m_b10"><div class="block _bdy bg_7"><a class="block " href="'+URL('')+cdata.slug+'"> <span class="fw-b">'+cdata.cN+'</span> </a></div><div class="block bg_0">';
    
 ch+=S.productCard(pdata); 


       ch+='</div></div>';
       return ch;  
    },
    productCard:function(x){
         var URL=W.U.URL;
         var t=0;
         var sliderId='sliderId'+t++;
       var ch='';
   

       var tabList = [];

     var setting = {
         ulClass: '',
         tabLiClass: '',
         data: {
             name: sliderId,
             itemType: 'strip',
             activeIndex: 0
         }
     };
    
    for(var q in x){
         tabList[q] = '<div class="block _B-gray" role="tab"  ><div class="block " style="width:200px;height:300px;">' +W.T.C.C2_Prductcard(x[q],{imagelink:false}) + '</div></div>';
     }


     ch += W.T.CarouselLayout(tabList, setting); 

       return ch;  
    },
    Loading:'<div class="block  sr-bgC _bdy m_b5 al-c">'+ W.U.loading_svg(40,40)+'</div>',
    paging:function(tab){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-paging="'+tab+'" >Load More</button></div>';
        return ch;

    } 
    };



 W.T.ProfieTabViewer=S;
})(wowrol);