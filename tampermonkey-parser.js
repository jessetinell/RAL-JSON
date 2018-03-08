// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.ralcolor.com/
// @grant        none
// @require http://code.jquery.com/jquery-1.12.4.min.js
// ==/UserScript==

(function() {
    'use strict';

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function getCode($elem, i) {

    var code, data = [];

    data[i] = [];

    $elem.each(function() {
        var txt = $(this).html().replace(/<[^>]*>/g, '');
        txt = txt.replace(/\s+/g, ' ').trim();
        txt = txt.replace(/&nbsp;/g, ' ').trim();
        if (txt.length == 0) return ;
        data[i].push(txt);
    });

    if (data[i].length == 0) return;

    code = data[i][0].split(' ')[1];

    if(!code)
        return;
    
    var hex = rgb2hex($($elem[1]).css("backgroundColor"));
    var german_name = data[i][1];
    var english_name = data[i][2];
    var french_name = data[i][3];
    var spanish_name = data[i][4];
    var italian_name = data[i][5];
    var dutch_name = data[i][6];

    return {
        'code' : code,
        'hex' : hex,
        'german_name':german_name,
        'english_name' : english_name,
        'french_name':french_name,
        'spanish_name':spanish_name,
        'italian_name':italian_name,
        'dutch_name':dutch_name
    };
}

$(document).ready(function() {

    var row_list = $('div.Section1 table.MsoNormalTable').find('tr').get(),
        i = 0, target_elem;

    var codes = [];

    for (i = 10; i < row_list.length - 7; i++) {

        target_elem = $(row_list[i]).children('td');
console.log($(target_elem[1]).text())
        if (target_elem.length && target_elem[0].tagName == 'TD') {
            if (target_elem.length > 7 && target_elem.length < 12) {

                var code = getCode(target_elem, i);
                //console.log(code)
                if(code)
                    codes.push(code);

            }
        }
    }

    console.log(codes.length);
    console.log(codes);
    console.log(JSON.stringify(codes));

});
})();
