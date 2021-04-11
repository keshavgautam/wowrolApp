/*
*
*
*/

; (function(W){
   "use strict";
  

   function relationWrap(){
      function Handler(wrap, x, btn_class) {
            this.twr = x.twr;
            this.owr = x.owr;
            this.mes = x.mes;
            this.btn_class = btn_class;
            this.wrap = wrap;
            this.init();
        }
        Handler.prototype.init = function () {
           
            this.twrbtn = this.twrButton(this.twr, this.btn_class);
            this.owrbtn = this.owrButton(this.owr, this.btn_class);
            this.msgbtn = this.msg(this.mes, this.btn_class);
            this.btnwrap = '<div class=" btn-group " role="group">' + this.twrbtn + this.owrbtn + this.msgbtn + '</div>';
             console.log(this);
          W.U.AddDom(this.wrap, this.btnwrap, 'html');
        }
        Handler.prototype.msg = function () {
            return '';
        };
        Handler.prototype.twrButton = function (x, button_class) {
            var ch = ' ';
            var relation = this;
            var twrOn = 'data-junction="twrOn' + x.feid + '"' ;
            var twrOff = 'data-junction="twrOff' + x.feid + '"';
            var f_btn = ''; var b_btn = '';
            console.log(x);
            if (x.rtype == 1) {
ch += '<div class="btn _fbtn btn-xs no-p-l no-p-r no-p-t no-p-b no-border"> ';
                switch (x.status) {
                    case 2:
                        f_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + twrOn + ' > Add Friend </button> </div>';

                        b_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > Friend Request Sent <span class="caret"></span> </button> <ul class="dropdown-menu fs12" role="menu"> <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >Cancel Friend request</a></li> </ul> </div>';

                        break;
                    case 7:
                        if (x.rpdr == 'ae') {
                            f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > Friend Request Sent <span class="caret"></span> </button> <ul class="dropdown-menu fs12" role="menu"> <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >Cancel Friend request</a></li> </ul> </div>';

                            b_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + twrOn + ' > Add Friend </button> </div>';
                        }
                        if (x.rpdr == 'fe') {


                            f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" >Want to be your friend<span class="caret"></span> </button> <ul class="dropdown-menu fs12" role="menu"><li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOn + ' >Accept Friend request</a></li> <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >Reject Friend request </a></li> </ul> </div>';
                            b_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" > Processing  </button> </div>';
                        }


                        break;
                    case 6:

                        f_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + twrOn + ' > Add Friend </button> </div>';
                        b_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > Friend Request Sent <span class="caret"></span> </button> <ul class="dropdown-menu fs12" role="menu"> <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >Cancel Friend request</a></li> </ul> </div>';

                        break;
                    case 5:

                        if (x.rpdr == 'fe') {
                            f_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + twrOn + ' > Add Friend </button> </div>';

                            b_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > Friend Request Sent <span class="caret"></span> </button> <ul class="dropdown-menu fs12" role="menu"> <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOff + ' >Cancel Friend request</a></li> </ul> </div>';
                        }

                        break;
                    case 3:
                        f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > Friends <span class="caret"></span> </button> <ul class="dropdown-menu fs12" role="menu"> <li><a href="javascript:void(0);" data-closebtn="twbtn' + x.feid + '" ' + twrOn + ' >Unfriend</a></li> </ul> </div>';
                        b_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="twbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" >  Processing  </button> </div>';
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

          
            return ch;
        }
        Handler.prototype.owrButton = function (x, button_class) {
            var ch = '';
            var relation = this;
            var owrOn = 'data-junction="owrOn' + x.feid + '"';
            var owrOff = 'data-junction="owrOff' + x.feid + '"';
            var f_btn = ''; var b_btn = '';
            var names = owrNames(x);

            if (x.rtype == 1) {
    ch += '<div class="btn _fbtn btn-xs no-p-l no-p-r no-p-t no-p-b no-border"> ';
                switch (x.status) {
                    case 2:
                        f_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn " data-openbtn="owrbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + owrOn + ' >' + names['follow'] + '</button> </div>';

                        b_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > ' + names['following'] + ' <span class="caret"></span> </button> <ul class="dropdown-menu fs12" role="menu"> <li><a href="javascript:void(0);" data-closebtn="owrbtn' + x.feid + '" ' + owrOff + ' >' + names['unfollow'] + '</a></li> </ul> </div>';

                        break;
                    case 3:
                        f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > ' + names['following'] + ' <span class="caret"></span> </button> <ul class="dropdown-menu fs12" role="menu"> <li><a href="javascript:void(0);" data-openbtn="owrbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + owrOff + ' >' + names['unfollow'] + '</a></li> </ul> </div>';

                        b_btn = '<div class="btn-group" role="group"> <button type="button" class="btn ' + button_class + ' _fbtn "  data-closebtn="owrbtn' + x.feid + '"   ' + owrOn + ' >' + names['follow'] + '</button> </div>';

                        break;

                                case 4:
                        f_btn = '<div class="btn-group" role="group"> <button type="button " class="btn ' + button_class + ' dropdown-toggle _fbtn " data-toggle="dropdown" aria-expanded="false" > ' + names['following'] + ' <span class="caret"></span> </button> <ul class="dropdown-menu fs12" role="menu"> <li><a href="javascript:void(0);" data-openbtn="owrbtn' + x.feid + '" data-btnid="b_btn' + x.feid + '" ' + owrOff + ' >' + names['unfollow'] + '</a></li> </ul> </div>';

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



            function owrNames(x) {
                var names = { follow: 'Follow', unfollow: 'Unfollow', following: 'Followed' };

                if (x.rtype == 2 || x.rtype == 3) {
                    var names = { follow: 'Favorite', unfollow: 'Unfavorite', following: 'Favorited' };
                }
                return names;
            }
            ch += '</div>';
            return ch;
        }

        Handler.prototype.ontwrclick = function () {
            console.log(this);
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

        }
        Handler.prototype.onowrclick = function () {
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


     new Handler(this.Node, this.data, this.btn_class);   
   }







function  relation(data, button_class, wrap_class){
   
 var ch='<div class="block ' + wrap_class + '" data-junction="relation' + data.owr.feid + '" ></div>';

  W.U.JunctionAdd(W.A.page.AppId,'relation' + data.owr.feid,function(){
     
relationWrap.bind({ Node: this.Node, data: this.data, btn_class: button_class })();
  },data);  
    return ch;
}


 W.U.relation=relation; 

})(wowrol);