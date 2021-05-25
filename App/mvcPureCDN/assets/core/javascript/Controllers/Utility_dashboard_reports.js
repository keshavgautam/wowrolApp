; (function(W){
   "use strict";


/*
*/
function LoadData(f_value){


       var loadingId= W.F.Load('loadStoreProgressdata',f_value);
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      
     
      W.A.page.AppView.reports=data;
     

       W.U.Pager.togglePage(W.I.dp, W.I.dpbf);   
       
       
        W.U.ccbk.Run(W.U.Page,'KK_update_reportIconcard' ,data);
       });
     W.U.ccbk.Run('load'+loadingId );   
}

/*

*/
function reportfilter(block){
      
 

 return W.T.dashboardreports.reportfilterbody();  
};

/*

*/
function reportChartcard(){



}


/*

*/
function reportIconcard(){
        var report=W.A.page.AppView.reports;
var Currency=W.A.page.AppView.EntityStripdata.currency;

    if(W.U.isOK(report)){
    //  var mainBlock=W.U.Rander(W.T.dashboardreports.Iconcard(report,Currency));   
  var IconcardModule = W.KK.createModule({
   onAfterUpdate:function(){
       

   },
   name:'reportIconcard',
   controller:function () {
 var report=W.A.page.AppView.reports;
    this.start_time=new Date(report.start_time*1000).format('dddd, mmmm d, yyyy');
    this.end_time=new Date(report.end_time*1000).format('dddd, mmmm d, yyyy');
    var avarage_perioud=0;
    var OneHour=60*60,OneDay=24*OneHour,avarage=0,avarage_text='help_52',
    difference=(W.U.intval(report.end_time)-W.U.intval(report.start_time));
 avarage_perioud=( difference>(7*OneDay))?(( difference>(30*OneDay))?(( difference>(365*OneDay))?3:2):1):0;



    this.Y=[];
    this.Y.push({count:W.U.PutCurrencyStr(Currency,report.total_sales),text: W.U.GetText('help_51')});


     switch(avarage_perioud){
     case 0:
     avarage=W.U.intval(report.total_sales)/7;avarage_text='help_57';
     break;
    case 1:
     avarage=W.U.intval(report.total_sales)/7;avarage_text='help_57';
     break;
    case 2:
     avarage=W.U.intval(report.total_sales)/30;avarage_text='help_57';
     break;
    case 3:
    avarage=W.U.intval(report.total_sales)/12;avarage_text='help_52';
     break;
 }
     this.Y.push({count:W.U.PutCurrencyStr(Currency, avarage),text:W.U.GetText(avarage_text)});

    this.Y.push({count:report.total_orders,text:W.U.GetText('help_53')});

    report.total_shipping_charge=W.U.intval()+W.U.intval(report.total_shipping_charge);
    this.Y.push({count:W.U.PutCurrencyStr(Currency,report.total_shipping_charge),text:W.U.GetText('help_54')});
    this.Y.push({count:W.U.PutCurrencyStr(Currency,report.total_discount),text:W.U.GetText('help_55')});
    this.Y.push({count:report.total_product_sold,text:W.U.GetText('help_56')});

     
},
   render:W.T.dashboardreports.Iconcard
});

    W.KK.InsertComponent(this.Node,IconcardModule,'html');
    }
}

/*

*/

function init(walkway){
var Jid0,Jid1;

Jid0=W.U.J(reportIconcard,{});
Jid1=W.U.J(reportChartcard,{});
 var report=W.A.page.AppView.reports;
W.U.intentdata.add('dashboard_reports.0',report);


  W.U.Pager.addblockdata({ name:'reportfilter', htmlStr:reportfilter});

 var mainBlock=W.U.Rander(W.T.dashboardreports.Layout(Jid0,Jid1));

  W.U.Setview(walkway,mainBlock,'html');



}


W.U.dashboardreports={init:init,LoadData:LoadData};



      })(wowrol);