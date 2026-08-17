HTTP STATUS CODE

1xx : informational
2xx : Success
    200 OK
    201 Created
3xx : Redirection
    301 moved permanently
4xx : client errors
    400 BAd request
    401 Unauthorized
    403 Forbidden
    404 Not found
    429 Too many requests
5xx : server error
    500 internal server error
    503 service unavailable

Middleware:
    function that runs between request and response.
    we can do auth check which is the perfect use case of middleware

CORS (Cross Origin Resource Sharing):
    when a website tries to get data from another website , the browser might block it for security reasons.So we shld tell the backend to allow requests form your frontend

WEBHOOKS :
    automated messages that are sent when something happens