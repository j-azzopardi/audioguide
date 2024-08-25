
/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

clientsClaim();

// Precache all of the assets generated by your build process.
precacheAndRoute(self.__WB_MANIFEST);

// Clean up outdated caches
cleanupOutdatedCaches();

// Cache additional components manually
const componentFiles = [
  '/src/components/AudioGuide.js',
  '/src/components/InteractiveMap.js',
  '/src/components/AudioPlayer.js',
];

precacheAndRoute(componentFiles.map((url) => ({ url, revision: null })));

// Cache audio files
registerRoute(
  ({ url }) => url.pathname.startsWith('/audio/'),
  new CacheFirst({
    cacheName: 'audio-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Adjust based on your needs
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 Days
      }),
    ],
  })
);

// Cache image files
registerRoute(
  ({ url }) => url.pathname.startsWith('/images/'),
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50, // Adjust based on your needs
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 Days
      }),
    ],
  })
);

// Cache all other requests using CacheFirst strategy.
registerRoute(
  ({ request }) => request.mode === 'navigate' || request.destination === 'style' || request.destination === 'script' || request.destination === 'image' || request.destination === 'font',
  new CacheFirst({
    cacheName: 'app-cache',
    plugins: [
      // Optionally, set up an expiration policy for the cache.
      new ExpirationPlugin({
        maxEntries: 1000, // Adjust this based on your needs.
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 Days
      }),
    ],
  })
);

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache audio and image files manually
  if (url.pathname.startsWith('/audio/') || url.pathname.startsWith('/images/')) {
    event.respondWith(
      caches.open('dynamic-cache').then((cache) => {
        return cache.match(event.request).then((response) => {
          return (
            response ||
            fetch(event.request).then((networkResponse) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
          );
        });
      })
    );
  }
});

// Allow the web app to trigger skipWaiting via registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
