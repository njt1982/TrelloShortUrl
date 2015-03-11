window.history.pushState = (function(nativePushState) {
    return function(a,b,c) {
        window.postMessage({"trelloUrlChanged": true}, "*");
        nativePushState.apply(this, arguments); //Continue by calling native history.pushState
    };
})(window.history.pushState);

