(function() {
  var templates;

  this.WEATHER = {
    Views: {
      Sections: {},
      Modals: {}
    },
    Models: {},
    Collections: {},
    Data: {},
    Utils: {},
    Templates: {}
  };

  templates = ["Conditions", "Forecast", "ForecastDay", "Loading", "App", "Map"];

  _.each(templates, function(template) {
    var storageResponse, storageResponseTime, timeDifference, updateStorage;
    updateStorage = true;
    storageResponse = localStorage.getItem("Template" + template);
    storageResponseTime = localStorage.getItem("Template" + template + "Time");
    if (storageResponse && storageResponseTime) {
      timeDifference = new Date().getTime() - storageResponseTime;
      if (timeDifference < 86400000) {
        updateStorage = false;
        window.WEATHER.Templates[template] = storageResponse;
      }
    }
    if (updateStorage) {
      return $.ajax({
        url: "assets/tpl/" + template + ".html",
        async: false,
        dataType: "text",
        success: function(data) {
          window.WEATHER.Templates[template] = data;
          localStorage.setItem("Template" + template, data);
          return localStorage.setItem("Template" + template + "Time", new Date().getTime());
        }
      });
    }
  });

}).call(this);
