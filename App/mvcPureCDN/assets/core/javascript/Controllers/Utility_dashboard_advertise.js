/*
* 
*/
; (function(W){
   "use strict";
   //--  Location
function setLocationForm(Node,Value){
    

       function Handler(Node,Data) { 
        this.Node = Node;
        this.Data = Data;
       this.UnSaved=0;
   
     // wait for dom css emplimention
        setTimeout(this.init.bind(this), 200);
    //    $(window).on('resize', this.init.bind(this));

         this.TemplateNode=this.initTemplate();
        
      
    }
      Handler.prototype.init = function () {
var _this=this;
    this.cellwidth = this.calculateCellwidth();   
       this.setcomponent('inputsuggestion');
   this.setcomponent('header');
      this.setcomponent('body');

W.U.ccbk.ClearOnly(W.U.Page,'multypostalCodebycountrySelect',  W.U.intentdata.get('ccbkid.shippinglocationselect'));


W.U.intentdata.add('ccbkid.shippinglocationselect',W.U.ccbk.Add(W.U.Page,'multypostalCodebycountrySelect',function(data){
  
 _this.Data.l.push([data.id,0.00,data.name]);
  _this.UnSaved=1;

  _this.setcomponent('inputsuggestion');
  _this.setcomponent('body');

//-- To Update  LocationSelectorIndicator



  }));



  
  //--END  LocationSelectorIndicator

      }


  Handler.prototype.initTemplate = function () {
         var ch='';
      ch='<div class="block ">';
           ch+='<div  class="block " data-block="input"> </div>';
         ch+='<div  data-block="header" ></div>';
         ch+='<div  class="block " data-block="body" ></div>';

          ch+='<div  class="block " data-block="footer"> </div>';

          ch+='</div>';  
             var  mainBlock=W.U.Rander(ch);
         
    var TemplateNode={
     input:W.U('[data-block="input"]',mainBlock[0])[0],
    header:W.U('[data-block="header"]',mainBlock[0])[0],

    body:W.U('[data-block="body"]',mainBlock[0])[0],
    footer:W.U('[data-block="footer"]',mainBlock[0])[0]           
    }
     W.U.Setview(this.Node,mainBlock,'html');

       return TemplateNode;
     }
  Handler.prototype.setcomponent=function(name){
        var _this=this;
    switch (name){
       case 'inputsuggestion':

   W.U.AttachDom(  this.TemplateNode.input, W.T.dashboard_advertise.inputsuggestion( this.Data), 'html',function(){
        

   });

       break;   
   case 'header':

   W.U.AddDom(  this.TemplateNode.header, W.T.dashboard_advertise.LocationSuggestionTableHeader( this), 'html');
      break;  
   case 'body':

 W.U.AttachDom(  this.TemplateNode.body, W.T.dashboard_advertise.LocationSuggestionTableBody( this), 'html',function(){
            W.U.attrclick('[data-locationtablerowonremove]',this.mainBlock[0],function(){
      var Id=this['data-locationtablerowonremove'];
                _this.LocationTableRowOnremove(Id);
            });

   });
      break; 
   case 'NotifyStripOn':
      break; 
   case 'NotifyStripOff':
      break; 
    }
      }
   
  Handler.prototype.calculateCellwidth= function (){
       return { col1: 55 + '%', col2: 35 + '%', col3: 10 + '%' };
          }
    Handler.prototype.LocationTableRowOnremove= function (Id){
       W.U.console(this.Data);
               var locData=this.Data.l;
       
              for (var q in locData) {

                if (q == Id) {


                 locData.splice(q, 1);

                }

            }

         
            this.setcomponent('body');
         }

    Handler.prototype.LocationTableCellInputForm= function (value,name,Id,onchnage){
              var ch='';
    
        var datajunction='';
        if(typeof onchnage !='undefined'){
            datajunction='data-Junction="shippingchargeonchange'+Id+'" ';
            var _this=this;
      W.U.JunctionAdd(W.A.page.AppId,'shippingchargeonchange'+Id,function(){
      this.Node.onchange= onchnage.bind({Node:this.Node,Id:Id}); ;
   },{});  

        }


      ch+='<div class="block"><div class="form-inline"> <div class="input-group "> <span class="input-group-addon">Rs.</span> <input type="number" name="'+name+'" '+ datajunction+' class="form-mold" autocomplete="off" value="'+value+'"  > </div></div></div>';


          return ch;
         }
    Handler.prototype.NotifyStrip=function(state){
        
    }
      new Handler(Node,Value);
  }
  


   function pageadvertisebasicedit(block){
       
 var formData=block.objectdata;
var frombody=W.T.dashboard_advertise.pageadvertisebasicedit;
var formLogic =function() {
    var rv = ['heading_1', 'heading_2', 'description','url','ct','adid'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=6, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
      var AlertError = W.T.AlertError({message:alert_mes});

  




      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

                            
                 W.U.DashboardTable.updateRow(this.data[0]);              

                             
                   W.U.Pager.togglePage(W.I.dp, W.I.dpbf);          

                             

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

 }

       var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:''
         };

    var Jid   =  W.U.J(function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata); 
     
            


             return '<form class="block bs-1 " name="advertisebasic"  data-junction="'+Jid+'" onsubmit="return false"></form>'; 
   }

   function AdvertiseLocationEdit(block){
      var data=block.objectdata;

    






  var titleText='text_65'; var sublitText='text_171';
    if(data.adid!=0){
        titleText='text_65';  sublitText='text_241';
    }




     var Header  =W.T.DashbordFormHeader({titleText:titleText,backblock:'blockFront',sublitText:sublitText});
//----------------


var formLogic =function() {

 
   //   W.U.intentdata.get('ccbkid.shippinglocationselect');

    var  l_data = this.formData.l,f_value={}, error=0, alert_mes = [];
        if(!W.U.isOK(l_data)){
            error=1;alert_mes.push('ajax_54');
        }else if(W.U.count(l_data)==0){   error=1;alert_mes.push('ajax_54'); }else{
            f_value={l:JSON.stringify(l_data),adid:this.formData.adid};
        }
   
  
      var AlertError = W.T.AlertError({message:alert_mes});

  




      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var formbody =function(x){
   
var Jid =W.U.J(function(){  setLocationForm(this.Node,this.data);   },x); 
    return W.T.wrap(Header, '<div class="block " ><div data-help="advertiselocationedit" ></div><div class="block _bdy" data-junction="'+Jid+'" ></div></div>');
}
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

                            
                 W.U.DashboardTable.updateRow(this.data[0]);              

                    W.U.Toast('text_283');         
                   W.U.Pager.togglePage(W.I.dp, W.I.dpbf);          

                             

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

 }



     
//---------------
  
  
       var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:data,
            frombody:formbody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:''
         };

    var Jid   =  W.U.J(function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata); 


     return '<form class="block bs-1 " name="advertiselocationedit"  data-junction="'+Jid+'" onsubmit="return false"></form>'; 
   }




   function init(walkway){

        W.U.intentdata.add('advertise.0',{
                    h1: ' default name',
                    h2: ' default name',
                    url: '',
                    ct: 0,
                    des: '',
                    status: 0,
                    l: [],
                    adid: 0

                });
 W.U.Pager.addblockdata({ name:'advertisebasicedit', htmlStr:pageadvertisebasicedit});
  W.U.Pager.addblockdata({ name:'AdvertiseLocationEdit', htmlStr:AdvertiseLocationEdit});

        var mainBlock=W.U.Rander(W.T.dashboard_advertise.Layout());

  W.U.Setview(walkway,mainBlock,'html');

   }


 

           W.U.dashboard_advertise={
             init:init               

           };

   })(wowrol);