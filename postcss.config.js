module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                'last 2 versions',
                'chrome >=32', // the latest Chrome Frame version
                'firefox >=49',
                'ie >= 8', // IE 8-11
                'safari >=9' // OS X 10.9+ Mavericks/Yosemite/El Capitan/Sierra
            ]
        })
    ]
};
