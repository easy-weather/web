@WEATHER =
  Views:
    Sections: {}
    Modals: {}
    
  Models: {}
  Collections: {}
  Data: {}
  Utils: {}
  Templates: {}

templates = ["conditions", "forecast", "forecastDay", "loading", "app", "map"]

_.each templates, (template) ->
  updateStorage = true
  storageResponse = localStorage.getItem("Template" + template)
  storageResponseTime = localStorage.getItem("Template" + template + "Time")

  if storageResponse and storageResponseTime
    timeDifference = new Date().getTime() - storageResponseTime

    if timeDifference < 86400000
      updateStorage = false
      window.WEATHER.Templates[template] = storageResponse
      
  if updateStorage
    $.ajax
      url: "assets/tpl/" + template + ".html"
      async: false
      dataType: "text"
      success: (data) ->
        window.WEATHER.Templates[template] = data
        localStorage.setItem "Template" + template, data
        localStorage.setItem "Template" + template + "Time", new Date().getTime()
