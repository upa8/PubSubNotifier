# PubSubNotifier

Problem Statement-
    Create a notification system where the user will get notified in real time if the user is online.
If the user is offline, then the user will get notified once the user comes online. 

Additional Information - 
    *) Maintain current active users.
    *) Logout users who are not active.
    *) Create a Redis instance for notifications. 
    *) Only store notifications that are not read by the user in Redis, remove notifications from Redis once the user reads the notifications. 
    *) Also change notification flag to be read by the user. To do that use Rabbitmq. Put this request in Rabbitmq and let Rabbitmq handle that request.
    *) Once the user logs in, check if there are any events in Redis instance in notification table. If yes then show those messages to the user. 
    *) Once user reads those messages, remove those from Redis instance, and change their flag in DB that they are read.  


Solutions Involved steps:
*) Create a socket server 
*) Create a channel for broadcasting
*) Every user will be subscribed to common broadcasting channel 
*) Once the user logs in, create a channel with user-id and let user subscribe that channel.
*) Store this channel in Redis.
*) Now when another user logs in, create a channel with his user-id and store it in Redis. 
*) Now when user_1 create an event for user_2 then we first check whether user_2 is online or not. That we can find from our Redis channels. If user_2 is online, then we will emit the message from user_2's channel. All the current sessions of  user_2 will get the notification, also we will add that in our DB with reading flag as false. 
*) When the user clicks on the reading button, we will change reading flag of all the events to true. To optimise performance, we can pass it to Rabbitmq. 

Technologies used:
*) Socket.io
*) Redis
*) Rabbitmq
*) Node.js
*) Angularjs
*) Eslint 





