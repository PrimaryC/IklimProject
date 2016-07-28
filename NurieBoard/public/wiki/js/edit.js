$(document).ready(function () { 
        $('#form').submit(function(event) {
            event.preventDefault();
            // for (var i = 0; i < str.length; i++) {
                // str[i].trim().replace(/ /gi,'_');
            // };
            // alert(str);
            // $("#tags").val(str.toString());
            // console.log($("#tags").val());
            // console.log("success!");
            // alert(str);
            // alert(str[1]);
            var url = '/wiki/we/';
            console.log($("#title").text())
            console.log($("#input").val())
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    key: $("#title").text(),
                    doc: $("#input").val(),
                    permission: "user"
            },success: function(data){
                // alert("data : "+ data + "\nStatus :" + status);
                var targetURL = "http://127.0.0.1:8080/wiki/w/" + $("#title").text();
                console.log(targetURL);
                window.location.replace(targetURL)
            }
        });
    });
});