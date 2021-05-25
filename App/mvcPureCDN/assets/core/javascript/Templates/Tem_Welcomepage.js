/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";




function NewLaunch(){
    var ch='<div class="block bs-1" >'
    +'<div class="w10"><div class="block _Bdy bg_7 fw-b bs-1" ><span>text_419</span><span>{{ this.locationName}}</span></div></div><div class="w2"><a href="javascript:void(0);" class="block  bg_7 fw-b bs-1 _bdy hov al-c" kk-click="this.wherebtnclick()" ><span kk-show ="(this.location_info.location.id==0)">'+W.T.SVG('place',21,'#f1f5fc')+'</span><span kk-show ="(this.location_info.location.id!=0)">'+W.T.SVG('location_done',21,'#f1f5fc')+'</span></a></div></div>'
    //---
    +'<div class="po-re" ><div class="block po-ab bg_0"  kk-show ="(this.whereblockshow==1)"   >'
    +'<div class="block po-ab bg_0 bs-0 z-1"  kk-show ="(this.whereblockshow==1)" ><div class="block "   >'

+'<div class="block po-re"  kk-show ="(this.location_info.location.id==0)"  ><div class="block  po-re "><div class="di-td "><a href="javascript:void(0);" class="block _Bdy al-c"    >'+W.T.SVG('place',24,'#f1f5fc')+' </a></div><div class="di-td w-100-010 vl-t"><div class="block  _Bdy"> <a href="javascript:void(0);" class="block btn" kk-click="this.findlocation()"  >Where ?</a></div></div></div></div>'

+'<div class="block po-ab bg_0 bs-0 z-1" kk-show ="(this.location_info.location.id!=0)" ><div class="block  po-re "><div class="di-td "><a href="javascript:void(0);" class="block _Bdy al-c"    >'+W.T.SVG('place',24,'#f1f5fc')+' </a></div><div class="di-td w-100-010 vl-t"><div class="block _Bdy"> <a href="javascript:void(0);" class="block btn"  kk-click="this.findlocation()" >{{this.locationName()}}</a></div></div><div class="di-td  vl-t"><div class="block _Bdy"> <a href="javascript:void(0);" class="block btn btn-xs"  kk-click="this.LocationRemove()"  >'+W.T.SVG('cross',14,'#f1f5fc')+' </a></div></div></div></div>'

+'</div></div>'
+'</div></div>'

    //---
      +'<div class="block bs-1 bg_0" kk-whirlgig="this.Whirlgig" ></div>'
 //--->>
     +' </div>';
    return ch;
}





  W.T.Welcomepage=  {
      
      NewLaunch:NewLaunch


     };
  

 } )(wowrol);