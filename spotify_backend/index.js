import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from "passport"
import cors from "cors"
import User from "./models/User.js"
import authRoutes from "./routes/auth.js"
import songRoutes from "./routes/song.js"
import playlistRoutes from "./routes/playlist.js"
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// const JwtStrategy = require('passport-jwt').Strategy,
// ExtractJwt = require('passport-jwt').ExtractJwt;
const app = express();
dotenv.config();
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World");
});

// database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error while connecting to MongoDB");
  });


  //setting up passport package

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey =  process.env.SECRET_KEY;

// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
      const user = await User.findOne({ id: jwt_payload.identifier });

      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
  } catch (err) {
      return done(err, false);
  }
}));

// routes 
app.use("/auth", authRoutes)
app.use('/song', songRoutes)
app.use('/playlist', playlistRoutes)

app.listen(8000, () => {
  console.log("app is running on port 8000");
});
