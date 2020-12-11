$.fn.forceNumericOnly = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            // Разрешаем backspace, tab, delete, стрелки, обычные цифры и цифры на дополнительной клавиатуре
            var v = $(this).val();
            if (key >= 48 && key <= 57) {
                if (v && v === '0') {
                    if (key === 48) {
                        return false;
                    } else {
                        $(this).val('');
                    }
                }
            } else if (key === 8 ||
                key === 9 ||
                key === 46 ||
                (key >= 37 && key <= 40) ||
                (key >= 96 && key <= 105)) {

                if (v && v.length === 1) {
                    if (v === '0') {
                        return false;
                    } else {
                        $(this).val('0');
                        return false;
                    }
                }
            } else {
                return false;
            }
        });
    });
};

function initTooltip() {
    tippy('.rcg-tooltip', {
        arrow: true,
        animation: 'shift-away',
        theme: 'light',
        zIndex: 99999
    });
}

function showTooltip(selector) {
    tippy(selector, {
        arrow: true,
        animation: 'shift-away',
        theme: 'light',
        zIndex: 99999,
        flip: false,
        hideOnClick: true,
        popperOptions: {
            modifiers: {
                preventOverflow: {
                    enabled: false
                }
            }
        }
    });
    var target = document.querySelector(selector);
    if (target) {
        var tInstance = target._tippy;
        if (tInstance) tInstance.show();
    }
}

function destroyTooltip(selector) {
    var target = document.querySelector(selector);
    if (target) {
        var tInstance = target._tippy;
        if (tInstance) tInstance.destroy();
    }
}

/*function initTooltip() {
    var elements = $('.rcg-h-tooltip-wrapper');
    $.each(elements, function (k, v) {
        var _self = $(v);
        var size = _self.data('size');
        var theme = _self.data('theme');
        var title = _self.data('title');
        var active = _self.data('active');

        var tool = $('<div/>', {
            class: 'rcg-h-tooltip',
            text: title,
            'data-size': size,
            'data-theme': theme
        });

        if (active && active === '1') {
            tool.addClass('rcg-h-tooltip-active');
        }
        _self.append(tool);
    });
}*/

