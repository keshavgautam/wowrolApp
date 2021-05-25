/*
@des - directive all None kk Attribute
*/

;RagisterDirective('none-kkattr', function (Node,attribute ,Expression, id, context) {
    var match = Expression.match(braketMatch);
    var start=Expression.substring(0, 2); 
    var end=Expression.substring((Expression.length - 2), Expression.length); 
    if (isOK(match)) {
   
        context.To_updateList.push(new NoneKKAttrDirective(Node,attribute, Expression, id, context));
    }

});