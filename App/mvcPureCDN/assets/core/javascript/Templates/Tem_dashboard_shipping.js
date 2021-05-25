/*
* 
*/
; (function(W){
   "use strict";




  
   function LayoutMain(){
     
    var ch='<div class="block ">';
 var AddNewBtn={name:'text_67',attrStr:' data-pagerbtn="'+ W.I.dp+':shippingedit:spg:0" '};
  function infoBlock(){
      var ch='<div>';
    
    ch+=W.U.DataPanal(W.T.dashbordshipping.shippingZone(W.A.page.AppView.shippingZone));
      
    ch+='</div>';
  var  mainBlock=W.U.Rander(ch);
  W.U.Setview(this.TemplateNode.info,mainBlock,'html');
  }
 function bodybuilder(Data){
    
return {
                            id: Data.spgid,
                            name: Data.Name,
                            locations: ''
                        };
 }


 var Options={
title:'text_271',
name:'dashboard_shipping',
description:'help_25',
headerbutton:[AddNewBtn],
Tablecolumn:['name','locations'],
infoBlock:infoBlock,
bodybuilder:bodybuilder 

 }

 var DashboardTable='<div class="block" data-junction="DashboardTablemob" ></div>';
 if(W.I.wf=="mob"){
ch+=DashboardTable;
 }

  if(W.I.wf=="web"){
var setting ={
    name:'dashboardpage',
    BlockList:[{name:"DashboardTable",htmlStr:DashboardTable}],
    target:0,
    page:true,
    minheight:'auto'
};
 ch+=  W.T.Pager(setting);
   
 }

      ch+='</div>';

 W.U.Junction('DashboardTablemob',function(){

      W.U.DashboardTable.init(this.Node,Options);
             },{}); 

   return ch;
}







   var S={
   shippingZone :   function(x){
         
          var data=x.data;var panalID=x.panalID;
 W.U.ccbk.Add('DataPanalUpdate'+panalID ,function(shippingZonedata){
  W.A.page.AppView.shippingZone.data=shippingZonedata;
  W.U.DashboardTable.LoadData();

 });  



          function shippingZoneType(zoneId,Zonetype){
              var ch='';
  
   if(zoneId==105){
   ch+='<div class="block m_b5 "> <div class="form-piece fs11"> <label class="control-label">text_59</label> <div class="block" data-junction="sex"> </div><div data-help="sex"></div> </div> </div>';
   // 'shippingZonetype'=>'0',//0=>national leval ,1 => local
      W.U.Junction('sex',function(){
               W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
        },{name:"shippingZonetype",values:[0,1],valuesname:["nationally","locally"],Selected:W.U.positive(Zonetype),Class:''});
     
        }else{
            
ch+='<div class="block m_b5"> <span class="span ">text_59</span> <span class="span fw-b tt-c">Nationally</span><input type="hidden" name="shippingZonetype:0" value="1"> </div>';

        }
              return ch;

          }
          function onselectCallback() {
    W.U.console(this);
var id=this.data.li_data.id;
var Zonetype=1;

if(id==105){
 Zonetype=0;
}
 var mainBlock=W.U.Rander(shippingZoneType(id,Zonetype));

    W.U.Setview( W.U.id('shippingzonetype'),mainBlock,'html');

       }
      function frontcallback (){
      var data=this.options.formData;
           var ch='<div class="block "> ';
  ch+='<div class="block _bdy bg_0 "> ';
 ch+='<div class="block m_b5"> <span class="span ">text_60</span> <span class="span fw-b tt-c" >'+data.country.country+'</span> </div>';

 var ZoneType=(data.type==1)?'text_61':'text_62';
  ch+='<div class="block m_b5"> <span class="span ">Type :</span> <span class="span fw-b tt-c">'+ZoneType+'</span> </div>';
  ch+='</div>';
if(x.editer){
            ch+='<div class="block _bdy bg_0 "> <div class="span right"><a href="javascript:void(0);" data-panalswitchbtn="open:'+this.options.uID+'" class="btn btn-link btn-xs">edit</a></div></div>';
}
           ch+='</div>';
           return ch;
       }
     function backcallback (){
         var data=this.form.formData
         
               var ch='<div class="block _bdy bg_0"> ';

  ch+='<div class="block _Bdy" ><div>';

  ch+='<div class="block " data-nodeid="shippingzonetype" >'+shippingZoneType(data.country.id,data.type)+'</div>';
       

          ch+='<div data-help="infoUpdate:'+this.datapanal.options.uID+'"></div> <input type="hidden" name ="infoID" value="StoreshippingZone">';
     ch+='<div class="block _bdy"> <div class=" right"> <div class="block ul ul-menu"> <div class=" li"> <button type="button"  class="btn btn-default btn-xs" data-panalswitchbtn="close:'+this.datapanal.options.uID+'" >text_63</button> </div><div class=" li ma-l-8"> <button type="submit" class="btn btn-primary btn-xs">save</button> </div></div></div></div>';

           ch+='</div>';
           return ch;
       }

function  formLogic() {
   var data=this.formData;
  var rv = ['shippingZonetype:0','infoID'],
      f_value = W.F.walk_way_all(rv, this.formname),
       error=2, alert_mes = [];
    
       


       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
       alert_mes=glueErrors.message;
   
  
      var AlertError = W.T.AlertError({message:alert_mes});
       

   f_value['country']=data.country.id; 
var ret={error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  };


      return ret;
}      


   
       return {heading:'text_80',
       frontbody:frontcallback,
       backbody:backcallback,
       formData:x.data,
       formLogic:formLogic,
       panalClass:"bs-1  ",
       panalID:panalID
       }
   },
   Layout:function (){
    var ch='';
       ch+=W.U.DataPanal(shippingZone(W.A.page.AppView.shippingZone));

    


    return ch;


},
inputsuggestion:function(x){
          var locData=x.lif,Task=(x.spgid!=0)?((x.sZt==0)?5:6):((W.A.page.AppView.shippingZone.data.type==0)?5:6);
       
       var  HiddenSelected=[];    

    for( var q in locData ){ 
   HiddenSelected[locData[q][0]] ={id: locData[q][0],name: locData[q][2]};

}  
   var datalocation={Task:Task,
    Data:{
   pager:W.I.dp,
  backblock:'LocationPage',
  locallocation:{id:0,name:''},
    town:{id:0,name:''},
    city:{id:0,name:''},
    state:{id:0,name:''},
    country:{id:x.z,name:x.zN}    
    },
    HiddenSelected:{
    locallocation:HiddenSelected,
  statelocationbycountry:HiddenSelected
    }
    };
    var dataKey=W.U.uId();
     W.U.intentdata.add(dataKey,datalocation);

             
        //   // W.U.console(this);
          var ch='<div class="block  bg_0   " >';  

    ch+='<div class="block _bdy fs13 fw-b" >text_359</div>';
   ch+='<div class="block  _bdy"  data-location="'+dataKey+'"  ></div>';


           ch +='</div>';
               
            return ch;
},
LocationSuggestionTableHeader:function(x){
      var cellwidth = x.cellwidth;
             var ch='<div class="block ul ul-menu bg_7"><div class="li" style="width:'+cellwidth.col1+'"><div class="block _bdy"> <span class="fw-b tt-c">text_65</span></div></div><div class="li" style="width:'+cellwidth.col2+'"><div class="block _bdy"> <span class="fw-b tt-c">@</span><span class="fw-b tt-c">text_64</span></div></div><div class="li" style="width:'+cellwidth.col3+'"><div class="block _bdy"> <span class="fw-b tt-c"></span></div></div></div>';


            return ch;   
},
LocationSuggestionTableBody:function(x){
    var ch='';
         var input=x.LocationTableCellInputForm;
         var locData=x.Data.lif;
          var cellwidth = x.cellwidth;
     var ch='<div class="block ul bg_0"  >'; 
           var _this=x;
            
      for(var i=(locData.length-1);i>=0;i--){
     var onchange=function(){
       var newPrice=W.U.floatval(this.Node.value);
  this.Node.value=newPrice;
    _this.Data.lif[this.Id][1]=newPrice;

       
      };    
       
  var Row='<div class="block li b_gtl " ><div class="block ul ul-menu" >';
 Row+='<div class="li " style="width:'+cellwidth.col1+'"  ><div class="block _bdy" >'+locData[i][2]+'</div></div>';

 Row+='<div class="li " style="width:'+cellwidth.col2+'"  ><div class="block _bdy" >'+input(locData[i][1],'surcharge',i,onchange)+'</div></div>';
  Row+='<div class="li " style="width:'+cellwidth.col3+'"  ><div class="block _bdy" ><span class="sclose " data-locationtablerowonremove="'+i+'" style="margin-top:10px;margin-right:12px;"></span></div></div>';

Row+='</div></div>'; 

 ch+=Row;



      }

   
   
       ch += '</div>';


           return ch;

},
 LayoutMain: LayoutMain
   };








W.T.dashbordshipping=S;


})(wowrol);