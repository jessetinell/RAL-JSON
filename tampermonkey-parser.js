// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://en.wikipedia.org/wiki/List_of_RAL_colors
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

    $(document).ready(function() {

        var tables = $('.wikitable');
        var codes = [];

        $.each(tables,(i,table) => {

            var rows = $(table).find('tbody tr');
            var groupName = $(table).prev().find('.mw-headline').text();
            var codeGroup = [];

            $.each(rows, (i, row) => {
                var td = $(row).find('td');
                var code = $(td[0]).text().split(' ')[1];

                if(!code) return;

                codeGroup.push({
                    'code' : code,
                    'hex' : rgb2hex($(td[1]).css("backgroundColor")),
                    'german_name':$(td[5]).text(),
                    'english_name' : $(td[6]).text()
                });
            });

            codes.push({ name: groupName, codes: codeGroup });

        });

        // console.log(codes.length);
        // console.log(codes);
        console.log(JSON.stringify(codes));

    });
})();
