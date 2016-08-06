import angular from 'angular';

const runBlock = ($scope) => {
    $scope.text = 'Cheers from systemjs-babel-angular1-minimal-seed!';
};
runBlock.$inject = ['$rootScope'];

const AppModule = angular.module('app', []);
AppModule.run(runBlock);

export default AppModule;
