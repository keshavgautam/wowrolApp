


 ;(function (W) {
     "use strict";
var menu='[{"id":"1463719564","item_sid":"19","label":"default namesd sd","parent":null,"parent_sid":"","slug":"default-namesd-sd-category","term":"default namesd sd","type":"category"},{"id":"1463719568","item_sid":"20","label":"default namefdg","parent":"19","parent_sid":"19","slug":"default-namefdg-category","term":"default namefdg","type":"category"},{"id":"1463719582","item_sid":"20","label":"default namefdgdsdsd","parent":"1463719564","parent_sid":"19","slug":"default-namefdg-category","term":"default namefdg","type":"category"},{"id":"1463719587","item_sid":"5","label":"defaultasd","parent":"20","parent_sid":"20","slug":"defaultasd-product","term":"defaultasd","type":"product"},{"id":"1463719603","item_sid":"19","label":"default namesd sd","parent":"20","parent_sid":"20","slug":"default-namesd-sd-category","term":"default namesd sd","type":"category"},{"id":"1463719608","item_sid":"19","label":"default namesd sd","parent":"1463719582","parent_sid":"20","slug":"default-namesd-sd-category","term":"default namesd sd","type":"category"},{"id":"1463719615","item_sid":"21","label":"default namefdgrty","parent":"19","parent_sid":"19","slug":"default-namefdgrty-category","term":"default namefdgrty","type":"category"},{"id":"1463719620","item_sid":"20","label":"default namefdg","parent":null,"parent_sid":"","slug":"default-namefdg-category","term":"default namefdg","type":"category"},{"id":"1463725584","item_sid":"19","label":"default namesd sd","parent":"1463719620","parent_sid":"20","slug":"default-namesd-sd-category","term":"default namesd sd","type":"category"},{"id":"1463725590","item_sid":"6","label":"defaultasdsdasd","parent":"1463725584","parent_sid":"19","slug":"defaultasdsd-product","term":"defaultasdsdasd","type":"product"},{"id":"1463725594","item_sid":"6","label":"defaultasdsdasd","parent":"1463725584","parent_sid":"19","slug":"defaultasdsd-product","term":"defaultasdsdasd","type":"product"},{"id":"1463727470","item_sid":"20","label":"default namefdg","parent":"1463719620","parent_sid":"20","slug":"default-namefdg-category","term":"default namefdg","type":"category"},{"id":"1463828968","item_sid":"30","label":"mobile","parent":null,"parent_sid":"","slug":"mobile-category","term":"mobile","type":"category"}]';


     var ch =W.T.C.StoreMenu(JSON.parse(menu));


     var newView = W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">' + W.T.Pane(ch) + '</div>');




     W.U('#page').html(newView);


 })(wowrol);