const LogoCloud = () => {
  // In asli project, yahan images hongi
  const clients = ["Indian Railways", "Nagar Nigam", "Public Works", "Metro Corp", "State Transport"];

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-slate-500 uppercase tracking-wider">
          Trusted by leading organizations across India
        </h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {clients.map(client => (
            <div key={client} className="flex justify-center">
              {/* IMPORTANT: Yahan <p> ki jagah <img src={`/logos/${client}.png`} /> use karein */}
              <p className="text-2xl font-bold text-gray-400 filter grayscale hover:filter-none transition-all duration-300">{client}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LogoCloud;