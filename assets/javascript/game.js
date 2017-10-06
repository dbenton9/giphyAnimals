 // Initial array of movies
      var animals = ["fox","bear","tiger","panda"];

      // Function for dumping the JSON content for each button into the div
      function displayMovieInfo() {

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IHDrt3x12gKmwAh5Nt1Lyqyiz1jF3pTQ";
        var animal = "&q=" + $(this).attr("data-name");
        var gifNumber = "&limit=" + 1;


        $.ajax({
          url: queryURL + animal + gifNumber,
          method: "GET"
        }).done(function(response) {
          $("#animals-window").text(JSON.stringify(response));
          console.log(response);
          renderButtons();
        });
      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("movie");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();

        // Adding the animal from the textbox to our array
        animals.push(animal);
        console.log(animals)

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Function for displaying the movie info
      // Using $(document).on instead of $(".movie").on to add event listenersto dynamically generated elements
      $(document).on("click", ".movie", displayMovieInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();