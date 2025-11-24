import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-800">
      <div className="flex space-x-3">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default Loading;
