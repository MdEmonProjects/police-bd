import UserDetailsCard from "./component/UserDetailsCard";

function SingleUserDetails() {


    return (
        <div className="root-screen-full">
            <div className="px-[10px] pt-[50px] h-screen overflow-hidden m-0 bg-cover bg-no-repeat bg-center flex flex-col justify-start"
                style={{ backgroundImage: "url(bg-registration-form-5.jpg)" }}>
                {/* Header */}
                <header className="">
                    <div className="flex items-center justify-center ">
                        <img src="PCMS_app_logo.png" alt="logo" />
                    </div>
                </header>

                <div className="text-center text-white pt-[80px]">
                    <h1 className="text-[36px] font-inter font-bold uppercase mb-[30px]">BD Police 2013 October Batch</h1>
                    <UserDetailsCard></UserDetailsCard>

                </div>

                {/* Footer */}

            </div>
            <footer className="bg-gray-800 text-gray-400 py-4 text-center text-sm ">
                <small>© 2024 Your Website. All rights reserved. Privacy Policy.</small>
            </footer>
        </div>

    );
}

export default SingleUserDetails;