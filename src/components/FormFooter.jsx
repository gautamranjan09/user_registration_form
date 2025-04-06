import React from "react"

function FormFooter() {
  return (
    <div className="p-6 text-center text-sm text-gray-500 border-t border-gray-100">
      <p>By registering, you agree to our Terms of Service and Privacy Policy.</p>
      <p className="mt-2">
        Already have an account?{" "}
        <a href="#" className="text-rose-500 hover:text-rose-600 font-medium">
          Sign in
        </a>
      </p>
    </div>
  )
}

export default FormFooter;