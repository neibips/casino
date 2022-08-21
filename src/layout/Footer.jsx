import React from "react";
import { a } from "react-scroll";
import Container from "./Container";
import d from "../assets/icons/d.svg";
import m from "../assets/icons/m.svg";
import t from "../assets/icons/t.svg";

const Footer = () => {
  return (
    <Container parentClass="footer">
      <ul className="d-flex justify-content-center list-unstyled gap-4 gap-md-5 flex-wrap">
        <a
          href="https://www.facebook.com/"
          target="blank"
          className="text-decoration-none text-white pointer"
        >
          <li>ABOUT</li>
        </a>
        <a
          href="https://www.facebook.com/"
          target="blank"
          className="text-decoration-none text-white pointer"
        >
          <li>FAQ</li>
        </a>
        <a
          href="https://www.facebook.com/"
          target="blank"
          className="text-decoration-none text-white pointer"
        >
          <li>HOW TO PLAY</li>
        </a>
        <a
          href="https://www.facebook.com/"
          target="blank"
          className="text-decoration-none text-white pointer"
        >
          <li>FLIP RESPONSIBLY</li>
        </a>
        <a
          href="https://www.facebook.com/"
          target="blank"
          className="text-decoration-none text-white pointer"
        >
          <li>BUG BOUNTY</li>
        </a>
      </ul>

      <ul className="d-flex d-md-none mt-5 justify-content-center list-unstyled gap-2">
        <li>
          <a href="https://magic-eden-new-today-nft-jp.com/official/?userID=7" target="blank">
            <img src={m} alt="" />
          </a>
        </li>
        <li>
          <a href="https://twitter.com/login" target="blank">
            <img src={t} alt="" />
          </a>
        </li>
        <li>
          <a href="https://discord.com/" target="blank">
            <img src={d} alt="" />
          </a>
        </li>
      </ul>

      <div className="d-flex justify-content-between align-items-center mt-5 w-100">
        <p className="text-white mb-0">Solana Network: 1866 TPS</p>
        <ul className="d-none d-md-flex justify-content-center list-unstyled gap-2">
          <li>
            <img src={m} alt="" />
          </li>
          <li>
            <img src={t} alt="" />
          </li>
          <li>
            <img src={d} alt="" />
          </li>
        </ul>
        <p className="text-white mb-0">casinoghost.net</p>
      </div>
    </Container>
  );
};

export default Footer;
