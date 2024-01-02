const mongoose = require("mongoose");

const eventModel = mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  event_date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  tickets: [
    {
      ticket_type: { type: String },
      ticket_price: { type: Number },
    },
  ],
  description: String,
  img: Buffer,
});

module.exports = mongoose.model("events", eventModel);
