'use strict';

export function sendNotification(post) {
  console.log('Sending notification', post.id);
  chrome.notifications.create(
    post.id.toString(),
    {
      type: 'basic',
      iconUrl: '../static/ph_instant_logo.png',
      title: "New PH: " + post.name,
      message: post.tagline,
    },
    data => console.log("Callback data", data)
  );
}
