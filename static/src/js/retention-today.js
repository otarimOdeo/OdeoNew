odoo.define('bare_minimum.new', function(require) {
    "use strict";
    var AbstractAction = require('web.AbstractAction');
    var core = require('web.core');
    var rpc = require('web.rpc');
    var chart_array=[];
    var hours =0;
    var mins =0;
    var seconds =0;
    var agent_target = 40000;
    var daily_target = 100000;
    window.localStorage.setItem('daily_goal',0);




    function foo() {

        //Charts
        rpc.query({
            model: 'library.book',
            method: 'today_calculations',
            args: [],
        }).then(function(result) {
            var name_array=[]
            var amount_array=[]

            result[1].forEach(element => name_array.push(element['agent_name']));
            result[1].forEach(element => amount_array.push(element['amount']));



            try{
            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: name_array,
                    datasets: [{
                        label: '# of Votes',
                        data: amount_array,
                        backgroundColor: [
                            '#6B73CA'
                        ],
                        borderColor: [
                            '#6B73CA'
                        ],
                        borderWidth: 1,
                        borderRadius: 200
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            chart_array.push(myChart)
            }catch(error){}


            try{
            var last_id=window.localStorage.getItem('transaction_idss');
            if (Number(result[1][0]['last_id']) !== Number(last_id)){

                window.localStorage.setItem('length_of_array',name_array.length);
                try{
                chart_array[chart_array.length-1].destroy();
                console.log("destroeied")
                }catch(error){}
                var ctx = document.getElementById('myChart');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: name_array,
                        datasets: [{
                            label: '# of Votes',
                            data: amount_array,
                            backgroundColor: [
                                '#6B73CA'
                            ],
                            borderColor: [
                                '#6B73CA'
                            ],
                            borderWidth: 1,
                            borderRadius: 200
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                //We need to append every chart into list to destroy the last and draw a new one
                chart_array.push(myChart)


            }
            }catch(error){}
            });




        //Firework
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        var sound_applause = new Audio('bare_minimum/static/src/sounds/applause.mp3');
        var sound_fanfare = new Audio('bare_minimum/static/src/sounds/fanfare.mp3');
        span.onclick = function() {
          modal.style.display = "none";
        }
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }



        //Days Calc
        rpc.query({
            model: 'library.book',
            method: 'today_calculations',
            args: [],
        }).then(function(result) {
            try{
                var last_id=window.localStorage.getItem('transaction_idss');

                if (Number(result[1][0]['last_id']) !== Number(last_id)){
                    window.localStorage.setItem('transaction_idss',result[1][0]['last_id']);
                    modal.style.display = "block";
                    sound_applause.play();


                    setTimeout(function() {
                        document.getElementById('myModal').setAttribute("style", "display:none")
                        sound_applause.pause()
                    }, 5000);


                    if (hours==0 && mins ==0 && seconds == 0){
                        since_last_deposit()
                    }
                    else{
                          hours =0;      mins =0;      seconds =0;
                          $('#hours').html('00:');
                          $('#mins').html('00:');
                          $('#seconds').html('00');
                    }
                }
            }catch(error){}





            try {

                document.getElementById("d_calc_id1").innerHTML = result[0];

//                document.getElementById("remain_to_goal").innerHTML = ((daily_target - result[0]) > 0 )?  (daily_target - result[0]): 0;
                if ((daily_target - result[0]) > 0) {
                    document.getElementById("remain_to_goal").innerHTML =(daily_target - result[0])
                }

                if ( (daily_target - result[0]) < 0  &&  window.localStorage.getItem('daily_goal') == 0)

                {
                    document.getElementById("firework_title").innerHTML ="We have reached our goal!!!"
                    document.getElementById("remain_to_goal").innerHTML =(result[0] - daily_target);
                    document.getElementById("remain_to_goal").style.color = "green";
                    modal.style.display = "block";
                    sound_fanfare.play();
                    window.localStorage.setItem('daily_goal',1);
                }

                if ( (daily_target - result[0]) < 0  &&  window.localStorage.getItem('daily_goal') !== 0)
                {
                    document.getElementById("remain_to_goal").style.color = "green";
                    document.getElementById("remain_to_goal").innerHTML =(result[0] - daily_target);
                }



                //Style for days
                rpc.query({
                    model: 'library.book',
                    method: 'style_func',
                    args: [result[0], daily_target],
                }).then(function(result) {
                    document.getElementById('days_style').style = result;
                })
                //Style for first_place
                rpc.query({
                    model: 'library.book',
                    method: 'style_func',
                    args: [result[1][0]['amount'], agent_target],
                }).then(function(result) {
                    document.getElementById('first_place_style').style  = result;

                })

                //Style for second_place
                rpc.query({
                    model: 'library.book',
                    method: 'style_func',
                    args: [result[1][1]['amount'], agent_target],
                }).then(function(result) {
                    document.getElementById('second_place_style').style = result;

                })

                //Style for third_place
                rpc.query({
                    model: 'library.book',
                    method: 'style_func',
                    args: [result[1][2]['amount'], agent_target],
                }).then(function(result) {
                    document.getElementById('third_place_style').style  = result;
                })
                } catch (error) {}

                //Our leaders
                try{
                document.getElementById("days_first_placer_name").innerHTML = result[1][0]["agent_name"];
                document.getElementById("days_first_placer_depo").innerHTML = result[1][0]["amount"];


                document.getElementById("days_second_placer_name").innerHTML = result[1][1]["agent_name"];
                document.getElementById("days_second_placer_depo").innerHTML = result[1][1]["amount"];


                document.getElementById("days_third_placer_name").innerHTML = result[1][2]["agent_name"];
                document.getElementById("days_third_placer_depo").innerHTML = result[1][2]["amount"];
                }catch(error){}

//              Last deposits
                try{
                document.getElementById("last_1_name").innerHTML = result[2][0]["agent_name"];
                document.getElementById("last_1_amount").innerHTML = result[2][0]["amount"];
                document.getElementById("last_1_time").innerHTML = result[2][0]["time"];

                document.getElementById("last_2_name").innerHTML = result[2][1]["agent_name"];
                document.getElementById("last_2_amount").innerHTML = result[2][1]["amount"];
                document.getElementById("last_2_time").innerHTML = result[2][1]["time"];

                document.getElementById("last_3_name").innerHTML = result[2][2]["agent_name"];
                document.getElementById("last_3_amount").innerHTML = result[2][2]["amount"];
                document.getElementById("last_3_time").innerHTML = result[2][2]["time"];

                document.getElementById("last_4_name").innerHTML = result[2][3]["agent_name"];
                document.getElementById("last_4_amount").innerHTML = result[2][3]["amount"];
                document.getElementById("last_4_time").innerHTML = result[2][3]["time"];

                document.getElementById("last_5_name").innerHTML = result[2][4]["agent_name"];
                document.getElementById("last_5_amount").innerHTML = result[2][4]["amount"];
                document.getElementById("last_5_time").innerHTML = result[2][4]["time"];

                document.getElementById("last_6_name").innerHTML = result[2][5]["agent_name"];
                document.getElementById("last_6_amount").innerHTML = result[2][5]["amount"];
                document.getElementById("last_6_time").innerHTML = result[2][5]["time"];
                }catch(error){}



        })
    }

    function time_remain() {

            rpc.query({
            model: 'library.book',
            method: 'return_time_till_10',
            args: [],
        }).then(function(result) {
        var countDownDate = new Date(result).getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="remaining_time"
            document.getElementById("remaining_time").innerHTML = hours + "h " +
                minutes + "m " + seconds + "s ";

            // If the count down is over, write some text. tu naklebia mashin sheucvale date
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("remaining_time").innerHTML = "EXPIRED";
            }
        }, 1000);
    })
    }


    function since_last_deposit(){

        setTimeout(function(){
            seconds++;
            if(seconds >59){seconds=0;mins++;
            if(mins>59) {
            mins=0;hours++;
            if(hours <10) {$("#hours").text('0'+hours+':')} else $("#hours").text(hours+':');
            }

            if(mins<10){
            $("#mins").text('0'+mins+':');}
            else $("#mins").text(mins+':');
            }
            if(seconds <10) {
            $("#seconds").text('0'+seconds);} else {
            $("#seconds").text(seconds);
            }
            since_last_deposit();
            },1000);
    }



    var MyClientAction = AbstractAction.extend({
        contentTemplate: 'retention-today',

        start: function() {


            time_remain()

            setInterval(function() {




                foo()

            }, 5000);
        },
    });




    core.action_registry.add('bare_minimum', MyClientAction);
//    return MyClientAction
});