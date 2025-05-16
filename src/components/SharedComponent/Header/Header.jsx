import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import Notification from "../../../assets/images/Notification.svg";
import DefaultProfileIcon from "../../../assets/images/Profile.svg";
import { Link, useLocation  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import {postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';

const Header = () => {
  const navigate                                  = useNavigate();
  const userDetails                               = JSON.parse(sessionStorage.getItem('userDetails'));
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen]           = useState(false);
  const [userImage, setUserImage]                 = useState(DefaultProfileIcon);
  const [notifications, setNotifications]         = useState([]);
  const [totalPages, setTotalPages]               = useState(1);
  const [totalCount, setTotalCount]               = useState(0);
  const location                                  = useLocation();
  const isActive                                  = location.pathname === '/profile';

  // Refs to track dropdown containers
  const notificationRef = useRef(null);
  const profileRef      = useRef(null);

    const fetchList = (page = 1) => {
        const obj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            page_no : page,
            // ...appliedFilters,
        };
        postRequestWithToken('notification-list', obj, async (response) => {
            if (response.code === 200) {
                setNotifications(response?.data);
                // setTotalPages(response?.total_page || 1);
                // setTotalCount(response?.totalRows || 0)  href_url
            } else {
                console.log('error in notification-list api', response);
            }
        });
    };

    const getNotificationCount = () => {
        const objCount = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            page_no : 1,
            getCount : 1
        };
        postRequestWithToken('notification-list', objCount, async (response) => {
            if (response.code === 200) {
                setTotalCount(response?.totalRows || 0) //totalRows
            } 
        });
    };

    useEffect(() => {
        const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
        if (userDetails?.image) {
            const baseUrl = userDetails?.base_url;
            const img     = userDetails?.image;
            const imgPath = `${baseUrl}${img}`;
            setUserImage(imgPath);
        }
        const interval = setInterval(getNotificationCount, 120000);
        return () => clearInterval(interval);
    }, []);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if ( notificationRef.current && !notificationRef.current.contains(event.target) ) {
                setNotificationOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Toggle functions
    const toggleNotification = () => {
        fetchList()
        setTotalCount(0)
        setNotificationOpen(!isNotificationOpen);
        setProfileOpen(false);
    };
    const toggleProfile = () => {
        setProfileOpen(!isProfileOpen);
        setNotificationOpen(false);
    };
    const handleLogout = () => {
        sessionStorage.removeItem("userDetails");
        navigate("/login");
    };
    const extractIdFromUrl = (hrefUrl) => {
        const parts = hrefUrl.split("/");
        return parts[1] || ""; 
    };
    const handleNavigate = (module, hrefUrl) => {
        const extractedId = extractIdFromUrl(hrefUrl); 

        switch (module) {  
        case "Discussion Board":
            navigate(`/discussion-board-details/${extractedId}`);
            break;

        case "Charging Installation Service":
            navigate(`/charger-installation/charger-installation-details/${extractedId}`);
            break;
        
        case "Portable Charging Booking":
            navigate(`/portable-charger/charger-booking-details/${extractedId}`);
            break;   

        case "Charging Service":
            navigate(`/pick-and-drop/booking-details/${extractedId}`);
            break;   
        
        case "Roadside Assistance":
            navigate(`/ev-road-assistance/booking-details/${extractedId}`);
            break;   

        case "Notifications":
            navigate(`/notifications/${extractedId}`);
            break;

        default:
            console.log("Unhandled module:", module, hrefUrl);
        }
    };
    return (
        <div className={styles.headerContainer}>
            <div 
                className={styles.notificationContainer}
                onClick={toggleNotification}
                ref={notificationRef} // Attach ref to notification container
            >
                <div className="position-relative">
                    <img src={Notification} alt="Notification" /> 
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        { totalCount ? totalCount : ''}
                    </span>
                </div>
                {isNotificationOpen && (
                <div className={styles.notificationDropdown}>
                    <div className={styles.notificationSection}>
        
                    {notifications.slice(0, 5).map((notification) => {
                        const formattedTime = moment(notification.created_at).format('hh:mm A');
                        const formattedDate = moment(notification.created_at).format('DD-MM-YYYY');

                        return (
                        <div className={styles.notificationContent} key={notification.id} onClick={() => handleNavigate(notification.module_name, notification.href_url)}>
                            <div className={styles.notificationContentsection}>
                            <div className={styles.notificationTitle}>{notification.heading}</div>
                            <div className={styles.notificationText}>{notification.description}</div>
                            </div>
                            <div className={styles.notificationDate}>
                            <span className={styles.notificationTime}>
                                {formattedTime} <br /> {formattedDate}
                            </span>
                            </div>
                        </div>
                        );
                    })}

                    </div>
                    <div className={styles.notificationBottomSection}>
                    <div className={styles.notificationCount}>
                        {notifications.length} Notifications
                    </div>
                    <Link to="/notification-list">
                        <div className={styles.notificationAllList}>See All</div>
                    </Link>
                    </div>
                </div>
                )}
            </div>
            {/* Profile Section */}
            <div className={styles.profileContainer} onClick={toggleProfile} ref={profileRef} >
                <img src={userImage} className={styles.profileImage} alt='img' />
                {/* Profile Dialog Section */}
                { isProfileOpen && (
                    <div className={styles.profileDropdown}>
                        <Link to="/profile">
                            <div
                                className={`${styles.profileDropdownOption} ${isActive ? styles.profileDropdownOptionSelected : ''}`}
                            >
                                <CgProfile className={`${styles.ImgContainer} ${isActive ? styles.activeImgBorder : ''}`} />
                                <p>Profile</p>
                            </div>
                        </Link>
                        <div className={`${styles.profileDropdownsOption}`} onClick={handleLogout} >
                            <RiLogoutCircleLine className={styles.ImgContainer} />
                            <p>Logout</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
