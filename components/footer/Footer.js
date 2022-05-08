import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { faFacebook, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return (
      <>
        <div className="footer row">
          <div className="col-md-4 footer-left">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </div>
          <div className="col-md-4 footer-middle">
            
              <a href="https://twitter.com/thenftsland"><FontAwesomeIcon
                icon={faFacebook}
                style={{ fontSize: 20, color: "white" }}
              /></a>

        <a href="https://twitter.com/thenftsland"><FontAwesomeIcon
                icon={faInstagram}
                style={{ fontSize: 20, color: "white" }}
              /></a>

        <a href="https://twitter.com/thenftsland"><FontAwesomeIcon
                icon={faLinkedinIn}
                style={{ fontSize: 20, color: "white" }}
              />
</a>

        <a href="https://twitter.com/thenftsland"><FontAwesomeIcon
                icon={faTwitter}
                style={{ fontSize: 20, color: "white" }}
              /></a>


            
          </div>
          <div className="col-md-4 footer-right">
            <li>
              <a href="mailto:thenftslandofficial@gmail.com">
                thenftslandofficial@gmail.com
              </a>
            </li>
          </div>
        </div>
      </>
    );
};

export default Footer;