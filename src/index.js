import express from "express";
import http from "http";
import cors from "cors";
import { config } from "dotenv";
import userRoutes from "./routes/user.routes.js"
import experienceRoutes from "./routes/experience.routes.js"
import projectRoutes from "./routes/project.route.js"
import testimonialRoutes from "./routes/testimonials.route.js"
import profileRoutes from "./routes/profile.route.js"
config();

const app = express();
app.use(cors());
const server = http.createServer(app);

app.get("/home", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json());
const port = process.env.PORT || 4000;
server.listen(port, () => {
    console.log(`running on port ${port}`);
    app.use('/users',userRoutes)
    app.use('/experience',experienceRoutes)
    app.use('/project',projectRoutes)
    app.use('/testimonials',testimonialRoutes)
    app.use('/profile',profileRoutes)
});

