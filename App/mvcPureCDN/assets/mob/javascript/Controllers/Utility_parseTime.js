   /* * * * * * * * * *
 *  parseTime .js  *
 *  Version 0.2.9  *
 *  License:  MIT  *
 * Simon  Waldherr *
 * * * * * * * * * */
; (function(W){
   "use strict";
     function Handler(Node) {
        this.Node = Node;
        this.DateTime = this.Node.getAttribute('datetime');;
        this.settings = Handler.settings;
     var init=this.init.bind(this);
    
   setInterval(init, 1000);
    init();
    }

    Handler.prototype.init = function () {
       

        this.Node.innerHTML = parseTime(this.DateTime);
          this.Node.setAttribute('title',this.DateTime);
    }
   
       Handler.settings={
      refreshMillis: 60000,
      allowPast: true,
      allowFuture: true,
      localeTitle: false,
      cutoff: 0,
      autoDispose: true,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        inPast: 'any moment now',
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    }

function parseTime(date){
     var $s = Handler.settings;
        var $l = $s.strings; 

          function distance(date) {

         

            return (new Date().getTime() - datatime(date).getTime());
        }

        function inWords(distanceMillis) {



            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            if ($s.allowFuture) {
                if (distanceMillis < 0) {
                    prefix = $l.prefixFromNow;
                    suffix = $l.suffixFromNow;
                }
            }

            if (!$s.allowPast && distanceMillis >= 0) {
                return $l.inPast;
            }

            var seconds = Math.abs(distanceMillis) / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            function substitute(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                var value = ($l.numbers && $l.numbers[number]) || number;
                return string.replace(/%d/i, value);
            }


            var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

            var separator = $l.wordSeparator || "";
            if ($l.wordSeparator === undefined) { separator = " "; }
            return $.trim([prefix, words, suffix].join(separator));



        }

        function datatime(iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d+/, ""); // remove milliseconds
            s = s.replace(/-/, "/").replace(/-/, "/");
            s = s.replace(/T/, " ").replace(/Z/, " UTC");
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
            s = s.replace(/([\+\-]\d\d)$/, " $100"); // +09 -> +0900
            return new Date(s);
        }

        var ret = '';
        if (date != '') {
            var distance = distance(date);

            var ret = inWords(distance);
        }


        return ret;

}
 

function parseTimeNode(x) {

   new Handler(x);
}
function parseTimeStr(date) {

  return parseTime(date);
}

W.U.parseTimeNode=parseTimeNode;
W.U.parseTimeStr=parseTimeStr;
//----------


   
W.U.NowDateTime=function(){
  
 var t=new Date();

    
     
    
    
     var str1=t.toISOString().split('T');
     var str2=t.getHours()+':'+t.getMinutes()+':'+t.getSeconds();
    return str1[0]+' '+str2;
};

})(wowrol);