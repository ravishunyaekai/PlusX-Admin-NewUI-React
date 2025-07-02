import React, { useEffect, useState } from 'react';
import styles from './appsign.module.css'
import DetailsHeader from '../SharedComponent/Details/DetailsHeader'
// import DetailsSection from '../SharedComponent/Details/DetailsSection'
import DetailsList from '../SharedComponent/Details/DetailsList'
import DetailsBookingHistory from '../SharedComponent/Details/DeatilsBookingHistory'
import DetailsVehicleList from '../SharedComponent/Details/DetailsVehicleList'
import { getRequestWithToken } from '../../api/Requests';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const statusMapping = {
    'CNF': 'Booking Confirmed',
    'A'  : 'Assigned',
    'ER' : 'Enroute',
    'RL' : 'POD Reached at Location',
    'CS' : 'Charging Started',
    'CC' : 'Charging Completed',
    'PU' : 'Completed',
    'C'  : 'Cancelled',
    'RO' : 'POD Reached at Office',
    'WC' : 'Work Completed',
};

const AppSignupDetails = () => {
    const userDetails                                           = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                                              = useNavigate()
    const {riderId}                                             = useParams()
    const [riderDetails, setRiderDetails]                       = useState()
    const [riderAddressList, setRiderAddressList]               = useState([])
    const [vehicleList, setVehicleList]                         = useState([])
    const [portableChargerBookings, setPortableChargerBookings] = useState([])
    const [pickAndDropBookings, setPickAndDropBookings]         = useState([])
    // const [chargerRsaList, setChargerRsaList]                   = useState([])
    // const [valetRsaList, setValetRsaList]                       = useState([])
    const [rsaBookings, setRsaBookings]                         = useState([])

    const portableChargerHeaders = ['Date','Booking ID', 'Price',  'Status', 'Assigned Driver', 'Vehicle Type', 'Action' ];
    const pickAndDropHeaders     = ['Date','Booking ID',  'Price',  'Status', 'Assigned Driver','Vehicle Type',  'Action'];

    const fetchDetails = () => {
        const obj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            riderId : riderId
        };
        getRequestWithToken('rider-details', obj, (response) => {
            if (response.code === 200) {
                setRiderDetails(response?.data || {});  
                setRiderAddressList(response?.data?.riderAddress)
                setVehicleList(response?.data?.riderVehicles)
                setPortableChargerBookings(response?.data?.portableChargerBookings)
                setPickAndDropBookings(response?.data?.pickAndDropBookings)
                setRsaBookings(response?.data?.rsaBookings)
            } else {
                console.log('error in rider-details API', response);
            }
        });
        obj.service_type = 'Portable Charger';
    };
    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
            return;
        }
        fetchDetails();
    }, []);
    return (
        <div className='main-container'>
            <DetailsHeader headerDetails = {riderDetails}/>
            {/* <DetailsSection sectionDetails = {riderDetails}/> */}
            <div className='Details-container-section'>
            <DetailsList addressList = {riderAddressList}/>
            <DetailsVehicleList vehicleList = {vehicleList} />
            <div className={styles.DetailsMainHeading}>Booking History</div>
                <DetailsBookingHistory
                    title="Portable Charger"
                    headers={portableChargerHeaders}
                    bookingData={portableChargerBookings.map((booking) => {
                        const vehicle = vehicleList.find(v => v.vehicle_id === booking.vehicle_id);
                        return {
                            id           : booking.booking_id,
                            rsa_name     : booking.rsa_name,
                            service_name : booking.service_name,
                            service_type : booking.service_type,
                            price        : `AED ${booking.service_price || '0'}`,
                            datetime     : moment(booking.created_at).format('DD MMM YYYY'),
                            status       : statusMapping[booking.status] || '',
                            vehicle_type : vehicle ? vehicle.vehicle_type : '', 
                        };
                    })}
                    bookingType="portableCharger"
                />
                <DetailsBookingHistory
                    title="Pick and Drop"
                    headers={pickAndDropHeaders}
                    bookingData={pickAndDropBookings.map((booking) => {
                        const vehicle = vehicleList.find(v => v.vehicle_id === booking.vehicle_id);
                        return {
                            id           : booking.request_id,
                            rsa_name     : booking.rsa_name,
                            price        : `AED ${booking.price || '0'}`,
                            datetime     : moment(booking.created_at).format('DD MMM YYYY'),
                            status       : statusMapping[booking.order_status] || '',
                            vehicle_type : vehicle ? vehicle.vehicle_type : '', 
                        };
                    })}
                    bookingType="pickAndDrop"
                    // valetRsaList = {valetRsaList}
                />
                <DetailsBookingHistory
                    title="Roadside Assistance"
                    headers={portableChargerHeaders}
                    bookingData={rsaBookings.map((booking) => {
                        const vehicle = vehicleList.find(v => v.vehicle_id === booking.vehicle_id);
                        return {
                            id           : booking.request_id,
                            rsa_name     : booking.rsa_name,
                            price        : `AED ${booking.price || '0'}`,
                            datetime     : moment(booking.created_at).format('DD MMM YYYY'),
                            status       : statusMapping[booking.order_status] || '',
                            vehicle_type : vehicle ? vehicle.vehicle_type : '', 
                        };
                    })}
                    bookingType="Roadside Assistance"
                />
            </div>
        </div>
    )
}
export default AppSignupDetails