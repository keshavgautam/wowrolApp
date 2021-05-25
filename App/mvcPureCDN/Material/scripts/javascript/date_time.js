 (function (W) {
     "use strict";

     var ch = '<div  class="block ul"  >';

      ch +='<div  class="block _Bdy"  >';

     ch += W.U.Datepicker.dateinput({  date:'2017-1-26',
     minDate: '2017-1-15',
     maxDate:'2017-1-30'}
     );

     ch += W.U.Datepicker.dateinput({ presentation:'popup' });
  ch += W.U.Datepicker.dateinput({ varient:'androidApp'});
    ch += W.U.Datepicker.dateinput({ varient:'height_free'});
       ch += W.U.Datepicker.dategive("today");
     ch += '</div>';


     ch += '</div>';


  




      var newView='<div class="block" data-appView="getmaterial" style="display:block">'+W.T.Pane(ch)+'</div>';   
   

     W.U.ccbk.Run(W.U.Page,'materialpleaseinsert',newView); 


 })(wowrol);