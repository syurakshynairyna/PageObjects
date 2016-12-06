//Импорт пейдж обджекта из другого файла
let NotesPage = require('./PageObjects/NotesPage.js').NotesPage
let ArchievePage = require('./PageObjects/ArchievePage.js').ArchievePage
let RecycleBin = require('./PageObjects/RecycleBin.js').RecycleBin
let EC = protractor.ExpectedConditions


//Просто наш базовый URL для работы
let URL = 'http://www.hiteshbalar.com/preserver/notes'

describe('Preserver tests', function () {
    let notesPage = new NotesPage()

beforeEach(function () {
      browser.get(URL)
      browser.sleep(5000)

    })

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
    })

    it('should be created when title and body provided', function () {
        
        notesPage.createNote('Test', 'Test')
        browser.sleep(5000)
        expect(notesPage.getNotes().count()).toBe(1, 'Notes count should be 1 after created')
    })

    it('should be created when only title provided', function () {
        
        notesPage.createNote('Test', '')
        browser.sleep(5000)
        expect(notesPage.getNotes().count()).toBe(1, 'Notes count should be 1 after created')
    })

    it('should be created when only body provided', function () {

        notesPage.createNote('', 'Test')
        browser.sleep(5000)
        expect(notesPage.getNotes().count()).toBe(1, 'Notes count should be 1 after created')
         
    })

    it('should NOT be created when nothing provided', function () {

        notesPage.createNote('', '')
        browser.sleep(5000)
        expect(notesPage.getNotes().count()).toBe(0, 'Notes count should be 0')
      
    })
    

})

describe('Preserver Achieve tests', function() {
    let archievePage = new ArchievePage()
    let notesPage = new NotesPage()
  
    beforeEach(function () {
      browser.get(URL)
      browser.sleep(5000)
    })

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
    })
 
    xit('should be moved to Achieve Notes', function () {

        notePage.createNotes('Note for achieving', 'Archieve')
        archievePage.archieveNote()
        browser.sleep(5000)
    
    expect(archievePage.getNotes().count()).toBe(1, 'Notes count should be 1 after archieved')
    })

})

describe('Preserver Delete tests', function() {
    let recycleBin = new RecycleBin()
    let notesPage = new NotesPage()

    beforeEach(function () {
      browser.get(URL)
      browser.sleep(2000)

    })

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
    })
 
    xit('Should be removed to recycle bin', function () {

        notesPage.createNotes('Note for deleting', 'Delete')
        browser.sleep(2000)
        recyclebin.deleteNote()
        browser.sleep(5000)
    
    expect(recyclebin.getNotes().count()).toBe(1, 'Notes count in recycle bin should be 1')
    })

})


