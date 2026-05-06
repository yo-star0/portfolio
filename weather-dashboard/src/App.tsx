import { useState, useEffect } from 'react';
import { Cloud, Droplets, Wind, Search, Sun, CloudRain } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Mock weather data
const mockWeatherData = {
  tokyo: {
    name: 'Tokyo, Japan',
    temp: 24,
    condition: 'Sunny',
    humidity: 60,
    wind: 12,
    forecast: [22, 24, 25, 23, 20, 21, 24]
  },
  london: {
    name: 'London, UK',
    temp: 15,
    condition: 'Rainy',
    humidity: 80,
    wind: 18,
    forecast: [12, 14, 15, 13, 11, 14, 16]
  },
  newyork: {
    name: 'New York, USA',
    temp: 18,
    condition: 'Cloudy',
    humidity: 55,
    wind: 8,
    forecast: [16, 17, 18, 19, 21, 20, 18]
  }
};

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCity, setCurrentCity] = useState('tokyo');
  const [loading, setLoading] = useState(false);

  const weather = mockWeatherData[currentCity as keyof typeof mockWeatherData] || mockWeatherData.tokyo;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const query = searchQuery.toLowerCase().replace(/[^a-z]/g, '');
      if (mockWeatherData[query as keyof typeof mockWeatherData]) {
        setCurrentCity(query);
      }
      setLoading(false);
    }, 800);
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        fill: true,
        label: 'Temperature (°C)',
        data: weather.forecast,
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: false,
        }
      },
      x: {
        grid: {
          display: false,
        }
      }
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun size={64} className="text-yellow-400" />;
      case 'rainy': return <CloudRain size={64} className="text-slate-400" />;
      case 'cloudy': return <Cloud size={64} className="text-slate-300" />;
      default: return <Sun size={64} className="text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-brand-light overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-dark/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden z-10 border border-white/50 flex flex-col md:flex-row">
        
        {/* Left Side: Current Weather */}
        <div className="bg-gradient-to-br from-brand to-brand-dark text-white p-8 md:w-1/3 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 text-white/10">
            {getWeatherIcon(weather.condition)}
          </div>
          
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-1 opacity-90">{weather.name}</h1>
            <p className="text-brand-light font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="my-12 relative z-10">
            <div className="flex items-end gap-2 mb-4">
              <span className="text-7xl font-bold tracking-tighter">{weather.temp}°</span>
              <span className="text-2xl font-medium mb-2 opacity-80">C</span>
            </div>
            <div className="flex items-center gap-3 text-xl font-medium">
              {getWeatherIcon(weather.condition)}
              <span>{weather.condition}</span>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md">
              <Wind className="text-brand-light" size={24} />
              <div>
                <p className="text-sm opacity-80">Wind</p>
                <p className="font-semibold">{weather.wind} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md">
              <Droplets className="text-brand-light" size={24} />
              <div>
                <p className="text-sm opacity-80">Humidity</p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Details & Search */}
        <div className="p-8 md:w-2/3 flex flex-col">
          <form onSubmit={handleSearch} className="relative mb-8">
            <input 
              type="text" 
              placeholder="Search city (tokyo, london, newyork)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-700 placeholder-slate-400 border-none rounded-full py-4 pl-6 pr-12 focus:ring-2 focus:ring-brand outline-none transition-all shadow-inner"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand text-white rounded-full hover:bg-brand-dark transition-colors"
              disabled={loading}
            >
              <Search size={20} className={loading ? "animate-spin" : ""} />
            </button>
          </form>

          <div className="flex-1 flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 mb-6">7-Day Forecast</h2>
            <div className="flex-1 bg-slate-50 rounded-2xl p-4 border border-slate-100 shadow-sm relative min-h-[250px]">
               <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
