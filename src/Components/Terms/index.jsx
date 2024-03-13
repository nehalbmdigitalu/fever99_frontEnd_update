import React from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/img/Logo_Hospital.png";
import aboutImage from "../../assets/main/img/about.jpg";
import aboutImage2 from "../../assets/main/img/about-2.jpg";
import { useSelector } from "react-redux";
import team1 from "../../assets/img/team/1.jpg";
import team2 from "../../assets/img/team/2.png";
import team3 from "../../assets/img/team/3.png";
import team4 from "../../assets/img/team/4.png";
import team5 from "../../assets/img/team/dr_lokesh1.png";
import team6 from "../../assets/img/team/dr_mukesh.jpg";
import MainHeader from "../common/MainHeader";
import MainFooter from "../common/MainFooter";

function Terms() {
  const { isLogin } = useSelector((state) => state.login);

  return (
    <>
      <MainHeader />
      <main id="main">
        <div class="breadcrumbs">
          <nav>
            <div class="container">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>Terms And Conditions</li>
              </ol>
            </div>
          </nav>
        </div>
        <section id="about" class="about">
          <div class="container" >
            <p>
              Welcome to Fever99.com. By continuing to browse and use this
              website, you agree to adhere to and be bound by the following
              terms and conditions of use. These terms, along with our privacy
              policy, govern the relationship between you and Fever99.com in
              connection with this website. If you do not agree with any part of
              these terms and conditions, we kindly request that you refrain
              from using our website.
            </p>
            <p>
              The term 'Fever99.com' or 'we' or 'us' refers to the owner of the
              website. Your use of this website is subject to the following
              terms:
            </p>
            <ul>
              <li>
                The content on the pages of this website is for your general
                information and use only. It is subject to change without prior
                notice.
              </li>
              <li>
                This website is designed to securely store your medical and
                demographic data.
              </li>
              <li>
                Neither we nor any third parties provide any warranty or
                guarantee regarding the accuracy, timeliness, performance,
                completeness, or suitability of the information and materials
                found or offered on this website for any specific purpose. You
                acknowledge that such information and materials may contain
                inaccuracies or errors, and we expressly exclude liability for
                any such inaccuracies or errors to the fullest extent permitted
                by law.
              </li>
              <li>
                Your use of any information or materials on this website is
                entirely at your own risk, and we shall not be liable. It is
                your responsibility to ensure that any products, services, or
                information available through this website meet your specific
                requirements.
              </li>
              <li>
                This website contains material that is owned by or licensed to
                us. Reproduction is prohibited, except in accordance with the
                copyright notice, which forms part of these terms and
                conditions.
              </li>
              <li>
                All trademarks reproduced on this website, which are not the
                property of, or licensed to, the operator, are acknowledged on
                the website.
              </li>
              <li>
                Unauthorized use of this website may give rise to a claim for
                damages and/or be a criminal offense.
              </li>
              <li>
                From time to time, this website may include links to other
                websites. These links are provided for your convenience to
                provide further information. They do not signify that we endorse
                the website(s), and we have no responsibility for the content of
                the linked website(s).
              </li>
              <li>
                Your use of this website and any dispute arising out of such use
                is subject to the laws of the Republic of India
              </li>

            </ul>
            <p>Thank you for choosing Fever99.com for your healthcare needs</p>
          </div>
        </section>

        <MainFooter />
      </main>
    </>
  );
}

export default Terms;
