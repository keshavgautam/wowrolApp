/*
* 
*/
; (function(W){
   "use strict";



/* 
fn_13_masker.js

 */
function masker() { 

   function Handler(Node,Value) {
       this.Node = Node;;
     this.name = $(this.Node).attr('name');
     this.help = $(this.Node).parent().find('[data-help="'+this.name+'"]').get(0);
     this.Value = Value;;
      this.init();
    }
    Handler.prototype.init = function () {
        var perform = function () { };
        switch (this.Value.type) {
            case 'Money':
                perform = this.Money.bind(this);
                this.Node.onkeyup = perform;
                break;
            case 'Number':
                perform = this.Number.bind(this);
                  this.Node.onkeyup = perform;
                break;
            case 'AlphaNum':
                perform = this.AlphaNum.bind(this);
                  this.Node.onkeyup = perform;
                break;
           case 'phone':
                perform = this.phone.bind(this);
                  this.Node.onchange = perform;
                break;
          
            case 'URL':
                 perform = this.url.bind(this);
                  this.Node.onkeyup = perform;
                break;
            case 'Pattern':
                perform = this.Pattern.bind(this);
                 this.Node.onkeyup = perform;
                break;
            case 'Custom':
                perform = this.Custom.bind(this);
                 this.Node.onkeyup = perform;
                break;
        }
         //  console.log(this);
       
     
       
    }

    Handler.prototype.uti = {
       DIGIT:"9",
       ALPHA :"A",
       ALPHANUM :"S",
       BY_PASS_KEYS : [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
      isAllowedKeyCode : function(keyCode) {
        for (var i = 0, len = this.BY_PASS_KEYS.length; i < len; i++) {
          if (keyCode == this.BY_PASS_KEYS[i]) {
            return false;
          }
        }
        return true;
      }


    };

  Handler.prototype.Money = function (e) {
        var _this = this;
            if (_this.uti.isAllowedKeyCode(e.keyCode)) {
        
        this.Node.value = makeMask(this.Node.value);
   

        }

      

    function makeMask(value) {
      
        var opts=mergeMoneyOptions(_this.Value.option);
          if (opts.zeroCents) {
      opts.lastOutput = opts.lastOutput || "";
      var zeroMatcher = ("("+ opts.separator +"[0]{0,"+ opts.precision +"})"),
          zeroRegExp = new RegExp(zeroMatcher, "g"),
          digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
          lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0
      ;
      value = value.toString().replace(zeroRegExp, "");
      if (digitsLength < lastDigitLength) {
        value = value.slice(0, value.length - 1);
      }
    }
    var number = value.toString().replace(/[\D]/g, ""),
        clearDelimiter = new RegExp("^(0|\\"+ opts.delimiter +")"),
        clearSeparator = new RegExp("(\\"+ opts.separator +")$"),
        money = number.substr(0, number.length - opts.moneyPrecision),
        masked = money.substr(0, money.length % 3),
        cents = new Array(opts.precision + 1).join("0")
    ;
    money = money.substr(money.length % 3, money.length);
    for (var i = 0, len = money.length; i < len; i++) {
      if (i % 3 === 0) {
        masked += opts.delimiter;
      }
      masked += money[i];
    }
    masked = masked.replace(clearDelimiter, "");
    masked = masked.length ? masked : "0";
    if (!opts.zeroCents) {
      var beginCents = number.length - opts.precision,
          centsValue = number.substr(beginCents, opts.precision),
          centsLength = centsValue.length,
          centsSliced = (opts.precision > centsLength) ? opts.precision : centsLength
      ;
      cents = (cents + centsValue).slice(-centsSliced);
    }
    var output = opts.unit + masked + opts.separator + cents + opts.suffixUnit;
    return output.replace(clearSeparator, "");
 }

    function mergeMoneyOptions (opts) {
        opts = opts || {};
        opts = {
          precision: opts.hasOwnProperty("precision") ? opts.precision : 2,
          separator: opts.separator || ".",
          delimiter: opts.delimiter || ",",
          unit: opts.unit && (opts.unit.replace(/[\s]/g,'') + " ") || "",
          suffixUnit: opts.suffixUnit && (" " + opts.suffixUnit.replace(/[\s]/g,'')) || "",
          zeroCents: opts.zeroCents,
          lastOutput: opts.lastOutput
        };
        opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
        return opts;
      }

    }
  Handler.prototype.Number = function (e) {
         var _this = this;
       if (_this.uti.isAllowedKeyCode(e.keyCode)) {
        
        this.Node.value = makeMask(this.Node.value);
  
        }

        function makeMask(value) {

       return value.toString().replace(/(?!^-)[^0-9]/g, "");
        }

   
      
    }
  Handler.prototype.AlphaNum = function (e) {
        var _this = this;
       if (_this.uti.isAllowedKeyCode(e.keyCode)) {
        
        this.Node.value = makeMask(this.Node.value);
        this.Node.lastOutput= this.Node.value;
      //  console.log(this.Node.value);
        }

        function makeMask(value) {

       return value.toString().replace(/[^a-z0-9]+/i, "");
        }

      
    }
 Handler.prototype.phone = function (e) {
         var _this = this;
       if (_this.uti.isAllowedKeyCode(e.keyCode)) {
        
        this.Node.value = makeMask(this.Node.value);
  
        }

        function makeMask(value) {
           var match=value.toString().match(/(7|8|9)\d{9}/);
      if(match!=null){
          return match[0];
      }else{
  _this.alert('Please Enter a Valid Phone Number .');
      return '';
      }


        }

   
      
    }
Handler.prototype.url = function (e) {
         var _this = this;
       if (_this.uti.isAllowedKeyCode(e.keyCode)) {
        
        this.Node.value = makeMask(this.Node.value);
  
        }

        function makeMask(value) {
       var ESCAPES = /[&<>"'.;:@~+\\\*\_(){}#%^=$?,|!`\/]/g;
     if (ESCAPES.test(value)) {


     value = value.replace(ESCAPES, "");

     }

     var space = /[ ]/g;
     if (space.test(value)) {
     value = value.replace(space, "-");

     }




     return value;

        }

   
      
    }

Handler.prototype.alert=function(mess){
   var AlertError =  W.T.AlertError({message:[mess]});
   W.U.AddDom(this.help,AlertError,'html');
        W.F.alert(); 
}

 new Handler(this.Node,this.Value);
}
   
    

   


     W.U.masker=masker;


})(wowrol);