/**
 * C7_common.js
 */
function C7_SearchHeader(x) {

      var suggestion = {
                    name: 'searchbar',
                    fireAfter: 4,
                    type: '1',
                    token: 'chips',
                    placeholder: 'Search',
                    hover: false
                };
 var header =''+W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);" data-closebtn="mainpage" ><i class="material-icons">&#xE5C4;</i></a>',
    Title:' <div class="form-token block" data-junction=\'{"App":"' + wowrol.App.page.AppId + '","Name":"searchbar"}\'> <div class="block bd"><div class="block ul ul-menu"><div class="li"><input type="text" name="suggestion" class="form-mold " placeholder="' + suggestion.placeholder + '"  autocomplete="off"   ></div></div><div class="block d po-ab collapse in"> </div></div></div>',
    RightLink:'<div class="li"><a href="javascript:void(0);"     ><i class="material-icons">&#xE8B6;</i> </a></div>',
    dropdown:Array()
    })+'';
      Control.SetView.JunctionAdd(wowrol.App.page.AppId, 'searchbar', function () {
                    Control.fn.suggestion.bind({ Node: this.Node, Value: this.data })();
                },suggestion);
    // crating Cart toggle box





    return header;


}

/**
 * C7_subPageheader(x).js
 */
 function C7_subPageheader(x) {
   //'<a href="" class="left"><h2 class="truncate title" >'+x.entityName+'</h2><i class="badge _gbtn"></i> </a>'

   var header =W.T.ActivityHeader({LeftButton:'<a href="javascript:void(0);"  data-openbtn="mainpage" data-btnid="drawer" ><i class="material-icons">&#xE8FE;</i></a>',
    Title:'<a href="'+URL('')+'" class="left"><h2 class="truncate title" >'+wowrol.App.page.AppId+'</h2><i class="badge _gbtn"></i> </a>',
    RightLink:'<div class="li "><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="hederAlert"  ><i class="material-icons">&#xE7F4;</i> <i class="badge _gbtn">1</i> </a></div><div class="li "><a href="javascript:void(0);" data-openbtn="mainpage" data-btnid="search" ><i class="material-icons">&#xE8B6;</i> <i class="badge _gbtn"></i> </a></div>',
    dropdown:Array()
    });
     
    // crating notification toggle box



    return header;
     }



