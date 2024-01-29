
//Introducir navbar, content y custom footer
import Header from '../header/Navbar';
import Content from "./Content";
import CustomFooter from "../footer/CustomFooter";


function Layout() {  

    return (
       <>
       <Header />
       <Content />
       <CustomFooter />
        </> 
    )
}

export default Layout;