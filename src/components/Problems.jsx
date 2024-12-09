import { useState, useEffect } from "react";
import Shortage from "@/components/Shortage";
import WaterPollution from "@/components/WaterPollution";
import Acidification from "./Acidification";

const Problems = () => {
  const [activeTab, setActiveTab] = useState("Escasez");
  const [hasInteracted, setHasInteracted] = useState(false);
  const tabs = ["Escasez", "Acidificación", "Contaminación"];
  const activeIndex = tabs.indexOf(activeTab);

  useEffect(() => {
    window.scrollBy({
      top: 205,
      behavior: "smooth",
    });
  }, [activeTab, hasInteracted]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    <div className="w-full h-[100%] mt-[100px]">
      <div className="relative flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`flex-1 px-4 py-10 font-semibold transition-colors focus:outline-none ${
              activeTab === tab
                ? "text-slate-600"
                : "text-gray-500 hover:text-slate-600"
            }`}
          >
            {tab}
          </button>
        ))}

        <div
          className="absolute bottom-0 h-[2px] bg-slate-600 transition-transform duration-300"
          style={{
            width: `${100 / tabs.length}%`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      </div>
      <div className="bg-gray-50 100vh">
        {activeTab === "Escasez" && <Shortage />}
        {activeTab === "Acidificación" && <Acidification />}
        {activeTab === "Contaminación" && <WaterPollution />}
      </div>
    </div>
  );
};

export default Problems;
