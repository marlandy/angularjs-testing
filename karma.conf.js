module.exports = function (config) {
    config.set({
        basePath: './',
        reporters: ['junit', 'coverage'],
        files: [
            'app/lib/angular/angular.js',
            'app/lib/angular-mocks/angular-mocks.js',
            'app/js/**/*.js',
            'tests/**/*.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome', 'Firefox'],
        singleRun: true,
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],
        junitReporter: {
            outputFile: 'test_reports/junit/junit.xml',
            suite: 'unit'
        },
        preprocessors: {
            'app/js/**/*.js': ['coverage']
        },
        coverageReporter: {
            dir: 'test_reports/coverage/',            
            reporters: [
                {type: 'lcov', subdir: '.'},
                {type: 'cobertura', subdir: '.', file: 'cobertura.xml'}
            ]
        }

    });
};
