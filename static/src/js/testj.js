odoo.define('bare_minimum.new', function (require) {
    "use strict";
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var rpc = require('web.rpc');



    function foo(){

//        days calc
        rpc.query({
            model: 'library.book',
            method: 'd_w_m_calc',
            args: ["day"],
        }).then(function (result) {
        console.log(result)
        var last_id=window.localStorage.getItem('transaction_idss');
        try{
            if (Number(result[1][0]['last_id']) !== Number(last_id)){
                window.localStorage.setItem('transaction_idss',result[1][0]['last_id']);


                modal.style.display = "block";


            }
        }catch(error){}


        try {
            document.getElementById("d_calc_id1").innerHTML = result[0];
            document.getElementById("d_calc_id2").innerHTML = result[0];
                    rpc.query({
                    model: 'library.book',
                    method: 'style_func',
                    args: [result[0],100000],
                }).then(function (result) {
                    document.getElementById('days_style').style = result;


                })

            document.getElementById("days_first_placer_name").innerHTML = result[1][0]["agent_name"];
            document.getElementById("days_first_placer_team").innerHTML = result[1][0]["team"];
            document.getElementById("days_first_placer_depo").innerHTML = result[1][0]["amount"];


            document.getElementById("days_second_placer_name").innerHTML = result[1][1]["agent_name"];
            document.getElementById("days_second_placer_team").innerHTML = result[1][1]["team"];
            document.getElementById("days_second_placer_depo").innerHTML = result[1][1]["amount"];


            document.getElementById("days_third_placer_name").innerHTML = result[1][2]["agent_name"];
            document.getElementById("days_third_placer_team").innerHTML = result[1][2]["team"];
            document.getElementById("days_third_placer_depo").innerHTML = result[1][2]["amount"];



            document.getElementById("days_fourth_placer_name").innerHTML = result[1][3]["agent_name"];
            document.getElementById("days_fourth_placer_team").innerHTML = result[1][3]["team"];
            document.getElementById("days_fourth_placer_depo").innerHTML = result[1][3]["amount"];

            document.getElementById("days_fifth_placer_name").innerHTML = result[1][4]["agent_name"];
            document.getElementById("days_fifth_placer_team").innerHTML = result[1][4]["team"];
            document.getElementById("days_fifth_placer_depo").innerHTML = result[1][4]["amount"];
            } catch (error) {
            }
        })






//        week calc
        rpc.query({
            model: 'library.book',
            method: 'd_w_m_calc',
            args: ["week"],
        }).then(function (result) {

        try {

            document.getElementById("w_calc_id1").innerHTML = result[0];
            document.getElementById("w_calc_id2").innerHTML = result[0];
                    rpc.query({
                    model: 'library.book',
                    method: 'style_func',
                    args: [result[0],700000],
                }).then(function (result) {
                    document.getElementById('weeks_style').style = result;


                })
            document.getElementById("w_calc_id1").innerHTML = result[0];
            document.getElementById("w_calc_id2").innerHTML = result[0];
            document.getElementById("weeks_first_placer_name").innerHTML = result[1][0]["agent_name"];
            document.getElementById("weeks_first_placer_team").innerHTML = result[1][0]["team"];
            document.getElementById("weeks_first_placer_depo").innerHTML = result[1][0]["amount"];
            document.getElementById("weeks_second_placer_name").innerHTML = result[1][1]["agent_name"];
            document.getElementById("weeks_second_placer_team").innerHTML = result[1][1]["team"];
            document.getElementById("weeks_second_placer_depo").innerHTML = result[1][1]["amount"];
            document.getElementById("weeks_third_placer_name").innerHTML = result[1][2]["agent_name"];
            document.getElementById("weeks_third_placer_team").innerHTML = result[1][2]["team"];
            document.getElementById("weeks_third_placer_depo").innerHTML = result[1][2]["amount"];
            document.getElementById("weeks_fourth_placer_name").innerHTML = result[1][3]["agent_name"];
            document.getElementById("weeks_fourth_placer_team").innerHTML = result[1][3]["team"];
            document.getElementById("weeks_fourth_placer_depo").innerHTML = result[1][3]["amount"];
            document.getElementById("weeks_fifth_placer_name").innerHTML = result[1][4]["agent_name"];
            document.getElementById("weeks_fifth_placer_team").innerHTML = result[1][4]["team"];
            document.getElementById("weeks_fifth_placer_depo").innerHTML = result[1][4]["amount"];
            } catch (error) {}



        })



//        month calc
        rpc.query({
            model: 'library.book',
            method: 'd_w_m_calc',
            args: ["month"],
        }).then(function (result) {


        try {
            document.getElementById("m_calc_id1").innerHTML = result[0];
            document.getElementById("m_calc_id2").innerHTML = result[0];
                    rpc.query({
                    model: 'library.book',
                    method: 'style_func',
                    args: [result[0],2800000],
                }).then(function (result) {
                    document.getElementById('months_style').style = result;


                })
            document.getElementById("m_calc_id1").innerHTML = result[0];
            document.getElementById("m_calc_id2").innerHTML = result[0];
            document.getElementById("months_first_placer_name").innerHTML = result[1][0]["agent_name"];
            document.getElementById("months_first_placer_team").innerHTML = result[1][0]["team"];
            document.getElementById("months_first_placer_depo").innerHTML = result[1][0]["amount"];
            document.getElementById("months_second_placer_name").innerHTML = result[1][1]["agent_name"];
            document.getElementById("months_second_placer_team").innerHTML = result[1][1]["team"];
            document.getElementById("months_second_placer_depo").innerHTML = result[1][1]["amount"];
            document.getElementById("months_third_placer_name").innerHTML = result[1][2]["agent_name"];
            document.getElementById("months_third_placer_team").innerHTML = result[1][2]["team"];
            document.getElementById("months_third_placer_depo").innerHTML = result[1][2]["amount"];
            document.getElementById("months_fourth_placer_name").innerHTML = result[1][3]["agent_name"];
            document.getElementById("months_fourth_placer_team").innerHTML = result[1][3]["team"];
            document.getElementById("months_fourth_placer_depo").innerHTML = result[1][3]["amount"];
            document.getElementById("months_fifth_placer_name").innerHTML = result[1][4]["agent_name"];
            document.getElementById("months_fifth_placer_team").innerHTML = result[1][4]["team"];
            document.getElementById("months_fifth_placer_depo").innerHTML = result[1][4]["amount"];
            } catch (error) {}


        })
         }


    var MyClientAction = AbstractAction.extend({
        contentTemplate: 'testx',

    start: function () {
          setInterval(function() {
              foo()
              }, 5000);
    },
    });
    core.action_registry.add('bare_minimum', MyClientAction);
    return MyClientAction

});
