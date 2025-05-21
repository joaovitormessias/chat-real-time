const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 h-screen">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl overflow-hidden bg-primary/10 ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            >
              <img
                src={`/images/pattern-${i + 1}.png`}
                alt={`Imagem ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
