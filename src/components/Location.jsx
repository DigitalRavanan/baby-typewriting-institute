function Location() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">
          Find Us
        </h2>

        <div className="rounded-lg overflow-hidden shadow-lg">

          <iframe
            title="Baby Typewriting Institute"
            src="https://www.google.com/maps?q=Vetturnimadam,Nagercoil&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

        </div>

      </div>
    </section>
  );
}

export default Location;