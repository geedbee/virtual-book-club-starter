async function LoadReviews(){
    const response = await fetch('reviews.json');
    const data = await response.json();
    console.log(data);
    for (d of data){
        CreateReviewElement(d, false);
    }
}

function HandleReviewSubmit(event){
    event.preventDefault();
    let newReview = {
        title: "",
        reviewText: "",
        rating: 0,
        likes: 0,
        reposts: 0,
    };
    newReview.title = document.getElementById("book-title").value;
    newReview.reviewText = document.getElementById("review-text").value;
    newReview.rating = document.getElementById("rating").value;
    CreateReviewElement(newReview, true);
    event.target.reset();
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    LoadReviews();
    document.getElementById("review-form").addEventListener("submit", function(event) {
        HandleReviewSubmit(event);
    });
});

function CreateReviewElement(review, isFirst){
    let reviewItem = document.createElement("div");
    reviewItem.classList.add("review-item");
    reviewItem.innerHTML = `
        <h3>${review.title}</h3>
        <p>${review.reviewText}</p>
        <p>${review.rating}</p>
        <button data-id=${review.id} data-hasLiked=${false} onclick="ToggleLike(event)">Like (${review.likes})</button>
        <button data-id=${review.id} onclick="RepostReview(event)">Repost (${review.reposts})</button>
        `;
    if (isFirst){
        document.getElementById("reviews-list").prepend(reviewItem);
    }
    else{
        document.getElementById("reviews-list").appendChild(reviewItem);
    }
}

function ToggleLike(event){
    if (event.srcElement.dataset.hasliked === "false"){
        const originalString = event.srcElement.textContent;
        const matches = originalString.match(/\d+/);
        const likes = parseInt(matches[0]);
        event.srcElement.textContent = `Liked (${likes + 1})`;
        event.srcElement.dataset.hasliked = "true";
    }
    else {
        const originalString = event.srcElement.textContent;
        const matches = originalString.match(/\d+/);
        const likes = parseInt(matches[0]);
        event.srcElement.textContent = `Like (${likes - 1})`;
        event.srcElement.dataset.hasliked = "false";
    }
}

function RepostReview(event){
    const originalString = event.srcElement.textContent;
    const matches = originalString.match(/\d+/);
    const reposts = parseInt(matches[0]);
    event.srcElement.textContent = `Repost (${reposts + 1})`;
}
