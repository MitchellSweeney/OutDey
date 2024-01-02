const mongoose = require("mongoose");
const express = require("express");
const Event = require("../models/eventModel");
const multer = require("multer");
const upload = multer();
const router = express.Router();
const validateToken = require("../middleware/validateToken");

router.post("/add_event", validateToken, upload.single("img"), async (req, res) => {
  console.log(req.body);
  try {
    const result = await Event.create({
      event_name: req.body.event_name,
      event_date: req.body.event_date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      tickets: req.body.tickets,
      description: req.body.description,
      img: req.file?.buffer,
    });
    res.status(200).json({
      response: "Event Added",
      event_data: result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: "Error Creating Event",
    });
  }
});

router.get("/get_event/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    res.status(200).json({
      response: "Event Found",
      event_data: event,
    });
  } catch (err) {
    res.status(500).json({
      response: "Event Does Not Exist",
    });
  }
});

router.get("/get_all_events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({
      response: "Events Found",
      events,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: "Error Fetching All Events",
    });
  }
});

router.patch("/update_event/:id", upload.single("img"), async (req, res) => {
  const event_id = req.params.id;
  const fields_to_update = req.body;
  console.log(req.body);
  try {
    let filter = { _id: event_id };
    const event_to_update = await Event.findOne(filter);
    Object.keys(fields_to_update).forEach((field) => {
      console.log(field);
      event_to_update[field] = fields_to_update[field];
    });
    if (req.file?.buffer) {
      event_to_update.img = req.file.buffer;
    } else {
      event_to_update.img = null;
    }
    const updated_event = await event_to_update.save();
    res.status(200).json({
      response: "Event Updated",
      event_data: updated_event,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: "Error Updating Event",
    });
  }
});

router.delete("/delete_event/:id", async (req, res) => {
  try {
    await Event.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({
      response: "Event Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: "Event Not Found",
    });
  }
});

router.delete("/delete_all_events", async (req, res) => {
  try {
    await Event.deleteMany({});
    res.status(200).json({
      response: "All Events Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: "Error Deleting Events",
    });
  }
});

module.exports = router;
