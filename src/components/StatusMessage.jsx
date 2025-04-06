import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

function StatusMessage({ status }) {
  if (!status.type) return null;

  return (
    <div
      className={`p-3 rounded-lg flex items-start gap-2 animate-[fadeIn_0.3s_ease-out_forwards] ${
        status.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-rose-50 text-rose-800 border border-rose-200"
      }`}
    >
      {status.type === "success" ? <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" /> : <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />}
      <div>
        <h3 className="font-medium">{status.type === "success" ? "Success" : "Error"}</h3>
        <p className="text-sm">{status.message}</p>
      </div>
    </div>
  );
}

export default StatusMessage;
