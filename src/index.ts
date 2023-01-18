import server from "./config/server";

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log({
    message: "Server is running",
    port: PORT,
    env: process.env.NODE_ENV,
  });
});
