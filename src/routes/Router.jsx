import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store.js";

import Dashboard from "../components/Dashboard/index.jsx";
import PortableCharger from "../components/PortableCharger/index.jsx";
import AppSignupList from "../components/AppSignUp/AppSignupList.js";
import AppSignupDetails from "../components/AppSignUp/AppSignupDetails.jsx";
import EmergencyTeam from "../components/Riders/EmergencyDetails/Details.jsx";
import Layout from "../components/SharedComponent/Layout.jsx";
import ChargerList from "../components/PortableCharger/ChargerList/ChargerList.jsx";
import Login from "../components/Login/index.jsx";
import ChargerBookingList from "../components/PortableCharger/ChargerBooking/ChargerBookingList.js";
import ChargerBookingInvoiceList from "../components/PortableCharger/InvoiceList/InvoiceList.js";
import PortableChargerTimeSlotList from "../components/PortableCharger/TimeSlotLIst/PortableChargerTimeSlotList.js";
import AddPortableChargerTimeSlot from "../components/PortableCharger/TimeSlotLIst/AddTimeSlot.jsx";
import ChargerBookingDetails from "../components/PortableCharger/ChargerBooking/ChargerBookingDetails.js";
import PickAndDrop from "../components/PickAndDrop/index.jsx";
import PickAndDropBookingList from "../components/PickAndDrop/Booking/BookingList.jsx";
import PickAndDropBookingDetails from "../components/PickAndDrop/Booking/BookingDetails.jsx";
import PickAndDropInvoiceList from "../components/PickAndDrop/Invoice/InvoiceList.jsx";
import PickAndDropTimeSlotList from "../components/PickAndDrop/TimeSlot/TimeSlotList.jsx";
import PublicChargerStationList from "../components/PublicChargerStation/StationList.jsx";
import PublicChargerStationDetails from "../components/PublicChargerStation/StationDetails.jsx";
import ChargerInstallationList from "../components/ChargerInstallationList/ChargerInstallationList.jsx";
import ChargerInstallationDetails from "../components/ChargerInstallationList/ChargerInstallationDetails.jsx";
import AddCharger from "../components/PortableCharger/ChargerList/AddCharger.jsx";
import AddShopListForm from "../components/EVSpecializedShops/ShopList/ShopList/AddShopListForm.jsx";
import EditPortableChargerTimeSlot from "../components/PortableCharger/TimeSlotLIst/EditTimeSlot.jsx";
import EditPortableCharger from "../components/PortableCharger/ChargerList/EditCharger.jsx";
import AddPickAndDropTimeSlot from "../components/PickAndDrop/TimeSlot/AddTimeSlot.jsx";
import EditPickAndDropTimeSlot from "../components/PickAndDrop/TimeSlot/EditTimeSlot.jsx";
import RiderList from "../components/Riders/RiderList.jsx";
import AddEmergencyTeam from "../components/Riders/AddEmergencyTeam.jsx";
import EditEmergencyTeam from "../components/Riders/EditEmergencyTeam.jsx";
import ShopList from "../components/EVSpecializedShops/ShopList/ShopList/ShopList.jsx";
import ServiceList from "../components/EVSpecializedShops/ShopList/ServiceList/ServiceList.jsx";
import BrandList from "../components/EVSpecializedShops/ShopList/BrandList/BrandList.jsx";
import ClubList from "../components/EvRiderClub/ClubList.jsx";
import CarList from "../components/ElectricCarLeasing/CarList.jsx";
import BikeList from "../components/ElectricBikeLeasing/BikeList.jsx";
import AddChargerStation from "../components/PublicChargerStation/AddChargerStation.jsx";
import EditPublicChargerStation from "../components/PublicChargerStation/EditPublicChargerStation.jsx";
import Invoice from "../components/SharedComponent/Invoice/Invoice.jsx";
import InvoiceDetails from "../components/PortableCharger/InvoiceList/InvoiceDetails.jsx";
import PickAndDropInvoiceDetails from "../components/PickAndDrop/Invoice/InvoiceDetails.jsx";
import GuideList from "../components/EvGuide/GuideList.jsx";
import GuideDetails from "../components/EvGuide/GuideDetails.jsx";
import AddEvGuide from "../components/EvGuide/AddEvGuide.jsx";
import EditEvGuide from "../components/EvGuide/EditEvGuide.jsx";
import AddElectricCar from "../components/ElectricCarLeasing/AddElectricCar.jsx";
import EditElectricCar from "../components/ElectricCarLeasing/EditElectricCar.jsx";
import ElectricCarDetails from "../components/ElectricCarLeasing/ElectricCarDetails.jsx";
import AddElectricBike from "../components/ElectricBikeLeasing/AddElectricBike.jsx";
import EditElectricBike from "../components/ElectricBikeLeasing/EditElectricBike.jsx";
import ElectricBikeDetails from "../components/ElectricBikeLeasing/BikeDetails.jsx";
import EvRoadAssistance from "../components/EvRoadAssistance/index.jsx";
import RoadAssistanceBookingList from "../components/EvRoadAssistance/Booking/BookingList.jsx";
import RoadAssistanceBookingDetails from "../components/EvRoadAssistance/Booking/BookingDetails.jsx";
import RoadAssistanceInvoiceList from "../components/EvRoadAssistance/Invoice/InvoiceList.jsx";
import RoadAssistanceInvoiceDetails from "../components/EvRoadAssistance/Invoice/InvoiceDetails.jsx";
import AddClub from "../components/EvRiderClub/AddClub.jsx";
import EditClub from "../components/EvRiderClub/EditClub.jsx";
import ClubDetails from "../components/EvRiderClub/ClubDetails.jsx";
import Error from "../components/SharedComponent/Error/Error.jsx";
import DiscussionBoardList from "../components/DiscussionBoard/DiscussionBoardList.jsx";
import DiscussionBoardDetails from "../components/DiscussionBoard/DiscussionBoardDetails.jsx";
import InsuranceList from "../components/EvInsurance/InsuranceList.jsx";
import InsuranceDetails from "../components/EvInsurance/InsuranceDetails.jsx";
import BuySellList from "../components/EVBuySell/BuySellList.jsx";
import BuySellDetails from "../components/EVBuySell/BuySellDetails.jsx";
import InterestList from "../components/RegisterInterest/InterestList.jsx";
import SubscriptionList from "../components/Subscription/SubscriptionList.jsx";
import SubscriptionDetails from "../components/Subscription/SubscriptionDetails.jsx";
import CouponList from "../components/Coupon/CouponList.jsx";
import EditCoupon from "../components/Coupon/EditCoupon.jsx";
import AddCoupon from "../components/Coupon/AddCoupon.jsx";
import EditOffer from "../components/Offer/EditOffer.jsx";
import AddOffer from "../components/Offer/AddOffer.jsx";
import OfferList from "../components/Offer/OfferList.jsx"; 
import OfferDetails from "../components/Offer/OfferDetails.jsx";
import EvPreSaleBookingList from "../components/EvPreSale/Booking/BookingList.jsx";
import EvPreSaleBookingDetails from "../components/EvPreSale/Booking/BookingDetails.jsx";
import EvPreSaleSlotList from "../components/EvPreSale/TimeSlot/SlotList.jsx";
import AddEvPreSaleTimeSlot from "../components/EvPreSale/TimeSlot/AddTimeSlot.jsx";
import EditEvPreSaleTimeSlot from "../components/EvPreSale/TimeSlot/EditTimeSlot.jsx";
import ShopDetails from "../components/EVSpecializedShops/ShopList/ShopList/ShopDetails.jsx";
import EditShopListForm from "../components/EVSpecializedShops/ShopList/ShopList/EditShop.jsx";
import AddPod from "../components/PortableCharger/AddPod/AddPod.js";
import PublicChargeStation from "../components/PublicChargerStation/index.jsx";
import ChargerInstallation from "../components/ChargerInstallationList/index.jsx";
import ElectricCarLeasing from "../components/ElectricCarLeasing/index.jsx";
import ElectricBikeLeasing from "../components/ElectricBikeLeasing/index.jsx";
import EvGuide from "../components/EvGuide/index.jsx";
import EvRiderClub from "../components/EvRiderClub/index.jsx";
import DiscussionBoard from "../components/DiscussionBoard/index.jsx";
import EvInsurance from "../components/EvInsurance/index.jsx";
import EvBuySell from "../components/EVBuySell/index.jsx";
import Offer from "../components/Offer/index.jsx";
import Coupon from "../components/Coupon/index.jsx";
import Subscription from "../components/Subscription/index.jsx";
import AppSignUp from "../components/AppSignUp/index.jsx";
import Riders from "../components/Riders/index.jsx";

