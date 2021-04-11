/**
 * HomePageBuyer.js
 */
 ;(function (W) {
     "use strict";
     //suppling form to W.F.Forms  which delever to dashbord
     /*
     * The dashborard supply in this varible
     * Object {data: undefined, action: "new"}
     */
W.F.Forms[W.A.page.AppId]=function(){
   var ch = '';
   var data = (typeof (this.data) == 'undefined') ? {} : this.data;  
                 
                if (W.U.id('FWsubmit') != null) {
                     
                    //    W.U.id('FWsubmit').onclick = Submit.F0;
                        if (this.action == 'new') {
      W.U.SetIdText('FWtitle','Add New Shipping','html');
       W.U.SetIdText('FWsubmit','Add','text');               
           $(W.U.id('FWsubmit')).show();;

           var formData={
                    spgid: 0,
                    Name: '',
                    des: '',
                    type: 0,
                    srng: [],
                    lif: [],
                    stcg: [],
                    Up:'Rs.',
                    Uw:'kg.' 

                };

                        } else {
        W.U.SetIdText('FWtitle','Edit Shipping','html');
       W.U.SetIdText('FWsubmit','Update','text'); 
                            // console.log(this.data);
            var formData={
                    spgid:data.spgid,
                    Name: data.Name,
                    des: data.des,
                    type: data.type,
                    srng: data.srng,
                    lif: data.lif,
                    stcg: data.stcg,
                    Up:data.Up,
                    Uw:data.Uw
                };
                        }


//-->>
var shippingchargeForm=function(x){
    var ch='';
    var shippingChargebtn='<div class="form-piece"> <div class="block "> <a href="javascript:void(0);" class="btn btn-block" data-openbtn="shippingcharge" data-btnid="sCF" > <span class="vl-sp"> Shipping charge</span> <span class="vl-sp right">' + W.T.SVG('nextarrow', 24, '#1274c0') + '</span></a> </div><span class="di-in fg_4 fs-italic fs11">Set up Shipping charge.</span> </div>';

    var shippingChargeFrom=W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="shippingcharge" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Shipping charge</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }), '<div class="block _bdy" data-junction="shippingchargeForm" ></div>');

  W.U.JunctionAdd(W.A.page.AppId,'shippingchargeForm',function(){
     
setshippingForm.bind({Node:this.Node,Value:this.data})();
  },x);  

  //-->>
  var setshippingForm=function(){
      // console.log('------');     

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
        $(window).on('resize', this.init.bind(this));

        
      
    }
      Handler.prototype.init = function () {
            this.createMarkup();

   var tableMarkup = '<div class="block ov-hi" ><div class="block ov-hi" >'+ this.shippingType+'</div><div class="block ov-hi" >'+ this.Footer+this.UnsavedStrip+this.Header + this.Body +'</div></div>';
       
        W.U.AddDom(this.wrap, tableMarkup, 'html');

         // // console.log(this);
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
    
  },{name:"shippingtype",values:['0','1'],valuesname:["Based on shopping cart total weight","Based on shopping cart total price"],Selected:this.Value.type,Class:'',Listid:'shippingtype',callback:function(){
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
        // console.log('onchange');
       // console.log(_this.Value);
      };



    Row+='<div class="li " style="width:'+cellwidth.To+'"  ><div class="block _bdy" >'+input(rangeData[i][1],LRangetype,'to',i,onchange)+'</div></div>';  
 }else{
    Row+='<div class="li " style="width:'+cellwidth.To+'"  ><div class="block _bdy" >'+input(rangeData[i][1],Rangetype,'to',i)+'</div></div>';  
 }

 var Priceonchange=function(){
    var newPrice=W.U.floatval(this.Node.value);
  this.Node.value=newPrice;
    _this.Value.srng[this.Id][2]=newPrice;
        // console.log('Priceonchange');
       // console.log(_this.Value);
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
 btns+='<div class="li " style="width:50%"  ><div class="block _bdy" ><div class="form-inline" style="max-width:120px"><lable>Add new range of</lable> <div class="input-group" role="group" ><input type="text" name="range_diff" class="form-mold" autocomplete="off" data-Junction="shippingrangediff"  value="'+this.rangeDiff+'" style="max-width: 80px;" title="Range Defference" ><span class="input-group-addon">'+Rangetype+'</span> </div></div></div></div>';
 btns+='<div class="li " style="width:50%"  ><div class="block _bdy" style=" margin-top: 19px; "><div class="btn-group" role="group" aria-label="..."><button type="button" class="btn" data-Junction="addshippingrange" >Add</button><button type="button" class="btn _cbtn"  data-Junction="resetshippingrange" > Reset</button></div></div></div>';

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
  // // console.log(parentWidth);  // console.log(this.wrap);
   parentWidth = (window.innerWidth < 400) ? (window.innerWidth - 40) : parentWidth;

    var colwidth = Math.floor(( parentWidth / 3));

    return { From: 33.33 + '%', To: 33.33 + '%', Charge: 33.33 + '%' };
          }
       function inputfrom(value,type,name,Id,onchnage){
            // console.log(onchnage);
           var ch='';
       var weightUnit=this.Value.Uw;
        var priceUnit=this.Value.Up;
        var datajunction='';
        if(typeof onchnage !='undefined'){
            datajunction='data-Junction="shippingchargeonchange'+Id+name+'" ';
            var _this=this;
    W.U.JunctionAdd(W.A.page.AppId,'shippingchargeonchange'+Id+name,function(){
       // console.log(this.data.onchnage);
      
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
          ch+='<div class="block"><div class="form-inline"> <div class="input-group "> <span class="input-group-addon">'+priceUnit+'</span> <input type="text" name="'+name+'" '+ datajunction+' class="form-mold" autocomplete="off" value="'+value+'"  > </div></div></div>';

          break;
            case 'weightinput':
          ch+='<div class="block"><div class="form-inline"> <div class="input-group "> <input type="text" name="'+name+'" class="form-mold" autocomplete="off" value="'+value+'" '+ datajunction+'  > <span class="input-group-addon">'+weightUnit+'</span></div></div></div>';

          break;   
           }


          return ch;

       }
        function createUnsavedStrip(){
          var ch='';
          
          if(this.UnSaved==1){
              ch+='<div class="block  bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">To save permanently this edit ,click save.</div></div>';  
          }
        

          return ch;
      }

       }

    Handler.prototype.addshippingrange=function(){
      // console.log('  Handler.prototype.addshippingrange'); // console.log(this.Value.srng);

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


  //--==


    //--search
var blockList=[shippingChargebtn,shippingChargeFrom];
var blockName=["sCb","sCF"];
var setting ={
    name:'shippingcharge',
    target:0,
    page:true,
    minheight:'auto'
};
    return W.T.ToggleBlock(blockList, blockName,setting);
}


//== 
//-->>
var LocationForm=function(x){
    var ch='';
    var Locationsbtn='<div class="form-piece"> <div class="block "> <a href="javascript:void(0);" class="btn btn-block" data-openbtn="locations" data-btnid="LcF" > <span class="vl-sp">Locations</span> <span class="vl-sp right">' + W.T.SVG('nextarrow', 24, '#1274c0') + '</span></a> </div><span class="di-in fg_4 fs-italic fs11">Choose the location where you want to extend shipping.</span> </div>';

    var Locations=W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="locations" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Locations</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }), '<div class="block" data-junction="setLocationForm" ></div>');

    
  W.U.JunctionAdd(W.A.page.AppId,'setLocationForm',function(){
     
setLocationForm.bind({Node:this.Node,Value:this.data})();
  },x);  

  //-->>
  var setLocationForm=function(){
        

       function Handler(wrap,Value) { 
        this.wrap = wrap;
        this.Value = Value;
     this.UnSaved=0;

     // wait for dom css emplimention
        setTimeout(this.init.bind(this), 200);
        $(window).on('resize', this.init.bind(this));

        
      
    }
      Handler.prototype.init = function () {
            this.createMarkup();

   var tableMarkup = '<div class="block  ov-hi " >'+ this.Footer+this.UnsavedStrip+this.Header + this.Body +'<div class="block m_bTouch"></div></div>';
     
        W.U.AddDom(this.wrap, tableMarkup, 'html');

         // // console.log(this);
      }
     Handler.prototype.createMarkup = function () {
      this.cellwidth = calculateCellwidth.bind(this)();    
      this.Header = createHeader.bind(this)();
      this.Body = createBody.bind(this)();
      this.Footer = createFooter.bind(this)();
      this.UnsavedStrip = createUnsavedStrip.bind(this)();
      var _this=this;



       // draw
    

       function createHeader() {  
       var cellwidth = this.cellwidth;
             var ch='<div class="block ul ul-menu bg_7"><div class="li" style="width:'+cellwidth.col1+'"><div class="block _bdy"> <span class="fw-b tt-c">Locations</span></div></div><div class="li" style="width:'+cellwidth.col2+'"><div class="block _bdy"> <span class="fw-b tt-c">@</span><span class="fw-b tt-c">Surcharge</span></div></div><div class="li" style="width:'+cellwidth.col3+'"><div class="block _bdy"> <span class="fw-b tt-c"></span></div></div></div>';


            return ch;


           return ch;}
       function createBody(){  var ch='';
         var input=inputfrom.bind(this);
         var locData=this.Value.lif;
          var cellwidth = this.cellwidth;
     var ch='<div class="block ul bg_0"  >'; 
           var _this=this;
            
      for(var i=(locData.length-1);i>=0;i--){
     var onchange=function(){
       var newPrice=W.U.floatval(this.Node.value);
  this.Node.value=newPrice;
    _this.Value.lif[this.Id][1]=newPrice;

       
      };     
  var Row='<div class="block li b_gtl " ><div class="block ul ul-menu" >';
 Row+='<div class="li " style="width:'+cellwidth.col1+'"  ><div class="block _bdy" >'+locData[i][2]+'</div></div>';

 Row+='<div class="li " style="width:'+cellwidth.col2+'"  ><div class="block _bdy" >'+input(locData[i][1],'surcharge',i,onchange)+'</div></div>';
  Row+='<div class="li " style="width:'+cellwidth.col3+'"  ><div class="block _bdy" ><span class="sclose " data-Junction="shippinglocationclose'+i+'" style="margin-top:10px;margin-right:12px;"></span></div></div>';

Row+='</div></div>'; 

 ch+=Row;

    W.U.JunctionAdd(W.A.page.AppId,'shippinglocationclose'+i,function(){
      
      this.Node.onclick= onclose.bind({Node:this.Node,Id:this.data.Id}); ;

   },{Id:i}); 

      }

   
   
       ch += '</div>';


           return ch;}
       function createFooter() {
             var locData=this.Value.lif;
             
        //   // console.log(this);
          var ch='<div class="block  bg_0  _bdy  " ><div class="block ul "  >';  
 var token='';
                    var suggestion = {
                        name: 'shippinglocations',
                        fireAfter: 6,
                        type: 4,
                        token: 'chips',
                        placeholder: 'Name or Pincode of location',
                        onselect: onselect
                    }; 
  for( var q in locData ){  token += '<div class="li hide"><div class="token"> <span>' + locData[q][2] + '</span> <span class="sclose s_tclose" ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.name + '" value=\'' +JSON.stringify({id:locData[q][0]})  + '\' > </div></div>';

}    
  
                  
                   token+='<div class="li block"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div>';           

   ch += '<div class="form-piece"> <label class="control-label">Locations and Surcharge</label> <div class="form-token block" data-junction="categorysuggestion0"> <div class="block bd"><div class="block ul ul-menu">'+token+'</div><div class="block d po-ab collapse in"> </div></div></div></div>';
         W.U.JunctionAdd(W.A.page.AppId, 'categorysuggestion0', function () {
                      W.U.suggestion.bind({ Node: this.Node, Value: this.data })();
           }, suggestion);  


           ch +='</div></div>';
               
            return ch;
       }



       function calculateCellwidth() {
       return { col1: 55 + '%', col2: 35 + '%', col3: 10 + '%' };
          }
      


         function onselect() {
    
var id=this.data.li_data.id;
var name=this.data.name;
 _this.Value.lif.push([id,0.00,name]);
  _this.UnSaved=1;
 _this.init.bind(_this)();
       }
         function inputfrom(value,name,Id,onchnage){
           var ch='';
    
        var datajunction='';
        if(typeof onchnage !='undefined'){
            datajunction='data-Junction="shippingchargeonchange'+Id+'" ';
            var _this=this;
      W.U.JunctionAdd(W.A.page.AppId,'shippingchargeonchange'+Id,function(){
      this.Node.onchange= onchnage.bind({Node:this.Node,Id:Id}); ;
   },{});  

        }


      ch+='<div class="block"><div class="form-inline"> <div class="input-group "> <span class="input-group-addon">Rs.</span> <input type="text" name="'+name+'" '+ datajunction+' class="form-mold" autocomplete="off" value="'+value+'"  > </div></div></div>';


          return ch;

       }

         function onclose(){
         //    // console.log(this);
               var locData=_this.Value.lif;
               var Id=this.Id;
              for (var q in locData) {

                if (q == Id) {


                 locData.splice(q, 1);

                }

            }
             _this.init.bind(_this)();
         }
           function createUnsavedStrip(){
          var ch='';
          
          if(this.UnSaved==1){
              ch+='<div class="block  bg_8 fg_10 ff_3 _B-gray"> <div class="block _bdy">To save permanently this edit ,click save.</div></div>';  
          }
        

          return ch;
      }
       }

   
    
      new Handler(this.Node,this.Value);
  }


  //--==
    //--search
var blockList=[Locationsbtn,Locations];
var blockName=["Lcb","LcF"];
var setting ={
    name:'locations',
    target:0,
    page:true,
    minheight:'auto'
};
    return W.T.ToggleBlock(blockList, blockName,setting);
}


