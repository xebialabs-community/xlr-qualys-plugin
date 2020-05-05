window.addEventListener("xlrelease.load", function() {
    window.xlrelease.queryTileData(function(response) {
        const chart = echarts.init(document.getElementById('main'));
        const rawData = response.data.data.images;
        const {
            min,
            max
        } = getRange();
        const SEVERITIES = {
            severity1Count: 'Severity 1',
            severity2Count: 'Severity 2',
            severity3Count: 'Severity 3',
            severity4Count: 'Severity 4',
            severity5Count: 'Severity 5',
        };

        function getMappedData(level, nodeClick, children) {
            return rawData
                .reduce((p, c) => {
                    if (!p.includes(c.repo[0][level])) {
                        p.push(c.repo[0][level]);
                    }
                    return p;
                }, [])
                .map(levelName => {
                    return {
                        name: levelName,
                        level: level,
                        nodeClick: nodeClick,
                        children: children ? getChildren(levelName, level, nodeClick) : [],
                        ...getCalculations(levelName, level),
                    }
                });
        }

        function getChildren(name, place, nodeClick) {
            const childNode = place === 'registry' ? 'repository' : 'tag';
            return rawData
                .filter(reg => reg.repo[0][place] === name)
                .reduce((p, c) => {
                    const currentData = c.repo[0];
                    const itemIndex = p.findIndex(e => e.name === currentData[childNode]);
                    if (itemIndex < 0) {
                        p.push({
                            ...getCalculations(currentData[childNode], childNode),
                            level: childNode,
                            name: currentData[childNode],
                            nodeClick: nodeClick,
                            children: childNode !== 'tag' ? getChildren(currentData[childNode], childNode, nodeClick) : []
                        })
                    }
                    return p.sort((a, b) => customSort(a.name, b.name));
                }, [])
        }

        function getCalculations(name, type) {
            const allVulnerabilities = rawData
                .filter(r => r.repo[0][type] === name)
                .reduce((p, c) => {
                    Object.keys(c.vulnerabilities).forEach(key => {
                        p[key] = (p[key] ? p[key] : 0) + c.vulnerabilities[key];
                    });
                    return p;
                }, {});
            const total = Object.values(allVulnerabilities).reduce((p, c) => p + c, 0);
            return {
                allVulnerabilities,
                value: total
            };
        }

        function getRange() {
            const allVals = rawData.map(item => {
                return Object.values(item.vulnerabilities).reduce((p, c) => p + c, 0);
            });
            const min = Math.min(...allVals);
            const max = Math.max(...allVals);
            return {
                min,
                max
            };
        }

        const option = {
            tooltip: {
                trigger: 'item',
                padding: 15,
                formatter: function(params) {
                    return getFormattedTooltip(params);
                }
            },
            series: [{
                    type: 'sunburst',
                    highlightPolicy: 'descendant',
                    data: getMappedData('repository', 'rootToNode', true),
                    radius: ['25%', '100%'],
                    label: {
                        fontSize: 13,
                        fontWeight: 500
                    },
                    levels: [{
                            itemStyle: {
                                color: 'white',
                                borderColor: '#e1e1e1'
                            },
                            label: {
                                color: 'black',
                                show: true,
                                rotate: 'tangential'
                            },
                        },
                        {
                            label: {
                                color: 'black',
                                fontSize: 14,
                                rotate: 'tangential'
                            },
                        },
                        {
                            label: {
                                color: 'black',
                                rotate: 'radial'
                            },
                        }
                    ]
                },
                {
                    type: 'sunburst',
                    highlightPolicy: 'descendant',
                    data: getMappedData('registry', false, false),
                    radius: ['0%', '25%'],
                    label: {
                        rotate: 'tangential',
                        fontSize: 15,
                        fontWeight: 700
                    },
                    levels: [{},
                        {
                            itemStyle: {
                                color: 'white',
                                borderColor: '#e1e1e1'
                            },
                            label: {
                                color: 'black',
                            }
                        },
                    ]
                }
            ],
            visualMap: {
                type: 'continuous',
                min: min,
                max: max,
                inRange: {
                    color: ['#00FA27', '#FADA5C', '#FA7272']
                }
            },
        };

        function getFormattedTooltip(params) {
            const level = params.data.level;
            if (!['registry', 'repository', 'tag'].includes(level)) {
                return '<i>Go Back One Level</i>';
            }
            const allVuls = params.data.allVulnerabilities;
            const allKeys = Object.keys(allVuls).sort((a, b) => customSort(a, b));
            let childrenCount = params.data.children.length;

            if (level === 'registry') {
                childrenCount = rawData.reduce((p, c) => {
                    const name = c.repo[0].repository;
                    if (!p.includes(name)) {
                        p.push(name)
                    }
                    return p;
                }, []).length;
            }

            if (level === 'tag') {
                const tagName = `<strong>${params.data.name}</strong><br/><br/>`;
                const vuls = '<u>Vulnerabilities:</u><br/>';
                const vulsString = allKeys.reduce((p, c) => p + `&nbsp;${SEVERITIES[c]}: ${allVuls[c]} </br>`, '');
                return tagName + vuls + vulsString + `</br> Total Vulnerabilities: ${params.data.value}`
            } else {
                const label = `<strong>${params.data.name}</strong><br/>`;
                const tagCount = `<strong>${level === 'registry' ? 'Repositories' : 'Tags'}: ${childrenCount}</strong><br/>`;
                const averageText = `<br/><u>Average Vulnerabilities:</u><br/>`;
                const vulsAverages = allKeys.reduce((p, c) => {
                    const average = allVuls[c] / childrenCount;
                    return p + `&nbsp;${SEVERITIES[c]}: ${average} </br>`
                }, '');
                const averageTotal = `<br/>Average Total: ${(params.data.value / childrenCount).toFixed(2)}`;
                return label + tagCount + averageText + vulsAverages + averageTotal;
            }
        }

        chart.setOption(option);

        function customSort(one, two) {
            if (one > two) return 1;
            return -1;
        }
    });
});