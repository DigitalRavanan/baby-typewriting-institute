function Courses() {
  return (
    <section
      id="courses"
      className="max-w-6xl mx-auto py-16 px-6"
    >
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-900">
        Courses Offered
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-2xl font-bold mb-3">
            Tamil Typewriting
          </h3>

          <p>
            Learn Tamil keyboard typing with proper finger positioning,
            speed development and accuracy training.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-2xl font-bold mb-3">
            English Typewriting
          </h3>

          <p>
            Master touch typing techniques and improve your
            professional typing speed.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 border">
          <h3 className="text-2xl font-bold mb-3">
            Combined Course
          </h3>

          <p>
            Complete Tamil and English typewriting package
            with speed test preparation.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Courses