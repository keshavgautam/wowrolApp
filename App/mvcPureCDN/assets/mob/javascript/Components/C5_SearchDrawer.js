 ;(function (W) {
     "use strict";/**
 * drawer_HomePageStore.js
 */
 W.T.C.C5_SearchDrawer =function(x){
       var suggestion = {
                    name: 'searchbar',
                    fireAfter: 4,
                    type: 5,
                    token: 'chips',
                    placeholder: 'Search',
                    hover: false
                };

var header='<form name="searchbar" onsubmit="return false;" >'+W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" >'+W.T.SVG('left',24,'#f1f5fc')+'</a>',
    Title:'<div class="form-token block" data-junction="searchbar" > <div class="block bd"><div class="block ul ul-menu"><div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div>',
    RightLink:'<div class="li"><a href="javascript:void(0);"  data-junction="searchsubmit"   >'+W.T.SVG('search',24,'#f1f5fc')+'</a></div>',
    dropdown:Array()
    })+'</form>';

var body='<div class="block " data-appmedian="page"><div class="block " data-nodeid="searchwrap" ></div></div>';


    
function submitSearch(){
  var form='searchbar';
  var f_value = W.F.walk_way_all(['suggestion'], 'searchbar'); 
  
  W.U.Search.init(W.U.id('searchwrap'),f_value.suggestion,{});   
} 
 
 
        
  W.U.JunctionAdd(W.A.page.AppId,'searchbar',function(){
      W.U.suggestion.bind({Node:this.Node,Value:this.data})();  
  },suggestion); 
   W.U.JunctionAdd(W.A.page.AppId,'searchsubmit',function(){
  this.Node.onclick=submitSearch;
  },{}); 

   
  var search= W.T.wrap(header, body);
    return search;
     
}

} )(wowrol);