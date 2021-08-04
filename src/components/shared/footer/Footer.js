import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light p-4 text-center">
      <p className="m-0">&copy;Anca Andrei-Razvan 2021</p>
      <div className="socials">
        <a
          href="https://github.com/Ssmartcode/Tourismwebsite-frontend"
          className="socials__github"
        >
          Github
        </a>
        <a href="https://andrei-razvan.com" className="socials__portofolio">
          Portofolio
        </a>
      </div>
    </footer>
  );
};

export default Footer;
