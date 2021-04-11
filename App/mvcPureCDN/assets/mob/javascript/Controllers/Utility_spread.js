/*
* 
*/
; (function(W){
   "use strict";
   var AppId=W.A.page.AppId;

var Spread=(function(){
  var spreadbank=[]; 
  var spreadNode=[]; 
  var spreadData=W.A.page.AppView.spread;
  var retriveMode='hp';
  if(AppId=="ProfilePageBuyer"||AppId=="ProfilePageStore"){
      retriveMode='pp';
  }

function GetSpreadData(ID){
  var defaultdata={"ESd":[],"sid":"","eid":"","oeid":"","veid":"",ctt:[{content:'',data:''}],"prpo":"","qat":"","cmts":"","sped":"","pyi":0,"date":"","date_gmt":"","tey":[],"aoj":[],"cmti":[],"qati":[],"vtd":"","hdg":"Spreads","sdes":""};
  if(ID!=0){
      defaultdata=spreadbank[ID];
  }

  return defaultdata;
}
function GetSpreadNode(Selecter){
    if (W.U.Spread.spreadNode.hasOwnProperty(Selecter)) {
      return W.U.Spread.spreadNode[Selecter];

    }else{
        return null; 
    }
}

function AddInSpreadBank(result){
    for(var q in result){
        result[q].ListingMode=0;
     spreadbank[result[q].sid]=result[q];
    }
}

var TranseData = {ifo: {acm: retriveMode,eid:W.A.page.AppView.EntityStripdata.eid },  //info
               bypass: 0,
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 5,  //pagesize
                tp: 1,  //total page
                tr: 1,  //total result
                pgd: 1   //paged
            };


function spreadonebackBinds(args){
    var defaultdata={title:'view spread title',btntext:'Spread',submitshow:false,submitcallback:null};
    args = W.U.extend(defaultdata, args);

    var Title=W.U('[data-jqid="spreadonebackTitle"]',W.U.id('block.spreadoneback'))[0]; 
  W.U.SetText(Title,args.title,'html');
    var submit=W.U('[data-jqid="spreadonebacksubmit"]',W.U.id('block.spreadoneback'))[0];
  if(args.submitshow){
  
    submit.onclick=args.submitcallback;
    submit.style.display="block";
      W.U.SetText(submit,args.btntext,'html');   
  }else{
        submit.style.display="none";
  }
}
//---

function onspreadEdit(){
   var ID=this["data-spreadedit"]; 
   var SpreadData=GetSpreadData(ID);
      //---
var form =  W.T.Spread.spreadFormBody(SpreadData);
var walkway=W.U.id("spreadoneback");
var mainBlock=W.U.Rander(form);

spreadonebackBinds({title:'Spread ',btntext:'Spread',submitshow:true,submitcallback:submitspreadform});


  W.U.Setview(walkway,mainBlock,'html');
  var event = jQuery.Event("show");
      event.id = 'spreadoneback';
     $(W.U.id('block.spreadoneback')).parent().triggerHandler(event);

   console.log(SpreadData);

}

function onunsurespreaddeleteAsk(){
   var Datastr=(this['data-spreaddeleteask']).split(":"); 
  var  sid=Datastr[0],action=Datastr[1];  
  var  SpreadData=GetSpreadData(sid);

 if(action=="d"){


    var mainBlock=W.U.Rander(W.T.Spread.S.deletespread(SpreadData));
  
 }
   if(action=="r"){
    var mainBlock=W.U.Rander(W.T.Spread.S.removespread(SpreadData));
  
 }
  //cansal button
 W.U.attrclick('[data-reiniteditlink]',mainBlock[0],onclickreiniteditlink);
  W.U.attrclick('[data-spreaddelete]',mainBlock[0],onclickspreaddelete);
   W.U.Setview(GetSpreadNode('EditLink:'+sid),mainBlock,'html');   
}


function ReInitEditLink(sid){
   
    var  SpreadData=GetSpreadData(sid);
    var mainBlock=W.U.Rander(W.T.Spread.S.EditLink(SpreadData));
 W.U.attrclick('[data-spreadedit]',mainBlock[0],function(){
  var Id=this['data-spreadedit'];   
  $('[data-spreadeditlink ="'+Id+'" ]').hide();
  onspreadEdit.bind(this)();

 });
W.U.attrclick('[data-spreaddeleteask]',mainBlock[0],onunsurespreaddeleteAsk);
     W.U.Setview(GetSpreadNode('EditLink:'+sid),mainBlock,'html');    
}
function onclickreiniteditlink(){
    var Datastr=(this['data-reiniteditlink']).split(":"); 
  var sid=Datastr[0];
ReInitEditLink(sid);  
}

function onclickspreaddelete(){
   var Datastr=(this['data-spreaddelete']).split(":"); 
  var sid=Datastr[0],action=Datastr[1];  
  var f_value ={};
     f_value.action=action;
     f_value.sid=sid;
 var  SpreadData=GetSpreadData(sid);
if(f_value.cid!=''&&(f_value.sid!=0||f_value.sid!='')){

    
   var formData = {
                    form: 'spreaddelete',
                    f_value:f_value
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
            W.U.AddDom(GetSpreadNode('EditLink:'+sid), W.T.SpreadComment.S.Loading,'html');   
            
                    },
                    success: function (data) {
                    
                   var ret = JSON.parse(data);
          
                        if (ret.state == 500) {
               
                ReInitEditLink(SpreadData.sid);  
            W.F.Toast('Unable to delete comment');

                        }
                        if (ret.state == 200) {
             
               $('[data-spreadcard="'+SpreadData.sid+'"]').remove();
          
                     
                              }
 
                    }

                });
}
}
function submitspreadform(){
  var formname="spreadform", f_value={},formhelp=W.U('[data-help="'+formname+'"]')[0], error=0, alert_mes = [];
 var f_value1 = W.F.walk_way_all(['spread_text', 'fromreaction:0','spreadfromprivacy:0'], formname);
  var f_value2 = W.F.walk_way_all(['sid'], formname);

  var friendTag = Array('');
            $(':hidden.tokenh_input').each(function (i) {
                if ($(this).attr('name') == 'buyerfriend') {
                    friendTag[i] = W.F.JSONparse($(this).val(), { id: '' })['id'];

                }


            });
            var promoteproduct = Array('');
            $(':hidden.tokenh_input').each(function (i) {
                if ($(this).attr('name') == 'productsuggestion') {
                    promoteproduct[i] = W.F.JSONparse($(this).val(), { id: '' })['id'];

                }


            });
var f_value3={},f_value4={};
          f_value3['tagfriend'] = friendTag;
          f_value4['promoteproduct'] = promoteproduct;


        switch(W.A.page.AppId){
       case 'HomePageBuyer':
    f_value= W.U.extend(f_value, f_value1);
      error=3;
       var glueErrors = W.F.glueErrors({ f_value: f_value, error: error });
      
   f_value= W.U.extend(f_value, f_value2,f_value3);
       break;
       case 'HomePageStore':
      f_value= W.U.extend(f_value, f_value1);
       error=3;
     var glueErrors = W.F.glueErrors({ f_value: f_value, error: error });
      f_value= W.U.extend(f_value, f_value2,f_value4);
       break;  
        }


      error=glueErrors.error;
      alert_mes=glueErrors.message;
     
  var AlertError = W.T.AlertError({message:alert_mes});


     if(error==0){
        W.U.AddDom(formhelp,'','html');    


   var formData = {
                    form: formname,
                    f_value:f_value
                };

    W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
             W.U.madianLoading('show');
            
                    },
                    success: function (data) {
                        W.U.madianLoading('hide');
           var ret = JSON.parse(data);
          
                        if (ret.state == 500) {
 var AlertError = W.T.AlertError({message:alert_mes});
  W.U.AddDom(formhelp,AlertError,'html');
        W.F.alert();  
 
                        }
                        if (ret.state == 200) {

   var event = jQuery.Event("hide");
      event.id = 'spreadoneback';
     $(W.U.id('block.spreadoneback')).parent().triggerHandler(event);
          AddInSpreadBank(ret.response);
                     InsertSpread(ret.response,3);    
          
                     
                              }
 
                    }

                });


     }else{
       W.U.AddDom(formhelp,AlertError,'html');
        W.F.alert();   
     }

  
      console.log( f_value);

}

