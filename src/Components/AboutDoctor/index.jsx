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
const data = {
  mukeshjain: {
    image: team6,
    name: "Dr. Mukesh Jain",
    degree: "MBSS, MD",
    about:
      `<p>Dr. Mukesh Jain is an experienced and professionally qualified Public Health Specialist, Consultant physician and diabetologist with a demonstrated track record of over 12+ years in patient care and over 6+ years in Health System Strengthening, Hospital administration, Pandemic response, Clinical Epidemiology & Research, Disease Surveillance, Outbreak/Disasters management, Program Administration and management and Inter-Sectoral coordination with World Health Organisation, Union Ministry of Health & Family Welfare, international NGOs and other multinational companies.</p>
      <p>Fellowship in Diabetes mellitus</p>
      <p>M.D. Community health administration from National Institute of Health & Family Welfare, University of Delhi (2017-20) </p>
      <p>M.B.B.S. – Stanley Medical College, The T.N. Dr M.G.R. Medical University, Chennai </p>
      `,
  },
  lokeshGarg: {
    image: team5,
    name: "Dr. Lokesh Kumar Garg",
    degree: "MBSS, DTCD, IDCCM,PGDS,MD (AM)",
    about:
      `<p>With 14+ years of experience, Dr. Lokesh Garg is a skilled Pulmonologist, Allergist/Immunologist, and General Physician practicing in Faridabad City, Faridabad. He offers his services at Arsh Hospital in Faridabad City and Park Hospital, Faridabad located in N.T.P.C. Sector-10, Faridabad.
      </p>
      <p>Dr. Garg earned his MBBS degree from Stanley Medical College And Hospital, Chennai in 2003. He also holds the degree of PGDS ( post graduate diploma in Sonography), Diploma in Tuberculosis and Chest Diseases (DTCD) from V.P Chest Institute, Delhi obtained in 2009, and IDCC (ISCCM) from Fortis Escorts Hospital, Faridabad in 2011.</p>
      <p>As a member of multiple medical associations such as Indian College of Chest Physician, Indian Society of Critical Care Medicine (ISCCM), Critical care department at Fortis Escorts hospital Faridabad, Respiratory medicine department at Asian Hospital Faridabad, Respiratory medicine department at Park Hospital Faridabad, American College of Allergy, Asthma and applied Immunology, South Asia Association of Allergy, Asthma and Clinical Immunology, and Haryana Chest Physician Society, Dr. Garg stays updated with the latest advancements in his fields.      </p>
      <ul>
      <li>PGDS ( post graduate diploma in Sonography), DTCD from V.P Chest Institute, Delhi in 2009</li>
      <li>Member of multiple medical associations</li>
      <li>14+ years of experience</li>
      </ul>
      `,
  },
};

function AboutDoctor() {
  const { isLogin } = useSelector((state) => state.login);

  const params = useParams();
  const name = params.name;

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
                <li>People</li>
              </ol>
            </div>
          </nav>
        </div>
        <section id="about" class="about">
          <div class="container" >
            <div style={{ display: "flex", justifyContent: "start", backgroundColor: '#f1f1f1', borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px' }}>
              <img
                src={data[name].image}
                style={{ height: "200px", borderRadius: "50%" }}
                class="img-fluid"
                alt=""
              />

              <div style={{ display:'flex', flexDirection:"column", justifyContent:'center', marginLeft:'30px' }} >
                <h3 style={{ width: "100%" }}>{data[name].name}</h3>
                <h4 style={{ width: "100%" }}>{data[name].degree}</h4>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{__html:data[name].about}} style={{ marginTop:'20px' }}>

            </div>
            {/* <p style={{ marginTop:'20px' }}>{data[name].about}</p> */}
          </div>
        </section>

        <MainFooter />
      </main>
    </>
  );
}

export default AboutDoctor;
