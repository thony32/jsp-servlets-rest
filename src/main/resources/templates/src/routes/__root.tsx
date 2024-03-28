import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/router-devtools"

export const Route = createRootRoute({
    component: () => (
        <>
            <div className="grid grid-cols-8">
                <div className="col-span-1 px-4 py-12 flex flex-col gap-4 h-screen bg-gray-200">
                    <Link to="/" className="[&.active]:font-bold  px-4 py-2 hover:bg-gray-300 duration-300 [&.active]:bg-gray-300 [&.active]:uppercase rounded-lg">
                        Employées
                    </Link>{" "}
                    <Link to="/places" className="[&.active]:font-bold  px-4 py-2 hover:bg-gray-300 duration-300 [&.active]:bg-gray-300 [&.active]:uppercase rounded-lg">
                        Lieux
                    </Link>
                    <Link to="/affectation" className="[&.active]:font-bold  px-4 py-2 hover:bg-gray-300 duration-300 [&.active]:bg-gray-300 [&.active]:uppercase rounded-lg">
                        Affectations
                    </Link>
                </div>
                <div className="col-span-7">
                    <Outlet />
                </div>
            </div>
            {/* <TanStackRouterDevtools /> */}
        </>
    ),
})
