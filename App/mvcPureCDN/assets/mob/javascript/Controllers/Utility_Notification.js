/*
* 
*/
; (function(W){
   "use strict";
  var Tabbank=[]; 
  var ActiveTab=0;
function GetTranseData(TabID){
   var defaultTranseData={
                bypass:0,
                ifo: { },  //info
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 5,  //pagesize
                tp: 1,  //total page
                pgd: 1   //paged
            };
  if(typeof Tabbank[TabID] != 'undefined'){
      defaultTranseData=Tabbank[TabID];
  }else{
      Tabbank[TabID]=defaultTranseData;
  }

  return defaultTranseData;
}

function AddInTabbank(result){
    for(var q in result){
       
     Tabbank[ActiveTab].result.push(result[q]);
    }
}
//--
function LoadData(Tdata){
       var walkwayNode=getwalkwayNode();
   
   var walkway=walkwayNode.main;
   var walkwayLoading=walkwayNode.Loading;
   Tdata.ifo.type=ActiveTab;
       if((Tdata.bypass==5||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
          var form = 'paging',
     f_value = { name: 'getNotification', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

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
                Insert(Hret.result,Tdata.bypass);
                 AddInTabbank(Hret.result);
                  Tdata.bypass = 0; 
                        }
                        
                    }

                }); 

   }   
}
function setTabView(){
var walkwayNode=getwalkwayNode();

 var TranseData = GetTranseData(ActiveTab);
 console.log(TranseData); 
 console.log(Tabbank);
 if(TranseData.pgd==1){
 TranseData.bypass = 1; 

 LoadData(TranseData);
 }else{
     var reverse=TranseData.result;
      Insert(reverse,1); 
      SetPaging(TranseData);
 }
   W.U.AddDom(walkwayNode.heading,W.T.Notifications.heading(ActiveTab),'html');
}
function Insert(result,bypass){
  var walkwayNode=getwalkwayNode();
  var walkWay=walkwayNode.main;
  var mainBlock=W.U.Rander( W.T.Notifications.t.t0(result),ActiveTab);
    
    switch(bypass){
        case 1://html

 W.U.Setview(walkWay,mainBlock,'html');
        break;
        case 0://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
        case 5://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
     
  
    }
}
function SetPaging(Tdata){
 var walkwayNode=getwalkwayNode();
 walkwayNode.paging
 if((Tdata.pgd <= Tdata.tp)&&Tdata.pgd!=0){

  var mainBlock=W.U.Rander(W.T.mycheckins.t.paging(ActiveTab));

    W.U.attrclick('[data-paging]',mainBlock[0],function(){
        var TranseData = GetTranseData(ActiveTab);
       TranseData.bypass = 5; 
        LoadData(TranseData);
    });
    W.U.Setview(walkwayNode.paging,mainBlock,'html');
 }else{
     W.U.Setview(walkwayNode.paging,'','html');
 }
  
}
//--


//-- init
function getwalkwayNode(){
    var Node=W.U.id("NotificationViewerWrap").childNodes;
  
    return {main:Node[1],
            Loading:Node[2],
            heading:Node[0],
            paging:Node[3]};
}
function initMain(){
    var walkwayNode=getwalkwayNode();
     var TranseData = GetTranseData(ActiveTab);
 console.log(TranseData); 
 console.log(Tabbank);
 if(TranseData.pgd==1){
 TranseData.bypass = 1; 

 LoadData(TranseData);
 }else{
     var reverse=TranseData.result;
      Insert(reverse,1); 
      SetPaging(TranseData);
 }

 W.U.AddDom(walkwayNode.heading,W.T.Notifications.heading(ActiveTab),'html');

} 

function init(walkway){
 

 var mainBlock=W.U.Rander(W.T.Notifications.Layout());


 W.U.Setview(walkway,mainBlock,'html');
 initMain();
}


 W.U.Notifications = {init:init};

})(wowrol);