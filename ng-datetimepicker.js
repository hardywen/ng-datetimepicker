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
                    config: "=",
                    minDate: "=",
                    maxDate: "="
                },
                controller: ['$scope', 'datetimepicker', function ($scope, datetimepicker) {
                    $scope.provider = _.cloneDeep(datetimepicker);
                }],
                link: function ($scope, element, attrs, ngModel) {
                    var config = angular.extend($scope.provider.config, $scope.config);

                    config.onShow = function () {
                        if ($scope.minDate) {
                            this.setOptions({
                                minDate: moment($scope.minDate).format('YYYY-MM-DD')
                            })
                        }
                        if ($scope.maxDate) {
                            this.setOptions({
                                maxDate: moment($scope.maxDate).format('YYYY-MM-DD')
                            })
                        }
                    };

                    $(element).datetimepicker(config);

                    if (attrs.triggerBy) {
                        $(attrs.triggerBy).on('click', function () {
                            $(element).datetimepicker('show')
                        })
                    }
                }
            }
        }]);

})();
