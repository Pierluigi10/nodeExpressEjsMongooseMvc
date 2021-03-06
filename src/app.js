import express from "express";
import path from "path";
import * as SpeakersController from "./controllers/speakers.js";
import * as PresentationsController from "./controllers/presentations.js";
import * as SponsorsController from "./controllers/sponsors.js";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/mongoConference");

const app = express();
const __dirname = path.resolve(path.dirname(""));
const port = 3044;
const staticDirectory = path.join(__dirname, "./public");
app.use(express.static(staticDirectory));

app.set("view engine", "ejs");
app.use(express.static(staticDirectory));

app.set("views", path.join(__dirname, "./src/views"));

app.get("/", async (req, res) => {
  res.render("index", {
    pageTitle: "Welcome",
    speakers: await SpeakersController.getAllSpeakers(),
    presentations: await PresentationsController.getAllPresentations(),
    countries: await SpeakersController.getAllCountries(),
    sponsors: await SponsorsController.getAllSponsors(),
    rooms: await PresentationsController.getAllRooms(),
  });
});

// app.get("/speakers", (req, res) => {
//   (async () => {
//     const speakers = await SpeakerModel.find({});
//     res.render("speakers", {
//       pageTitle: "Speakers",
//       speakers, // in alternative speakers: speakers,
//     });
//   })();
// });
app.get("/speakers", async (req, res) => {
  res.render("speakers", {
    pageTitle: "Speakers",
    speakers: await SpeakersController.getAllSpeakers(),
  });
});

// app.get("/presentations", (req, res) => {
//   (async () => {
//     const presentations = await PresentationModel.find({});
//     res.render("presentations", {
//       pageTitle: "Presentations",
//       presentations, // in alternative presentations: presentations,
//     });
//   })();
// });

app.get("/presentations", async (req, res) => {
  res.render("presentations", {
    pageTitle: await PresentationsController.getPageTitle(),
    presentations: await PresentationsController.getAllPresentations(),
  });
});

app.get("/sponsors", async (req, res) => {
  res.render("sponsors", {
    pageTitle: "Sponsors",
    sponsors: await SponsorsController.getAllSponsors(),
  });
});

app.listen(port, () => {
  console.log(`Now listening on port http://localhost:${port}`);
});
