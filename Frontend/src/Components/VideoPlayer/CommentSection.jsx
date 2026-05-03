import React from 'react'

const CommentSection = ({videoId}) => {
    return (
        <div className="bg-black border p-3 rounded-xl">
            <h3 className="mb-3 font-semibold">Comments</h3>

            {[...Array(20)].map((_, i) => (
                <div key={i} className="mb-3 border-b border-zinc-700 pb-2">
                    <p className="text-sm font-semibold">User {i}</p>
                    <p className="text-sm text-zinc-300">
                        This is a comment...
                    </p>
                </div>
            ))}
        </div>
    )
}

export default CommentSection