import React, { useEffect, useState } from 'react';
import List from '../../../SharedComponent/List/List';
import styles from '../ShopList/addshoplist.module.css'
import Edit from '../../../../assets/images/Pen.svg';
import Delete from '../../../../assets/images/Delete.svg';
import ModalAssign from '../../../SharedComponent/BookingDetails/ModalAssign.jsx'
import SubHeader from '../../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../../SharedComponent/Pagination/Pagination'
import { postRequestWithToken } from '../../../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from "../../../SharedComponent/Loader/Loader";
import EmptyList from '../../../SharedComponent/EmptyList/EmptyList.jsx';

const dynamicFilters = [
    // { label: 'Brand Name', name: 'search', type: 'text' },
]

const addButtonProps = {
    heading: "Add Brand", 
    link: "/add-shop-list"
};

const BrandList = () => {
    const userDetails                            = JSON.parse(sessionStorage.getItem('userDetails')); 
    const navigate                               = useNavigate();
    const [brandList, setBrandList]              = useState([]);
    const [currentPage, setCurrentPage]          = useState(1);
    const [totalPages, setTotalPages]            = useState(1);
    const [totalCount, setTotalCount]            = useState(1);
    const [filters, setFilters]                  = useState({start_date: null,end_date: null});
    const [refresh, setRefresh]                  = useState(false);
    const [selectedBrandId, setSelectedBrandId]  = useState(null);
    const [showPopup, setShowPopup]              = useState(false);
    const [name, setName]                        = useState("");
    const [loading, setLoading]                  = useState(false);
    const searchTerm = [
        {
            label: 'search', 
            name: 'search_text', 
            type: 'text'
        }
    ]

    const handleEditClick = (brandId, name) => {
        setSelectedBrandId(brandId);
        setName(name)
        console.log(brandId,name);
        setShowPopup(true); 
      };
    
      const handleClosePopup = () => {
        setShowPopup(false); 
        setSelectedBrandId(null);
        setName(null)
      };
    
      const handleNameChange = (e) => {
        setName(e.target.value); 
      };
    
      const handleConfirmEdit = () => {
        if (!name.trim()) {
            toast("Please enter a name.", {type:'error'})
            return;
          }
       
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            brand_id   : selectedBrandId,
            brand_name : name
        };
    
        postRequestWithToken('shop-brand-update', obj, async (response) => {
            if (response.code === 200) {
                toast(response.message, {type:'success'})
                    setTimeout(() => {
                        fetchList(currentPage, filters);
                    }, 1500);
                setShowPopup(false);
                setSelectedBrandId(null);
                setName(null)
            } else {
                toast(response.message, {type:'error'})
                console.log('error in shop-brand-update api', response);
            }
        });
        
      };

      const handleDeleteBrand = (brandId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this?");
        if (confirmDelete) {
            const obj = { 
                userId   : userDetails?.user_id,
                email    : userDetails?.email,
                brand_id : brandId 
            };
            postRequestWithToken('shop-brand-delete', obj, async (response) => {
                if (response.code === 200) {
                    setRefresh(prev => !prev);
                    toast(response.message, { type: "success" });
                } else {
                    toast(response.message, { type: 'error' });
                    console.log('error in shop-brand-delete api', response);
                }
            });
        }
    };

    const fetchList = (page, appliedFilters = {}) => {
        if (page === 1 && Object.keys(appliedFilters).length === 0) {
            setLoading(false);
        } else {
            setLoading(true);
        }

        const obj = {
            userId : userDetails?.user_id,
            email : userDetails?.email,
            page_no : page,
            ...appliedFilters,
        }

        postRequestWithToken('shop-brand-list', obj, async(response) => {
            if (response.code === 200) {
                setBrandList(response?.data)
                setTotalPages(response?.total_page || 1); 
                setTotalCount(response?.total || 1)
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in shop-brand-list api', response);
            }
            setLoading(false);
        })
    }

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

    return (
        <div className='main-container'>
             <ToastContainer />
            <SubHeader heading = "Ev Specialized Shop Brand List"
                fetchFilteredData={fetchFilteredData} 
                dynamicFilters={dynamicFilters} filterValues={filters}
                addButtonProps={addButtonProps}
                searchTerm = {searchTerm}
                count = {totalCount}
                modalTitle = 'Store Brand'
                setRefresh = {setRefresh}
                apiEndPoint = 'shop-brand-create'
                nameKey = 'brand_name'
            />

            {loading ? <Loader /> : 
                brandList?.length === 0 ? (
                    <EmptyList
                        tableHeaders={["Brand ID", "Brand Name", "Action",""]}
                        message="No data available"
                    />
                ) : (
                <>
                    <List 
                        tableHeaders={["Brand ID", "Brand Name", "Action",""]}
                        listData = {brandList}
                        keyMapping={[
                        { key: 'brand_id', label: 'Brand ID' }, 
                        { key: 'brand_name', label: 'Brand Name' }, 
                        {
                            key: 'action',
                            label: 'Action',
                            relatedKeys: ['brand_id'], 
                            format: (data, relatedKeys) => {
                                return (
                                    <div className='listAction'>
                                        <img 
                                            src={Edit} 
                                            alt="edit" 
                                            onClick={() => {
                                                handleEditClick(data.brand_id, data.brand_name);
                                            }} 
                                        />
                                        <img 
                                            src={Delete} 
                                            alt="delete" 
                                            onClick={() => {
                                                handleDeleteBrand(data.brand_id);
                                            }} 
                                        />
                                    </div>
                                );
                            }
                        } 
                        ]}
                        pageHeading="Shop Brand List"
                    />
                    
                    <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={handlePageChange} 
                    />
                </>
            )}

            {showPopup && (
                <ModalAssign
                    isOpen={showPopup}
                    onClose={handleClosePopup}
                    onAssign={handleConfirmEdit}
                    buttonName = 'Submit'
                >
                    <div className="modalHeading">Store brand</div>
                    <input
                        id="name"
                        placeholder="Brand Name"
                        className="modal-textarea"
                        rows="4"
                        value={name} 
                        onChange={handleNameChange}
                                
                    />
                </ModalAssign>
                
            )}
        </div>
    );
};

export default BrandList;
