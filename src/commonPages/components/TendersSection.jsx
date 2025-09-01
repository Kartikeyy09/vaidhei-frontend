const TendersSection = () => {
  const tenderTypes = [
    {
      title: "Railway Platform Digital Advertising",
      description: "LED screens and digital displays on railway platforms",
      features: ["High-resolution displays", "Dynamic content management", "Prime location placement"],
      sector: "Railway",
    },
    {
      title: "Railway Waiting Room Operations",
      description: "Advertising rights for waiting halls and lounges",
      features: ["Captive audience", "Extended exposure time", "Multiple format options"],
      sector: "Railway",
    },
    {
      title: "Municipal Corporation (Nagarnigam) Advertising",
      description: "Bus stops, public spaces, and municipal property advertising",
      features: ["High footfall locations", "Community reach", "Local brand visibility"],
      sector: "Municipal",
    },
    {
      title: "Nagar Palika Council Advertising",
      description: "Town council properties, markets, and public area advertising",
      features: ["Targeted local audience", "Cost-effective rates", "Community engagement"],
      sector: "Municipal",
    },
    {
      title: "Government Building Advertising",
      description: "Advertising rights for government offices and public buildings",
      features: ["Professional audience", "High credibility", "Extended exposure"],
      sector: "Government",
    },
    {
      title: "Public Transport Advertising",
      description: "Bus wrapping, metro stations, and transport hub advertising",
      features: ["Mobile advertising", "Daily commuter reach", "Route-specific targeting"],
      sector: "Transport",
    },
  ]

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Government Sector Tenders We Handle</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            As authorized tender rights holders, we manage various types of advertising tenders across Railway,
            Municipal Corporations, Nagar Palika, and other government sectors throughout India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tenderTypes.map((tender, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-l-4 border-red-500"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tender.sector === "Railway"
                      ? "bg-red-100 text-red-600"
                      : tender.sector === "Municipal"
                        ? "bg-blue-100 text-blue-600"
                        : tender.sector === "Government"
                          ? "bg-green-100 text-green-600"
                          : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {tender.sector} Sector
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{tender.title}</h3>
              <p className="text-slate-600 mb-6">{tender.description}</p>
              <ul className="space-y-2">
                {tender.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Government Tender Application Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Documentation</h4>
                <p className="text-sm text-slate-600">Prepare required documents and sector-specific certifications</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Submission</h4>
                <p className="text-sm text-slate-600">Submit tender application with technical specifications</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Evaluation</h4>
                <p className="text-sm text-slate-600">Government authorities evaluate and shortlist applications</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  4
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Award</h4>
                <p className="text-sm text-slate-600">Contract awarded and implementation begins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TendersSection
