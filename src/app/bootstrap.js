import angular from 'angular';
import AppModule from './app.module';

angular.element(document).ready(function() {
    angular.bootstrap(document, [AppModule.name], { strictDi: true });
});
