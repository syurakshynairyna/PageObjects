module.exports.config = {
  useAllAngular2AppRoots: true,
  specs: 'spec.js',
  directConnect: true,
  baseUrl: 'http://www.hiteshbalar.com/preserver/notes',
   

    params: {
    // Custom timeouts to wait for elements on the page
        customTimeout: 3000,
        customMinTimeout: 1000,
    },
     
    // capabilities: {
    //     browserName: 'chrome',
    //     shardTestFiles: true,
    //     maxInstances: 4

    // },

    multiCapabilities: [
        {browserName: 'chrome'},
        {browserName: 'chrome'},
    ],
    framework: 'jasmine2',

    onPrepare: function() {
    //Making ExpectedConditions accessible everywhere thru shortcut
    global.EC = protractor.ExpectedConditions;
    
    var jasmineReporters = require('jasmine-reporters');

    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig().then(function(config) {
        // you could use other properties here if you want, such as platform and version
        var browserName = config.capabilities.browserName;
        var junitReporter = new jasmineReporters.JUnitXmlReporter({
            consolidateAll: false, //Do not report to one file
            
            savePath: 'testresults/',
            // this will produce distinct xml files for each capability
            filePrefix: browserName + '-xmloutput',
            modifyReportFileName: function(generatedFileName, suite) {
                // this will produce distinct file names for each capability,
                // e.g. 'firefox.SuiteName' and 'chrome.SuiteName'
                return browserName + '.' + generatedFileName;
            }
        });
    jasmine.getEnv().addReporter(junitReporter);
          
        }),

        // Smartly searches for the element for additional time, works on the browser side
        browser.manage().timeouts().implicitlyWait(2000),

        //onPrepare: function (){
        //Impl waits for elements
        //browser.manage().timeouts().ImplicitlyWait(3000)

            //This function will be executed after each IT block in this DESCRIBE block
    afterEach(function () {
      // Wiping cookie files ONLY for current domain
      browser.manage().deleteAllCookies()
      // Wiping local and session storage
      browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
        .then(undefined,
          function (err) {
            // Errors will be thrown when browser is on default data URL.
            // Session and Local storage is disabled for data URLs
          })
      //Wiping indexedDB     
      browser.executeScript(`
      indexedDB.webkitGetDatabaseNames().onsuccess = function(sender,args){
            for (let dbname of sender.target.result) {
                indexedDB.deleteDatabase(dbname)
            }
        };
      `).then(undefined,
          function (err) {
            // Errors will be thrown when browser is on default data URL.
            // indexedDB storage is disabled for data URLs
        })
    }),
        beforeEach(function () {
            browser.get('')
            browser.sleep(3000)      
    })

    }

    }
