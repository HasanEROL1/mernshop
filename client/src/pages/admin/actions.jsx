import { Link, } from "react-router-dom";


const Actions = () => {

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold text-gray-800">Admin Paneli</h1>
      <div className="flex gap-4">
        <Link
          to="/admin/add-product"
          className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-200"
        >
          + Yeni Ürün Ekle

        </Link>
      </div>
    </div>
  );
};

export default Actions;