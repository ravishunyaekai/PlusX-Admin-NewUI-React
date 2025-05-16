import React, { useEffect, useState } from 'react';
import styles from './roadassistance.module.css'
import BookingDetailsHeader from '../../SharedComponent/Details/BookingDetails/BookingDetailsHeader'
import BookingLeftDetails from '../../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import BookingDetailsAccordion from '../../SharedComponent/BookingDetails/BookingDetailsAccordion.jsx'
import { postRequestWithToken } from '../../../api/Requests';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';

const statusMapping = {
    'PNR' : 'Payment Not Received',
    'CNF': 'Booking Confirmed',
    'A'  : 'Assigned',
    'ER' : 'Enroute',
    'RL' : 'POD Reached at Location',
    'CS' : 'Charging Started',
    'CC' : 'Charging Completed',
    'PU' : 'POD Picked Up',
    'VP' : 'Vehicle Pickup',
    'RS' : 'Reached Charging Spot',
    'WC' : 'Work Completed',
    'DO' : 'Drop Off',
    'C'  : 'Cancel',
    'RO' : 'POD Reached at Office',
};

const RoadAssistanceBookingDetails = () => {
    const userDetails                         = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                            = useNavigate()
    const { requestId }                       = useParams()
    const [bookingDetails, setBookingDetails] = useState()
    const [history, setHistory]               = useState([])
    const [feedBack, setFeedBack]             = useState()

    const fetchDetails = () => {
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            request_id : requestId
        };
        postRequestWithToken('ev-road-assistance-booking-details', obj, (response) => {
            if (response.code === 200) {
                setBookingDetails(response?.data?.booking || {});
                setHistory(response?.data?.history);
                setFeedBack(response?.data?.feedBack);
            } else {
                console.log('error in rider-details API', response);
            }
        });
    };
    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
            return;
        }
        fetchDetails();
    }, []);

    const headerTitles = {
        bookingIdTitle       : "Booking ID",
        customerDetailsTitle : "Customer Details",
        driverDetailsTitle   : "Driver Details",
    };
    let rsa_data  = (bookingDetails?.rsa_data != null) ? bookingDetails?.rsa_data.split(",") : [];
    const content = {
        bookingId       : bookingDetails?.request_id,
        customerId      : bookingDetails?.rider_id,
        createdAt       : moment(bookingDetails?.created_at).format('DD MMM YYYY h:mm A'),
        driverName      : rsa_data ? rsa_data[0] : '',
        driverContact   : rsa_data ? rsa_data[1] : '',
        podId           : bookingDetails?.pod_id,
        podName         : bookingDetails?.pod_name,
        // custBookingCount : bookingDetails?.cust_booking_count || 0,
        customerName    : bookingDetails?.name,
        customerContact : `${bookingDetails?.country_code} ${bookingDetails?.contact_no}`,
        imageUrl        : bookingDetails?.imageUrl,
    };
    const sectionTitles1 = {
        bookingStatus : "Booking Status",
        price         : "Price",
        vehicle       : "Vehicle",
        address       : "Address",
        parkingNumber : "Parking No.",
        parkingFloor  : "Parking Floor",
    }
    const sectionContent1 = {
        bookingStatus : statusMapping[bookingDetails?.order_status] || bookingDetails?.order_status,
        price         : bookingDetails?.price,
        vehicle        : bookingDetails?.vehicle_data,
        address : (
            <a
                href    = {`https://www.google.com/maps?q=${bookingDetails?.pickup_latitude},${bookingDetails?.pickup_longitude}`}
                target    = "_blank"
                rel       = "noopener noreferrer"
                className = 'linkSection'
            >
                {bookingDetails?.pickup_address || 'View on Map'}
            </a>
        ),
        parkingNumber : bookingDetails?.parking_number,
        parkingFloor  : bookingDetails?.parking_floor,
    }
    return (
        <div className='main-container'>
            <BookingDetailsHeader content={content} titles={headerTitles} sectionContent={sectionContent1}
                type='evRoadAssitanceBooking' feedBack={feedBack}
            />
            <div className={styles.bookingDetailsSection}>
                <BookingLeftDetails titles={sectionTitles1} content={sectionContent1}
                    type='evRoadAssitanceBooking' />
                <BookingDetailsAccordion history={history} rsa={content} />
            </div>
        </div>
    )
}

export default RoadAssistanceBookingDetails