import React, { useState, useRef, useEffect } from 'react'
import Web3 from 'web3'
import { loadContract } from '../ConnectContract'
export default function Update() {

  const storageLogin = JSON.parse(localStorage.getItem('login'))
  const loggedRef = useRef(storageLogin ?? {})
  const nameRef = useRef()
  const ageRef = useRef()

  const [contractAddress, setContractAddress] = useState('')
  const [abi, setAbi] = useState([])
  const contractRef = useRef()
  // const [info, setInfo] = useState({})

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

      // contractRef.current.methods.getAccountInfo().call({ from: loggedRef.current.account })
      //   .then(res => setInfo(res))
    }
  }, [abi, contractAddress])

  const handleUpdate = () => {
    if (nameRef.current.value === '' || ageRef.current.value === '')
      alert("Không được để trống")
    else {
      if (/^\d+$/.test(ageRef.current.value)) {

        contractRef.current.methods.setAccountInfo(nameRef.current.value, parseInt(ageRef.current.value)).send({ from: loggedRef.current.account })
          .then(() => window.location.href = "http://localhost:3000")

      }
      else alert('Tuổi phải là số nguyên')

    }

  }

  return (
    <div className='container mt-5'>
      {loggedRef.current.state &&
        <div>
          <div ><input placeholder='name' className='updateInput' ref={nameRef}></input></div>
          <div ><input placeholder='age' className='updateInput' ref={ageRef}></input></div>
          <button className='btn btn-success' onClick={handleUpdate}>Cập nhật</button>
        </div>
      }
    </div>
  )
}
