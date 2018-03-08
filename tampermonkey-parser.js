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

var RAL = {}, count = 0;

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function add_row_to_list($elem, i) {

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
    
    var hex = rgb2hex($($elem[1]).css("backgroundColor"));
    var german_name = data[i][1];
    var english_name = data[i][2];
    var french_name = data[i][3];
    var spanish_name = data[i][4];
    var italian_name = data[i][5];
    var dutch_name = data[i][6];

    RAL[code] = {
        'code' : code,
        'hex' : hex,
        'german_name':german_name,
        'english_name' : english_name,
        'french_name':french_name,
        'spanish_name':spanish_name,
        'italian_name':italian_name,
        'dutch_name':dutch_name
    };

    count++;
}

$(document).ready(function() {

    var row_list = $('div.Section1 table.MsoNormalTable').find('tr').get(),
        i = 0, target_elem;

    for (i = 10; i < row_list.length - 7; i++) {

        target_elem = $(row_list[i]).children('td');

        if (target_elem.length && target_elem[0].tagName == 'TD') {
            if (target_elem.length > 7 && target_elem.length < 12) {
                add_row_to_list(target_elem, i);
            }
        }
    }
    console.log(count);
    console.log(RAL);
    console.log(JSON.stringify(RAL));
});
})();
