import UserDetailsCard from "./component/UserDetailsCard";

import { useEffect, useState } from "react";
import { useUser } from "./context/AuthContext";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";
import { getSingleUserData } from "./utils/api";

// import {  useOutletContext } from "react-router-dom";

const cookies = new Cookies();
function Profile() {
    // const context = useOutletContext()
    const { user } = useUser()
    const [userId, setUserId] = useState(null);
    const token = cookies.get("TOKEN");
    const decodeJWT = (token) => {
        if (!token) return null;
        try {
            const payload = token.split('.')[1]; // Extract the payload part
            return JSON.parse(atob(payload)); // Decode from Base64 and parse to JSON
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };
    useEffect(() => {
        const payload = decodeJWT(token);
        if (payload?.id) {
            setUserId(payload.id);
            console.log(payload);

        }


    }, [user, token])

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["userProfile", userId], // Unique key for caching
        queryFn: () => getSingleUserData(userId), // Fetch function
        enabled: !!userId, // Only run query if `userId` is available
    })
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    if (data) {
        console.log(data);

    }

    return (
        <div className="root-screen-full">
            <div className="px-[10px] pt-[50px] pb-[100px] overflow-hidden m-0 bg-cover bg-no-repeat bg-center flex flex-col justify-start"
                style={{ backgroundImage: "url(bg-registration-form-5.jpg)" }}>
                {/* Header */}
                <header className="">
                    <div className="flex items-center justify-center ">
                        <img src="PCMS_app_logo.png" alt="logo" />
                    </div>
                </header>

                <div className="text-center text-white pt-[80px]">
                    <h1 className="text-[36px] font-inter font-bold uppercase mb-[30px]">BD Police 2013 October Batch</h1>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <a href="/list_of_users" className="font-inter py-[10px] px-[20px] rounded-lg bg-[#131b43] inline-block ">View All Member</a>
                        <a href="/registration" className="font-inter py-[10px] px-[20px] rounded-lg bg-[#5499dc] inline-block">Edit Your Details</a>
                    </div>
                    {
                        data ? (<UserDetailsCard name={data.name} 
                            designation={data.designation} 
                            address={`${data.address ? data.address + "," : ""} ${data.district}`} 
                            bp_no={data.bp_no} 
                            email={data.email} 
                            gender={data.gender} 
                            id={data.id} 
                            phone_number={data.phone_number} 
                            profile_image={`http://localhost:4000${data.profile_image}`} 
                            police_unit={data.police_unit} 
                            police_first_sub_unit={data.police_first_sub_unit} police_second_sub_unit={data.police_second_sub_unit} police_third_sub_unit={data.police_third_sub_unit}>

                            </UserDetailsCard>) : (<div>Loading...</div>)
                    }
                    {/*  */}

                </div>

                {/* Footer */}

            </div>
            <footer className="bg-gray-800 text-gray-400 py-4 text-center text-sm ">
                <small>© 2024 Your Website. All rights reserved. Privacy Policy.</small>
            </footer>
        </div>

    );
}

export default Profile;