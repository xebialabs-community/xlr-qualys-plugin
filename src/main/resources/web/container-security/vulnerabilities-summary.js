$(document).ready(function() {
    $("#summary");
});

window.addEventListener("xlrelease.load", function() {
    window.xlrelease.queryTileData(function(response) {
        var data = response.data.data
        document.getElementById("globe").innerHTML = `
        <div class="metadata-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5080 5080">
            <path d="M3651 2293c-554,0 -1005,451 -1005,1005 0,555 451,1006 1005,1006 555,0 1006,-451 1006,-1006 0,-554 -451,-1005 -1006,-1005zm0 2152c-632,0 -1146,-514 -1146,-1147 0,-632 514,-1146 1146,-1146 632,0 1147,514 1147,1146 0,633 -515,1147 -1147,1147z" fill="#000000"></path>
            <path d="M3282 3422l-355 0c-97,0 -175,-89 -175,-198l70 0c0,70 47,127 105,127l355 0c58,0 105,-57 105,-127l0 -127c0,-109 78,-198 175,-198 60,0 107,-58 107,-128l0 -209c0,-71 -47,-128 -105,-128l0 -70c97,0 175,89 175,198l0 209c0,109 -78,198 -175,198 -60,0 -107,57 -107,128l0 127c0,109 -78,198 -175,198z" fill="#000000"></path>
            <path d="M4317 3634l0 0zm-472 -142c-12,37 -27,143 -35,233 0,7 8,14 17,14l283 0c10,0 18,-7 18,-17 0,-49 39,-88 87,-88l104 0c29,-11 144,-95 185,-136l-165 -149 0 -16c0,-9 -8,-17 -17,-17l-1 0c-48,0 -88,-39 -88,-88l0 -71c0,-10 -7,-17 -17,-17l-71 0c-10,0 -17,7 -17,17l0 71c0,42 -30,77 -68,86l-75 103c-6,43 -42,75 -86,75l-54 0zm265 318l-283 0c-48,0 -88,-39 -88,-88 27,-300 59,-300 88,-300l72 0c9,0 17,-8 17,-17l0 -12 106 -147 18 0c9,0 17,-8 17,-18l0 -71c0,-49 39,-88 88,-88l71 0c49,0 88,39 88,88l0 71c0,10 8,18 17,18l1 0c43,0 78,30 86,70l178 161 0 15c0,56 -221,212 -264,212l-107 0c-9,0 -17,8 -17,17 0,50 -39,89 -88,89z" fill="#000000"></path>
            <path d="M1976 2451l0 -1052 388 -537 0 1126 -388 463zm-1553 89l0 -1129 424 0 0 1058 70 0 0 -1058 141 0 0 -70 -117 0 295 -461 -59 -38 -320 499 -416 0 400 -565 1497 0 -407 565 -498 0 276 -462 -60 -36 -308 515 0 1111 70 0 0 -1058 494 0 0 1124 -4 5 -1478 0zm345 -1905l-486 685 0 1361 1684 0 539 -642 0 -1404 -1737 0z" fill="#000000"></path>
            <path d="M1155 3072c-10,-47 -17,-95 -21,-144l70 -6c4,46 11,91 20,136l-69 14zm110 307c-22,-43 -42,-88 -59,-133l66 -25c16,43 35,85 56,125l-63 33zm189 265c-33,-35 -64,-72 -92,-111l56 -42c27,37 57,72 88,105l-52 48zm254 206c-42,-25 -82,-53 -120,-83l44 -56c36,29 73,55 112,78l-36 61zm299 129c-47,-13 -93,-29 -137,-47l27 -65c42,17 85,32 129,44l-19 68zm323 44c-48,0 -97,-3 -145,-8l8 -70c45,5 91,8 137,8l0 70z" fill="#000000"></path>
            <path d="M2992 925c-45,-5 -91,-8 -136,-8l0 -70c48,0 97,3 145,8l-9 70zm297 78c-42,-17 -85,-32 -129,-44l19 -68c46,12 93,29 137,47l-27 65zm265 155c-36,-28 -74,-54 -112,-77l36 -61c41,25 82,53 120,83l-44 55zm213 221c-26,-37 -56,-72 -87,-105l51 -48c34,35 65,72 93,111l-57 42zm147 270c-16,-43 -35,-85 -56,-125l62 -33c23,43 43,88 60,133l-66 25zm68 299c-4,-46 -11,-91 -20,-136l69 -14c10,47 17,95 21,144l-70 6z" fill="#000000"></path>
            </svg>
        </div>
        `;
        document.getElementById("ship").innerHTML = `
        <div class="metadata-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5080 5080">
            <path d="M1335 2034l-918 0 0 -106 918 0 0 106zm-741 -423l564 0 0 176 -564 0 0 -176zm882 176l-177 0 0 -317 -141 0 0 -741 -141 0 0 741 -564 0 0 317 -177 0 0 388 177 0 0 812 141 0 0 -812 564 0 0 812 141 0 0 -812 177 0 0 -388z" fill="#000000"></path>
            <path d="M4157 2775l388 0 0 -388 -388 0 0 388zm529 141l-670 0 0 -670 670 0 0 670z" fill="#000000"></path>
            <path d="M3416 2352l388 0 0 -389 -388 0 0 389zm529 141l-670 0 0 -671 670 0 0 671z" fill="#000000"></path>
            <path d="M2675 2034l388 0 0 -388 -388 0 0 388zm529 141l-670 0 0 -670 670 0 0 670z" fill="#000000"></path>
            <path d="M2428 3092l635 0 0 -705 -635 0 0 705zm776 141l-917 0 0 -987 917 0 0 987z" fill="#000000"></path>
            <path d="M3416 3092l388 0 0 -388 -388 0 0 388zm529 141l-670 0 0 -670 670 0 0 670z" fill="#000000"></path>
            <path d="M3503 4033c-158,98 -307,191 -505,175 -149,-11 -243,-78 -342,-148 -33,-24 -67,-48 -103,-70 -373,-228 -946,-226 -1742,7l-356 -799 1316 0 353 247 1933 0 177 -317 367 0 -414 738c-43,-12 -87,-20 -132,-23 -222,-14 -390,90 -552,190zm817 -115l522 -931 -691 0 -177 317 -1806 0 -352 -247 -1578 0 437 982c-108,33 -219,71 -335,113l49 132c989,-359 1692,-417 2091,-173 31,19 62,41 94,64 106,75 225,160 413,174 19,2 37,2 55,2 216,0 378,-100 535,-198 150,-92 292,-180 470,-169 168,11 336,110 498,295l106 -92c-106,-122 -217,-212 -331,-269z" fill="#000000"></path>
            </svg>
        </div>
        `;
        document.getElementById("container").innerHTML = `
        <div class="metadata-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5080 5080">
            <path d="M2081 1517l0 -141c73,0 106,-62 106,-124l141 0c0,151 -106,265 -247,265z" fill="#000000"></path>
            <path d="M2064 600c-68,0 -124,-56 -124,-124 0,-68 56,-123 124,-123 68,0 123,55 123,123 0,68 -55,124 -123,124zm264 -124c0,-146 -118,-264 -264,-264 -146,0 -265,118 -265,264 0,146 212,265 212,265l0 251c-124,22 -212,119 -212,243l141 0c0,-73 62,-106 124,-106l88 0 0 -404c103,-36 176,-134 176,-249z" fill="#000000"></path>
            <path d="M3563 3881l-2893 0 0 -1694 2893 0 0 1694zm-1168 -2427l-62 126c281,138 791,345 1051,466l-2569 0 1230 -644 -68 -123 -1448 767 0 1976 3175 0 0 -1976c0,0 -893,-388 -1309,-592z" fill="#000000"></path>
            </svg>
        </div>
        `;
        document.getElementById("registry").innerHTML = "<span style=\"font-weight: bold;\">Registry</span><br>" + data.image["registry"]
        document.getElementById("repository").innerHTML = "<span style=\"font-weight: bold;\">Repository</span><br>" + data.image["repository"]
        document.getElementById("tag").innerHTML = "<span style=\"font-weight: bold;\">Tag</span><br>" + data.image["tag"]
        document.getElementById("created").innerHTML = "<span style=\"font-weight: bold;\">Creation Datetime</span><br>" + new Date(Number(data.created)).toISOString();
        document.getElementById("lastScanned").innerHTML = "<span style=\"font-weight: bold;\">Last Checked</span><br>" + new Date(Number(data.lastScanned)).toISOString();
        document.getElementById("total").innerHTML = "<span style=\"font-weight: bold;\">Vulnerabilities</span><br>" + data.counts["Total"];
        for (var severity of Object.keys(data.counts)) {
            document.getElementById("vulnerabilities").innerHTML += `
                <tr><td>${severity}</td><td>${data.counts[severity]}</td></tr>
            `;
        }
        document.getElementById("qualys-link").href = data.href;
        $("#summary").fadeIn(1000);
    });
});