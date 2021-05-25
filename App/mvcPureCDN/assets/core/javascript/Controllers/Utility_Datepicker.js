/*
* 
*/
; (function(W){
   "use strict";


/*
*
*/
var t={
    t0:function(x){//readonly
        return '<div class="block po-re"><div class="block form-piece"><label class="control-label" >'+x.Option.lableName+'</label><input name="'+x.Option.name+'" class="form-mold" type="text" placeholder="dd-mm-yyyy"    data-masker="date:50:Y:Y" > <div  data-help="'+x.Option.name+'"></div></div><div  data-block="menu" ></div></div>';

    },
    t1:function(x){
        return '<div class="block form-piece"><label class="control-label" >'+x.Option.lableName+'</label><input name="'+x.Option.name+'" class="form-mold" type="date" placeholder="dd-mm-yyyy"  max="'+x.Option.maxDate+'" min="'+x.Option.minDate+'" value="'+x.Option.date+'"  ><div  data-help="'+x.Option.name+'"></div>  </div>';

    }
};
/***/
function DefaultDateData(){
    var data={
     date:W.U.NowDateTime(),
     minDate: '1990-12-31',
     maxDate:'2018-1-1',
     presentation:'inline',
     varient:true,
     name:'test',
     lableName:'test'

        };



    return W.U.clone(data);

}

/*
*
*/
function dateTimePicker(Node,Option){
  

function Handler(Node,Option){
this.Node=Node;
this.Option=W.U.extend(DefaultDateData(),Option);



 this.date =  new Date(this.Option.date);
   this.day =  this.date.getDate() ;
   this.month =  this.date.getMonth() ;
   this.year =  this.date.getFullYear() ;
     //selected
   this.s_date =  this.date;
   this.s_day =  this.day ;
   this.s_month =  this.month ;
   this.s_year =  this.year ;
   this.s_time =  (this.s_date.getTime()/1000);
   //current
   this.c_date =  new Date();
   this.c_day =  this.c_date.getDate() ;
   this.c_month =  this.c_date.getMonth() ;
   this.c_year =  this.c_date.getFullYear() ;
   
     //min
   this.min_date =  new Date(this.Option.minDate);
   this.min_day =  this.min_date.getDate() ;
   this.min_month =  this.min_date.getMonth() ;
   this.min_year =  this.min_date.getFullYear() ;
   this.min_time =   (this.min_date.getTime()/1000);
     //max
   this.max_date =  new Date(this.Option.maxDate);
   this.max_day =  this.max_date.getDate() ;
   this.max_month =  this.max_date.getMonth() ;
   this.max_year =  this.max_date.getFullYear() ;
   this.max_time =   (this.max_date.getTime()/1000);
   
 this.IsPopupInit =false;
this.init('days');

}
Handler.prototype={
   init:function(what){
   

   this.CalenderData   =this.GenerateHTML(); 
   this.insert(what);

 } ,
 GenerateHTML:function(){
     var html='';
            // these are labels for the days of the week
  var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// these are human-readable month name labels, in order
  var cal_months_labels = ['January', 'February', 'March', 'April',
                             'May', 'June', 'July', 'August', 'September',
                             'October', 'November', 'December'];

// these are the days of the week for each month, in order
  var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

       // get first day of month
    var firstDay = new Date(this.year, this.month, 1);
    var startingDay = firstDay.getDay();
    // find number of days in month
    var monthLength = cal_days_in_month[this.month];

  // compensate for leap year
    if (this.month == 1) { // February only!
        if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
            monthLength = 29;
        }
    }

    // do the header
    var monthName = cal_months_labels[this.month];
 
   var html = '<table class="bg_0 bs-1">';
 html +='<tr ><td  colspan="7" ><div class="block _Bdy"> <div class="block _Bdy"><div class="block fs14 al-c">'+this.s_day + "&nbsp;"+cal_months_labels[this.s_month] + "&nbsp;" + this.s_year+'</div></div></td></tr>';

 html +='<tr ><th class="fw-b csr-p hov" data-btn ="prevmonth" >«</th><th colspan="5" class="_bdy fw-b csr-p hov" data-btn ="month" >'+monthName + "&nbsp;" + this.year+'</th><th class="fw-b csr-p hov" data-btn ="nextmonth" >»</th></tr>';

    html += '<tr class="calendar-header">';
    for (var i = 0; i <= 6; i++) {
        html += '<td class="_bdy fw-b">';
        html += cal_days_labels[i];
        html += '</td>';
    }
    html += '</tr><tr>';

    // fill in the days
    var day = 1;
    // this loop is for is weeks (rows)
    for (var i = 0; i < 9; i++) {
        // this loop is for weekdays (cells)
        for (var j = 0; j <= 6; j++) {
         
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
                if(!this.IsDisable("days",day)){
          html += '<td class="  al-c csr-p  '+this.getIsSelectedclass('days',day)+' " ><a class="no-t-deco di-bo _bdy" href="javascript:void(0);" role="button"  data-btn="selectday:'+day+':'+this.month+':'+this.year+'"  >'+day+'</a></td>';   
                }else{
                html += '<td class="disable  al-c csr-p bg_9 '+this.getIsSelectedclass('days',day)+' " ><a class="no-t-deco di-bo _bdy" href="javascript:void(0);" role="button"    >'+day+'</a></td>';          
                }
     
               
              
                day++;
            }else{
                  html += '<td class="_bdy" ></td>';
            }
           
        }
        // stop making rows if we've run out of days
        if (day > monthLength) {
            break;
        } else {
            html += '</tr><tr class="_bdy" >';
        }
    }
    html += '</tr></table>';
   var  viewDays_html = html ;

   //----------
   var yearPaggingClass={pre:'',next:''};
       yearPaggingClass.pre =(this.year<=this.min_year) ?'hide':'';
       yearPaggingClass.next = (this.year>=this.max_year) ?'hide':'';

   html = '<div class="block" style="max-width:220px;" ><table class="w212 bg_0 bs-1" >';
      html +='<thead><tr ><th class="fw-b csr-p hov  " data-btn ="prevyear" ><span class="'+yearPaggingClass.pre+'" >«</span></th><th colspan="5" class="_bdy fw-b csr-p hov" data-btn ="year" >'+ this.year+'</th><th class="fw-b csr-p hov " data-btn ="nextyear" ><span class=" '+yearPaggingClass.next+'" >»</span></th></tr></thead>';

    html += '<tbody><tr><td colspan="7">';
     for (var i = 0; i <= 11; i++) {
        html += '<a class="w4 _bdy fw-b hov al-c csr-p no-t-deco '+this.getIsSelectedclass('month',i)+'" href="javascript:void(0);" role="button"  data-btn="selectmonth:'+i+'" >';
        html += cal_months_labels[i];
        html += '</a>';
    }
    html += '</td></tr></tbody></table></div>';
      var  viewMonths_html = html ;
    //----------
    var Range =this.getYearRange();
   html = '<div class="block" style="max-width:220px;" ><table class="w212 bg_0 bs-1" >';
      html +='<thead><tr ><th class="fw-b csr-p hov" data-btn ="prevdecade"  ><span class="'+Range.shownextclass+'" >«</span></th><th colspan="5" class="_bdy fw-b "  >'+ Range.start+' - '+ Range.end+'</th><th class="fw-b csr-p  hov" data-btn ="nextdecade"  ><span class=" '+Range.showprevclass+'" >»</span></th></tr></thead>';

    html += '<tbody><tr><td colspan="7">';
     for (var i = Range.start; i <= Range.end; i++) {
        html += '<a class="w4 _bdy fw-b hov al-c csr-p no-t-deco '+this.getIsSelectedclass('year',i)+'" href="javascript:void(0);" role="button"  data-btn="selectyear:'+i+'" >';
        html += i;
        html += '</a>';
    }
    html += '</td></tr></tbody></table></div>';

     var  viewYear_html = html ;
      //----------

    return {viewDays_html:viewDays_html,
   viewMonths_html:viewMonths_html,
   viewYear_html:viewYear_html
    
    };
   },
getNextMonth:function(){
    var nextMonth=parseInt(this.month)+1;
    if(nextMonth>11){
        nextMonth=0;
        this.year++;
    }
    
    this.month =nextMonth;
    // this.s_month = this.month;
    return nextMonth;
},
getPreMonth:function(){
       var PreMonth=parseInt(this.month)-1;
    if(PreMonth<0){
       PreMonth=11;
        this.year--;
    }
    
    
    this.month =PreMonth;
     //  this.s_month = this.month;
    return PreMonth;
},
getYearRange:function(){
   var range={start:this.year-5,end: parseInt(this.year) +5,shownextclass:'',showprevclass:''};
   if(range.end>this.max_year){
       range.end=this.max_year; 
       range.showprevclass='hide';
   }
   if(range.start<this.min_year){
       range.start=this.min_year;
       range.shownextclass='hide';
   }
    return  range;
},
getIsSelectedclass:function(what,i){
   var Is='';
  
       switch (what){
       case 'days':
      Is=(i==this.s_day&&this.s_month==this.month)?' bg_3 fg_10':' hov fg_11';
      Is+=(i==this.c_day&&this.s_month==this.c_month&&this.s_month==this.month)?' bs-1 ':' ';
    
      break; 
       case 'month':
  Is=(i==this.s_month&&this.s_year==this.year)?' bg_3 fg_10':' fg_11';
  Is+=(this.s_month==this.c_month&&this.s_month==this.month&&this.s_year==this.year)?' bs-1 ':' ';
      break;
      case 'year':
     Is=(i==this.c_year)?' bg_3 fg_10':' fg_11';
      break;            
        }

    return  Is;
},
popupInit:function(){
    var _this=this;
    if(W.U.isOK(this.popupNode)){
        
this.popupDropDown=  W.U.DropDown( this.popupNode.childNodes[0],{
       type:'datepicker',
       trigger:'click',
       width:function(){
              return  220;
            },
      button:W.U('[type="text"]',this.popupNode)[0],
      parentNode:this.popupNode,
      Dropdown:this.popupNode.childNodes[1]
            

    
          });//initialization  

 
       W.U.ccbk.Add(this.Node,'selectday',function(data){
            
_this.popupDropDown.btnNode.value=''+data[1]+'-'+(parseInt(data[2])+1)+'-'+data[3]+'';
       _this.popupDropDown.hide(); 
       } );
    }


},
insert:function (what){
    var  type= this.Option.presentation,_this=this;
    var html='';
    
        switch (what){
       case 'days':
       html=this.CalenderData.viewDays_html;
      break; 
       case 'month':
       html=this.CalenderData.viewMonths_html;
      break;
      case 'year':
       html=this.CalenderData.viewYear_html;
      break;            
        }
    switch (type){
      case 'popup':
      if(!this.IsPopupInit){
           W.U.AttachDom(this.Node,t.t0(this),'html',function(){
          
        //  this.mainBlock[0].childNodes[0]
       
      _this.popupNode= this.mainBlock[0];

           W.U.AttachDom(this.mainBlock[0].childNodes[1],html,'html',function(){
          
             W.U.attrclick('[data-btn]',this.mainBlock[0],btnonclick);

      });

      _this.popupInit();
   
      });
           this.IsPopupInit=true;
      }else{
            if(W.U.isOK(this.popupDropDown)){
       setTimeout(function(){
           
                         W.U.AttachDom(_this.popupDropDown.Dropdown,html,'html',function(){
          
             W.U.attrclick('[data-btn]',this.mainBlock[0],btnonclick);

      }); 

       },10);
            }

      }
     




      break;
      case 'inline':
      W.U.AttachDom(this.Node,html,'html',function(){
          
             W.U.attrclick('[data-btn]',this.mainBlock[0],btnonclick);

      });
      break;    
    }


    function btnonclick(){
       var  data =this['data-btn'].split(':');
      var task= data[0];
      
       switch(task){
         case 'prevmonth':
         _this.getPreMonth();_this.init('days');
         break; 
         case 'nextmonth':
       _this.getNextMonth();_this.init('days');
         break;
         case 'prevyear':
    _this.year--;    
     _this.init('month');
         break; 
         case 'nextyear':
     _this.year++;  
     _this.init('month');
         break;
         case 'month':
         _this.init('month');
         break;
        case 'year':
         _this.init('year');
         break;
           case 'selectyear':
          _this.year=data[1];
         _this.init('month');
         break;
          case 'selectmonth':
          _this.month=data[1];
         _this.init('days');
         break;

         case 'selectday':
       
          _this.s_day=data[1];
          _this.s_month=data[2];
          _this.s_year=data[3];
          _this.s_date=new Date(''+_this.s_year+'-'+_this.s_month+'-'+_this.s_day+'');
          _this.s_time =  ( _this.s_date.getTime()/1000);
        
              _this.init('days');
W.U.ccbk.Run(_this.Node,'selectday',data);
          break;
   case 'prevdecade':
       _this.year=  parseInt( _this.year)-10;
         _this.init('year');
         break; 
         case 'nextdecade':
       _this.year=  parseInt( _this.year)+10;
       _this.init('year');
         break;
       }
    }
},
IsDisable:function(what,i){
     var Is=false;
  
       switch (what){
       case 'days':
      var m= (this.month>=10)?(this.month+1):'0'+(this.month+1);
       i= (i>=10)?i:'0'+i;
       var date =this.year+'-'+m+'-'+i;
  var s__date=new Date(date),
  s__time=( s__date.getTime()/1000);
      
         
    var min=( s__time>this.min_time),max=(s__time<this.max_time);
     Is=(!(min&&max));
     
      break; 
       case 'month':

      break;
      case 'year':

      break;            
        }

    return  Is;
}
};


new Handler(Node,Option);
 }
  


/*
*
*/
function dateinput(Option){
    var ch='';
   var x={Option:W.U.extend(DefaultDateData(),Option)};
  
    switch(x.Option.varient){
       case 'androidApp':
       // <input type="date" name="bday"> <input type="datetime-local" name="bdaytime">
    
    ch=t.t1(x);   
       break;
    
       default :
       var Jid=W.U.J(function(){
           
          dateTimePicker(this.Node,this.data);

       },Option);



     ch='<div class="block"  data-junction="'+Jid+'" ></div>';   

    }

    return ch;
}
/*
call  W.U.Datepicker.dategive(what);
*/
function dategive(what,days){
    var ret=W.U.NowDateTime();
  switch(what){
     case 'today':
    var date=new Date();
     ret= date.format('yyyy-mm-dd');
     break; 
     case 'last':

var date = new Date();
var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
   ret= last.format('yyyy-mm-dd');
     break;
   case 'next':

var date = new Date();
var last = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
   ret= last.format('yyyy-mm-dd');
     break;
  }
                      
  return ret;
}

 W.U.Datepicker={
     dateTimePicker:dateTimePicker,
     dateinput:dateinput,
    dategive:dategive


 };

   })(wowrol);