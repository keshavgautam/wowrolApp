/*
* page set up 2
*/
; (function(W){
   "use strict";
      var ch='';    
   
  ch+='<div class="block _bdy bg_0 bs-2dp">';

  var masker=[];
masker.push({data:{type:'Money',option:{}}});//Money
masker.push({data:{type:'Money',option:{zeroCents: true}}});//Money
masker.push({data:{type:'Money',option:{unit: '₹'}}});//Money
masker.push({data:{type:'Money',option:{suffixUnit: '₹'}}});//Money

masker.push({data:{type:'Number',option:{}}});// number
masker.push({data:{type:'phone',option:{}}});// phone
masker.push({data:{type:'URL',option:{}}});//URL

  for(var q in masker){
    ch+='<div class="block _bdy bg_0 "><div class="block form-piece"><label class="" for="sample1">'+masker[q].data.type+'</label><input name="masker'+q+'" class="form-mold" type="text" placeholder="'+masker[q].data.type+'"  data-junction="masker'+q+'" ><div data-help="masker'+q+'"></div></div></div>'; 
    
    W.U.JunctionAdd( W.A.page.AppId, 'masker'+q, function () {
                //call back to biind Listcheckbox
           W.U.masker.bind({ Node: this.Node, Value: this.data })();

            },masker[q].data);
       
  }

    

  
  ch+='</div>';


      
        var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>');   
   



           W.U('#page').html(newView);


})(wowrol);