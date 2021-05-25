  /*
* 
*/
;(function(W){
   "use strict";
   
   
   
   var S={
   Step_1:function(x){
        var ch=' <form name="Ragister_Store_Step_1"  onsubmit="return false"><div class="block bs-1 bg_0 _bdy ">';

       


   
   
   ch+='<div class="form-piece"> <label class="control-label"><span>text_189</span> <i >*</i></label> <input type="text" name="store_name" class="form-mold" autocomplete="off" placeholder="Store Name" value="" > <div data-help="store_name"></div></div>';
   
   ch+='<div class="form-piece"> <label class="control-label"><span>text_190</span> <i >*</i></label> <div class="form-inline"> <div class="input-group "> <div class="input-group-addon">http://wowrol.com/</div><input type="text" name="store_url_address" class="form-mold" placeholder="URL Address" autocomplete="off" data-junction="checkURL"  value="" > </div></div><div data-help="store_url_address"><span class="block _bdy fg_4 fs-italic fs11">help_2</span></div></div>';

   W.U.Junction('checkURL',function(){
  W.U.masker.bind({ Node: this.Node, Value: {type:'URL',option:{}} })();
        },{}); 

ch+='<div class="block m30_0"><div data-help="Ragister_Store_Step_1"></div>';
     ch+='</div> </form>';  

     return ch;
},
 Step_2:function (step){
var x=step.objectdata;
 var selected=[];


   for(var q in x){
    selected[x[q].id]={id:x[q].id,name:x[q].cN};   
   }
   
    var ch='<form name="setting_store_collection"  onsubmit="return false"><div class="block bs-1 bg_0 _bdy" >';
       ch+='<div class="block ">';
   
                 var dataselectbox={
                                                         name:'maincollection',
                                                           backblock:'CollectionPage',
                                                           selected:selected,
                                                           fireAfter:2,
                                                            type:'1',
                                                            token:'chips',
                                                            placeholder:'search...'
                                                                   };
  

ch+='<div class="form-piece"> <label class="control-label">What Will You Sell?</label> '+W.U.selectbox.set(dataselectbox)+'</div>';


     ch+='<div data-help="setting_store_collection"></div></div></form>';    
     return ch; 
},
 Step_3:function(step){
var x=step.objectdata;

   var ch='<form name="store_setting_1"  onsubmit="return false"><div class="block bs-1 bg_0 _bdy " >';
       ch+='<div class="block ">';
   
  var datalocation={Task:0,
 
    Data:{
   pager:'mainpage',
    backblock:'StoreaddressPage',
    main:{address:x.address,
    landmark:x.landmark,
    phone:x.phone},
    other:{address:'asdsadas',
    landmark:'',
    phone:''},
    town:x.town,
    city:x.city,
    state:x.state,
    country:x.country
    }
    };

ch+=W.U.location.set(datalocation);


     ch+='<div data-help="store_setting_1"></div></div></form>';

      return   ch;
   } ,
Step_4:function(step){
   
    var ch=''
    +'<div class="block bs-1 _bdy">'
    +'<div class="block"></div>'
    +'<div class="block fs22 al-c ff_3">help_30</div>'
    +'</div>'
    ;


   return ch;
}

   };
   
   
   
   
   
   
   
   W.T.ragisterStore=S;


   })(wowrol);