//== 
//from data


var frombody=function(x){
       var URL =W.U.URL;
           // console.log(x);
     var ch='';
             ch += '<div class="block  _bdy bg_0"><div data-help="addstoreshipping"></div>';

            ch += '<div class="form-piece"> <label>Name<i >*</i></label> <input type="text" name="shipping_name" class="form-mold" placeholder="Name" data-required="true" autocomplete="off" value="' + x.Name + '"> <div data-help="shipping_name"><p class="di-in  fg_4 fs-italic fs11" ><span>Shipping Name</span> <span>(internal reference)</span></p></div></div>';
                
            ch+=shippingchargeForm(x);



             ch+=LocationForm(x);


            ch += '<div class="form-piece"> <label>Description</label> <textarea name="description" class="form-mold" rows="3" >' + x.des + '</textarea> <input type="hidden" name="spgid" value="' + x.spgid + '"><div data-help="description"></div></div>';

            ch += '</div>';
        return ch;
            };

var formLogic =function() {
    // console.log(this);

    var rv = ['shipping_name', 'spgid'],
      f_value = W.F.walk_way_all(rv, this.formname),
      error=2, alert_mes = [];
        
       var  glueErrors=W.F.glueErrors({f_value:f_value,error:error});
     
       error=glueErrors.error;
   
   var alert_mes = alert_mes.concat(glueErrors.message);
  
    

  
 f_value.type=this.formData.type;
 f_value.srng=JSON.stringify(this.formData.srng);
 f_value.stcg=JSON.stringify(this.formData.stcg);
 f_value.lif=JSON.stringify(this.formData.lif);;
 
 if ((this.formData.lif.length) < 1) {  alert_mes = alert_mes.concat(['Location is required.']);error++; }
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
                                var AlertSuccess = W.T.AlertSuccess({ heading: '', message: 'Saved.' });
                                W.U.AddDom(this.form.formhelp, AlertSuccess, 'html');
                              W.F.alert(); 


                               

                             
                                var event = jQuery.Event("hide");

                                $(W.U.id('block.' + 'FW')).parent().triggerHandler(event);

                               
                                

                                $( W.U.id('deshboardwalkway')).triggerHandler("update",this.data);

                             

     }
