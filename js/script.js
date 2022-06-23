/*
File: script.js
GUI Assignment 4: Using the jQuery Plugin/UI with Your Dynamic Table
Tim Truong, UMass Lowell Computer Science, tim_truong1@student.uml.edu
Copyright (c) 2022 by Tim Truong. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Updated on 6/22/22 at 11:30pm.
Instructor: Professor Wenjin Zhou
Sources of Help: W3Schools and Stackoverflow
Brief Overview: The site is a continuation from hw 3's dynamic multiplication table where we add and implement
new features to our program which are sliders and user validation
that comes from the jQuery ui and validation library respectively.
Additionally, in this assignment we will also be allowing tabs where users can save their multiplication tables
as references.
*/

let tabCounter = 1;
let del_btn = document.getElementById("destroy-btn");

$(document).ready(function() {
    slider_widget(); // Call the slider here so that when the program boots up, the slider should appear already for user
    check(); // Added check() function so that the jQuery validation still works even if user has not submitted
    $("#box").css('height', 'auto'); // Added this css method to make form container more flexible
    document.getElementById('myForm').addEventListener("submit", function(event) {
        console.log("Submitted");
        event.preventDefault();
        check();
    });
});

/*  Very helpful stackoverflow link to delete all the tabs.
    Credit -> https://stackoverflow.com/questions/721927/empty-jquery-ui-tabs
    I based this function on one of the possible solutions */
// Created a delete all tabs function so that when user clicks
function destroyTabs() {
    del_btn.style.display = "none";
    let tabs = $("#myTabs").tabs();
    $('#myTabs table').remove();
    $('#myTabs li').remove();
    tabs.tabs("destroy");
    tabs.tabs("refresh");
}

function addTabs() {
    let tabs = $("#myTabs").tabs();
    del_btn.style.display = "block";

    let minColVal = Number(document.getElementById("min_cVal").value);
    let maxColVal = Number(document.getElementById("max_cVal").value);
    let minRowVal = Number(document.getElementById("min_rVal").value);
    let maxRowVal = Number(document.getElementById("max_rVal").value);

    let tab_title = "<li><a href='#tab" + tabCounter + "'>" +
    minRowVal + " to " + maxRowVal + " by " + minColVal + " to " +
    maxColVal + " Mult Table </a>" + "<span class='ui-icon ui-icon-close' role='presentation'></span>" + "</li>";

    tabs.find(".ui-tabs-nav").append(tab_title);
    tabs.append('<table id="tab' + tabCounter +'">' +  $('#Multiplication-Table').html() + '</table>');
    tabs.tabs("refresh");

    tabs.tabs("option", "active", -1);
    // Credit to this link on helping partially build my addTabs() function
    // -> https://jqueryui.com/tabs/#manipulation
    // Part of the code here is built or inspired from this, replaced some stuff to match the things
    // I needed to make my program work as intended. This also includes some code above these comments.
    tabs.on("click", "span.ui-icon-close", function() {
        let IDNum = $(this).closest("li").remove().attr("aria-controls");
        $("#" + IDNum).remove();
        tabs.tabs("refresh");

        // Credit to this stackoverflow link on helping me destroy the tab container when all the tabs are gone
        // -> https://stackoverflow.com/questions/19035607/how-to-destroy-all-elements-with-jquery-ui-tabs
        if ($('#myTabs ul li').length == 0) {
            tabs.tabs("destroy");
            del_btn.style.display = "none";
        }
    });

    tabCounter++;
}

