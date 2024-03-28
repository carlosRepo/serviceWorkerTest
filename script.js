const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        alert("serviceWorker");
        throw new Error("No support for service worker!");
    }

    if (!('Notification' in window)) {
        alert("Notification");
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        alert("PushManager");
        throw new Error("No support for Push API")
    }
}

const registerSW = async () => {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async () => {
    Notification.requestPermission().then(function(permission) { console.log('permiss', permission)});

    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        alert("no")
        throw new Error("Notification permission not granted")
    }

}

const main = async () => {
    checkPermission()
    await requestNotificationPermission()
    await registerSW()
}

