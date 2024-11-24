import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


function Login() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const bpNoValue = watch("bp_no", "");
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // try {
        //     const response = await fetch("https://your-api-url.com/signup", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(data),
        //     });

        //     if (response.ok) {
        //         const result = await response.json();
        //         login(result.user); // Save user data in context and redirect
        //     } else {
        //         console.error("Signup failed");
        //     }
        // } catch (error) {
        //     console.error("Error during signup:", error);
        // }

        console.log(data);
        

        navigate("/profile");
    }
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

                {/* Main Content */}
                <main className="flex-grow flex flex-col items-center justify-center gap-6 px-4 bg-[#050262] w-[400px] max-w-[95%] mx-auto max-h-[400px] rounded-[18px] mt-[80px]">
                    <form className="sign_up_form" onSubmit={handleSubmit(onSubmit)}>
                        {/* Mobile No */}
                        <div className="mt-[36px] relative w-full">
                            <div className="relative flex">
                                <button id="dropdown-phone-button-3" data-dropdown-toggle="dropdown-phone-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-[#6967a1] bg-[#6967a1] px-4 py-2.5 text-center text-sm font-medium text-[#d3d3d3] hover:bg-[#6967a1]-200 focus:outline-none focus:ring-0 focus:ring-gray-100" type="button">+880<svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path></svg></button>
                                <input
                                    id="mobile_no"
                                    className={`peer  rounded-r-[10px] w-full h-[44px] border border-gray-300 border-s-0 px-3 focus:outline-none focus:ring-r-2 focus:ring-[#6967a1] ${errors.mobile_no ? "border-red-500" : ""
                                        }`}
                                    {...register("mobile_no", { required: "Mobile No. is required" })}
                                />
                            </div>

                            <label
                                htmlFor="mobile_no"
                                className={`absolute top-[0px] left-[5px] pointer-events-none transition-all duration-300 text-[#6967a1] translate-y-[-103%]`}
                            >
                                Mobile No.
                            </label>
                            {errors.mobile_no && (
                                <span className="text-red-500 text-sm">
                                    {errors.mobile_no.message}
                                </span>
                            )}
                        </div>


                        {/* BP No */}
                        <div className="mt-[36px] w-full">
                            <div className="relative">
                                <input
                                    id="bp_no"
                                    className={`peer rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1] ${errors.bp_no ? "border-red-500" : ""
                                        }`}
                                    {...register("bp_no", { required: "BP No. is required" })}
                                />
                                <label
                                    htmlFor="bp_no"
                                    className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${bpNoValue ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                                        }`}
                                >
                                    BP No.
                                </label>
                            </div>
                            {errors.bp_no && (
                                <span className="text-red-500 text-sm">{errors.bp_no.message}</span>
                            )}
                        </div>



                        <button className="py-[10px] px-[40px] rounded-md text-lg font-medium transition text-[#e5e7eb] login_btn  max-w-[400px] block mt-[50px] mx-auto" type="submit" value="Login" >Login</button>
                    </form>


                </main>

                {/* Footer */}

            </div>
            <footer className="bg-gray-800 text-gray-400 py-4 text-center text-sm fixed bottom-0 w-full">
                <small>© 2024 Your Website. All rights reserved. Privacy Policy.</small>
            </footer>
        </div>

    );
}

export default Login;