//--




function initspreadonefront(){
  
TranseData.bypass = 1;
 LoadSpread();

 
}  
   
     
function init(walkway){
    
 

var mainBlock=W.U.Rander(W.T.Spread.Layout());

W.U.attrclick('[data-spreadedit]',mainBlock[0],onspreadEdit);
W.U.attrclick('[data-spreaddelete]',mainBlock[0], onunsurespreaddeleteAsk);
  W.U.Setview(walkway,mainBlock,'html');
  initspreadonefront();
}






//---spread front walkway
function getwalkwayNode(){
    var Node=W.U.id("spreadonefront").childNodes;
  
    return {main:Node[1],
            Loading:Node[2],
            submitLoading:Node[0],
            paging:Node[3]};
}
function LoadSpread(){
 
    var walkwayNode=getwalkwayNode();
   var walkway=walkwayNode.main;
 var walkwayLoading=walkwayNode.Loading;


 var Tdata=TranseData;  
   if((W.F.ScrollLoadAllow()||Tdata.bypass == 1)&& (Tdata.fr == 0) && (Tdata.pgd <= Tdata.tp)){
          var form = 'paging',
     f_value = { name: 'spread', ps: Tdata.ps, tp: Tdata.tp, pgd:Tdata.pgd,sstr:Tdata.sstr, ifo:JSON.stringify(Tdata.ifo) };

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
            

                   TranseData.ps = Hret.pagesize;
                  TranseData.tp = Hret.totalpage;
                   TranseData.pgd = Hret.paged;
                   AddInSpreadBank(Hret.result);

                   InsertSpread(Hret.result,Tdata.bypass);
                   SetPaging();

                        }
                        
                    }

                }); 

   }   
}

