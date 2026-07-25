import express from "express"
import "dotenv/config"
import mooRouter from "./routers/router.js"

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use("/", mooRouter)


app.listen(PORT, () => {
    console.log(`server running on http://localhost/${PORT}`);
})