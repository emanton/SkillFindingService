(function () {

    "use strict";

    angular
        .module("app.Utils")
        .service("app.Utils.tabManager", tabManager);

    function tabManager() {

        var that = this;

        // The location where the current .html template is located (inside a project).
        this.templateUrl = "";

        // Dynamically load a new controller and it scope into existing view.
        this.loadTemplate = function(url) {
            that.templateUrl = url;
            localStorage.currentTabUrl = url;
        };

        // Define and highlight active tab when controller is loaded.
        this.highlightActiveTab = function(tabs){
            tabs.forEach(function(tab){
                tab.active = tab.url == localStorage.currentTabUrl;
            });
        };

    }

    // IoC container.
    tabManager.$inject = [];

})();