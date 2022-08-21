import React, { useState } from "react";
import Chart from "../components/Chart";
import Popup from "../components/Popup";
import Layout from "../layout";
import Container from "../layout/Container";

const Crash = () => {
  const [popup, setPopup] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const [crashCount, setCrashCount] = useState(0);

  const less = () => {
    setCrashCount((res) => {
      return res - 0.1;
    });
  };

  const add = () => {
    setCrashCount((res) => {
      return res + 0.1;
    });
  };

  return (
    <Layout>
      <Popup popup={popup} setPopup={setPopup}>
        <div>
          <h3 className="text-center mb-0 h1 fw-bolder color1">
            congratulations
          </h3>
          <h1 className="text-center fw-bolder color1">YOU WON!</h1>
        </div>

        <div className="h1 fw-bold green-bg text-center">2.3 SOL</div>

        <button className="w-100 active_btn fw-light text-uppercase py-2 h5 mb-0 text-white">
          Flip again
        </button>
      </Popup>

      <Popup popup={popup2} setPopup={setPopup2}>
        <div>
          <h3 className="text-center mb-0 h1 fw-bolder color1 text-uppercase">
            oops!
          </h3>
          <h1 className="text-center fw-bolder color1 text-uppercase">
            You LOSE
          </h1>
        </div>

        <div className="color1 h1">:-(</div>

        <button className="w-100 active_btn fw-light text-uppercase py-2 h5 mb-0 text-white">
          let’s TRY again
        </button>
      </Popup>

      <Container parentClass="body-crash">
        <div className="mt-4 mb-5">
          <h1 className="display-5 text-uppercase text-center fw-bold">
            Place Your BEt
          </h1>
        </div>

        <div className="row">
          <div className="col-12 col-lg-11 mx-auto">
            <div className="row gy-5">
              <div className="col-12 col-lg-8">
                <Chart />
              </div>
              <div className="col-12 col-lg-4">
                <h2 className="text-uppercase text-center fw-bold mb-4">
                  CASH
                </h2>

                <div>
                  <label
                    className="text-uppercase fw-bold h6"
                    htmlFor="BET AMOUNT"
                  >
                    BET AMOUNT
                  </label>
                  <input
                    className="bet-amount w-100"
                    type="number"
                    name=""
                    id=""
                    placeholder="00.0"
                  />
                </div>
                <br />
                <div>
                  <label
                    className="text-uppercase fw-bold h6"
                    htmlFor="BET AMOUNT"
                  >
                    Multiplier
                  </label>
                  <div className="count-up-down">
                    <button onClick={less} className="active_btn less">
                      -
                    </button>
                    <input
                      readOnly
                      value={crashCount.toFixed(1)}
                      className="multiplier-amount w-100"
                      type="text"
                      placeholder="00.0"
                    />
                    <button onClick={add} className="active_btn add">
                      +
                    </button>
                  </div>
                </div>

                <div className="place-btn d-flex">
                  <button
                    onClick={() => setPopup(true)}
                    className="active_btn text-white py-2 mt-5 tx-space fw-light"
                  >
                    PLACE BET
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="percent-line mt-4 mb-5">
          {[1, 1, 2, 1, 2, 1, 1, 1, 2, 2, 1].map((res, i) => {
            return (
              <div
                className={`${
                  (res === 1 && "g-line") || "r-line"
                } p-line fw-bold ChakraPetch`}
              >
                2.1x
              </div>
            );
          })}
        </div>

        <div className="row gy-4 gx-0 place-your-bet">
          <div className="col-12 col-lg-11 mx-auto">
            <div className="row">
              <div className="col-12 col-lg-6">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((res, i) => {
                  return (
                    <div
                      key={i}
                      className="ChakraPetch col-12 d-flex justify-content-between align-items-center ps-5"
                    >
                      <div className="rooster">ROOSTER</div>
                      <div>Cash out at 2.34</div>
                      <div className="doubled_btn px-3 py-2">4.65 SOL</div>
                    </div>
                  );
                })}
              </div>
              <div className="col-12 col-lg-6">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((res, i) => {
                  return (
                    <div
                      key={i}
                      className="ChakraPetch ChakraPetch2 col-12 d-flex justify-content-between align-items-center ps-5"
                    >
                      <div className="rooster">ROOSTER</div>
                      <div>Cash out at 2.34</div>
                      <div className="doubled_btn px-3 py-2">4.65 SOL</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
      </Container>
    </Layout>
  );
};

export default Crash;
