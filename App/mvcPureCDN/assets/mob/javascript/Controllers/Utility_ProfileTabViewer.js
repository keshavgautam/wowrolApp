/*
* 
*/
; (function(W){
   "use strict";
 var bank=[]; 
function AddInBank(tab,result,Tdata){
   
     var TranseData=bank[tab];
   
      bank[tab]=Tdata;
      if(typeof result!="undefined"){
        var i=result.length;     
      }else{
           var i=0;  
      }
     
    for(var q in result){
       
bank[tab].result[i]=result[q];
  i++;
    }
      console.log(bank); 
   
}
function GetTranseData(tab){
   var defaultTranseData={
                ifo: { },  //info
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 5,  //pagesize
                tp: 1,  //total page
                pgd: 1   //paged
            };
  if(typeof bank[tab] != 'undefined'){
      defaultTranseData= bank[tab] ;
  }

  return defaultTranseData;
}

//--
function LoadData(tab,Tdata){
    var walkwayNode=getwalkwayNode();
   var walkway=walkwayNode.main;
   var walkwayLoading=walkwayNode.Loading;
     var AppId=W.A.page.AppId;
     tab=tab.toLowerCase();
     Tdata.ifo.tab=tab;
     Tdata.ifo.eid=W.A[AppId].AppView.EntityStripdata.eid;
   if((Tdata.bypass==5||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
          var form = 'paging',
     f_value = { name: 'ProfieTabViewer', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

            var formData = {
                form: form,
                f_value: f_value
            };
          
                W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                Tdata.fr = 1;
                        // console.log(T)
                $(walkwayLoading).html( W.T.blockLoading());
                     
                    },
                    success: function (data) {
                 $(walkwayLoading).html('');
      Tdata.fr = 0;

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
   var Hret = ret.mistake;
                   //     console.log(Hret);

                        }
                        if (ret.state == 200) {
                var Hret = ret.response;
            

                   Tdata.ps = Hret.pagesize;
                  Tdata.tp = Hret.totalpage;
                  Tdata.pgd = Hret.paged;
              
             AddInBank(tab,Hret.result,Tdata);
                   Insert(tab,Hret.result,Tdata.bypass);
                    if(tab!="store"){
                       SetPaging(tab,Tdata);  
                    }
                  
                  Tdata.bypass = 0; 
                        }
                        
                    }

                }); 

   }   
}
function getwalkwayNode(){
    var Node=W.U.id("ProfieTabViewerWrap").childNodes;
  
    return {main:Node[1],
            Loading:Node[2],
            submitLoading:Node[0],
            paging:Node[3]};
}
function Insert(tab,result,bypass){
  var walkwayNode=getwalkwayNode();
  var walkWay=walkwayNode.main;

     var mainBlock=render(tab,result,bypass);
  
    switch(bypass){
        case 1://html
 W.U.Setview(walkWay,mainBlock,'html');
     console.log(mainBlock);   console.log(bypass); 
        break;
        case 0://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
        case 5://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
        case 2://prepend
 W.U.Setview(walkWay,mainBlock,'prepend');
        break;
   
    }
}
function render(tab,result,bypass){

    if(tab!="store"){
     switch(bypass){
        case 1://html
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.t0(result)+'</div></div>')[0];
        break;
   default:
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.t00(result)+'</div></div>')[0];
   
    }
var mainBlock=RanderInDiv.childNodes;// do not disturb it
    }else{
 var mainBlock=W.U.Rander('<div class="block"><div class="block">'+ W.T.ProfieTabViewer.store(result)+'</div></div>');  


    }





  

 return mainBlock;
}
function SetPaging(tab,Tdata){
 var walkwayNode=getwalkwayNode();
 walkwayNode.paging
 if((Tdata.pgd <= Tdata.tp)&&Tdata.pgd!=0){

  var mainBlock=W.U.Rander( W.T.ProfieTabViewer.paging(tab));

    W.U.attrclick('[data-paging]',mainBlock[0],function(){
        var tab=this['data-paging'],
        TranseData =  GetTranseData(tab);
       TranseData.bypass = 5; 
        LoadComment(tab,TranseData);
    });
    W.U.Setview(walkwayNode.paging,mainBlock,'html');
 }else{
     W.U.Setview(walkwayNode.paging,'','html');
 }
  
} 
//--==init=--
function initWrap(tab){

 var TranseData =GetTranseData(tab);

 if(TranseData.pgd==1){
    TranseData.bypass = 1; 
   LoadData(tab,TranseData);
 }else{
     var reverse=TranseData.result;
       Insert(reverse,1); 
      SetPaging(tab,TranseData);
 }



 
} 
function init(){
    var walkway=this.Node;
    var tab=this.tab;
 
var mainBlock=W.U.Rander( W.T.ProfieTabViewer.Wrap());
W.U.Setview(walkway,mainBlock,'html');
initWrap(tab);
  

}


 W.U.ProfieTabViewer={init:init};

})(wowrol);