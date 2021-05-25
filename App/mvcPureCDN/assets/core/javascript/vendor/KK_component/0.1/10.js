/*
@des - directive kk-repeat
*/

;RagisterDirective('kk-repeat', function (Node, Expression, id, context) {
    Node.removeAttribute('kk-repeat');
    var ParentNode = Node.parentNode;
    var Template = ParentNode.innerHTML;


    context.To_updateList.push(new RepeatDirective(ParentNode, Expression, ParentNode.kkid, context, Template));
    W.U.Setview('', Node, 'remove');
});