export default function CommentBoard({loading, comments, handleDelete}) {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h1 className="text-3xl font-bold text-customDarkGreen mb-6">All Comments</h1>

        {loading ? (
            <p>Loading comments...</p>
        ) : (
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p>No comments available</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment._id} className="p-4 bg-customYellow rounded-lg shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{comment.username}</p>
                                    <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                                </div>
                                <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
                                    Rating: {comment.rating}
                                </span>
                            </div>
                            <p className="mt-2 text-gray-800">{comment.comment}</p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleDelete(comment._id, comment.recipeId)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Delete
                                </button>
                                <a
                                    href={`/recipes/${comment.recipeId}`} // Dynamically set link using `recipeId`
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    View Recipe
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )}
    </div>
    )
    
}