var  onerror=function(){ W.U.madianLoading('hide');

var AlertError =  W.T.AlertError({message:this.data.message});
   W.U.AddDom(this.form.formhelp,AlertError,'html');
   W.F.alert(); 

     if( W.U.browser.opera_mini){
      alert(this.data);  
     }
 }

var Ragisterdata={
            option:{sendwith:'ajax'},
            formData:formData,
            frombody:frombody,
            onprogress:onprogress,
            onsuccess:onsuccess,
            onerror: onerror,
            formLogic:formLogic,
            formbtn:W.U.id('FWsubmit')
         };

//form data

    var ch ='<form name="addstoreshipping"  data-junction="addstoreshipping" onsubmit="return false"> </form>';
   
          W.U.JunctionAdd(W.A.page.AppId,'addstoreshipping',function(){
     
  W.U.form.bind({Node:this.Node,Value:this.data})();
  },Ragisterdata);   












                    }//do not call W.U.form  untill submit btn is not intilise



       

     return  ch;

}
//-->>



//== 
//-->>


//== 
   var Madian=function(x){
       var ch='';
  var header= W.T.C.C3_subPageheader({Title: '<a href="'+W.U.URL('dashboard_shipping')+'" class="left"><h2 class="truncate title" >shipping</h2><i class="badge _gbtn"></i> </a>'});
   var footer=W.T.Footer({});;
   //--EntityStrip datab

        ch+='<div class="block _bdy bg_0 _B-gray  m_b10">'+W.T.C.C2_EntityStrip(x.EntityStripdata,{})+'</div>';
 //-->>   
      ch+='<div class="block m_b10" data-nodeid="deshboardwalkway" >deshboardwalkway</div>';
    $('[data-appview="' + W.A.page.AppId + '"]').on('pageloaded',function(){
        // Always call inside from function 
        W.U.deshboard(x);
    });


   ch+= '<a href="javascript:void(0);"  data-learnmore="dashboard_shipping" >Learn More about Shipping</a>';


        return W.T.wrap(header,ch,footer);
   }
   
    
     
   
    

   
 var Landing=function(x){
       var ch ='';
   var  blockFront=Madian(x);
//--blockFront

var drawer= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Drawer</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }), W.T.C.C1_drawer_HomePageStore(x));
//--drawer

var hederAlert= W.T.wrap(W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<a href="javascript:void(0);" class="left"><h2 class="truncate title" >Alert</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'',
    dropdown:Array()
    }),W.T.C.C4_hederAlertStore(x));
//-search
var search= W.T.C.C5_SearchDrawer();


     //--learn more
var learnMore=  W.U.LearnMorewrap;











//--search
var blockList=[blockFront,drawer,hederAlert,search,learnMore];
var blockName=["blockFront","drawer","hederAlert","search","learnMore"];
var setting ={
    name:'mainpage',
    target:0,
    page:true,
    minheight:'auto'
};
    ch+=   W.T.ToggleBlock(blockList, blockName,setting);
       return ch;
  
   }

     W.M[W.A.page.AppId]=  {
         m:function(x){
             return W.T.Pane(Landing(x));
         }

     };
   


  

 } )(wowrol);