const handleConnection = () => {
  if (navigator.onLine) {
    isReachable(getServerUrl()).then((online) => {
      if (online) {
        // handle online status
        setOnlineStatus(true);
      } else {
        setOnlineStatus(false);
      }
    });
  } else {
    // handle offline status
    setOnlineStatus(false);
  }
}

const isReachable = (url) => {
  return fetch(url, { method: 'HEAD', mode: 'no-cors' })
    .then((resp) => {
      return resp && (resp.ok || resp.type === 'opaque');
    })
    .catch((err) => {
      console.warn('[conn test failure]:', err);
    });
}

const getServerUrl = () => window.location.origin;

const registerServiceWorker = () => {
  'use strict';
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .then((workerRegistration) => {
        handleConnection();
      });
  }
}

const setOnlineStatus = (isOnline) => {
  const offlineClass = 'offline';
  const onlineClass = 'online';
  let element = document.querySelector('.status');

  if (isOnline){
    element.classList.add(onlineClass);
    element.classList.remove(offlineClass);
  } else {
    element.classList.remove(onlineClass);
    element.classList.add(offlineClass);
  }
}

window.onload = registerServiceWorker;
window.ononline = handleConnection;
window.onoffline = handleConnection;  