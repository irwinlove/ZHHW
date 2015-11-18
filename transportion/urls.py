from django.conf.urls import url

urlpatterns = [
    # Examples:
    # url(r'^$', 'ZHHW.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^$', 'transportion.views.home', name='transportion_index'),
    url(r'^ajax/$', 'transportion.views.get_tree', name='ajax_tree'),
    url(r'^map/$', 'transportion.views.get_map', name='map'),
]
