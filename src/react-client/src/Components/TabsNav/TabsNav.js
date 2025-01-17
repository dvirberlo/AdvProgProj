import { Component, useState } from "react";
/**
 * @param {{tabs: Array<{name: string, element: Component}>}} props
 */
export const TabsNav = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <ul className="my-2 nav nav-underline">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className="nav-item"
            onClick={() => setActiveTab(index)}
          >
            <a
              className={`nav-link ${
                activeTab === index ? "active" : "link-secondary"
              }`}
              href="#"
            >
              {tab.name}
            </a>
          </li>
        ))}
      </ul>

      {tabs[activeTab].element}
    </div>
  );
};
