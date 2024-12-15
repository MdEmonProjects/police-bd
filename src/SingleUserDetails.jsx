import { useSearchParams } from "react-router-dom";
import UserDetailsCard from "./component/UserDetailsCard";
import { useQuery } from "@tanstack/react-query";
import { getSingleUserData } from "./utils/api";
import Footer from "./component/Footer";
const API_URL = import.meta.env.VITE_SERVER_URL;

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
        <div>
            <div className="px-[10px] pt-[50px] pb-[100px] min-h-screen overflow-hidden m-0 bg-cover bg-no-repeat bg-center flex flex-col justify-start"
                style={{ backgroundImage: "url(/bg.jpg)" }}>
                {/* Header */}
                {/* <header className="">
                    <div className="flex items-center justify-center ">
                        <img src="/logo.png" alt="logo" />
                    </div>
                </header> */}

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
                            profile_image={`${API_URL}${data.profile_image}`} 
                            police_unit={data.police_unit} 
                            police_first_sub_unit={data.police_first_sub_unit} police_second_sub_unit={data.police_second_sub_unit} police_third_sub_unit={data.police_third_sub_unit}
                            police_first_sub_unit_text={data.police_first_sub_unit_text}
                            police_second_sub_unit_text={data.police_second_sub_unit_text}>

                            </UserDetailsCard>) : (<div>Loading...</div>)
                    }

                </div>

                {/* Footer */}

            </div>
            <Footer/>

        </div>

    );
}

export default SingleUserDetails;