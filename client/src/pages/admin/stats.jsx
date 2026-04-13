import icon1 from "../../assets/admin-icons/icon-1.webp"
import icon2 from "../../assets/admin-icons/icon-2.webp"
import icon3 from "../../assets/admin-icons/icon-3.webp"
import icon4 from "../../assets/admin-icons/icon-4.png"
import InfoCard from "./info-card";





const Stats = () => {
  const values = {
    total_users: 1536,
    total_orders: 360,
    total_sales: "545.269,76$",
    total_products: 2314
  };

  const cards = [
    { icon: icon1, label: "Toplam Kullanıcı", value: values.total_users },
    { icon: icon2, label: "Toplam Sipariş", value: values.total_orders },
    { icon: icon3, label: "Toplam Satış", value: values.total_sales },
    { icon: icon4, label: "Ürün Sayısı", value: values.total_products },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((item, index) => (
        <InfoCard key={index} item={item} />
      ))}
    </section>
  );
};

export default Stats;