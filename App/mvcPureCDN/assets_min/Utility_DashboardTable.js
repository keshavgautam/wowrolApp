/*
* 
*/
; (function(W){
   "use strict";

/////////////////////////////
var cssclass={hilightrow:'bg_6',evenrow:'bg_0',oddrow:'bg_6',selectrow:'bg_3',maincell:'fw-b tt-c'};
var cellbutton=function(){
    return {name:'',onclick:W.U.noop,isLink:false,cssClass:'',attrStr:'',href:'javascript:void(0);'};
};


function Handler(Node,Options){
    this.Node=Node;
    this.Options= W.U.extend(Handler.Defaults, Options);
    this.Options.cssclass = W.U.extend(cssclass, this.Options.cssclass);  
    this.Options.TranseData = W.U.extend(TranseData, this.Options.TranseData); 

 

 
    var cellbuttonCopy=cellbutton();
 for(var q in   this.Options.headerbutton){
  this.Options.headerbutton[q] = W.U.extend( cellbuttonCopy, this.Options.headerbutton[q]); 
  cellbuttonCopy=cellbutton();
    }
     for(var q in this.Options.cellbuttons){
    this.Options.cellbuttons[q] = W.U.extend( cellbuttonCopy, this.Options.cellbuttons[q]); 
      cellbuttonCopy=cellbutton();
    }     
 
    this.TemplateNode=this.initTemplate();
    this.init();
    W.U.windowresize.Add(this.SetTable.bind(this));

}
 var TranseData={
          
                ifo: { AppId:W.A.page.AppId, Afiatr: {}, Mfiatr: {},Cfiatr:{} },  //info
               bypass: 0,
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 3,  //pagesize
                tp: 1,  //total page
                tr: 1,  //total result
                pgd: 1   //paged
            };
var intentAbbr={
    'dashboard_shipping':'spg',
    'dashboard_products':'sp',
    'dashboard_categories':'dc',
    'dashboard_orders':'do',
    'dashboard_collections':'collection',
    'dashboard_advertise':'advertise',
    'dashboard_companycategories':'dcc',
    'dashboard_brands':'db'
}


Handler.Defaults={
title:'',
name:'',
description:'', 
headerbutton:[],
headerbuttonshow:true,
rowcheck:false,
cssclass:cssclass,
NoResultText:'No result found',
pagination :true,
search:true,
cellbuttons:[],
Tablecolumn:[],
bodybuilder:W.U.noop,
infoBlock:function(){return '';},
onDelete:onDelete,
TranseData:TranseData


};

Handler.prototype.init=function(){
    this.col=this.Options.Tablecolumn.length;
    this.columnWidth=this.calculateCellwidth();
    this.setcomponent('head');
    this.setcomponent('headerButton');
    this.setcomponent('infoBlock');
   this.LoadData();

   // W.U.console(this);
}



Handler.prototype.LoadData=function(){
      var Tdata=this.Options.TranseData;    var TemplateNode=this.TemplateNode;
      var _this=this;
          var form = 'paging',
     f_value = { name: 'dashboard', ps: Tdata.ps, tp: Tdata.tp, pgd: Tdata.pgd,sstr:Tdata.sstr, ifo: JSON.stringify(Tdata.ifo) };

            var formData = {
                form: form,
                f_value: f_value
            };

     W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                       Tdata.fr = 1;
                        // W.U.console(T)
                        $(TemplateNode.tablebody).html(W.T.blockLoading());
                       
                    },
                    success: function (data) {
                   $(TemplateNode.tablebody).html('');
                    Tdata.result=[];
                       Tdata.fr = 0;

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {


                        }
                        if (ret.state == 200) {
                            var Hret = ret.response;
                        Tdata.pgd = Hret.paged;
                          Tdata.ps = Hret.pagesize;
                         Tdata.tp = Hret.totalpage;
                        Tdata.sstr = Hret.searchstr;
                      Tdata.ifo=   W.U.extend(Tdata.ifo, Hret.ifo);
                            for (var q in Hret.result) {
                                var Dresult = Hret.result[q];
                             Tdata.result.push(Dresult);
       W.U.intentdata.add(intentAbbr[W.A.page.AppId]+'.'+Dresult.id,Dresult);
     
                
                
                          }
       //saving transedata in globle 
   W.U.intentdata.add(intentAbbr[W.A.page.AppId]+'.TranseData', Tdata);

                                 _this.SetTable();
             _this.setcomponent('status');
             _this.setcomponent('headerdropdown');

 W.U.ccbk.Run('DAshboardTableLoaded' );
                        }
                        
                    }

                });
}




