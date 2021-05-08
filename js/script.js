// https:api.nytimes.com/svc/topstories/v2/{section}.{response-format}?api-key={your-api-key}
// for more information: see developer.nytimes.com/docs/top_stories_api/#h2-examples

$(document).ready(function(){
	// Juan's nyt API key 
	var api_key = "PPxwuSWzsGSRQYh7YMfJgWVeW8cOvqe8"; 	
		
	// url to the API for nyt
	var url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + api_key; 

    // change section
    $('#section').change(function(){
        $('#message').html("<h1 class=\"red\">Refreshing...</h1>"); 
        url = "https://api.nytimes.com/svc/topstories/v2/" + $(this).val() + ".json?api-key=" + api_key;
        updateStories();

        var interval = setInterval(function(){
            console.log("complete");
            $('#refresh').removeAttr("disabled");
            $('#message').html('');
            clearInterval(interval);
        }, 3000); 
    }); 

    // refresh page
    $('#refresh').click(function(){
        $(this).attr("disabled","disabled");
        $('#message').html("<h1 class=\"red\">Refreshing...</h1>"); 
        updateStories();
        $(this).removeAttr("disabled"); 

        var interval = setInterval(function(){
            console.log("complete");
            $('#refresh').removeAttr("disabled");
            $('#message').html('');
            clearInterval(interval);
        }, 3000); 
    }); 

    function updateStories(){
            $('#refresh').attr("disabled","disabled");

            // variables
            var stories = $('#stories');
            var img_url = "";
            var caption = "";
            var title = "";
            var width = "";
            var height = "";
            var story_url = "";
            var byline = "";
            var section = "";
            var abstract = "";
            var shortDate = "";
            var output = "";

    fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            // work with JSON data here
            var num_results = data.num_results;
            console.log(num_results); 

            for (var i = 0; i < num_results; i++) {
                output += "<div class=\"story\">";
                shortDate = moment(data.results[i].published_date.substring(0, 10)).format("MMMM D, YYYY");
               
                if (data.results[i].hasOwnProperty('multimedia')) {
                    if (data.results[i].multimedia.length > 0) {
                        if (data.results[i].multimedia[0].hasOwnProperty('url')) {
                            img_url = data.results[i].multimedia[0].url;
                            caption = data.results[i].multimedia[0].caption;
                            title = data.results[i].multimedia[0].title;
                            width = data.results[i].multimedia[0].width;
                            height = data.results[i].multimedia[0].height;
                            image = "<img class=\"storypic\" src=\"" + img_url + "\" alt=\"" + caption + "\" title=\"" + title + "\" width=\"" + width + "\" height=\"" + height + "\" />";
                        } 
                    } else {
                        image = "<img class=\"storypic\" src=\"https://placehold.it/75/75/dadada?text=NYT\" alt=\"placeholder image\" title=\"title\" width=\"75\" height=\"75\" />";
                    } 
                    // JSON data
                    title = data.results[i].title;
                    story_url = data.results[i].url;
                    byline = data.results[i].byline;
                    section = data.results[i].section;
                    abstract = data.results[i].abstract;
                        
                    // outputs
                    output += "<div class=\"headline\"><a href=\"" + story_url + "\">" + title + "</a></div>";
                    output += "<div>" + image + "</div>";
                    output += "<div class='byline'>" + byline + "</div>";
                    output += "<div class='shortdate'>" + shortDate + "</div>";
                    output += "<div>Section: " + section + "</div>";
                    output += "<div class=\"abstract\">" + abstract + "</div>";
                    output += "</div>"; 
                } 
            } 
            $('#stories').html(output).fadeIn('slow');
        })
        .catch((err) => {
            // do something for an error here
            console.log("ERROR");
        })
    };
    updateStories(); 
}); 
