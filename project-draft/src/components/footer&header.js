import React from 'react';
// import the font-icon style
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Nav() {
    return(
    <section className="navbar">
    <nav>
      <header>
        <h1 ><a className="logo" href="#">Dvogue</a></h1>
        </header>
        <a href="#">My Closet</a>
        <div className="nav-dropdown">
        <button className="dropbutton">Cloth Generator 
        <FontAwesomeIcon icon={faCaretDown} />
        </button>
        <div className="nav-dropdown-content">
          <a href="#">Outfit Generator</a>
          <a href="#">Item Generator</a>
        </div>
      </div>
      <a href="#">Blog</a>
      <a href="#">About us</a>
      <a className="login" href="#"><FontAwesomeIcon icon={faUser} />Login</a>
    </nav>
    </section>
    )

}

export function Footer() {

    return(
        <footer className="footer">
        <ul className="footer1">
    
          <li className="footeritem">
            <h2 className="title">Home</h2>
          </li>
      
          <li className="footeritem">
            <h2 className="title">Cloth generator</h2>
            <ul className="footerul">
              <li>
                <a href="#">Generate full outfit</a>
              </li>
              <li>
                <a href="#">Generate items</a>
              </li>
            </ul>
          </li>
      
          <li className="footeritem">
            <h2 className="title">Blogs</h2>
          </li>
      
          <li className="footeritem">
            <h2 className="title">About</h2>
            <ul className="footerul">
              <li>
                <a href="#">About the web</a>
              </li>
            </ul>
          </li>
      
          <li className="footeritem">
            <h2 className="title">Social</h2>
      
            <ul className="footerul">
              <li>
                <a href="#">Our instagram</a>
              </li>
      
              <li>
                <a href="#">Our Facebook</a>
              </li>
      
              <li>
                <a href="#">Our twitter</a>
              </li>
            </ul>
          </li>
        </ul>

        <div className="contact">
          <h2>Contact Us:</h2>
          <li>
            <a href="info@dvougue.com">Contact us via email</a>
          </li>
          <li>
            <a href="tel:543-126-8970">Contact us via phone</a>
          </li>
        </div>
      
        <div className="groupmember">
          <p>&copy; powered by Iris Ding, Frank Lin, Jiali Liu, Phuong Vu.</p>
        </div>
      </footer>
    );
}