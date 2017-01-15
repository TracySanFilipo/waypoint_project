navigator.geolocation.getCurrentPosition(whereareyou)

var currentlatitudes = 40.712784;
var currentlongitudes = -74.005941;

function whereareyou(positioncurrent) {
    var todisect = positioncurrent.coords
    currentlatitudes = todisect.latitude
    currentlongitudes = todisect.longitude
    console.log(currentlongitudes)
    console.log(currentlatitudes)
}

function shelterList(){
        $.getJSON("/api/shelters/").done(function(results){
            var source = $("#handlebarsTest").html();
            var template = Handlebars.compile(source);
            var html = template(results.results);
            $('#shelterResults').append(html);
        })
}
shelterList()


function getDistance(address,id){
    var splitAddress = address.split(' ')
    var joinAddress = splitAddress.join('+')
    var ronald = currentlatitudes + ',' + currentlongitudes
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