Handler.prototype.initTemplate=function(){

    var ch='<div class="block bs-1 ">';

        ch+='<div class="block  _bdy bg_0"> <div class="block "> <div class="left"> <h3 style="margin-top: 3px;">'+this.Options.title+'</h3> </div><div class="right" data-block="headerButton"></div></div><div class="block "> <p class="block _bdy fg_4 fs-italic fs11">'+this.Options.description+'</p></div></div>';
     ch+='<div  data-block="info" ></div>';
     ch+='<div  data-block="status" ></div>';
     ch+='<div  data-block="tablehead0" ></div>';
     ch+='<div   data-block="tablehead1" ></div>';
     ch+='<div   data-block="bulkaction" ></div>';
     ch+='<div  data-block="loading" ></div>';
     ch+='<div   data-block="tablebody" ></div>';
     ch+='<div  data-block="tablefoot" ></div>';
     ch+='</div>';

   var  mainBlock=W.U.Rander(ch);
    
    var TemplateNode={
       headerButton:W.U('[data-block="headerButton"]',mainBlock[0])[0],
       loading:W.U('[data-block="loading"]',mainBlock[0])[0],
       info:W.U('[data-block="info"]',mainBlock[0])[0],
       status:W.U('[data-block="status"]',mainBlock[0])[0],
       tablehead0:W.U('[data-block="tablehead0"]',mainBlock[0])[0],
       tablehead1:W.U('[data-block="tablehead1"]',mainBlock[0])[0],
       bulkaction:W.U('[data-block="bulkaction"]',mainBlock[0])[0],
       tablebody:W.U('[data-block="tablebody"]',mainBlock[0])[0],
       tablefoot:W.U('[data-block="tablefoot"]',mainBlock[0])[0]           
    }
       W.U.Setview(this.Node,mainBlock,'html');

       return TemplateNode;

}

