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
     ch+='<div class="block _bdy al-c fw-b bg_0 _B-gray">You have not any Orders. </div>';  
  }  
          }
  if(x.length>0){
         ch+=t.t00(x);      
          }

          return ch;
       },
       t00: function (x) {
     var ch = '<div class="block ul hover bg_0"> '; 
            for(var q in x){
                    ch+='<div class="li _B-gray _bdy">'+t.information(x[q])+'</div>';
                
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
  Cancelbutton='<a href="javascript:void(0);" data-onorderchangeask="'+x.oid+':4"  ><span>Cancel Order</span></a>';     
  }
  if(x.status==6){
 if(x.retA==1){
 Cancelbutton='<a href="javascript:void(0);" data-onorderchangeask="'+x.oid+':8"  ><span>Replace</span></a>';      
  }else if(x.retA==2){
  Cancelbutton='<a href="javascript:void(0);" data-onorderchangeask="'+x.oid+':9"  ><span>Return</span></a>';     
  }else{
   Cancelbutton='Return & Replacement not supported for this order.';  
  }
  Completedbutton='<div class="li ma-l-4"><a href="javascript:void(0);" data-onorderchangeask="'+x.oid+':13"  ><span>'+Status[13]+'</span></a></div><div class="li ma-l-4"> <a href="javascript:void(0);" data-onorderchangeask="'+x.oid+':14"  ><span>'+Status[14]+'</span></a></div>'; 
  
        
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

     function Layout(){

    
 var front='<div class="block"><div class="hide"><a class="hide" data-openbtn="OrdeDashBoard" data-btnid="back"  ></a></div><div class="block" data-nodeid="OrdeDashBoardfront" ><div class="block"></div><div class="block"></div><div class="block"></div><div class="block"></div></div></div>';

 var back=W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="OrdeDashBoard" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><span class="fw-b al-c tt-c"><span class="vl-sp" data-jqid="OrdeDashBoardbackTitle" >View</span></<span></span>',
                done: '<div class="li b_gll tt-c" ><a href="javascript:void(0);"  data-jqid="OrdeDashBoardbacksubmit" style="display:none;"  ><span>Spread</span><i class="badge _gbtn"></i> </a></div>'
            }),'<div class="block "  data-nodeid="OrdeDashBoardback" ></div>');
   
