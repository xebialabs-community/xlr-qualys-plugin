$(document).ready(function() {
    $("#image-metadata").hide();
});
window.addEventListener("xlrelease.load", function() {
    window.xlrelease.queryTileData(function(response) {
        var data = response.data.data
        var dom = document.getElementById("main");
        var chart = echarts.init(dom);
        var app = {};
        app.title = 'Task Metrics';
        var option = {
            legend: {
                orient: "vertical",
                bottom: '50%',
                right: '10%',
            },
            tooltip: {
                trigger: 'axis',
                showContent: false
            },
            dataset: {
                source: data.imagesTable
            },
            xAxis: {
                type: 'category',
                show: false
            },
            yAxis: {
                gridIndex: 0
            },
            grid: {
                top: '55%',
                bottom: '1%'
            },
            series: [{
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row'
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row'
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row'
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row'
                },
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row'
                },
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '0%',
                    center: ['50%', '20%'],
                    label: {
                        show: false
                    },
                    encode: {
                        itemName: data.category,
                        value: data.lastTag,
                        tooltip: data.lastTag
                    }
                }
            ]
        };

        function showImageMetadata(dimension) {
            document.getElementById("registry").innerHTML = data.imagesTable[0][dimension].split("\n")[0];
            document.getElementById("repository").innerHTML = data.imagesTable[0][dimension].split("\n")[1];
            document.getElementById("tag").innerHTML = data.imagesTable[0][dimension].split("\n")[2];
            document.getElementById("qualys").href = data.linkMap[data.imagesTable[0][dimension]];
        }
        chart.on('updateAxisPointer', function(event) {
            var xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1;
                showImageMetadata(dimension);
                chart.setOption({
                    series: {
                        id: 'pie',
                        radius: '25%',
                        label: {
                            show: true,
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                        },
                        labelLine: {
                            show: true
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                    }
                });
            }
        });
        chart.on('rendered', function() {
            // Sync the beginning of chart animation with the beginning of metadata report animation
            $("#image-metadata").fadeIn(1000);
        });
        if (option && typeof option === "object") {
            chart.setOption(option, true);
        }
    });
});