Handler.prototype.setcomponent=function(name){
    var rowcheck =this.Options.rowcheck;var _this=this;
     var columnWidth = this.columnWidth;
    var ch='<div></div>';

   switch(name){
    //info block
case 'infoBlock':

this.Options.infoBlock.bind(this)();



break;


//header button
case 'headerButton':
var headerbutton= this.Options.headerbutton;
ch='<div class="btn-group" role="group">  '
 for (var i = 0; i < headerbutton.length; i++) {
        
 ch += '<a href="javascript:void(0);" class=" btn btn-xs '+headerbutton[i].cssClass+'" '+headerbutton[i].attrStr+' > '+headerbutton[i].name+'</a>';
            }
 ch += '</div>';
var  mainBlock=W.U.Rander(ch);
  W.U.Setview(this.TemplateNode.headerButton,mainBlock,'html');
break;
 //headerdropdown
case 'headerdropdown':
ch='<div class="block td-n bs-1   bg_0" >  '

  ch += '<div class="w2 " ><div class="block po-re al-c">';

 ch += '<a href="javascript:void(0);" class=" block _Bdy bg_0" role="button" data-toggle="dropdown" >'+W.T.SVG('search',18,'#1274c0')+'</a>';
 ch += '<div class="hide po-ab" data-block="menu">';
 ch += '<div class="block bg_0 _Bdy bs-1" > <form name="dashboardsearch" onsubmit="return false;"><div class="block form-piece"> <div class="input-group"> <input type="text" name="sstr" class="form-mold" placeholder="Search for..." value="" autocomplete="off"> <span class="input-group-btn"> <a href="javascript:void(0);"  class="btn " data-junction="DashboardTablepagingA" type="button">&nbsp;&nbsp;Go!&nbsp;&nbsp;</a> </span> </div></div></form></div>';

 ch += '</div></div></div>';
  
 ch += '<div class="w10" >'+this.Pagination(this.Options.TranseData)+'</div>';      

          
 ch += '</div>';
    W.U.JunctionAdd(W.A.page.AppId, 'DashboardTablepagingA', function () {
this.Node.onclick = _this.onpaging.bind({ Node: this.Node, data: this.data });
     }, { pgd: 1,sstr:this.Options.TranseData.sstr,btn:'A',we:this });

var  mainBlock=W.U.Rander(ch);
  W.U.Setview(this.TemplateNode.tablehead0,mainBlock,'html');
break;
case 'status':
//W.U.console(this.Options.TranseData);
     if(this.Options.TranseData.sstr!=''){
        ch = '<div class=" block _bdy al-l Fw-b"><p>Showing about '+(this.Options.TranseData.tp*this.Options.TranseData.ps)+' item(s) for search <i class="fw-b">'+this.Options.TranseData.sstr+'</i>&nbsp;&nbsp;  <a   href="javascript:void(0);" data-junction="DashboardTablepagingB" >text_216</a></p></div>';
                }
  
 W.U.JunctionAdd(W.A.page.AppId, 'DashboardTablepagingB', function () {
this.Node.onclick = _this.onpaging.bind({ Node: this.Node, data: this.data });
     }, { pgd: 1,sstr:this.Options.TranseData.sstr,btn:'A',we:this });

var  mainBlock=W.U.Rander(ch);

  W.U.Setview(this.TemplateNode.status,mainBlock,'html');
break;

  case 'head':
      ch = '<div class="block ul ul-menu bg_7" >';
            if (rowcheck) {
           ch += '<div class="li " style="width:30px;" ><div class="block ad-2"><label class="checkbox" data-toggle="checkbox"><input type="checkbox" name="tablerowall" value=""><span></span> </label></div></div>';
            }
            for (var i = 0; i <  this.col; i++) {
                var width = (i == 0) ?columnWidth.first : columnWidth.Rest;

                ch += '<div class="li" style="width:' + width + 'px" ><div class="block _Bdy" > <span class="fw-b tt-c">' +
                this.Options.Tablecolumn[i]

                + '</span></div></div>';
            }
            ch += '</div>';
var  mainBlock=W.U.Rander(ch);
  W.U.Setview(this.TemplateNode.tablehead1,mainBlock,'html');
    break; 

case 'body':
 var data = this.Options.TranseData.result;

   ch = '<div class="block ul "   >';

   if(data.length>0){
            for (var j = 0; j < data.length; j++) {//print tr
         

            var  trcss=(((j+1)%2)==0)?this.Options.cssclass.evenrow:this.Options.cssclass.oddrow;
                ch += '<div class="block li b_gtl bs-1 '+trcss+' " data-nodeid="'+intentAbbr[this.Options.name]+'.'+data[j].id+'" >'+this.creatRow(data[j])+'</div>';
            }
}else{
    ch += '<div class="block li b_gtl bs-1  " ><div class="block _bdy al-c fw-b bg_0 ">'+ this.Options.NoResultText+'</div></div>';  
 
}
            ch += '</div>';



   W.U.AttachDom( this.TemplateNode.tablebody, ch, 'html',function(){
        
       W.U.attrclick('[data-deletebtn]',this.mainBlock[0],function(){ 
       var id=this['data-deletebtn'];
       _this.ApplyStatusChangeAsk(id);
       });
   });

break;
case 'foot':

   var EditLink=[
   {href:'javascript:void(0);',text:'5',icon:'',attrStr:' data-btnrowperpage="5" '},
   {href:'javascript:void(0);',text:'10',icon:'',attrStr:' data-btnrowperpage="10"  '},
   {href:'javascript:void(0);',text:'20',icon:'',attrStr:'  data-btnrowperpage="20" '}
   ];

    ch = '<div class="block bg_0 bs-1" >'
       //--
       +'<div class="right" >'
       +'<div class="block _bdy  po-re" >'
        +'<span>text_68</span><span> '+ this.Options.TranseData.ps+'</span><span class="po-re">'
       +'<a href="javascript:void(0);" class="btn btn-link"  data-toggle="dropdown" >  ' + W.T.SVG('downarrow', 18, '#1274c0') + '</a>'
       +'<div class="hide po-ab" data-block="menu">'+
   W.U.CreateMENU(EditLink,['block ul hover bg_0 fg_4 ff_3  bs-0','li bs-1','block _Bdy',' tt-c  ',''])+'</div>'
       +'</span>'
       +'</div>'
       +'</div>'
       +'</div>'
       + '</div>';


var  mainBlock=W.U.Rander(ch);
 
  W.U.AttachDom(this.TemplateNode.tablefoot, ch, 'html',function(){
     
       W.U.attrclick('[data-btnrowperpage]',this.mainBlock[0],function(){
           var rowperpage=this['data-btnrowperpage'];
             _this.Options.TranseData.pgd=1;
           _this.Options.TranseData.ps=rowperpage;
             _this.LoadData(); 
       });
   });
break;
case 'bulkaction':


break;




   }

     

}

