$ ->
  AppRouter = Backbone.Router.extend
    routes:
      "": "home"
      forecast: "forecast"
      conditions: "conditions"

    home: ->
      @appModel.on "geoLocationFound", (->
        forecast = new WEATHER.Collections.Forecast(
          lat: @appModel.geoLocation.coords.latitude
          long: @appModel.geoLocation.coords.longitude
        )

        conditions = new WEATHER.Collections.Conditions(
          lat: @appModel.geoLocation.coords.latitude
          long: @appModel.geoLocation.coords.longitude
        )

        @appModel.activeView = new WEATHER.Views.Conditions(model: conditions)
        @appModel.secondView = new WEATHER.Views.Forecast(model: forecast)

        @appModel.activeView.model.fetch success: =>
          @appView.render()

        @appModel.secondView.model.fetch success: =>
          @appView.renderSecondView()

      ), this

    conditions: ->
      @appModel.on "geoLocationFound", (->
        collection = new WEATHER.Collections.Conditions(
          lat: @appModel.geoLocation.coords.latitude
          long: @appModel.geoLocation.coords.longitude
        )

        @appModel.activeView = new WEATHER.Views.Conditions(model: collection)
        appView = @appView

        @appModel.activeView.model.fetch success: ->
          appView.render()

      ), this

    forecast: ->
      @appModel.on "geoLocationFound", (->
        collection = new WEATHER.Collections.Forecast(
          lat: @appModel.geoLocation.coords.latitude
          long: @appModel.geoLocation.coords.longitude
        )
        @appModel.activeView = new WEATHER.Views.Forecast(model: collection)
        @appModel.activeView.model.on "reset", ->

        appView = @appView

        @appModel.activeView.model.fetch success: ->
          appView.render()

      ), this

    initialize: ->
      @appModel = new WEATHER.Models.App()

      if navigator.geolocation
        @appModel.activeView = new WEATHER.Views.Loading()
        appModel = @appModel

        navigator.geolocation.getCurrentPosition (pos) ->
          appModel.geoLocation = pos
          appModel.trigger "geoLocationFound"
      else
        @appModel.noGeoLocation = true

      @appView = new WEATHER.Views.App(
        model: @appModel
        appDelegate: this
      )

      @appView.render()
      $("body").html @appView.el

  new AppRouter()
  Backbone.history.start()