/*
* page set up 
*/
; (function(W){
   "use strict";
  
/**
* @description   drawer 
* @param  
*/
function drawer() { 
   //drawer
    function drawerHandler(wrap,args) {
     
        this.wrap = wrap;
        this.args = args;
        this.touchrunning = false;
        this.init();
       
    }

    drawerHandler.prototype.init = function () {
        var DrawerList = []; var BtnList = [];
        this.align = [0, 1, 2, 3]; // ['left', 'right', 'top', 'bottom'];

        this.BackDrop = this.wrap.querySelector('[data-of_2bd="' + this.args.name + '"]');
        this.MainContent = this.wrap.querySelector('[data-of_2c="' + this.args.name + '"]');
        DrawerList[0] = this.wrap.querySelector('[data-of_2l="' + this.args.name + '"]');
        DrawerList[1] = this.wrap.querySelector('[data-of_2r="' + this.args.name + '"]');
        DrawerList[2] = this.wrap.querySelector('[data-of_2t="' + this.args.name + '"]');
        DrawerList[3] = this.wrap.querySelector('[data-of_2b="' + this.args.name + '"]');
        BtnList[0] = this.wrap.querySelector('[data-of_2lbtn="' + this.args.name + '"]');
        BtnList[1] = this.wrap.querySelector('[data-of_2rbtn="' + this.args.name + '"]');
        BtnList[2] = this.wrap.querySelector('[data-of_2tbtn="' + this.args.name + '"]');
        BtnList[3] = this.wrap.querySelector('[data-of_2bbtn="' + this.args.name + '"]');
        this.BtnList = [];
        for (var q in BtnList) {
            if (BtnList[q] != null) {
                this.BtnList[q] = BtnList[q];
                $(this.BtnList[q]).data('align', this.align[q]);
            }
        }
       
        this.BackDropActive = 'of_2-bd fade in';
        this.BackDropHide = 'hide';
        this.Drawer = DrawerList;

        $(this.wrap).data('state', 'off');
        $(this.wrap).data('align', 0);

         
        for (var q in this.BtnList) {
        W.U.fn.lister('click',this.BtnList[q],this.ClickHandler.bind(this));
            $( this.BtnList[q]).data('align', q);
            this.normal.bind(this)();
        }

       W.U.fn.lister('click',this.BackDrop,this.ClickHandler.bind(this));

            
        window.addEventListener("optimizedResize", this.normal.bind(this));

        window.addEventListener("optimizedResize", this.normal.bind(this));
        

      // this.sweep(this.wrap.childNodes);
   
      Touch(this.MainContent,this.touch.bind(this) ); 
    };



    drawerHandler.prototype.push = function () {
        $(this.wrap).data('state', 'on');
        var wrapData = $(this.wrap).data();
        if (this.args.Iswindow) {
          $(this.MainContent).css({ 'height': window.innerHeight });
        }
        this.event('show.drawer');
        switch (parseInt(wrapData.align)) {
            case 0: //left
                $(this.Drawer[0]).css({ 'display': 'block', 'width': this.args.setting.left.minWidth, 'top': 0, 'height': this.args.setting.left.Drawerheight, 'z-index': 1500 }).animate({ left: 0 }, 100, 'linear');

                break;
            case 1: //right
                $(this.Drawer[1]).css({ 'display': 'block', 'width': this.args.setting.right.minWidth, 'top': 0, 'height': this.args.setting.right.Drawerheight, 'z-index': 1500 }).animate({ right: 0 }, 100, 'linear');


                break;
            case 2: //top
                $(this.Drawer[2]).css({ 'display': 'block', 'width': '100%', 'height': this.args.setting.top.minheight, 'z-index': 1500, 'left': 0 }).animate({ top: 0 }, 100, 'linear');


                break;
            case 3: //bottom
                $(this.Drawer[3]).css({ 'display': 'block', 'width': '100%', 'height': this.args.setting.bottom.minheight, 'z-index': 1500, 'left': 0 }).animate({ bottom: 0 }, 100, 'linear');


                break;
        }

        $(this.MainContent).css({ 'top': 0, 'width': '100%' });
        this.BackDrop.setAttribute('class', this.BackDropActive);
         this.event('shown.drawer');
          this.touchrunning = false;
    }

    drawerHandler.prototype.normal = function () {
        $(this.wrap).data('state', 'off');
        var wrapData = $(this.wrap).data();
        if (this.args.Iswindow) {
        $(this.MainContent).css({ 'height': window.innerHeight });
        }
      
 this.event('hide.drawer');
        switch (parseInt(wrapData.align)) {
            case 0: //left
                $(this.Drawer[0]).css({ 'display': 'none', 'width': this.args.setting.left.minWidth, 'top': 0, 'z-index': 0 }).animate({ left: -(this.args.setting.left.minWidth + 2) }, 100, 'linear')

                break;
            case 1: //right
                $(this.Drawer[1]).css({ 'display': 'none', 'width': this.args.setting.right.minWidth, 'top': 0, 'z-index': 0 }).animate({ right: -(this.args.setting.right.minWidth + 2) }, 100, 'linear')


                break;
            case 2: //top
                $(this.Drawer[2]).css({ 'display': 'none', 'width': '100%', 'height': this.args.setting.top.minheight, 'z-index': 0 }).animate({ top: -(this.args.setting.top.minheight + 2) }, 100, 'linear')


                break;
            case 3: //bottom
                $(this.Drawer[3]).css({ 'display': 'none', 'width': '100%', 'height': this.args.setting.bottom.minheight, 'z-index': 0 }).animate({ bottom: -(this.args.setting.bottom.minheight + 2) }, 100, 'linear')


                break;
        }

        $(this.MainContent).css({ 'top': 0, 'width': '100%' });
        this.BackDrop.setAttribute('class', this.BackDropHide);
    this.event('hidden.drawer');
     this.touchrunning = false;
    }
    drawerHandler.prototype.ClickHandler = function (e) {
     
        var btndata = $(e.currentTarget).data();
        $(this.wrap).data('align', btndata.align);

        this.toggle();


    }
    drawerHandler.prototype.toggle = function () { 

     var dataset = $(this.wrap).data();

        switch (dataset.state) {
            case 'off':

                this.push.bind(this)();
                break;
            case 'on':
                this.normal.bind(this)();
                break;

        }
    }
    drawerHandler.prototype.sweep = function (Node) {
        var dataAttrsToDelete = [];
        var DataAttr = ['data-of_2bd', 'data-of_2c', 'data-of_2l', 'data-of_2r', 'data-of_2t', 'data-of_2b', 'data-of_2lbtn', 'data-of_2rbtn', 'data-of_2tbtn', 'data-of_2bbtn'];

        for (var i = 0; i < Node.length; i++) {
          
            var dataAttrs = Node[i].attributes;

            if (typeof (dataAttrs) != 'undefined' && dataAttrs != 'undefined') {

                for (var a = 0; a < dataAttrs.length; a++) {

                    if (typeof (dataAttrs[a]) != 'undefined') {



                        if (DataAttr.indexOf(dataAttrs[a].name) >= 0) {


                        
                            dataAttrsToDelete.push(dataAttrs[a].name);

                        }



                    }




                }

            }

            for (var q in dataAttrsToDelete) {
                if (Node[i].nodeName != '#text') {
                Node[i].removeAttribute(dataAttrsToDelete[q]); }
            }

            if (Node[i].hasChildNodes()) {


                this.sweep(Node[i].children);
            }

        }

    }
    drawerHandler.prototype.event = function (typeArg) {
        // create a look event that bubbles up and cannot be canceled

        var e = $.Event(typeArg, { relatedTarget: this.wrap })

        $(this.wrap).trigger(e);
    }
    drawerHandler.prototype.touch = function (direction, offset) {
        if (!this.touchrunning) {


            var will_move = false;
            var valid_move = false;

          //  console.log(offset);

            if (offset.x > 0) {
                if (offset.x > 20) {
                    valid_move = true; //for left
                }
            }

            if (offset.x < 0) {
                if (offset.x < -20) {
                    valid_move = true; //for right
                }
            }


            if (offset.y > 0) {
                if (offset.y > 20) {
                    valid_move = true; //for up
                }
            }

            if (offset.y < 0) {
                if (offset.y < -20) {
                    valid_move = true; //for down
                }
            }
            if (valid_move == true) { 
            if ((offset.x > -5 && offset.x < 5)) {//vertical
                var align = (offset.y > 0) ? 3 : 2;

                will_move = true;
            }
            if ((offset.y > -5 && offset.y < 5)) {//horizotal
                var align = (offset.x > 0) ? 0 : 1;

                will_move = true;
            }

            }



            if (will_move == true) {


                if (typeof (this.BtnList[align]) != 'undefined') {
                    $(this.wrap).data('align', align);
                    this.toggle();
                    this.touchrunning = true;
                }


            } else {
                this.touchrunning = false;

            }

        }

 

    }
    new drawerHandler(this.Node,this.Value);
}


W.U.drawer=drawer;

})(wowrol);