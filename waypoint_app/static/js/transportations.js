navigator.geolocation.getCurrentPosition(whereareyou)

var currentlatitudet = 40.712784;
var currentlongitudet = -74.005941;

function whereareyou(positioncurrent) {
    var todisect = positioncurrent.coords
    currentlatitudet = todisect.latitude
    currentlongitudet = todisect.longitude
    console.log(currentlongitudet)
    console.log(currentlatitudet)
}

function transportationList(){
        $.getJSON("/api/transportations/").done(function(results){
            var source = $("#handlebarsTest").html();
            var template = Handlebars.compile(source);
            var html = template(results.results);
            $('#transportationResults').append(html);
        })
}
transportationList()


function getDistance(city,id){
    var splitAddress = city.split(' ')
    var joinAddress = splitAddress.join('+')
    var ronald = currentlatitudet + ',' + currentlongitudet
    console.log(ronald)
    // return joinAddress
    $.getJSON("https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="+ronald+"&destinations="+joinAddress).done(function(results){
        var distance = results['rows'][0]['elements'][0]['distance'].text
        $("#dist" + id).html(distance)
    })
}




Handlebars.registerHelper("showDistance", function(address, id) {
    console.log(address)
    getDistance(address, id)
    // console.log(distance)
    // return distance
})
