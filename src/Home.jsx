import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import { Link } from "react-router-dom";
import { getUsersData } from "./utils/api";
import Loading from "./component/Loading";
import { useEffect } from "react";
import Footer from "./component/Footer";

function Home() {
    // const [memberCount] = useState(12345); // Example member count
    useEffect(() => {
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        };

        setVh();
        window.addEventListener("resize", setVh);

        return () => {
            window.removeEventListener("resize", setVh);
        };
    }, []);
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["usersData"], // Unique key for caching
        queryFn: () => getUsersData(),
    })
    // if (isLoading) return <Loading/>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="root-screen-full">
            <div className="px-[10px] pt-[50px] h-screen overflow-hidden m-0 bg-cover bg-no-repeat bg-center flex flex-col justify-between"
                style={{ backgroundImage: "url(bg.jpg)" }}>
                {/* Header */}
                <div>
                    <header className="mb-[100px]">
                        <div className="flex items-center justify-center ">
                            <img src="logo.png" alt="logo" />
                        </div>
                    </header>

                    <main className="flex-grow flex flex-col items-center justify-center gap-6 px-4 ">
                        <a href="/registration"

                            className=" py-[15px] px-[80px] rounded-md text-lg font-medium transition text-[#e5e7eb] signup_btn  max-w-[400px]"
                        >
                            Register
                        </a>

                        <a href="/login"

                            className="py-[15px] px-[90px] rounded-md text-lg font-medium transition text-[#e5e7eb] login_btn  max-w-[400px]"
                        >
                            Login
                        </a>
                        <p className="text-white">Total Member: {isLoading ? <div>Loading...</div> : data.length}</p>
                        <div className="flex items-center justify-center flex-col">
                            <a href="/goal" className="font-inter text-[18px] py-[8px] px-[40px] rounded-lg bg-[#5499dc] inline-block mt-[40px]">উদ্দেশ্য</a>
                            <div className=" text-gray-400 py-4 text-center text-lg">
                                <small>Develop by Tanvir Hasan</small>
                            </div>
                        </div>

                    </main>
                </div>


                {/* Main Content */}


                {/* Footer */}

            </div>
            <Footer/>
        </div>

    );
}

export default Home;