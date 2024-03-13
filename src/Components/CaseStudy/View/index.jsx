import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import logo from "../../../assets/img/Logo_Hospital.png";
import aboutImage from "../../../assets/main/img/about.jpg";
import aboutImage2 from "../../../assets/main/img/about-2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsList, getItemBySlug } from "../dependencies/action";
import { getDocumentLink } from "../../../dependencies/utils/helper";
import "../index.scss";
import MainFooter from "../../common/MainFooter";
import MainHeader from "../../common/MainHeader";


function BlogDetails() {
  const { isLogin } = useSelector((state) => state.login);
  const { blogList } = useSelector((state) => state.blogs);
  console.log(">>>>>", blogList)
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  useEffect(() => {
    dispatch(getBlogsList());
  }, [dispatch])

  useEffect(() => {
    dispatch(getItemBySlug(id)).then(res => {
      const { data } = res

      setData(data)
    })
  }, [dispatch, id])

  console.log(data)
  return (
    <>
      <MainHeader />
      <main id="main">
        <div className="breadcrumbs">
          <div className="wrapper" style={{ backgroundImage: `url("https://wordpress.themeholy.com/mediax/wp-content/uploads/2023/12/breadcumb-bg.jpg")` }}>
            <div className="page-header d-flex align-items-center">
              <div className="container position-relative">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-6 text-center">
                    <h2>{data.name}</h2>
                    <p>{data.title}</p>
                    {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {
                        isLogin ? (
                          data._id = '64e1112d48369de135517021' ? (
                            <Link style={{ backgroundColor: '#f25922', boxShadow: '0 0 15px rgba(0, 0, 0, 0.08)', borderRadius: '50px', padding: '12px 45px', color: '#FFF' }} className="btn btn-sm" to='/appointment/create'>
                              Book Now
                            </Link>
                          ) : (
                            <>
                              <button onClick={() => setShowModal(true)} type="button" style={{ backgroundColor: '#f25922', boxShadow: '0 0 15px rgba(0, 0, 0, 0.08)', borderRadius: '50px', padding: '12px 45px', color: '#FFF' }}>Book Now</button>
                            </>
                          )

                        ) : (
                          <Link style={{ backgroundColor: '#f25922', boxShadow: '0 0 15px rgba(0, 0, 0, 0.08)', borderRadius: '50px', padding: '12px 45px', color: '#FFF' }} className="btn btn-sm" to="/login">
                            Book Now
                          </Link>
                        )
                      }
                    </div> */}
                    <nav>
                      <div className="container">
                        <ol>
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <li>{data.name}</li>
                        </ol>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="caseStudy" className="blogDetails">
          <div class="container py-5">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-img">
                    <img src={getDocumentLink(data.image)} style={{ width: '100%' }} alt="" />
                  </div>
                  <div className="card-title">
                    <h3 style={{ paddingTop: '20px' }}>{data.title}</h3>
                  </div>
                  <div className="card-desrction">
                    {/* <p>{data.description}</p> */}
                    <div dangerouslySetInnerHTML={{ __html: data.description }} />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <ul className="list-group" style={{ listStyle: 'none' }}>
                  {
                    blogList && blogList.map((d, index) => (
                      <li><Link to={`/blog/${d.slug}`} style={{ fontSize: '19px', color: '#000', margin: '20px 0px' }}>{d.title}</Link></li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
        </section>

        <footer id="footer" class="footer">
          <MainFooter />
          <div class="container mt-2" style={{ marginBottom: "-30px" }}>
            <div class="copyright">
              &copy; Copyright{" "}
              <strong>
                <span>Fever99</span>
              </strong>
              . All Rights Reserved, Designed by{" "}
              <Link href="#0" style={{ color: "#FFF" }}>
                Fever99
              </Link>
            </div>
          </div>
        </footer>
      </main >
    </>
  );
}

export default BlogDetails;
