/*
* 
*/
; (function(W){
   "use strict";

     var header= function(filtername,data){
        var ch=''; 
 W.U.console(data);
  if(W.I.wf=='mob'){
      ch=    W.T.ActivityHeader({ 
    back:'<a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="'+data.pager+':'+data.backblock+'"   >'+W.T.SVG('left',24,'#f1f5fc')+' </a>',
            Title: '<span class="block header-cell fg_6 al-l" ><span class="fw-b al-c tt-c"><span class="vl-sp"  >text_162</span></<span></span>',
   
         RightLink:'<div class="di-td"><a href="javascript:void(0);" class="block header-link-btn"  data-btn="clearAllFilter" >text_163</a></div><div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn"  data-btn="ApplyFilter" >text_164</a></div>'
            });
    }

      if(W.I.wf=='web'){
          switch(filtername){
          case 'dashboardproduct':
         case 'marketstorefilter':
         case 'dashboard_orders':
              ch=    W.T.ActivityHeader({ 
    back:'<a href="javascript:void(0);" class="block header-link-btn" data-pagerbtn="'+W.I.dp+':'+W.I.dpbf+'"   >'+W.T.SVG('left',24,'#f1f5fc')+' </a>',
            Title: '<span class="block header-cell fg_6 al-l" ><span class="fw-b al-c tt-c"><span class="vl-sp"  >text_162</span></<span></span>',
   
         RightLink:'<div class="di-td"><a href="javascript:void(0);" class="block header-link-btn"  data-btn="clearAllFilter" >text_163</a></div><div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn"  data-btn="ApplyFilter" >text_164</a></div>'
            });
         break;   
         default:
          ch= '<div class="block _Bdy"><div class="di-td"><span class="w212   fg_4 ff_5  tt-c truncate ">text_165</div><div class="di-td"><a href="javascript:void(0);"  class="btn "  data-btn="ApplyFilter" >text_164</a></div><div class="di-td"><a href="javascript:void(0);" class="btn "  data-btn="clearAllFilter" >text_163</a></div></div>';    
          }
   
    }
return ch;
     }


   W.T.filter={header:header};

})(wowrol);