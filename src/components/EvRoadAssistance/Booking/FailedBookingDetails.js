import React, { useEffect, useState } from 'react';
import styles from './chargerbooking.module.css'
import BookingDetailsHeader from '../../SharedComponent/Details/BookingDetails/BookingDetailsHeader.jsx'
import BookingLeftDetails from '../../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import { postRequestWithToken } from '../../../api/Requests.js';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useNavigate } from 'react-router-dom';

const ChargerBookingDetails = () => {
    const userDetails                         = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                            = useNavigate()
    const { requestId }                       = useParams()
    const [bookingDetails, setBookingDetails] = useState()

    const fetchDetails = () => {
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            booking_id : requestId
        };
        postRequestWithToken('failed-road-assistance-details', obj, (response) => {
            if (response.code === 200) {
                setBookingDetails(response?.data || {});
            } else {
                console.log('error in RSA Failed API', response);
            }
        });
    };
    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
            return;
        }
        fetchDetails();
    }, [requestId]);

    const headerTitles = {
        bookingIdTitle       : "Booking ID",
        customerDetailsTitle : "Customer Details",
    };
    const content = {
        bookingId       : bookingDetails?.request_id,
        customerId      : bookingDetails?.rider_id,
        createdAt       : moment(bookingDetails?.created_at).format('DD MMM YYYY hh:mm A'),
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
        bookingStatus : 'Payment Not Received',
        price         : bookingDetails?.price ? `${ ( bookingDetails?.price / 100).toFixed(2) } AED` : '0 AED',
        vehicle        : bookingDetails?.vehicle_data,
        address: (
            <a
                href    = {`https://www.google.com/maps?q=${bookingDetails?.pickup_latitude},${bookingDetails?.pickup_longitude}`}
                target    = "_blank"
                rel       = "noopener noreferrer"
                className = 'linkSection'
            >
                { bookingDetails?.pickup_address || 'View on Map' }
            </a>
        ),
        parkingNumber : bookingDetails?.parking_number,
        parkingFloor  : bookingDetails?.parking_floor,
    }
    return (
        <div className='main-container'>
            <BookingDetailsHeader content={content} titles={headerTitles} sectionContent={sectionContent1}
                type='failedportableChargerBooking'
            />
            <div className={styles.bookingDetailsSection}>
                <BookingLeftDetails titles={sectionTitles1} content={sectionContent1}
                    type='portableChargerBooking' 
                />
            </div>
        </div>
    )
}

export default ChargerBookingDetails