// const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const nodeMailgun = require("nodemailer-mailgun-transport");
const config = require("../config");
const moment = require("moment");
const momentTimezone = require("moment-timezone");

exports.sendEmail = (session, user) => {
  const auth = {
    auth: {
      api_key: config.mailgunKey,
      domain: config.mailgunDomain
    }
  };

  // Step 2 - Nodemailer transporter
  let transporter = nodemailer.createTransport(nodeMailgun(auth));

  // Step 3
  const mailOptions = {
    from: `PaddleAlert!!! - ${user.username} <postmaster@sandboxf0d988b92340468c9a14b4bdf7fd2d8b.mailgun.org>`,
    to: "andrea.scorcia@gmail.com",
    subject: `PADDLE ALERT - ${user.username}!`,
    html: `
			<ul>
				<li>Paddler: ${user.username}</li>
				<li>Departure point: ${session.departurePoint}</li>
				<li>Departure time: ${momentTimezone(session.departureTimeStamp)
          .tz("Europe/Malta")
          .format("MMMM D YYYY HH:mm")}</li>
				<li>Destination: ${session.destination}</li>
				<li>Provided ETA: ${momentTimezone(session.arrivalTimeStamp)
          .tz("Europe/Malta")
          .format("MMMM D YYYY HH:mm")}</li>
				<li>Contact number: ${user.mobile}</li>
				<li>Last known position at ${momentTimezone(session.lastPosition.timeStamp)
          .tz("Europe/Malta")
          .format(
            "MMMM D YYYY HH:mm"
          )}: <a href="https://www.google.com/maps/search/?api=1&query=${
      session.lastPosition ? session.lastPosition.latitude : "unknown"
    },${
      session.lastPosition ? session.lastPosition.longitude : "unknown"
    }">LAST POSITION</a></li>
			</ul>
		`
  };

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Message sent!");
    }
  });
};

///////////////////
const accountSid = config.twilioSid;
const authToken = config.twilioToken;
const client = require("twilio")(accountSid, authToken);

exports.sendWhatsApp = message => {
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: message,
      to: "whatsapp:+35679998381"
    })
    .then(message => console.log("Whatsapp SID", message.sid))
    .catch(err => console.log("Whatsapp error", err));
};
