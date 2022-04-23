import React from "react"
import classes from "./Footer.module.css"
import logo from "../images/logo.png"
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return(
        <footer className={classes.footer}>
           <div className={classes.footerContainer}>
               <div className={classes.footerLogo}>
                   <img className={classes.logoImage} alt="" src={logo} />
               </div>
               <h2 className={classes.companyName}>
                   Skoob
               </h2>
               <nav className={classes.footerNav}>
                   <ul className={classes.footerUl}>
                       <li>Help</li>
                       <li>Explore</li>
                       <li>Contact</li>
                   </ul>
               </nav>
               <div className={classes.socialMedia}>
                <div className={classes.socialMediaItem}>
                <FaFacebookSquare fill="#f8f8f8" />
                </div>
                <div className={classes.socialMediaItem}>
               <FaInstagram fill="#f8f8f8" />
                </div>
               </div>
           </div>
        </footer>
    )
}

export default Footer