import PodDeviceList from "../components/PodDevice/Device/deviceList.jsx";
import AddPodDevice from "../components/PodDevice/Device/AddPodDevice.jsx";
import EditPodDevice from "../components/PodDevice/Device/EditPodDevice.jsx";
import DeviceDetails  from "../components/PodDevice/Device/DeviceDetails.jsx";

import PodBrandList from "../components/PodDevice/Brand/BrandList.jsx";
import AddPodBrand from "../components/PodDevice/Brand/AddBrand.jsx";

import PodAreaList from "../components/PodDevice/Area/PodAreaList.jsx";
import AddPodArea from "../components/PodDevice/Area/AddPodArea.jsx";
import EditPodArea from "../components/PodDevice/Area/EditPodArea.jsx";

import NotificationList from "../components/Notification/NotificationList.jsx";
import Profile from "../components/Profile/index.jsx"

import CustomerChargerBookingList from "../components/PortableCharger/ChargerBooking/CustomerChargerBookingList.js";

// Partners routes
import Partners from "../components/PartnerPortal/index.jsx";
import PartnerLists from "../components/PartnerPortal/PartnerLists.jsx";
import AddPartner from "../components/PartnerPortal/AddPartner.jsx";
import EditPartner from "../components/PartnerPortal/EditPartner.jsx";

