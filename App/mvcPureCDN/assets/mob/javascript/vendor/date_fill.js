/*--==[date_fill]==--*/
;(function($) {
$.fn.date_fill = function(options) {
        var defaults = {
             selected    : '',
             class    : '',
               name    : ''
        
        }; 
     

          return this.each(function() {
        var config = $.extend({}, defaults, options); 
            var self = $(this); 


        if(config.selected!=''){
            var d = config.selected.split(",");// month,day,year
        }else{
            
              var d =['','',''];
        }
        var day='',month='',year='';
        // loop for day
         day+='<select class="'+config.class+'"  name="'+config.name+'Day" title="Day"><option value="">Date</option>';  
        for(var i=1;i<32;i++){
            
if( i==d[1]){
   day+='<option value="'+i+'" selected="selected" >'+i+'</option>'; 

}else{
     day+='<option value="'+i+'"  >'+i+'</option>';  
}


        }
        day+='</select>'; 

         // loop for month
                 month+='<select class="'+config.class+'"  name="'+config.name+'Month" title="Month"><option value="">Month</option>';  
                 var month_name=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        for(var i=0;i<12;i++){
            
if( month_name[i]==d[0]){
   month+='<option value="'+month_name[i]+'" selected="selected" >'+month_name[i]+'</option>'; 

}else{
     month+='<option value="'+month_name[i]+'"  >'+month_name[i]+'</option>';  
}


        }
        month+='</select>'; 
         // loop for year
                 year+='<select class="'+config.class+'"  name="'+config.name+'Year" title="year"><option value="">Year</option>';  
        for(var i=2016;i>1900;i--){
            
if( i==d[2]){
  year+='<option value="'+i+'" selected="selected" >'+i+'</option>'; 

}else{
     year+='<option value="'+i+'"  >'+i+'</option>';  
}


        }
        year+='</select>'; 
        self.html(day+month+year);

      
    }); 
     


     }



 })(jQuery);


/*-----------------*/