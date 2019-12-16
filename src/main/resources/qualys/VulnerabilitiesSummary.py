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

request = HttpRequest(server, username, password)
imageFilter = "repo.registry:{} and repo.repository:{} and repo.tag:{}".format(
    registry, repository, tag
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
    lastScanned = json.loads(response.getResponse())["data"][0]["lastScanned"]
    created = json.loads(response.getResponse())["data"][0]["created"]
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

totalVulnerabilities = 0
counts = {}
for severity in vulnerabilities.keys():
    totalVulnerabilities += vulnerabilities[severity]
    counts[severity.replace("severity", "").replace("Count", "")] = str(
        vulnerabilities[severity]
    )
counts["Total"] = totalVulnerabilities

href = "{}/cs/#/assets/images/{}".format(server["url"], sha)

data = {
    "href": href,
    "counts": counts,
    "lastScanned": lastScanned,
    "created": created,
    "image": {"registry": registry, "repository": repository, "tag": tag},
}
