import React, { useEffect, useState } from 'react';
import List from '../../SharedComponent/List/List';
import SubHeader from '../../SharedComponent/SubHeader/SubHeader';
import Pagination from '../../SharedComponent/Pagination/Pagination';
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';
import { AiOutlinePlus } from 'react-icons/ai';  
import AddDriver from '../../../assets/images/AddDriver.svg';
import Edit from '../../../assets/images/Pen.svg';
import Cancel from '../../../assets/images/Cancel.svg';
import Delete from '../../../assets/images/Delete.svg';
import View from '../../../assets/images/ViewEye.svg'
import ModalAssign from '../../SharedComponent/BookingDetails/ModalAssign.jsx'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Custommodal from '../../SharedComponent/CustomModal/CustomModal.jsx';
import Loader from "../../SharedComponent/Loader/Loader";
import EmptyList from "../../SharedComponent/EmptyList/EmptyList";

    const statusMapping = {
        'CNF' : 'Booking Confirmed',
        'A'   : 'Assigned',
        'ER'  : 'Enroute',
        'RL'  : 'POD Reached at Location',
        'CS'  : 'Charging Started',
        'CC'  : 'Charging Completed',
        'PU'  : 'Completed',
        'C'   : 'Cancelled',
        'RO'  : 'POD Reached at Office',
        'PNR' : 'Payment Not Received',
    };
    const dynamicFilters = [
        {
            label : 'Status', 
            name  : 'status', 
            type  : 'select', 
            options : [
                { value : '',    label : 'Select Status' },
                { value : 'CNF', label : 'Booking Confirmed' },
                { value : 'A',   label : 'Assigned' },
                { value : 'ER',  label : 'Enroute' },
                { value : 'RL',  label : 'POD Reached at Location' },
                { value : 'CS',  label : 'Charging Started' },
                { value : 'CC',  label : 'Charging Completed' },
                { value : 'PU',  label : 'Completed' },
                { value : 'RO',  label : 'POD Reached at Office' },
                { value : 'C',   label : 'Cancelled' },
            ]
        },
    ];
    const searchTerm = [
        {
            label: 'search', 
            name: 'search_text', 
            type: 'text'
        }
    ]

