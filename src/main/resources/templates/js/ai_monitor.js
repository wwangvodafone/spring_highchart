$(document).ready(function() {
    var chart;
    var optimization ="valid";
    var display = "transact";
    var ruleHit = "all";
    var displayName = "(取引単位)"
    ajaxFunction = function(gallery) {
        $.ajax({
            url: gallery.full,
            type: "GET",
            dataType: "json",
            success: function(ai_score) {
                var data = ai_score;
                console.log(JSON.stringify(data)[6]);
                console.log(JSON.stringify(data));
                const from_json = JSON.parse(JSON.stringify(data));
                let keys = Object.keys(from_json);
                let value = [];
                for (let i = 0; i < keys.length; i++) {
                    value.push(from_json[keys[i]]);
                }
                console.log(value[0][1]);
                var forceChange = 0;
                var xData =[]
                var yData1 = []
                var yData2 = []
                var series = [{
                        name: 'ルールヒット適合率',
                        color: '#000099',
                        data: []
                    },
                    {
                        name: 'ルールヒット適合率(信頼度込み)',
                        color: '#FF8000',
                        data: []
                    }];
            //    for (var i = 0; i < from_json.length; i++) {
		        for (let i = 0; i < value[0].length; i++) {
                    xData.push(value[0][i].score)
                    if (value[0][i].trueflg==1) {
                        yData1.push(parseFloat(value[0][i].count))
                        series[0].data.push(parseFloat(value[0][i].count))
                    }
                    else {
                        yData2.push(parseFloat(value[0][i].count))
                        series[1].data.push(parseFloat(value[0][i].count))
                    }
                    
                }  
                console.log(xData);
                console.log(yData1);
 
                yAxis1List = []
                yAxis2List = []
                maxData1 = Math.max(...yData1);
                minData1 = Math.min(...yData1);
                lenData1 = yData1.length;
                intervalData1 = (maxData1 - minData1) / lenData1;
               
                for (var i = minData1; i <= maxData1; i+=intervalData1*3) {
                    yAxis1List.push(Math.round(i));
                }
                if (yAxis1List.includes(maxData1) == false) {
                    yAxis1List.push(maxData1);
                }
                maxData2 = Math.max(...yData2);
                minData2 = Math.min(...yData2);
                lenData2 = yData2.length;
                intervalData2 = (maxData2 - minData2) / lenData2;
              
                for (var i = minData2; i <= maxData2; i+=intervalData2) {
                    yAxis2List.push(Math.round(i));
                }
                chart = Highcharts.chart('container', {
        
                    chart: {
                        type: 'line',
                    },
        
                    title: {
                        text: 'AIスコア分布'
                    },
        
                    xAxis: {
                        categories: xData
                    },
        
                    yAxis: [{
                        type: 'line',
        
                    }, { // Secondary yAxis
                        gridLineWidth: 0,
                        title: {
                            text: '件数',
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                        labels: {
                            formatter: function() {
                                return Highcharts.numberFormat(this.value, 0, '', '');
                            },
                            style: {
                                color: Highcharts.getOptions().colors[0]
                            }
                        },
                    }, { // Tertiary yAxis
                        gridLineWidth: 0,
                        title: {
                            text: '件数',
                            style: {
                                color: Highcharts.getOptions().colors[3]
                            }
                        },
                        labels: {
                            formatter: function() {
                                return Highcharts.numberFormat(this.value, 0, '', '');
                            },
                            style: {
                                color: Highcharts.getOptions().colors[3]
                            }
                        },
                        tickPositions: yAxis2List,
                        opposite: true
                    }],
        
                    tooltip: {
                        crosshairs: true,
                        shared: true,
                    },
        
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0
                    },

                    series: [{
                        name: '真正' + displayName,                      
                        color: '#000099',
                        yAxis: 1,
                        color: Highcharts.getOptions().colors[0],
                        data: yData1
                    },
                    {
                        name: '不正' + displayName,
                        color: '#FF8000',
                        yAxis: 2,
                        color: Highcharts.getOptions().colors[3],
                        data: yData2
                    }]
                }, function(chart) {
                    console.log(optimization);
                    if (forceChange == 0 && optimization == "valid") {
                       
                        maxVal = Math.max(...yData1);
                        minVal = Math.min(...yData2);

                        console.log(maxVal);
                        console.log(minVal);
                        if (Math.log(maxVal) - Math.log(minVal) > 3) {
                            chart.yAxis[1].update({ type: 'logarithmic', tickPositions:yAxis1List.map((v) => Math.log10(v)) });
                            chart.yAxis[2].update({ type: 'logarithmic', tickPositions: yAxis2List.map((v) => Math.log10(v)) });
                        }
                        else {
                            chart.yAxis[1].update({ type: 'line', tickPositions: yAxis1List});
                            chart.yAxis[2].update({ type: 'line', tickPositions: yAxis2List});
                        }
                    }
                });
            },
	    error: function(jqXHR, textStatus, errorThrown) {
	    	console.log(jqXHR);
		console.log(textStatus);
		console.log(errorThrown);
 	    }
        })
    }
    gallery = [];
    gallery[0] = {
      full: "/api/aiScore/trancrule/1/1"
    }
    gallery[1] = {
      full: "/api/aiScore/trancrule/1/0"
    }
    gallery[2] = {
        full: "/api/aiScore/trancrule/0/1"
      }
    gallery[3] = {
        full: "/api/aiScore/trancrule/0/0"
      }
    counter = 0;
    $("#button").click( function() {
        if (display == "transact" && ruleHit == "all") {
            displayName = "(取引単位)";

            ajaxFunction(gallery[0]);
        }
        else if (display == "transact" && ruleHit == "part") {
            displayName = "(取引単位)";
            ajaxFunction(gallery[1]);
        }
        else if (display == "account" && ruleHit == "all") {
            displayName = "(口座単位)"
            ajaxFunction(gallery[2]);
        }
        else if (display == "account" && ruleHit == "part") {
            displayName = "(口座単位)"
            ajaxFunction(gallery[3]);
        }
    });
    $("#button2").click( function() {
        const dropDown1 = document.getElementById("display_time");
        const dropDown2 = document.getElementById("rule_hit");
        const dropDown3 = document.getElementById("display");
        const dropDown4 = document.getElementById("optimiza");
        dropDown1.selectedIndex = 0;
        dropDown2.selectedIndex = 0;
        dropDown3.selectedIndex = 0;
        dropDown4.selectedIndex = 0;
        display = "transact";
        ruleHit = "all";
        optimization ="valid";
        displayName = "(取引単位)"
    });
   dosomething = function() {
        ajaxFunction(gallery[counter]);
        }
    $("#button1").click(function(){
        forceChange = 1;
        var type = chart.yAxis[1].options.type
        console.log(type)
        if (type === "logarithmic") {
            chart.yAxis[1].update({ type: 'line', tickPositions: yAxis1List});
            chart.yAxis[2].update({ type: 'line', tickPositions: yAxis2List});
            $("#button1").text('最適化有効');
        }
        else {
            chart.yAxis[1].update({ type: 'logarithmic', tickPositions: yAxis1List.map((v) => Math.log10(v)) });       
            chart.yAxis[2].update({ type: 'logarithmic', tickPositions: yAxis2List.map((v) => Math.log10(v)) });       
            $("#button1").text('最適化無効');
        }
    });

    const selectRule = document.getElementById("rule_hit");
    selectRule.addEventListener("change", (event) => {
        ruleHit = event.target.value;
        console.log(ruleHit);
    });
    const selectDisplay = document.getElementById("display");
    selectDisplay.addEventListener("change", (event) => {
        display = event.target.value;
        console.log(display);
    });
    const selectValid = document.getElementById("optimiza");
    selectValid.addEventListener("change", (event) => {
        optimization = event.target.value;
        console.log(optimization);
    });
});

   
