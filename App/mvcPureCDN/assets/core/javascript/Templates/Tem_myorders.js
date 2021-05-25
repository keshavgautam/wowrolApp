/*
* 
*/
; (function(W){
   "use strict";

    var Status= ['Processing', 'Dispatched', 'Pending', 'Ready to Collect','Cancelled by buyer','Cancelled by store','Delivered','Failed','Return started','Replacement started','Cancelled return/replacement',' returned',' replaced','Completed with Good shopping experience','Completed with Bad shopping experience'];
  var Type= ['home delivery', 'self collect', 'inquiry', 'booking'];


     var t={
       t0:function( x,bypass){
          var ch='';
      
       if(bypass==1){
 if(x.length==0){
 
 ch+='<div class="block _bdy al-c fw-b bg_0 _B-gray">help_21</div>';  
  }  
          }
  if(x.length>0){
         ch+=t.t00(x);      
          }

          return ch;
       },
       t00: function (x) {
     var ch = '<div class="block ul bg_0"> '; 
            for(var q in x){
                    ch+='<div class="li bs-1 _bdy">'+t.information(x[q])+'</div>';
                
            }
         
    ch+='</div>';
            return ch;

        },
         information:function(x){
    var URL=W.U.URL;
      var d_type = 'Via Home Delivery';
        var p_type = 'via Cash on Delivery';
        if (x.type == 1) { d_type = 'Via Self Collect'; p_type = 'via Cash on Collection'; }
var total=x.currency+' '+(x.total).toFixed(2);
 var moredata=[];
 moredata.push('<span class="span fg_4 ff_2"> <time class="timeago" datetime="'+x.date+'" title="'+x.date+'"></time> </span>');
 moredata.push('<span class="span fg_0">Ordered</span>');
   moredata.push('<div class="block ma-l-4"><span class="fs13">'+W.T.SVG('cart',14,'#1274c0')+' '+total+'  <small>'+p_type+'</small> </span ></div>');
   moredata.push('<div class="block ma-l-4"> <span class="fs13">'+W.T.SVG('Shippping',14,'#1274c0')+' <small> '+d_type+'</small> </span></div>');
  moredata.push('<div class="block _bdy "> <div class="ul ul-menu"> <div class="li "><a href="'+URL('')+'orderdetails?id='+x.oid+'" role="linkbutton">View Order Details </a></div></div></div>');
 
  moredata.push('<div class="block" data-nodeid="orderstatusblock'+x.oid+'">'+t.status(x)+'</div>');
   

var ch='<div class="block">'
+'<div class="block _bdy "> <div class="ul ul-menu"><div class="li "> Order </div>  <div class="li fw-b ma-l-8 bg_4 fg_3" style="padding: 0px 9px;">'+x.oid+'</div> <div class="li ma-l-8">at</div> </div> </div>'

+W.T.C.C2_EntityStrip(x.sESd,{moredata:moredata})+

'</div>';  


      return ch;
         
     },
     status:function(x){


      var Cancelbutton='';  var Completedbutton='';
  if(x.status==0){
  Cancelbutton='<a href="javascript:void(0);"  data-pagerbtn="'+W.I.dp+':orderchangestatus:myorders:'+x.oid+':4"  ><span>Cancel Order</span></a>';     
  }
  if(x.status==6){
 if(x.retA==1){
 Cancelbutton='<a href="javascript:void(0);" data-onorderchangeask="'+x.oid+':8"  data-pagerbtn="'+W.I.dp+':orderchangestatus:myorders:'+x.oid+':8"   ><span>Replace</span></a>';      
  }else if(x.retA==2){
  Cancelbutton='<a href="javascript:void(0);" data-onorderchangeask="'+x.oid+':9"  data-pagerbtn="'+W.I.dp+':orderchangestatus:myorders:'+x.oid+':9"   ><span>Return</span></a>';     
  }else{
   Cancelbutton='Return & Replacement not supported for this order.';  
  }
  Completedbutton='<div class="li ma-l-4"><a href="javascript:void(0);" data-pagerbtn="'+W.I.dp+':orderchangestatus:myorders:'+x.oid+':13"   ><span>'+Status[13]+'</span></a></div><div class="li ma-l-4"> <a href="javascript:void(0);"  data-pagerbtn="'+W.I.dp+':orderchangestatus:myorders:'+x.oid+':14"    ><span>'+Status[14]+'</span></a></div>'; 
  
        
  }
    
     var ch='<div class="block _bdy " > <div class="ul ul-menu"> <div class="li ma-l-4">Status</div> <div class="li ma-l-8 "><span class="fw-b tt-c">'+Status[x.status]+'</span>&nbsp;&nbsp;&nbsp; </div> </div><div class="ul ul-menu"> <div class="li ma-l-4">'+ Cancelbutton+'</div> '+Completedbutton+' </div></div>';

   

     return ch;

    },
    StatusChangeReturnForm:function(x,action){
        var ch='<div class="block ">';
      ch+='<div class="block b_gbl bg_0 m_b5"><div class="block _bdy "><span class="span"> Order Id</span>&nbsp;&nbsp;&nbsp;<span class="fw-b tt-c">'+x.oid+'</span></div><div class="block _bdy "><span class="span">text_159</span>&nbsp;&nbsp;&nbsp;<span class="fw-b tt-c">' +  Status[x.status] + '</span></div></div>';
     var retrunReasone='';
     if(action==8||action==9){
    retrunReasone=' <div class="block _bdy fw-b"><div class="form-piece"> <label>why are you returning this</label> <select name="reason" class="form-mold"><option value="1" selected="selected" >Brought by mistake</option><option value="2">Order items conditions are not as described in listing</option></select> </div></div>';     
     }    
  if(action==4){
    retrunReasone=' <div class="block _bdy fw-b"><div class="form-piece"> <label>why are you canceling this</label> <select  name="reason" class="form-mold"><option value="0" selected="selected" >ordered by mistake</option></select> </div></div>';     
     } 

          ch += '<div class="block b_gtl  bg_0" ><form name="nextorderstatus'+x.oid+'" onsubmit="return false;"><input type="hidden" name="oid" value="'+x.oid+'"><input type="hidden" name="nextorderstatus:0" value="'+action+'">'+retrunReasone+'<div class="block "> <textarea class="form-mold textarea no-border " name="status_note" placeholder="Addtional Note" rows="3"></textarea> </div><div class="block " data-help="spreadform"></div></form></div>';
 ch+='</div>';

        return ch;
    }
   };

function OrderChangeStatusLayout(block){
   W.U.console(block);
    var  triggerdata=block.triggerdata,
    id=block.objectdata.id,
    action=triggerdata[4],
    x=block.objectdata;

 var Header  =W.T.DashbordFormHeader({titleText:'titleText',sublitText:'done',submitbuttonAttrstr:' data-UpdateStatusChangebtn="'+x.oid+':'+action+'" '});
   var ch='<div class="block ">';
      ch+='<div class="block b_gbl bg_0 m_b5"><div class="block _bdy "><span class="span"> Order Id</span>&nbsp;&nbsp;&nbsp;<span class="fw-b tt-c">'+x.oid+'</span></div><div class="block _bdy "><span class="span">text_159</span>&nbsp;&nbsp;&nbsp;<span class="fw-b tt-c">' +  Status[x.status] + '</span></div></div>';
     var retrunReasone='';
     if(action==8||action==9){
    retrunReasone=' <div class="block _bdy fw-b"><div class="form-piece"> <label>why are you returning this</label> <select name="reason" class="form-mold"><option value="1" selected="selected" >Brought by mistake</option><option value="2">Order items conditions are not as described in listing</option></select> </div></div>';     
     }    
  if(action==4){
    retrunReasone=' <div class="block _bdy fw-b"><div class="form-piece"> <label>why are you canceling this</label> <select  name="reason" class="form-mold"><option value="0" selected="selected" >ordered by mistake</option></select> </div></div>';     
     } 

          ch += '<div class="block b_gtl  bg_0" ><form name="nextorderstatus'+x.oid+'" onsubmit="return false;"><input type="hidden" name="oid" value="'+x.oid+'"><input type="hidden" name="nextorderstatus:0" value="'+action+'">'+retrunReasone+'<div class="block "> <textarea class="form-mold textarea no-border " name="status_note" placeholder="Addtional Note" rows="3"></textarea> </div><div class="block " data-help="spreadform"></div></form></div>';
 ch+='</div>';

      var page;
      if(W.I.wf=='mob'){
     page= '<div class="block ">'+W.T.DashbordFormWrap(Header, ch)+'</div>';    
      }else{
       page= '<div class="block _bdy">'+W.T.DashbordFormWrap(Header, ch)+'</div>';   
      }
    return  page;  
}


function Layout(){


    var JId=W.U.J(function(){
           var PagingData=   W.U.myorders.PagingData;

   PagingData.Node=  this.Node;     
   W.U.paging.init(PagingData);
    },{});


    var ch='<div class="block">';
  ch+='<div class="block _Bdy bg_6 bs-1-bottom "><h3>text_264</h3></div>';
    ch+='<div class="block" data-junction="'+JId+'"></div>';

    ch+='</div>';
    return ch;
}


  W.T.myorders = {
  Layout:Layout,
  t:t,
  OrderChangeStatusLayout:OrderChangeStatusLayout   
 };





   
  
})(wowrol);