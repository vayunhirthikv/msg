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
