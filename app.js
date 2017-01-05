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
            var $bookISBN = $("<p>");
            var $div = $("<div>");
            var $button = $("<button>", {"data-id": json[i].id, class: "button-more"});
            $button.text("Show Publisher");
            var $div2 = $("<div class='book-title'>");
            var $div3 = $("<div class='book-publisher'>");

			$bookTitle.html("<strong>" + json[i].title + "</strong>");
			$bookAuthor.html(json[i].author);
			$bookISBN.html(json[i].isbn);

            $div.append($bookTitle);
            $div.append($button);
            $div2.append($bookAuthor);
            $div2.append($bookISBN);
            $div.append($div2);
            $div.append($button);
            $div.append($div3);

            $div.attr("id", json[i].id);
			$section.append($div);

			$("h2#books-title").after($section);


		        }
		    }
		);
    }

main();

	});

