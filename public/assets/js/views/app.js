(function() {
  WEATHER.Views.App = Backbone.View.extend({
    initialize: function(options) {
      this.el = $(this.el);
      this.template = _.template(WEATHER.Templates.App);
      if (options.appDelegate) {
        this.appDelegate = options.appDelegate;
      }
      if (options.model) {
        this.model = options.model;
        return this.model.on("geoLocationFound", (function(_this) {
          return function() {
            return _this.positionAcquired();
          };
        })(this));
      }
    },
    positionAcquired: function() {
      this.mapView = new WEATHER.Views.Map({
        model: this.model,
        appDelegate: this
      });
      this.mapView.render();
      $("body").append(this.mapView.el);
      return this.mapView.postRender();
    },
    render: function() {
      this.el.html(this.template());
      if (this.model.activeView) {
        this.model.activeView.appDelegate = this;
        this.model.activeView.render();
        return this.el.find("#content").html(this.model.activeView.el);
      }
    },
    renderSecondView: function() {
      if (this.model.secondView) {
        this.model.secondView.appDelegate = this;
        this.model.secondView.render();
        return this.el.find("#content").append(this.model.secondView.el);
      }
    },
    postRender: function() {}
  });

}).call(this);