Handler.prototype.onpaging=function(){
     var data=this.data;
      var _this=data.we;
        var Tdata= _this.Options.TranseData;
    
Tdata.result=[];

var search=W.F.walk_way_all(['sstr'], 'dashboardsearch');
    Tdata.sstr=search['sstr'];    


  switch(data.btn){
case "A":
  
Tdata.pgd=1;

break;     
case "B":
Tdata.sstr='';
Tdata.pgd=1;

break; 
case "E":

Tdata.pgd=this.Node.value;

break;
default:

Tdata.pgd=data.pgd;

 }


              
             

                _this.LoadData(); 


}
Handler.prototype.calculateCellwidth=function() {
    
        
            var pagePostion=W.U.getPosition(this.Node);//W.U('.main_pane')[0]
    
            var parentWidth = (pagePostion.width-8);
     
         parentWidth=(parentWidth-25);
       
            var rowcheck = this.Options.rowcheck;
            var restcol = (this.col - 1);
            if (rowcheck) {
                parentWidth = (parentWidth - 30);
               
            }

            var firstcolwidth = Math.ceil(parentWidth - (parentWidth * (30 / 100)));
            firstcolwidth = (firstcolwidth > 250) ? 250 : firstcolwidth;
            if (this.col == 1) {
                firstcolwidth = parentWidth ;
            }

   
            var TotalRestcolwidth = ((parentWidth - firstcolwidth)) - restcol;
            var Restcolwidth = Math.floor((TotalRestcolwidth / restcol));

          

            if (Restcolwidth < 100 && this.col > 1 && TotalRestcolwidth >= Restcolwidth) {
                this.col--;

                var againParse = this.calculateCellwidth.bind(this)();

                return againParse;

            }

            return { first: firstcolwidth , Rest: Restcolwidth};
        }


