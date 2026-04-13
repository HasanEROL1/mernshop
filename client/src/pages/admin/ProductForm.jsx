import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewproduct, resetAdminState, updateProduct } from "../../redux/slices/adminSlice";
import { toast } from "react-toastify";
import Loader from './../../components/loader';
import { useNavigate, useParams } from "react-router-dom";
import { getProductDetail } from "../../redux/slices/productSlice";
import { clearProduct } from "../../redux/slices/productSlice"
const ProductForm = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { isSuccess, isError, message, isLoading } = useSelector((state) => state.admin)
  const { product } = useSelector((state) => state.products)
  const navigate = useNavigate()
  const [category, setCategory] = useState("");

  const categories = ["Elektronik", "Giyim", "Ev&Yaşam", "Kişisel Bakım"];
  const [images, setImages] = useState([])

  useEffect(() => {
    if (id) {
      dispatch(getProductDetail(id));
    } else {
      dispatch(clearProduct())


      setTimeout(() => {
        setCategory("")
        setImages([]);
        document.querySelector(".admin-form-container")?.reset();
      }, 0);

    }

  }, [dispatch, id]);

  useEffect(() => {
    if (id && product?._id === id) {
      setTimeout(() => {
        setCategory(product.category || "");
      }, 0)

    }
  }, [product, id]);



  useEffect(() => {
    let timer;
    if (isSuccess) {
      toast.success(id ? "Ürün başarıyla güncellendi" : "Ürün başarıyla eklendi");
      if (id) {
        dispatch(getProductDetail(id));
      }
      timer = setTimeout(() => {
        navigate("/admin");
        dispatch(resetAdminState());

      }, 2000);


    } return () => {
      if (timer) clearTimeout(timer);
    }
  }, [isSuccess, isError, message, dispatch, id, navigate]);


  // Resim seçildiğinde Base64'e çevirme
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);


    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const finalData = {
      name: data.name,
      description: data.description,
      category: category,
      price: Number(data.price),
      stock: Number(data.stock),



    };

    if (images && images.length > 0) {
      finalData.images = images;
    } else if (id && product?.images?.length > 0) {
      finalData.images = product.images.map(img => img.url);
    }

    if (id) {
      // Güncelleme: { id, productData }
      dispatch(updateProduct({ id, productData: finalData }));
    } else {
      // Yeni ürün oluşturma: direct data
      dispatch(createNewproduct(finalData));
    }
    console.log("Giden Veri:", finalData)

  }

  if (isLoading || (id && product?._id !== id)) return <Loader />;


  return (
    <div className="max-w-5xl mx-auto px-4" key={id ? `update-${id}` : "create-new"} >
      <form className="admin-form-container" onSubmit={handleSubmit}>
        <div className="mb-10 flex flex-col gap-1 border-b border-gray-50 pb-6">
          <h2>
            {product ? "Ürünü güncelle" : "Yeni Ürün Oluştur"}
          </h2>

          <span className="text-orange-600 font-bold text-xs tracking-widest">ENVANTER YÖNETİMİ</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* SOL KOLON*/}
          <div className="flex flex-col gap-6">
            <div>
              <div>
                <label className="admin-input-label font-bold">ÜRÜN ADI</label>
                <input className="admin-input"
                  name="name"
                  defaultValue={product?.name || ""}
                  placeholder="Ürün Adı"
                  required
                />
              </div>
              <label className="admin-input-label">AÇIKLAMA</label>
              <textarea className="admin-input resize-none"
                name="description" rows="5" maxLength={300} defaultValue={product?.description} required />
            </div>
            <div>
              <label className="admin-input-label">FİYAT</label>
              <input className="admin-input"
                name="price" type="number" defaultValue={product?.price || 1} placeholder="1" title="rakam yaz" min="0"
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") e.preventDefault();
                }}
                onChange={(e) => {
                  if (e.target.value < 0) e.target.value = 0;
                }}
                required />
            </div>
            <div>
              <label className="admin-input-label">STOK</label>
              <input className="admin-input"
                name="stock" type="number" defaultValue={product?.stock || 1} placeholder="1" title="rakam yaz" min="0"
                onKeyDown={(e) => {
                  if (e.key === "-" || e.key === "e") e.preventDefault();
                }}
                onChange={(e) => {
                  if (e.target.value < 0) e.target.value = 0;
                }}
                required />
            </div>
          </div>

          {/* SAĞ KOLON */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="admin-input-label">Kategori</label>
              <select className="admin-input cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required>

                <option value="" disabled >Kategori Seçiniz...</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {/* resim yükleme */}
            <div>
              <label>ÜRÜN RESİMLERİ</label>
              <input type="file"
                accept="image/*"
                multiple
                req
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-full fil:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
              />
              <div className="flex gap-2 mt-4 flex-wrap">

                {(images.length > 0
                  ? images
                  : product?.images?.map(img => img.url) || []
                ).map((img, index) => (
                  <img key={index} src={img} alt="Önizleme" className="w-20 h-20 object-cover rounded-lg border" />
                ))}
                <p className="text-sm text-red-400 mt-1">
                  !!! Birden fazla resim seçmek için Ctrl tuşuna basılı tutun
                </p>
              </div>
            </div>
            <div className="mt-auto">
              <button
                disabled={isLoading}
                type="submit" className="admin-submit-btn">

                {isLoading ? <Loader /> : id ? "Güncelle" : "Ürünü Kaydet"}

              </button>
            </div>
          </div>
        </div>
      </form >
    </div >

  )

}

export default ProductForm
