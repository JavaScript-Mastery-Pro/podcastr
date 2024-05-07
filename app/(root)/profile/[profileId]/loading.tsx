import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex-center w-full">
      <Loader className="text-orange-1" size={20} />
    </div>
  );
};

export default loading;
