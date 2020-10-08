const { Expo } = require("expo-server-sdk");
const User = require("../models/user");

const sendNotificationToAll = async (messageTitle, messageBody, toScreen) => {
  try {
    const expo = new Expo();
    let messages = [];
    const subscribedUsers = await User.find({
      subscription: { $ne: null }
    });
    const subscriptionTokens = subscribedUsers.map(user => user.subscription);
    for (let pushToken of subscriptionTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: pushToken,
        title: messageTitle,
        sound: "default",
        priority: "high",
        badge: "1",
        body: messageBody,
        data: {
          withSome: "data",
          toScreen: toScreen
        }
      });
    }
    const chunks = await expo.chunkPushNotifications(messages);
    let tickets = [];

    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // res.status(200).json("notification sent");
        console.log(subscriptionTokens);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (err) {
        throw err;
      }
    }
  } catch (err) {
    throw err;
  }
};

exports.sendNotification = async () => {
  try {
    await sendNotificationToAll(
      "Paddle alert!",
      "Someone did not check out!",
      "Alerts"
    );
  } catch (err) {
    throw err;
  }
};

exports.sendReminderToPaddler = async userId => {
  try {
    const expo = new Expo();
    let messages = [];
    const paddlerToRemind = await User.findById(userId);
    const subscriptionTokens = [paddlerToRemind.subscription];
    for (let pushToken of subscriptionTokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: pushToken,
        title: "Time is running out!",
        sound: "default",
        priority: "high",
        badge: "1",
        body: "Check out or extend your ETA!",
        data: {
          withSome: "data",
          toScreen: "Planner"
        }
      });
    }
    const chunks = await expo.chunkPushNotifications(messages);
    let tickets = [];

    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // res.status(200).json("notification sent");
        console.log(subscriptionTokens);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (err) {
        throw err;
      }
    }
  } catch (err) {
    throw err;
  }
};

exports.notifyAllIsOk = async (req, res, next) => {
  try {
    const safePaddler = await User.findById(req.params.userId);
    const userName = safePaddler.username;
    const notificationTitle = `${userName} is safe!`;
    const notificationBody = "Just a bit late, but back to base...";
    await sendNotificationToAll(notificationTitle, notificationBody, "Home");
    res.status(200).json("sending notifications");
  } catch (err) {
    return next(err);
  }
};

// const webpush = require("web-push");
// const path = require("path");
// const config = require("../config");
// const User = require("../models/user");

// const publicVapidKey = config.publicVapidKey;
// const privateVapidKey = config.privateVapidKey;

// webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

// exports.subscribe = (req, res) => {
// 	// Get pushSubscription object
// 	const subscription = req.body;
// 	console.log("SUBSCRIPTION OBJECT", subscription);

// 	// Send 201 status - resource created
// 	res.status(201).json({});

// 	// Create payload (notification title)
// 	const payload = JSON.stringify({title: "Subscribe to receive alerts!"});

// 	// Pass object into the sendNotification function
// 	webpush.sendNotification(subscription, payload).catch(err => console.error(err));
// };

// exports.saveSubscription = async (req, res) => {
// 	try {

// 		// console.log("Saving subscription!");
// 		const subscription = req.body.subscription;
// 		// // const query = {_id: req.body.userId};
// 		const userToSubscribe = await User.findById(req.body.userId);
// 		if (userToSubscribe.subscription !== null) {
// 			console.log("USER ALREADY SUBSCRIBED");
// 			return res.status(200).json("USER ALREADY SUBSCRIBED");
// 		}
// 		else {
// 			await userToSubscribe.update({$set:{subscription: subscription}}, {new: true});
// 			// await userToSubscribe.save();
// 			console.log("USER SUBSCRIBED!")
// 			return res.status(200).json(userToSubscribe);
// 		}
// 		const savedSubscription = await Subscription.create({subscription: subscriptionToSave});

// 	} catch(err) {
// 		console.log(err);
// 	}
// }

// exports.sendNotification = async (req, res) => {
// 	// Find users whose subscription is not null and send Notifications to all of them
// 	const usersSubscribed = await User.find({subscription: {$ne: null}});
// 	const subscriptions = await usersSubscribed.map(user => user.subscription);
// 	console.log("SENDING NOTIFS");
// 	// Create payload (notification title)
// 	const payload = JSON.stringify({title: "Paddle Alert!"});
// 	// Pass object into the sendNotification function and send notific to each subscription
// 	await subscriptions.forEach(sub => {
// 		triggerPushMsg(sub, payload);
// 	});
// 	return res.status(200).json("processing notifications");
// }

// const triggerPushMsg = function(subscription, dataToSend) {
// 	return webpush.sendNotification(subscription, dataToSend)
// 	  .catch((err) => {
// 	      if (err.statusCode === 404 || err.statusCode === 410) {
// 	        console.log('Subscription has expired or is no longer valid: ', err);
// 	        return deleteSubscriptionFromDatabase(subscription);
// 	      } else {
// 	        throw err;
// 	      }
// 	    });
// };

// const deleteSubscriptionFromDatabase = async (subscription) => {
// 	const query = {subscription: subscription};
// 	const userToEdit = await User.findOne(query);
// 	// console.log("USER TO EDIT", userToEdit);
// 	await userToEdit.update({$set:{subscription: null}}, {new: true});
// 	console.log("DELETED SUBSCRIPTION");
// }
