function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">
          Our Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Gallery"
              className="rounded-lg shadow-lg h-64 w-full object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;