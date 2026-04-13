import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import authService from '../../utils/authService'

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await authService.resetPassword(token, password)
      setMessage(res.message)

      setTimeout(() => {
        navigate("/auth")
      }, 2000)
    }
    catch (err) {
      setMessage(err.response?.data?.message)
    }
  }
  return (
    <div className="flex items-center flex-col justify-center  gap-30 h-full flex-1">
      <form onSubmit={handleSubmit}
        className="admin-form-container flex items-center flex-col ">
        <label className="admin-input-label">Yeni Şifre Oluştur</label>
        <input
          type="password"
          placeholder='Yeni Şifre'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="admin-input"

        />
        <button className="px-2 text-white bg-orange-400  w-20 my-5 rounded-md cursor-pointer">Şifreyi Güncelle</button>


        {message && <p className="text-sm text-zinc-500">{message}</p>}
      </form>
    </div>
  )
}

export default ResetPassword
