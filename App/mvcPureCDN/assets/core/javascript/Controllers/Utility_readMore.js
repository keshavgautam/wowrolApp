; (function (W) {
  "use strict";
function readMore() { 

   function Handler(Node) {
      
        if(!$(Node).hasClass('noreadmore')){
       this.Node = Node;;
       this.limit = 250;
       this.texts = this.Node.innerHTML;
      this.init();
      }
    }
    Handler.prototype.init = function () {
        this.readMorebtn = $('<a href="javascript:void(0);" >Read More</a>');
        this.closebtn = $('<a href="javascript:void(0);"  >Read Less</a>');
  
      //  $().on('click',this.remove.bind(this));
      //  $(this.closebtn).on('click',this.init.bind(this));
     this.readMorebtn[0].onclick=this.remove.bind(this);
     this.closebtn[0].onclick=this.init.bind(this);
        this.add();
   
      
    }

    Handler.prototype.add = function () {
        var less = '';
       
        if (this.texts.length > this.limit) {
            less = this.texts.substring(0, this.limit);
             less =   less + '... ';

            this.Node.innerHTML = less;
      W.U.Setview(this.Node,this.readMorebtn,'append');
           
        }
       

    };
    Handler.prototype.remove = function () {
      
      
         this.Node.innerHTML = this.texts+ ' ';
       W.U.Setview(this.Node,this.closebtn,'append');  


    };

new Handler(this);
}


W.U.readMore=readMore;
})(wowrol);