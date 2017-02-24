(function () {
  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage', 'socket', 'lodash'];

  function MainCtrl($scope, $localStorage, socket, lodash) {
    $scope.message = '';
    $scope.users = [];
    $scope.messages = [];
    $scope.likes = [];
    $scope.mynickname = $localStorage.nickname;
    const nickname = $scope.mynickname;

    $scope.joinPrivate = function () {
      socket.emit('join-private', {
        nickname,
      });
      console.log('private room joined!');
    };

    $scope.groupPm = function () {
      socket.emit('private-chat', {
        message: 'hello everybody!',
      });
    };

    socket.on('show-message', (data) => {
      console.log(data);
    });

    socket.emit('get-users');

    $scope.sendMessage = function (data) {
      const newMessage = {
        message: $scope.message,
        from: nickname,
      };
      socket.emit('send-message', newMessage);
      // $scope.messages.push(newMessage);
      $scope.message = '';
    };

    $scope.sendLike = function (user) {
      console.log(user);
      const id = lodash.get(user, 'socketid');
      const likeObj = {
        from: nickname,
        like: id,
      };
      socket.emit('send-like', likeObj);
    };

    socket.on('all-users', (data) => {
      console.log(data);
      $scope.users = data.filter(item => item.nickname !== nickname);
    });

    socket.on('user-liked', (data) => {
      console.log(data);
      console.log(data.from);
      $scope.likes.push(data.from);
    });

    socket.on('message-received', (data) => {
      $scope.messages.push(data);
    });

    socket.on('update', (data) => {
      $scope.users = [];
      $scope.users = data.filter(item => item.nickname !== nickname);
    });
  }
}());
