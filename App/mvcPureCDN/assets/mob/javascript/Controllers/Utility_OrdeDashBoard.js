/*
* 
*/
; (function(W){
   "use strict";
 var bank=[]; 
function AddInBank(result){
TranseData.result=result;
     for(var q in result){
    
     bank[result[q].oid]=result[q];
    }   
   
}
function GetData(ID){
  var defaultdata={};
  if(ID!=0){
      defaultdata=bank[ID];
  }

  return defaultdata;
}
//--
var  Mfiatr={type: {}, status: {}, fromDate: ['','',''],toDate: ['','','']};
var TranseData={
          
                ifo: {AppId:W.A.page.AppId, Afiatr: {}, Mfiatr: Mfiatr },  //info
               bypass: 0,
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 20,  //pagesize
                tp: 1,  //total page
                tr: 1,  //total result
                pgd: 1   //paged
            };

//--
function BlockBackBinds(args){
    var defaultdata={title:'',btntext:'',submitshow:false,submitcallback:null};
    args = W.U.extend(defaultdata, args);

    var Title=W.U('[data-jqid="OrdeDashBoardbackTitle"]',W.U.id('block.OrdeDashBoardback'))[0]; 
  W.U.SetText(Title,args.title,'html');
    var submit=W.U('[data-jqid="OrdeDashBoardbacksubmit"]',W.U.id('block.OrdeDashBoardback'))[0];
  if(args.submitshow){
  
    submit.onclick=args.submitcallback;
    submit.style.display="block";
      W.U.SetText(submit,args.btntext,'html');   
  }else{
        submit.style.display="none";
  }
}

function ShowFilterBlock(){

var filterBlock=W.U.Rander(W.T.OrdeDashBoard.filterBlock(TranseData));



BlockBackBinds({title:'Filter',btntext:'Apply Filter',submitshow:true,submitcallback:ApplyFilter});
W.U.attrclick('[data-listingBtn="clear"]',filterBlock[0],clearFilter);
W.U.attrclick('[data-filterli]',filterBlock[0],onfilterliclick); 
W.U.attrclick('[data-removefilter]',filterBlock[0],onRemoveActivefilter);


 W.U.Setview(W.U.id('OrdeDashBoardback'),filterBlock,'html');
 var event = jQuery.Event("show");
                event.id = 'OrdeDashBoardback';
$(W.U.id('block.OrdeDashBoardback')).parent().triggerHandler(event);

    }
function ApplyFilter(){
  

    TranseData.bypass = 1;
   TranseData.pgd = 0;
    var event = jQuery.Event("hide");
                event.id = 'OrdeDashBoardback';
     $(W.U.id('block.OrdeDashBoardback')).parent().triggerHandler(event); 

        LoadData();
}
function clearFilter(){
   
    TranseData.ifo.Afiatr={};
  TranseData.bypass = 1;
   TranseData.pgd = 0;
       var event = jQuery.Event("hide");
                event.id = 'OrdeDashBoardfront';
     $(W.U.id('block.OrdeDashBoardfront')).parent().triggerHandler(event); 
      LoadData();
}
function onfilterliclick(){
   var attrValue=JSON.parse(this['data-filterli']);
   var checkbox=this;
 var obn=attrValue.name;
   var obv=attrValue.value;  // console.log(TranseData.ifo);
   if(typeof (obn)!='undefined'&&typeof (obv)!='undefined'&&this.checked == true){
      if(!TranseData.ifo.Afiatr.hasOwnProperty(obn)){
     var newValue={};
        newValue[obn]=[obv];
        W.U.extend(TranseData.ifo.Afiatr,newValue);
   }else{
      
      innerUpdate();
   }  
   }else{
        innerUpdate();
   }
 onfilterUpdate();

 function innerUpdate(){
      var has=0,Value=  TranseData.ifo.Afiatr[obn],index=0;
    
       for(var q in Value){
           if(Value[q]==obv){
            has=1;index=q;
            break;   
           }
    
       }
       if(has==0){
       Value.push(obv);    
       }else{
           Value.splice(index,1); 
       }


       if(Value.length==0){
          delete(TranseData.ifo.Afiatr[obn]);
       }
 }
}  

function onfilterUpdate(){

    var activefilterBlock=W.U.id('activefilterBlock');
  var filterStrip=W.U.Rander(W.T.OrdeDashBoard.filterStrip(TranseData.ifo.Afiatr));

  W.U.attrclick('[data-removefilter]',filterStrip[0],onRemoveActivefilter);
   W.U.Setview(activefilterBlock,filterStrip,'html');
}

function onRemoveActivefilter(){
      var attrValue=JSON.parse(this['data-removefilter']);
      var Af=TranseData.ifo.Afiatr;
      var index_q=0,index_p=0,match=0;
      for(var q in Af){
       for(var p in Af[q]){
           if(attrValue[0]!='price'){
          if((q==attrValue[0])&&(Af[q][p]==attrValue[1])){
            
             index_q=q; index_p=p;match++;
          }

          }else{
             delete(TranseData.ifo.Afiatr[attrValue[0]]);  
          }
      }   
      }
    //  console.log(attrValue);
    //  console.log( Af[index_q]);    console.log( Af);
   //   console.log( index_q); console.log(index_p);
   //   console.log(TranseData.ifo.Afiatr[index_q]);

      if(match>0){
  TranseData.ifo.Afiatr[index_q].splice(index_p,1); 
          if( Af[index_q].length==0){
           delete(TranseData.ifo.Afiatr[index_q]);
          }
      }
      TranseData.bypass = 1;
   TranseData.pgd = 0;
     var event = jQuery.Event("hide");
                event.id = 'OrdeDashBoardfront';
     $(W.U.id('block.OrdeDashBoardfront')).parent().triggerHandler(event); 
      LoadData();

}
//--
//--Order status change
function onOrderChangeStatusAsk(){
  var Id= this['data-orderchangestatusask'];  
  var data=GetData(Id);
  console.log(data);
}


//--
function LoadData(){
 var walkwayNode=getwalkwayNode();
 var walkway=walkwayNode.main;
 var walkwayLoading=walkwayNode.Loading;
 var Tdata=TranseData;    

    if((W.F.ScrollLoadAllow()||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
          var form = 'paging',
     f_value = { name: 'dashboard', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

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
                TranseData.fr = 1;
                        // console.log(T)
                $(walkwayLoading).html( W.T.blockLoading());
                     
                    },
                    success: function (data) {
                 $(walkwayLoading).html('');
       TranseData.fr = 0;

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
   var Hret = ret.mistake;
                   //     console.log(Hret);

                        }
                        if (ret.state == 200) {
                var Hret = ret.response;
                Tdata.ifo.Mfiatr=Hret.mainFilter;
         if(typeof(Hret.ActiveFilter.length)=='undefined'){
                  Tdata.ifo.Afiatr=Hret.ActiveFilter;
                }
                   TranseData.ps = Hret.pagesize;
                  TranseData.tp = Hret.totalpage;
                   TranseData.pgd = Hret.paged;
                   AddInBank(Hret.result);

                  CreateTable();
                 //  SetPaging();

                        }
                        
                    }

                }); 

   }   

}
function getwalkwayNode(){
    var Node=W.U.id("OrdeDashBoardfront").childNodes;
  
    return {main:Node[1],
            Loading:Node[2],
            submitLoading:Node[0],
            paging:Node[3]};
}

