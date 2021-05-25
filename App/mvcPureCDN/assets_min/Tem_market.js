/*
* 
*/
; (function(W){
   "use strict";

var Tabdifi=['My Market','Market','Near Market'];

   var t={
  t0:function(x){
        var ch='';
        if(x.length>0){
           for(var q in x){
               ch += W.T.C.C2_EntityCard(x[q]);  
            }
            }else{
      ch+=t.fallback();          
      

            }
           
         return ch;
  } ,
  fallback:function(x){
      var ch='<div class="block">'
      +'<div class="block _Bdy al-c fw-b bg_0 ">help_31</div>'
            +'</div>' ;
      return ch;
  }    ,
  n0:function(allLocation){
var ch,allLocation,link,LocationName;
     link=[] 
           if(allLocation.length>0){
       for(var q in allLocation){

      LocationName=allLocation[q].location.name+' '+allLocation[q].city.name+' '+allLocation[q].state.name+' '+allLocation[q].country.name;
     link.push({ItemType:'link',ItemData:{href:'javascript:void(0);',text:LocationName,icon:'place',attrStr:' data-btnlocation="'+allLocation[q].location.id+'" '} });  
    
 } 
 
     ch='<div class="block _Bdy   m_b10">'
     +W.U.CreateList(link)
     +'</div>';

     }else{
       ch='<div class="block _Bdy al-c fw-b bg_0 ">help_33</div>';
     }
     
     return ch; 
  },
  searchHtml:function(x){
   
     return '<div class="block  bg_0 bs-1  m_b10"><div class="w6 col6  left td-n fw-b "><a href="javascript:void(0);" class=" block _Bdy bg_0" role="button" data-pagerbtn="'+ W.I.dp+':marketstorefilter:marketstorefilter:tdata" >text_363</a></div><div class="w6 col6  right _bdy bs-1"><form name="serachform'+x.initent+'" onsubmit="return false;" ><div class="input-group"><input type="text" name="searchvalue" class="form-mold" placeholder="'+x.searchPlaceholder+'"  value="'+x.TranseData.sstr+'" autocomplete="off" > <span class="input-group-btn"> <button class="btn " type="button"  data-searchbtn="'+x.initent+'" >'+W.T.SVG('search',14,'#f1f5fc')+'</button></span></div></form></div></div>';
     
       }

   };



   var S={
   Layout:function(){
       var ch='<div>'
     +'<div class="block" data-block="locationchoser" ></div>'
      
       +'<div class="block" data-block="button" ></div>'
        +'<div class="block" data-block="info" ></div>'
       +'<div  data-block="userlocation" ></div>'
       +'<div  data-block="nearmarket" ></div>'
       +'<div class="block" data-block="paging" ></div>'
       +'</div>';


       return ch;

   }   , 
   info:function (x){
       var ch='',name,p='';
       if(W.U.isOK( x.marketData)){
name=x.marketData.location.name+' '+x.marketData.city.name+' '+x.marketData.state.name+' '+x.marketData.country.name;
     ch='<div class="block  bs-1 bg_0 m_b10">'
     +'<div class="block _Bdy al-c  fs12 ">help_32</div>'
      +'<div class="block _Bdy al-c fw-b fs14 tt-c">'+name+' </div>'
      +'</div>';
     }

     
     

     return ch; 
   },
   button:function (x){
       var ch='';
    

     
        ch='<div class="block  bs-1 bg_0 m_b10">'
   
     +'<div class="block bs-1"><div class="w4"><button type="button"  class="block  flatbtn " data-btn="mymarket" data-btnid="mymarket"  >My market</button></div><div class="w4"><button type="button" class="block flatbtn"  data-btn="market" data-btnid="market" > market </button></div><div class="w4"><button type="button" class="block flatbtn"  data-btn="nearmarket"  data-btnid="nearmarket" >near market </button></div></div>'
      +'</div>';

 


     return  ch; 
   },
   printuserlocation:function (x){
 var ch,allLocation,link,usertype,LocationName,uniqueLocation;
 allLocation=W.A.page.AppView.mylocation.address;
 usertype=W.A.page.AppView.mylocation.type;
 link=[];uniqueLocation=[];
  if( usertype==0){
    for(var q in allLocation){

        if(!W.U.iskeyInArray(allLocation[q].location.id,uniqueLocation)&&(allLocation[q].location.id!='')){//uniqueLocation
        uniqueLocation.push(allLocation[q].location.id);
 LocationName=allLocation[q].location.name+' '+allLocation[q].state.name+' '+allLocation[q].country.name;
     link.push({ItemType:'link',ItemData:{href:'javascript:void(0);',text:LocationName,icon:'place',attrStr:' data-btnlocation="'+allLocation[q].location.id+'" '} });      
        }
    
 } 
 }
 //--
 if( usertype==1){

       LocationName=allLocation.location.name+' '+allLocation.state.name+' '+allLocation.country.name;
   link.push({ItemType:'link',ItemData:{href:'javascript:void(0);',text:LocationName,icon:'place',attrStr:' data-btnlocation="'+allLocation.location.id+'" '} });
 }
 

     ch='<div class="block _Bdy   m_b10">';
      if(W.A.market.AcessData.LoginStatus){
                if(W.U.count(link)>0){
            ch+=W.U.CreateList(link);  
     }else{
        
       ch+='<div class="block _Bdy bg_0 bs-1 "><span  >text_362</span></div>';      
     }
           
           
             
         }else{
           ch+='<div class="block _Bdy bg_0 bs-1 "><span  >text_361</span></div>';       
         }


     ch+='</div>';


     
     return ch; 
   },
   locationchoser:function(x){
   var ch,datalocation;

  datalocation={Task:7,
    Data:{
  town:{id:'',name:''},
    city:{id:'',name:''},
    state:{id:'',name:''},
    country:{id:105,name:'india'},
    pager:W.I.activePage,
    backblock: W.I.activeBlock
    }
    };



          ch='<div class="block  bs-1 bg_0 m_b10" data-collapse="demo">'

+ '<div class="block _bdy "><span class=" block w10 fw-b fs14">Search Your market</span> <div class="w2" ><span class="right" ><a class="btn btn-xs btn-link" href="javascript:void(0);" data-collapsebtn="demo"  ></a></span></div></div>'
+'<div class="block _Bdy " data-collapseblock="demo"  >'
     +'<form name="searchmarket" onreturn="return false" >'
   
      +W.U.location.set(datalocation)
      +'<div  data-help="searchmarket"  ></div>'
       +'<div class="block _bdy "><button type="button" class="btn btn-primary block" data-btn="searchmarket" >Browse</button> </div>'
       
        +'</form>'
 +'</div>'
      +'</div>';


     
     return ch;    

   },
   nearmarket:function(){
       var ch='';


       return ch;
   },
   t:t
   };



     W.T.market=  S;

 })(wowrol);