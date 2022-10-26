import apiRouter from "./api";

const router = (app) => {
    app.use("/api", apiRouter);
};

export default router;
