(function () {

    'use strict';

    angular.module('ngDatetimepicker', [])
        .provider('datetimepicker', function () {
            var self = this;

            self.config = {
                lang: 'zh',
                format: 'Y-m-d H:i',
                formatDate: 'Y-m-d',
                formatTime: 'H:i',
                step: 30,
                defaultTime: '00:00'
            };

            self.setConfig = function (config) {
                self.config = angular.extend(self.config, config);
            };

            self.$get = function () {
                return {
                    config: self.config
                }
            }
        })
        .directive('ngDatetimepicker', [function () {
            return {
                restrict: "AE",
                require: "?ngModel",
                scope: {
                    config: "="
                },
                controller: ['$scope', 'datetimepicker', function ($scope, datetimepicker) {
                    $scope.provider = datetimepicker;
                }],
                link: function ($scope, element, attrs, ngModel) {
                    $(element).datetimepicker(angular.extend($scope.provider.config, $scope.config));
                }
            }
        }]);

})();
