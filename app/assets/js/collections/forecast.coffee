class WEATHER.Collections.Forecast extends Backbone.Collection.extend(
  StorageName: "Forecast"
  model: WEATHER.Models.Forecast
  url: "http://keepiteasy.net:3001/forecast/"
  debug: false

  initialize: (options) ->
    @url += options.lat + "/" + options.long
    @url += "/jumpCache"  if options.jumpCache
    @debug = options.debug  if options.debug

  parse: (response) ->
    if Modernizr.localstorage and not @debug
      updateStorage = true
      storageResponse = localStorage.getItem(@StorageName)
      storageResponseTime = localStorage.getItem(@StorageName + "Time")

      if storageResponse and storageResponseTime
        timeDifference = new Date().getTime() - storageResponseTime
        updateStorage = false  if timeDifference < 3600000

      if updateStorage
        localStorage.setItem @StorageName, JSON.stringify(response)
        localStorage.setItem @StorageName + "Time", new Date().getTime()

    response

  sync: (method, model, options) ->
    forceServer = true
    options.dataType = "jsonp"

    switch method
      when "create"
        return Backbone.sync(method, model, options)
      when "update"
        return Backbone.sync(method, model, options)
      when "delete"
        return Backbone.sync(method, model, options)

    if Modernizr.localstorage and not @debug
      storageResponse = localStorage.getItem(@StorageName)
      storageResponseTime = localStorage.getItem(@StorageName + "Time")

      if storageResponse and storageResponseTime
        timeDifference = new Date().getTime() - storageResponseTime

        if timeDifference < 43200000
          forceServer = false
          options.success JSON.parse(storageResponse)

    Backbone.sync method, model, options  if forceServer
)
