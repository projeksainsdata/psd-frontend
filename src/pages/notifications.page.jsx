import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { filterPaginationData } from "../common/filter-pagination-data";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import NoDataMessage from "../components/nodata.component";
import NotificationCard from "../components/notification-card.component";
import LoadMoreDataBtn from "../components/load-more.component";

const Notifications = () => {
    const { 
        userAuth, 
        userAuth: { access_token, new_notification_available }, 
        setUserAuth 
    } = useContext(UserContext);

    const [filter, setFilter] = useState("all");
    const [notifications, setNotifications] = useState(null);

    const filters = ["all", "like", "comment", "reply", "saved"];

    // Fungsi untuk mengambil data notifikasi dari API
    const fetchNotifications = ({ page, deletedDocCount = 0 }) => {
        axios
            .post(
                import.meta.env.VITE_SERVER_DOMAIN + "/notifications",
                { page, filter, deletedDocCount },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .then(async ({ data: { notifications: data } }) => {
                if (new_notification_available) {
                    setUserAuth({ ...userAuth, new_notification_available: false });
                }

                let formatedData = await filterPaginationData({
                    state: notifications,
                    data,
                    page,
                    countRoute: "/all-notifications-count",
                    data_to_send: { filter },
                    user: access_token,
                });

                setNotifications(formatedData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Fungsi untuk menghapus semua notifikasi
    const handleClearAllNotifications = () => {
        if (window.confirm("Are you sure you want to clear all notifications?")) {
            axios
                .delete(`${import.meta.env.VITE_SERVER_DOMAIN}/notifications/clear-all`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                .then(() => {
                    setNotifications({ results: [], totalDocs: 0 });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    // Fungsi untuk mengatur filter
    const handleFilter = (e) => {
        const btn = e.target;
        setFilter(btn.innerHTML);
        setNotifications(null); // Reset notifikasi saat filter diubah
    };

    useEffect(() => {
        if (access_token) {
            fetchNotifications({ page: 1 });
        }
    }, [access_token, filter]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="max-md:hidden">Recent Notifications</h1>
                <button
                    className="bg-red text-base text-white py-2 px-4 rounded-md hover:bg-red-700 flex items-center gap-2"
                    onClick={handleClearAllNotifications}
                >
                    <i className="fi fi-rr-trash text-base" />
                    Hapus Semua Notifikasi
                </button>
            </div>


            {/* Tombol Filter */}
            <div className="my-8 flex gap-3">
                {filters.map((filterName, i) => {
                    return (
                        <button
                            key={i}
                            className={`py-2 ${filter === filterName ? "btn-dark" : "btn-light"}`}
                            onClick={handleFilter}
                        >
                            {filterName}
                        </button>
                    );
                })}
            </div>

            {/* Daftar Notifikasi */}
            {notifications == null ? (
                <Loader />
            ) : (
                <>
                    {notifications.results.length ? (
                        notifications.results.map((notification, i) => {
                            return (
                                <AnimationWrapper key={i} transition={{ delay: i * 0.08 }}>
                                    <NotificationCard
                                        data={notification}
                                        index={i}
                                        notificationState={{ notifications, setNotifications }}
                                    />
                                </AnimationWrapper>
                            );
                        })
                    ) : (
                        <NoDataMessage message="Nothing available" />
                    )}

                    {/* Tombol untuk memuat lebih banyak notifikasi */}
                    <LoadMoreDataBtn
                        state={notifications}
                        fetchDataFun={fetchNotifications}
                        additionalParam={{ deletedDocCount: notifications.deletedDocCount }}
                    />
                </>
            )}
        </div>
    );
};

export default Notifications;
