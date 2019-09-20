const app = require("./app");

app.get("/", (req, res) => {
  return res.json("Online now");
});

app.listen(process.env.PORT || 3004, () => {
  console.log("App Running on now >>>");
});
