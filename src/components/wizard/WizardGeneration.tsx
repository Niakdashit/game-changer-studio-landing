<div
  className="w-full aspect-square rounded-xl p-8 flex items-center justify-center relative overflow-hidden"
  style={{
    background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.secondaryColor})`
  }}
>
  {formData.generatedGameHtml ? (
    <iframe
      title="game-preview"
      srcDoc={formData.generatedGameHtml}
      className="absolute inset-0 w-full h-full border-none rounded-xl"
    />
  ) : (
    <>
      {/* Game Preview based on selected mechanic */}
      {formData.mechanic === 'wheel' && (
        <div className="relative">
          <div className="w-48 h-48 rounded-full border-8 border-white/20 relative">
            <div className="absolute inset-4 rounded-full border-4 border-white/40"></div>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-full h-full ${shouldReduceMotion ? '' : 'animate-spin'}`}
                style={{
                  transform: `rotate(${i * 45}deg)`,
                  animationDuration: '20s',
                  animationIterationCount: 'infinite'
                }}
              >
                <div className="w-1 h-20 bg-white/80 mx-auto"></div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-primary rounded-full"></div>
            </div>
          </div>
        </div>
      )}

      {formData.mechanic === 'quiz' && (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 max-w-sm w-full shadow-lg">
          <h3 className="font-sora font-bold text-gray-800 mb-4">Quelle est votre préférence ?</h3>
          <div className="space-y-3">
            {['Option A', 'Option B', 'Option C'].map((answer, i) => (
              <button 
                key={i}
                className="w-full p-3 text-left rounded-lg bg-gray-100 hover:bg-primary/10 transition-colors border border-gray-200"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      )}

      {formData.mechanic === 'scratch' && (
        <div className="relative w-64 h-40">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl shadow-lg"></div>
          <div className="absolute inset-4 bg-white/30 rounded-lg backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-xl">Grattez ici !</span>
          </div>
        </div>
      )}

      {formData.mechanic === 'jackpot' && (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <div className="flex space-x-4 mb-6">
            {[1,2,3].map(i => (
              <div key={i} className="w-16 h-20 bg-gray-800 rounded-lg flex items-center justify-center shadow-md">
                <span className={`text-yellow-400 text-2xl font-bold ${shouldReduceMotion ? '' : 'animate-pulse'}`}>7</span>
              </div>
            ))}
          </div>
          <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition-transform">
            JOUER
          </button>
        </div>
      )}

      {/* Brand elements */}
      <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-md">
        <div className="w-8 h-8 bg-gray-400 rounded"></div>
      </div>
      {/* Floating particles */}
      <div className={`absolute top-8 right-8 w-2 h-2 bg-white/60 rounded-full ${shouldReduceMotion ? '' : 'animate-bounce'}`}></div>
      <div className={`absolute bottom-8 left-8 w-1 h-1 bg-white/40 rounded-full ${shouldReduceMotion ? '' : 'animate-pulse delay-500'}`}></div>
    </>
  )}
</div>