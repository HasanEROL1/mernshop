import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../redux/slices/authSlice"
import { toast } from "react-toastify"
import Loader from "../../components/loader"
import { getCities, getDistrictsByCityCode } from 'turkey-neighbourhoods'


const Profile = () => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.user)
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [city, setCity] = useState(user?.address?.city || "")
  const [street, setStreet] = useState(user?.address?.street || "")
  const [district, setDistrict] = useState(user?.address?.district || "")
  const [avatar, setAvatar] = (useState(null))
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "")

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result)
        setAvatarPreview(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = {
      name,
      email,
      address: { city, district, street }
    }
    if (avatar) userData.avatar = avatar

    try {
      await dispatch(updateUser(userData)).unwrap()
      toast.success("Profil güncellendi")
    } catch (error) {
      toast.error(error)
    }
  }



  const cities = getCities()
  const cityCode = cities.find(c => c.name === city)?.code
  const districts = cityCode ? getDistrictsByCityCode(cityCode) : []
  return (
    <div className="flex items-center justify-center flex-1 h-full p-6">
      <form onSubmit={handleSubmit} className="admin-form-container w-full max-w-2xl">
        <div className="mb-8 border-b border-gray-100 pb-6">
          <h2 className="text-xl font-bold text-zinc-800">Profilim</h2>
          <span className="text-orange-600 font-bold text-xs tracking-widest">HESAP BİLGİLERİ</span>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8">
          <img src={avatarPreview || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name)}&background=ffedd5&color=f97316`}
            alt="avatar" className="w-20 h-20 rounded-full object-cover border-2 border-orange-200" />
        </div>
        <div>
          <label className="admin-input-label" >Profil Fotoğrafı</label>
          <input type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="block text-sm text-gray-500 file:mr:4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* sol */}
          <div className="flex flex-col gap-4 ">
            <div>
              <label className="admin-input-label">AD SOYAD</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="admin-input" />
            </div>
            <div>
              <label className="admin-input-label">EMAIL</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="admin-input" />
            </div>
          </div>

          {/* Sağ - Adress */}
          <div className="flex flex-col gap-4 ">
            <div>
              <select value={city} onChange={(e) => { setCity(e.target.value); setDistrict("") }} className="admin-input">
                <option value="">Şehir Seçiniz</option>
                {cities.map((c) => (
                  <option key={c.code} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>


              <select value={district} onChange={(e) => setDistrict(e.target.value)} className="admin-input">
                <option value="">İlçe Seçiniz</option>
                {districts.map((ilce) => (
                  <option key={ilce} value={ilce}>{ilce}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="admin-input-label">SOKAK</label>
              <input value={street} onChange={(e) => setStreet(e.target.value)} className="admin-input" />
            </div>
          </div>
        </div>

        <div className="mt-2">
          <button type="submit" disabled={loading} className="admin-submit-btn">
            {loading ? <Loader /> : "Güncelle"}
          </button>
        </div>




      </form>

    </div>
  )
}

export default Profile
