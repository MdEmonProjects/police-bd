import { useMutation, useQuery } from "@tanstack/react-query";
import { adminVerifyToken, fetchField, getSingleUserData, registerNewUser, updateData, verifyToken } from "./utils/api";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const API_URL = import.meta.env.VITE_SERVER_URL;

function RegistrationNew({ userRole }) {
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const context = useOutletContext();
    const { data: fieldsData = [], isLoading: isfieldLoading, isError: isfieldError, error: fieldError } = useQuery({
        queryKey: ["usersData"], // Unique key for caching
        queryFn: () => fetchField(),
    })
    const [filePreviews, setFilePreviews] = useState({});
    const [loadingStart, setLoadingStart] = useState(false)
    const [searchParams] = useSearchParams();
    const editId = searchParams.get("edit");
    const [userOriginalId, setUserOriginalId] = useState(null)
    const navigate = useNavigate();

    const decodeJWT = (token) => {
        if (!token) return null;
        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload));
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    useEffect(() => {

        if (editId) {
            const checkAuth = async () => {
                const token = cookies.get("TOKEN");
                if (token) {
                    try {
                        await verifyToken(token);
                        const userData = decodeJWT(token)
                        const detailsData = await getSingleUserData(userData.id)
                        setUserOriginalId(userData.id)
                        reset(detailsData)


                    } catch (error) {
                        cookies.remove("TOKEN")
                        console.error("Token verification failed:", error);
                    }
                } else {
                    // No token or user
                    navigate("/login");
                }
            };

            const checkAdminAuth = async () => {
                const token = cookies.get("ADMIN_TOKEN");
                if (token) {
                    try {
                        await adminVerifyToken(token);
                        const detailsData = await getSingleUserData(editId)
                        console.log(detailsData);

                        setUserOriginalId(editId)
                        reset(detailsData)


                    } catch (error) {
                        cookies.remove("TOKEN")
                        cookies.remove("ADMIN_TOKEN")
                        console.error("Token verification failed:", error);
                    }
                } else {
                    // No token or user
                    navigate("/login?role=admin");
                }
            };
            if (userRole === 'admin') {
                console.log(userRole);

                checkAdminAuth()
            }
            else {
                console.log(userRole);

                checkAuth()
            }


        }


    }, [editId, navigate, reset])

    // const { data, isLoading, isError, error } = useQuery({
    //     queryKey: ["userProfile", userOriginalId],
    //     queryFn: () => getSingleUserData(userOriginalId),
    //     enabled: !!userOriginalId,
    // })

    const mutation = useMutation({
        mutationFn: ({ id, formData }) => userOriginalId ? updateData(id, formData) : registerNewUser(formData),
        onSuccess: (data) => {
            console.log('Registration successful:', data.refreshToken);
            console.log(data);
            setLoadingStart(false)
            document.cookie = `refreshToken=${JSON.stringify(data.refreshToken)}; path=/; max-age=${60 * 60 * 24}`;
            // context.setUser(data)
            if (userRole === 'admin') {
                navigate("/admin/users");
            }
            else {
                navigate("/profile");
            }
        },
        onError: (error) => {
            setLoadingStart(false)
            console.error('Registration failed:', error.response?.data || error.message);
        },
    });
    const onSubmit = (data) => {
        if (loadingStart) return false
        console.log(data);
        const formData = new FormData();
        // for (const key in data) {
        //     if (key != "profile_image") {
        //         formData.append(key, data[key].trim());
        //     }

        // }
        // if (fileInput) {
        //     formData.append('profile_image', fileInput);
        // }

        for (const key in data) {
            if (data[key] instanceof FileList) {
                Array.from(data[key]).forEach((file) => {
                    formData.append(key, file);
                });
            } else if (data[key] instanceof File) {
                formData.append(key, data[key]);
            } else {
                formData.append(key, data[key]);
            }
        }


        setLoadingStart(true)
        mutation.mutate({ id: userOriginalId, formData });
    };
    const handleFileChange = (e, fieldKey) => {
        const file = e.target.files[0];
        if (file) {
            console.log(fieldKey);

            // Generate a preview URL for the file
            const previewURL = URL.createObjectURL(file);
            setFilePreviews((prev) => ({
                ...prev,
                [fieldKey]: previewURL,
            }));
            // setValue(fieldKey, file); // Update the value in react-hook-form
        }
    };
    return (
        <section
            className=" py-[100px] px-[10px] lg:px-[100px] lg:pt-[20px] lg:pb-[100px] m-0 bg-cover	bg-no-repeat bg-center flex items-center justify-center flex-col text-white"
            style={{ backgroundImage: "url(bg.jpg)" }}
        >
            {loadingStart ? <div className='loading fixed top-0 left-0 h-screen w-screen z-10 bg-slate-700/50 flex items-center justify-center'>
                <svg aria-hidden="true" className="w-[40px] h-[40px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#000000" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div> : null}
            <div className="registration_area p-[20px] rounded-[12px] w-[1200px] max-w-[100%] bg-[#050262]">
                <h2 className="text-center text-[26px] font-medium mb-5 text-[#f9f9f9]">
                    Registration Form
                </h2>
                <h1 className="text-[26px] text-center font-inter font-bold uppercase mb-[30px]">BD Police 2013 October Batch</h1>
                <form className="sign_up_form" onSubmit={handleSubmit(onSubmit)}>
                    {
                        fieldsData.map((field) => (
                            field.type === 'input' || field.type === 'email' ? <div className="mt-[36px] relative w-full" key={`${field.key}_${field.type}`}>
                                <div className="relative">
                                    {
                                        field.type === 'email' ? <input
                                            id={field.key}
                                            className={`peer rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1] ${errors[field.key] ? "border-red-500" : ""
                                                }`}
                                            {...register(field.key, { required: field.required ? `${field.title} is required` : false })}
                                            type="email"
                                        /> : field.key === 'phone_number' ? <div className="relative flex">
                                            <button id="dropdown-phone-button-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-[#6967a1] bg-[#6967a1] px-4 py-2.5 text-center text-sm font-medium text-[#d3d3d3] hover:bg-[#6967a1] focus:outline-none focus:ring-0 focus:ring-gray-100" type="button">+88<svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path></svg></button>
                                            <input
                                                id={field.key}
                                                type="text" // Use text to preserve leading zeros
                                                className={`peer rounded-r-[10px] w-full h-[44px] border border-gray-300 border-s-0 px-3 focus:outline-none focus:ring-r-2 focus:ring-[#6967a1] ${errors.mobile_no ? "border-red-500" : ""}`}
                                                {...register(field.key, {
                                                    required: field.required ? `${field.title} is required` : false,
                                                    validate: {
                                                        validNumber: (value) =>
                                                            /^\d{11}$/.test(value) ? true : "Invalid format. Must be 11 digits.",
                                                    },
                                                })}
                                                onInput={(e) => {
                                                    // Ensure only digits are allowed
                                                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                                                }}
                                            />


                                        </div> : <input
                                            id={field.key}
                                            className={`peer rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1] ${errors[field.key] ? "border-red-500" : ""
                                                }`}
                                            {...register(field.key, { required: field.required ? `${field.title} is required` : false })}
                                        />
                                    }
                                    {
                                        field.key === 'phone_number' ? <label
                                            htmlFor={field.key}
                                            className={`absolute top-[0px] left-[5px] pointer-events-none transition-all duration-300 text-[#6967a1] translate-y-[-103%]`}
                                        >
                                            {field.title}
                                        </label> : <label
                                            htmlFor={field.key}
                                            className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${watch(field.key) ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                                                }`}
                                        >
                                            {field.title}
                                        </label>
                                    }
                                </div>
                                {errors[field.key] && (
                                    <span className="text-red-500 text-sm">{errors[field.key].message}</span>
                                )}
                            </div> :
                                field.type === 'select' ? <div className='w-full' key={`${field.key}_${field.type}`}>
                                    <div className="mt-[36px] relative w-full">
                                        <label
                                            htmlFor={field.key}
                                            className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                                        >
                                            {field.title}
                                        </label>
                                        <select
                                            className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                                            {...register(field.key, { required: field.required ? `${field.title} is required` : false })}
                                        >
                                            <option value="">Select</option>
                                            {
                                                field.options.map(option => <option value={option.value} key={`${field.key}_${option.value}`}>{option.title}</option>)
                                            }

                                        </select>
                                        {errors[field.key] && (
                                            <p className="text-red-500 mt-1">{errors[field.key].message}</p>
                                        )}
                                    </div>

                                    {
                                        watch(field.key) === 'other_tab' ? <div className="mt-[36px] relative w-full" key={field.key}>
                                            <div className="relative">
                                                <input
                                                    id={`${field.key}_text`}
                                                    className={`peer rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1] ${errors[field.key] ? "border-red-500" : ""
                                                        }`}
                                                    {...register(`${field.key}_text`, { required: `${field.title} is required` })}
                                                />
                                                <label
                                                    htmlFor={`${field.key}_text`}
                                                    className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${watch(`${field.key}_text`) ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                                                        }`}
                                                >
                                                    {field.title}
                                                </label>
                                            </div>
                                            {errors[`${field.key}_text`] && (
                                                <p className="text-red-500 mt-1">{errors[`${field.key}_text`].message}</p>
                                            )}
                                        </div> : null
                                    }

                                </div> : field.type === 'file' ? <div className="mt-[36px] w-full  relative flex items-center gap-5" key={`${field.key}_${field.type}`}>
                                    <div className='lg:w-[50%]'>
                                        <label
                                            htmlFor={field.key}
                                            className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                                        >
                                            {field.title}
                                        </label>
                                        <input
                                            id={field.key}
                                            type="file"
                                            className="block w-full text-gray-900  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                            {...register(field.key, {
                                                required: field.required ? `${field.title} is required` : false
                                            })}
                                            onChange={(e) => handleFileChange(e, field.key)}
                                        />
                                    </div>
                                    {errors[field.key] && (
                                        <p className="text-red-500 mt-1">{errors[field.key].message}</p>
                                    )}
                                    {(filePreviews[field.key] || typeof (getValues(field.key)) === 'string') && (
                                        <img
                                            src={filePreviews[field.key] ? filePreviews[field.key] : typeof (getValues(field.key)) === 'string' ? `${API_URL}${getValues(field.key)}` : 'sfsdfs'}
                                            alt={`${field.title} preview`}
                                            className="mt-4 w-[150px] h-[150px] object-cover border-[1px] border-solid border-[#6967a1]"
                                        />
                                    )}
                                </div> : null
                        ))
                    }
                    <div className='flex items-center justify-center'>
                        <input
                            type="submit"
                            className="mt-[60px] bg-[#6967a1] text-white px-4 py-2 rounded-md hover:bg-[#5a5795] transition duration-300 w-[200px] signup_btn"
                        />
                    </div>
                </form>
            </div>

        </section>
    )
}
export default RegistrationNew;
/**
 * 
 * 
 * :
                            field.type === 'file' ? <div className="mt-[36px] w-full  relative flex items-center gap-5">
                                <div className='lg:w-[50%]' key={field.key}>
                                    <label
                                        htmlFor={field.key}
                                        className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                                    >
                                        {field.title}
                                    </label>
                                    <input
                                        type="file"
                                        className="block w-full text-gray-900  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                        {...register(field.key, {
                                            validate: {
                                                required: (value) => !!imagePreview || "Profile image is required", // Check fileInput
                                            },
                                        })}
                                        onChange={(e) => {
                                            handleFileChange(e); // Update the preview
                                        }}
                                    />
                                </div>
                                {errors.profile_image && (
                                    <p className="text-red-500 mt-1">{errors.profile_image.message}</p>
                                )}
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="profile preview"
                                        className="mt-4 w-[150px] h-[150px] object-cover border-[1px] border-solid border-[#6967a1]"
                                    />
                                )}
                            </div> 
 */
