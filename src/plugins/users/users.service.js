class UsersService {

  constructor($q, $timeout, $http) {
    this._$q = $q;
    this._$timeout = $timeout;
    this._$http = $http;
  }

  /**
   * fetch all users
   * @return {Promise}
   */
  getUsers() {
    let self = this;
    let deferred = self._$q.defer();

    self._$http.get('/api/users.json')
      .then(function(response) {
        return response.data;
      })
      .then(function(users) {
        self._$timeout(() => {
          deferred.resolve(users);
        }, 1767);
        return users;
      });

    return deferred.promise;
  }

  /**
   * fetch user by id
   * @param {Number|string} id - user id
   * @return {Promise}
   **/
  getUser(id) {
    return this.getUsers().then(function(users) {
      let user = users.find((user) => {
        return user.id == id;
      });
      if (!user) {
        throw new Error('User not found')
      }
      return user;
    });
  }
}

UsersService.$inject = ['$q', '$timeout', '$http'];

export default UsersService;