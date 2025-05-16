import React, { useEffect, useState } from 'react';
import styles from './insurance.module.css';
import BookingDetailsHeader from '../SharedComponent/Details/BookingDetails/BookingDetailsHeader';
// import BookingDetailsSection from '../SharedComponent/Details/BookingDetails/BookingDetailsSection';
// import BookingImageSection from '../SharedComponent/Details/BookingDetails/BookingImageSection';
import BookingMultipleImages from '../SharedComponent/Details/BookingDetails/BookingMultipleImages.jsx';
import { postRequestWithToken } from '../../api/Requests';
import BookingLeftDetails from '../SharedComponent/BookingDetails/BookingLeftDetails.jsx'
import { useParams } from 'react-router-dom';
import moment from 'moment';
// import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const InsuranceDetails = () => {
  const userDetails                         = JSON.parse(sessionStorage.getItem('userDetails'));
  const navigate                            = useNavigate();
  const { insuranceId }                     = useParams();
  const [bookingDetails, setBookingDetails] = useState();
  const [imageGallery, setImageGallery]     = useState();
  const [baseUrl, setBaseUrl]               = useState();


  const fetchDetails = () => {
    const obj = {
      userId       : userDetails?.user_id,
      email        : userDetails?.email,
      insurance_id : insuranceId
    };

    postRequestWithToken('ev-insurance-detail', obj, (response) => {
      if (response.code === 200) {
        setBookingDetails(response?.data || {});
        // setImageGallery(response.galleryData)
        const vehicleRegImages = response?.data?.vehicle_registration_img ? response.data?.vehicle_registration_img?.split('*') : [];
        const carImages        = response?.data?.car_images ? response.data?.car_images?.split('*') : [];
        const carTyreImages    = response?.data?.car_type_image ? response.data?.car_type_image?.split('*') : [];
        const licenseImages    = response?.data?.driving_licence ? response.data?.driving_licence?.split('*') : [];
        const emiratesImages   = response?.data?.emirates_id ? response.data?.emirates_id?.split('*') : [];

        setImageGallery({
          vehicleRegImages,
          carImages,
          tyreImages: carTyreImages,
          licenseImages,
          emiratesImages,
        });
        setBaseUrl(response.base_url)
      } else {
        console.log('error in ev-insurance-detail API', response);
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
    bookingIdTitle       : "Insurance ID",
    customerDetailsTitle : "Customer Details",
    driverDetailsTitle   : "Vehicle Details",
  };
  const content = {
    bookingId       : bookingDetails?.insurance_id,
    createdAt       : moment(bookingDetails?.created_at).format('DD MMM YYYY h:mm A'),
    customerName    : bookingDetails?.owner_name,
    customerContact : `${bookingDetails?.country_code} ${bookingDetails?.mobile_no}`,
    driverName      : bookingDetails?.vehicle,
    driverContact   : '',
  };

  const sectionTitles1 = {
    email    : "Email",
    regPlace : "Registration Place",
    dob      : "Date Of Birth",
  }
  const sectionContent1 = {
    email    : bookingDetails?.email,
    regPlace : bookingDetails?.registration_place,
    dob      : bookingDetails?.date_of_birth,

  }

  const sectionTitles2 = {
    country         : "Country",
    insuranceExpiry : "Insurance Expiry",
    insuranceType   : "Type Of Insurance"
  }
  const sectionContent2 = {
    country         : bookingDetails?.country,
    insuranceExpiry : moment(bookingDetails?.insurance_expiry).format('DD MMM YYYY h:mm A'),
    insuranceType   : bookingDetails?.type_of_insurance
  }

  const sectionTitles3 = {
    insuranceExpired: 'Insurance Expired'
  }
  const sectionContent3 = {
    insuranceExpired: bookingDetails?.insurance_expired
  }

  const sectionTitles4 = {
    description: "Description"
  }
  const sectionContent4 = {
    description: bookingDetails?.description,
  }

  const imageTitles1 = {
    vehicleRegImages: "Vehicle Registration Images",
  };

  const imageContent1 = {
    vehicleRegImages: imageGallery?.vehicleRegImages,
    baseUrl,
  };

  const imageTitles2 = {
    carImages: "Car Images",
  };

  const imageContent2 = {
    carImages: imageGallery?.carImages,
    baseUrl,
  };

  const imageTitles3 = {
    tyreImages: "Car Tyre Images",
  };

  const imageContent3 = {
    tyreImages: imageGallery?.tyreImages,
    baseUrl,
  };

  const imageTitles4 = {
    licenseImages: "Vehicle Driving Licence",
  };

  const imageContent4 = {
    licenseImages: imageGallery?.licenseImages,
    baseUrl,
  };

  const imageTitles5 = {
    emiratesImages: "Emirates Id",
  };

  const imageContent5 = {
    emiratesImages: imageGallery?.emiratesImages,
    baseUrl,
  };

  return (
    <div className='main-container'>
      <BookingDetailsHeader
        content={content} titles={headerTitles}
        type='portableChargerBooking'
      />
      <div className={styles.ChargerDetailsSection}>
        <BookingLeftDetails titles={sectionTitles1} content={sectionContent1}
          sectionTitles2={sectionTitles2} sectionContent2={sectionContent2}
          sectionTitles3={sectionTitles3} sectionContent3={sectionContent3}
          sectionTitles4={sectionTitles4} sectionContent4={sectionContent4}
          type='evGuide' />
        <BookingMultipleImages
          titles={imageTitles1} content={imageContent1}
          type='evGuide'
        />
        <BookingMultipleImages
          titles={imageTitles2} content={imageContent2}
          type='evGuide'
        />
        <BookingMultipleImages
          titles={imageTitles3} content={imageContent3}
          type='evGuide'
        />
        <BookingMultipleImages
          titles={imageTitles4} content={imageContent4}
          type='evGuide'
        />
        <BookingMultipleImages
          titles={imageTitles5} content={imageContent5}
          type='evGuide'
        />

        {/* <BookingImageSection
          titles={imageTitles} content={imageContent}
          type='evGuide'
        /> */}
        {/* <BookingImageSection
          titles={imageTitles1} content={imageContent1}
          type='evGuide'
        /> */}
      </div>
    </div>
  )
}

export default InsuranceDetails