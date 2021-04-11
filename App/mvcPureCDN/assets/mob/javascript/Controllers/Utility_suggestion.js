/*
* page set up 2
*/
; (function(W){
   "use strict";

   function suggestion() { 


 function Handler(wrap,wrapdata) { 
        this.wrap = wrap;
 this.wrapdata = W.U.extend(Handler.Default, wrapdata);
        this.init();
    }
    Handler.Default = {
             name: 'suggestion',
             fireAfter: 4,
             type: '1',
             token: 'chips',
             placeholder: 'suggestion',
             dropdownModule:'lia',
             hover: true

         };
    Handler.prototype.init = function () {
        this.input = this.wrap.querySelector('[name="suggestion"]');
       
        this.dom = {};
        this.dom.wrapChild = this.wrap.firstElementChild;
        this.dom.up = this.dom.wrapChild.children[0];
        this.dom.inputli = this.input.parentNode;
        this.dom.down = this.dom.wrapChild.children[1];
        this.makedropdown = this.dropdown.bind(this);
        $(this.input).data('fire', 0);
        ;


        // console.log(this);
        // console.log(typeof (this.wrapdata.hover));
        if (typeof (this.wrapdata.hover) == 'undefined') {
            this.input.addEventListener("focus", this.onfocus.bind(this), false); //third
            this.input.addEventListener("blur", this.onblur.bind(this), false);
        } else {
            this.wrap.style.borderColor = "#fff";
        }

        this.input.addEventListener("input", this.oninput.bind(this), false);

        //-- 
        this.preclose.bind(this)();
        //empty on hide on  dropdown
        var type = this.wrapdata.type, input = this.input;
        $(this.dom.wrapChild).on('hidden.bs.dropdown', function () {
            if (type != 5) {
                input.value = '';
            }




        });



    }




    Handler.prototype.oninput = function () {
       
        var val = this.input.value;
        var selected = this.getselected.bind(this)();
        var wrapdata=this.wrapdata;
        var input = this.input;
        var fire = $(input).data('fire');
        var form = "suggestion";
        var formData = {
            form: form,
            f_value: {
                inputval: val,
                selected: selected,
                suggest: this.wrapdata.name
            }
        };
      
        var makedropdown = this.makedropdown; // local copy of this eliment
        if (fire == 0) {


            if (wrapdata.type == 1 || wrapdata.type == 2||wrapdata.type == 4||wrapdata.type == 5) {//multiple//single//onselect//search

                if (val.length >= wrapdata.fireAfter) {

                  W.U.ajax({
                        url:  W.U.URL('') + 'ajax/f0/p0',
                        data: formData,
                        context: this,
                        type: 'POST',
                        beforeSend: function () {

                            makedropdown({
                                Module: 'li',
                                Dropdown: [{ li_data: {},
                                    name: W.U.loading_svg(20, 20)
                                }]
                            });
                            $(input).data('fire', 1);
                        },
                        success: function (data) {
                            $(input).data('fire', 0);
                            var ret = JSON.parse(data);
                            if (ret.state == 500) {
                                makedropdown({
                                    Module: 'li',
                                    Dropdown: [{ li_data: {},
                                        name: 'No Result Found.'
                                    }]
                                });


                            }
                            if (ret.state == 200) {
                                if (ret.response.length > 0) {
                                    makedropdown({
                                        Module: wrapdata.dropdownModule,
                                        Dropdown: ret.response
                                    });
                                } else {
                                    makedropdown({
                                        Module: 'li',
                                        Dropdown: [{ li_data: {},
                                            name: 'No Result Found.'
                                        }]
                                    });
                                }



                            }



                        }



                    });

                } else { // keep typing

                    this.makedropdown({
                        Module: 'li',
                        Dropdown: [{ li_data: {},
                            name: 'keep typing..'
                        }]
                    });
                }
            }




          if (this.wrapdata.type == 3 ){ //comma seprated
                 var ESCAPES = /[,]/g;
      if (ESCAPES.test(val)) {
        val = val.replace(ESCAPES, ""); 
        
           if (val.length > 0) {
                  var token = this.maketoken({ type: this.wrapdata.token,
            data: {
                name: val,
                li_data: {id:val}
            }
        });  
            var parselist = W.U.Rander(token);
         var allclose = W.U('.sclose',parselist[0]);

        for (var p = 0; p < allclose.length; p++) {

        allclose[p].addEventListener("click",this.onclose.bind({ suggestion: this, self: allclose[p] }), false); //third
      

        }
         $(parselist).insertBefore(this.dom.inputli);
          this.input.value = "";
           }
               

                  }
         


            }


         

        }


    }

    Handler.prototype.getselected = function () {
        var selected = Array('');

        var hiddeninput = this.dom.up.querySelectorAll('[type="hidden"]');
       
        for (var q = 0, i = 0; q < hiddeninput.length; q++) {
            var val = $(hiddeninput[q]).val();
            if (val != 'undefined') {
                var jvalue = JSON.parse(val);
                if (typeof (jvalue) != 'undefined') {
                    selected[i] = JSON.parse(val).id;
                    i++;
                }

            }

        }

        return selected;
    }

    Handler.prototype.dropdown = function (x) {
        var input_value = this.input.value;
        var DropdownModule = {
            lia: function (x) {
                var ch = '';
                for (var q in x) {

                    var li_data = x[q].li_data;
                    ch += '<li  ><a href="javascript:void(0);"  data-suggestionli=\'' + JSON.stringify(x[q].li_data) + '\' >' + W.U.highlight(x[q].name, input_value) + '</a></li>';
                }

                return ch;
            },
            li: function (x) {
                var ch = '';
                for (var q in x) {

                    ch += '<li class="al-c" >' + x[q].name + '</li>';
                }

                return ch;
            },
            cardentity:function(x){
                        var ch = '';
                for (var q in x) {
                
                    var li_data = x[q].li_data;
var card=W.T.C.C2_EntityStrip(li_data,{link:false,moredata:Array()});

        ch += '<li  ><a href="javascript:void(0);" class="block"  data-suggestionli=\'' + JSON.stringify({id:li_data.eid,af:li_data.af}) + '\' >' + card + '</a></li>';
       
                }

                return ch; 


            }
        };

        var list = '<ul class="block  dropdown-menu ov-au" style="max-height:250px;" data-toggle="dropdown"   >';
        switch (x.Module) {
            case 'li':
                list += DropdownModule.li(x.Dropdown);
                break;
            case 'lia':
                list += DropdownModule.lia(x.Dropdown);
                break;
            case 'cardentity':
              list += DropdownModule.cardentity(x.Dropdown);
            break;

        }
        list += '</ul> ';

        var parselist =  W.U.Rander(list);
        var allLink = parselist[0].querySelectorAll('a');

        for (var p = 0; p < allLink.length; p++) {
            allLink[p].onclick = this.onDropdownliaclick.bind({suggestion:this,self:allLink[p]});

        }

       W.U.Setview(this.dom.down, parselist, 'html');
        this.dom.down.classList.add('open');
        this.dom.down.style.display = "block";



    }

    Handler.prototype.onDropdownliaclick = function () {
        var self = this.self;
        var suggestion = this.suggestion;
        var SavedDAta = $(self).data();
 //     console.log(this);
        var token = suggestion.maketoken({ type: suggestion.wrapdata.token,
            data: {
                name: self.textContent,
                li_data: SavedDAta.suggestionli
            }
        });
        var parselist = W.U.Rander(token);
         
        var allclose = W.U('.sclose',parselist[0]);

        for (var p = 0; p < allclose.length; p++) {

            allclose[p].addEventListener("click", suggestion.onclose.bind({ suggestion: suggestion, self: allclose[p] }), false); //third


        }


        if (suggestion.wrapdata.type == 1) {//multiple

            $(parselist).insertBefore(suggestion.dom.inputli);

        }
        if (suggestion.wrapdata.type == 2) { //single
           W.U.Setview(suggestion.dom.up, parselist, 'html');

        }
         if (suggestion.wrapdata.type == 4) { //onselect call back
       
         var data={
                name: self.textContent,
                li_data: SavedDAta.suggestionli
            };

      var onselect= suggestion.wrapdata.onselect;
      onselect.bind({suggestion:suggestion,data:data})();

       $(parselist).insertBefore(suggestion.dom.inputli);

        }

       suggestion.dom.down.style.display = "none";
       suggestion.input.value = "";


       // Inner function for making token

       
    }
    Handler.prototype.onfocus = function () {
          this.wrap.style.borderColor = "#84a0ba";
         
       
      
    }
    Handler.prototype.onblur = function () {
       this.wrap.style.borderColor = "#d3dbe2";


    }

    Handler.prototype.onclose = function () {
           var self = this.self;
        var suggestion = this.suggestion;

        if (suggestion.wrapdata.type == 1||suggestion.wrapdata.type == 3) {//multiple/ comma sepreated
            $(self).parents('.token').parent().remove();
        }
        if (suggestion.wrapdata.type == 2) {//single

             var data456={name: suggestion.wrapdata.name,
                      type: suggestion.wrapdata.type,
                      fireAfter:suggestion.wrapdata.fireAfter,
                      token:suggestion.wrapdata.token,
                      placeholder:suggestion.wrapdata.placeholder
                                                                   };

            var newset = '<div class="form-token block" data-junction="'+data456.name+'"> <div class="block bd"><div class="block ul ul-menu"> <div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.wrapdata.placeholder + '"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div>';

 W.U.JunctionAdd(W.A.page.AppId,data456.name,function(){
    W.U.suggestion.bind({Node:this.Node,Value:this.data})();
        },data456);  

            var newlist =  W.U.Rander(newset);
        
           suggestion.wrap.parentNode.replaceChild(newlist[0], suggestion.wrap);
        }
    }

    Handler.prototype.preclose = function () {

        var allclose =  W.U('.sclose',this.dom.up);
      
        for (var p = 0; p < allclose.length; p++) {

            allclose[p].addEventListener("click", this.onclose.bind({ suggestion: this, self: allclose[p] }), false); //third


        }
    }
    Handler.prototype.maketoken = function (x) {
      var suggestion = this;
     //        console.log(x);
            var template = {
                chips: function (x) {
                    var ch = '';

                    ch += '<div class="li"><div class="token"> <span>' + x.name + '</span> <span class="sclose s_tclose"  data-suggestionClose=\'' + JSON.stringify({
                        name: suggestion.wrapdata.name,
                        type: suggestion.wrapdata.type,
                        token: suggestion.wrapdata.token,
                        placeholder: suggestion.wrapdata.placeholder
                    }) + '\' ></span> <input class="tokenh_input" type="hidden"  name="' + suggestion.wrapdata.name + '" value=\'' +JSON.stringify( x.li_data)+ '\' > </div></div>';


                    return ch;

                },
                card:function(x){
var ch='<div class="block"> <div class="d3 p0 di-td"> <a href="http://localhost:3325/keshav"> <img class="sr-img-45" src="http://localhost:3325/assets/imgs/pic/avatar.png" alt="..."> </a></div><div class="di-td p1 al-l vl-t "> <span class="span _pnl "> <span class="pnl0 truncate"><a href="http://localhost:3325/keshav" style="max-width:50px;">keshav</a></span><span class="span mklabel  circular empty "></span><span class="pnl1 span" title="Varified"><svg width="13px" height="13px" xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 26 26" enable-background="new 0 0 24 24" fill="#7cb342"><path d="M13,0.188C5.924,0.188,0.188,5.924,0.188,13S5.924,25.813,13,25.813S25.813,20.076,25.813,13 S20.076,0.188,13,0.188z M19.736,9.035l-6.871,10.132c-0.206,0.303-0.528,0.504-0.848,0.504s-0.675-0.175-0.9-0.399l-4.032-4.033 c-0.274-0.275-0.274-0.722,0-0.996l0.996-0.998c0.274-0.272,0.722-0.272,0.995,0l2.623,2.623l5.705-8.414 c0.217-0.32,0.657-0.403,0.979-0.187l1.166,0.791C19.869,8.275,19.953,8.715,19.736,9.035z"></path></svg></span></span> <span>@keshav</span>  </div></div>';
                    

return ch;
                }

            };
            var token = '';
            switch (x.type) {
                case 'chips':
                    token += template.chips(x.data);
                    break;

            }





            return token;
        }
 new Handler(this.Node,this.Value);
}


W.U.suggestion=suggestion;

})(wowrol);