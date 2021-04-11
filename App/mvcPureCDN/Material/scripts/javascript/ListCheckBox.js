

  ; (function(W){
   "use strict";
 
   function tooltip(){
         $(this.Node).tooltip(this.data);
   };

    W.U.JunctionAdd(W.A.page.AppId, 'Tooltipleft', tooltip, {
    placement: 'auto top'
 
  });
    W.U.JunctionAdd(W.A.page.AppId,'localizationlang',function(){
//call back to biind Listcheckbox
        W.U.ListCheckBox.bind({Node:this.Node,Value:this.data})();
    
  },{name:"localization",values:["en","hi","pn"],valuesname:["English","Hindi","punjabi"],Selected:'en',Class:'',Listid:'lang',callback:function(){
this.ListCheckBox.loadingOn();

//out business area
      console.log('hi am in call back');
      alert('sdf');
//out business area  
//call back when item get click
//this call back return the selected value
this.ListCheckBox.Value.Selected=this.itemvalue;
  console.log(this);
this.ListCheckBox.init();
this.ListCheckBox.loadingOff();
//-- do not remove  it
  }}); 


})(wowrol);