/*  Function to create sliders for each value input.
    Credit to this stackoverflow link to help me bind the sliders with the input boxes
    so that the values from both of them change when users slides the handle or reinputs a new value.
    -> https://stackoverflow.com/questions/7523864/ui-slider-with-text-box-input
*/
/*  And for each sliders, set the range to be [-300, 300] */
function slider_widget() {
    $("#sliderMinCol").slider({
        min: -300,
        max: 300,
        step: 1,
        slide: function (e, ui) {
            $("#min_cVal").val(ui.value);
        }
    });
    $("#min_cVal").change(function() {
        let value = this.value;
        $("#sliderMinCol").slider("value", parseInt(value));
    });
    $("#sliderMaxCol").slider({
        min: -300,
        max: 300,
        step: 1,
        slide: function (e, ui) {
            $("#max_cVal").val(ui.value);
        }
    });
    $("#max_cVal").change(function() {
        let value = this.value;
        $("#sliderMaxCol").slider("value", parseInt(value));
    });
    $("#sliderMinRow").slider({
        min: -300,
        max: 300,
        step: 1,
        slide: function (e, ui) {
            $("#min_rVal").val(ui.value);
        }
    });
    $("#min_rVal").change(function() {
        let value = this.value;
        $("#sliderMinRow").slider("value", parseInt(value));
    });
    $("#sliderMaxRow").slider({
        min: -300,
        max: 300,
        step: 1,
        slide: function (e, ui) {
            $("#max_rVal").val(ui.value);
        }
    });
    $("#max_rVal").change(function() {
        let value = this.value;
        $("#sliderMaxRow").slider("value", parseInt(value));
    });

}

function check() { // Checks if all of the user's inputs are valid before making the multiplication table
    // Added new check methods to see if max col and row values are larger than their min counterparts
    // Also added new check methods to see if any of the inputs are decimals are not and if they are we do not
    // allow it.
    // Credit to this stackoverflow link to helping how to create my own .addMethod().
    // -> https://stackoverflow.com/questions/14347177/how-can-i-validate-that-the-max-field-is-greater-than-the-min-field
    // Also credit to this jQuery validation link to helping understand some new concepts and functions.
    // -> https://jqueryvalidation.org/documentation/
    $.validator.addMethod("greaterThan_Col", function () {
        let min_c_val = Number(document.getElementById("min_cVal").value);
        let max_c_val = Number(document.getElementById("max_cVal").value);
        return max_c_val >= min_c_val;
    }, "Max column value must be greater than or equal to min.");
    $.validator.addMethod("greaterThan_Row", function () {
        let min_r_val = Number(document.getElementById("min_rVal").value);
        let max_r_val = Number(document.getElementById("max_rVal").value);
        return max_r_val >= min_r_val;
    }, "Max row value must be greater than or equal to min.");
    $.validator.addMethod("isMinCVal_decimal", function () {
        let min_cval = Number(document.getElementById("min_cVal").value);
        if (min_cval % 1 === 0) {
            return true;
        } else {
            return false;
        }
    }, "Error: Min Column Value must be an integer.");
    $.validator.addMethod("isMaxCVal_decimal", function () {
        let max_cval = Number(document.getElementById("max_cVal").value);
        if (max_cval % 1 === 0) {
            return true;
        } else {
            return false;
        }
    }, "Error: Max Column Value must be an integer.");
    $.validator.addMethod("isMinRVal_decimal", function () {
        let min_rval = Number(document.getElementById("min_rVal").value);
        if (min_rval % 1 === 0) {
            return true;
        } else {
            return false;
        }
    }, "Error: Min Row Value must be an integer.");
    $.validator.addMethod("isMaxRVal_decimal", function () {
        let max_rval = Number(document.getElementById("max_rVal").value);
        if (max_rval % 1 === 0) {
            return true;
        } else {
            return false;
        }
    }, "Error: Max Row Value must be an integer.");
    $('#myForm').validate({
        errorClass: "msg-error", // set the error messages to this custom particular class I made.
        rules: { // All the rules for each input box and it pretty much checks if the input is a number,
            min_cInput: { // checks if its in range between -300 and 300, checks if its a decimal or not, and..
                number: true, // checks if there is input at all.
                range: [-300, 300],
                isMinCVal_decimal: true, // if its not a decimal, we are good.
                required: true
            },
            max_cInput: {
                number: true,
                range: [-300, 300],
                greaterThan_Col: '#min_cInput',
                isMaxCVal_decimal: true,
                required: true
            }, 
            min_rInput: {
                number: true,
                range: [-300, 300],
                isMinRVal_decimal: true,
                required: true
            },
            max_rInput: {
                number: true,
                range: [-300, 300],
                greaterThan_Row: '#min_rInput',
                isMaxRVal_decimal: true,
                required: true
            }
        },
        messages: { // All the custom error messages for each input box
            min_cInput: {
                number: "Error: Input has to be a valid number.",
                range: "Error: Number is out of range, please input a number between -300 and 300 inclusively.",
                required: "Required: Please input a valid number between -300 and 300 inclusively."
            },
            max_cInput: {
                number: "Error: Input has to be a valid number.",
                range: "Error: Number is out of range, please input a number between -300 and 300 inclusively.",
                required: "Required: Please input a valid number between -300 and 300 inclusively."
            },
            min_rInput: {
                number: "Error: Input has to be a valid number.",
                range: "Error: Number is out of range, please input a number between -300 and 300 inclusively.",
                required: "Required: Please input a valid number between -300 and 300 inclusively."
            },
            max_rInput: {
                number: "Error: Input has to be a valid number.",
                range: "Error: Number is out of range, please input a number between -300 and 300 inclusively.",
                required: "Required: Please input a valid number between -300 and 300 inclusively."
            }
        },
        submitHandler: function() { // If submission was valid, we make the table visible and generate it based 
            let output = document.getElementById('tab'); // on input.
            output.style.display = "block";
            mult_table();
            return false;
        }, // If submission was invalid, we make the table not visible along with scroll bar.
        invalidHandler: function() {
            let scroll = document.getElementById('tab');
            scroll.style.display = "none";
            $("#Multiplication-Table").empty();
            $("#box").css('height', 'auto');
        },
    });
}

