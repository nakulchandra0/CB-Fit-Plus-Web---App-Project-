import express from "express";
import { json, urlencoded } from "body-parser";
require("dotenv").config({ path: ".env" });
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import ip from "ip";
import serveIndex from "serve-index";
import { INTERNAL_LINKS } from "./src/enum";
const server = express();

// DB connection
require("./src/config/connection");
// Upload Folder
require("./src/utils/createFolder");

// Environments
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const BASE_API_URL = `http://${HOST}:${PORT}${INTERNAL_LINKS.BASE_API_URL}`;
const NETWORK_BASE_API_URL = `http://${ip.address()}:${PORT}${
  INTERNAL_LINKS.BASE_API_URL
}`;
const FILE_PATH = process.env.FILE_PATH || "uploads";

/** Middlewares */
// Parser From Req.body
server.use(urlencoded({ extended: true }));
server.use(
  json({
      // Stripe-Webhooks
      verify: function (req, res, buf) {
          var url = req.originalUrl;
          if (url.includes('/webhook')) {
              req.rawBody = buf.toString();
          }
      },
  })
);
// CORS
server.use(cors());
// API LOG
server.use(morgan("dev"));
// XSS Attack Security
server.use(helmet());
/* File Upload Static */
server.use(
  FILE_PATH,
  express.static(FILE_PATH),
  serveIndex(FILE_PATH, { icons: true })
);

// Routes
import {
  userRoute,
  reviewRoute,
  googleRoute,
  fbRoute,
  classesRoute,
  adminRoute,
  stripeRoute,
} from "./src/routes";

server.use(INTERNAL_LINKS.USER.BASE_URL, userRoute);
server.use(INTERNAL_LINKS.REVIEW.BASE_URL, reviewRoute);
server.use(INTERNAL_LINKS.CLASSES.BASE_URL, classesRoute);
server.use(INTERNAL_LINKS.ADMIN.BASE_URL, adminRoute);
server.use(INTERNAL_LINKS.GOOGLE.BASE_URL, googleRoute);
server.use(INTERNAL_LINKS.FB.BASE_URL, fbRoute);
server.use(INTERNAL_LINKS.STRIPE.BASE_URL, stripeRoute);

server.get(INTERNAL_LINKS.BASE_API_URL, (req, res) => {
  res.json({ message: "CHOREONATION REST-API" });
});
server.get("/health", (_, res) => {
  res.status(200).send("I'm OK");
});
server.listen(PORT, () => {
  console.log(`API Running at 
    Localhost: ${BASE_API_URL}
    LAN: ${NETWORK_BASE_API_URL}`);
});
