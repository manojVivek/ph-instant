'use strict';

import {getLatestPostId, setLatestPostId} from './storage';
import {getNewerPosts} from './server';
import {sendNotification} from './notify';

setInterval(checkAndNotify, 30000);

function checkAndNotify() {
  const postId = getLatestPostId()
  getNewerPosts(postId)
    .then(posts => {
      posts.forEach(post => {
        if (postId !== '0') {
          sendNotification(post);
        }
        setLatestPostId(post.id);
      });
    })
    .catch(err => console.log('Error while checking for alerts and notifying', err));
}
