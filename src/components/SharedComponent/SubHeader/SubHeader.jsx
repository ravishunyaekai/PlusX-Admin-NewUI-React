import React, { useState } from 'react';
import styles from './subheader.module.css';
import Plus from '../../../assets/images/Plus.svg';
import Filter from '../../../assets/images/Filter.svg';
import Search from '../../../assets/images/Search.svg';
import Download from '../../../assets/images/Download.svg'
import SearchAccordion from '../Accordion/SearchAccodion';
import AccordionFilter from '../Accordion/Accordions';
import { Link } from 'react-router-dom';
import FormModal from '../CustomModal/FormModal';
import ModalAssign from '../BookingDetails/ModalAssign'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { postRequestWithToken } from '../../../api/Requests';

const SubHeader = ({ heading, fetchFilteredData, dynamicFilters, filterValues, addButtonProps, searchTerm, count, modalTitle, setRefresh,apiEndPoint, nameKey, setDownloadClicked, handleDownloadClick, scheduleDateChange, scheduleFilters, areaOptions, areaSelected, handleArea }) => {

    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));

    const [isSearchAccordionOpen, setIsSearchAccordionOpen] = useState(false);
    const [isFilterAccordionOpen, setIsFilterAccordionOpen] = useState(false);
    const [showPopup, setShowPopup]                         = useState(false);
    const [name, setName]                                   = useState("");

    const handleAddClick = () => {
        setShowPopup(true); 
    };
    const handleClosePopup = () => {
        setShowPopup(false); 
        setName("");
    };
    const handleReasonChange = (e) => {
        setName(e.target.value); 
    };
    const handleConfirmAdd = () => {
        if (!name.trim()) {
            toast("Please enter name.", {type:'error'})
            return;
        }
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            [nameKey]  : name
        };
        postRequestWithToken(apiEndPoint, obj, async (response) => {
            if (response.code === 200) {
                toast(response.message, {type:'success'})
                    setTimeout(() => {
                        setRefresh(prev => !prev);
                    }, 1500);
                setShowPopup(false);
            } else {
                toast(response.message, {type:'error'})
                console.log(`Error in ${apiEndPoint} API`, response);
            }
        });
    };
    const toggleSearchAccordion = () => {
        setIsSearchAccordionOpen(!isSearchAccordionOpen);
        setIsFilterAccordionOpen(false);
    };

    const toggleFilterAccordion = () => {
        setIsFilterAccordionOpen(!isFilterAccordionOpen);
        setIsSearchAccordionOpen(false);
    };
    // shouldShowFilterButtonArr = "Portable Charger Slot List", "Pick & Drop Time Slot List",  
    const shouldShowFilterButtonArr = [  "Offer List", "Time Slot List" , "Register Interest List","Ev Buy & Sell List","Portable Charger List",'Ev Specialized Shop List', "Ev Specialized Shop Service List", "Ev Specialized Shop Brand List","Ev Insurance List", "Ev Discussion Board List", "Ev Rider Clubs List" , "Charger Installation List", "Notification List", "Electric Cars Leasing List", "Electric Bikes Leasing List", "EV Guide List" ]
    const shouldShowFilterButton = !shouldShowFilterButtonArr.includes(heading)

    const shouldShowSearchButtonArr = [ "Ev Road Assistance Invoice List" , "Pick & Drop Invoice List", "Notification List", "Ev Buy Sell List", "Offer List", "Pick & Drop Time Slot List","Portable Charger Slot List" ,"Time Slot List"]
    const shouldShowSearchButton = !shouldShowSearchButtonArr.includes(heading)

    const shouldShowAddButtonArr = ["App Signup List", "Portable Charger Booking List", "Pick & Drop Booking List", "Portable Charger Invoice List", "Notification List", "Pick & Drop Invoice List", "Charger Installation List", "Ev Road Assitance Booking List","Road Assistance Invoice List", "Board List", "Insurance List", "Buy Sell List", "Interest List","Subscription List", "EV Pre-Sale Testing Booking List", "Ev Road Assistance Invoice List", "Ev Discussion Board List","Ev Insurance List", "Ev Buy & Sell List", "Register Interest List", "Customer POD Booking List", "Failed POD Booking List", "Failed Pick & Drop Booking List", "Deleted Account List", "Failed RSA Booking List"] ;
        
    const shouldShowDownloadButtonArr = ["App Signup List", "Portable Charger Booking List",];
    const shouldShowDownloadButton = shouldShowDownloadButtonArr.includes(heading)

    const shouldShowAddButton = !shouldShowAddButtonArr.includes(heading);
    const cardArray = [ "App Signup List", "Portable Charger Booking List", "Offer List", "Subscription List", "Coupon List", "Register Interest List", "Ev Buy & Sell List", "Ev Specialized Shop List", "Ev Insurance List", "Ev Discussion Board List", "Ev Rider Clubs List", "EV Guide List", "Electric Bikes Leasing List", "Electric Cars Leasing List", "Public Chargers List", "Failed POD Booking List", "Failed Pick & Drop Booking List", "Deleted Account List", "Failed RSA Booking List"]

    const showCard = cardArray.includes(heading);
    const headingArray = [ "Drivers List",  "Portable Charger List", "Portable Charger Invoice List", "Portable Charger Slot List", "Pick & Drop Booking List", "Pick & Drop Invoice List", "Pick & Drop Time Slot List", "Charger Installation List", "Notification List", "EV Pre-Sale Testing Booking List", "Time Slot List", "Ev Road Assistance Invoice List", "Ev Specialized Shop Service List", "Ev Specialized Shop Brand List", "Ev Road Assitance Booking List", "Add POD List", "POD Brand List", "POD Device List","POD Area List", "Customer POD Booking List", "Partners List", "Truck List"]

    const showHeading = headingArray.includes(heading);  // "Portable Charger Booking List",

    // const handleDownloadClick = () => {
    //     setDownloadClicked(true)
    //     console.log('filyerValues', filterValues);
    //     console.log('dynamicFilters', dynamicFilters);
    //     console.log('fetchFilteredData', fetchFilteredData);
        
    // }

    return (
        <div className={styles.subHeaderContainer}>
            <div className={styles.headerCharger}>
                { showHeading && (
                    <div className={styles.headingList}>{heading} </div>
                )}
                {showCard && (
                    <div className={styles.headCardSection}>
                        <div className={styles.headCardNumber}>{count || 0}</div>
                        <div className={styles.headCardText}>Total {heading}</div>
                    </div>
                )}
                <div className={styles.subHeaderButtonSection}>
                    {shouldShowAddButton && (
                        (heading === "Ev Specialized Shop Brand List" || heading === "Ev Specialized Shop Service List") ? (
                            <div className={styles.addButtonSection} 
                            onClick={handleAddClick}
                            >
                                <div className={styles.addButtonImg}>
                                    <img src={Plus} alt='plus' />
                                </div>
                                <div className={styles.addButtonText}>{addButtonProps?.heading}</div>
                            </div>
                        ) : (
                            <Link to={addButtonProps?.link}>
                                <div className={styles.addButtonSection}>
                                    <div className={styles.addButtonImg}>
                                        <img src={Plus} alt='plus' />
                                    </div>
                                    <div className={styles.addButtonText}>{addButtonProps?.heading}</div>
                                </div>
                            </Link>
                        )
                    )}

                    {/* Search Button */}
                    {shouldShowSearchButton && (
                        <div className={styles.addButtonSection} onClick={toggleSearchAccordion}>
                            <div className={styles.addButtonImg}>
                                <img src={Search} alt='Search' />
                            </div>
                            <div className={styles.addButtonText}>Search</div>
                        </div>
                    )}

                    {/* Filter Button */}
                    {shouldShowFilterButton && (
                        <div className={styles.addButtonSection} onClick={toggleFilterAccordion}>
                            <div className={styles.addButtonImg}>
                                <img src={Filter} alt='Filter' />
                            </div>
                            <div className={styles.addButtonText}>Filter</div>
                        </div>
                    )}
                    
                    {/* Download Button */}
                    {shouldShowDownloadButton && (
                        <div className={styles.addButtonSection} onClick={handleDownloadClick}>
                            <div className={styles.addButtonImg}>
                                <img src={Download} alt='Download' />
                            </div>
                            <div className={styles.addButtonText} >Download</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Render SearchAccordion when isSearchAccordionOpen is true */}
            {isSearchAccordionOpen && (
                <SearchAccordion
                    type={heading}
                    isOpen={isSearchAccordionOpen}
                    fetchFilteredData={fetchFilteredData}
                    searchTerm={searchTerm}
                    filterValues={filterValues}
                />
            )}

            {isFilterAccordionOpen && (
                <AccordionFilter
                    type={heading}
                    isOpen={isFilterAccordionOpen}
                    fetchFilteredData={fetchFilteredData}
                    dynamicFilters={dynamicFilters}
                    filterValues={filterValues}
                    scheduleDateChange={scheduleDateChange}
                    scheduleFilters={scheduleFilters}
                    areaOptions={areaOptions}
                    areaSelected={areaSelected}
                    handleArea={handleArea}
                />
            )}

            {showPopup && (
                <ModalAssign
                    isOpen={showPopup}
                    onClose={handleClosePopup}
                    onAssign={handleConfirmAdd}
                    buttonName = 'Submit'
                >
                    <div className="modalHeading">{modalTitle}</div>
                    <input
                        id="name"
                        placeholder={modalTitle}
                        className="modal-textarea"
                        value={name} 
                        onChange={handleReasonChange}
                                
                    />
                </ModalAssign>
                
            )}
        </div>
    );
};

export default SubHeader;

