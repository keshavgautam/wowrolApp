/*
* page set up 2
*/
; (function(W){
   "use strict";

/**
* The Tab toggle Block
*/

/*
@Requires   1. Total block ==  Total open btn = Total close btn
            2 .Block 0 is front block hold all open btn 
@ setting ={
    name:'test',
    target:3,     [n] =>index
    page:false,  [false|true]
    minheight:250  [n |'auto']
}
*/
function ToggleBlock() {

    function Handler(wrap,setting) { 
        this.wrap = wrap;
        this.setting = W.U.extend(Handler.Default, setting);
     // wait for dom css emplimention
        setTimeout(this.init.bind(this), 200);
       
    }
        Handler.Default = {
    name:'checkin',
    parent:'',
    history:false,
    target:0,
    page:true,
    minheight:'auto'

         };
    Handler.prototype.init = function () {
        this.blockList = this.wrap.childNodes;
        this.blockListByName = [];
        this.openbtnList =  W.U('[data-openbtn="' + this.setting.name + '"]',this.wrap); 
        this.btnId = [];
        this.blockId = [];
        this.closebtnList =W.U('[data-closebtn="' + this.setting.name + '"]',this.wrap); 
      
      //  console.log(this);
        if (this.openbtnList.length == (this.blockList.length - 1)) {
            for (var i = 0; i < this.blockList.length; i++) {
                var name = this.blockList[i].getAttribute('data-blockname');

                this.blockListByName[name] = this.blockList[i];
                this.blockId[i] = name;
                this.blockList[i].removeAttribute('data-blockname');


            }
            // place it here beacouse we  need this.blockListByName[]
  this.href.bind(this)();
  //--

            for (var i = 0; i < this.openbtnList.length; i++) {
                this.btnId[i] = this.openbtnList[i].getAttribute('data-btnid');
                $(this.openbtnList[i]).on('click', this.open.bind({ we: this, id: (this.btnId[i]) }));
                this.openbtnList[i].removeAttribute('data-openbtn');
                 this.openbtnList[i].removeAttribute('data-btnid');
            }
            for (var i = 0; i < this.closebtnList.length; i++) {
                //this.openId[i]= i;
                $(this.closebtnList[i]).on('click', this.close.bind({ we: this, id: i }));
                this.closebtnList[i].removeAttribute('data-closebtn');
            }



            if (this.$href[1][2] != 0||this.$href[1][2] != '') {

                 this.setting.target = this.$href[1][2];
            }
            if (this.setting.target != 0 && typeof (this.setting.target) != 'undefined') {
                this.open.bind({ we: this, id: this.setting.target })();
            }
            $(this.wrap).off();
            $(this.wrap).on('hide', this.outer.bind({ we: this, type: 'hide' }));
            $(this.wrap).on('show', this.outer.bind({ we: this, type: 'show' }));
           
    



        } else {
            console.warn(' blockList btnList are not match for ' + this.setting.name + '');
           console.log(this);
        }


    }


    Handler.prototype.open = function () {
        var id = this.id;
        var page = this.we.setting.page;

        var height = (page == true) ? window.innerHeight + 'px' : this.we.setting.minheight;

        if (id != this.we.blockId[0]) {
            this.we.blockList[0].style.display = "none";
            this.we.closeAll();
           // console.log(id); 
            if (this.we.setting.page) {
    
   if( W.U.browser.opera_mini||W.U.browser.opera_mobile){
        
                this.we.blockListByName[id].setAttribute('style', 'display: block; z-index: 1600; width: 100%;  position: absolute; top: 0px; left: 0px;'); 
     }else{
        
             this.we.blockListByName[id].setAttribute('style', 'display: block; z-index: 1600; width: 100%; height: ' + height + '; position: absolute; top: 0px; left: 0px;');  
     }
     // making parent disable



            } else {

        
  if( W.U.browser.opera_mini||W.U.browser.opera_mobile){
        this.we.blockListByName[id].setAttribute('style', 'display: block;   ');
     }else{
           this.we.blockListByName[id].setAttribute('style', 'display: block;  height: ' + height + '; ');
     }
            }

   
  // console.log(this.we.blockListByName[id]);
       
        
          
         
     W.U.fn.event("tbshown",this.we.wrap,{});// there is bug with jquery event listing
     W.U.fn.event("tbCshown",this.we.blockListByName[id],{});
   
        }

        
        this.we.update.bind(this)();
          //call runner
           W.U.resize();

    }
    Handler.prototype.close = function () {


        this.we.closeAll();

        this.we.blockList[0].style.display = "block";

    this.we.update.bind(this)();
   
         W.U.fn.event('hiden',this.we.wrap);

    }
    Handler.prototype.closeAll = function () {


        for (var i = 1; i < this.blockList.length; i++) {
        

  if( W.U.browser.opera_mini||W.U.browser.opera_mobile){
    this.blockList[i].setAttribute('style', 'display:none; z-index: 0; width: 100%;  0px; left: 0px;');
     }else{
    this.blockList[i].setAttribute('style', 'display:none; z-index: 0; width: 100%; height: ' + window.innerHeight + 'px; top: 0px; left: 0px;');
     }
        }

   

    }
    Handler.prototype.update = function () {
        var ret =  W.U.ParseHref(location.href);
        // console.log(ret); // console.log(this);
        var tb = ret.tb;
        var updateUrl = ret.href;

    tb[this.we.setting.name]=this.id;
                
     //  // console.log(tb);
            updateUrl += '#';
            for (var j in tb) {
                  updateUrl += 'tb' + '.' + j + '.' +  tb[j];


                 updateUrl += '-';


            }

     



if(W.U.feature.pushState){
  // history.pushState('', "", updateUrl); 
}
      

    }
    Handler.prototype.outer = function (e) {

        var id = e.id;
      //  console.log(e); console.log(this);
        switch (this.type) {

            case 'show':
                this.we.open.bind({ we: this.we, id: id })();
                break;
            case 'hide':
                this.we.close.bind({ we: this.we, id: id })();
                break;

        }

    }
    Handler.prototype.href = function () {
        var ret = W.U.ParseHref(location.href);
        var tb = ret.tb;
        var $href = [ret.href, ['tb',this.setting.name, '']];
        // loop to match 
        var onematch = 0; var firstkey = 0; var loop = 0;
        for (var j in tb) {

            for (var q in this.blockListByName) {


                if (tb[j] == q && onematch == 0&&j==this.setting.name) {
                    onematch++;
                   $href[1][2] = tb[j];
                }

                if (loop == 0) {
                    firstkey = q;

                }
                loop++;
            }

        }


        if (onematch == 0) {
            $href[1][2] = firstkey;
        }
        this.$href = $href;
    }

   
     
 
    new Handler(this.Node,this.Value);
}


W.U.ToggleBlock=ToggleBlock;

})(wowrol);