import React, {useContext, useEffect, useMemo, useState} from "react";
import Layout from "../layout";
import Container from "../layout/Container";
import io from 'socket.io-client';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import BalanceContext from "../BalanceContext";
import SomeChart from "../components/CrashChart";
import Popup from "../components/Popup"
import * as bs58 from "bs58";
import {WalletNotConnectedError} from '@solana/wallet-adapter-base';
import {AnchorProvider} from "@project-serum/anchor";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";

// http://localhost:4000/
// http://194.67.111.233:4000/
const ENDPOINT = "https://tinyinvader.herokuapp.com/"
let socket;


const Crash = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const [crashCount, setCrashCount] = useState(0);
  const [factor, setFactor] = useState(0);
  const [timerBack, setTimerBack] = useState(0)
  const [factorStyle, setFactorStyle] = useState('white')
  const [betValue, setBetValue] = useState(0)
  const [disabled, setDisabled] = useState(true)
  const [takeButtonText, setTakeButtonText] = useState('waiting for game...')
  const [connected, setConnected] = useState(true);
  const [playerActive, setPlayerActive] = useState(false)
  const [canTake, setCanTake] = useState(false)
  const [chartData, setChartData] = useState({ datasets: [], });
  const [chartOptions, setChartOptions] = useState({});
  const [sum, setSum] = useState(0.001)
  const [popup, setPopup] = useState(false)
  const [popup2, setPopup2] = useState(false)
  const [arrLastGames, setArrLastGames] = useState([{finalFactor: 1}])

  let running = false
  const {balance, updateBalance} = useContext(BalanceContext);
  let canvas;
  let ctx;
  let finalFactor = 0
  const arr = []

  useEffect(() => {
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
  }, [])

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.on('connection', () => setConnected(true))
    socket.on('chat message', function(msg) {
      const messages = document.getElementById('messages');
      var item = document.createElement('li');
      item.classList.add('colorMain');
      item.textContent = msg.wallet.slice(0, 4) +'...' + msg.wallet.slice(-4) + ': ' + msg.text
      messages.appendChild(item)
    });
    socket.on('timer', (data) => {
      if (!running){
        script1(data)
      }
    })
    socket.on('game', (data) => {
      script2(data.start, data.speed)
    })
    socket.on('getUserAccount', (data) => {
      if(data.bid !== undefined){
        setPlayerActive(true)
      }
    })
    socket.on('final factor', (data) => {
      finalFactor = data
    })
    socket.on('bid accepted', (data) => {
      setPlayerActive(true)
      const notify = () => toast(data)
      notify()
    })
    socket.on('bid error', (data) => {
      const notify = () => toast(data)
      notify()
    })
    socket.on('winwin', (data) => {
      const notify = () => toast(`You win `)
      notify()
    })
    socket.on('update balance', (data) => {
      updateBalance(data)
    })
    socket.on('update balance2', (data) => {
      updateBalance(data)
    })
    socket.on('update balance1', (data) => {
      updateBalance(data)
    })
    socket.on('last games', (data) => {
      setArrLastGames(data)
    })
  }, [])

  useEffect(() => {
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("focus", () => console.log());

    };
  }, []);

  const onFocus = () => {
    socket.emit('updateWindow', 'window updated')
  }

  const script1 = (timer) => {
    socket.on('update timer', (data) => {
      timer = data
    })
      running = true
      setDisabled(false)
      setCanTake(false)
      const timerBack = setInterval(() => {
        if (timer > 0){
          timer -= 0.1
          setTimerBack(timer.toFixed(1))
        }else {
          clearInterval(timerBack)
          timer = 10
          setDisabled(true)
          script2(1, 1)
          setTakeButtonText('take')
        }
      }, 100)
  }

  const script2 = (start, speed) => {
    socket.on('update game', (data) => {
      console.log('game updated')
      start = data.start
      speed = data.speed
    })
    const gameFactor = 0.01
    ctx.beginPath();
    setCanTake(true)
    const crashGameFactor = setInterval(() => {
      if (finalFactor === 0){
        start += gameFactor * speed
        speed += gameFactor
        ctx.fillRect(start*80,300-Math.pow(start * 3,2),4,4);
        setFactor(start.toFixed(2))
        ctx.fillStyle="white";
      }else{
        clearInterval(crashGameFactor)
        setDisabled(false)
        setCanTake(false)
        setFactor(finalFactor.toFixed(2))
        setFactorStyle('red')
        setPlayerActive(false)
        socket.emit('get games', 'get')
        setTimeout(() => {
          setFactor(0)
          finalFactor = 0
          setFactorStyle('white')
          ctx.clearRect(0, 0, 500, 300);
          script1(10)
        }, 2000)
      }
    }, 100)
  }

  const sendForm = async (e) => {
    e.preventDefault()
    if (e.target[0].value !== ''){
      if (!publicKey) {
        const notify = () => toast("Connect your wallet first");
        return notify()
      }
      socket.emit('chat message', {
        text: e.target[0].value,
        wallet: base58
      });
      e.target[0].value = ''
    }else{
      const notify = () => toast("You cant send empty string");
      return notify()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (betValue >=  0.00001 && betValue <= balance){
      socket.emit('new bid', {
        amount: betValue,
        wallet: base58
      })
      setPlayerActive(false)
    }else{
      const notify = () => toast('Wrong amount')
      notify()
    }
  }

  const handleResult = async (e) => {
    e.preventDefault()
    console.log('alo')
    socket.emit('take', base58)
  }

  useEffect(() => {
    arr.push(factor)
    sendToChart()
  }, [factor])

  const sendToChart = () => {
    setChartData({
      labels: [1, 2, 3, 4, 5],

      datasets: [
        {
          label: 'crash',
          data: factor !== 0 ? [1].concat(arr) : 0,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          color: "rgba(255, 255, 255,1)",
          pointRadius: 0,
          borderDash: [35, 5],
          lineTension: 0.1,
        },
      ],
    });
    setChartOptions({
          events: [],
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0.1
            }
          },
          scales: {
            yAxes: {
              type: 'linear',

              title: {
                display: false,
                text: 'value'
              },
              min: 1,
              max: (factor > 2 ? (factor) : (2)),
              ticks: {
                color: "rgba(255, 255, 255,1)",
                maxTicksLimit: 5,
                callback: function (value, index, values) {
                  if (value % 0.5 == 0) return (parseFloat(value)).toFixed(2)
                }
              },
              grid: {
                display: true,
                color: 'white'
              },
            },
            xAxes: {
              type: 'linear',
              title: {
                display: false,
                text: 'value'
              },
              max: (factor > 2 ? (factor) : (2)),
              ticks: {
                color: "rgba(255, 255, 255,1)",

                maxTicksLimit: 5,
                callback: function (value, index, values) {
                  if (1 < 10) {
                    if (value % 1 == 0) return value
                  } else {
                    if (value % 10 == 0) return value
                  }
                }
              },
              grid: {
                display: true,
                color: 'white'
              },
            },
          },
          plugins: {
            legend: { display: false },
          },
          animation: {
            x: {
              type: 'number',
              easing: 'linear',
              duration: 0,
              from: 5,
              delay: 0
            },
            y: {
              type: 'number',
              easing: 'linear',
              duration: 0,
              from: 5,
              delay: 0
            },
            loop: true,
          },
        }
    );
  }

  const onWithdraw = async (e) => {
    e.preventDefault()
    try{
      const money = sum * 1
      let data;
      const gamess = await fetch(`${ENDPOINT}flip`).then(result => {
        return result.json()
      })

      data = gamess
      console.log(data)
      let bob = 0
      data.map((user) => {
        if (user.wallet === base58){
          bob = user.balance
        }})
      console.log(bob)
      if (money <= bob){
        await fetch(`${ENDPOINT}flip`,
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "PUT",
              body: JSON.stringify({amount: -money, walletAddress: base58})
            })
      }else{
        const notify = () => toast('Not enough on balance');
        notify();
        return () => {};
      }
      const notifu = () => toast('Please wait. Proccessing//...//');
      notifu();
      const ref_payer = Keypair.fromSecretKey(bs58.decode("4YXbzB2u2L23QUAYen5bfhUofc9KTovPQNMeAbdKBBfk7HNEkSwJfGRMZkGt5FsKkejLVWxAjQ1kPhHXoetmaWYb"))
      const wallet1 = new NodeWallet(ref_payer);
      const networkName = "mainnet";
      const connection = new Connection("https://api.metaplex.solana.com/");
      const provider = new AnchorProvider(connection, wallet1, {});
      const ts5 = new Transaction().add(SystemProgram.transfer({
        fromPubkey: ref_payer.publicKey,
        toPubkey: publicKey,
        lamports: money * LAMPORTS_PER_SOL,
      }));
      const result3 = await provider.sendAndConfirm(ts5, [ref_payer]).then(() => {
        const notify = () => toast('Sent succesfully');
        notify();
      });

      socket.emit('request balance', publicKey.toBase58())
      setPopup(false)
      const notify = () => toast('success');
      notify()
    }catch (e) {
      setPopup(false)
      console.log(e)
      const notify = () => toast("You cant withdraw. Sorry");
      notify()
    }

  }

  const onDeposit = async (e) => {
    e.preventDefault()
    if (!publicKey) throw new WalletNotConnectedError();
    try {
      let wallet = new PublicKey("3rAY5AUTwaQDzoFMN6TDgH6mW9fT6bqmT8rcgzKHSjVV");
      const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: wallet,
            lamports: sum * LAMPORTS_PER_SOL,
          })
      );

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight }
      } = await connection.getLatestBlockhashAndContext();
      const signature = await sendTransaction(transaction, connection, { minContextSlot });
      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
      console.log("Баланс будет изменен на " + sum * 1)
      await fetch(`${ENDPOINT}flip`,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({amount: sum * 1, walletAddress: base58})
          })

      socket.emit('request balance', publicKey.toBase58())
      setPopup2(false)
      const notify = () => toast('Deposited successfully. Please reload the site');
      notify()
    }catch (e){
      setPopup2(false)
      const notify = () => toast(e.toString());
      notify()
    }

  }

  return (

        <Layout>
          <Container parentClass="body-crash">

            <Popup popup={popup} setPopup={setPopup}>
              <form onSubmit={onWithdraw}>
                <h1>Withdraw form</h1>
                <div className="col">
                  <label htmlFor="bet" className="colorMain">Enter Amount</label>
                  <input type="text" className="form-control" id="bet" placeholder="0.00" value={sum}  onChange={e => setSum(e.target.value)} min="0.0001" max={balance}/>
                </div>
                <button type="submit" className="w-100 active_btn fw-light text-uppercase py-2 h5 mt-4 text-white" >withdraw</button>
                <p>dont close this window on withdraw</p>
              </form>
            </Popup>
            <Popup popup={popup2} setPopup={setPopup2}>
              <form onSubmit={onDeposit}>
                <h1>Deposit form</h1>
                <div className="col">
                  <label htmlFor="bet">Enter Amount</label>
                  <input type="text" className="form-control" id="bet" placeholder="0.001" value={sum}  onChange={e => setSum(e.target.value)} min="0.0001" max={balance}/>
                </div>
                <button type="submit" className="w-100 active_btn fw-light text-uppercase py-2 h5 mt-4 text-white" >DEPOSIT</button>
              </form>
            </Popup>
            <ToastContainer />
            <div className='btnDpWt'>
              <button className="button-29" onClick={() => setPopup2(true)}>Deposit</button>
              <button className="button-29" onClick={() => setPopup(true)}>Withdraw</button>
            </div>


            <div className="row">
              <div className="col-12 col-lg-11 mx-auto">
                <div className="row gy-5">


                  {/*crash chart*/}

                  <div className="col-12 col-lg-8" style={{justifyContent: 'center' }}>
                    <h1 style={{color: factorStyle, textAlign: 'center'}} className='textCenter my-5 mx-lg-5'>{factor !== 0 ? factor + 'X' : timerBack}</h1>
                    <canvas id="canvas" style={{position: 'absolute', width: '300'}} className='crashChart'/>
                    {chartData ? (<SomeChart chartData={chartData} chartOptions={chartOptions} />) : ('')}
                  </div>

                  {/*interface*/}
                  <div className="col-12 col-lg-4">
                    <div style={{justifyContent: "center"}} className='mb-3'>
                      <button type="button" className="btn btn-outline-primary mx-1" onClick={() => setBetValue(0.0001)}>min</button>
                      <button type="button" className="btn btn-outline-primary mx-1" onClick={() => setBetValue(betValue / 2)}>1/2</button>
                      <button type="button" className="btn btn-outline-primary mx-1" onClick={() => setBetValue(betValue * 2)}>x2</button>
                      <button type="button" className="btn btn-outline-primary mx-1" onClick={() => setBetValue(balance)}>max</button>
                    </div>
                    {!playerActive ?  (<form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col">
                          <label htmlFor="bet" className="colorMain">Bet</label>
                          <input type="text" className="form-control" id="bet" placeholder="0.00" value={betValue}  onChange={e => setBetValue(e.target.value)} min="0.0001" max={balance}/>
                        </div>
                        <div className="col">
                          <label htmlFor="Autostop" className="colorMain">Auto Stop</label>
                          <input type="text" className="form-control" id="Autostop" placeholder="1.00" disabled="true"/>
                        </div>
                        <button type="submit" className="w-100 active_btn fw-light text-uppercase py-2 h5 mt-4 text-white" disabled={disabled} id='playBtn'>make a bid</button>
                      </div>
                    </form>) : (
                        <form onSubmit={handleResult}>
                          <div className="row">
                            <div className="col">
                              <label htmlFor="bet">Bet</label>
                              <input type="text" className="form-control" id="bet" placeholder="0.00" value={betValue}  onChange={e => setBetValue(e.target.value)} min="0.0001" max={balance}/>
                            </div>
                            <div className="col">
                              <label htmlFor="Autostop">Auto Stop</label>
                              <input type="text" className="form-control" id="Autostop" placeholder="1.00" disabled="true"/>
                            </div>
                            <button type="submit" className="w-100 active_btn fw-light text-uppercase py-2 h5 mt-4 text-white" id='playBtn' disabled={!canTake}>{takeButtonText}</button>
                          </div>
                        </form>
                    )
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="percent-line mt-4 mb-5">
              {arrLastGames.map((game) => {
                return (
                    <div
                        className={`g-line p-line fw-bold ChakraPetch`}>{game.finalFactor}x</div>
                );
              })}
            </div>
            <div className="col-12 col-lg-8">
              <h1 className='colorMain'>online chat</h1>
              <ul id="messages">
              </ul>
              <form id="form" onSubmit={sendForm}>

                <input id="input" autoComplete="off"/>
                <button>Send</button>
              </form>
            </div>


            {/*<div className="row gy-4 gx-0 place-your-bet">*/}
            {/*  <div className="col-12 col-lg-11 mx-auto">*/}
            {/*    <div className="row">*/}
            {/*      <div className="col-12 col-lg-6">*/}
            {/*        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((res, i) => {*/}
            {/*          return (*/}
            {/*              <div*/}
            {/*                  key={i}*/}
            {/*                  className="ChakraPetch col-12 d-flex justify-content-between align-items-center ps-5"*/}
            {/*              >*/}
            {/*                <div className="rooster">ROOSTER</div>*/}
            {/*                <div>Cash out at 2.34</div>*/}
            {/*                <div className="doubled_btn px-3 py-2">4.65 SOL</div>*/}
            {/*              </div>*/}
            {/*          );*/}
            {/*        })}*/}
            {/*      </div>*/}
            {/*      <div className="col-12 col-lg-6">*/}
            {/*        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((res, i) => {*/}
            {/*          return (*/}
            {/*              <div*/}
            {/*                  key={i}*/}
            {/*                  className="ChakraPetch ChakraPetch2 col-12 d-flex justify-content-between align-items-center ps-5"*/}
            {/*              >*/}
            {/*                <div className="rooster">ROOSTER</div>*/}
            {/*                <div>Cash out at 2.34</div>*/}
            {/*                <div className="doubled_btn px-3 py-2">4.65 SOL</div>*/}
            {/*              </div>*/}
            {/*          );*/}
            {/*        })}*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <br />
            <br />
            <br />
          </Container>
        </Layout>
  );
};

export default Crash;
