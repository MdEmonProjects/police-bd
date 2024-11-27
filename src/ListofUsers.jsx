import { useQuery } from "@tanstack/react-query";
import { getUsersData } from "./utils/api";

function ListOfUsers() {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["usersData"], // Unique key for caching
        queryFn: () => getUsersData(),
    })

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

   
    return (
        <div className="">
            <div className="px-[10px] pt-[50px] min-h-screen overflow-hidden m-0 bg-cover bg-no-repeat bg-center flex flex-col justify-start"
                style={{ backgroundImage: "url(bg-registration-form-5.jpg)" }}>
                {/* Header */}
                <header className="">
                    <div className="flex items-center justify-center ">
                        <img src="PCMS_app_logo.png" alt="logo" />
                    </div>
                </header>

                <div className="text-center text-white pt-[80px]">
                    <h1 className="text-[36px] font-inter font-bold uppercase mb-[30px]">BD Police 2013 October Batch</h1>
                    <ul className="w-[600px] max-w-[100%] mx-auto
                    ">
                        {
                            data.map((value, inde) => (
                                <li key={value.bp_no} className={`flex justify-between font-inter px-[20px] py-[10px] ${(inde+1)%2 === 0 ? "login_btn" : "signup_btn" }`}>
                                <a href={`/user?id=${value.id}`} className="flex gap-[4px]">
                                    <span>{inde + 1}.</span>
                                    <p>{value.name}</p>
                                </a>
                                <div className="link_group">
                                    <a href={`tel:0${value.phone_number}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                                    </a>
                                </div>
    
                            </li>
                            ))
                        }
                       
                        {/* <li className="flex justify-between font-inter login_btn px-[20px] py-[10px]">
                            <div className="flex gap-[4px]">
                                <span>2.</span>
                                <p>Md. Hasan</p>
                            </div>
                            <div className="link_group">
                                <a href="tel:01876362586">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                                </a>
                            </div>

                        </li> */}
                    </ul>

                </div>

                {/* Footer */}

            </div>
            <footer className="bg-gray-800 text-gray-400 py-4 text-center text-sm fixed bottom-0 w-full">
                <small>© 2024 Your Website. All rights reserved. Privacy Policy.</small>
            </footer>
        </div>

    );
}

export default ListOfUsers;