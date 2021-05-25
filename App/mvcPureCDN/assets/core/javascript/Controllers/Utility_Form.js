
; (function (W) {
    "use strict";

    function form() {


        function Handler(form, Value) {
            this.form = form;
            this.formData = Value.formData;
            this.frombody = Value.frombody;
            this.onprogress = Value.onprogress;
            this.onerror = Value.onerror;
            this.onsuccess = Value.onsuccess;
            this.formLogic = Value.formLogic;
            this.formbtn = (typeof(Value.formbtn) =='undefined')?'':Value.formbtn;
            this.option =  W.U.extend(Handler.DefaultOption, Value.option);

            this.init();
          //  $(this.form).on('reset', this.outer.bind(this));
            /*
          commented due to  web view focus problem
            this.form.onreset=this.outer.bind(this);*/
          
  W.U.ccbk.Add(this.form,'reset',this.outer_ccbk.bind(this));
  W.U.ccbk.Add(this.form,'zingreset',this.ZingReset.bind(this));
  W.U.ccbk.Add(this.form,'submit',this.submit.bind(this));
        }

             Handler.DefaultOption = {
           sendwith:'ajax',
          onbeforeinsert:function(){}

         };

        Handler.prototype.init = function () {
              
            this.formname = $(this.form).attr('name');
            this.formhtml =W.U.Rander(this.frombody(this.formData));
         
            this.formhelp =W.U('[data-help="'+this.formname+'"]',this.formhtml[0])[0]; 
            
            this.formbtnMain =(this.formbtn=='')?W.U('[type="submit"]',this.formhtml[0])[0]:this.formbtn;
      
             this.option.onbeforeinsert.bind(this)();


   W.U.Setview(this.form, this.formhtml, 'html');


     if(  W.U.browser.height_free){
   
       this.formbtnMain=    W.U.OperaMini.changebutton( this.formbtnMain);
            this.formbtnMain.onclick=this.submit.bind(this);  
           }else{
           this.formbtnMain.onclick=this.submit.bind(this);      
           }
   //  W.U.console(this);
        }


        Handler.prototype.outer = function (e) {
            if (typeof (e.formData) != 'undefined') {
                this.formData = e.formData;

            }

            this.init();
        }
        Handler.prototype.outer_ccbk = function (data) {
            if (typeof (data) != 'undefined') {
                this.formData = data;

            }

            this.init();
        }
        Handler.prototype.ZingReset = function (data) {
            if (W.U.isOK(data['zingData'])) {
             


                ZingReset(this.form,data['zingData']);
            }
           if (W.U.isOK(data['formData'])) {
             
                    this.formData = data['formData'];

            }
           
        }

        Handler.prototype.submit = function () { 
 var formLogic=this.formLogicdata= this.formLogic.bind(this)();


   if(formLogic.error==0){
       //--submition
       var sendwith=(this.option.sendwith=='ajax')?W.U.ajax: W.U.iFePost;
       var url=(this.option.sendwith=='ajax')?W.U.URL('') + 'ajax/f0/p0': W.U.URL('') + 'ajax/f0/p1';
           var  formData = {
              form:this.formname,
             f_value: formLogic.f_value
            };
var onprogress=this.onprogress;
var onsuccess=this.onsuccess;
var onerror=this.onerror;
var form=this;
       sendwith({
           url: url,
                data: formData,
                context: this,
                type: 'POST',  
                beforeSend:onprogress.bind({form:form}),
                success: function(data){
              
               var  ret = W.F.JSONparse(data,{state:500});
                      if (ret.state == 200) {
          onsuccess.bind({form:form,data:ret.response})();    
                      }
                if (ret.state == 500) {
            onerror.bind({form:form,data:ret.mistake})();    
                      }


         
                }
                
                
                
                


       });




       //--submition
   }else{
     W.U.AddDom(this.formhelp,formLogic.AlertError,'html');
        W.F.alert(); 
   }

        }

        new Handler(this.Node, this.Value);
    }



  function ZingReset(forms,data){
     
              for (var j = 0; j < forms.elements.length; j++) {
                  var Element=forms.elements[j];
                       for(var property in data) {
                         if (Element.name == property) {
                        
                           switch (Element.nodeName) {
                                 case 'INPUT':
                    switch (Element.type) {
                        case 'radio':
                        case 'checkbox':
                          Element.checked = (data[property]) ? true : false;
                            break;

                        default:
                         Element.value = data[property];
                       
                         if(W.U.isOK(Element['forcontenteditable'])){
                                W.U.ccbk.Run( Element,Element['forcontenteditable'],data[property]); 
                         }

                    }


                    break;  
                         case 'SELECT':

                   Element.value = data[property];

                    break;
                case 'TEXTAREA':
                  
                  Element.value = data[property];

                    break;
          
                    
                     
                             }


                         }   
                       }
              }
              //---


    }


    W.U.form = form;
    W.U.formReset=function(formname,data){
      
        W.U.ccbk.Run(formname,'reset',data);

    } 


})(wowrol);
/*
*     var data={
            formData:{},
          frombody:function(x){ W.U.console('form boddy');  return x; },
            onprogress:function(x){ W.U.console('form onprogress');  return x; },
            onsuccess:function(x){W.U.console('form onsuccess');return x; },
            onerror:function(x){W.U.console('form onerror');return x; },
            formLogic:function(x){W.U.console('form formLogic');return x; }
            formbtn:''
 formLogic will return three parameter
 {error:0,
 f_value:{}//required input value
 AlertError:{} //alert

  }



         };
*/