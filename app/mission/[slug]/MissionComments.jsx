import useUserStore from "@/app/stores/userStore";
import CommentTextbox from "./CommentTextbox";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import useCursorStore from "@/app/stores/cursorStore";
import getMissionComments from "@/app/api-calls/get-mission-comments";
import Dropdown from "@/app/global-components/Dropdown";
import toggleLike from "@/app/api-calls/toggle-like";
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

  const [comments, setComments] = useState([]);
  const [cursorId, setCursorId] = useState(null);
  const [cursorSortId, setCursorSortId] = useState(null);

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
    }
  };

  if (!mission) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <ClipLoader
          color={"#4ade80"}
          loading={true}
          // cssOverride={override}
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
          {mission.commentCount} Comments
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
      <CommentTextbox />
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
    </div>
  );
}
