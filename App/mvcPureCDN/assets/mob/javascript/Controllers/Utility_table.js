/*
* 
*/
; (function(W){
   "use strict";



 /**
* The Table library
*/

function Table() { 


 function Handler(wrap,Value) { 
        this.wrap = wrap;
        this.Value = Value;
    this.crosscheck = 0;
     // wait for dom css emplimention
        setTimeout(this.init.bind(this), 100);
        $(window).on('resize', this.init.bind(this));
      
    }
  Handler.prototype.init = function () {
        this.createMarkup();
        var tableMarkup = '<div class="block ov-hi" >'+this.Footer+this.Header + this.Body +'</div>';
       
        W.U.AddDom(this.wrap, tableMarkup, 'html');

        if(this.crosscheck>1){
            this.crosscheck++;
          setTimeout(this.init.bind(this), 100);
        }

    }

    Handler.prototype.createMarkup = function () {
        this.col = this.Value.header.length;
        this.cellwidth = calculateCellwidth.bind(this)();
        this.Header = createHeader.bind(this)();

        this.Body = createBody.bind(this)();
        this.Footer = createFooter.bind(this)();


        // draw
        function createHeader() {
            var data = this.Value.header;
            var rowcheck = this.Value.setting.rowcheck;
            var cellwidth = this.cellwidth;
            var ch = '<div class="block ul ul-menu bg_7" >';
            if (rowcheck) {
                ch += '<div class="li " style="width:30px;" ><div class="block _bdy"><span class="di-in"><label><input type="checkbox" name="category" value=""><span></span> </label></span></div></div>';
            }
            for (var i = 0; i < this.col; i++) {
                var width = (i == 0) ? cellwidth.first : cellwidth.Rest;

                ch += '<div class="li" style="width:' + width + '" ><div class="block _bdy" > <span class="fw-b tt-c">' +
                 data[i]

                + '</span></div></div>';
            }
            ch += '</div>';

            return ch;
        }

        function createBody() {
            var header = this.Value.header;
            var data = this.Value.body;
            var rowcheck = this.Value.setting.rowcheck;
            var setting = this.Value.setting;
            var cellwidth = this.cellwidth;

            var ch = '<div class="block ul "  >';


            for (var j = 0; j < data.length; j++) {//print tr

                ch += '<div class="block li b_gtl " data-nodeid="tr' + setting.name + data[j].id + '" ><div class="block ul ul-menu" >';
                if (rowcheck) {
                    ch += '<div class="li" style="width:30px;" ><div class="block _bdy"> <span class="di-in "><label><input type="checkbox" name="category" value=""><span></span> </label></span></div></div>';
                }
                for (var i = 0; i < this.col; i++) {//print td
                    var width = (i == 0) ? cellwidth.first : cellwidth.Rest;
                   
                    var restcol = createRestcol.bind({ we: this, data: data[j] })();
                    var cellLink = createcellLink.bind({ type: this.Value.setting.type, id: data[j].id, slug: data[j].slug, we: this })();

                    ch += '<div class="li " style="width:' + width + '"  ><div class="block _bdy" >' + data[j][header[i]];

                   

                    if (i == 0) {
                        ch += cellLink;
                        ch += restcol;
                    }




                    ch += '</div></div>';
                }
                ch += '</div></div>';
            }
            ch += '</div>';

            return ch;
        }

        function createFooter() {
           var ch = ''; 
           var parseURl=W.U.ParseHref(location.href);
           var pagingData=this.Value.pagingData;
         var onpaging = this.Value.onpaging;
            var serach = '<form name="dashboardsearch" onsubmit="return false;"><div class="block form-piece"> <div class="input-group"> <input type="text" name="sstr" class="form-mold" placeholder="Search for..." value="'+this.Value.pagingData.sstr+'" autocomplete="off" > <span class="input-group-btn"> <button class="btn " type="button" data-junction="dbordpagingA" >&nbsp;&nbsp;Go!&nbsp;&nbsp;</button> </span> </div></div></form>';
          



            var pagi = Pagination.bind({ we: this })(pagingData.ps,pagingData.tp,pagingData.pgd,pagingData.sstr,parseURl.pathurl);
           // console.log(this.Value);
            
            if (this.Value.setting.paging == true) {
                if(this.Value.pagingData.sstr!=''){
          ch += '<div class=" block _bdy al-l Fw-b left"><p>Showing about '+(pagingData.tp*pagingData.ps)+' item(s) for search <i class="fw-b">'+this.Value.pagingData.sstr+'</i>  <a   href="javascript:void(0);" data-junction="dbordpagingB" >Refine</a></p></div>';
                }

                ch += '<div class="block  m_b10" ><div class="left w6 col6"  style="max-width:250px;" >' + serach + '</div><div class="right" >' + pagi + '</div></div>';
            }

        //bind event on dashbord paging click
            W.U.JunctionAdd(W.A.page.AppId, 'dbordpagingA', function () {
this.Node.onclick = onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: 1,sstr:pagingData.sstr,btn:'A' });
            W.U.JunctionAdd(W.A.page.AppId, 'dbordpagingB', function () {
this.Node.onclick = onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: 1,sstr:pagingData.sstr,btn:'B' });
        
           




            return ch;
        }

        function createcellLink() {
            var ch = '';
            var type = this.type;
            var id = this.id;
            var slug = this.slug;
            var onedit = this.we.Value.onedit;
            var ondelete = this.we.Value.ondelete;
            var   P = W.A.page.AppId;
            var URL=W.U.URL;

            switch (type) {

             case 'storestaff':
                 ch += '<br><div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-junction="tdcelledit' + id + '" >Edit</a></span> <span> <a href="javascript:void(0);" class="hide" data-junction="tdcelldelete' + id + '" >Delete</a></span> <span> <a href="' + URL('') + slug + '" class="hide" >View</a></span></div>';
                break;

                case 'category':
    ch += '<br><div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-junction="tdcelledit' + id + '" >Edit</a></span> <span> <a href="javascript:void(0);" data-junction="tdcelldelete' + id + '" >Delete</a></span> <span> <a href="' + URL('') + slug + '">View</a></span></div>';
                break;
     case 'shipping':
    ch += '<br><div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-junction="tdcelledit' + id + '" >Edit</a></span> <span> <a href="javascript:void(0);" data-junction="tdcelldelete' + id + '" >Delete</a></span> <span> </span></div>';
                break;
 case 'products':
    ch += '<br><div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-junction="tdcelledit' + id + '" >Edit Basic Info</a></span> <span> <a href="javascript:void(0);" data-junction="tdcelldelete' + id + '" >Delete</a></span> <span> </span></div><div class="fs11 td-cell-link">  <span> <a href="javascript:void(0);" data-junction="tdcellinventory' + id + '"   >Inventory</a></span> <span> <a href="javascript:void(0);"   data-junction="tdcellspecification' + id + '"  >Specification</a></span><span> <a href="javascript:void(0);"  data-junction="tdcelloptions' + id + '"   >Options</a></span>  </div>';
     var onsubedit = this.we.Value.onsubedit;
  
          W.U.JunctionAdd(W.A.page.AppId, 'tdcellinventory' + id, function () {

                this.Node.onclick = onsubedit.bind({ Node: this.Node, data: this.data });
            }, { id: id,subedit:'inventory' });
   W.U.JunctionAdd(W.A.page.AppId, 'tdcellspecification' + id, function () {

                this.Node.onclick = onsubedit.bind({ Node: this.Node, data: this.data });
            }, { id: id,subedit:'specification' });
   W.U.JunctionAdd(W.A.page.AppId, 'tdcelloptions' + id, function () {
 this.Node.onclick =onsubedit.bind({ Node: this.Node, data: this.data });
            }, { id: id,subedit:'options' });
       break;
            }



            W.U.JunctionAdd(W.A.page.AppId, 'tdcelledit' + id, function () {

                this.Node.onclick = onedit.bind({ Node: this.Node, data: this.data });
            }, { id: id });

         W.U.JunctionAdd(W.A.page.AppId, 'tdcelldelete' + id, function () {
                this.Node.onclick = ondelete.bind({ Node: this.Node, data: this.data });
            }, { id: id });


            return ch;


        }
        function calculateCellwidth() {
            //  console.log('------Started-------');
            var parentWidth = this.wrap.offsetWidth;
           //correction of 20 px -do not remove it
           parentWidth=(parentWidth-20);
            parentWidth = (window.innerWidth < 400) ? (window.innerWidth - 40) : parentWidth;

            //   console.log('parentWidth ==' + parentWidth);
            var rowcheck = this.Value.setting.rowcheck;
            var restcol = (this.col - 1);
            if (rowcheck) {
                parentWidth = (parentWidth - 30);
                //      console.log('rowcheck ==' + 30);
            }

            var firstcolwidth = Math.ceil(parentWidth - (parentWidth * (30 / 100)));
            firstcolwidth = (firstcolwidth > 250) ? 250 : firstcolwidth;
            if (this.col == 1) {
                firstcolwidth = parentWidth - 1;
            }

            //     console.log('firstcolwidth ==' + firstcolwidth);
            var TotalRestcolwidth = ((parentWidth - firstcolwidth)) - restcol;
            var Restcolwidth = Math.floor((TotalRestcolwidth / restcol));

            //        console.log('TotalRestcolwidth ==' + TotalRestcolwidth);
            //      console.log('restcol ==' + restcol);
            //      console.log('Restcolwidth ==' + Restcolwidth);
            // corecting if Restcolwidth less than 100

            if (Restcolwidth < 100 && this.col > 1 && TotalRestcolwidth >= Restcolwidth) {
                this.col--;

                var againParse = calculateCellwidth.bind(this)();

                return againParse;

            }

            return { first: firstcolwidth + 'px', Rest: Restcolwidth + 'px' };
        }
        function createRestcol() {

            var col = this.we.Value.header.length;
            var data = this.data;
            var restcolList = [];

            var i = col - (col - this.we.col);
            for (i; i < col; i++) {

                restcolList[i] = this.we.Value.header[i];

            }
            var ch = '';
            if (restcolList.length > 0) {
                ch += '<div class="block ul bg_6 fg_5 tt-c" >';

                for (var i in restcolList) {
                    ch += '<div class="block li " >';
                    ch += '<span class="span" >' + restcolList[i] + '</span ><span class="span">-</span ><span class="span">' + data[restcolList[i]] + '</span >';


                    ch += '</div >';
                }

                ch += '</div>';

            }
            return ch;
        }

        function Pagination(ps,tp,pgd,sstr){
            var ch='';
            pgd=pgd-1;
            var onpaging = this.we.Value.onpaging;
            var NagivationDisable=['','','','',''];
            var start=1,previous=1,currenttext='',next=1,end=1;
            if(pgd>tp){
            pgd=tp;    
            }
            
            if(pgd>1){
               previous=pgd-1; 
            }else{
                  previous=pgd=pgd;  
NagivationDisable=['','disabled','','',''];

            }

currenttext=(pgd)+' of '+tp;
next=pgd+1;
if(next>tp){
    next=tp;
NagivationDisable=['','','','disabled',''];
}


end =tp;
if(tp>1){
    ch+='<ul class="pagination block" style=" margin: 5px 0px;">';
   ch+='<li> <a href="javascript:void(0);" class="form-mold"  data-junction="dbordpagingC"'+NagivationDisable[0]+'><span>«</span></a> </li>';
 ch+='<li><a href="javascript:void(0);" class="form-mold"  data-junction="dbordpagingD"'+NagivationDisable[1]+'><span>‹</span></a></li>';
  ch+='<li><input type="text" class="form-mold"   data-junction="dbordpagingE" placeholder="'+currenttext+'" title="Jump to any page"></li>';
  ch+='<li> <a href="javascript:void(0);" class="form-mold" data-junction="dbordpagingF" '+NagivationDisable[3]+'> <span>›</span></a> </li>';
 ch+='<li><a href="javascript:void(0);" class="form-mold" data-junction="dbordpagingG" '+NagivationDisable[4]+'><span>»</span></a> </li>';

    ch+='</ul>';

    //binding event
    W.U.JunctionAdd(W.A.page.AppId, 'dbordpagingC', function () {
this.Node.onclick = onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: start,sstr:sstr,btn:'C' });
    W.U.JunctionAdd(W.A.page.AppId, 'dbordpagingD', function () {
this.Node.onclick = onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: previous,sstr:sstr ,btn:'D'});
    W.U.JunctionAdd(W.A.page.AppId, 'dbordpagingE', function () {
this.Node.onchange = onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: 0,sstr:sstr,btn:'E' });
 W.U.JunctionAdd(W.A.page.AppId, 'dbordpagingF', function () {
this.Node.onclick = onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: next,sstr:sstr ,btn:'F'});
W.U.JunctionAdd(W.A.page.AppId, 'dbordpagingG', function () {
this.Node.onclick = onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: end,sstr:sstr,btn:'G' });

}


return ch;

        }
    }


   new Handler(this.Node,this.Value);
}
   
    

   


     W.U.Table=  Table;


})(wowrol);