import server from "./config/server";

server.listen(3333, () => {
  console.log({
    message: "Server is running",
    port: 3333,
    env: process.env.NODE_ENV,
  });
});

