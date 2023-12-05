import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { API_URL } from "actions/constants/constants";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="grid wide">
          <div className="row">
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">Chăm sóc khách hàng</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Hướng dẫn mua hàng
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Chính sách vận chuyển
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">Về chúng tôi</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Giới thiệu về Shop
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Tuyển dụng
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    Điều khoản Shop
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">ĐATN</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    K59
                  </Link>
                </li>
             
              </ul>
            </div>
            <div className="col l-2-4 m-4 c-6">
              <h3 className="footer__heading">Theo dõi chúng tôi</h3>
              <ul className="footer-list">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    <i className="fab fa-facebook" />
                    Facebook
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    <i className="fab fa-instagram" />
                    Instagram
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    <i className="fab fa-twitter" />
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col l-2-4 m-8 c-12">
              <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
              <div className="footer__download">
                <Link to="/" className="footer__download-link">
                  <img
                    className="footer__download-img"
                    src= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_3eIlP3ThOFmE-fRbtZU7I6iSz4p8maMYBA&usqp=CAU"
                    alt=""
                  />
                </Link>
                <div className="footer__download-apps">
                  <Link to="/" className="footer__download-apps-link">
                   
                  </Link>
                  <Link to="/" className="footer__download-apps-link">
                   
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="footer__bottom">
        
      </div>
    </>
  );
}
