import { useSearchParams } from "react-router-dom";
import UserDetailsCard from "./component/UserDetailsCard";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSingleUserData } from "./utils/api";

function SingleUserDetails() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["searchData", id],
        queryFn: () => getSingleUserData(id),
        enabled: !!id,
    })
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    return (
        <div className="root-screen-full">
            <div className="px-[10px] pt-[50px] pb-[100px] min-h-screen overflow-hidden m-0 bg-cover bg-no-repeat bg-center flex flex-col justify-start"
                style={{ backgroundImage: "url(bg-registration-form-5.jpg)" }}>
                {/* Header */}
                <header className="">
                    <div className="flex items-center justify-center ">
                        <img src="PCMS_app_logo.png" alt="logo" />
                    </div>
                </header>

                <div className="text-center text-white pt-[80px]">
                    <h1 className="text-[36px] font-inter font-bold uppercase mb-[30px]">BD Police 2013 October Batch</h1>
                    {/* <UserDetailsCard></UserDetailsCard> */}
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