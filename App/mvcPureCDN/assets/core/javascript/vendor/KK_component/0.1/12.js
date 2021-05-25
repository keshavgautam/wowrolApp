/*
@des - directive kk-submit
*/
;RagisterDirective('kk-submit', function (Node, value, id) {
    var _this = this;
    // debugger;

    EventListener.listen(Node, 'submit', function (e) {
        e.preventDefault();

        var fn = FindfunctionOFAttrValue.bind(_this.data)(value, _this);
        fn.bind(_this.data).call(this, e);


        return false;
    });

});