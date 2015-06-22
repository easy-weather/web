(function() {
  WEATHER.Views.Conditions = Backbone.View.extend({
    id: "conditions",
    initialize: function() {
      this.el = $(this.el);
      return this.template = _.template(WEATHER.Templates.Conditions);
    },
    render: function() {
      var conditions;
      conditions = this.model.models[0].toJSON();
      $(this.el).html(this.template(conditions));
      return this;
    }
  });

}).call(this);
