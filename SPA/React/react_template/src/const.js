// const.js
let constants = {
    FetchDataRootUrl: 'http://localhost:8888/api/sampledata/weatherforecasts?',
    CrudSampleRootUrl: 'http://localhost:8888/api/json/'
};

module.exports = Object.freeze(constants); // freeze prevents changes by users