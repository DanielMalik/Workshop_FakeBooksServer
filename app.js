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
            var $bookAuthor = $("<p>");

            var $div = $("<div>");
            var $button = $("<button>", {"data-id": json[i].id, class: "button-more"});
            $button.text("Show Publisher");
            var $div2 = $("<div class='book-title'>");
            var $div3 = $("<div class='book-publisherInfo'>");

			$bookTitle.html("<strong>" + json[i].title + "</strong>");
			$bookAuthor.html(json[i].author);

            $div2.append($bookTitle);
            $div2.append($button);
            $div2.append($bookAuthor);

            $div.append($div2);
            $div.append($button);
            $div.append($div3);

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
	});

