import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Link from 'next/link';

import { faFacebook, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
    return (
      <>
        <div className="footer row">
          <div className="col-md-4 footer-left">
            <li>
              <Link href="/privacypolicy"><a >Privacy Policy</a></Link>
            </li>
            <li>
              <Link href="/termsandcondition"><a>Terms & Conditions</a></Link>
            </li>
          </div>
          <div className="col-md-4 footer-middle">
            
              <a href="https://twitter.com/thenftslot"><FontAwesomeIcon
                icon={faFacebook}
                style={{ fontSize: 20, color: "white" }}
              /></a>

        <a href="https://twitter.com/thenftslot"><FontAwesomeIcon
                icon={faInstagram}
                style={{ fontSize: 20, color: "white" }}
              /></a>

        <a href="https://twitter.com/thenftslot"><FontAwesomeIcon
                icon={faLinkedinIn}
                style={{ fontSize: 20, color: "white" }}
              />
</a>

        <a href="https://twitter.com/thenftslot"><FontAwesomeIcon
                icon={faTwitter}
                style={{ fontSize: 20, color: "white" }}
              /></a>


            
          </div>
          <div className="col-md-4 footer-right">
            <li>
              <a href="mailto:thenftslot@gmail.com">
              thenftslot@gmail.com
              </a>
            </li>
          </div>
        </div>
      </>
    );
};

export default Footer;