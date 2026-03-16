require("dotenv").config();
const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

const photoRoutes = require("./routes/photo.routes");
const commentRoutes = require("./routes/comment.routes");

app.use("/api/photos", photoRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
