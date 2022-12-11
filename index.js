const express = require("express")
const cors = require("cors")

const {connection} = require("./db/db")
const { blogsRoute } = require("./routes/blog.route")
const { authRouter } = require("./routes/signup.route")

const app = express()
app.use(express.json())
app.use(cors({
    origin: "*"
}))
app.use("/user", authRouter)
app.use("/blogs", blogsRoute)

app.get("/",(req, res)=>{
    res.send("Hello")
})

app.listen(8080, async()=>{
    try {
        await connection;
        console.log("DB connected");
    } catch (err) {
        console.log(err)
        console.log("DB connect error");
    }
    console.log("listing 8080")
})