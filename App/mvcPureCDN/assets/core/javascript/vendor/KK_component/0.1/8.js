/*
@des - directive click
*/
;RagisterDirective('kk-click', function (Node, value, id, context) {
    var _this = this;
  
    if (isOK(Node)) {
        EventListener.listen(Node, 'click', function (e) {
            e.preventDefault();
            var fn = FindfunctionOFAttrValue.bind(_this.data)(value, _this);
            fn.bind(_this.data).call(this, e);


        });
    }

});