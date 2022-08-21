import React, { useState } from "react";
import Layout from "../layout";
import Container from "../layout/Container";
import nft from "../assets/nft.svg";
import coin from "../assets/coin1.gif"
import Popup from "../components/Popup"
import Fliping from "../components/Fliping"
import UserCard from "../components/UserCard"

const Home = () => {
  const [headTailActive, setheadTailActive] = useState(0);
  const headTails = ["HEADS", "TAILS"];

  const [popup, setPopup] = useState(false)
  const [popup2, setPopup2] = useState(false)
  const [popup3, setPopup3] = useState(false)

  const [bid, setBid] = useState()
  const [result, setResult] = useState(null)

  const [won, setWon] = useState('won')

  const [sol, setSol] = useState(0);
  const solBtns = [
    "0.05 SOL",
    "0.1 SOL",
    "0.25 SOL",
    "0.5 SOL",
    "1 SOL",
    "2 SOL",
  ];
  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:4000/flip",
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({amount: solBtns[sol].split(' ')[0] * 1, walletAdress: localStorage.getItem('wallet'), result: result === 1})
        })
    console.log('Отправлена форма.');
  }

  const flipButtonClicked  = (side, solAmount) => {
    if (result === 0){
      setPopup3(true)
    }else setPopup2(true)
  }

  return (
    <Layout>
      <Container parentClass="body">
        <div className="row gy-5 gx-4">
          <div className="col-12 col-md-5">
            <img className="w-100" src={nft} alt="" />
          </div>
          <div className="col-12 col-md-7">
            <h1 className="fw-bold">I LIKE</h1>
            <div className="row">
              <div className="col-12 col-md-8">
                <div className="row">
                  {headTails.map((res, i) => {
                    return (
                      <div key={i} className="col-6">
                        <button
                          onClick={() => setheadTailActive(i)}
                          className={`w-100 py-2 rounded-3 fw-bold ${
                            (headTailActive === i && "active_btn text-white") ||
                            "nonactive_btn"
                          }  h5 fw-bold`}
                        >
                          {res}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <br />
            <br />

            <h1 className="fw-bold">FOR</h1>
            <div className="row gy-3">
              {solBtns.map((res, i) => {
                return (
                  <div key={i} className="col-4">
                    <button
                      onClick={() => setSol(i)}
                      className={`w-100 rounded-3 py-2 h5 ${
                        (sol === i && "active_btn text-white") ||
                        "nonactive_btn"
                      } fw-bold`}
                    >
                      {res}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>




        <div className="d-flex justify-content-center mt-5">
          <form action="http://localhost:4000/flip" method="POST" onSubmit={handleSubmit} onClick={() => {
            if (localStorage.getItem('wallet') !== undefined){
              setResult(Math.floor(Math.random() * 2));
              setPopup(true)
              setTimeout(() => {
                setPopup(false)
                const solAmount = solBtns[sol].split(' ')[0] * 1
                console.log(solAmount)
                setBid(solAmount)
                flipButtonClicked(headTails[headTailActive])
              }, 5000)
            }
          }}>
            <input type="hidden" value={solBtns[sol].split(' ')[0] * 1} name="amount"/>
            <input type="hidden" value={localStorage.getItem('wallet')} name="walletAdress"/>
            <input type="hidden" value={result === 1} name="result"/>
            <button className="text-white fw-bold active_btn py-3 h3 px-5 border-0" onClick={() =>{}}>‘DOUBLE OR NOTHIN’</button>
          </form>





        </div>
        <Fliping popup={popup} setPopup={setPopup}>

          <div className="">
            <img className="coinFlip" src={coin} alt="" />
            <h1>Flipping...</h1>
          </div>
        </Fliping>
        <Popup popup={popup2} setPopup={setPopup2}>
          <div>
            <h3 className="text-center mb-0 h1 fw-bolder color1">
              congratulations
            </h3>
            <h1 className="text-center fw-bolder color1">YOU WON!</h1>
          </div>

          <div className="h1 fw-bold green-bg text-center">{bid} SOL</div>

          <button className="w-100 active_btn fw-light text-uppercase py-2 h5 mb-0 text-white" onClick={() => {
            setPopup2(false)
            setPopup(true)
            setTimeout(() => {
              setPopup(false)
              const solAmount = solBtns[sol].split(' ')[0] * 1
              console.log(solAmount)
              setBid(solAmount)
              flipButtonClicked(headTails[headTailActive])
            }, 5000)}}>Flip again</button>
        </Popup>
        <Popup popup={popup3} setPopup={setPopup3}>
          <div>
            <h3 className="text-center mb-0 h1 fw-bolder color1 text-uppercase">
              oops!
            </h3>
            <h1 className="text-center fw-bolder color1 text-uppercase">
              You LOSE
            </h1>
          </div>

          <div className="color1 h1">:-(</div>

          <button className="w-100 active_btn fw-light text-uppercase py-2 h5 mb-0 text-white" onClick={() => {
            setPopup3(false)
            setPopup(true)
            setTimeout(() => {
              setPopup(false)
              const solAmount = solBtns[sol].split(' ')[0] * 1
              console.log(solAmount)
              setBid(solAmount)
              flipButtonClicked(headTails[headTailActive])
            }, 5000)
          }}>
            let’s TRY again
          </button>
        </Popup>
      </Container>
    </Layout>
  );
};

export default Home;
