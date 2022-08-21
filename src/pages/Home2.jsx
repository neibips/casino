import React, {useEffect, useState} from "react";
import Layout from "../layout";
import Container from "../layout/Container";

const Home2 = () => {
  let counter = 0;
  let counter2 = 0;
  useEffect(() => {
    counter = 0
    counter2 = 0
    fetchItems()
  }, [])
  const [games, setGames] = useState([{amount: 100, walletAdress: '2123', result: true}])
  const fetchItems = async () => {
    let data;
    const gamess = await fetch('http://localhost:4000/').then(result => {
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
      <Container parentClass="body_home2">
        <div className="d-flex flex-column justify-content-center align-items-center text-uppercase mt-4">
          <h1 className="display-5 fw-bold">‘double or nothin’</h1>

          <button className="active_btn text-white fw-light px-4 h4 py-2 mt-4 text-uppercase">
            Select Wallet
          </button>
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
                                        {game.walletAdress}... flipped {game.amount} and got
                                      </p>
                                      <p className="small mb-0">12 seconds ago</p>
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
                                        {game.walletAdress} flipped {game.amount} and got
                                      </p>
                                      <p className="small mb-0">12 seconds ago</p>
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
