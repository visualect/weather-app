const CACHE_VERSION = 1

const APP_STATIC_RESOURCES = [
  "/",
  "/index.js",
  "/pages/home.js",
  "/pages/weather.js",
  "/css/style.css",
  "/css/media.css",
  "./img/logo.png",
  "./img/wind.png",
  "./img/therm.svg",
]

const CACHE_NAME = `weather-app-v${CACHE_VERSION}`


self.addEventListener('install', e => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      cache.addAll(APP_STATIC_RESOURCES)
    })()
  )
})

// Удаляет кэш по ключу
const deleteCache = async (key) => {
  await caches.delete(key);
};

// Удаляет старый кеш с помощью deleteCache
const deleteOldCaches = async () => {
  // Кэш лист, который нужно оставить
  const cacheKeepList = [CACHE_NAME];
  // Весь кэш лист
  const keyList = await caches.keys();
  // Кэш лист, который нужно удалить
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  // Удаляем старый кэш
  await Promise.all(cachesToDelete.map(deleteCache)); // Все равно, что: await Promise.all(await caches.delete('v1'), await caches.delete('v2'), await caches.delete('v3'))
};

self.addEventListener('activate', e => {
  e.waitUntil(
    (async () => {
      deleteOldCaches()
      // Форсим использовать обновленный сервис воркер
      await clients.claim()
    })()
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(cacheFirst(e.request))
})


async function cacheFirst(request) {
  const cachedResponse = await caches.match(request)
  return cachedResponse ?? await fetch(request)
}

