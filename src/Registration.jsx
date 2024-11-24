import { useState } from 'react';
import { useForm } from 'react-hook-form';

function Registration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  // Watch inputs for active behavior
  const bpNoValue = watch("bp_no", "");
  const mobileNoValue = watch("mobile_no", "");
  const nameValue = watch("name", "");
  const emailValue = watch("email", "");
  const addressLine = watch("addressLine", "");
  const [imagePreview, setImagePreview] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <section
      className=" py-[100px] px-[10px] lg:px-[100px] lg:pt-[20px] lg:pb-[100px] m-0 bg-cover	bg-no-repeat bg-center flex items-center justify-center flex-col text-white"
      style={{ backgroundImage: "url(bg-registration-form-5.jpg)" }}
    >
      <div className="flex items-center justify-center mt-[50px] mb-[80px]">
        <img src="PCMS_app_logo.png" alt="logo" />
      </div>
      <div className="registration_area p-[20px] rounded-[12px] w-[1200px] max-w-[100%] bg-[#050262]">
        <h1 className="text-center text-[26px] font-medium mb-5 text-[#f9f9f9]">
          Registration Form
        </h1>
        <form className="sign_up_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="rows flex flex-wrap gap-4">

            <div className="row w-[100%] lg:w-[49%]">
              <div className="mt-[36px] relative w-full">
                <label
                  htmlFor="designation"
                  className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                >
                  Batch No.
                </label>
                <select
                  className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                  {...register("designation", { required: "Designation is required" })}
                >
                  <option value="">Select</option>
                  <option value="designation1">Designation 1</option>
                  <option value="designation2">Designation 2</option>
                  <option value="designation3">Designation 3</option>
                </select>
                {errors.designation && (
                  <p className="text-red-500 mt-1">{errors.designation.message}</p>
                )}
              </div>
              {/* BP No */}
              <div className="mt-[36px] relative w-full">
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
                {errors.bp_no && (
                  <span className="text-red-500 text-sm">{errors.bp_no.message}</span>
                )}
              </div>

              {/* Mobile No */}
              <div className="mt-[36px] relative w-full">
                <div className="relative flex">
                  <button id="dropdown-phone-button-3" data-dropdown-toggle="dropdown-phone-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-[#6967a1] bg-[#6967a1] px-4 py-2.5 text-center text-sm font-medium text-[#d3d3d3] hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100" type="button">+880<svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path></svg></button>
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

              <div className="mt-[36px] relative w-full">
                <label
                  htmlFor="designation"
                  className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                >
                  Designation
                </label>
                <select
                  className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                  {...register("designation", { required: "Designation is required" })}
                >
                  <option value="">Select</option>
                  <option value="designation1">Designation 1</option>
                  <option value="designation2">Designation 2</option>
                  <option value="designation3">Designation 3</option>
                </select>
                {errors.designation && (
                  <p className="text-red-500 mt-1">{errors.designation.message}</p>
                )}
              </div>

              {/* Name */}
              <div className="mt-[36px] relative w-full">
                <input
                  id="name"
                  className={`peer rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1] ${errors.name ? "border-red-500" : ""
                    }`}
                  {...register("name", { required: "Name is required" })}
                />
                <label
                  htmlFor="name"
                  className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${nameValue ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                    }`}>
                  Name
                </label>
                {errors.name && (
                  <span className="text-red-500 text-sm">{errors.name.message}</span>
                )}
              </div>

              {/* Address */}
              <div className='w-full'>
                <div className="mt-[36px] relative w-full">
                  <label
                    htmlFor="district"
                    className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                  >
                    District
                  </label>
                  <select
                    className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                    {...register("district", { required: "District is required" })}
                  >
                    <option value="">Select</option>
                    <option value="district1">District 1</option>
                    <option value="district2">District 2</option>
                    <option value="district3">District 3</option>
                  </select>
                  {errors.district && (
                    <p className="text-red-500 mt-1">{errors.district.message}</p>
                  )}
                </div>

                <div className="mt-[36px] relative w-full">
                  <label
                    htmlFor="thana"
                    className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                  >
                    Thana
                  </label>
                  <select
                    className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                    {...register("thana", { required: "Thana is required" })}
                  >
                    <option value="">Select</option>
                    <option value="thana1">Thana 1</option>
                    <option value="thana2">Thana 2</option>
                    <option value="thana3">Thana 3</option>
                  </select>
                  {errors.thana && <p className="text-red-500 mt-1">{errors.thana.message}</p>}
                </div>

                <div className="mt-[36px] relative w-full">

                  <input
                    id="address_line"
                    className={`peer rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:border-[transparent] focus:ring-2 focus:ring-[#6967a1] ${errors.addressLine ? "border-red-500" : ""
                      }`}
                    {...register("addressLine", { required: "Address is required" })}
                  />
                  <label
                    htmlFor="address_line"
                    className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${addressLine ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                      }`}
                  >
                    Address Line
                  </label>
                  {errors.addressLine && (
                    <p className="text-red-500 mt-1">{errors.addressLine.message}</p>
                  )}
                </div>


              </div>

              {/* Email */}

            </div>
            <div className="row w-[100%] lg:w-[49%]">
              <div className="mt-[36px]  relative w-full">
                <input
                  id="email"
                  className={`peer rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:border-[transparent] focus:ring-2 focus:ring-[#6967a1] ${errors.email ? "border-red-500" : ""
                    }`}
                  {...register("email", { required: "Email is required" })}
                />
                <label
                  htmlFor="email"
                  className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${emailValue ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                    }`}
                >
                  Email
                </label>
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
              </div>
              <div className="mt-[36px]  relative w-full">
                <label
                  htmlFor="gender"
                  className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                >
                  Gender
                </label>
                <select
                  className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select</option>
                  <option value="male">male</option>
                  <option value="thana2">Thana 2</option>
                  <option value="thana3">Thana 3</option>
                </select>
                {errors.thana && <p className="text-red-500 mt-1">{errors.thana.message}</p>}
              </div>


              <div className="mt-[36px]  relative w-full">
                <label
                  htmlFor="gender"
                  className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                >
                  Select Present Police Unit
                </label>
                <select
                  className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select</option>
                  <option value="male">male</option>
                  <option value="thana2">Thana 2</option>
                  <option value="thana3">Thana 3</option>
                </select>
                {errors.thana && <p className="text-red-500 mt-1">{errors.thana.message}</p>}
              </div>


              <div className="mt-[36px]  relative w-full">
                <label
                  htmlFor="gender"
                  className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                >
                  Select Present First Sub Unit
                </label>
                <select
                  className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select</option>
                  <option value="male">male</option>
                  <option value="thana2">Thana 2</option>
                  <option value="thana3">Thana 3</option>
                </select>
                {errors.thana && <p className="text-red-500 mt-1">{errors.thana.message}</p>}
              </div>

              <div className="mt-[36px]  relative w-full">
                <label
                  htmlFor="gender"
                  className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                >
                  Select Present Second Sub Unit
                </label>
                <select
                  className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select</option>
                  <option value="male">male</option>
                  <option value="thana2">Thana 2</option>
                  <option value="thana3">Thana 3</option>
                </select>
                {errors.thana && <p className="text-red-500 mt-1">{errors.thana.message}</p>}
              </div>

              <div className="mt-[36px]  relative w-full">
                <label
                  htmlFor="gender"
                  className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                >
                  Select Present Third Sub Unit
                </label>
                <select
                  className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                  {...register("gender", { required: "Gender is required" })}
                >
                  <option value="">Select</option>
                  <option value="male">male</option>
                  <option value="thana2">Thana 2</option>
                  <option value="thana3">Thana 3</option>
                </select>
                {errors.thana && <p className="text-red-500 mt-1">{errors.thana.message}</p>}
              </div>
            </div>



            {/* Submit Button */}

            {/* File Upload */}
            <div className="mt-[36px] w-full  relative flex items-center gap-5">
              <div className='lg:w-[50%]'>
                <label
                  htmlFor="profile"
                  className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  className="block w-full text-gray-900  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  {...register("profile", {
                    required: "Profile image is required",
                  })}
                  onChange={(e) => {
                    handleFileChange(e); // Update the preview
                  }}
                />
              </div>
              {errors.profile && (
                <p className="text-red-500 mt-1">{errors.profile.message}</p>
              )}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="profile preview"
                  className="mt-4 w-[150px] h-[150px] object-cover border-[1px] border-solid border-[#6967a1]"
                />
              )}
            </div>


          </div>
          <div className='flex items-center justify-center'>
            <input
              type="submit"
              className="mt-[60px] bg-[#6967a1] text-white px-4 py-2 rounded-md hover:bg-[#5a5795] transition duration-300 w-[200px] signup_btn"
            />
          </div>
        </form>
      </div>
      {/* <footer className="bg-gray-800 text-gray-400 py-4 text-center text-sm w-full">
        <small>© 2024 Your Website. All rights reserved. Privacy Policy.</small>
      </footer> */}
    </section>
  );
}

export default Registration;
