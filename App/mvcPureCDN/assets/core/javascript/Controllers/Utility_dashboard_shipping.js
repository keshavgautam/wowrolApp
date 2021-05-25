/*
* 
*/
; (function(W){
   "use strict";

//--  Shipping charge

function setshippingForm(){
      // W.U.console('------');     

       function Handler(wrap,Value) { 
        this.wrap = wrap;
        this.Value = Value;
         this.UnSaved=(typeof (this.Value.shippingchargeUnSaved)!='undefined')?this.Value.shippingchargeUnSaved:0;
     if(this.Value.srng.length==0){
    this.Value.srng[0]=[0.00,10.00,0.00];
}
    this.rangeDiff=10.00;

     // wait for dom css emplimention
        setTimeout(this.init.bind(this), 200);
      //  $(window).on('resize', this.init.bind(this));

        
      
    }
      Handler.prototype.init = function () {
            this.createMarkup();

   var tableMarkup = '<div class="block ov-hi" ><div class="block ov-hi" >'+ this.shippingType+'</div><div class="block ov-hi" >'+ this.Footer+this.UnsavedStrip+this.Header + this.Body +'</div></div>';
       
        W.U.AddDom(this.wrap, tableMarkup, 'html');

         // // W.U.console(this);
      }
     Handler.prototype.createMarkup = function () {
      this.cellwidth = calculateCellwidth.bind(this)();    
      this.Header = createHeader.bind(this)();
      this.Body = createBody.bind(this)();
      this.Footer = createFooter.bind(this)();
      this.shippingType = createType.bind(this)();
         this.UnsavedStrip = createUnsavedStrip.bind(this)();


       // draw
       function createType(){
          
           // Adding List check box
var _this=this;
  W.U.JunctionAdd(W.A.page.AppId,'shippingchargetype',function(){
//call back to biind Listcheckbox
       W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name:"shippingtype",values:['0','1'],valuesname:["text_167","text_168"],Selected:this.Value.type,Class:'',Listid:'shippingtype',callback:function(){
this.ListCheckBox.loadingOn();

//out business area

_this.Value.type=this.itemvalue;


_this.init.bind(_this)();


       
       


 



//out business area  
//call back when item get click
//this call back return the selected value
this.ListCheckBox.Value.Selected=this.itemvalue;
this.ListCheckBox.init();
this.ListCheckBox.loadingOff();
//-- do not remove  it
  }}); 
  // End List check box


           return '<div class="block" data-junction="shippingchargetype"></div>';
       }

       function createHeader() {
var cellwidth = this.cellwidth;
  var Rangetype=(this.Value.type=='0')?'Weight Range':'Price Range';  
          var ch='<div class="block _bdy fw-b">Base Shipping Charge For '+Rangetype+'</div><div class="block ul ul-menu bg_7"><div class="li" style="width:'+cellwidth.From+'"><div class="block _bdy"> <span class="fw-b tt-c">From</span></div></div><div class="li" style="width:'+cellwidth.To+'"><div class="block _bdy"> <span class="fw-b tt-c">To</span></div></div><div class="li" style="width:'+cellwidth.Charge+'"><div class="block _bdy"><span class="fw-b tt-c">@</span><span class="fw-b tt-c">charge</span></div></div></div>';


            return ch;
        }
       function createBody(){

    var cellwidth = this.cellwidth;
    var rangeData=this.Value.srng;
  
    var input=inputfrom.bind(this);
    var ch='<div class="block ul bg_0"  >'; 
    var Rangetype=(this.Value.type=='0')?'weight':'price';  
    var _this=this; 
      for(var i=(rangeData.length-1);i>=0;i--){
 
 var Row='<div class="block li b_gtl " ><div class="block ul ul-menu" >';
 Row+='<div class="li " style="width:'+cellwidth.From+'"  ><div class="block _bdy" >'+input(rangeData[i][0],Rangetype,'from')+'</div></div>';
 if(i==(rangeData.length-1)){
 var  LRangetype=Rangetype+'input'; 
   
   var onchange=function(){
       var i= this.Id;
       var newValue=parseFloat(this.Node.value);
     newValue=  Math.round10(newValue, -1);
       var fromValue=parseFloat(_this.Value.srng[i][0]);
    fromValue=  Math.round10(fromValue, -1);
        var price=_this.Value.srng[i][2];
      price=  Math.round10(price, -1);
        if(newValue<fromValue){
           newValue=fromValue+10; 
        }

       _this.Value.srng[i]=[fromValue,newValue,price];
        // W.U.console('onchange');
       // W.U.console(_this.Value);
      };



    Row+='<div class="li " style="width:'+cellwidth.To+'"  ><div class="block _bdy" >'+input(rangeData[i][1],LRangetype,'to',i,onchange)+'</div></div>';  
 }else{
    Row+='<div class="li " style="width:'+cellwidth.To+'"  ><div class="block _bdy" >'+input(rangeData[i][1],Rangetype,'to',i)+'</div></div>';  
 }

 var Priceonchange=function(){
    var newPrice=W.U.floatval(this.Node.value);
  this.Node.value=newPrice;
    _this.Value.srng[this.Id][2]=newPrice;
        // W.U.console('Priceonchange');
       // W.U.console(_this.Value);
}
 

 Row+='<div class="li " style="width:'+cellwidth.Charge+'"  ><div class="block _bdy" >'+input(rangeData[i][2],'priceinput','price',i,Priceonchange)+'</div></div>'; 


 Row+='</div></div>'; 

 ch+=Row;
      }

   
   
       ch += '</div>';
 return ch;
         }
       function createFooter() {
   var cellwidth = this.cellwidth;
 var ch='<div class="block ul bg_0"  >';  

    var Rangetype=(this.Value.type=='0')?'kg':'Rs.';  

 var btns='<div class="block li b_gtl " ><div class="block ul ul-menu" >';
 btns+='<div class="li " style="width:50%"  ><div class="block _bdy" ><div class="form-inline" style="max-width:120px"><lable>text_169</lable> <div class="input-group" role="group" ><input type="number" name="range_diff" class="form-mold" autocomplete="off" data-Junction="shippingrangediff"  value="'+this.rangeDiff+'" style="max-width: 80px;" title="Range Defference" ><span class="input-group-addon">'+Rangetype+'</span> </div></div></div></div>';
 btns+='<div class="li " style="width:50%"  ><div class="block _bdy" style=" margin-top: 19px; "><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn" data-Junction="addshippingrange" >text_171</button><button type="button" class="btn _cbtn"  data-Junction="resetshippingrange" >text_170</button></div></div></div>';

 btns+='</div></div>';
 var _this=this;
   W.U.JunctionAdd(W.A.page.AppId,'addshippingrange',function(){
      this.Node.onclick= _this.addshippingrange.bind(_this);
   },{});  
   W.U.JunctionAdd(W.A.page.AppId,'resetshippingrange',function(){
      this.Node.onclick= function(){
    _this.Value.srng=Array();
 _this.Value.srng[0]=[0.00,10.00,0.00];
_this.rangeDiff=10.00;
_this.init.bind(_this)();
      }
   },{});  
   W.U.JunctionAdd(W.A.page.AppId,'shippingrangediff',function(){
      this.Node.onchange= function(){
          _this.rangeDiff=this.value;

      };
   },{});  


              ch +=btns+'</div>';
            return ch;
        }
       function calculateCellwidth() {
              
   var parentWidth = this.wrap.offsetWidth;
   //correction of 20 px -do not remove it
   parentWidth=(parentWidth-20);
  // // W.U.console(parentWidth);  // W.U.console(this.wrap);
   parentWidth = (window.innerWidth < 400) ? (window.innerWidth - 40) : parentWidth;

    var colwidth = Math.floor(( parentWidth / 3));

    return { From: 33.33 + '%', To: 33.33 + '%', Charge: 33.33 + '%' };
          }
       function inputfrom(value,type,name,Id,onchnage){
            // W.U.console(onchnage);
           var ch='';
       var weightUnit=this.Value.Uw;
        var priceUnit=this.Value.Up;
        var datajunction='';
        if(typeof onchnage !='undefined'){
            datajunction='data-Junction="shippingchargeonchange'+Id+name+'" ';
            var _this=this;
    W.U.JunctionAdd(W.A.page.AppId,'shippingchargeonchange'+Id+name,function(){
       // W.U.console(this.data.onchnage);
      
      this.Node.onchange= this.data.onchnage.bind({Node:this.Node,Id:this.data.Id}); ;
   },{Id:Id,onchnage:onchnage});  

        }


           switch(type){
          case 'weight':
          ch+='<div class="form-inline"> <div class="input-group "><input type="hidden" name="'+name+'" value="'+value+'">  <span class="form-mold bg_6"  >'+value+'</span><span class="input-group-addon">'+weightUnit+'</span>  </div></div>';
          break; 
      
          case 'price':
          ch+='<div class="block"><div class="form-inline"> <div class="input-group "> <span class="input-group-addon">'+priceUnit+'</span>  <span class="form-mold bg_6"  >'+value+'</span> </div></div><input type="hidden" name="'+name+'" value="'+value+'"></div>';
          break;
           case 'priceinput':
          ch+='<div class="block"><div class="form-inline"> <div class="input-group "> <span class="input-group-addon">'+priceUnit+'</span> <input type="number" name="'+name+'" '+ datajunction+' class="form-mold" autocomplete="off" value="'+value+'"  > </div></div></div>';

          break;
            case 'weightinput':
          ch+='<div class="block"><div class="form-inline"> <div class="input-group "> <input type="number" name="'+name+'" class="form-mold" autocomplete="off" value="'+value+'" '+ datajunction+'  > <span class="input-group-addon">'+weightUnit+'</span></div></div></div>';

          break;   
           }


          return ch;

       }
        function createUnsavedStrip(){
          var ch='';
          
          if(this.UnSaved==1){
              ch+='<div class="block  bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">help_69</div></div>';  
          }
        

          return ch;
      }

       }

    Handler.prototype.addshippingrange=function(){
      // W.U.console('  Handler.prototype.addshippingrange'); // W.U.console(this.Value.srng);

        var i= ( this.Value.srng.length-1);
      var lastValue=parseFloat(this.Value.srng[i][1]);
       var fromValue=(lastValue)+.01;
        var toValue= parseFloat(lastValue)+parseFloat(this.rangeDiff);
        if(toValue>fromValue){
          var price=0.00;
   
       this.Value.srng.push([fromValue,toValue,price]);
        this.UnSaved=1;  
      this.init.bind(this)();   
        }
       
    }
    
      new Handler(this.Node,this.Value);
  }
//--  Location
function setLocationForm(){
    

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

W.U.ccbk.ClearOnly(W.U.Page,'locallocationbycountrySelect',  W.U.intentdata.get('ccbkid.shippinglocationselect'));


W.U.intentdata.add('ccbkid.shippinglocationselect',W.U.ccbk.Add(W.U.Page,'locallocationbycountrySelect',function(data){
  
 _this.Data.lif.push([data.id,0.00,data.name]);
  _this.UnSaved=1;

  _this.setcomponent('inputsuggestion');
  _this.setcomponent('body');

//-- To Update  LocationSelectorIndicator
 W.U.ccbk.Run( W.U.Page,
 "updateView_LocationSelectorIndicator",
 {data:{id:0,SelectedCount: W.U.ObjectLength(_this.Data.lif)},template:function(x){ return '<div class="block _Bdy al-c " >'+ x.SelectedCount+' location selected.</div>';  }});


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

   W.U.AttachDom(  this.TemplateNode.input, W.T.dashbordshipping.inputsuggestion( this.Data), 'html',function(){
        

   });

       break;   
   case 'header':

   W.U.AddDom(  this.TemplateNode.header, W.T.dashbordshipping.LocationSuggestionTableHeader( this), 'html');
      break;  
   case 'body':



   W.U.AttachDom(  this.TemplateNode.body, W.T.dashbordshipping.LocationSuggestionTableBody( this), 'html',function(){
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
               var locData=this.Data.lif;
       
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
      new Handler(this.Node,this.Value);
  }


   //--  Shipping charge
function  ShippingChargePage(block){
    var data=block.objectdata;
     var Header  =W.T.DashbordFormHeader({titleText:'Shipping charge',backblock:'shippingedit',submitbutton:false});
     var ch=W.T.wrap(Header, '<div class="block _bdy" data-junction="shippingchargeForm" ></div>');

    return ch;
}
   //--  Location
function  LocationPage(block){
       var data=block.objectdata;
       var Header  =W.T.DashbordFormHeader({titleText:'Location',backblock:'shippingedit',submitbutton:false});

       var Header  =  W.T.ActivityHeader({back:'<a href="javascript:void(0);"  class="block header-link-btn"  data-pagerbtn="'+W.I.dp+':shippingedit" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
  
 Title: '<span  class="block header-cell fg_6 al-l" ><h2 class="title" >location</h2> </span>',


  RightLink:'<div class="di-td"><a href="javascript:void(0);"  class="block header-link-btn"  data-pagerbtn="'+W.I.dp+':shippingedit"  >'+W.T.SVG('checkmark',24,'#f1f5fc')+'</a></div>',
    dropdown:Array()
    });

     var ch=W.T.DashbordFormWrap(Header, '<div class="block _bdy" data-junction="LocationPage" ></div>');
        
    return ch;
}

   //--
function  pageshippingedit (block){
     var ch='';
        
       
 var formData=block.objectdata;
    var titleText='text_240'; var sublitText='text_171';
    if(formData.spgid!=0){
        titleText='text_239';  sublitText='text_241';
    }
            ch += '<div class="block "  data-nodeid="block" >empty form</div>';



//-->>



//== 
//-->>





var frombody=function(x){
       var URL =W.U.URL;
       
 
   var Header  =W.T.DashbordFormHeader({titleText:titleText,sublitText:sublitText});
              var ch='';
             ch += '<div class="block  _bdy bg_0"><div data-help="addstoreshipping"></div>';

            ch += '<div class="form-piece"> <label class="control-label" >text_238<i >*</i></label> <input type="text" name="shipping_name" class="form-mold" placeholder="Name" data-required="true" autocomplete="off" value="' + x.Name + '"> <div data-help="shipping_name"><p class="di-in  fg_4 fs-italic fs11" ><span>help_73</span> <span>(internal reference)</span></p></div></div>';
            //------shipping charge

              W.U.Junction('shippingchargeForm',function(){
     
setshippingForm.bind({Node:this.Node,Value:this.data})();
  },x);  
               ch+='<div class="form-piece"> <div class="block "> <a href="javascript:void(0);" class="btn btn-block" data-pagerbtn="'+ W.I.dp+':shippingchargeForm:spg:'+x.spgid+'" > <span class="vl-sp"> text_56</span> <span class="vl-sp right">' + W.T.SVG('nextarrow', 24, '#1274c0') + '</span></a> </div><span class="di-in fg_4 fs-italic fs11">help_72</span> </div>';    
     
     W.U.Pager.addblockdata({    name:'shippingchargeForm', htmlStr:ShippingChargePage});    
          //------shipping charge
         //------setting location
  var LocationSelectorIndicator=  W.U.Updater.GetUpdateId('LocationSelectorIndicator');
 W.U.JunctionAdd(W.A.page.AppId,'LocationPage',function(){
     
setLocationForm.bind({Node:this.Node,Value:this.data})();
  },x);  
    ch+='<div class="form-piece"> <div class="block "> <a href="javascript:void(0);" class="btn btn-block" data-pagerbtn="'+ W.I.dp+':LocationPage:spg:'+x.spgid+'" > <span class="vl-sp">text_65</span>   <span class="vl-sp right">' + W.T.SVG('nextarrow', 24, '#1274c0') + '</span></a> </div><span class="di-in fg_4 fs-italic fs11">help_71</span> </div>';
    ch+='<div  data-point="'+LocationSelectorIndicator+'"></div>';
      
     W.U.Pager.addblockdata({    name:'LocationPage', htmlStr:LocationPage});   
   
         //------setting location
             ch+='<div class="form-piece"> <label class="control-label" >text_57 </label> <select class="form-mold " name="processingtime"  data-toggle="selectmodify" data-selected="'+x.pt+'" > <option selected="" disabled="" value="">text_58 </option> <option value="0"> 1 business day </option> <option value="1"> 1-2 business days </option> <option value="2"> 1-3 business days </option> <option value="3"> 3-5 business days </option> <option value="4"> 1-2 weeks </option> <option value="5"> 2-3 weeks </option> <option value="6"> 3-4 weeks </option> <option value="7"> 4-6 weeks </option> <option value="8"> 6-8 weeks </option>  </select> <div data-help="processingtime">help_74</div></div>';
            ch += '<div class="form-piece"> <label class="control-label" >text_27</label> <textarea name="description" class="form-mold" rows="3" >' + x.des + '</textarea> <input type="hidden" name="spgid" value="' + x.spgid + '"><div data-help="description"></div></div>';

            ch += '</div>';


            return   W.T.DashbordFormWrap(Header, ch);
            };

var formLogic =function() {
    // W.U.console(this);

    var rv = ['shipping_name', 'spgid','processingtime'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=3, alert_mes = [];
        
  var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
    

  
 f_value.type=this.formData.type;
 f_value.srng=JSON.stringify(this.formData.srng);
 f_value.stcg=JSON.stringify(this.formData.stcg);
 f_value.lif=JSON.stringify(this.formData.lif);;
 
 if ((this.formData.lif.length) < 1) {  alert_mes = alert_mes.concat(['ajax_43']);error++; }
   var rv = ['description'];
   W.U.extend(f_value, W.F.walk_way_all(rv, this.formname));



     var AlertError = W.T.AlertError({message:alert_mes});
      return {error: error,
              f_value:f_value,//required input value
              AlertError:AlertError //alert

  }
}    
var onprogress=function(){W.U.madianLoading('show'); }
var onsuccess=function(){

                                W.U.madianLoading("hide");
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'successfully_saved' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 

                            
                 W.U.DashboardTable.updateRow(this.data[0]);              

                             
                   W.U.Pager.togglePage('mainpage','blockFront');          

                             

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

///////////

          


          var formPage= '<form name="addstoreshipping"  data-junction="addstoreshipping" onsubmit="return false"></form>';
              W.U.JunctionAdd(W.A.page.AppId,'addstoreshipping',function(){
     
 W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata); 


             return formPage;
  }





function init(walkway){
    

 

 W.U.intentdata.add('spg.0',{
                    spgid: 0,
                    Name: '',
                    des: '',
                    type: 0,
                    srng: [],
                    lif: [],
                    stcg: [],
                    Up:'Rs.',
                    Uw:'kg.',
                    pt:3, 
                    z:W.A.page.AppView.shippingZone.data.country.id, 
                    zN:W.A.page.AppView.shippingZone.data.country.country, 
                    sZt:W.A.page.AppView.shippingZone.data.type

                });

  W.U.Pager.addblockdata({    name:'shippingedit', htmlStr:pageshippingedit});




 var mainBlock=W.U.Rander(W.T.dashbordshipping.LayoutMain());

  W.U.Setview(walkway,mainBlock,'html');

}



W.U.dashbordshipping={init:init};

})(wowrol);