function CreateTable(){  console.log(TranseData);
    // field for table data
            var tBody = [];
            var header =['information','order','date','status'];
            var setting = {
                rowcheck: false,
                type: 'orders',
                paging: true,
                name: 'demotable'
            };
            //
 var onedit=function(){};
var ondelete=function(){};
var onpaging=function(){};
           setting.paging=   (TranseData.tp>1)?true:false;


 for (var i = 0;i<TranseData.result.length; i++) {
                        var qData = TranseData.result[i];


   tBody[i] = {
                            id: qData.oid,
                            information:W.T.OrdeDashBoard.information(qData),
                            order: 'order_'+qData.oid,
                            status:W.T.OrdeDashBoard.status(qData),
                            date: qData.date
                        };

                    }



            var tabledata = {
                header: header,
                body: tBody,
                setting: setting,
                onedit: onedit,
                ondelete: ondelete,
                onpaging:onpaging,
                pagingData:{tp:TranseData.tp,pgd:TranseData.pgd,ps:TranseData.ps,sstr:TranseData.sstr}
            }; 
          
               //  console.log(tBody);
         var tablestrip = '<div class="block _bdy bg_0 _B-gray  ">' + W.T.Table(tabledata) + '</div>';
//

InsertTableStrip(tablestrip);



 
}
function InsertTableStrip(tablestrip){
 var walkwayNode=getwalkwayNode();
 var walkway=walkwayNode.main;

 var mainBlock=W.U.Rander(tablestrip);
 W.U.attrclick('[data-onorderchange]',mainBlock[0],onOrderChangeStatusAsk);

 console.log(tablestrip);

 W.U.Setview(walkway,mainBlock,'html');   
}
//--
function MainInit(){
   TranseData.pgd=1;
    TranseData.tp=1;
     TranseData.ifo.Afiatr = {};
        TranseData.bypass = 1;
        LoadData();  
}

function init(walkway){
 var mainBlock=W.U.Rander( W.T.OrdeDashBoard.Layout());
   W.U.attrclick('[data-filterbtn]',mainBlock[0],ShowFilterBlock);
   W.U.Setview(walkway,mainBlock,'html');
 MainInit();
}  
//--
 W.U.OrdeDashBoard={init:init};



})(wowrol);