import DeletedAccount from "../components/AppSignUp/DeletedAccount.js";

import FailedChargerBookingList from "../components/PortableCharger/ChargerBooking/FailedChargerBookingList.js";
import FailedBookingDetails from "../components/PortableCharger/ChargerBooking/FailedBookingDetails.js";
import FailedPickAndDropBookingList from "../components/PickAndDrop/Booking/FailedBookingList.jsx";
import FailedPickAndDropBookingDetails from "../components/PickAndDrop/Booking/FailedBookingDetails.jsx";

import FailedRSABookingList from "../components/EvRoadAssistance/Booking/FailedBookingList.js";
import FailedRSABookingDetails from "../components/EvRoadAssistance/Booking/FailedBookingDetails.js";

import TruckList from "../components/Truck/truckList.jsx";
import AddTruck from "../components/Truck/addTruck.jsx";
import EditTruck from "../components/Truck/EditTruck.jsx";
import TruckDetails from "../components/Truck/TruckDetails.jsx";

const router = createBrowserRouter([ 
    {
        path    : "/login",
        element : <Login />,
    },
    {
        path     : "/",
        element  : <Layout />,
        children : [
            {
                index   : true,
                element : <Dashboard />,
            },
            //App Signup
            {
                path     : "/app-signup",
                element  : <AppSignUp/>,
                children : [
                    {
                        path    : "app-signup-list",
                        element : <AppSignupList />,
                    }, {
                        path    : "deleted-account",
                        element : <DeletedAccount />,
                    }, {
                        path    : "rider-details/:riderId",
                        element : <AppSignupDetails/>,
                    },
                ],
            },
            //Rider Section
            {
                path     : "/drivers",
                element  : <Riders/>,
                children : [
                    {
                        path: "driver-list",
                        element: <RiderList />,
                    },
                    {
                        path: "drivers-details/:rsaId",
                        element: <EmergencyTeam />,
                    },
                    {
                        path: "add-driver",
                        element: <AddEmergencyTeam />,
                    },
                    {
                        path: "edit-driver/:rsaId",
                        element: <EditEmergencyTeam />,
                    },
                    {
                        path: "truck-list",
                        element: <TruckList />,
                    },
                    {
                        path: "add-truck",
                        element: <AddTruck />,
                    },
                    {
                        path: "edit-truck/:truckId",
                        element: <EditTruck />,
                    }, 
                    {
                        path: "truck-details/:truckId",
                        element: <TruckDetails />,
                    }, 
                ],
            },
            
            // Start the portable charger routes
            {
                path: "/portable-charger",
                element: <PortableCharger />,
                children: [
                    {
                        path:"add-pod",
                        element:<AddPod/>
                    },
                    {
                        path: "charger-list",
                        element: <ChargerList />,
                    },
                    {
                        path: "add-charger",
                        element: <AddCharger />,
                    },
                    {
                        path: "edit-charger/:chargerId",
                        element: <EditPortableCharger />,
                    },
                    {
                        path: "customer-charger-booking-list/:customerId",
                        element: <CustomerChargerBookingList />,
                    },
                    {
                        path: "charger-booking-list",
                        element: <ChargerBookingList />,
                    },
                    {
                        path: "charger-booking-details/:bookingId",
                        element: <ChargerBookingDetails />,
                    },
                    {
                        path: "charger-booking-invoice-list",
                        element: <ChargerBookingInvoiceList />,
                    },
                    {
                        path: "charger-booking-time-slot-list",
                        element: <PortableChargerTimeSlotList />,
                    },
                    {
                        path: "add-time-slot",
                        element: <AddPortableChargerTimeSlot />,
                    },
                    {
                        path: "edit-time-slot/:slotDate",
                        element: <EditPortableChargerTimeSlot />,
                    },
                    {
                        path: "invoice/:invoiceId",
                        element: <InvoiceDetails />,
                    },
                    // Pod Device Route
                    {
                        path: "device-list",
                        element: <PodDeviceList />,
                    },
                    {
                        path: "add-device",
                        element: <AddPodDevice />,  
                    },
                    {
                        path: "edit-device/:podId",
                        element: <EditPodDevice />,  
                    }, {
                        path: "device-details/:podId",
                        element: <DeviceDetails />,  
                    },
                    {
                        path    : "area-list",
                        element : <PodAreaList />,
                    },
                    {
                        path    : "brand-list",
                        element : <PodBrandList />,
                    },
                    {
                        path    : "add-brand/:deviceId",
                        element : <AddPodBrand />,
                    },
                    {
                        path    : "add-area",
                        element : <AddPodArea />,
                    },
                    {
                        path    : "edit-area/:areaId",
                        element : <EditPodArea />,
                    },
                    {
                        path: "failed-booking-list",
                        element: <FailedChargerBookingList />,
                    },
                    {
                        path: "failed-charger-booking-details/:bookingId",
                        element: <FailedBookingDetails />,
                    },
                    // End Pod Device Route  
                ],
            },
            // End the portable charger routes
            // Start the pick&drop container
            {
                path: "/pick-and-drop",
                element: <PickAndDrop />,
                children: [
                    {
                        path: "booking-list",
                        element: <PickAndDropBookingList />,
                    },
                    {
                        path: "booking-details/:requestId",
                        element: <PickAndDropBookingDetails />,
                    },
                    {
                        path: "invoice-list",
                        element: <PickAndDropInvoiceList />,
                    },
                    {
                        path: "invoice-details/:invoiceId",
                        element: <PickAndDropInvoiceDetails />,
                    },
                    {
                        path: "time-slot-list",
                        element: <PickAndDropTimeSlotList />,
                    },
                    {
                        path: "add-time-slot",
                        element: <AddPickAndDropTimeSlot />,
                    },
                    {
                        path: "edit-time-slot/:slotDate",
                        element: <EditPickAndDropTimeSlot />,
                    },
                    {
                        path: "failed-booking-list",
                        element: <FailedPickAndDropBookingList />,
                    },
                    {
                        path: "failed-valet-booking-details/:requestId",
                        element: <FailedPickAndDropBookingDetails />,
                    },
                ],
            },
            // End the pick&drop container
            //public charger station
            {
                path: "/public-charger-station",
                element: <PublicChargeStation/>,
                children: [
                    {
                        path: "public-charger-station-list",
                        element: <PublicChargerStationList/>,
                    },
                    {
                        path: "public-charger-station-details/:stationId",
                        element: <PublicChargerStationDetails/>,
                    },
                    {
                        path: "add-charger-station",
                        element: <AddChargerStation />,
                    },
                    {
                        path: "edit-charger-station/:stationId",
                        element: <EditPublicChargerStation />,
                    },
                ],
            },
            //road assistance
            {
                path     : "/ev-road-assistance",
                element  : <EvRoadAssistance />,
                children : [
                    {
                        path: "booking-list",
                        element: <RoadAssistanceBookingList />,
                    }, {
                        path: "booking-details/:requestId",
                        element: <RoadAssistanceBookingDetails />,
                    }, {
                        path: "invoice-list",
                        element: <RoadAssistanceInvoiceList />,
                    },  {
                        path: "invoice-details/:invoiceId",
                        element: <RoadAssistanceInvoiceDetails />,
                    }, {
                        path: "charger-booking-time-slot-list",
                        element: <PortableChargerTimeSlotList />,
                    }, {
                        path: "add-time-slot",
                        element: <AddPortableChargerTimeSlot />,
                    }, {
                        path: "edit-time-slot/:slotDate",
                        element: <EditPortableChargerTimeSlot />,
                    }, {
                        path: "failed-booking-list",
                        element: <FailedRSABookingList />,
                    }, {
                        path: "failed-booking-details/:requestId",
                        element: <FailedRSABookingDetails />,
                    },
                ],
            },
            //charger installation
            {
                path: "/charger-installation",
                element: <ChargerInstallation/>,
                children: [
                    {
                        path: "charger-installation-list",
                        element: <ChargerInstallationList />,
                    },
                    {
                        path: "charger-installation-details/:requestId",
                        element: <ChargerInstallationDetails />,
                    },
                ],
            },
           
            //Electric Car Leasing
            {
                path: "/electric-car-leasing",
                element: <ElectricCarLeasing/>,
                children: [
                    {
                        path: "electric-car-list",
                        element: <CarList />,
                    },
                    {
                        path: "add-electric-car",
                        element: <AddElectricCar />,
                    },
                    {
                        path: "edit-electric-car/:rentalId",
                        element: <EditElectricCar />,
                    },
                    {
                        path: "electric-car-details/:rentalId",
                        element: <ElectricCarDetails />,
                    },
                ],
            },
           
            //Electric Bilke Leasing
            {
                path: "/electric-bike-leasing",
                element: <ElectricBikeLeasing/>,
                children: [
                    {
                        path: "electric-bike-list",
                        element: <BikeList />,
                    },
                    {
                        path: "add-electric-bike",
                        element: <AddElectricBike />,
                    },
                    {
                        path: "edit-electric-bike/:rentalId",
                        element: <EditElectricBike />,
                    },
                    {
                        path: "electric-bike-details/:rentalId",
                        element: <ElectricBikeDetails />,
                    },
                ],
            },
            //Ev Guide
            {
                path: "/ev-guide",
                element: <EvGuide/>,
                children: [
                    {
                        path: "ev-guide-list",
                        element: <GuideList />,
                    },
                    {
                        path: "ev-guide-details/:vehicleId",
                        element: <GuideDetails />,
                    },
                    {
                        path: "add-ev-guide",
                        element: <AddEvGuide />,
                    },
                    {
                        path: "edit-ev-guide/:vehicleId",
                        element: <EditEvGuide />,
                    },
                ],
            },

            
            //Ev Rider Club
            {
                path: "/ev-rider-club",
                element: <EvRiderClub/>,
                children: [
                    {
                        path: "club-list",
                        element: <ClubList />,
                    },
                    {
                        path: "add-club",
                        element: <AddClub />,
                    },
                    {
                        path: "edit-club/:clubId",
                        element: <EditClub />,
                    },
                    {
                        path: "club-details/:clubId",
                        element: <ClubDetails />,
                    },
                ],
            },
            //DiscussionBoard
            {
                path: "/discussion-board",
                element: <DiscussionBoard/>,
                children: [
                    {
                        path: "discussion-board-list",
                        element: <DiscussionBoardList />,
                    },
                    {
                        path: "discussion-board-details/:boardId",
                        element: <DiscussionBoardDetails />,
                    },
                ],
            },

            //EvInsurance
            {
                path: "/ev-insurance",
                element: <EvInsurance/>,
                children: [
                    {
                        path: "ev-insurance-list",
                        element: <InsuranceList />,
                    },
                    {
                        path: "ev-insurance-details/:insuranceId",
                        element: <InsuranceDetails />,
                    },
                ],
            },
           
            //ev-specialized
            {
                path: "/ev-specialized",
                // element: <ShopList />,
                children: [
                    {
                        path: "shop-list",
                        element: <ShopList />,
                    },
                    {
                        path: "shop-details/:shopId",
                        element: <ShopDetails />,
                    },
                    {
                        path: "add-shop",
                        element: <AddShopListForm />,
                    },
                    {
                        path: "edit-shop/:shopId",
                        element: <EditShopListForm />,
                    },
                    {
                        path: "service-list",
                        element: <ServiceList />,
                    },
                    {
                        path: "brand-list",
                        element: <BrandList />,
                    },
                ],
            },

            //evPreSale
            {
                path: "/ev-pre-sales-testing",
                // element: <ShopList />,
                children: [
                    {
                        path: "pre-sales-list",
                        element: <EvPreSaleBookingList />,
                    },
                    {
                        path: "pre-sales-details/:bookingId",
                        element: <EvPreSaleBookingDetails />,
                    },
                    {
                        path: "time-slot-list",
                        element: <EvPreSaleSlotList />,
                    },
                    {
                        path: "add-time-slot",
                        element: <AddEvPreSaleTimeSlot />,
                    },
                    {
                        path: "edit-time-slot/:slotDate",
                        element: <EditEvPreSaleTimeSlot />,
                    },
                ],
            },

            //EvBuySell
            {
                path: "/ev-buy-sell",
                element: <EvBuySell/>,
                children: [
                    {
                        path: "ev-buy-list",
                        element: <BuySellList />,
                    },
                    {
                        path: "ev-buy-sell-details/:sellId",
                        element: <BuySellDetails />,
                    },
                ],
            },
            
            //Offer
            {
                path: "/offer",
                element: <Offer/>,
                children: [
                    {
                        path: "offer-list",
                        element: <OfferList />,
                    },
                    {
                        path: "offer-details/:offerId",
                        element: <OfferDetails />,
                    },
                    {
                        path: "add-offer",
                        element: <AddOffer />,
                    },
                    {
                        path: "edit-offer/:offerId",
                        element: <EditOffer />,
                    },
                ],
            },

            //Coupon
            {
                path: "/coupon",
                element: <Coupon/>,
                children: [
                    {
                        path: "coupon-list",
                        element: <CouponList />,
                    },
                    {
                        path: "add-coupon",
                        element: <AddCoupon />,
                    },
                    {
                        path: "edit-coupon/:couponId",
                        element: <EditCoupon />,
                    },
                ],
            },
           
            //Register Interest
            {
                path: "/interest-list",
                element: <InterestList />,
            },
            //Subscription
            {
                path: "/subscription",
                element: <Subscription/>,
                children: [
                    {
                        path: "subscription-list",
                        element: <SubscriptionList />,
                    },
                    {
                        path: "subscription-details/:subId",
                        element: <SubscriptionDetails />,
                    },
                ],
            },
            // Partner Portal
            {
                path: "/partners",
                element: <Partners/>,
                children: [
                    {
                        path: "partner-list",
                        element: <PartnerLists />,
                    },
                    // {
                    //     path: "partner-details/:rsaId",
                    //     element: <EmergencyTeam />,
                    // },
                    {
                        path: "add-partner",
                        element: <AddPartner />,
                    },
                    {
                        path: "edit-partner/:rsaId",
                        element: <EditPartner />,
                    },
                ],
            },
            // Add POD Section
            {
                path: "/pod-device",
                // element: <ShopList />,
                children: [
                    
                ],
            },
            // Invoice Section
            {
                path: "/invoice",
                element: <Invoice />,
            },
            //Notification
            {
                path: "/notification-list",
                element: <NotificationList />,
            },
            // Profile
            {
                path: "/profile",
                element: <Profile/>
            }
        ],
    },
    {
        path: "*",
        element: <Error />,
    },
]);
function Router() {
    return (
        <>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
        </>
    );
}
export default Router;
 