function renderSpread(result){
 var RanderInDiv=W.U.Rander('<div class="block"><div class="block">'+W.T.Spread.S.t0(result)+'</div></div>')[0];

 

 var mainBlock=RanderInDiv.childNodes;// do not disturb it
 W.U.attrclick('[data-spreadeditlinkbtn]',mainBlock[0],function(){
  var Id=this['data-spreadeditlinkbtn'];   
  $('[data-spreadeditlink ="'+Id+'" ]').toggle();
 
 });
 W.U.attrclick('[data-spreadedit]',mainBlock[0],function(){
  var Id=this['data-spreadedit'];   
  $('[data-spreadeditlink ="'+Id+'" ]').hide();
  onspreadEdit.bind(this)();

 });
 W.U.attrclick('[data-spreaddeleteask]',mainBlock[0],onunsurespreaddeleteAsk);



 return mainBlock;
}

function InsertSpread(result,bypass){
 var walkWay=W.U.id("spreadonefront").firstChild;
 
     var mainBlock=renderSpread(result);
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
        case 2://prepend
 W.U.Setview(walkWay,mainBlock,'prepend');
        break;
       case 3://replace
       for(var q in result){
       $('[data-spreadcard="'+result[q].sid+'"]').remove();
       }
 W.U.Setview(walkWay,mainBlock,'prepend');
        break;
    }
}
function SetPaging(){
     var walkwayNode=getwalkwayNode();

  var Tdata=TranseData;  
   if((Tdata.pgd <= Tdata.tp)&&Tdata.pgd!=0){
     var mainBlock=W.U.Rander(W.T.Spread.S.paging());
        W.U.attrclick('[data-pagingspread]',mainBlock[0],function(){
    
    
     Tdata.bypass = 5; 
        LoadSpread();
    });
    W.U.Setview(walkwayNode.paging,mainBlock,'html');  
   }else{
     W.U.Setview(walkwayNode.paging,'','html');
 }

}
//---spread front walkway



return {init:init,
spreadNode:spreadNode,
GetSpreadData:GetSpreadData,
backbinds:spreadonebackBinds,
GetSpreadNode:GetSpreadNode
};
 })();


 W.U.Spread=Spread;    

  




})(wowrol);
