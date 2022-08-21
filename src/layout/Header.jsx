import React, {useEffect, useState} from "react";
import data from "./navigations.json";
import * as web3 from "@solana/web3.js";
import Cookies from 'universal-cookie';

// IMPORTS
import Container from "./Container";
import { Link, useLocation } from "react-router-dom";

const Header = ({ isOpen, OnClick }) => {
  const cookies = new Cookies();
  const location = useLocation();
  let wallet;


  const [content, setContent] = useState('Connect');

  // useEffect( () => {
  //   try{
  //     async function find () {
  //       wallet = await window.solana.connect()
  //       localStorage.setItem(wallet.publicKey.toString().substr(0, 8) + '...', wallet)
  //       setContent(wallet.publicKey.toString().substr(0, 8) + '...')
  //       return 'dd'
  //     }
  //   }catch (e){
  //     console.log(e)
  //   }
  // })
  return (
    <Container parentClass="header">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Link
            className="text-decoration-none text-white pointer"
            to="/"
            smooth={true}
            duration={600}
            spy={true}
            offset={-800}
          >
            <h2 className="mb-0 fw-bold text-white">CASINOGHOST</h2>
          </Link>
        </div>

        <ul className="d-none d-md-flex list-unstyled gap-4 gap-md-5 mb-0 pe-md-5 me-md-5">
          {data.navigations.map((prev, i) => {
            return (
              <Link
                to={prev.url}
                key={i}
                className={`${
                  location.pathname === prev.url && "fw-bold"
                } text-decoration-none text-white pointer`}
              >
                <li>{prev.name}</li>
              </Link>
            );
          })}
        </ul>

        <div className="right_btn">
          <button className="text-uppercase color1 fw-bold" onClick={async () => {
            try{
              wallet = await window.solana.connect()
              localStorage.setItem('wallet', wallet.publicKey.toString().substr(0, 8) + '...')
              setContent(wallet.publicKey.toString().substr(0, 8) + '...')
            }catch (e){
              console.log(e)
            }}}>{localStorage.getItem('wallet') !== null ? localStorage.getItem('wallet') : "Connect"}</button>
        </div>

        <div className="d-block d-md-none">
          {(isOpen && (
            <svg
              onClick={OnClick}
              stroke="#fff"
              fill="#fff"
              stroke-width="0"
              viewBox="0 0 352 512"
              height="2.5em"
              width="2.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
            </svg>
          )) || (
            <svg
              onClick={OnClick}
              stroke="#fff"
              fill="#fff"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="2.5em"
              width="2.5em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
            </svg>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Header;
