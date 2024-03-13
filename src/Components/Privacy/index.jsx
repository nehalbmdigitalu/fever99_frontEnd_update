import React from "react";
import { Link } from "react-router-dom";
import MainHeader from "../common/MainHeader";
import MainFooter from "../common/MainFooter";

function Privacy() {
  // const { isLogin } = useSelector((state) => state.login);

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
                <li>Privacy</li>
              </ol>
            </div>
          </nav>
        </div>
        <section id="about" class="about">
          <div class="container" >
            <h3>Privacy Policy Dertails:</h3>
            <p>
              At Fever99.com, we understand the significance of the trust you
              place in our services, and we are dedicated to upholding the
              highest standards for customer information privacy and
              transactions.
            </p>
            <p>
              Fever99.com is deeply committed to safeguarding the personal
              information and sensitive personal data of our customers, striving
              to ensure the utmost privacy.
            </p>
            <p>
              "Personal information," as referred to in this policy, encompasses
              any data that can independently identify, contact, or locate an
              individual. This includes sensitive personal data or information
              such as medical history, treated as part of personal information
              for the purposes of this policy.
            </p>
            <p>
              Fever99 collects personal information for various regulatory and
              business reasons, including but not limited to identity
              verification, effective completion of transactions, billing for
              availed products and services, responding to service requests,
              market analysis, business and operational improvement, and
              promotion and marketing of products and services that we believe
              may be of interest and benefit to you. We also ensure adherence to
              legal and regulatory requirements for the prevention and detection
              of frauds and crimes.
            </p>
            <p>
              Our Privacy Policy is meticulously designed to address the privacy
              and security of the personal information entrusted to us. This
              policy delineates the types of personal information we may collect
              and outlines our approach to handling and dealing with this
              information.
            </p>
            <p>
              <b>Note:</b> Our privacy policy is subject to change at any time
              without notice.
            </p>
            <p>
              By utilizing our services and portal, you signify your agreement
              to all the terms and conditions outlined in the document below.
            </p>
            <b>Feedback and Concerns:</b>
            <p>
              At Fever99.com, your trust and satisfaction are paramount, and we
              are unwaveringly committed to safeguarding the personal
              information entrusted to us. We appreciate and anticipate your
              ongoing support in this endeavor. Should you have any feedback or
              concerns regarding the protection of your personal information,
              the delivery of our products/services, or any payment-related
              issues, we encourage you to reach out to our dedicated customer
              support team.
            </p>
            <p>
              For assistance, please contact us at 6262-8080-62 or via email at
              info@fever99.com. Your inquiries are important to us, and we are
              here to address them promptly and effectively.
            </p>
            <p>
              Fever99.com reserves the right to amend or modify this Privacy
              Policy at any time to adapt to evolving needs and ensure the
              highest standards of privacy protection. We recommend that you
              visit our website www.fever99.com periodically for the latest
              information and updates. Your continued trust and support are
              invaluable to us, and we are committed to keeping you informed
              about any changes in our privacy practices.
            </p>
            <p>Thank you for choosing Fever99.com for your healthcare needs</p>
          </div>
        </section>

        <MainFooter />
      </main>
    </>
  );
}

export default Privacy;
