var
    initAppWorker;


storage.PRODUCTION_MODE = false;

initAppWorker = new SharedWorker("Workers/initApp-sharedWorker.js", "InitApp");

// Web Socket init
httpServer.addWebSocketHandler("/live", "Workers/live.js", "live", true);
