

       
   


/*
* 
*/
; (function(W){
   "use strict";
    var ch; 
      var tabledata={
          header:["name","parent",'date','product','order'],
          body:[{
    id: 'Steve Brown',
    name: 'Steve Brown',
    parent: 'Employed',
    date:'sdfsdf',
    product:'sdfsdf' ,
   order:'order'
  },
  { id: 'Steve Brown',
    name: 'Steve Brown',
    parent: 'Employed',
    date:'sdfsdf',
    product:'sdfsdf' ,
   order:'order'
  },],
  setting:{
     rowcheck:false,
     type:'category',
     name:'demotable'  
  },
  onedit:function(){
      console.log('i m  edited');

  },
  ondelete:function(){
      console.log('i m  ondelete');

  }
  }; 

  ch+='<div class="block _bdy bg_0 bs-2dp">'+W.T.Table(tabledata)+'</div>';


   
    

         var newView=W.U.Rander('<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>');   
   



           W.U('#page').html(newView);





})(wowrol);