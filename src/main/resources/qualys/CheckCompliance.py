#
# Copyright 2019 XEBIALABS
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
#
import json

if server is None:
    raise Exception("No Qualys endpoint provided")

severityFactors = {
    "severity5Count": int(severity < 5),
    "severity4Count": int(severity < 4),
    "severity3Count": int(severity < 3),
    "severity2Count": int(severity < 2),
    "severity1Count": int(severity < 1),
}

request = HttpRequest(server, username, password)
imageFilter = "repo.registry:{} and repo.repository:{} and repo.tag:{}".format(
    registry, repository, tag,
)
endpoint = "/csapi/v1.1/images?filter={}".format(imageFilter)
response = request.get(endpoint, contentType="application/json")

if not response.isSuccessful():
    response.errorDump()  # Error dump for the logs
    raise Exception(
        response.status, response.headers, response.response
    )  # Error details for the GUI

try:
    vulnerabilities = json.loads(response.getResponse())["data"][0]["vulnerabilities"]
    sha = json.loads(response.getResponse())["data"][0]["sha"]
except (IndexError, KeyError):
    raise Exception(
        "Could not find a matching image for the provided filter:\n{}".format(
            imageFilter
        )
    )
except Exception as err:
    raise Exception(
        "Could not fetch image vulnerabilities\n{}\n{}\n{}\n{}".format(
            response.status, response.headers, response.response, err
        )
    )

rows = []
failures = {}  # Assume the gate is passed until a criterion is not met
totalVulnerabilities = 0
for severity in vulnerabilities.keys():
    totalVulnerabilities += vulnerabilities[severity]
    if checkSeverity and severityFactors[severity] * vulnerabilities[severity] > 0:
        failures["__Permitted vulnerability severity__"] = True
    rows.append(
        "|{}|{}|".format(
            severity.replace("severity", "").replace("Count", ""),
            vulnerabilities[severity],
        )
    )
if checkCount and totalVulnerabilities > count:
    failures["__Permitted vulnerability count__"] = True

rows.sort(reverse=True)  # Sort with Severity 5 at the top
print("\n".join(["| Severity | Count |"] + ["|:---:|:---:|"] + rows) + "\n\n")

href = server["url"] + "/cs/#/assets/images/{}".format(sha)
print("[Image Summary in Qualys]({})\n\n".format(href))

if len(failures.keys()) > 0:
    raise Exception(
        "Failed compliance check due to: {}".format(", ".join(failures.keys()))
    )
