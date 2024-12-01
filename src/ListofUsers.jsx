import { useQuery } from "@tanstack/react-query";
import { getUsersData } from "./utils/api";
import { useForm } from 'react-hook-form';

function ListOfUsers() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const { data: usersData = [], isLoading, isError, error } = useQuery({
        queryKey: ["usersData"], // Unique key for caching
        queryFn: () => getUsersData(),
    })

    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error: {error.message}</div>;

    const nameInput = watch("name", "");

    const designation = watch("designation", "")
    const bloodGroup = watch("blood_group", "")
    const policeUnit = watch("police_unit", "")

    const filteredData = usersData
        .filter(user => user.name.toLowerCase().includes(nameInput.toLowerCase()))
        .filter(user => !designation || user.designation?.toLowerCase().includes(designation.toLowerCase()))
        .filter(user =>
            !bloodGroup ||
            (user.blood_group && user.blood_group.toLowerCase() === bloodGroup.toLowerCase())
        )
        .filter(user => !policeUnit || user.police_unit?.toLowerCase().includes(policeUnit.toLowerCase()));

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
                    <form>
                        <div className="flex gap-5 mb-[30px] max-w-[1200px] items-center justify-center mx-auto flex-wrap md:flex-nowrap">
                            <div className="relative w-full">
                                <input
                                    id="name"
                                    className={`peer bg-[#321a69] rounded-[10px] w-full h-[44px] border border-[#321a69] px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]
                                    }`}
                                    {...register("name")}
                                />
                                <label
                                    htmlFor="name"
                                    className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${nameInput ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                                        }`}
                                >
                                    Name
                                </label>
                            </div>

                            <div className="relative w-full">

                                <select
                                    className="rounded-[10px] bg-[#321a69] w-full h-[44px]  border border-[#321a69] text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                                    {...register("designation")}
                                >
                                    <option value="">Select</option>
                                    <option value="designation1">Designation 1</option>
                                    <option value="designation2">Designation 2</option>
                                    <option value="designation3">Designation 3</option>
                                </select>

                            </div>

                            <div className="relative w-full">
                                <select
                                    className="rounded-[10px] bg-[#321a69] w-full h-[44px] border border-[#321a69] text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                                    {...register("blood_group",)}
                                >
                                    <option value="">All Blood Groups</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>

                                </select>
                            </div>
                            <div className="relative w-full">

                                <select
                                    className="rounded-[10px] bg-[#321a69] w-full h-[44px] border border-[#321a69] text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                                    id='police_unit'
                                    {...register("police_unit")}
                                >
                                    <option value="">Select</option>
                                    <option value="পুলিশ হেডকোয়াটার্স">পুলিশ হেডকোয়াটার্স</option>
                                    <option value="রেঞ্জ পুলিশ">রেঞ্জ পুলিশ</option>
                                    <option value="মেট্রোপলিটন পুলিশ">মেট্রোপলিটন পুলিশ</option>
                                    <option value="বিশেষ শাখা">বিশেষ শাখা</option>
                                    <option value="গোয়েন্দা শাখা">গোয়েন্দা শাখা</option>
                                    <option value="অপরাধ তদন্ত বিভাগ">অপরাধ তদন্ত বিভাগ</option>
                                    <option value="আর্মড পুলিশ ব্যাটালিয়ন">আর্মড পুলিশ ব্যাটালিয়ন</option>
                                    <option value="র‍্যাপিড অ্যাকশন ব্যাটালিয়ন">র‍্যাপিড অ্যাকশন ব্যাটালিয়ন</option>
                                    <option value="রেলওয়ে পুলিশ">রেলওয়ে পুলিশ</option>
                                    <option value="শিল্প পুলিশ">শিল্প পুলিশ</option>
                                    <option value="হাইওয়ে পুলিশ">হাইওয়ে পুলিশ</option>
                                    <option value="পুলিশ ইন্টারনাল ওভারসাইট">পুলিশ ইন্টারনাল ওভারসাইট</option>
                                    <option value="পুলিশ ব্যুরো অব ইনভেস্টিগেশন">পুলিশ ব্যুরো অব ইনভেস্টিগেশন</option>
                                    <option value="ট্রেনিং ইন্সটিটিউটস">ট্রেনিং ইন্সটিটিউটস</option>
                                    <option value="ট্যুরিস্ট পুলিশ">ট্যুরিস্ট পুলিশ</option>
                                    <option value="নৌ পুলিশ">নৌ পুলিশ</option>
                                    <option value="এন্টি টেররিজম ইউনিট">এন্টি টেররিজম ইউনিট</option>
                                    <option value="এমআরটি পুলিশ">এমআরটি পুলিশ</option>
                                    <option value="পুলিশ টেলিকম">পুলিশ টেলিকম</option>
                                </select>
                            </div>
                        </div>
                    </form>
                    {/* <ul className="w-[600px] max-w-[100%] mx-auto
                    "> */}
                    {/* {
                            data.map((value, inde) => (
                                <li key={value.bp_no} className={`flex justify-between font-inter px-[20px] py-[10px] ${(inde + 1) % 2 === 0 ? "login_btn" : "signup_btn"}`}>
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
                        } */}

                    <div className="mb-[100px]">
                        {isLoading && <p>Loading...</p>}
                        {isError && <p>Error: {error.message}</p>}
                        {!isLoading && !isError && (
                            <ul className="w-[600px] max-w-[100%] mx-auto
                                 ">
                                {filteredData.map((user, inde) => (
                                    <li key={user.bp_no} className={`flex justify-between font-inter px-[20px] py-[10px] ${(inde + 1) % 2 === 0 ? "login_btn" : "signup_btn"}`}>
                                        <a href={`/user?id=${user.id}`} className="flex gap-[4px]">
                                            <span>{inde + 1}.</span>
                                            <p>{user.name}</p>
                                            {user.blood_group ? <p>|| 🩸: {user.blood_group}</p> : ''}
                                        </a>

                                        <div className="link_group">
                                            <a href={`tel:0${user.phone_number}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                                            </a>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

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
                    {/* </ul> */}

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