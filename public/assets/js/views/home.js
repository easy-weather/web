(function() {
  WEATHER.Views.Home = Backbone.View.extend({
    id: "home",
    initialize: function() {
      this.el = $(this.el);
      return this.template = _.template(WEATHER.Templates.Conditions);
    },
    render: function() {
      var conditions;
      console.log(this.model.models[0].toJSON());
      conditions = this.model.models[0].toJSON();
      $(this.el).html(this.template(conditions));
      return this;
    }
  });

}).call(this);
