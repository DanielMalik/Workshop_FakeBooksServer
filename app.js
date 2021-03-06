$(document).ready(function () {
console.log("jQuery OK");

function main() {

    $.ajax(
		{
			url: "http://127.0.0.1:8000/book/"
		}
	)
		.done(
		function (json) {


		    for (var i = 0; i < json.length; i ++) {
            var $section = $("#book-list").detach();
            var $bookTitle = $("<p>", {"data-id": json[i].id, class: "book-title"});

            var $div = $("<div>");
            var $button = $("<button>", {"data-id": json[i].id, class: "button-more btn btn-secondary"});
            var $buttonDel = $("<button>", {"data-id": json[i].id, class: "button-delete btn btn-danger"});
            $button.text("Show Publisher");
            $buttonDel.text("Delete this book");
            var $bookAuthor = $("<p>");
            var $div2 = $("<div class='book-title'>");
            var $div3 = $("<div class='book-publisherInfo'>");

			$bookTitle.html("<strong>" + json[i].title + "</strong>");
			$bookAuthor.html(json[i].author);

            $div2.append($bookTitle);
            $div2.append($bookAuthor);
            //$div2.append($button);


            $div.append($div2);
            $div.append($button);
            $div.append($buttonDel);
            $div.append($div3);
            //$div.append($buttonDel);

            $div.attr("id", json[i].id);
			$section.append($div);

			$("h2#books-title").after($section);


		        }
		    }
		);

	};


main();

$('body').on("click", ".button-more", function(event) {

    var self = this;
    console.log(event.target);

    $.ajax(
                    {
		        url: "http://127.0.0.1:8000/book/" + $(this).data("id") + "/",
                type: "GET"
                }
		    ).done(
		    function(json) {

		    console.log(json.title);
		    self = $(self).next();
		    $(self).next().empty();
		    var p1 = $("<p>");
		    var p2 = $("<p>");
		    p1.text("ISBN: " + json.isbn);
		    $(self).next().append(p1);
		    p2.text("Publisher: " + json.publisher);
		    $(self).next().append(p2);
		    $(self).next().slideToggle(1200);




		    }
		    )

});


$("form").on("submit", function(e) {


    console.log(e.target);

    var $newTitle = $("input").eq(0).val();
    console.log($newTitle);
    var $newAuthor = $("input").eq(1).val();
    console.log($newAuthor);
    var $newISBN = $("input").eq(2).val();
    console.log($newISBN);
    var $newPublisher = $("input").eq(3).val();
    console.log($newPublisher);
    var $newGenre = $("select").val();
    console.log($newGenre);

    var isOK = true;


    if ($newTitle.length < 1  && $newAuthor.length < 1  && $newPublisher.length < 1) {
        isOK = false;

        alert("Form error. Text inputs too short.");

        }

    if (isOK == false) {
    e.preventDefault();


    }
	else if (isOK == true) {
	    $.ajax(
	    {

	    url:  "http://127.0.0.1:8000/book/",
	    type: "POST",
	    data: {'author': $newAuthor, 'title': $newTitle, 'isbn': $newISBN, 'publisher': $newPublisher, 'genre': $newGenre},
        //success: function(){ alert("book adaed"); },
        //error: function(){ alert("error");}
	    }
	    )
	    .done(
	    function(json) {

         alert("Book added");
	    }
	    )
		}

});

$('body').on("click", ".button-delete", function(event) {

    var self = this;
    console.log(event.target);

    $.ajax(
                    {
		        url: "http://127.0.0.1:8000/book/" + $(this).data("id") + "/",
                type: "DELETE",

                }
		    ).done(
		    function(json) {

		    console.log("book deleted");
            window.setTimeout(function(){location.reload()},1500);



		    }
		    )

});


	});


