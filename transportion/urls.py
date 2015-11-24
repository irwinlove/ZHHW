from django.conf.urls import url

urlpatterns = [
    # Examples:
    # url(r'^$', 'ZHHW.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', 'transportion.views.home', name='transportion_index'),
    url(r'^ajax/$', 'transportion.views.get_tree', name='ajax_tree'),
    url(r'^map/$', 'transportion.views.get_map', name='map'),
    url(r'^realTimeLocator/$', 'transportion.views.get_realTimeLocator', name='realTimeLocator'),
    url(r'^allTimeLocator/$', 'transportion.views.get_allTimeLocator', name='allTimeLocator'),
    url(r'^tracks/$', 'transportion.views.get_tracks', name='tracks'),
    url(r'^trackHistory/$', 'transportion.views.get_trackHistory', name='trackHistory'),
    # url(r'^tracks/$', 'transportion.views.get_tracks', name='tracks'),
]
