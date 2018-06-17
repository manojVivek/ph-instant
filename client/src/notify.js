'use strict';

chrome.notifications.onClicked.addListener(notificationId => {
  chrome.tabs.create({url: notificationId}, tab => {
    chrome.windows.update(tab.windowId, {focused: true});
  });
  chrome.notifications.clear(notificationId);
});

export function sendNotification(post) {
  console.log('Sending notification', post.id);
  chrome.notifications.create(
    post.url,
    {
      type: 'basic',
      iconUrl: '../static/ph_instant_logo.png',
      title: "New PH: " + post.name,
      message: post.tagline,
      requireInteraction: true,
      priority: 2,
    },
    data => console.log("Callback data", data)
  );
}
