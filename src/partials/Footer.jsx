// Footer.js
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white mb-4">CUSTOMER SERVICE</h4>
          <ul>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Help & FAQs
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Order Tracking
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Shipping & Delivery
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Orders History
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Advanced Search
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Login
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-4">ABOUT US</h4>
          <ul>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Our Stores
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Corporate Sales
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Careers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-4">MORE INFORMATION</h4>
          <ul>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Affiliates
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Refer a Friend
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Student Beans Offers
              </a>
            </li>
            <li>
              <a href="#" className="text-[#777777] text-[16px]">
                Gift Vouchers
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-4">SOCIAL MEDIA</h4>
          <div className="flex space-x-4">
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <YouTubeIcon />
            <LinkedInIcon />
          </div>
        </div>
      </div>
      <div className="bg-gray-900 px-[80px]">
        <div className="flex flex-row items-center gap-3">
            <h1 className="text-[38px]">Porto</h1>
            <p className="text-[#777777] text-[14px]">© Copyright 2022. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
