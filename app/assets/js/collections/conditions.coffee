class WEATHER.Collections.Conditions extends Backbone.Collection.extend(
  StorageName: "Conditions"
  model: WEATHER.Models.Conditions
  url: "http://54.245.106.49:5000/conditions/"
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

        if timeDifference < 3600000
          forceServer = false
          options.success JSON.parse(storageResponse)

    Backbone.sync method, model, options  if forceServer
)