import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [memberCount] = useState(12345); // Example member count

    const handleRegister = () => {
        alert("Registration feature coming soon!");
    };


    return (
        <div className="root-screen-full">
            <div className="px-[10px] pt-[50px] h-screen overflow-hidden m-0 bg-cover bg-no-repeat bg-center flex flex-col justify-between"
                style={{ backgroundImage: "url(bg-registration-form-5.jpg)" }}>
                {/* Header */}
                <header className="">
                    <div className="flex items-center justify-center ">
                        <img src="PCMS_app_logo.png" alt="logo" />
                    </div>
                </header>

                {/* Main Content */}
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
                    <p className="text-white">Total Member: {memberCount}</p>
                </main>

                {/* Footer */}

            </div>
            <footer className="bg-gray-800 text-gray-400 py-4 text-center text-sm fixed bottom-0 w-full">
                <small>© 2024 Your Website. All rights reserved. Privacy Policy.</small>
            </footer>
        </div>

    );
}

export default Home;