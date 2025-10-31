import React from 'react';

interface LandingPageProps {
  onStartChat: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  return (
    <div className="h-full overflow-y-auto landing-page-bg text-black scroll-smooth">
      <main className="relative isolate">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 hero-bg">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 fade-in text-[var(--k-yellow)] drop-shadow-lg">
              Karnataka Festival Guide
            </h1>
            <p className="text-lg md:text-xl mb-4 fade-in fade-in-delay-1 text-[var(--k-yellow)]/90">
              Explore the colors, culture, and celebrations of Karnataka ✨
            </p>
            <p className="text-2xl kannada-font mb-8 fade-in fade-in-delay-2 text-[var(--k-yellow)]">
              ನಮಸ್ಕಾರ! ಕರ್ನಾಟಕಕ್ಕೆ ಸ್ವಾಗತ 
            </p>
            <button
              onClick={onStartChat}
              className="px-8 py-4 bg-white text-[#CD202C] font-bold rounded-full shadow-xl hover:bg-[#FFCC00] hover:text-black focus:ring-4 focus:ring-[#FFCC00]/50 transition-all duration-300 transform hover:scale-105 fade-in fade-in-delay-3"
            >
              Start Exploring Festivals
            </button>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 kannada-font text-black">
              ಕರ್ನಾಟಕದ ಹಬ್ಬಗಳು | Featured Festivals
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="festival-card group">
                <img src="https://thumbs.dreamstime.com/b/mysore-dasara-elephant-front-palace-balarama-lead-procession-carried-idol-goddess-chamundeshwari-text-head-401549752.jpg" alt="Mysore Dasara" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Mysore Dasara</h3>
                  <p className="text-sm opacity-90 mb-4">A royal procession celebrating victory over evil, filling Mysore with grandeur and spirit.</p>
                  <button onClick={onStartChat} className="w-full py-2 btn-explore">Explore Now</button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="festival-card group">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_80fvwWu9fKqXzmJy7YC0xTbd13uyjIhMrQ&s" alt="Hampi Utsav" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Hampi Utsav</h3>
                  <p className="text-sm opacity-90 mb-4">A cultural extravaganza amidst the majestic ruins of the Vijayanagara Empire.</p>
                  <button onClick={onStartChat} className="w-full py-2 btn-explore">Explore Now</button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="festival-card group">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCeZXq3NC7hxbf62k2_RZ_PfFhlAWAXTOmeg&s" alt="Ugadi" className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Ugadi</h3>
                  <p className="text-sm opacity-90 mb-4">The vibrant Kannada New Year, symbolizing new beginnings and the flavors of life.</p>
                  <button onClick={onStartChat} className="w-full py-2 btn-explore">Explore Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6">
        <p className="text-sm font-medium kannada-font">
          ಮತ್ತೆ ಸಿಗೋಣ ಕರ್ನಾಟಕದಲ್ಲಿ! 🌸 | Created by Rahul Gowda R
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;