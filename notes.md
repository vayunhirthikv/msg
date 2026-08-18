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

THE BIG IDEA:
    You deploy one single thing — a Docker container. Even though you have two separate apps (a React frontend and an Express backend), they get bundled together so that the backend serves the frontend. This is called a "monolith" deployment. No separate hosting for the frontend.


## What happens, step by step

Your **Dockerfile** builds the image in **3 stages**:

### Stage 1 — Build the frontend (the website)

* Takes your React code in `frontend/`
* Runs `npm run build` (Vite), which turns all your React code into plain static files: HTML, JS, CSS
* These land in `frontend/dist/`
* The public Clerk key gets baked into the JS here (`VITE_CLERK_PUBLISHABLE_KEY`)

### Stage 2 — Build the backend (the API)

* Takes your Express code in `backend/`
* `npm run build` here literally just copies `src/` → `dist/` (your backend is plain JS, nothing to compile)

### Stage 3 — The final runtime image (the only one that ships)

* Installs only production dependencies (no dev tools, keeps the image small)
* Copies the backend code → `dist/`
* Copies the frontend's built files → a folder called `public/` ← **this is the key move**
* Starts the server...


## What multer does

Multer's one job: parse `multipart/form-data` requests so you can access uploaded files.

When the browser sends a file, it doesn't send JSON — it sends the request as `multipart/form-data`: a special encoding that bundles the file's raw bytes + its metadata (filename, mimetype) + any other form fields, all glued together with "boundary" markers.

Express's normal body parsers can't read this format:

* `express.json()` → only understands JSON
* `express.urlencoded()` → only understands simple text fields, not files

So without multer, `req.body` for a file upload would just be garbage/empty. Multer is the translator that decodes that multipart blob into something usable.

## What an aggregation pipeline is

In MongoDB, an **aggregation pipeline** is a way to process documents through a sequence of *stages*, where each stage transforms the output and passes it to the next stage — like a Unix pipe (`cat file | grep x | sort`).

A regular query (`Message.find(...)`) just filters and returns documents as-is. Aggregation goes further: it can group, reshape, join, and sort in ways `find()` can't. Each stage is an object keyed by an operator that starts with `$` (`$match`, `$group`, `$sort`, etc.), and you pass an **array** of them — that array is the pipeline.



socket.io:(on top of the express we have socket server)
    powerful realtime communication lib for webapp
    instant, bidirectional communications btwn client and server
    allow data to be pushed to client without the need for client to request it
