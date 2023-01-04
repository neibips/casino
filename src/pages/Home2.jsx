import React, {useEffect, useState} from "react";
import Layout from "../layout";
import Container from "../layout/Container";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en'
// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');



const Home2 = () => {
  let counter = 0;
  let counter2 = 0;
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");


  useEffect(() => {
    counter = 0
    counter2 = 0
    fetchItems()
  }, [])
  const [games, setGames] = useState([{amount: 100, walletAdress: '2123', result: true, timeStamp: 12}])
  const fetchItems = async () => {
    let data;
    const gamess = await fetch('https://casinoghostbackend.herokuapp.com/').then(result => {
      data = result.clone().json()
      return result
    })

    data = await gamess.json().then((dd) => {
      return dd
    })
    console.log(data);
    setGames(data);
  }
  return (



            <Layout>
              <Container parentClass="body_home2" >
                <div className="d-flex flex-column justify-content-center align-items-center text-uppercase mt-4">
                  <h1 className="display-5 fw-bold">‘double or nothin’</h1>
                </div>

                <div className="body_home_container mt-5 mb-5">
                  <div className="d-flex align-items-center gap-4">
                    <div className="light_line_recent"></div>
                    <h3 className="">RECENT PLAYS</h3>
                    <div className="light_line_recent"></div>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-12 col-lg-11 mx-auto">
                    <div className="row gy-5">
                      <div className="col-12 col-lg-6">
                        <div className="row gy-3">
                          {games.map((game) => {
                            if(game.result === true) {
                              counter ++
                            }
                            if(game.result === true && counter <= 5){
                              let inSeconds;
                              if(game.timeStamp !== undefined) {
                                inSeconds = new Date(game.timeStamp).getTime();
                              }else {
                                inSeconds = new Date(Date.now()).getTime();
                              }
                              const minutesAgo = timeAgo.format(inSeconds - 60 * 1000);
                              return (
                                  <div className="col-12">
                                    <div className="recent_plays_card">
                                      <div className="row align-items-center">
                                        <div className="col-8">
                                          <div className="row align-items-center">
                                            <div className="col-3">
                                              <svg
                                                  className="w-100"
                                                  width="57"
                                                  height="56"
                                                  viewBox="0 0 77 76"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <rect
                                                    x="0.666016"
                                                    y="0.450623"
                                                    width="75.4499"
                                                    height="75.4499"
                                                    rx="11"
                                                    fill="#D9D9D9"
                                                />
                                              </svg>
                                            </div>
                                            <div className="col-9 ps-0">
                                              <p className="mb-0">
                                                {game.walletAdress.slice(0, 4) + '..' + game.walletAdress.slice(-4)}... flipped {game.amount} and got
                                              </p>
                                              <p className="small mb-0">{minutesAgo}</p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <button className="w-100 fw-bold doubled_btn border-0 py-2">
                                            DOUBLED
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>);
                            }
                          })}

                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div className="row gy-3">
                          {games.map((game) => {
                            if(game.result === false) {
                              counter2 ++
                            }
                            if (game.result === false && counter2 <= 5) {
                              let inSeconds;
                              if(game.timeStamp !== undefined) {
                                inSeconds = new Date(game.timeStamp).getTime();
                              }else {
                                inSeconds = new Date(Date.now()).getTime();
                              }
                              const minutesAgo = timeAgo.format(inSeconds - 60 * 1000);
                              return (
                                  <div className="col-12">
                                    <div className="recent_plays_card">
                                      <div className="row align-items-center">
                                        <div className="col-8">
                                          <div className="row align-items-center">
                                            <div className="col-3">
                                              <svg
                                                  className="w-100"
                                                  width="57"
                                                  height="56"
                                                  viewBox="0 0 77 76"
                                                  fill="none"
                                                  xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <rect
                                                    x="0.666016"
                                                    y="0.450623"
                                                    width="75.4499"
                                                    height="75.4499"
                                                    rx="11"
                                                    fill="#D9D9D9"
                                                />
                                              </svg>
                                            </div>
                                            <div className="col-9 ps-0">
                                              <p className="mb-0">
                                                {game.walletAdress.slice(0, 4) + '..' + game.walletAdress.slice(-4)} and got
                                              </p>
                                              <p className="small mb-0">{minutesAgo}</p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-4">
                                          <button className="w-100 fw-bold rugged_btn border-0 py-2">
                                            RUGGED
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                              );
                            }

                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </Layout>




  );
};

export default Home2;
