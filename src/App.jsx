import RegistrationForm from "./components/RegistrationForm"
import "./App.css"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-teal-50 p-4">
      <div className="w-full max-w-md">
        <RegistrationForm />
      </div>
    </div>
  )
}

export default App;

