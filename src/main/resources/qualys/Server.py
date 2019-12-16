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

if configuration.url in [None, ""]:
    raise Exception("A Qualys endpoint url must be provided")
if configuration.url[-1] == "/":
    raise Exception("Please remove the trailing slash in the url")

# Get the current configuration values
params = {
    "url": configuration.url,
    "authenticationMethod": configuration.authenticationMethod,
    "username": configuration.username,
    "password": configuration.password,
    "domain": configuration.domain,
    "proxyHost": configuration.proxyHost,
    "proxyPort": configuration.proxyPort,
    "proxyUsername": configuration.proxyUsername,
    "proxyPassword": configuration.proxyPassword,
}

request = HttpRequest(params)
# Fetch image list as a test for valid endpoint, credentials, and networking
response = request.get("/csapi/v1.1/images", contentType="application/json")

if not response.isSuccessful():
    response.errorDump()  # Error dump for the logs
    raise Exception(
        response.status, response.headers, response.response
    )  # Error details for the GUI
