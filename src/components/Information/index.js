import React, { useState, useRef, useEffect } from 'react'
import Web3 from 'web3'
import { loadContract } from '../ConnectContract'
export default function Informaion() {

  const storageLogin = JSON.parse(localStorage.getItem('login'))
  const loggedRef = useRef(storageLogin ?? {})

  const [contractAddress, setContractAddress] = useState('')
  const [abi, setAbi] = useState([])
  const contractRef = useRef()
  const [info, setInfo] = useState({})

  useEffect(() => {
    if (loggedRef.current.state) {
      loadContract('Faucet')
        .then(res => {
          setAbi(res.abi)
          setContractAddress(res.networks[5777].address)
        })
    }

  }, [])

  useEffect(() => {
    if (abi.length) {
      const web3 = new Web3('http://localhost:7545')
      const contractFaucet = new web3.eth.Contract(abi, contractAddress)
      contractRef.current = contractFaucet

      // contractRef.current.methods.setAccountInfo("name1", 23).send({ from: loggedRef.current.account })
      //   .then(res => console.log(res))

      contractRef.current.methods.getAccountInfo().call({ from: loggedRef.current.account })
        .then(res => setInfo(res))
    }
  }, [abi, contractAddress])

  return (
    <div className='container mt-5'>
      {loggedRef.current.state &&
        <div>
          {info[0] === '' ? <h1>Chưa cập nhật</h1> :
            <div>
              <h1>Tên: {info[0]}</h1>
              <h1>Tuổi: {info[1]}</h1>
            </div>
          }
        </div>
      }
    </div>
  )
}
