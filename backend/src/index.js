import express from "express";
import "dotenv/config";
import User from "./models/user.model.js";
import { connectDB } from "./lib/db.js";
import {clerkMiddleware} from "@clerk/express";
import cors from "cors";
import fs from "fs";
import path from "path";
import clerkWebhook from "./webhooks/clerk.webhook.js";
import authRoutes from "./routes/auth.route.js"


const app=express();
const PORT=process.env.PORT;
const FRONTEND_URL=process.env.FRONTEND_URL;

const publicDir=path.join(process.cwd(),"public");//joining current working dir and public


app.use("/api/webhooks/clerk",express.raw({type:"application/json"}),clerkWebhook);

app.use(express.json());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));;
app.use(clerkMiddleware());

app.get("/health",(req,res)=>{
    res.status(200).json({ok:true});
});

app.use("/api/auth",authRoutes);


//if public dir exists, serve the static files
if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir));
    app.get("/{*any}",(req,res,next)=>{
        res.sendFile(path.join(publicDir,"index.html"),
        (err)=>{if (err) next (err)});
    })
}
// What this whole block does
// This code is used when the React frontend and Express backend are deployed together.
// Normally, React runs separately using Vite. But when we build the React app for production, Vite converts it into static files such as HTML, CSS, and JavaScript and places them inside the dist folder. During Docker deployment, these files are copied into the backend's public folder.
// First, we check whether the public folder actually exists. This prevents Express from trying to serve frontend files when the production React build hasn't been created.
// Then, Express is configured to serve the static files from the public folder. This means when the browser requests things like JavaScript, CSS, images, or other frontend assets, Express can directly send those files to the browser.
// After that, we create a wildcard GET route. This catches GET requests that weren't already handled by the backend. This is important for React applications because routes such as /chat, /profile, or /settings are usually React routes, not Express routes.
// For example, if the user visits /chat, Express doesn't have to create a /chat API route. Instead, it sends the React index.html file to the browser. React then starts running and React Router looks at /chat and displays the correct React page.
// Finally, if Express encounters an error while sending index.html, the error is passed to Express's error-handling middleware using next().







app.listen(PORT,()=>{
    connectDB();
    console.log(`SERVER is up baby on ${PORT}`)
});