Handler.prototype.Pagination=function(Tdata){
      var NagivationDisable=['','','','',''];var ch='';var _this=this;

     var start=1,previous=1,currenttext='',next=1,end=1,sstr=Tdata.sstr;
   Tdata.pgd=Tdata.pgd-1;
 
 
 
       if(Tdata.pgd>Tdata.tp){
            Tdata.pgd=Tdata.tp;    
            }

       if(Tdata.pgd>1){
               previous=Tdata.pgd-1; 
            }else{
                  previous=Tdata.pgd;  
NagivationDisable=['','disabled','','',''];

            }

currenttext=(Tdata.pgd)+' of '+Tdata.tp;
next=Tdata.pgd+1;
if(Tdata.next>Tdata.tp){
    Tdata.next=Tdata.tp;
NagivationDisable=['','','','disabled',''];
}


end =Tdata.tp;


      if(Tdata.tp>1){
    ch+='<ul class="pagination right" style="margin: 3px 3px 0px 0px;">';
   ch+='<li> <a href="javascript:void(0);" class="form-mold"  data-junction="DashboardTablepagingC" '+NagivationDisable[0]+'><span>«</span></a> </li>';
 ch+='<li><a href="javascript:void(0);" class="form-mold" data-junction="DashboardTablepagingD" '+NagivationDisable[1]+'><span>‹</span></a></li>';
  ch+='<li><input type="text" class="form-mold" data-junction="DashboardTablepagingE"  placeholder="'+currenttext+'" title="Jump to any page"></li>';
  ch+='<li> <a href="javascript:void(0);" class="form-mold" data-junction="DashboardTablepagingF" '+NagivationDisable[3]+'> <span>›</span></a> </li>';
 ch+='<li><a href="javascript:void(0);" class="form-mold" data-junction="DashboardTablepagingG" '+NagivationDisable[4]+'>»</a> </li>';

    ch+='</ul>';

  //binding event
    W.U.JunctionAdd(W.A.page.AppId, 'DashboardTablepagingC', function () {
this.Node.onclick = _this.onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: start,sstr:sstr,btn:'C',we:this });
    W.U.JunctionAdd(W.A.page.AppId, 'DashboardTablepagingD', function () {
this.Node.onclick = _this.onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: previous,sstr:sstr ,btn:'D',we:this});
    W.U.JunctionAdd(W.A.page.AppId, 'DashboardTablepagingE', function () {
this.Node.onchange = _this.onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: 0,sstr:sstr,btn:'E',we:this });
 W.U.JunctionAdd(W.A.page.AppId, 'DashboardTablepagingF', function () {
this.Node.onclick = _this.onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: next,sstr:sstr ,btn:'F',we:this});
W.U.JunctionAdd(W.A.page.AppId, 'DashboardTablepagingG', function () {
this.Node.onclick = _this.onpaging.bind({ Node: this.Node, data: this.data });
            }, { pgd: end,sstr:sstr,btn:'G',we:this });

}
      return ch;
}
Handler.prototype.createRestcol=function(){
             var _this=this.we;
            var col = _this.Options.Tablecolumn.length;
            var data =  this.data;
            var restcolList = [];
            //W.U.console(data );
            var i = col - (col - _this.col);
            for (i; i < col; i++) {

                restcolList[i] = _this.Options.Tablecolumn[i];

            }
            var ch = '';
            if (restcolList.length > 0) {
                ch += '<div class="block   " ><div class="block ul " >';

                for (var i in restcolList) {
                    ch += '<div class="block li  _bdy" >';
                    ch += '<span class="span tt-c" >' + restcolList[i] + '</span ><span class="span">-</span ><span class="span">' + data[restcolList[i]] + '</span >';


                    ch += '</div >';
                }

                ch += '</div></div>';

            }
            return ch;
        }

