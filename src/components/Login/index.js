import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShowLoginContext } from '../Context/ShowLogin'
import Web3 from 'web3'

export default function Login() {
    const showLogin = useContext(ShowLoginContext)
    const [accounts, setAccounts] = useState([])
    const inputRef = useRef()

    useEffect(() => {
        const web3 = new Web3('http://localhost:7545')

        web3.eth.getAccounts()
            .then(accounts => {
                setAccounts(accounts)
            })
            .catch(() => alert('Kiểm tra lại kết nối'))
    }, [])

    const cancelShowLogin = () => {
        showLogin.showLogin()
    }

    const handleLogin = () => {
        if (window.ethereum) {
            if (inputRef.current.value === '')
                alert("Không được để trống")
            else {
                console.log(inputRef.current.value)
                const accountCurent = accounts.find((account) => account === inputRef.current.value)
                if (accountCurent) {
                    localStorage.setItem('login', JSON.stringify({ account: accountCurent, state: true }))
                    window.location.href = 'http://localhost:3000'
                }
                else {
                    alert("Địa chỉ không hợp lệ")
                    inputRef.current.value = ''
                }
            }
        }
        else {
            alert('Bạn chưa tải metamask')
        }
    }

    return (
        <div className='wrapLogin' onClick={cancelShowLogin}>
            <div className='col-lg-3 col-md-4 col-sm-6 col-12 mx-auto mt-5 bg-main' onClick={(e) => e.stopPropagation()}>
                <input placeholder='address' className='addressInput' ref={inputRef}></input>
                <button className='loginBtn' onClick={handleLogin}>Đăng nhập</button>

            </div>
        </div>
    )
}
