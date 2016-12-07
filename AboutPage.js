
class AboutPage {

        constructor() {
        
        this.openMenuButton = $('#navbar .glyphicon-option-vertical')
        this.aboutButton = $(".navbar-right a[href='/preserver/about']")
    }

       openAbout() {
        this.openMenuButton.click()
        this.aboutButton.click()
       }

    //Получим коллекцию всех заметок которые есть на этой странице
    getAbout() {
        return $('.profile-card')
    }
}

// Экспортим объект чтобы он был доступен в других файлах
module.exports.AboutPage = AboutPage