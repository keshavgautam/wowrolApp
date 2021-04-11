/**
 * C6_store_menu.js
 */
function C6_store_menu(x) { 
     var ch = '';
     var t = {};
     t.menuButton = function (x) {
         var ch = '';
         ch += '<button type="button" class="btn  btn-lg btn-block"  data-btn_front="storemenu" >Explore in Store</button>';
         return ch;
     }
     t.menu = function () { 
      var ch = '';
         ch += 'menu';
         return ch;
     }


    // crating search drawer
   var block_front= t.menuButton(x);
var block_back=t.menu(x);

var setting={ data:{name:'storemenu',
      parent:''
            },
            block_front:{
                title:'',
                button:''
            },
            block_back:{
                title:'Explore in Store'
             },
           button_done: '<div class="li"><a href="javascript:void(0);" data-btn_done="storemenu"  style="display:none;"><i class="material-icons">&#xE876;</i></a></div>',
           isPage:true
       };

   ch += wowrol.Modules.Main.ToggleBlock(block_front,block_back,setting);
    return ch;
}