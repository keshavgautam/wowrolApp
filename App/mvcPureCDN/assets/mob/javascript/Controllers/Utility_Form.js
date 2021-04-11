
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
            this.option = Value.option;

            this.init();
            $(this.form).on('reset', this.outer.bind(this));

        }
        Handler.prototype.init = function () {
              
            this.formname = $(this.form).attr('name');
            this.formhtml =W.U.Rander(this.frombody(this.formData));
         
            this.formhelp =W.U('[data-help="'+this.formname+'"]',this.formhtml[0])[0]; 
            
            this.formbtnMain =(this.formbtn=='')?W.U('[type="submit"]',this.formhtml[0])[0]:this.formbtn;
      



   W.U.Setview(this.form, this.formhtml, 'html');

  this.formbtnMain.onclick=this.submit.bind(this);
   //  console.log(this);
        }


        Handler.prototype.outer = function (e) {
            if (typeof (e.formData) != 'undefined') {
                this.formData = e.formData;

            }

            this.init();
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
               var  ret = JSON.parse(data);
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


    W.U.form = form;



})(wowrol);
/*
*     var data={
            formData:{},
          frombody:function(x){ console.log('form boddy');  return x; },
            onprogress:function(x){ console.log('form onprogress');  return x; },
            onsuccess:function(x){console.log('form onsuccess');return x; },
            onerror:function(x){console.log('form onerror');return x; },
            formLogic:function(x){console.log('form formLogic');return x; }
            formbtn:''
 formLogic will return three parameter
 {error:0,
 f_value:{}//required input value
 AlertError:{} //alert

  }



         };
*/