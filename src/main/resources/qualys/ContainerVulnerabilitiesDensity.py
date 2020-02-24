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
if count <= 0:
    raise Exception("The results count must be greater than zero")
if count > 50:
    raise Exception("The maximum results count is 50")

request = HttpRequest(server, username, password)
endpoint = "/csapi/v1.1/images?pageNumber=1&pageSize={pageSize}&sort={sort}:{order}".format(
    pageSize=count,
    sort=sortableToken,
    order="desc" if sortOrder == "descending" else "asc",
)
if imageFilter not in [None, ""]:
    endpoint += "&filter={}".format(imageFilter)
response = request.get(endpoint, contentType="application/json")

if not response.isSuccessful():
    response.errorDump()  # Error dump for the logs
    raise Exception(
        response.status, response.headers, response.response
    )  # Error details for the GUI

try:
    images = json.loads(response.getResponse())["data"]
except Exception:
    raise Exception(
        "Could not fetch images\n{}\n{}\n{}".format(
            response.status, response.headers, response.response
        )
    )

if len(images) == 0:
    raise Exception("Qualys: No images match the provided filter")

data = {
    "images": images
}
