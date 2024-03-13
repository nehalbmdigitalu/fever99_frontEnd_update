import { combineReducers } from 'redux';
import loaderReducer from './loader.reducer';
import userReducer from './user.Reducer'
import appointmentReducer from './appointmentReducer';
import doctorsReducer from './doctors.Reducer';
import serviceReducer from './serviceReducer';
import referalReducer from './referalReducer';
import ServiceRequestReducer from './ServiceRequestReducer';
import usersReducer from './users.reducer';
import teamsReducer from './teams.reducer'
import dashboardReducer from './dashboard.reducer';
import blogsReducer from './blogs.Reducer';
import testmonialReducer from './testmonial.reducer';
import stateCityReducer from './stateCity.reducer';
import eClinicRequestReducer from './eClinicRequest.reducer';
import careerReducer from './career.reducer';
import medicineReducer from './medicine.Reducer';
import notificationReducer from './notification.Reducer';
import earningReducer from './earningReducer';
import adminEarningReducer from './adminEarningReducer';

const appReducer = combineReducers({
    loader: loaderReducer,
    login: userReducer,
    appointment: appointmentReducer,
    doctors: doctorsReducer,
    service: serviceReducer,
    referalUser: referalReducer,
    serviceRequest: ServiceRequestReducer,
    users: usersReducer,
    teams: teamsReducer,
    dashboard: dashboardReducer,
    blogs: blogsReducer,
    testmonial: testmonialReducer,
    stateCity: stateCityReducer,
    Eclinic: eClinicRequestReducer,
    Career: careerReducer,
    Medicine: medicineReducer,
    Notification: notificationReducer,
    Earning: earningReducer,
    AdminEarning : adminEarningReducer
});

export default appReducer;