(function() {
  var initialize, postRender, render;

  WEATHER.Views.Loading = Backbone.View.extend(initialize = function() {
    this.el = $(this.el);
    return this.template = _.template(WEATHER.Templates.Loading);
  }, render = function() {
    return this.el.html(this.template());
  }, postRender = function() {});

}).call(this);
