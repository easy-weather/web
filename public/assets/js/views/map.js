(function() {
  WEATHER.Views.Map = Backbone.View.extend({
    initialize: function(options) {
      this.el = $(this.el);
      return this.template = _.template(WEATHER.Templates.Map);
    },
    render: function() {
      return this.el.html(this.template());
    },
    postRender: function() {
      var map, mapOptions;
      mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(this.model.geoLocation.coords.latitude, this.model.geoLocation.coords.longitude),
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        panControl: false,
        streetViewControl: false,
        mapTypeControl: false
      };
      map = new google.maps.Map(this.el.find("#map")[0], mapOptions);
      return google.maps.event.addListenerOnce(map, "idle", function() {
        return $("#overlay").show();
      });
    }
  });

}).call(this);
