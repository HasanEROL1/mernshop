const campaigns = [
  {
    id: 1,
    title: "Yaz İndirimi",
    description: "Seçili ürünlerde %30'a varan indirim!",
    image: "https://picsum.photos/600/300?random=1",
  },
  {
    id: 2,
    title: "2 Al 1 Öde",
    description: "Belirli ürünlerde 2 al 1 öde fırsatı",
    image: "https://picsum.photos/600/300?random=2",
  },
  {
    id: 3,
    title: "Hafta Sonu Fırsatı",
    description: "Sadece hafta sonuna özel ekstra indirimler",
    image: "https://picsum.photos/600/300?random=3",
  },
];

const Campaigns = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Kampanyalar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
          >
            <img
              src={camp.image}
              alt={camp.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">{camp.title}</h2>
              <p className="text-sm text-gray-600">{camp.description}</p>

              <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                İncele
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;