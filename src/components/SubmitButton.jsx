import React from "react";

function SubmitButton({ isSubmitting }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
        isSubmitting ? "bg-gray-400" : "bg-gradient-to-r from-rose-500 to-teal-500 hover:from-rose-600 hover:to-teal-600"
      }`}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Registering...
        </div>
      ) : (
        "Register"
      )}
    </button>
  );
}

export default SubmitButton;