const RoadAssistanceBookingList = () => {
    const userDetails                                 = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate                                    = useNavigate();
    const [chargerBookingList, setChargerBookingList] = useState([]);
    const [rsaList, setRsaList]                       = useState([])
    const [currentPage, setCurrentPage]               = useState(1);
    const [totalPages, setTotalPages]                 = useState(1);
    const [filters, setFilters]                       = useState({start_date: null,end_date: null});
    const [isModalOpen, setIsModalOpen]               = useState(false);
    const [selectedBookingId, setSelectedBookingId]   = useState(null);
    const [selectedDriverId, setSelectedDriverId]     = useState(null);
    const [selectedRiderId, setSelectedRiderId]       = useState(null);
    const [refresh, setRefresh]                       = useState(false)
    const [showPopup, setShowPopup]                   = useState(false);
    const [reason, setReason]                         = useState("");
    const [loading, setLoading]                       = useState(false);

    const handleCancelClick = (bookingId, riderId) => {
        setSelectedBookingId(bookingId);
        setSelectedRiderId(riderId)
        setShowPopup(true); 
    };
    const handleClosePopup = () => {
        setShowPopup(false); 
        setSelectedBookingId(null);
        setSelectedRiderId(null)
        setReason("");
    };
    const handleReasonChange = (e) => {
        setReason(e.target.value); 
    };
    const handleRoadAssistanceBookingDetails = (id) => navigate(`/ev-road-assistance/booking-details/${id}`)
    const handleConfirmCancel = () => {
        if (!reason.trim()) {
            toast("Please enter a reason for cancellation.", {type:'error'})
            return;
        }
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            request_id : selectedBookingId,
            rider_id   : selectedRiderId,
            reason     : reason
        };
        postRequestWithToken('ev-road-assistance-cancel-booking', obj, async (response) => {
            if (response.code === 200) {
                toast(response.message, {type:'success'})
                    setTimeout(() => {
                        fetchList(currentPage, filters);
                    }, 1500);
                setShowPopup(false);
                setSelectedBookingId(null);
                setSelectedRiderId(null)
                setReason("");
            } else {
                toast(response.message, {type:'error'})
                console.log('error in charger-booking-list api', response);
            }
        });
        
    };

    const fetchList = (page, appliedFilters = {}) => {
        if (page === 1 && Object.keys(appliedFilters).length === 0) {
            setLoading(false);
        } else {
            setLoading(true);
        } 
        const obj = {
            userId  : userDetails?.user_id,
            email   : userDetails?.email,
            page_no : page,
            // service_type: 'Portable Charger',
            ...appliedFilters,
        };

        postRequestWithToken('ev-road-assistance-booking-list', obj, async (response) => {
            if (response.code === 200) {
                setChargerBookingList(response?.data);
                setTotalPages(response?.total_page || 1);
            } else {
                console.log('error in ev-road-assistance-booking-list', response);
            }
            setLoading(false);
        });
        obj.service_type = 'Roadside Assistance'
        postRequestWithToken('all-rsa-list', obj, async(response) => {
            if (response.code === 200) {
                setRsaList(response?.data)
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in rsa-listt api', response);
            }
        })
    };

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
            return;
        }
        fetchList(currentPage, filters);
    }, [currentPage, filters, refresh]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const fetchFilteredData = (newFilters = {}) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };
    const openModal = (bookingId) => {
        setSelectedBookingId(bookingId);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBookingId(null);
    };
    const handleDriverSelect = (driver) => {
        setSelectedDriverId(driver);
    };
    const assignDriver = () => {
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            rsa_id     : selectedDriverId, 
            booking_id : selectedBookingId
        }
        postRequestWithToken('/ev-road-assistance-assign', obj, async(response) => {

            if (response.code === 200) {
                
                toast(response.message[0], {type:'success'})
                setIsModalOpen(false);
                setTimeout(() => {
                    fetchList(currentPage, filters);
                }, 2000);
            } else {
                toast(response.message[0], {type:'error'})
                // alert(response.message || response.message[0])
                console.log('error in/ev-road-assistance-assign', response);
            }
        })
    }
    return (
        <div className='main-container'>
            <SubHeader
                heading="Ev Road Assitance Booking List"
                fetchFilteredData={fetchFilteredData}
                dynamicFilters={dynamicFilters}
                filterValues={filters}
                searchTerm = {searchTerm}
            />
            <ToastContainer />

            {loading ? <Loader /> :          
                chargerBookingList.length === 0 ? (
                    <EmptyList
                        tableHeaders={["Booking Date", "Booking ID", "Customer Name", "Price", "Status", "Driver Name", "Driver Assign", "Action",""]}
                        message="No data available"
                    />
                ) : (
                <>
                    <List
                        tableHeaders={["Booking Date", "Booking ID", "Customer Name", "Price", "Status", "Driver Name", "Driver Assign", "Action",""]}
                        listData={chargerBookingList}
                        keyMapping={[
                            { key: 'created_at', label: 'Date & Time', format: (date) => moment(date).format('DD MMM YYYY hh:mm A') },
                            { key: 'request_id', label: 'Order ID' },
                            { key: 'name', label: 'Customer Name' },
                            { key: 'price', label: 'Price', format: (price) => (price ? `AED ${price}` : '') },
                            { key: 'order_status', label: 'Status', format: (status) => statusMapping[status] || status },
                            { key: 'rsa_name', label: 'Driver Name' }, 
                            {
                                key         : 'driver_assign',
                                label       : 'Driver Assign',
                                relatedKeys : ['order_status'], 
                                format      : (data, key, relatedKeys) => {
                                    const isBookingConfirmed = ['CNF', 'A'].includes(data[relatedKeys[0]]);
                                    
                                    return isBookingConfirmed ? (
                                        <img 
                                            src={AddDriver} 
                                            className={"logo"} 
                                            onClick={() => openModal(data.request_id)} 
                                            alt="Assign Driver" 
                                        />
                                    ) : null;
                                }
                            },
                            {
                                key: 'action',
                                label: 'Action',
                                relatedKeys: ['order_status'], 
                                format: (data, key, relatedKeys) => {
                                    const isCancelable = !['C', 'PU', 'RO'].includes(data[relatedKeys[0]]);
                                    return (
                                        <div className="editButtonSection">
                                            {/* View Button (Always Displayed) */}
                                            <img 
                                                src={View} 
                                                alt="view" 
                                                onClick={() => handleRoadAssistanceBookingDetails(data.request_id)}
                                                className="viewButton"
                                            />
                                        
                                        {isCancelable && (
                                            <>
                                                <img 
                                                    src={Cancel} 
                                                    alt="Cancel" 
                                                    onClick={() => handleCancelClick(data.request_id, data.rider_id)} 
                                                    className="viewButton" 
                                                />
                                            </>
                                        )}
                                        </div>
                                    );
                                }
                            }                            
                        ]}
                        pageHeading="Ev Road Assitance Booking List"
                    />
                    {/* onBookingConfirm={handleConfirm} */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
            <Custommodal
                isOpen={isModalOpen}
                onClose={closeModal}
                driverList={rsaList}
                bookingId = {selectedBookingId}
                onSelectDriver={handleDriverSelect}
                onAssignDriver={assignDriver}
            />

            {showPopup && (
                <ModalAssign
                    isOpen={showPopup}
                    onClose={handleClosePopup}
                    onAssign={handleConfirmCancel}
                    buttonName='Submit'
                >
                    <div className="modalHeading">Reason for Cancellation</div>
                    <textarea
                        id="reason"
                        placeholder="Enter reason"
                        className="modal-textarea"
                        rows="4"
                        value={reason} 
                        onChange={handleReasonChange}
                                
                    />
                </ModalAssign>
            )}
        </div>
    );
};


export default RoadAssistanceBookingList;