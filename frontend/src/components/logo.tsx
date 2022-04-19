import React, {FC} from "react";
import logo from '../logo.png';
import logoMini from '../logo-mini.png';
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";


const Logo: FC = () => {
    const breakpoints = useBreakpoint();

    if (breakpoints.xs)
        return <img src={logoMini} alt="logo" style={{ width: 45 }}/>;
    else
        return <img src={logo} alt="logo" style={{ width: 250 }}/>;
};

export default Logo;