 ;(function (W) {
     "use strict";
   var   checkInListInit=0;
   var page=W.A.page;
   var TranseData={
                ifo: { AppId: page.AppId,store_id:page.AppView.EntityStripdata.eid },  //info
                sS: {},  //server setting we be retrivre after LoadTableData
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 5,  //pagesize
                tp: 1,  //total page
                pgd: 1   //paged
            };



function LoadData(Tdata){
       var walkwayNode=getwalkwayNode();
   var walkway=walkwayNode.main;
   var walkwayLoading=walkwayNode.Loading;
       if((Tdata.bypass==5||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
          var form = 'paging',
     f_value = { name: 'StoreCheckInList', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

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
                  Insertlist(Hret.result,Tdata.bypass);
            
                  Tdata.bypass = 0; 
                        }
                        
                    }

                }); 

   }   
}
//--walkway
function getwalkwayNode(){
 var Node=W.U.id("storecheckinListwalkway").childNodes;
  
    return {main:Node[1],
            Loading:Node[2],
            submitLoading:Node[0],
            paging:Node[3]};
}

function Insertlist(result,bypass){
   var walkwayNode=getwalkwayNode();
   var walkWay=walkwayNode.main;


   var mainBlock=W.U.Rander(W.T.StoreCheckInList.list(result));
  switch(bypass){
     case 1://html
 W.U.Setview(walkWay,mainBlock,'html');
        break;
        case 0://append
 W.U.Setview(walkWay,mainBlock,'append');
        break;
      

  } 
      
}



//--walkway
function checkInListShown(){
    console.log('checkInListShown');

    if(TranseData.pgd==1){
    TranseData.bypass = 1; 
     LoadData(TranseData);
 }
}









  

W.U.StoreCheckInList={checkInListShown:checkInListShown};

 })(wowrol);