Handler.prototype.createcellLink=function() {
           var ch = '';
           var _this=this.we;
           var data =  this.data;
           var URL=W.U.URL;



  switch (W.A.page.AppId ) {

             case 'storestaff':
                 ch += '<div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"   >text_153</a></span> <span> <a href="javascript:void(0);" class="hide"   >delete</a></span> <span> <a href="' + URL('') + slug + '" class="hide" >text_155</a></span></div>';
                break;

                case 'dashboard_categories':
    ch += '<div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':categoriesedit:dc:'+data.id+'"  >text_153</a></span> <span> <a href="javascript:void(0);" data-deletebtn="'+ data.id+'" >delete</a></span> <span> <a href="' + URL('') +data.Data.slug+  '">text_155</a></span></div>';
                break;
      case 'dashboard_collections':
    ch += '<div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':collectionedit:collection:'+data.id+'"  >text_153</a></span> <span> <a href="javascript:void(0);" data-deletebtn="'+ data.id+'" >delete</a></span> <span> <a href="' + URL('') +data.Data.slug+  '">text_155</a></span></div>';
                break;

     case 'dashboard_shipping':
    ch += '<div class=" td-cell-link"> <span> <a href="javascript:void(0);" data-pagerbtn="'+ W.I.dp+':shippingedit:spg:'+data.id+'" >text_153</a></span> <span> <a href="javascript:void(0);" data-deletebtn="'+ data.id+'"  >delete</a></span> <span> </span></div>';
                break;
 case 'dashboard_products':
 var inventryList='<span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':inventoryedit:sp:'+data.id+':edit:0:'+ W.I.dpwf+'"  >text_156</a></span>';
// W.U.console(data);
 if(data.Hvrt){
     inventryList='<span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':inventorylistedit:sp:'+data.id+'"  >text_156</a></span>';
 }

    ch += '<div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':productedit:sp:'+data.id+'"   >text_55</a></span><span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':productcopy:sp:'+data.id+'"   >text_10</a></span>  <span> <a href="javascript:void(0);" data-deletebtn="'+ data.id+'"  >delete</a></span><span> <a href="' + URL('') +data.Data.slug +  '">text_155</a></span></div><div class="fs11 td-cell-link"> '+inventryList+' <span> <a href="javascript:void(0);" data-pagerbtn="'+ W.I.dp+':specificationList:sp:'+data.id+'"    >text_54</a></span><span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':productOptionsList:sp:'+data.id+':edit:0:'+ W.I.dpwf+'"    >text_154</a></span>  </div>';
  
  
     
             break;
         case 'dashboard_discounts':
    ch += '<div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':discountedit:discount:'+data.id+'"  >text_153</a></span> <span> <a href="javascript:void(0);" data-deletebtn="'+ data.id+'" >delete</a></span> </div>';
                break;
        case 'dashboard_advertise':
    ch += '<div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':advertisebasicedit:advertise:'+data.id+'"  >text_153</a></span> <span> <a href="javascript:void(0);" data-pagerbtn="'+ W.I.dp+':advertisebudgetedit:advertise:'+data.id+'" >text_355</a></span> <span> <a href="javascript:void(0);" data-pagerbtn="'+ W.I.dp+':AdvertiseLocationEdit:advertise:'+data.id+'" >text_65</a></span> <span> <a href="javascript:void(0);" data-deletebtn="'+ data.id+'" >delete</a></span> </div>';
                break;
        case 'dashboard_companycategories':
  ch += '<div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':categoriesedit:dcc:'+data.id+'"  >text_153</a></span> <span> <a href="javascript:void(0);" data-deletebtn="'+ data.id+'" >delete</a></span> <span> <a href="' + URL('') +data.Data.slug+  '">text_155</a></span></div>';
                break;
        case 'dashboard_brands':
 var inventryList='<span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':inventoryedit:db:'+data.id+':edit:0:'+ W.I.dpwf+'"  >text_156</a></span>';
// W.U.console(data);
 if(data.Hvrt){
     inventryList='<span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':inventorylistedit:db:'+data.id+'"  >text_156</a></span>';
 }

    ch += '<div class="fs11 td-cell-link"> <span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':productedit:db:'+data.id+'"   >text_55</a></span>  <span> <a href="javascript:void(0);" data-deletebtn="'+ data.id+'"  >delete</a></span><span> <a href="' + URL('') +data.Data.slug +  '">text_155</a></span></div><div class="fs11 td-cell-link"> '+inventryList+' <span> <a href="javascript:void(0);" data-pagerbtn="'+ W.I.dp+':specificationList:db:'+data.id+'"    >text_54</a></span><span> <a href="javascript:void(0);"  data-pagerbtn="'+ W.I.dp+':productOptionsList:db:'+data.id+':edit:0:'+ W.I.dpwf+'"    >text_154</a></span>  </div>';
                break;

            }

            return ch;


        }
