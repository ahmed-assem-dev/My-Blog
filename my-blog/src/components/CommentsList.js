const CommentsList = ({ comments }) => {
  return (
    <>
      <h2 className="text-2xl">Comments</h2>
      {comments.map((comment) => {
        return (
          <div
            className="border-y ease-in duration-300 hover:border-[#222222] w-[50%] lg:w-[30%] h-[100px] p-5 m-2"
            key={comment.postedBy + comment.text}
          >
            <h4 className="text-xl font-mono">{comment.postedBy}</h4>
            <p className="indent-5 text-lg font-light tracking-wide">
              {comment.text}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default CommentsList;
