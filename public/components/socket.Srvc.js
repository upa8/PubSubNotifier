(function () {
  angular
    .module('app')
    .factory('socket', socket);

  socket.$inject = ['$rootScope'];

  function socket($rootScope) {
    const socket = io.connect();

    return {
      on,
      emit,
    };

    function on(eventName, callback) {
      socket.on(eventName, function () {
        const args = arguments;
        $rootScope.$apply(() => {
          callback.apply(socket, args);
        });
      });
    }

    function emit(eventName, data, callback) {
      socket.emit(eventName, data, function () {
        const args = arguments;
        $rootScope.$apply(() => {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  }
}());
