import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  CloudDrizzle,
  CloudFog,
  Moon,
  Cloudy
} from 'lucide-react';
import { ReactNode } from 'react';

// WMO Weather interpretation codes (WW)
export function getWeatherDetails(code: number): { label: string; icon: ReactNode } {
  switch (code) {
    case 0:
      return { label: 'Clear sky', icon: <Sun className="w-full h-full text-yellow-400" /> };
    case 1:
      return { label: 'Mainly clear', icon: <Sun className="w-full h-full text-yellow-400" /> };
    case 2:
      return { label: 'Partly cloudy', icon: <Cloud className="w-full h-full text-gray-400" /> };
    case 3:
      return { label: 'Overcast', icon: <Cloudy className="w-full h-full text-gray-500" /> };
    case 45:
    case 48:
      return { label: 'Fog', icon: <CloudFog className="w-full h-full text-gray-400" /> };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return { label: 'Drizzle', icon: <CloudDrizzle className="w-full h-full text-blue-400" /> };
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return { label: 'Rain', icon: <CloudRain className="w-full h-full text-blue-500" /> };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return { label: 'Snow', icon: <CloudSnow className="w-full h-full text-blue-200" /> };
    case 95:
    case 96:
    case 99:
      return { label: 'Thunderstorm', icon: <CloudLightning className="w-full h-full text-yellow-500" /> };
    default:
      return { label: 'Unknown', icon: <Sun className="w-full h-full text-yellow-400" /> };
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
