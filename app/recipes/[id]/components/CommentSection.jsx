export default function CommentSection({reviews, handleSubmit, errors, newRating, setNewRating, newComment, setNewComment,}) {
    
    // Render stars for the average rating
    const renderStars = (score) => {
      const numStars = Math.round(score);
      const stars = Array.from({ length: 5 }, (_, i) =>
        i < numStars ? "★" : "☆"
      );
  
      return (
        <div className="flex items-center space-x-1 text-customOrange">
          {stars.map((star, index) => (
            <span key={index} className="text-2xl">
              {star}
            </span>
          ))}
        </div>
      );
    };
  
    // Render interactive stars for user input
    const renderInteractiveStars = () => {
      const stars = Array.from({ length: 5 }, (_, i) =>
        i < newRating ? "★" : "☆"
      );
  
      return (
        <div className="flex items-center space-x-1 text-customOrange cursor-pointer">
          {stars.map((star, index) => (
            <span
              key={index}
              className="text-2xl"
              onClick={() => setNewRating(index + 1)} // Set the rating based on the star clicked
            >
              {star}
            </span>
          ))}
        </div>
      );
    };
  
    return (
      <div>
        <div className="mt-[50px]">
          
  
          {/* Average Rating */}
          <h2 className="flex items-center space-x-2">
            <span className="font-[700] font-serif text-[25px] my-2">Rating:</span>
            {reviews.length > 0 ? (
              renderStars(
                reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              )
            ) : (
              <span>No ratings yet</span>
            )}
          </h2>

          <h3 className="font-[700] font-serif text-[25px] my-2">Reviews</h3>
          <div className="border-b-1 border-customDarkGreen mb-5" />

          {/* Add Review Form */}
          <form onSubmit={handleSubmit} className="px-5">
            {errors && <p style={{ color: "red" }}>{errors}</p>}
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-lg">Rate us:</label>
              {renderInteractiveStars()} {/* Interactive stars for user input */}
            </div>
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Write comment..."
              />
            </div>
            <button
              type="submit"
              className="generalButton text-white font-bold text-base"
            >
              Submit
            </button>
          </form>
  
          <div className="border-b-1 border-customDarkGreen border-opacity-50 mt-6" />
          <h3 className="font-[700] font-serif text-[25px] my-2 mb-4">Comments</h3>
  
          {reviews.map((review) => (
            <div key={review._id} className="review mb-9 px-5">
              <p>
                <strong>{review.username || "Anonymous"}</strong>
              </p>

              <div className="flex items-center space-x-2 mb-4">
                {renderStars(review.rating)}
              </div>

              <p className="font-semibold">{review.comment}</p>
              <div className="border-b-1 border-customDarkGreen opacity-30 mt-3" />
            </div>
            
          ))}
        </div>
      </div>
    );
  }
  