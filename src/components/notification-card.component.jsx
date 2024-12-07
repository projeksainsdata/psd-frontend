import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import { useContext, useState } from "react";
import NotificationCommentField from "./notification-comment-field.component";
import { UserContext } from "../App";
import axios from "axios";

const NotificationCard = ({ data, index, notificationState }) => {
    const [isReplying, setReplying] = useState(false);

    const {
        seen,
        type,
        reply,
        createdAt,
        comment,
        replied_on_comment,
        user,
        blog: { blog_id, title },
        _id: notification_id,
    } = data;

    const { 
        userAuth: { access_token } 
    } = useContext(UserContext);

    const { 
        notifications, 
        notifications: { results, totalDocs }, 
        setNotifications 
    } = notificationState;

    const fullname = user?.personal_info?.fullname || "Unknown User";
    const profileUsername = user?.personal_info?.username || "unknown";
    const profileImg = user?.personal_info?.profile_img || "/path/to/default-avatar.jpg";

    const handleReplyClick = () => {
        setReplying((prev) => !prev);
    };

    // Hapus notifikasi tertentu
    const handleDeleteNotification = (notificationId) => {
        axios
            .delete(`${import.meta.env.VITE_SERVER_DOMAIN}/notifications/${notificationId}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then(() => {
                // Hapus notifikasi dari state
                const updatedResults = results.filter((item) => item._id !== notificationId);
                setNotifications({
                    ...notifications,
                    results: updatedResults,
                    totalDocs: totalDocs - 1,
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className={"p-6 border-b border-grey border-l-black " + (!seen ? "border-l-2" : "")}>
            <div className="flex gap-5 mb-3">
                <img
                    src={profileImg}
                    className="w-14 h-14 flex-none rounded-full"
                    alt={`${profileUsername}'s profile`}
                />
                <div className="w-full">
                    <h1 className="font-medium text-xl text-dark-grey">
                        <span className="lg:inline-block hidden capitalize">{fullname}</span>
                        <Link to={`/user/${profileUsername}`} className="mx-1 text-black underline">
                            @{profileUsername}
                        </Link>
                        <span className="font-normal">
                            {type === "saved"
                                ? "saved your blog"
                                : type === "like"
                                ? "liked your blog"
                                : type === "comment"
                                ? "commented on"
                                : "replied on"}
                        </span>
                    </h1>
                    <Link
                        to={`/blog/${blog_id}`}
                        className="font-medium text-dark-grey hover:underline line-clamp-1"
                    >
                        {`"${title}"`}
                    </Link>
                </div>
            </div>

            {type !== "like" && comment && (
                <p className="ml-14 pl-5 font-gelasio text-xl my-5">{comment?.comment || "No comment provided"}</p>
            )}

            <div className="ml-14 pl-5 mt-3 text-dark-grey flex gap-8">
                <p>{getDay(createdAt)}</p>
                <button
                    className="underline hover:text-black"
                    onClick={() => handleDeleteNotification(notification_id)}
                >
                    <i className="fi fi-br-cross-small text-base text-red" />
                    Delete
                </button>
            </div>

            {isReplying && (
                <div className="mt-8">
                    <NotificationCommentField
                        _id={notification_id}
                        blog_author={user}
                        index={index}
                        replyingTo={comment?._id}
                        setReplying={setReplying}
                        notification_id={notification_id}
                        notificationData={notificationState}
                    />
                </div>
            )}
        </div>
    );
};

export default NotificationCard;
