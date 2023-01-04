import React, {useCallback, useEffect, useMemo, useState} from "react";
import Layout from "../layout";
import Container from "../layout/Container";
import nft from "../assets/nft.svg";
import coin from "../assets/coin1.gif"
import Popup from "../components/Popup"
import Fliping from "../components/Fliping"
import * as bs58 from "bs58";
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {AnchorProvider} from "@project-serum/anchor";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  let publicKey1

  useEffect(() => {
    fetchItems()
    publicKey1 = publicKey
  }, [])
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);


  const [headTailActive, setheadTailActive] = useState(0);
  const headTails = ["HEADS", "TAILS"];

  const [popup, setPopup] = useState(false)
  const [popup2, setPopup2] = useState(false)
  const [popup3, setPopup3] = useState(false)

  const [bid, setBid] = useState()
  const [result, setResult] = useState()
  let result1;

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
    if (base58 !== undefined){
      const ans = Math.floor(Math.random() * 2)
      console.log(ans)
      setPopup(true)
      if (ans === 1){
        result1 = true
        await fetch("https://casinoghostbackend.herokuapp.com/flip",
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({amount: solBtns[sol].split(' ')[0] * 1, walletAdress: base58, result: true})
            })
      }else{
        result1 = false
        console.log(result1)
        await fetch("https://casinoghostbackend.herokuapp.com/flip",
            {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({amount: solBtns[sol].split(' ')[0] * 1, walletAdress: base58, result: false})
            })
      }
      setTimeout(() => {
        setPopup(false)
        const solAmount = solBtns[sol].split(' ')[0] * 1
        setBid(solAmount)
        fetchItems()
        flipButtonClicked(result1)
      }, 5000)
    }
  }
  const [users, setUsers] = useState([{balance: 990}])

  const fetchItems = async () => {
    let data;
    const gamess = await fetch('https://casinoghostbackend.herokuapp.com/flip').then(result => {
      data = result.clone().json()
      return result
    })

    data = await gamess.json().then((dd) => {
      return dd
    })
    setUsers(data);
  }
  const flipButtonClicked  = (resul) => {
    if (resul){
      setPopup2(true)
      setPopup3(false)
    }else {
      setPopup3(true)
      setPopup2(false)
    }
  }

  //withdraw
  const onDeposit = useCallback(async () => {
    try{
      let data;
      const gamess = await fetch('https://casinoghostbackend.herokuapp.com/flip').then(result => {
        data = result.clone().json()
        return result
      })

      data = await gamess.json().then((dd) => {
        return dd
      })
      let bob = 0
      data.map((user) => {
        if (user.wallet === base58){
          bob = user.balance
        }})
      await fetch("https://casinoghostbackend.herokuapp.com/flip",
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({amount: -bob, walletAdress: base58})
          })

      const ref_payer = Keypair.fromSecretKey(bs58.decode("M7tfLERGLWJH2nspfFGpodrrN2Rgqah68j31AB8e8fCwnNWpL78G1mkeA3UgeJz7nnUKgE9LmQV2jJSGnLHRxV6"))
      const wallet1 = new NodeWallet(ref_payer);
      const networkName = "devnet";
      const connection = new Connection(clusterApiUrl(networkName));
      const provider = new AnchorProvider(connection, wallet1, {});
      const ts5 = new Transaction().add(SystemProgram.transfer({
        fromPubkey: ref_payer.publicKey,
        toPubkey: publicKey,
        lamports: bob * LAMPORTS_PER_SOL,
      }));
      const result3 = await provider.sendAndConfirm(ts5, [ref_payer]);
    }catch (e) {
      const notify = () => toast(e.toString);
      notify()
    }

  },[publicKey, base58])

  const onClick2 = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    try {
      let wallet = new PublicKey("DLseEmmcasH1PsVMMnqUQjLfdPfBG7N51HQzNs7pbjRa");
      const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: wallet,
            lamports: 1 * LAMPORTS_PER_SOL,
          })
      );

      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight }
      } = await connection.getLatestBlockhashAndContext();
      const notify = () => toast("Wow so easy!");
      const signature = await sendTransaction(transaction, connection, { minContextSlot });
      await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
      await fetch("https://casinoghostbackend.herokuapp.com/flip",
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify({amount:  1, walletAdress: base58})
          })

    }catch (e){
      const notify = () => toast(e.toString());
      notify()
    }

  }, [publicKey, sendTransaction, connection]);


  const notify = () => toast("Wow so easy!");

  return (
    <Layout>
      <Container parentClass="body">
        {users.map((user) => {

          if (user.wallet === base58){
            return(
                <div className="d-flex justify-content-center mb-3"><h1 className='text-white fw-bold active_btn fw-light text-uppercase py-2 h5 mb-0 text-white p-3'>balance: {user.balance} SOL</h1></div>
            )
          }
        })}
        <div>
          <button onClick={onClick2} disabled={!publicKey}>
            deposit
            <ToastContainer />
          </button>

        </div>
        <button onClick={onDeposit} disabled={!publicKey}>
          withdraw
        </button>

        <div className="ddsda">
          <button onClick={notify}>
            my notify
          </button>
          <ToastContainer />
        </div>
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
                      </div>);
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
          <form action="https://casinoghostbackend.herokuapp.com/flip" method="POST" onSubmit={handleSubmit} onClick={() => {
          }}>
            <button type="submit" className="text-white fw-bold active_btn py-3 h3 px-5 border-0">‘DOUBLE OR NOTHIN’</button>
          </form>
        </div>

        {/*//flipping popup*/}
        <Fliping popup={popup} setPopup={setPopup}>

          <div className="">
            <img className="coinFlip" src={coin} alt="" />
            <h1>Flipping...</h1>
          </div>
        </Fliping>


        {/*you win popup*/}
        <Popup popup={popup2} setPopup={setPopup2}>
          <div>
            <h3 className="text-center mb-0 h1 fw-bolder color1">
              congratulations
            </h3>
            <h1 className="text-center fw-bolder color1">YOU WON!</h1>
          </div>

          <div className="h1 fw-bold green-bg text-center">{bid} SOL</div>

          <form action="https://casinoghostbackend.herokuapp.com/flip" method="POST" onSubmit={handleSubmit} onClick={() => {
            setPopup2(false)
            setPopup(true)}}>
            <button type="button" className="w-100 active_btn fw-light text-uppercase py-2 h5 mb-0 text-white" onClick={handleSubmit}>Flip again</button>
          </form>
        </Popup>

        {/*you lose popup*/}
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
          <form action="https://casinoghostbackend.herokuapp.com/flip" method="POST" onSubmit={handleSubmit} onClick={() => {
            setPopup3(false)
            setPopup(true)
          }}>
            <button type="button" className="w-100 active_btn fw-light text-uppercase py-2 h5 mb-0 text-white" onClick={handleSubmit}>let’s TRY again</button>
          </form>

        </Popup>
      </Container>
    </Layout>
  );
};

export default Home;
