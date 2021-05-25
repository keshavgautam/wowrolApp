/*
*
*
*/

; (function(W){
   "use strict";
  
   function  GetIconOrName(name,button_class){
       var ch='';

       if(/btn\-xs/igm.test(button_class)){
          
         switch(name){
         case 'msg':
       ch=W.T.SVG('chats',14,'#f1f5fc');
       break;     
       case 'shg':
       ch=W.T.SVG('money',14,'#f1f5fc');
       break; 
       case 'addfriend':
       ch='text_202 ';
       break; 
       case 'Friendrequestsent':
       ch='text_203';
       break; 


       }  
       }else{
        switch(name){
        case 'msg':
       ch='text_200 ';
       break;     
       case 'shg':
       ch='text_201 ';
       break; 
       case 'addfriend':
       ch='text_202 ';
       break; 
       case 'Friendrequestsent':
       ch='text_203';
       break;

       }      

       }
       


       return ch;
   }



   function relationWrap(){
      function Handler(wrap, x, btn_class) {
            this.twr = x.twr;
            this.owr = x.owr;
            this.mes = x.mes;
            this.shg = x.shg;
            this.btn_class = btn_class;
            this.wrap = wrap;
      
            this.init();
        }



Handler.prototype={
 init:   function () {
           
            this.twrbtn = this.twrButton(this.twr, this.btn_class);
            this.owrbtn = this.owrButton(this.owr, this.btn_class);
            this.msgbtn = this.msgButton(this.mes, this.btn_class);
            this.shgbtn = this.shgButton(this.shg, this.btn_class);
            this.btnwrap = '<div class=" btn-group m_b10" role="group">' + this.twrbtn + this.owrbtn +this.msgbtn +this.shgbtn+ '</div>';

           
             //W.U.console(this);
          W.U.AddDom(this.wrap, this.btnwrap, 'html');
        },
msgButton: function (x, button_class) {
              var ch=''; 
              var     disabled = (!W.A.page.AcessData.LoginStatus)?' disabled ="disabled" ':' data-pagertogglepage="mainpage:ProfileSendMessage:'+x.feid+'" ';
             if(x.allow==1){
              ch='<div class="btn _fbtn btn-xs no-p-l no-p-r no-p-t no-p-b no-border m_t5"><button type="button " class="btn ' + button_class + '  _fbtn " aria-expanded="false" '+ disabled+'     >'+GetIconOrName('msg',button_class)+'</button> </div>';   
             }

            return ch;
        },
shgButton:function (x, button_class) {
             var ch='';
                var     disabled = (!W.A.page.AcessData.LoginStatus)?' disabled ="disabled" ':' data-pagerbtn="mainpage:goonshopping:'+x.feid+'" ';      
             if(x.allow==1){
              ch='<div class="btn _fbtn btn-xs no-p-l no-p-r no-p-t no-p-b no-border m_t5"><button type="button " class="btn ' + button_class + ' _fbtn " aria-expanded="false" '+disabled+'  >'+GetIconOrName('shg',button_class)+'</button> </div>';   
            
             }

            return ch;
        },
twrButton:function (x, button_class) {
            var ch = ' ';
    if(W.A.page.AcessData.LoginStatus){
            var relation = this;
            var twrOn = 'data-junction="twrOn' + x.feid + '"' ;
            var twrOff = 'data-junction="twrOff' + x.feid + '"';
            var f_btn = ''; var b_btn = '';
             if(x.a){
            if (x.rtype == 1) {
ch += '<div class="btn _fbtn btn-xs no-p-l no-p-r no-p-t no-p-b no-border m_t5"> ';
                switch (x.status) {
                    case 2:
                        f_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + twrOn + ' > '+GetIconOrName('addfriend',button_class)+'</button> </div>';

                        b_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > '+GetIconOrName('Friendrequestsent',button_class)+' <span class="caret"></span> </button>  <div class="hide po-ab" data-block="menu"><ul class="dropdown-menu" > <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >text_204</a></li> </ul></div> </div>';

                        break;
                    case 7:
                        if (x.rpdr == 'ae') {
                            f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > text_203 <span class="caret"></span> </button>  <div class="hide po-ab" data-block="menu"><ul class="dropdown-menu" > <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >text_204</a></li> </ul></div> </div>';

                            b_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + twrOn + ' >'+GetIconOrName('addfriend',button_class)+'</button> </div>';
                        }
                        if (x.rpdr == 'fe') {


                            f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" >Want to be your friend<span class="caret"></span> </button>  <div class="hide po-ab" data-block="menu"><ul class="dropdown-menu" ><li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOn + ' >text_209</a></li> <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >text_208 </a></li> </ul></div> </div>';
                            b_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" > text_207 </button> </div>';
                        }


                        break;
                    case 6:

                        f_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + twrOn + ' >'+GetIconOrName('addfriend',button_class)+'</button> </div>';
                        b_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > text_203 <span class="caret"></span> </button>  <div class="hide po-ab" data-block="menu"><ul class="dropdown-menu" > <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >text_204</a></li> </ul></div> </div>';

                        break;
                    case 5:

                        if (x.rpdr == 'fe') {
                            f_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + twrOn + ' >'+GetIconOrName('addfriend',button_class)+'</button> </div>';

                            b_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > text_203 <span class="caret"></span> </button>  <div class="hide po-ab" data-block="menu"><ul class="dropdown-menu" > <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >text_204</a></li> </ul></div> </div>';
                        }

                        break;
                    case 3:
                        f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > text_205<span class="caret"></span> </button>  <div class="hide po-ab" data-block="menu"><ul class="dropdown-menu" > <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOn + ' >text_206</a></li> </ul></div> </div>';
                        b_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" >  text_207 </button> </div>';
                        break;


                }

if(f_btn!=''&&b_btn!=''){
     var blockList = [f_btn, b_btn];
                var blockName = ["f_btn" + x.feid, "b_btn" + x.feid];
                var setting = {
                    name: 'twbtn' + x.feid,
                    target: 0,
                    page: false,
                    minheight: 'auto'
                };
                ch += W.T.ToggleBlock(blockList, blockName, setting); 
}
              

          W.U.JunctionAdd(W.A.page.AppId, 'twrOff' + x.feid + '', function () {

                    this.Node.onclick = relation.ontwrclick.bind({ Node: this.Node, setting: x, action: 0, relation: relation });

                }, {});
          W.U.JunctionAdd(W.A.page.AppId, 'twrOn' + x.feid + '', function () {

                    this.Node.onclick = relation.ontwrclick.bind({ Node: this.Node, setting: x, action: 1, relation: relation });

                }, {});
                  ch += '</div>';
            }
            }
}
          
            return ch;
        },
owrButton:function (x, button_class) {
            var ch = '';



            if(W.A.page.AcessData.LoginStatus){
            var relation = this;
            var owrOn = 'data-junction="owrOn' + x.feid + '"';
            var owrOff = 'data-junction="owrOff' + x.feid + '"';
            var f_btn = ''; var b_btn = '';
            var names = owrNames(x);
              if(x.a){
            if (x.rtype == 1) {
    ch += '<div class="btn _fbtn btn-xs no-p-l no-p-r no-p-t no-p-b no-border m_t5"> ';
                switch (x.status) {
                    case 2:
                        f_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="owrbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + owrOn + ' >' + names['follow'] + '</button> </div>';

                        b_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > ' + names['following'] + ' <span class="caret"></span> </button>  <div class="hide po-ab" data-block="menu"><ul class="dropdown-menu" > <li><a href="javascript:void(0);" data-closebtn="owrbtn' + x.feid + '" ' + owrOff + ' >' + names['unfollow'] + '</a></li> </ul></div> </div>';

                        break;
                    case 3:
                        f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > ' + names['following'] + ' <span class="caret"></span> </button>  <div class="hide po-ab" data-block="menu"><ul class="dropdown-menu" > <li><a href="javascript:void(0);" data-openbtn="owrbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + owrOff + ' >' + names['unfollow'] + '</a></li> </ul></div> </div>';

                        b_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn "  data-closebtn="owrbtn' + x.feid + '"   ' + owrOn + ' >' + names['follow'] + '</button> </div>';

                        break;

                                case 4:
                        f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > ' + names['following'] + ' <span class="caret"></span> </button>  <div class="hide po-ab" data-block="menu"><ul class="dropdown-menu" > <li><a href="javascript:void(0);" data-openbtn="owrbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + owrOff + ' >' + names['unfollow'] + '</a></li> </ul></div> </div>';

                        b_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn "  data-closebtn="owrbtn' + x.feid + '"   ' + owrOn + ' >' + names['follow'] + '</button> </div>';

                        break;

                }
if(f_btn!=''&&b_btn!=''){
    
 var blockList = [f_btn, b_btn];
                var blockName = ["f_btn" + x.feid, "b_btn" + x.feid];
                var setting = {
                    name: 'owrbtn' + x.feid,
                    target: 0,
                    page: false,
                    minheight: 'auto'
                };
     ch += W.T.ToggleBlock(blockList, blockName, setting);
}
               

                 W.U.JunctionAdd(W.A.page.AppId, 'owrOn' + x.feid + '', function () {

                    this.Node.onclick = relation.onowrclick.bind({ Node: this.Node, setting: x, action: 1, relation: relation });

                }, {});
                W.U.JunctionAdd(W.A.page.AppId, 'owrOff' + x.feid + '', function () {

                    this.Node.onclick = relation.onowrclick.bind({ Node: this.Node, setting: x, action: 0, relation: relation });

                }, {});
                   ch += '</div>';
            }
            }


         
        }

           function owrNames(x) {
                var names = { follow: 'text_210', unfollow: 'text_211', following: 'text_212' };

                if (x.rtype == 2 || x.rtype == 3) {
                    var names = { follow: 'text_213', unfollow: 'text_214', following: 'text_215' };
                }
                return names;
            }

            return ch;
        },
ontwrclick: function () {
            W.U.console(this);
            var relation = this.relation;
            var form = 'ralation',
     f_value = { action: this.action, r: 'twr', af: this.setting.af, aeid: this.setting.aeid, feid: this.setting.feid };
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


                },
                success: function (data) {



                    var ret = JSON.parse(data);
                    if (ret.state == 500) {


                    }
                    if (ret.state == 200) {
                        relation.twr = ret.response;
                        //  Utility.viewUpdate('twr', ret.response);
                    }
                    relation.init();
                }

            });

        },
 onowrclick:function () {
            var relation = this.relation;
            var form = 'ralation',
     f_value = { action: this.action, r: 'owr', af: this.setting.af, aeid: this.setting.aeid, feid: this.setting.feid };
            var formData = {
                form: form,
                f_value: f_value
            };

         W.U.ajax({

                url:W.U.URL('') + 'ajax/f0/p0',
                data: formData,
                context: this,
                type: 'POST',
                beforeSend: function () {


                },
                success: function (data) {



                    var ret = JSON.parse(data);
                    if (ret.state == 500) {


                    }
                    if (ret.state == 200) {
                        relation.owr = ret.response;
                       // Utility.viewUpdate('owr', ret.response);
                    }
                    relation.init();
                }

            });

        }   

};

     new Handler(this.Node, this.data, this.btn_class);   
   }


//-----------------------




function  relation(data, button_class, wrap_class){
   
 var ch='<div class="block ' + wrap_class + '" data-junction="relation' + data.owr.feid + '" ></div>';

  W.U.JunctionAdd(W.A.page.AppId,'relation' + data.owr.feid,function(){
     
relationWrap.bind({ Node: this.Node, data: this.data, btn_class: button_class })();
  },data);  
    return ch;
}

//--------------




 W.U.relation=relation; 

})(wowrol);