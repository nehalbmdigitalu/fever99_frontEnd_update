import React from 'react'
import { Link } from 'react-router-dom'
import { IoLogoYoutube } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";


function MainFooter() {
  return (
    <>
      {/* Footer Start  */}
      <div class="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-lg-6 col-xl-3">
              <div class="footer-item d-flex flex-column">
                <div>
                  <Link to="#0" class="logo d-flex align-items-center">
                    <span style={{ paddingLeft: "0px" }}>Fever99</span>
                  </Link>
                </div>
                <p>We are here to serve you and address your healthcare needs. Contact Fever99 today to schedule an appointment or to learn more about our services.</p>
                <div class="d-flex align-items-center icon">
                  <Link class="btn-square btn btn-primary text-white mx-1" to="https://www.facebook.com/fever99Eclinic"><i class="fab fa-facebook-f"></i></Link>
                  <Link class="btn-square btn btn-primary text-white mx-1" to="https://x.com/Fever99com?t=DOnEgcHxrXr3H6zFJk_mVA&s=09"><FaSquareXTwitter /></Link>
                  <Link class="btn-square btn btn-primary text-white mx-1" to="https://www.youtube.com/channel/UCf0lHOQNzev2qn6jSvjAMaA/about"><IoLogoYoutube /></Link>
                  <Link class="btn-square btn btn-primary text-white mx-1" to="https://www.instagram.com/fever99eclinic/"><i class="fab fa-instagram"></i></Link>
                  <Link class="btn-square btn btn-primary text-white mx-1" to="https://www.linkedin.com/search/results/all/?keywords=fever99&origin=GLOBAL_SEARCH_HEADER&sid=UH%3B"><i class="fab fa-linkedin-in"></i></Link>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-3">
              <div class="footer-item d-flex flex-column">
                <h4 class="mb-2">Quick Links</h4>
                <Link to="#"><i class="fas fa-angle-right me-2"></i>Home</Link>
                <Link to="/career"><i class="fas fa-angle-right me-2"></i>Career</Link>
                <Link to="/refuncpolicy"><i class="fas fa-angle-right me-2"></i>Cancellation & Refund Policy</Link>
                <Link to="/terms-condition"><i class="fas fa-angle-right me-2"></i>Terms of service</Link>
                <Link to="/privacy"><i class="fas fa-angle-right me-2"></i>Privacy policy</Link>
                <Link to="/Join"><i class="fas fa-angle-right me-2"></i>Join</Link>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-3">
              <div class="footer-item d-flex flex-column">
                <h4 class="mb-2">Our Services</h4>
                <Link to="/home-service/doctor-video-consultation"><i class="fas fa-angle-right me-2"></i>Physiotherapy</Link>
                <Link to="/home-service/64e1112d48369de135517021"><i class="fas fa-angle-right me-2"></i>Video Consulttion</Link>
                <Link to="/home-service/64e1113c48369de135517023"><i class="fas fa-angle-right me-2"></i>Ambulance on call</Link>
                <Link to="/home-service/64e1114948369de135517025"><i class="fas fa-angle-right me-2"></i>Vaccinations at home</Link>
                <Link to="/home-service/64e1115648369de135517027"><i class="fas fa-angle-right me-2"></i>ECG and X-Ray at home</Link>
              </div>
            </div>
            <div class="col-md-6 col-lg-6 col-xl-3">
              <div class="footer-item d-flex flex-column">
                <h4 class="mb-2">Contact Info</h4>
                <Link to=""><i class="fa fa-map-marker-alt px-1"></i>Shop No 97, Conscient Habitat Society Market, Sector 78, Faridabad, Haryana-121002, India.</Link>
                <Link to=""><i class="fas fa-envelope px-2"></i>info@fever99.com</Link>
                <Link to=""><i class="fas fa-phone px-1"></i> +91 6262808062</Link>
              </div>
            </div>
          </div>
        </div >
      </div >
      {/* Footer End  */}
    </>
  )
}

export default MainFooter