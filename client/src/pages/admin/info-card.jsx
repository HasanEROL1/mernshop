const InfoCard = ({ item }) => {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
      <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
        <img src={item.icon} alt="" className="w-7 h-7 object-contain" />
      </div>
      <div>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
        <h3 className="text-xl font-bold text-gray-800">{item.value}</h3>
      </div>
    </div>
  );
};

export default InfoCard;