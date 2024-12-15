import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteData, getUsersData, updateData } from "./utils/api";
import { useForm } from 'react-hook-form';
import Footer from "./component/Footer";
import { useState } from "react";
const API_URL = import.meta.env.VITE_SERVER_URL;

function AdminUsers() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();
    const queryClient = useQueryClient();
    const { data: usersData = [], isLoading, isError, error } = useQuery({
        queryKey: ["usersData"], // Unique key for caching
        queryFn: () => getUsersData(),
    })

    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error: {error.message}</div>;

    const nameInput = watch("name", "");

    const phone_number = watch("phone_number", "")
    const bloodGroup = watch("blood_group", "")
    const policeUnit = watch("current_place", "")
    const [openModal, setOpenModal] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [loadingStart, setLoadingStart] = useState(false)


    const filteredData = usersData.length
    ? usersData
        .filter(user => user.name?.toLowerCase().includes(nameInput.toLowerCase()))
        .filter(user => !phone_number || user.phone_number?.toLowerCase().includes(phone_number.toLowerCase()))
        .filter(user =>
            !bloodGroup ||
            (user.blood_group && user.blood_group.toLowerCase() === bloodGroup.toLowerCase())
        )
        .filter(user =>
            !policeUnit ||
            [
                user.police_unit,
                user.police_first_sub_unit,
                user.police_second_sub_unit,
                user.police_third_sub_unit,
                user.police_first_sub_unit_text,
                user.police_second_sub_unit_text
            ].some(field => field?.toLowerCase().includes(policeUnit.toLowerCase()))
        )
    : [];

    const mutation = useMutation({
        mutationFn: ({ id }) => deleteData(id),
        onSuccess: (data) => {
            console.log('Registration successful:', data.refreshToken);
            setLoadingStart(false)
            setOpenModal(false)
            queryClient.invalidateQueries(["usersData"]);
        },
        onError: (error) => {
            setLoadingStart(false)
            setOpenModal(false)
            console.error('Registration failed:', error.response?.data || error.message);
        },
    });

    return (
        <div className="">
            <div className="px-[10px] pt-[50px] min-h-screen overflow-hidden m-0 bg-cover bg-no-repeat bg-center flex flex-col justify-start">
                {/* Header */}
                <header className="text-center">
                    <h1 className="text-[40px] font-bold">Admin</h1>
                </header>


                <div className="text-center pt-[40px] px-5 overflow-hidden">
                    <div className="flex gap-5 justify-center mb-[40px]">
                        <a href="/admin/user/add" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Register New User</a>
                        <a href="/admin/registrationField" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Felds</a>
                        {/* <a href="/admin/settings" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Settings</a> */}
                    </div>
                    <h1 className="text-[36px] font-inter font-bold uppercase mb-[30px]">BD Police 2013 October Batch</h1>
                    {
                        usersData.length ? (
                            <form>
                                <div className="flex gap-5 mb-[30px] max-w-[1200px] items-center justify-center mx-auto flex-wrap md:flex-nowrap">
                                    <div className="relative w-full">
                                        <input
                                            id="name"
                                            className={`peer bg-white rounded-[10px] w-full h-[44px] border  px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]
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

                                        <input
                                            id="phone_number"
                                            className={`peer bg-white rounded-[10px] w-full h-[44px] border  px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]
                                        }`}
                                            {...register("phone_number")}
                                        />
                                        <label
                                            htmlFor="name"
                                            className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${nameInput ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                                                }`}
                                        >
                                            Phone Number
                                        </label>

                                    </div>

                                    <div className="relative w-full">
                                        <select
                                            className="rounded-[10px] bg-white w-full h-[44px] border  text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
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
                                        <input
                                            id="current_place"
                                            className={`peer bg-white rounded-[10px] w-full h-[44px] border  px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]
                                        }`}
                                            {...register("current_place")}
                                        />
                                        <label
                                            htmlFor="current_place"
                                            className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${nameInput ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                                                }`}
                                        >
                                            Current Place
                                        </label>
                                    </div>
                                </div>
                            </form>
                        ) : null
                    }

                    <div className="mb-[100px] w-full overflow-x-scroll">
                        {isLoading && <p>Loading...</p>}
                        {isError && <p>Error: {error.message}</p>}
                        {!isLoading && !isError && filteredData.length && (
                            <table className="w-full border-collapse border border-gray-200 font-inter">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-200 px-4 py-2">#</th>
                                        {Object.keys(filteredData[0]).map((key) => (
                                            <th key={key} className="border border-gray-200 px-4 py-2">
                                                {key.replace(/_/g, " ").toUpperCase()} {/* Format headers */}
                                            </th>
                                        ))}
                                        <th className="border border-gray-200 px-4 py-2">Actions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((user, index) => (
                                        <tr
                                            key={user.bp_no || index}
                                            className={`${(index + 1) % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                        >
                                            <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                            {Object.keys(user).map((key) => key == 'profile_image' ? (
                                                <td key={key} className="border border-gray-200 px-4 py-2">
                                                    <img src={`${API_URL}${user[key]}`} alt="Image" />
                                                </td>
                                            ) : (
                                                <td key={key} className="border border-gray-200 px-4 py-2">
                                                    {user[key]}
                                                </td>
                                            ))}

                                            <td className="border border-gray-200 px-4 py-2">
                                                <div className="flex gap-4">


                                                    <a href={`user/add?edit=${user.id}`} className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Edit</a>

                                                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={() => { setOpenModal(!openModal); setDeleteId(user.id) }}>Delete</button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        )}
                    </div>



                </div>

            </div>
            <div id="popup-modal" className={`${openModal ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " onClick={() => { setOpenModal(false) }}>
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to delete this product?</h3>
                            <button onClick={() => {
                                if (loadingStart) return false;
                                setLoadingStart(true);
                                mutation.mutate({ id: deleteId })
                            }} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100" onClick={() => { setOpenModal(false) }}>No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default AdminUsers;