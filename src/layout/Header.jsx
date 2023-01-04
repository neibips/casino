import React, {useCallback, useEffect, useState, useContext} from "react";
import io from 'socket.io-client';
import data from "./navigations.json";
import solanaCoin from "../assets/icons/solana.png"

// IMPORTS
import Container from "./Container";
import {Link, useLocation} from "react-router-dom";
import {useWallet} from '@solana/wallet-adapter-react';
import {WalletNotConnectedError} from '@solana/wallet-adapter-base';
import {WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import BalanceContext from "../BalanceContext";

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

// http://localhost:4000/
// http://194.67.111.233:4000/
const ENDPOINT = "https://tinyinvader.herokuapp.com/"
let socket;

const Header = ({ isOpen, OnClick }) => {
    //WALLET PUBLIC KEY
    const { publicKey } = useWallet();

    const {balance, updateBalance} = useContext(BalanceContext)
    console.log(balance)
    useEffect(() => {
        socket = io(ENDPOINT)
        socket.on('update balance', (data) => {
            console.log('aaaaa')
            updateBalance(data)
        })
    }, [])

    const [userBalance, setUserBalance] = useState(0)

    useEffect(() => {
        if(publicKey) {
            userCreation()
        }
    }, [publicKey])
    const location = useLocation()



    const userCreation = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();

        const createUser = async () => {
            const base58 = publicKey.toString()
            await fetch(ENDPOINT,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({amount: 0, walletAdress: base58})
                })
        }
        createUser().then(() => {
            socket.emit('request balance', publicKey.toBase58())
        })
    }, [publicKey]);


  const [content, setContent] = useState('Connect');
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
                  ><h3 className="bigName mb-0">Tiny Invaders casino</h3></Link>
              </div>

              {/*navigation*/}
              {/*<ul className="d-none d-md-flex list-unstyled gap-4 gap-md-5 mb-0 pe-md-5 me-md-5">
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
              </ul>*/}
              <div className="placeForBalance right_btn mx-0">
                  <div>
                      <img src={solanaCoin} className='mx-1' alt="" style={{
                          width: '35px',
                          height: '35px',
                      }}/>
                  </div>
                  <div className="balanceWrapper">
                      <p className="balanceText">{balance.toFixed(5)}</p>
                      <p className="coinText">SOL</p>
                  </div>
              </div>
              <div className="right_btn">
                  <WalletMultiButton />
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
