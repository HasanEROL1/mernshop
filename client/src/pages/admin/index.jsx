import { useEffect, useState } from "react";
import ProductTable from "./productTable";
import Stats from "./stats";
import Actions from "./actions";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, resetAdminState } from "../../redux/slices/adminSlice";
import { toast } from "react-toastify";
import Loader from './../../components/loader';
import Pagination from "../../components/pagination";



export default function AdminDashboard() {

  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const { products, isLoading, isError, message, productsCount, resultPerPage } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchAdminProducts(currentPage))

    if (isError) {
      toast.error(message)
      dispatch(resetAdminState())
    }

    return () => {
      dispatch(resetAdminState())
    }

  }, [dispatch, isError, message, currentPage])

  if (isLoading) return <Loader />

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Actions />
        <div className="mt-8">
          <Stats />
        </div>

        <div className="mt-12 bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Ürün Yönetimi</h2>
            <div className="text-right">
              <p className="text-sm text-gray-400 font-medium"> Toplam ürün: {productsCount}</p>
              <p className="text-xs text-blue-500 font-bold">Sayfa {currentPage}/{Math.ceil(productsCount / resultPerPage) || 1}</p>
            </div>
          </div>

          <ProductTable products={products || []} />

          {productsCount > resultPerPage && (
            <div className="mt-10 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(productsCount / resultPerPage)}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}