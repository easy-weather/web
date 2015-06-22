(function() {
  $(function() {
    var AppRouter;
    AppRouter = Backbone.Router.extend({
      routes: {
        "": "home",
        forecast: "forecast",
        conditions: "conditions"
      },
      home: function() {
        return this.appModel.on("geoLocationFound", (function() {
          var conditions, forecast;
          forecast = new WEATHER.Collections.Forecast({
            lat: this.appModel.geoLocation.coords.latitude,
            long: this.appModel.geoLocation.coords.longitude
          });
          conditions = new WEATHER.Collections.Conditions({
            lat: this.appModel.geoLocation.coords.latitude,
            long: this.appModel.geoLocation.coords.longitude
          });
          this.appModel.activeView = new WEATHER.Views.Conditions({
            model: conditions
          });
          this.appModel.secondView = new WEATHER.Views.Forecast({
            model: forecast
          });
          this.appModel.activeView.model.fetch({
            success: (function(_this) {
              return function() {
                return _this.appView.render();
              };
            })(this)
          });
          return this.appModel.secondView.model.fetch({
            success: (function(_this) {
              return function() {
                return _this.appView.renderSecondView();
              };
            })(this)
          });
        }), this);
      },
      conditions: function() {
        return this.appModel.on("geoLocationFound", (function() {
          var appView, collection;
          collection = new WEATHER.Collections.Conditions({
            lat: this.appModel.geoLocation.coords.latitude,
            long: this.appModel.geoLocation.coords.longitude
          });
          this.appModel.activeView = new WEATHER.Views.Conditions({
            model: collection
          });
          appView = this.appView;
          return this.appModel.activeView.model.fetch({
            success: function() {
              return appView.render();
            }
          });
        }), this);
      },
      forecast: function() {
        return this.appModel.on("geoLocationFound", (function() {
          var appView, collection;
          collection = new WEATHER.Collections.Forecast({
            lat: this.appModel.geoLocation.coords.latitude,
            long: this.appModel.geoLocation.coords.longitude
          });
          this.appModel.activeView = new WEATHER.Views.Forecast({
            model: collection
          });
          this.appModel.activeView.model.on("reset", function() {});
          appView = this.appView;
          return this.appModel.activeView.model.fetch({
            success: function() {
              return appView.render();
            }
          });
        }), this);
      },
      initialize: function() {
        var appModel;
        this.appModel = new WEATHER.Models.App();
        if (navigator.geolocation) {
          this.appModel.activeView = new WEATHER.Views.Loading();
          appModel = this.appModel;
          navigator.geolocation.getCurrentPosition(function(pos) {
            appModel.geoLocation = pos;
            return appModel.trigger("geoLocationFound");
          });
        } else {
          this.appModel.noGeoLocation = true;
        }
        this.appView = new WEATHER.Views.App({
          model: this.appModel,
          appDelegate: this
        });
        this.appView.render();
        return $("body").html(this.appView.el);
      }
    });
    new AppRouter();
    return Backbone.history.start();
  });

}).call(this);
