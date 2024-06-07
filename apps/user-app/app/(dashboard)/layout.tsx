import { SideBar } from "../../components/SideBar";


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex w-full">
            <SideBar/>
            <div className="flex-grow">
                {children}
            </div>
        </div>
    );
}
