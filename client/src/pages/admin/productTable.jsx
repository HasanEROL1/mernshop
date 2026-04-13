import { FaEdit } from "react-icons/fa";
import { FaEye, FaTrash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../../redux/slices/adminSlice";
import Swal from 'sweetalert2';
export default function ProductTable({ products }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleEdit = (product) => {

    navigate(`/admin/product/${product._id}`)
  }

  const handleDelete = (id, name) => {
    Swal.fire({
      title: 'Emin misin?',
      text: `"${name}" ürünü kalıcı olarak silinecek!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ea580c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Vazgeç',
      // Ortada çıkması için:
      position: 'center',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id)); // Silme işlemini tetikle
        Swal.fire('Silindi!', 'Ürün başarıyla kaldırıldı.', 'success');
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Ürün Bilgisi</th>
            <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Kategori</th>
            <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Fiyat</th>
            <th className="py-4 px-4 font-semibold text-gray-600 text-sm">Stok</th>
            <th className="py-4 px-4 font-semibold text-gray-600 text-sm text-center">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {(products || []).map((product) => (
            <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors group">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    <img
                      src={product.images && product.images[0] ? product.images[0].url : "/images/default.jpg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{product.name}</p>
                    <p className="text-xs text-gray-400">ID: #{product._id?.slice(-6)}</p>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm text-gray-600 font-medium">{product.category}</td>
              <td className="py-4 px-4 text-sm font-bold text-gray-800">{product.price} TL</td>
              <td className="py-4 px-4 text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {product.stock} Adet
                </span>
              </td>
              <td className="py-4 px-4 text-center">
                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(product)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg" title="Düzenle">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(product._id, product.name)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Sil">
                    <FaTrash />
                  </button>
                  <Link to={`/products/${product._id}`} target="_blank">
                    <FaEye className="text-blue-500 hover:text-blue-700 cursor-pointer" title="Ürün detayı" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

