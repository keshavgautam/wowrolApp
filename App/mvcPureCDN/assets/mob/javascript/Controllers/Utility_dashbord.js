/*
* 
*/
; (function (W) {
    "use strict";

 var deshboard=function(x){
         var view = {};
       var P=W.A.page.AppId;
       var deshboardwalkway=W.U.id('deshboardwalkway');

     /*
        * @ description 
        */
        function init(){
          defaultpaging();
            LoadTableData();
        }
        /*
        * @ description  set the default paging  data
        */

        function defaultpaging() {
            var data = {
                ifo: { AppId: P },  //info
                sS: {},  //server setting we be retrivre after LoadTableData
                result: [],  //all retrived data will stored in this varible
                fr: 0,  //fire
                slcid: '',  //selected id
                sstr: '',  //search str
                ps: 5,  //pagesize
                tp: 1,  //total page
                pgd: 1   //paged
            };


            view[P] = data;
        }

       
       /*
        * @ description 
        */

        function LoadTableData(){
            
              var form = 'paging',
     f_value = { name: 'dashboard', ps: view[P].ps, tp: view[P].tp, pgd: view[P].pgd,sstr:view[P].sstr, ifo: view[P].ifo };

            var formData = {
                form: form,
                f_value: f_value
            };
            if (view[P].fr == 0) {
                W.U.ajax({

                    url: W.U.URL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                        view[P].fr = 1;
                        // console.log(T)
                        $(deshboardwalkway).html(T.L());
                       
                    },
                    success: function (data) {
                   $(deshboardwalkway).html('');
                        view[P].fr = 0;

                        var ret = JSON.parse(data);
                        if (ret.state == 500) {


                        }
                        if (ret.state == 200) {
                            var Hret = ret.response;
                            view[P].pgd = Hret.paged;
                            view[P].ps = Hret.pagesize;
                            view[P].tp = Hret.totalpage;
                            for (var q in Hret.result) {
                                var Dresult = Hret.result[q];
                                view[P].result.push(Dresult);
                            }
toggle_0();
                        }
                        
                    }

                });
            }

        }
         /*
        * @ description  set the page after table completed the loading
        */
        function toggle_0() {
            var ch = '';
       //   console.log(view[P]);
        //  console.log( view[P].result);



            var table = CreateTable();
    

  var blockList = [table, FromWrap("FW")];
   var blockName = ["table", "FW"];

            switch(P){
       case 'dashboard_products':
     blockList = [table,FromWrap("FW"),FromWrap("spf"),FromWrap("int"),FromWrap("opt")];
       blockName = ["table","FW","spf","int","opt"];
       break;
    
            }
//making url free from
        
            var setting = {
                name: 'dashboard',
                target: "table",
                page: true,
                minheight: 'auto'
            };
            ch += W.T.ToggleBlock(blockList, blockName, setting);


           W.U.AddDom(W.U.id('deshboardwalkway'), ch, 'html');

            // pu t it in last

            //    console.log(U.id('block.' + 'FW'));
            //  console.log($(U.id('block.' + 'FW')).parent());
            //var Node = U.id('block.' + 'FW');

            // $(Node.parentNode).on("shown",CreateForm.bind({ Node: Node, action: 'new', data: {} }));
            //call runner
           W.U.resize();
            /*supposed structure is already arrived .
            it help id submit button event listener
            */
         
     //-- first time dafult add 
            switch(P){
       case 'dashboard_products':
 var basicFrom=CreateForm.bind({ action: 'new' })();
 var productSpecification=W.F.Forms["productSpecification"].bind({ action: 'new'})();    ;

  W.U.AddDom(W.U.id('FWblock'),basicFrom,'html');
   W.U.AddDom(W.U.id('spfblock'),productSpecification,'html');
       break;
    default:
    var newFrom=CreateForm.bind({ action: 'new' })();
   W.U.AddDom(W.U.id('FWblock'),newFrom,'html');
            }
    
    //-->>


            $(W.U.id('deshboardtabletable')).triggerHandler("resize");
        }

        function updateView(value) {
            var match = 0;
            for (var q in view[P].result) {

                if (view[P].result[q].id == value.id) {
                    match++;
  // unshift() method adds one or more elements to the beginning of an array
                    view[P].result.splice(q, 1);

                }

            }

            if(view[P].result.length>0){
             // unshift() method adds one or more elements to the beginning of an array 
             view[P].result.unshift(value);   
            }else{
              
                view[P].result.push(value);
              


            }
            



          // console.log(match);   console.log(value);
        // console.log( view[P].result);

        }
        function giveResult(id) {
            var match = 0;
            var data = {};
            for (var q in view[P].result) {

                if (view[P].result[q].id == id) {
                    data = view[P].result[q];
                    break;
                }

            }
           //   console.log('--giveResult(id)--');
         //    console.log(data);console.log(id);console.log(view[P].result);
            return data;

        }
        function deleteView(id) {

            for (var q in view[P].result) {

                if (view[P].result[q].id == id) {


                    view[P].result.splice(q, 1);

                }

            }


        }

          /**
        * Load this function create the table form different App id
        */
        function CreateTable() {
         //    console.log('--create table--');
     //   console.log( view[P]);
         /*   var end = ((view[P].pgd - 1) * view[P].ps);
            var q = ((view[P].pgd - 2) * view[P].ps);
            q = (q < 0) ? 0 : q;
            var Tre = (view[P].tp * view[P].ps);
            var Tresult = view[P].result.length;
            var limit = (end > Tre) ? Tre : end;
            limit = (limit < 0) ? 0 : limit;
            var endLimit = (limit > Tresult) ? Tresult : limit;
            endLimit = (endLimit < 0) ? 0 : endLimit;*/
            var   endLimit =view[P].result.length;
         //   console.log( endLimit);
            var ondelete = function () {
                var meg = T.F.deleteRow(this);

              W.U.Modal(meg);
            };
            var onedit = function () {

                var id = this.data.id;
                var data = giveResult(id);
 console.log(this);
             console.log(data);

        var newFrom=CreateForm.bind({ data: data, action: 'edit' })();
 W.U.AddDom(W.U.id('FWblock'),newFrom,'html');

                var event = jQuery.Event("show");
                event.id = 'FW';
                $(W.U.id('block.FW')).parent().triggerHandler(event);

            
            };
            var onpaging=function(){
                var data=this.data;
view[P].result=[];
 var rv = ['sstr'];
var search=W.F.walk_way_all(rv, 'dashboardsearch');
    view[P].sstr=search['sstr'];
   
 switch(data.btn){
case "A":
  
 
    view[P].pgd=1;

break;     
case "B":
view[P].sstr='';
    view[P].pgd=1;

break; 
case "E":

    view[P].pgd=this.Node.value;

break;
default:

 view[P].pgd=data.pgd;

 }


              
             

                LoadTableData(); 
             }

        


            // field for table data
            var tBody = [];
            var header = [];
            var setting = {
                rowcheck: false,
                type: 'category',
                paging: true,
                name: 'demotable'
            };
            //

           setting.paging=   (view[P].tp>1)?true:false;


            var tabledata = {
                header: header,
                body: tBody,
                setting: setting,
                onedit: onedit,
                ondelete: ondelete,
                onpaging:onpaging,
                pagingData:{tp:view[P].tp,pgd:view[P].pgd,ps:view[P].ps,sstr:view[P].sstr}
            };



            switch (P) {
                case 'storestaff':
                    header = ['username', 'created', 'lastActivity'];
                    setting.type = "storestaff"; setting.paging = false;
                   //  console.log('Lop-p');
               //   console.log(endLimit);console.log(q);
                    for (var i = 0,  q=0; q < endLimit; q++, i++) {
                        var qData = view[P].result[q];

                        tBody[i] = {
                            id: qData.staffid,
                            username: '<span class="fw-b tt-c">'+qData.un+'</span>',
                            lastActivity: '<time datetime="' + qData.ll + '">' + qData.ll + '</time>',
                            created: '<time datetime="' + qData.ud + '">' + qData.ud + '</time>'
                        };
                       //  console.log(tBody);
                    }


                   //   console.log(tBody);

                    break;
                case 'dashboard_categories':
                    header = ['name', 'parent'];
                    setting.type = "category";
             //   console.log(endLimit); console.log(limit); console.log(q);
                    for (var i = 0, q=0; q < endLimit; q++, i++) {
                        var qData = view[P].result[q];

var parent ='<a href="javascript:void(0);">'+qData.pa.cN+'</a>';


                        tBody[i] = {
                            id: qData.cid,
                            name: '<span class="fw-b tt-c">'+qData.cN+'</span>',
                            parent: parent,
                            slug: qData.slug,
                            date: ''
                        };

                    }




                    break;

                case 'dashboard_shipping':
              header = ['name', 'locations'];
               setting.type = "shipping";

                 for (var i = 0, q=0; q < endLimit; q++, i++) {
                        var qData = view[P].result[q];




                        tBody[i] = {
                            id: qData.spgid,
                            name: qData.Name,
                            locations: ''
                        };

                    }


                    break;

              case 'dashboard_products':
              header = ['name', 'information'];
               setting.type = "products";

                 for (var i = 0, q=0; q < endLimit; q++, i++) {
                        var qData = view[P].result[q];
                       tBody[i] = {
                            id: qData.id,
                            name: qData.pN,
                            information: ''
                        };

                    }

var subedit=function(){
  
     var subedit=this.data.subedit;
     var id = this.data.id;
     var data = giveResult(id);
 var newFrom='';
 var Blockid='FW';// block id is ref to //"FW","spf","int","opt"
     switch(subedit){
 /*   blockList = [table,FromWrap("FW"),FromWrap("spf"),FromWrap("int"),FromWrap("opt")];
       blockName = ["table","FW","spf","int","opt"];
       */
       case'inventory':
   newFrom=W.F.Forms["productInventory"].bind({ data: data, action: 'edit' })();
   Blockid='int';
       break;
       case'specification':
   newFrom=W.F.Forms["productSpecification"].bind({ data: data, action: 'edit' })();
    Blockid='spf';
 break; 
       case'options':
  newFrom=W.F.Forms["productOptions"].bind({ data: data, action: 'edit' })();
    Blockid='opt';
       break; 
     }

     
 W.U.AddDom(W.U.id(Blockid+'block'),newFrom,'html');

                var event = jQuery.Event("show");
                event.id = Blockid;
                $(W.U.id('block.' +Blockid)).parent().triggerHandler(event);


}
     tabledata['onsubedit']=subedit;

                break;
                case 'dashboard_orders':
       header = ['information','order'];
      setting.type = "orders";
    for (var i = 0, q=0; q < endLimit; q++, i++) {
                        var qData = view[P].result[q];
                       tBody[i] = {
                            id: qData.id,
                            name: qData.pN,
                            information: ''
                        };

                    }
                break;





            }

      tabledata['header']=header;
      tabledata['body']=tBody;
      tabledata['setting']=setting;
  
          //  console.log(tBody);
            var tablestrip = '<div class="block _bdy bg_0 _B-gray  ">' + W.T.Table(tabledata) + '</div>';



            return T.HS() + tablestrip;
        }
        /**
        * Load this function create the table form different App id
        */
        function FromWrap(x) {
            var ch = '';

            ch += '<div class="block "  data-nodeid="'+x+'block" >empty form</div>';

            var Wrap =W.T.wrap(W.T.FormHeader({ close: '<div class="li b_grl"><a href="javascript:void(0);" data-closebtn="dashboard" >' + W.T.SVG('left', 24, '#f1f5fc') + '</a></div>',
                title: '<span class=" block header-link-btn"><p class="fw-b al-c"><i class="material-icons"> </i><span class="vl-sp" data-nodeid="'+x+'title">Title</span></p></span>',
                done: '<div class="li b_gll"><a href="javascript:void(0);"  data-nodeid="'+x+'submit"    ><span>Submit</span><i class="badge _gbtn"></i> </a></div>'
            }), ch);

            return Wrap;
        }


        /**
        * Load this function CreateForm default empty form
        */
        function CreateForm() {

            var mainform = 'Form not found';
           if(W.F.Forms.hasOwnProperty(P)){
       mainform = W.F.Forms[P].bind({ data: this.data, action: this.action })();    
                }
            return mainform;


        }

        /**
        * give the all template
        */
        var T = {
            L: function (x) { // Loading Block
                var ch = '<div class="block li bs-2dp  bg_0  al-c">';
                ch += '<div class="block"> <img src="/assets/imgs/pic/ring-alt.svg" style="width:50px;height:50px;" alt="loading..." > </div>';
                ch += '</div>';

                return ch;
            },
            HS: function (x) {//heading strip
                var ch = '';
                var HSDATA = { Title: '',
                    btnNAme: '',
                    Dummybtn: '',
                    des: ''
                };
                switch (P) {
                    case 'dashboard_categories':
                        HSDATA.Title = 'Categories';
                        HSDATA.btnNAme = 'Add New';
                        HSDATA.btnclass = '';
                        HSDATA.btnId = 'FW';
                        HSDATA.des = 'Category are arrangement for the products,menu.Same type product can be grouped in category';


                        break;
                    case 'storestaff':
                        HSDATA.Title = 'Store Staff';
                        HSDATA.btnNAme = 'Add New';
                        HSDATA.btnclass = '';

                        if (view[P].result.length >= 5) {
                            HSDATA.btnclass = 'hide';
                        }

                        HSDATA.btnId = 'FW';
                        HSDATA.des = 'store staff makes easy store administration .';


                        break;
                          case 'dashboard_shipping':
                        HSDATA.Title = 'Shipping';
                        HSDATA.btnNAme = 'Add New';
                        HSDATA.btnclass = '';

                        HSDATA.btnId = 'FW';
                        HSDATA.des = 'A list of your shipping destinations where you able to deliver products. These locations are used by customers for check that product delivery from your store to there location is available or not.';


                        break;
                         case 'dashboard_products':

                        HSDATA.Title = 'Products';
                        HSDATA.btnNAme = 'Add New';
                        HSDATA.btnclass = '';
                        HSDATA.Dummybtn='<a href="javascript:void(0);" data-openbtn="dashboard" data-btnid="spf"  class="hide"></a><a href="javascript:void(0);" data-openbtn="dashboard" data-btnid="int"  class="hide"></a><a href="javascript:void(0);" data-openbtn="dashboard" data-btnid="opt"  class="hide"></a>';
                        HSDATA.btnId = 'FW';
                        HSDATA.des = 'A product is the item offered for sale. A product can be a service or an item. It can be physical or in virtual or cyber form.';


                        break;

                        case 'dashboard_orders':
                        HSDATA.Title = 'Orders';
                        HSDATA.btnNAme = 'Filter Orders';
                        HSDATA.btnclass = '';

                        HSDATA.btnId = 'FW';
                        HSDATA.des = 'Orders on your store.';

                        break;


                }
                ch += '<div class="block b_gtl b_grl b_gll  _bdy "><div class="block "><div class="left"><h3 style="margin-top: 3px;">' + HSDATA.Title + '</h3></div><div class="right"><a href="javascript:void(0);"  data-openbtn="dashboard" data-btnid="' + HSDATA.btnId + '"  data-junction="dashboardNew" class="btn btn-xs btn-primary ' + HSDATA.btnclass + '">' + HSDATA.btnNAme + '</a></div></div><div class="block "><p class="block _bdy fg_4 fs-italic fs11" >' + HSDATA.des + '</p></div>' + HSDATA.Dummybtn + '</div>';
               W.U.JunctionAdd(W.A.page.AppId, 'dashboardNew', function () {
                    this.Node.onclick = function () {
                     
          var newFrom=CreateForm.bind({  action: 'new' })();
 W.U.AddDom(W.U.id('FWblock'),newFrom,'html');
                    }

                }, {});

                return ch;

            }, //header strip
            F: {// stand form form and gives form by id
             
                deleteRow: function (x) {//x == this in on delete call back
                    console.log(x);
                    var ch = '<div class="block bg_white" style="max-width: 300px; margin: 35px auto 0 auto;"> <div class="block " > <div class="box m0"> <div class="box-header "><div class="box-name tt-c"><h3>Delete</h3></div> <div class="box-options po-re"></div></div> <div class="box-body"><form name="deshboardtabletrdelete"  onsubmit="return false;">  <div class="block ff_0 fs13 _bdy ">Do you really want to delete this item?.</div></div><div class="box-footer right"> <span><button type="button" class="btn _cbtn btn-xs min-btn"  data-junction="tdcelldeletesubmit' + x.data.id + '" >Yes</button></span><span><button type="button" class="btn _bbtn btn-xs min-btn" data-dismiss="modal" >No</button></span> </div> <div class="block" data-help="deshboardtabletrdelete">  </div > </div> </div> </div>';
                   W.U.JunctionAdd(W.A.page.AppId, 'tdcelldeletesubmit' + x.data.id, function () {

                        this.Node.onclick = Submit.Del.bind({ Node: this.Node, data: this.data });
                    }, { id: x.data.id });

                    return ch;


                }

            },
            D: {//default form data
                0: {
                    cN: ' default name',
                    parent: { id: '', cN: '' },
                    description: '',
                    cid: 0,
                    sid: 0

                },
                1: { un: 'User Name',
                    pw: '123456',
                    staffid: 0

                }
            }

        };
        /**
        * handle al  form submition
        */
        var Submit = {
          
            Del: function () { //tdcelldeletesubmit
            //    console.log(this);
                var delId = this.data.id;
                var form = 'deshboardtabletrdelete',
      f_value = { id: delId, AppId: wowrol.App.page.AppId },
      help = $('[data-help="' + form + '"]').get(0);

                var formData = {
                    form: form,
                    f_value: f_value
                };

                W.U.ajax({

                    url: W.U.GetPageURL('') + 'ajax/f0/p0',
                    data: formData,
                    context: this,
                    type: 'POST',
                    beforeSend: function () {
                        W.U.madianLoading("show");

                    },
                    success: function (data) {



                        var ret = JSON.parse(data);
                        if (ret.state == 500) {
                            W.U.madianLoading("hide");
                            var AlertError = wowrol.Modules.Main.AlertError({ message: ret.mistake.message });
                            Control.SetView.AddDom(help, AlertError, 'html');
                            W.U.alert();

                        }
                        if (ret.state == 200) {

                            $(W.U.id('appModal')).modal('hide');

                            W.U.madianLoading("hide");



                            deleteView(delId);
                            toggle_0();


                        }
                    }

                });

            }

        };




// call the function
 $(deshboardwalkway).on('update', function(event,data){
    updateView(data);
     toggle_0();

 });
  init(x);
 };

    



    W.U.deshboard = deshboard;


})(wowrol);
/*

*/