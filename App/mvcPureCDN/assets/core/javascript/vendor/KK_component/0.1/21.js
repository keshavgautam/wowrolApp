/*

*/
function UpdateView() {
    var _this = this;

   
   if(!_this.is_updatelooprunning){
         
        _this.is_updatelooprunning = true;
     for(var q in _this.To_updateList){
      _this.To_updateList[q].UpdateView(_this);
   }  
        _this.is_updatelooprunning = false;
        _this.update_source = '';
        _this.onAfterUpdate();

      AddInIntent(_this)
    }
  


}


/*
@des WrapInTrackFunction
*/
function WrapInTrackFunction(data,TrackFn,context) {
    var realFn = [];
for(var q in data){
    

    if(isFunction(data[q])){
 
        
      realFn[q] = data[q];
      data[q] = GetWrapFunction(realFn[q],TrackFn,context);
        

    }


    if(isArray(data[q])||isObject(data[q])){
        WrapInTrackFunction(data[q], TrackFn, context);
    }

}
return data;

}
/*
@des TrackFunction
*/
function GetWrapFunction(realFn,TrackFn,context) {
    var _this = this;
    return function () {
           var __this = this;
        var ret = null;
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        ret = realFn.bind(__this).call(this, args[0],args[1],args[2],args[3],args[4],args[5]);
        TrackFn();
        return ret;
    }
}
/*
@des TrackFunction
*/
function TrackFunction () {
    var _this = this;
 _this.update_source = 'controllerTrackFunction';
 _this.UpdateView();
}