function initAutocomplete() {
    var ufa = {lat: 54.7355, lng: 55.991982};
    var map = new google.maps.Map(document.getElementById('map'), {
      center: ufa,
      zoom: 12
    }); 

    function point(map, name, lat, long, text, img) {
      var marker;

      this.name = ko.observable(name);
      this.lat = ko.observable(lat);
      this.long = ko.observable(long);
      this.text = ko.observable(text);
      this.img = ko.observable(img);

      var infowindow = new google.maps.InfoWindow({
        position: new google.maps.LatLng(lat, long),
        content: "<strong>" + name + "</strong>" + "<br>" + text + "<br>" + img
      });

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
        title: name,
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
      });

      this.isVisible = ko.observable(false);
      this.isVisible.subscribe(function(currentState) {
        if (currentState) {
          marker.setMap(map);
        } else {
          marker.setMap(null);
        }
      });

      this.isVisible(true);

      marker.addListener('click', function() {
        infowindow.open(map, marker);
        console.log(marker.title);
      });
    }

    var viewModel = function() {
      var self = this;
      self.points = ko.observableArray([
        new point(map, 'Aviation University', 54.725494, 55.941314),
        new point(map, 'Guest Yard', 54.724807, 55.944055),
        new point(map, 'Kashkadan Park', 54.773513, 56.060225),
        new point(map, 'Yakutova Park', 54.741144, 55.951269, "This is a park"),
        new point(map, 'Lala Tulpan Mosque', 54.819552, 56.05573),
        new point(map, 'City Council', 54.770293, 56.020652),
        new point(map, 'Bashkir Drama Theater', 54.718773, 55.940926),
        new point(map, 'Salavat Ulayev Park', 54.716619, 55.92667),
        new point(map, 'Tatar Drama Theater', 54.748657, 56.019359),
        new point(map, 'Victory Park', 54.81438, 56.057187),
        new point(map, 'Congress Hall', 54.721032, 55.928579),
        new point(map, 'White House', 54.716501, 55.940882),
        new point(map, 'Friendship Monument', 54.712937, 55.963894),
        new point(map, 'Bashkir State University', 54.720188, 55.93605),
        new point(map, 'Ballet & Opera Theater', 54.722521, 55.944974)
      ]);

      self.query = ko.observable("");
      self.listPoints = ko.observableArray([]);
      self.markerPoints = ko.observableArray([]);

      self.filterPoints = ko.computed(function() {
        var search = self.query().toLowerCase();
        return ko.utils.arrayFilter(self.points(), function(point) {
          var doesMatch = point.name().toLowerCase().indexOf(search) >= 0;
          point.isVisible(doesMatch);
          return doesMatch;
        });
      });

      self.openInfoWindow = function(point) {
        self.infowindow.open(map, marker);
        console.log(marker.title);
      };
      self.removePoint = function(point) {
        self.listPoints.remove(point);
        self.markerPoints.remove(point);
      }
      self.addPoint = function(point) {
        self.listPoints.push(point);
        self.markerPoints.push(point);
        console.log(listPoints);
      }
    };

    ko.applyBindings(new viewModel());
}
