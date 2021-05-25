
var DirectiveNameArr = [];
var Directive = {};

/*
@des RagisterDirective
*/
function RagisterDirective(name,fn) {
    DirectiveNameArr.push(name);
    Directive[name] = fn;

}
