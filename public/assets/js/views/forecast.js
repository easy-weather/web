(function() {
  WEATHER.Views.Forecast = Backbone.View.extend({
    id: "forecast",
    initialize: function() {
      this.el = $(this.el);
      return this.template = _.template(WEATHER.Templates.Forecast);
    },
    render: function() {
      var forecast;
      forecast = this.model.toJSON();
      $(this.el).html(this.template);
      _.each(forecast, function(day) {
        return this.el.find("#forecastContainer").append(_.template(WEATHER.Templates.ForecastDay, day));
      }, this);
      return this;
    }
  });

}).call(this);