Handler.prototype.creatRow=function(data){
     data = this.Options.bodybuilder(data);
      var rowcheck =this.Options.rowcheck;
     var columnWidth = this.columnWidth;
     var restcol=this.createRestcol.bind({ we: this, data: data })();
     var  cellLink=this.createcellLink.bind({ we: this, data: data})();
     var ch='<div class="block ul ul-menu" >';
                if (rowcheck) {
              ch += '<div class="li " style="width:30px;" ><div class="block ad-2"><label class="checkbox" data-toggle="checkbox"><input type="checkbox" name="tablerow" value="'+data.id+'"><span></span> </label></div></div>';
                }
            
               for (var i = 0; i <  this.col; i++) {
                var width = (i == 0) ?columnWidth.first : columnWidth.Rest;
                var css = (i == 0) ?this.Options.cssclass.maincell : '';
                ch += '<div class="li ov-hi" style="width:' + width + 'px" ><div class="block _Bdy " > ' ;
                 ch += '<p class="wball '+css+'">'+data[this.Options.Tablecolumn[i]]+'</p>';
                 if (i == 0) {
                        ch += cellLink;
                        ch += restcol;
                    }
              ch +='</div></div>';
            }

                ch += '</div>'; 



    return ch;


}
Handler.prototype.SetTable=function(){
 
      this.col=this.Options.Tablecolumn.length;
    this.columnWidth=this.calculateCellwidth();
      this.setcomponent('head');
      this.setcomponent('body');
      this.setcomponent('foot');
}


Handler.prototype.ApplyStatusChangeAsk=function(id){
   var  _this=this;
    var Modeldata={
 name:'ApplyDeleteAsk',
 Tilte:'Confirm',
 body:'Do you want to delete this. there is no further Undo.',  
actionbutton:[{text:'Cancel',name:'no',cssClass:'fg_7"',attrStr:' data-pagerbtn="'+W.I.dp+':'+W.I.dpbf+'" '},{text:'Delete',name:'yes',cssClass:'fg_8'}],
YesCallback:function(){ 
//W.U.OrderStatusUpdate.Apply(oid);
 W.U.Pager.togglePage(W.I.dp,W.I.dpbf);
_this.Options.onDelete.bind(_this)(id);
}
};


 W.U.Pager.AddModal(Modeldata);
  W.U.Pager.DirectInitPage(W.I.dp,'ApplyDeleteAsk'); 
}
//////////////////////////
/* Default On delete
*/
function onDelete(id){
     var _this=this;
     var f_value={id:id,AppId:_this.Options.name};
 var loadingId= W.F.Load('deshboardtabletrdelete',f_value);
     W.U.ccbk.Add('progress'+loadingId ,function(){      W.U.madianLoading('show');        });
     W.U.ccbk.Add('complete'+loadingId ,function(){     W.U.madianLoading("hide");       });
     W.U.ccbk.Add('complete200'+loadingId ,function(data){      
     var trNode=W.U.id(''+W.U.DashboardTable.intentAbbr[_this.Options.name]+'.'+id+'');
   
     if(W.U.isOK(trNode)){
       $(trNode).remove();
       W.F.Toast('successfully_deleted');
     }
   
       });
     W.U.ccbk.Run('load'+loadingId );  


 }
/////////////////


var dashboard={};

function init(Node,Options){
    
  dashboard=  new Handler(Node,Options);

}

function updateRow(data){
    
     
    W.U.intentdata.add(intentAbbr[W.A.page.AppId]+'.'+data.id,data);
    var Node=W.U.id(intentAbbr[W.A.page.AppId]+'.'+data.id);
    var action='html';
    if(Node==null){
      action='prepend';
      Node=dashboard.TemplateNode.tablebody

    }

      W.U.AttachDom( Node, dashboard.creatRow(data), action,function(){
        
       W.U.attrclick('[data-deletebtn]',this.mainBlock[0],function(){ 
       var id=this['data-deletebtn'];
     dashboard.ApplyStatusChangeAsk(id);
       });
   });



}

function LoadData(TranseData_args){
  

TranseData_args=(W.U.isOK(TranseData_args))?TranseData_args:TranseData

 dashboard.Options.TranseData=TranseData_args;
   dashboard.LoadData();
   W.U.Pager.togglePage(W.I.dp,W.I.dpbf);
}


   W.U.DashboardTable={init:init,
   updateRow:updateRow,
   LoadData:LoadData,
   TranseData:function(){ return dashboard.Options.TranseData  },
   intentAbbr:intentAbbr

   };

})(wowrol);