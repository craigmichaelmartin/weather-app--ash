define([
    "handlebars"
], function (Handlebars) {

    // Basic Usage
    // {{#compare 3 '>' 4}} Stuff {{/compare}}
    //
    // Advanced Usage
    // {{#compare object 'functionName' '>' object2 'functionName'}}
    // {{#compare 3 '>' object2 'functionName'}}
    // {{#compare object 'functionName' '>' 3}}
    Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {

        var operators;
        var result;

        if (arguments.length < 3) {
            throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
        }

        operators = {
            '==': function (l, r) {
                return l == r;
            },
            '===': function (l, r) {
                return l === r;
            },
            '!=': function (l, r) {
                return l != r;
            },
            '!==': function (l, r) {
                return l !== r;
            },
            '<': function (l, r) {
                return l < r;
            },
            '>': function (l, r) {
                return l > r;
            },
            '<=': function (l, r) {
                return l <= r;
            },
            '>=': function (l, r) {
                return l >= r;
            },
            'typeof': function (l, r) {
                return typeof l == r;
            }
        };

        if (arguments.length > 5) {
            // {{#compare object 'functionName' '>' object2 'functionName'}}
            lvalue = lvalue[arguments[1]].apply(lvalue);
            operator = arguments[2];
            rvalue = rvalue[arguments[4]].apply(rvalue);
            options = arguments[5];
        } else if (arguments.length > 4) {
            if (arguments[1] in operators) {
                // {{#compare 3 '>' object2 'functionName'}}
                rvalue = rvalue[arguments[3]].apply(rvalue);
            } else if (arguments[2] in operators) {
                // {{#compare object 'functionName' '>' 3}}
                lvalue = lvalue[arguments[1]].apply(lvalue);
                operator = arguments[2];
                rvalue = arguments[3];
            }
            options = arguments[4];
        }

        if (!operators[operator]) {
            throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
        }

        result = operators[operator](lvalue, rvalue);

        if (result) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper('round', function (number, decimals) {
        return Number((Math.round(number + "e" + decimals)  + "e-" + decimals));
    });

    // Parse a string into a date object with this
    Handlebars.registerHelper("dateParse", function (date, format) {
        return Date.parse(date).toString(format);
    });

    // Format a date object into a string with this
    // {{#formatDate theDate 'M/d/yy'}}
    Handlebars.registerHelper("formatDate", function (date, format) {
        if (format ===  void 0) {
            format = 'M/d/yy';
        }

        if (typeof (date) === 'string') {
            date = (new Date(date));
        }
        return date.toString(format);
    });

    // {{#or false true}} Stuff {{/or}}
    Handlebars.registerHelper('or', function (val, val2, options) {
        if (val || val2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper('select', function (value, options) {
        var $el = $('<select />').html(options.fn(this));
        $el.find('[value=' + value + ']').attr({
            'selected': 'selected'
        });
        return $el.html();
    });

    // Handlebars doesn't like to be able to execute methods... screw that,
    // here ya go.
    // For example:
    //     {{ call someObject "someMethod" [arg1, arg2] }}
    // Is equivalent to:
    //     someObject.someMethod(arg1, arg2)
    Handlebars.registerHelper("call", function (object, fnName) {
        var args = arguments;
        if (!_.isArray(args)) {
            args = [args];
        }
        return object[fnName].apply(object, args);
    });

    // Optionally truncate long text responsibily and append '...more' if so
    // {{truncate 'yolo forever' 8}} -> 'yolo ...more'
    // {{truncate 'yolo forever' 8 false true true}} -> 'yolo fo'
    Handlebars.registerHelper("truncate", function (text, len, pass, dumb, hard) {
        pass = pass === true ? true : false;
        dumb = dumb === true ? true : false;
        hard = hard === true ? true : false;
        if (text.length > len && !pass) {
            text = text.substr(0, len - 1);
            if (!dumb) {
                text = text.substr(0, text.lastIndexOf(' '));
            }
            if (!hard) {
                text += '<span class="truncated-more-label">...</span>';
            }
        }
        return new Handlebars.SafeString(text);
    });

    // {{#eq 1 1}} 1 equals 1! Hooray! {{/eq}}
    Handlebars.registerHelper('eq', function (val, val2, options) {
        if (val === val2) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper('endList', function (index, obj, options) {
        var last = _.size(obj) - 1;
        if (index === last) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // {{#stripNonDigits '440-286-7120'}} -> '4402867120'
    Handlebars.registerHelper("stripNonDigits", function (text) {
        return text.replace(/\D/g, '');
    });

    // {{#add 1 1}} -> '2'
    Handlebars.registerHelper("add", function (num, delta) {
        return num + delta;
    });

    // {{#ifCond var1 '==' var2}}
    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });

    Handlebars.registerHelper("debugger", function () {
        debugger;
    });

    return Handlebars;

});
