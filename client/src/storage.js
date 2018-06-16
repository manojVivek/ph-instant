'use strict';

export function getLatestPostId() {
  const lastId = window.localStorage.getItem('lastId');
  return lastId ? lastId : '0';
}

export function setLatestPostId(postId) {
  window.localStorage.setItem('lastId', postId.toString());
}