var blockList=[front,back];
var blockName=["OrdeDashBoardfront","OrdeDashBoardback"];
var setting ={
    name:'OrdeDashBoard',
    target:'OrdeDashBoardfront',
    page:true,
    minheight:'auto'
    var bank=[]; 
function AddInBank(result){
TranseData.result=result;
     for(var q in result){
    
     bank[result[q].id]=result[q];
    }   
   
}
function GetData(ID){
  var defaultdata={};
 
    for (var q in TranseData.result) {

                if (TranseData.result[q].oid == ID) {
                defaultdata = TranseData.result[q];
                    break;
                }

            }
  return defaultdata;
}
var TranseData={
          
                ifo: { },  //info
               bypass: 0,
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 3,  //pagesize
                tp: 1,  //total page
                tr: 1,  //total result
                pgd: 1   //paged
            };
function updateView(value) {
            var match = 0;
            for (var q in TranseData.result) {

                if (TranseData.result[q].oid == value.oid) {
                    match++;
  // unshift() method adds one or more elements to the beginning of an array
                   TranseData.result.splice(q, 1);

                }

            }

            if(TranseData.result.length>0){
             // unshift() method adds one or more elements to the beginning of an array 
            TranseData.result.unshift(value);   
            }else{
              
               TranseData.result.push(value);
              


            }
            



          // console.log(match);   console.log(value);
       console.log( TranseData.result);

        }


var Reason=['Ordered by mistake','Brought by mistake','Order items conditions are not as described in listing'];
//----
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
function onOrderChangeStatusAsk(){
     var str= (this['data-onorderchangeask']).split(':');  
     var Id=str[0],action=parseInt(str[1]);

  var data=GetData(Id); 
   console.log(data);   console.log(Id);
 var  BlockBackData={title:'Status Change',btntext:'Done'};  
  switch(action){
   case 4://cancel
   BlockBackData={title:'Cancel Order',btntext:'Done'};  
   break;
   case 8://replce
  BlockBackData={title:'Replace Order',btntext:'Done'};  
 
   break;
   case 9://return
  BlockBackData={title:'Return Order',btntext:'Done'};  

   break;
    case 13://replce
  BlockBackData={title:'Feedback',btntext:'Done'};  
 
   break;
   case 14://replce
  BlockBackData={title:'Feedback',btntext:'Done'};  
 
   break;

  }
  var mainBlock=W.U.Rander(W.T.myorders.t.StatusChangeReturnForm(data,action));

BlockBackBinds({title:BlockBackData.title,btntext:BlockBackData.btntext,submitshow:true,submitcallback:function(){
     var f_value = W.F.walk_way_all(['nextorderstatus:0'],'nextorderstatus'+data.oid+'');

     if(f_value['nextorderstatus:0']!=''){
        W.U.ConfirmDialog({Tilte:'Confirm',msg:'Do you want to Save this change for this order. there is no further Undo.',YesText:'Proceed',NoText:'Cancel',YesCallback:function(){
           ApplyStatusChange.bind(data)();
           
           }}); 
     }else{
         
     }




}});

//--


   W.U.Setview(W.U.id('OrdeDashBoardback'),mainBlock,'html');
   //--

 var event = jQuery.Event("show");
                event.id = 'OrdeDashBoardback';
$(W.U.id('block.OrdeDashBoardback')).parent().triggerHandler(event);

}
function ApplyStatusChange(){
    var data=this;
    console.log(data);
 var f_value = W.F.walk_way_all(['nextorderstatus:0','oid','status_note'],'nextorderstatus'+data.oid+'');
 var nstatus=f_value['nextorderstatus:0'];
 if(nstatus==4||nstatus==8||nstatus==9){
      var f_value1 = W.F.walk_way_all(['reason'],'nextorderstatus'+data.oid+'');
    console.log(f_value1);
      f_value.status_note='Reason &nbsp;=&nbsp; '+Reason[parseInt(f_value1.reason)]+' &nbsp;&nbsp;&nbsp;'+f_value.status_note;

 }


    var formData = {
                    form: 'nextorderstatus',
                    f_value:f_value
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                 W.U.madianLoading('show');
             $(W.U.id('appModal')).modal('hide');
                    },
                    success: function (data) {
                        W.U.madianLoading('hide');
           var ret = JSON.parse(data);
         
                        if (ret.state == 500) {
 W.F.Toast({msg:'Action Not Saved',theme:'error'});
  
                        }
                        if (ret.state == 200) {
 W.F.Toast({msg:'Action done'});
           updateView(ret.response[0]);
     UpdateOrderStatusBlock(ret.response[0]);
           

          var event = jQuery.Event("hide");
                event.id = 'OrdeDashBoardfront';
$(W.U.id('block.OrdeDashBoardfront')).parent().triggerHandler(event); 


           
                              }
 
                    }

                });

}
function UpdateOrderStatusBlock(x){
    
  var mainBlock=W.U.Rander(W.T.myorders.t.status(x));

 W.U.attrclick('[data-onorderchangeask]',mainBlock[0],onOrderChangeStatusAsk);

    W.U.Setview(W.U.id('orderstatusblock'+x.oid+''),mainBlock,'html');
}
//------------
function LoadData(){
 var walkwayNode=getwalkwayNode();
 var walkway=walkwayNode.main;
 var walkwayLoading=walkwayNode.Loading;
 var Tdata=TranseData;    

    if((W.F.ScrollLoadAllow()||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
          var form = 'paging',
     f_value = { name: 'myorders', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

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
            

                   Tdata.ps = Hret.pagesize;
                  Tdata.tp = Hret.totalpage;
                  Tdata.pgd = Hret.paged;
                Insert(Hret.result,Tdata.bypass);
                    SetPaging();
                 AddInBank(Hret.result);
                  Tdata.bypass = 0; 
                
                        }
                        
                    }

                }); 

   }   

}
function getwalkwayNode(){
    var Node=W.U.id("OrdeDashBoardfront").childNodes;
  
    return {main:Node[1],
            Loading:Node[2],
            heading:Node[0],
            paging:Node[3]};
}
function Insert(result,bypass){
  var walkwayNode=getwalkwayNode();
  var walkWay=walkwayNode.main;
  var mainBlock=W.U.Rander(W.T.myorders.t.t0(result,bypass));

 W.U.attrclick('[data-onorderchangeask]',mainBlock[0],onOrderChangeStatusAsk);




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
 var Tdata=TranseData;

 if((Tdata.pgd <= Tdata.tp)&&Tdata.pgd!=0){

  var mainBlock=W.U.Rander(W.T.myorders.paging());

    W.U.attrclick('[data-paging="myorders"]',mainBlock[0],function(){
       
        TranseData.bypass = 5; 
        LoadData();
    });
    W.U.Setview(walkwayNode.paging,mainBlock,'html');
 }else{
     W.U.Setview(walkwayNode.paging,'','html');
 }
  
}

function Maininit(){
    var walkwayNode=getwalkwayNode();


       TranseData.pgd=1;
    TranseData.tp=1;
        TranseData.bypass = 1;
        LoadData(); 
}


 function init(walkway){
       
var mainBlock=W.U.Rander(  W.T.myorders.Layout());



  W.U.Setview(walkway,mainBlock,'html');
  Maininit();
   }   return W.T.ToggleBlock(blockList, blockName,setting);
     
 }
    function paging(){
        var ch='';
        ch+='<div class="block _bdy m_b5 m_t10"><button type="button" class="btn   btn-block" data-paging="myorders" >Load More</button></div>';
        return ch;

    } 



 W.T.myorders={
   Layout:Layout,
   t:t,
   paging:paging
   };



  
  
})(wowrol);