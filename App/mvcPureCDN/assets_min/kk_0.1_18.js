/*
@des - directive all None kk-getNode
*/

;RagisterDirective('kk-getnode', function (Node, Expression, id, context) {

   

    var Exp_data = ParseExpression(Expression);
    var path = CreateVariblePath(Exp_data);
    var opk = FindPathValue(path, context.data); ;
    if (opk != null) {
        SetPathValue(context.data, path, Node);
    }

});

/*
@des - directive all None kk-getNode
*/

;RagisterDirective('kk-node', function (Node, Expression, id, context) {



    var Exp_data = ParseExpression(Expression);
    var path = CreateVariblePath(Exp_data);
    if (isString(path)) {
        context.data[path] = Node;
       
    }



});