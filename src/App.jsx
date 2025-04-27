import RegistrationForm from "./components/RegistrationForm";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced background for better glassmorphism contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-blue-50 to-teal-50 z-0"></div>
      
      {/* Animated background shapes to enhance glassmorphism effect */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Main gradient blobs */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-300/30 rounded-full blur-[100px]"
          style={{animation: 'float 20s ease-in-out infinite'}}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300/30 rounded-full blur-[100px]"
          style={{animation: 'float 25s ease-in-out infinite reverse'}}
        ></div>
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/20 rounded-full blur-[100px]"
          style={{animation: 'float 30s ease-in-out infinite alternate'}}
        ></div>
        
        {/* Small decorative particles */}
        <div className="absolute top-10 right-1/4 w-24 h-24 bg-yellow-200/20 rounded-full blur-xl"
             style={{animation: 'float 12s ease-in-out infinite 1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-purple-200/20 rounded-full blur-lg"
             style={{animation: 'float 10s ease-in-out infinite 0.5s'}}></div>
        <div className="absolute top-1/3 right-20 w-20 h-20 bg-green-200/20 rounded-full blur-xl"
             style={{animation: 'float 15s ease-in-out infinite 2s'}}></div>
      </div>
      
      <div className="w-full max-w-md relative z-10">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;

