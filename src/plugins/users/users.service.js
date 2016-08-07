class UsersService {
    constructor($q, $timeout, $http) {
        this._$q = $q;
        this._$timeout = $timeout;
        this._$http = $http;
    }
    
    getUsers() {
        let self = this;
        let deferred = self._$q.defer();
    
        self._$http.get('/api/users.json')
            .then(function(response) {
                return response.data;
            })
            .then(function (users) {
                self._$timeout(() => {
                    deferred.resolve(users);
                }, 1767);
                return users;
            });
    
        return deferred.promise;
    }
}

UsersService.$inject = ['$q', '$timeout', '$http'];

export default UsersService;