import { useState } from "react"
import authService from "../../utils/authService"


const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await authService.forgotPassword(email)
      setMessage(res.message)
    } catch (error) {
      setMessage(error.response?.data?.message)

    }
  }
  return (
    <div className="flex items-center flex-col justify-center  gap-30 h-full flex-1">
      <form className="admin-form-container flex items-center flex-col w-96 h-50"
        onSubmit={handleSubmit}>
        <label className="admin-input-label">Şifremi Unuttum</label>

        <input className="admin-input"
          type="email"
          placeholder="Email giriniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="px-2 text-white bg-orange-400 rounded-m  w-20 my-5 cursor-pointer">Gönder</button>



        {message && <p className="text-sm text-zinc-500">{message}</p>}
        <button onClick={onBack}>{onBack}</button>
      </form>
    </div>
  )
}

export default ForgotPassword
