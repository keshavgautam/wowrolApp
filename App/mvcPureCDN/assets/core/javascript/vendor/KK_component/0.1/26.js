/*
*
*/

function SwitchDirective(Node, Expression, id, context, Template) { 
    this.Node = Node;
    this.Expression = Expression;
    this.context = context;
    this.id = id;
    this.caseToken = {};
    this.activeOption = 'default';
    this.CreateCaseObject();

    

}
SwitchDirective.prototype = {
    CreateCaseObject: function () {

        this.caseBlock = this.Node.childNodes;
        var attrName = ['kk-switch-when', 'kk-switch-default', 'kk-switch-when-separator'];
        for (var q = 0; q < this.caseBlock.length; q++) {
            var dataAttrsToDelete = [];
            var caseItem = this.caseBlock[q];
            var dataAttrs = caseItem.attributes;
            if (W.U.isOK(dataAttrs)) {
                for (var a = 0; a < dataAttrs.length; a++) {
                    if (W.U.isOK(dataAttrs[a])) {
                        if (W.U.iskeyInArray(dataAttrs[a].name, attrName)) {
                            switch (dataAttrs[a].name) {
                                case 'kk-switch-when':

                                    var seprater = caseItem.getAttribute('kk-switch-when-separator');
                                    if (isOK(seprater)) {
                                        var found_case_in_split = dataAttrs[a].value.split(seprater);
                                        if (isOK(found_case_in_split)) {
                                            for (var b in found_case_in_split) {
                                                if (isOK(found_case_in_split[b])) {
                                                    this.caseToken[found_case_in_split[b]] = q;
                                                }

                                            }

                                        }


                                    } else {
                                        this.caseToken[dataAttrs[a].value] = q;
                                    }


                                    break;
                                case 'kk-switch-default':
                                    this.caseToken['default'] = q;
                                    break;
                            }

                    dataAttrsToDelete.push(dataAttrs[a].name);

                        }

                    }

                }


                for (var q in dataAttrsToDelete) {

                    if (caseItem.nodeType != NODE_TYPE_TEXT) {

                        caseItem.removeAttribute(dataAttrsToDelete[q]);
                    }

                }

            }
        }

        for (var q in this.caseToken) {
            this.hide(q);
        }

    },

    init: function () {
        var Exp_data = ParseExpression(this.Expression);
        var path = CreateVariblePath(Exp_data);
        var opk = FindPathValue(path, this.context.data);
        var OneMatch = false;
        if (this.activeOption != opk) {


            for (var q in this.caseToken) {
                this.hide(q);
            }

            for (var q in this.caseToken) {
                var item = this.caseBlock[this.caseToken[q]];
                if (isOK(item)) {
                    if (q == opk) {

                        if (this.show(q)) {
                            OneMatch = true;
                            this.activeOption = q;
                        }

                    }
                }

            }


            if (!OneMatch) {
                this.activeOption = 'default';
                this.show('default');
            }

        }
    },

    UpdateView: function (context) {

        this.context = context;
        this.init();


    },

    show: function (option) {
        var ret = false;
        var _default = this.caseToken[option];
        if (isOK(_default)) {

            var item = this.caseBlock[_default];
            if (isOK(item)) {
                $(item).removeClass('hide');//.addClass('block')
                ret = true;
            }
        }
        return ret;
    },

    hide: function (option) {
        var _default = this.caseToken[option];
        if (isOK(_default)) {

            var item = this.caseBlock[_default];
            if (isOK(item)) {
                $(item).addClass('hide');//.removeClass('block')
            }
        }
    }



}