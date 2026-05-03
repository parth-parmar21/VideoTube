import React, { useState } from 'react';
import SideBarButtonsBottom from './SideBarButtonsBottom';
import SideBarButtonsTop from './SideBarButtonsTop';
import { Menu } from 'lucide-react';

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={`h-full ${isCollapsed ? 'w-[5%]' : 'w-[20%]'} bg-black text-white flex flex-col justify-between py-5 px-3 border-r transition-all duration-300`}
        >
            <div>
                <div
                    className={`flex ${isCollapsed ? 'justify-center' : 'justify-end'}  w-full`}
                >
                    <Menu
                        size={`${isCollapsed ? 40 : 40}`}
                        className={`${isCollapsed ? 'w-30' : 'w-11'} border p-1`}
                        onClick={() =>
                            setIsCollapsed(!isCollapsed)
                        }
                    />
                </div>
                <SideBarButtonsTop
                    isCollapsed={isCollapsed}
                />
            </div>
            <div>
                <SideBarButtonsBottom
                    isCollapsed={isCollapsed}
                />
            </div>
        </div>
    );
};

export default SideBar;
