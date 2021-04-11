/*
* 
*/
; (function(W){
   "use strict";

      /**
    * @description  Toggle password of login form
    */
 function TogglePassword() {
    var Button = $(this)
    var FormPiece = Button.parents('.form-piece');
    var Input = FormPiece.find('.form-mold');
    var Type = Input.attr('type');
    if (Type == "password") {
     Input.attr('type', 'text');
     Button.text('Hide').addClass('btn-warning');
    } else {
     Input.attr('type', 'password');
     Button.text('Show').removeClass('btn-warning');
    }




   }

/**
    * @description  capitalize the given string
    */
function capitalize(s) {
    return s.replace(/(?:^|\s)\S/g, function(a) {
     return a.toUpperCase();
    });
   }

   /**
    * @description  get the readable name from input name string
    */
function  real_name(s) {
    var clean = s.replace(/[_]/g, ' ');
    return capitalize(clean);
   }

   /**
    * @description  Toggle error alert message
    */
function alert() {
    // Jquery animation
   
    $(".alert").slideDown("slow").delay(6000).slideUp("slow", function() {
     $(".alert").remove()
    });
   

   }
 /**
    * @description  Toggle error alert message
    */
 function check_password(words) {
    var check = /[`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (words.length < 8) {

     return false;


    }
    if (check.test(words)) {

     return true;


    } else {
     return true;
    }

    return false;
   }
 /**
 * @description  
*/  
function glueErrors(x){
        var alert_mes=[];
        for(var q in x.f_value){
          if (x.f_value[q] == '') {
       alert_mes.push('<li>' + this.real_name(q) + ' is required.</li>');

            } else {
              x.error--;
            }     

        }
        return {message: alert_mes,error:x.error};
    }
 /**
 * @description  
*/ 
function walk_way_all(a, fid) {
    var walk_way = {};
    var forms = document.forms;

    for (var t = 0; t < a.length; t++) {

     walk_way[a[t]] = '';


    }
    for (var i = 0; i < forms.length; i++) {

     if (forms[i].id == fid||forms[i].name == fid) {

      for (var j = 0; j < forms[i].elements.length; j++) {

       for (var t = 0; t < a.length; t++) {

        if (forms[i].elements[j].name == a[t]) {
         var is_allow = $(forms[i].elements[j]).attr('data-required');
         // collecting value
         if (forms[i].elements[j].value != '') {
          walk_way[a[t]] = $.trim(forms[i].elements[j].value);

         }




         // if this data is required
         if (is_allow === "true") {

          if (forms[i].elements[j].value != '') {
           $(forms[i].elements[j]).parents('.form-piece').removeClass('has-error');


          } else {
           $(forms[i].elements[j]).parents('.form-piece').addClass('has-error');
          }

         } //(is_allow === "true")



             //for type checked and radio
if (forms[i].elements[j].type == "checkbox" ||forms[i].elements[j].type == "radio") {

                                // collecting value
                                if (forms[i].elements[j].checked == true) {
                                    walk_way[a[t]] = 1;

                                } else {
                                   walk_way[a[t]] = 'off';
                                }


                            }


        }



       }


      }
     }
    }

    return walk_way;
   }

  /**
    * @description  JSONparse
    */
function JSONparse(str,parse){
        
           if (str != 'undefined'&&str != '') {
                  var jvalue = JSON.parse(str);
                  if (typeof (jvalue) != 'undefined') {
                    parse = JSON.parse(str);
                  }

                   }
                   return parse;
    }

function json_scan(element, list) {
        var res;
        if (typeof (list) != 'undefined') {
            if (typeof (list) == 'object') {
                for (var key in list) {
                    if (typeof (res) == 'undefined') {
                        res = (key == element) ? list[key] : json_scan(element, list[key]);
                    }
                }
            }
        }
        return res;


    }
function ScrollLoadAllow (target) {

    var yOffset = window.pageYOffset;
    var y = yOffset + window.innerHeight;
    var page_height = window.pageYOffset,
           contentHeight = $(target).height();

    return (y >= contentHeight);
}

function  escapeHTML(text) {

        var HTML_ESCAPES = {
            "\n": '</p><br><p>',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&apos;',
            '.': '&period;',
            ';': '&semi;',
            ':': '&colon;',
            '(': '&lpar;',
            ')': '&rpar;',
            '{': '&lcub;',
            '}': '&rcub;',
            '#': '&num;',
            '%': '&percnt;',
            '^': '&Hat;',
            '=': '&equals;',
            '$': '&dollar;',
            '?': '&quest;',
            ',': '&comma;',
            '|': '&verbar;',
            '`': '&grave;',
            '!': '&excl;',
            '/': '&#x2F;'
        }, HTML_ESCAPE_CHARS = /[&<>"'\/]/g;

        return text.replace(/[&<>"'.;:(){}#%^=$?,|!`\/\n\r]/g, function (match) {
            return HTML_ESCAPES[match];
        });
    }
function makeHTML (text) {

        var HTML_ESCAPES = {
            "</p><br><p>": '\n'

        };

        return text.replace(/[<\/p><br><p>]/g, function (match) {
            return HTML_ESCAPES[match];
        });
    }
/**
* @description Control button states 
* @parma {'state':'loading',text:'',LoadingText:'Loading',svg:false} 
*/
var ButtonStateDefalut={state:'loading',text:'',LoadingText:'Loading',svg:false} ;
function ButtonState(Node,args){
args = W.U.extend(ButtonStateDefalut, args);  

 switch(args.state){
 case 'loading':

 if(args.svg){
  $(Node).html(W.U.loading_svg(14,14));   
 }else{
 $(Node).html(args.LoadingText);  
  
 }
     break;
    case 'loadingoff':
      console.log(args);
 $(Node).html(args.text);  console.log(Node);
     break;
     case 'disable':
 $(Node).attr('disabled','disabled').html(args.text);
     break;    
 }
 
   
}

function Toast(msg){
         alert(msg);
         alert('asdasd');
}

W.F.Toast=Toast;
W.F.TogglePassword=TogglePassword;
W.F.capitalize=capitalize;
W.F.real_name=real_name;
W.F.alert=alert;
W.F.check_password=check_password;
W.F.glueErrors=glueErrors;
W.F.walk_way_all=walk_way_all;
W.F.JSONparse=JSONparse;
W.F.json_scan=json_scan;
W.F.ScrollLoadAllow=ScrollLoadAllow;
W.F.escapeHTML=escapeHTML;
W.F.makeHTML=makeHTML;
W.F.ButtonState=ButtonState;
W.F.Forms={};// carry all form  in appjs and suplly to dashboard



})(wowrol);