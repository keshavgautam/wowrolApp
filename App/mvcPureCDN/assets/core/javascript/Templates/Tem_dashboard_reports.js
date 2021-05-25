; (function(W){
   "use strict";




/**/
function reportfilterbody(){
    
    var Header  =W.T.DashbordFormHeader({titleText:'text_18',submitbutton:false});
    var BootstrapModal = W.KK.createModule({
   controller:function () {
 var report=W.A.page.AppView.reports;
    this.start_time=Date.now();
    this.end_time=Date.now();;
var OneHour=60*60,OneDay=24*OneHour;


this.oneYear=function(){
     this.start_time= W.U.time();
    this.end_time= W.U.time();

   this.start_time=(this.start_time-(365*OneDay));
    this.loadFilter();
}
this.lastmonth=function(){
     this.start_time= W.U.time();
    this.end_time= W.U.time();
    this.start_time=this.start_time-(60*OneDay);
   this.end_time=this.end_time-(30*OneDay);  this.loadFilter();
}
 this.thismonth=function(){
     this.start_time= W.U.time();
    this.end_time= W.U.time();
    this.start_time=this.start_time-(30*OneDay);  this.loadFilter();
}
this.lastsevenDays=function(){
     this.start_time= W.U.time();
    this.end_time= W.U.time();
 this.start_time=this.start_time-(7*OneDay);  this.loadFilter();
}    
this.loadFilter=function(){
   W.U.dashboardreports.LoadData({start_time:this.start_time,end_time: this.end_time,object:0});
}


},
   render:function(){

    var ch=' <div class="block _Bdy" >'
    +'<div class="block _Bdy fs14" >text_18</div>'
    +'<div class="block _Bdy fw-b" >'
    +'<a href="javascript:void(0);" class="block _Bdy no-t-deco hov" kk-click="this.oneYear"  >text_14</a>'
    +'<a href="javascript:void(0);" class="block _Bdy no-t-deco  hov" kk-click="this.lastmonth" >text_15</a>'
    +'<a href="javascript:void(0);" class="block _Bdy no-t-deco  hov" kk-click="this.thismonth" >text_16</a>'
    +'<a href="javascript:void(0);"  class="block _Bdy no-t-deco  hov"   kk-click="this.lastsevenDays"  >text_17</a>'
    +'</div>'
    +'</div>';
    
    return ch;

}
});


      var Jid= W.U.J(function () {
 
     
  W.KK.InsertComponent(this.Node,BootstrapModal,'html');

     }, {});
     var ch='<div class="block  _bdy bg_0 bs-1"  data-junction="'+Jid+'"  ></div>';
     return   W.T.DashbordFormWrap(Header, ch);  
}


/*
*/
function Iconcard(x,Currency){

  var ch='<div class="block">'
   +'<div class="block mb_10 _Bdy bg_6 bs-1 ul ul-menu"><div class="li _bdy"><span class="fw-b">From</span> {{this.start_time}}</div><div class="li _bdy"><span class="fw-b">To</span> {{this.end_time}}</div></div>'

   +'<div class="block"><div class="block w4 col4 _bdy   "    kk-repeat="data in this.Y" ><div class="block  bg_0 bs-0 _bdy "><div class="block m_b10 fw-b al-c">{{data.count}}<h3></h3></div><div class="block m_b10 fw-b al-c">{{data.text}}</div></div></div></div>'



   +'</div>';  
     return ch;
}

/*
*/
function Layout (Jid0,Jid1){
    var ch='',page='';
       var ch='<div class="block">';
         ch+='<div class="block  _bdy bg_0 bs-1"><div class="block "><div class="left"><h3 style="margin-top: 3px;">text_12</h3> </div><div class="right"><a href="javascript:void(0);" class="btn btn-xs btn-primary "  data-pagerbtn="'+W.I.dp+':reportfilter:dashboard_reports:0"  >text_13</a></div> </div><div class="block "> <p class="block _bdy fg_4 fs-italic fs11">help_50</p></div></div>';
         
          ch+='<div class="block bg_0 bs-1" >';
          ch+='<div class="block "  data-junction="'+Jid0+'" ></div>';
          ch+='<div class="block "  data-junction="'+Jid1+'"  ></div>';
           ch+='</div></div>';

 if(W.I.wf=="mob"){
page+=ch;
   
 }

 if(W.I.wf=="web"){
var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:ch}],
    target:0,
    page:true,
    minheight:'auto'
};
 page+=  W.T.Pager(setting);
   
 }

    return page;
}



    W.T.dashboardreports={
     Layout:Layout,
     Iconcard:Iconcard,
     reportfilterbody:reportfilterbody
    
    };


      })(wowrol);