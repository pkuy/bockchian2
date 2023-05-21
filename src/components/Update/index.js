import React, { useState, useRef, useEffect } from 'react'

import { loadContract } from '../ConnectContract'
import Web3 from 'web3'
import forge from 'node-forge';
import { split, combine } from 'shamir-secret-sharing';
export default function Update() {

  const storageLogin = JSON.parse(localStorage.getItem('login'))
  const loggedRef = useRef(storageLogin ?? {})
  const nameRef = useRef()
  const ageRef = useRef()

  const [contractAddress, setContractAddress] = useState('')
  const [abi, setAbi] = useState([])
  const contractRef = useRef()
  const [info, setInfo] = useState({})

  useEffect(() => {
    if (loggedRef.current.state) {
      loadContract('Faucet')
        .then(res => {
          setAbi(res.abi)
          setContractAddress(res.networks[1337].address)
        })
    }

  }, [])

  useEffect(() => {
    if (abi.length) {
      const web3 = new Web3('http://127.0.0.1:30303')
      const contractFaucet = new web3.eth.Contract(abi, contractAddress)
      contractRef.current = contractFaucet
    }
  }, [abi, contractAddress])

  const handleUpdate = () => {
    if (nameRef.current.value === '' || ageRef.current.value === '')
      alert("Không được để trống")
    else {
      if (/^\d+$/.test(ageRef.current.value)) {

        // Kết nối tới các node.
        const web31 = new Web3('http://127.0.0.1:30303');
        const web32 = new Web3('http://127.0.0.1:30304');
        const web33 = new Web3('http://127.0.0.1:30305');
        // Tạo cặp khóa RSA
          const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
        // Lấy khóa bí mật và khóa công khai
          const privateKey_pem = forge.pki.privateKeyToPem(keyPair.privateKey);
          const publicKey_pem = forge.pki.publicKeyToPem(keyPair.publicKey);
        //----------------------------------------------------------------
        // Chia Key thành 3 phần.
        const secretBytes = new TextEncoder().encode(privateKey_pem);
        split(secretBytes, 3, 2)
        .then(shares => {

          // chuyển phần shares thành hex string để lưu.
          //const hexString = Array.from(shares[1], byte => byte.toString(16).padStart(2, '0')).join('');
          // chuyển phần hex string về lại shares để tạo lại khóa
          //const uint8ArrayFromHex = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

          // Chuyển phần kiểu key thành string để lưu: const privateKey_pem = forge.pki.privateKeyToPem(keyPair.privateKey);
          // chuyển string về lại key để mã hóa: const publicKey = forge.pki.publicKeyFromPem(data[3]);

            // Lưu shares1 trên node 1.
            const sharesString1 = Array.from(shares[0], byte => byte.toString(16).padStart(2, '0')).join('');
            // web31.eth.getCoinbase()
            //  .then(accounts => {
            //   // Mở khỏa tài khoản hệ thống trong node1.
            //   web31.eth.personal.unlockAccount(accounts, '123456', 100).then(() => {
            //   // Lưu vào contract trên node 1.
            //   loadContract('Node1KeyStorage')
            //   .then(res => {
            //   const personalKeyStorage = new web31.eth.Contract(res.abi, res.networks[1337].address);
            //   personalKeyStorage.methods.storeKeyPart(loggedRef.current.account,sharesString1).send({from: accounts})
            //    });
            // })
            // });

            // Lưu shares2 trên node 2.
            const sharesString2 = Array.from(shares[1], byte => byte.toString(16).padStart(2, '0')).join('');
            // web32.eth.getCoinbase()
            // .then(accounts => {
            //   // Mở khỏa tài khoản hệ thống trong node2.
            //   web32.eth.personal.unlockAccount(accounts, '123456', 100).then(() => {
            //   // Lưu vào contract trên node 1.
            //   loadContract('Node2KeyStorage')
            //   .then(res => {
            //   const personalKeyStorage = new web32.eth.Contract(res.abi, res.networks[1337].address);
            //   personalKeyStorage.methods.storeKeyPart(loggedRef.current.account,sharesString2).send({from: accounts})
            //    });
            // })
            // });

            // Lưu shares3 trên node 3.
            const sharesString3 = Array.from(shares[2], byte => byte.toString(16).padStart(2, '0')).join('');
            // web33.eth.getCoinbase()
            // .then(accounts => {
            //   // Mở khỏa tài khoản hệ thống trong node3.
            //   web33.eth.personal.unlockAccount(accounts, '123456', 100).then(() => {
            //   // Lưu vào contract trên node 3.
            //   loadContract('Node3KeyStorage')
            //   .then(res => {
            //   const personalKeyStorage = new web33.eth.Contract(res.abi, res.networks[1337].address);
            //   personalKeyStorage.methods.storeKeyPart(loggedRef.current.account,sharesString3).send({from: accounts})
            //    });
            // })
            // });

            const plainText = nameRef.current.value + "," + ageRef.current.value;
            // Kí
            const md = forge.md.sha256.create();
            md.update(plainText, 'utf8');
            const signature = keyPair.privateKey.sign(md);

            // Mở khóa tài khoản hiện tại.
            //   web31.eth.personal.unlockAccount(loggedRef.current.account, '123456', 100).then(() => {

            //   contractRef.current.methods.setAccountInfo(nameRef.current.value, parseInt(ageRef.current.value), signature, publicKey_pem).send({ from: loggedRef.current.account })
            //  .then(() => window.location.href = "http://localhost:3000")

            //});
      })

        //------------------------------------------------------------------------------------------------------------


        const addressct1 = "0x33C54F781ED445c65448587C5abDdfcC0bc21345"; // địa chỉ hệ thống node 1
        const addressct2 = "0x263f8f8916B99161E289e135eCB8f7c6D671175e"; // địa chỉ hệ thống node 2

        loadContract('Node1KeyStorage')
               .then(res => {
               const personalKeyStorage1 = new web31.eth.Contract(res.abi, res.networks[1337].address);

               personalKeyStorage1.methods.getKeyParts(loggedRef.current.account).call({from: addressct1}).then(function(data1){
               // console.log(data1)
                const uint8ArrayFromHex1 = new Uint8Array(data1.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
                // console.log(uint8ArrayFromHex1)
                 loadContract('Node2KeyStorage')
                .then(res => {
                const personalKeyStorage2 = new web32.eth.Contract(res.abi, res.networks[1337].address);
                personalKeyStorage2.methods.getKeyParts(loggedRef.current.account).call({from: addressct2}).then(function(data2){
        
          const uint8ArrayFromHex2 = new Uint8Array(data2.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

          let selectedShares = [uint8ArrayFromHex1, uint8ArrayFromHex2];

        combine(selectedShares)
                 .then((recoveredBytes) => {
                     const recoveredSecret = new TextDecoder().decode(recoveredBytes);
                     //console.log(recoveredSecret);
                     // Thử mã sau khôi phục lại
                      const privateKey = forge.pki.privateKeyFromPem(recoveredSecret);
                     // Kí
                    const plainText ="phankhacuy"

                    const md = forge.md.sha256.create();
                    md.update(plainText, 'utf8');
                    const signature = privateKey.sign(md);

                     contractRef.current.methods.getAccountInfo().call({from: loggedRef.current.account}).then(function(data){
                       const publicKey = forge.pki.publicKeyFromPem(data[3]);
                    ////  Xác thực
                       const md2 = forge.md.sha256.create();
                       md2.update(plainText, 'utf8');
                      const verified = publicKey.verify(md2.digest().bytes(), signature);

                      console.log('Verified:', verified);
                      })
                  });
        })
       });
     });

      });

     //------------------------------------------------------------------------------

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
