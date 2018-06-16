'use strict';

import fetch from 'isomorphic-fetch';
import {getServerBaseUrl} from './utils';
import path from 'path';

export function getNewerPosts(lastId) {
  return fetch(path.join(getServerBaseUrl(), 'alerts', lastId))
    .then(res => {
      if (!res.ok) {
        throw 'Error from server' + res.statusText;
      }
      return res.json();
    })
    .catch(err => {
      console.error('Error while checking for alerts', err);
    });
}
