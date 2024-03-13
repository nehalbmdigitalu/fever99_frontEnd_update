import Appointment from '../../Components/Appointment';
import AppointmentAddUpdate from '../../Components/Appointment/AddUpdate/AddUpdate';
import VideoChat from '../../Components/Appointment/dependiencies/VideoChat';
import Login from '../../Components/Auth/Login';
import Register from '../../Components/Auth/Register';
import Dashboard from '../../Components/Dashboard';
import EditProfile from '../../Components/EditProfile';
import Referal from '../../Components/Referal';
import ServiceRequest from '../../Components/ServiceRequest';
import Services from '../../Components/Services';
import MyProfile from '../../Components/MyProfile';
import Setting from '../../Components/Setting'
import Transactions from '../../Components/Transactions';
import View from '../../Components/Services/view';
import Chat from '../../Components/Chat';
import AppointmentView from '../../Components/Appointment/AppointmentView';
import Home from '../../Components/Home';
import About from '../../Components/About';
import HomeServices from '../../Components/HomeServices';
import Doctors from '../../Components/Doctors';
import Teams from '../../Components/Teams';
import Testimonials from '../../Components/Testimonials';
import AdminService from '../../Components/AdminService';
import CaseStudy from '../../Components/CaseStudy';
import Patient from '../../Components/Patient';
import Franchise from '../../Components/Franchise';
import PDFGenerator from '../../Components/common/PDFGenerator';
import Complaint from '../../Components/Complent';
import AboutDoctor from '../../Components/AboutDoctor';
import BlogDetails from '../../Components/CaseStudy/View';
import AppointmentAddClinic from '../../Components/Appointment/Clinic/AddUpdate';
import Privacy from '../../Components/Privacy';
import Terms from '../../Components/Terms';
import ServiceDetails from '../../Components/HomeServices/View';
import FranchiseRegister from '../../Components/Auth/FranchiseRegister';
import AdminECliniCRequest from '../../Components/AdminEClinicRequest';
import Career from '../../Components/Career';
import CordinaterCareer from '../../Components/CordinaterCareer';
import Success from '../../Components/Success';
import Cancel from '../../Components/Cancel';
import Medicines from '../../Components/AdminMedicines';
import DoctorView from '../../Components/Doctors/View';
import Earnings from '../../Components/Earnings';
import AdminEarning from '../../Components/AdminEarnings';
import Cordinator from '../../Components/Cordinator';
import FranchiseView from '../../Components/Franchise/View';
import CordinatorView from '../../Components/Cordinator/View';
import Refuncpolicy from '../../Components/Refuncpolicy';
import InsurenceRequest from '../../Components/InsurenceRequest';
import ForgotPassword from '../../Components/Auth/ForgotPassword';
import DeleteUserDetails from '../../Components/DeleteUserDetails';

export const routes = [
  {
    path: '/',
    element: <Home />,
    protected: false
  },
  {
    path: '/prescription/:id',
    element: <PDFGenerator />,
    protected: true
  },
  {
    path: '/about',
    element: <About />,
    protected: false
  },
  {
    path: '/service',
    element: <HomeServices />,
    protected: false
  },
  {
    path: '/home-service/:id',
    element: <ServiceDetails />,
    protected: false
  },
  {
    path: '/patient',
    element: <Patient />,
    protected: false
  },
  {
    path: '/franchise',
    element: <Franchise />,
    protected: false
  },
  {
    path: '/doctors',
    element: <Doctors />,
    protected: true
  },
  {
    path: '/doctors/view/:id',
    element: <DoctorView />,
    protected: true
  },
  {
    path: '/franchise/view/:id',
    element: <FranchiseView />,
    protected: true
  },
  {
    path: '/cordinator/view/:id',
    element: <CordinatorView />,
    protected: true
  },
  {
    path: '/teams',
    element: <Teams />,
    protected: true
  },
  {
    path: '/testimonials',
    element: <Testimonials />,
    protected: true
  },
  {
    path: '/admin-service',
    element: <AdminService />,
    protected: true,

  },
  {
    path: '/case-study',
    element: <CaseStudy />,
    protected: true,

  },
  {
    path: '/blog/:id',
    element: <BlogDetails />,
    protected: false

  },
  {
    path: '/e-clinic-request',
    element: <AdminECliniCRequest />,
    protected: true
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    protected: true,
  },
  {
    path: '/appointments',
    element: <Appointment />,
    protected: true
  },
  {
    path: '/appointment/:id',
    element: <AppointmentView />,
    protected: true
  },
  {
    path: '/appointment/create',
    element: <AppointmentAddUpdate />,
    protected: true
  },
  {
    path: '/appointment/create/clinic',
    element: <AppointmentAddClinic />,
    protected: true
  },
  {
    path: '/login',
    element: <Login />,
    protected: false,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    protected: false,
  },
  {
    path: '/register',
    element: <Register />,
    protected: false,
  },
  {
    path: '/e-clinic-register',
    element: <FranchiseRegister />,
    protected: false
  },
  {
    path: '/meeting/:id',
    element: <VideoChat />,
    protected: true
  },
  {
    path: '/services',
    element: <Services />,
    protected: true
  },
  {
    path: '/service/view/:id',
    element: <View />,
    protected: true
  },
  {
    path: '/referal',
    element: <Referal />,
    protected: true,
  },
  {
    path: '/request',
    element: <ServiceRequest />,
    protected: true,
  },
  {
    path: '/edit-profile',
    element: <EditProfile />,
    protected: true
  },
  {
    path: '/my-profile',
    element: <MyProfile />,
    protected: true
  },

  {
    path: '/people/:name',
    element: <AboutDoctor />,
    protected: false
  },
  {
    path: '/complent',
    element: <Complaint />,
    protected: true
  },
  {
    path: '/settings',
    element: <Setting />,
    protected: true
  },
  {
    path: '/transaction',
    element: <Transactions />,
    protected: true
  },
  {
    path: '/chat',
    element: <Chat />,
    protected: true
  },
  {
    path: '/terms-condition',
    element: <Terms />,
    protected: true
  },
  {
    path: '/privacy',
    element: <Privacy />,
    protected: true
  },
  {
    path: '/refuncpolicy',
    element: <Refuncpolicy />,
    protected: false
  },
  {
    path: '/career',
    element: <Career />,
    protected: false
  },
  {
    path: '/insurence-request',
    element: <InsurenceRequest />,
    protected: true
  },

  {
    path: '/careers',
    element: <CordinaterCareer />,
    protected: true
  },

  {
    path: '/payment-response',
    element: <Success />,
    protected: false
  },
  {
    path: '/cancel',
    element: <Cancel />,
    protected: false
  },
  {
    path: '/medicines',
    element: <Medicines />,
    protected: true
  },
  {
    path: '/earnings',
    element: <Earnings />,
    protected: true
  },
  {
    path: '/admin-earnings',
    element: <AdminEarning />,
    protected: true
  },
  {
    path: '/cordinator',
    element: <Cordinator />,
    protected: true
  },
  {
    path: '/cordinator/view:id',
    element: <Cordinator />,
    protected: true
  },
  {
    path: '/delete-user-details',
    element: <DeleteUserDetails />,
    protected: true
  }

];

