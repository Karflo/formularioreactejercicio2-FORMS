import { Outlet } from "react-router-dom";

function Content() { //En Content lo crearé como Padre con la etiquet Outlet para poder renderizar todos los hijos

    return (
        <>

        <div className={"content"}>
            <Outlet />
        </div>

        </>
    )
}

export default Content;