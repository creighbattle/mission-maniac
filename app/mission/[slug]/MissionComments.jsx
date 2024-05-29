import useUserStore from "@/app/stores/userStore";
import CommentTextbox from "./CommentTextbox";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import getMissionComments from "@/app/api-calls/get-mission-comments";
import Dropdown from "@/app/global-components/Dropdown";
import Comment from "./Comment";
import { fetchUserAttributes } from "aws-amplify/auth";
import DeleteCommentModal from "./DeleteCommentModal";
import deleteComment from "@/app/api-calls/delete-comment";
import Notification from "@/app/global-components/Notification";
import useNotificationStore from "@/app/stores/notificationStore";

export default function MissionComments() {
  const { mission } = useUserStore();

  const { setNTitle, setNMessage, setShowNotification, setNError } =
    useNotificationStore();
  const [sortOption, setSortOption] = useState("Likes");
  const sortOptions = ["Likes", "Oldest", "Newest"];
  const [error, setError] = useState("");
  const [deleteCommentError, setDeleteCommentError] = useState("");
  const [username, setUsername] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [missionCommentCount, setMissionCommentCount] = useState(0);

  const [comments, setComments] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (mission?.mission_comments) {
      setMissionCommentCount(parseInt(mission?.mission_comments));
    }
  }, [mission]);

  useEffect(() => {
    if (mission) {
      getMissionComments({
        firstCall: true,
        missionId: mission.mission_id,
        cursorId,
        cursorSortId,
        setCursorId,
        setCursorSortId,
        setComments,
        comments,
        sortOption,
        setError,
        setLoading: setCommentsLoading,
      });
    }
  }, [sortOption, mission]);

  useEffect(() => {
    handleUsername();
  }, []);

  const handleUsername = async () => {
    try {
      const userAttributes = await fetchUserAttributes();
      setUsername(userAttributes.preferred_username);
    } catch (error) {}
  };

  const handleCommentDelete = async () => {
    const response = await deleteComment({
      commentId,
      setLoading,
      setError: setDeleteCommentError,
    });

    if (response) {
      setDeleteModalOpen(false);
      setNError(false);
      setNTitle("Comment Deleted");
      setNMessage("Your comment has been deleted successfully");
      setShowNotification(true);
      setComments(
        comments.filter((comment) => comment.comment_id !== commentId)
      );
      setCommentId(null);
      setDeleteCommentError("");
      setMissionCommentCount(missionCommentCount - 1);
    }
  };

  const handleButtonClick = async () => {
    setLoadMore(true);
    await getMissionComments({
      firstCall: false,
      missionId: mission.mission_id,
      cursorId,
      cursorSortId,
      setCursorId,
      setCursorSortId,
      setComments,
      comments,
      sortOption,
      setError,
      setLoading: setCommentsLoading,
    });

    setLoadMore(false);
  };

  if (!mission) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <ClipLoader
          color={"#4ade80"}
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <DeleteCommentModal
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        handleCommentDelete={handleCommentDelete}
        loading={loading}
        error={deleteCommentError}
      />

      <Notification />
      <div className="flex items-center justify-between">
        <p className="text-white text-lg font-semibold">
          <span className="text-green-400">{missionCommentCount}</span>{" "}
          {missionCommentCount == "1" ? "Comment" : "Comments"}
        </p>
        <label htmlFor="" className="text-white text-lg font-semibold">
          Sort By:
          <Dropdown
            option={sortOption}
            setOption={setSortOption}
            options={sortOptions}
            right={true}
          />
        </label>
      </div>
      <CommentTextbox
        comments={comments}
        setComments={setComments}
        setMissionCommentCount={setMissionCommentCount}
        missionCommentCount={missionCommentCount}
      />

      {commentsLoading && (
        <div className="w-full flex items-center justify-center mt-10">
          <ClipLoader
            color="#4ade80"
            loading={commentsLoading}
            size={75}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {!comments.length && !commentsLoading && (
        <div className="flex items-center justify-center mt-10">
          <p className="text-green-400">There aren&apos;t any comments yet.</p>
        </div>
      )}

      <ul role="list" className="divide-y divide-gray-100 px-0">
        {comments?.map((comment, idx) => {
          return (
            <Comment
              key={idx}
              comment={comment}
              username={username}
              setDeleteModalOpen={setDeleteModalOpen}
              setCommentId={setCommentId}
            />
          );
        })}
      </ul>

      {cursorId && !loading && (
        <div className="w-full flex  mt-4">
          <button
            className="relative inline-flex items-center rounded-md bg-white  px-3 py-3  font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={handleButtonClick}
          >
            {!loadMore ? (
              "Load More"
            ) : (
              <ClipLoader
                color={"black"}
                loading={loadMore}
                size={25}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
