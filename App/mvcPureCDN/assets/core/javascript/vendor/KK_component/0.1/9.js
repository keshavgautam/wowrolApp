/*
@des - directive input
*/
;RagisterDirective('kk-input', function (Node, value, id) {
    var _this = this;

    EventListener.listen(Node, 'input', FindfunctionOFAttrValue.bind(this.data)(value, this));

});