// function to build/generate table
function mult_table() {
    let min_c_val = Number(document.getElementById("min_cVal").value);
    let max_c_val = Number(document.getElementById("max_cVal").value);
    let min_r_val = Number(document.getElementById("min_rVal").value);
    let max_r_val = Number(document.getElementById("max_rVal").value);

    console.log("min_c_val = ", min_c_val,
    " max_c_val = ", max_c_val, " min_r_val = ", min_r_val, " max_r_val = ", max_r_val);

    // Should always enter this condition, if it does not we console.log("Smth").
    if ((max_r_val >= min_r_val) && (max_c_val >= min_c_val)) {
        const tr = '<tr>';
        const tr_end = '</tr>';
        const td = '<td>';
        const td_end = '</td>';
        const th = '<th>';
        const th_end = '</th>';
        let table_stuff = tr + th + th_end;

        // Builds the top header or row
        for (let i = min_r_val; i <= max_r_val; i++) {
            table_stuff += th + i + th_end;
        }

        // Builds the rest of rows and data
        for (let i = min_c_val; i <= max_c_val; i++) {
            // Outer loop builds the side header or first column header
            table_stuff += tr + th + i + th_end;
            // Inner loop builds the rest of the table cells
            for (let j = min_r_val; j <= max_r_val; j++) {
                let result = i * j;
                table_stuff += td + result + td_end;
            }
            table_stuff += tr_end;
        }
        // Credit to this link from w3schools -> https://www.w3schools.com/jquery/html_html.asp
        $('#Multiplication-Table').html(table_stuff); // Used this instead of .innerHTML
        // let table = document.getElementById("Multiplication-Table");
        // table.innerHTML = table_stuff; // Tried table.innerHTML, made very wacky changes to my css so
        // I used a jQuery version of innerHTML that I messed around with as shown above.
        addTabs();
        return false;
    } else {
        console.log("Something went wrong");
        return false;
    }
}