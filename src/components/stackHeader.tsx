import { SetStateAction, useState } from "react";
import { Tab } from "../utils/types";
import CreateEmployeeButton from "./admin/employee/createEmployeeButton";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function StackedHeader({ tabs }: { tabs: Tab[] }) {
  const [selectedTab, setSelectedTab] = useState(
    //ts-ignore
    tabs.find((tab) => tab?.current)?.name
  );

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
    // Update the 'current' property in the tabs array
    tabs.forEach((tab) => {
      tab.current = tab.name === tabName;
    });
  };

  return (
    <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
      <div className="md:flex md:items-center md:justify-between">
   
      </div>
      <div className="mt-4">

        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
                onClick={() => handleTabClick(tab.name)}
              >
                {tab.name}
                <span className="inline-flex items-center rounded bg-primary/30 px-2 py-0.5 text-xs font-medium text-purple-800 ml-2">
                  0
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
