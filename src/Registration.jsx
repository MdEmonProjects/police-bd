import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getSingleUserData, registerNewUser, updateData, verifyToken } from './utils/api';
import { useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import Cookies from 'universal-cookie';
const API_URL = import.meta.env.VITE_SERVER_URL;

const cookies = new Cookies();
function Registration() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const context = useOutletContext();
  const [fileInput, setFileInput] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loadingStart, setLoadingStart] = useState(false)
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit"); // Extract the 'edit' parameter value
  const [userOriginalId, setUserOriginalId] = useState(null)

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

    if (editId) {
      const checkAuth = async () => {
        const token = cookies.get("TOKEN");
        if (token) {
          try {
            await verifyToken(token); // Validate token
            const userData = decodeJWT(token)
            const detailsData = await getSingleUserData(userData.id)
            setUserOriginalId(userData.id)
            reset(detailsData)
            setImagePreview(`${API_URL}${detailsData.profile_image}`)


          } catch (error) {
            console.error("Token verification failed:", error);
          }
        } else {
          // No token or user
          // navigate("/login");
        }
      };
      checkAuth()

    }


  }, [editId, navigate, reset])

  // Fetch data based on the 'edit' parameter
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile", userOriginalId],
    queryFn: () => getSingleUserData(userOriginalId),
    enabled: !!userOriginalId,
  })
  //  
  const mutation = useMutation({
    mutationFn: ({ id, formData }) => userOriginalId ? updateData(id, formData) : registerNewUser(formData),
    onSuccess: (data) => {
      console.log('Registration successful:', data.refreshToken);
      document.cookie = `refreshToken=${JSON.stringify(data.refreshToken)}; path=/; max-age=${60 * 60 * 24}`;
      context.setUser(data)
      navigate("/profile");
    },
    onError: (error) => {
      console.error('Registration failed:', error.response?.data || error.message);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();

    // Append non-file data to FormData
    for (const key in data) {
      if (key != "profile_image") {
        formData.append(key, data[key]);
      }

    }

    // Append the file to FormData
    if (fileInput) {
      formData.append('profile_image', fileInput); // Ensure backend expects 'file'
    }
    // console.log(userOriginalId);
    setLoadingStart(true)

    mutation.mutate({ id: userOriginalId, formData });
  };

  // Watch inputs for active behavior
  const bpNoValue = watch("bp_no", "");
  // const mobileNoValue = watch("mobile_no", "");
  const nameValue = watch("name", "");
  const emailValue = watch("email", "");
  const address_line = watch("address", "");
  const policeThirdSubUnit = watch("police_third_sub_unit", "");
  const policeFirstSubUnitText = watch("police_first_sub_unit_text")
  const policeFirstSubUnit = watch("police_first_sub_unit");
  const policeSecondSubUnit = watch("police_second_sub_unit");
  const policeSecondSubUnitText = watch("police_second_sub_unit_text");




  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setFileInput(file)
    }
  };

  // if (data) {
  //   console.log(data);

  // }
  return (
    <section
      className=" py-[100px] px-[10px] lg:px-[100px] lg:pt-[20px] lg:pb-[100px] m-0 bg-cover	bg-no-repeat bg-center flex items-center justify-center flex-col text-white"
      style={{ backgroundImage: "url(bg-registration-form-5.jpg)" }}
    >
      {loadingStart ? <div className='loading fixed top-0 left-0 h-screen w-screen z-10 bg-slate-700/50 flex items-center justify-center'>
        <svg aria-hidden="true" class="w-[40px] h-[40px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#000000" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div> : null}
      <div className="flex items-center justify-center mt-[50px] mb-[80px]">
        <img src="PCMS_app_logo.png" alt="logo" />
      </div>
      <div className="registration_area p-[20px] rounded-[12px] w-[1200px] max-w-[100%] bg-[#050262]">

        <h2 className="text-center text-[26px] font-medium mb-5 text-[#f9f9f9]">
          Registration Form
        </h2>
        <h1 className="text-[26px] text-center font-inter font-bold uppercase mb-[30px]">BD Police 2013 October Batch</h1>

        {
          isLoading ? <div>Loading...</div> :
            isError ? <div>Error: {error.message}</div> :
              (
                <form className="sign_up_form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="rows flex flex-wrap gap-4">

                    <div className="row w-[100%] lg:w-[49%]">
                      {/* <div className="mt-[36px] relative w-full">
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
              </div> */}
                      {/* BP No */}
                      <div className="mt-[36px] relative w-full">
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

                      {/* Mobile No */}
                      <div className="mt-[36px] relative w-full">
                        <div className="relative flex">
                          <button id="dropdown-phone-button-3" className="z-10 inline-flex shrink-0 items-center rounded-s-lg border border-[#6967a1] bg-[#6967a1] px-4 py-2.5 text-center text-sm font-medium text-[#d3d3d3] hover:bg-[#6967a1] focus:outline-none focus:ring-0 focus:ring-gray-100" type="button">+880<svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"></path></svg></button>
                          <input
                            id="phone_number"
                            className={`peer  rounded-r-[10px] w-full h-[44px] border border-gray-300 border-s-0 px-3 focus:outline-none focus:ring-r-2 focus:ring-[#6967a1] ${errors.mobile_no ? "border-red-500" : ""
                              }`}
                            {...register("phone_number", { required: "Mobile No. is required", minLength: 10, maxLength: 10 })}
                          />
                        </div>

                        <label
                          htmlFor="phone_number"
                          className={`absolute top-[0px] left-[5px] pointer-events-none transition-all duration-300 text-[#6967a1] translate-y-[-103%]`}
                        >
                          Mobile No.
                        </label>
                        {errors.phone_number && (
                          <span className="text-red-500 text-sm">
                            {errors.phone_number.message}
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
                        <div className="relative">
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
                        </div>
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
                            <option value="কুমিল্লা">কুমিল্লা</option>
                            <option value="ফেনী">ফেনী</option>
                            <option value="ব্রাহ্মণবাড়িয়া">ব্রাহ্মণবাড়িয়া</option>
                            <option value="রাঙ্গামাটি">রাঙ্গামাটি</option>
                            <option value="নোয়াখালী">নোয়াখালী</option>
                            <option value="চাঁদপুর">চাঁদপুর</option>
                            <option value="লক্ষ্মীপুর">লক্ষ্মীপুর</option>
                            <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                            <option value="কক্সবাজার">কক্সবাজার</option>
                            <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
                            <option value="বান্দরবান">বান্দরবান</option>
                            <option value="সিরাজগঞ্জ">সিরাজগঞ্জ</option>
                            <option value="পাবনা">পাবনা</option>
                            <option value="বগুড়া">বগুড়া</option>
                            <option value="রাজশাহী">রাজশাহী</option>
                            <option value="নাটোর">নাটোর</option>
                            <option value="জয়পুরহাট">জয়পুরহাট</option>
                            <option value="চাঁপাইনবাবগঞ্জ">চাঁপাইনবাবগঞ্জ</option>
                            <option value="নওগাঁ">নওগাঁ</option>
                            <option value="যশোর">যশোর</option>
                            <option value="সাতক্ষীরা">সাতক্ষীরা</option>
                            <option value="মেহেরপুর">মেহেরপুর</option>
                            <option value="নড়াইল">নড়াইল</option>
                            <option value="চুয়াডাঙ্গা">চুয়াডাঙ্গা</option>
                            <option value="কুষ্টিয়া">কুষ্টিয়া</option>
                            <option value="মাগুরা">মাগুরা</option>
                            <option value="খুলনা">খুলনা</option>
                            <option value="বাগেরহাট">বাগেরহাট</option>
                            <option value="ঝিনাইদহ">ঝিনাইদহ</option>
                            <option value="ঝালকাঠি">ঝালকাঠি</option>
                            <option value="পটুয়াখালী">পটুয়াখালী</option>
                            <option value="পিরোজপুর">পিরোজপুর</option>
                            <option value="বরিশাল">বরিশাল</option>
                            <option value="ভোলা">ভোলা</option>
                            <option value="বরগুনা">বরগুনা</option>
                            <option value="সিলেট">সিলেট</option>
                            <option value="মৌলভীবাজার">মৌলভীবাজার</option>
                            <option value="হবিগঞ্জ">হবিগঞ্জ</option>
                            <option value="সুনামগঞ্জ">সুনামগঞ্জ</option>
                            <option value="নরসিংদী">নরসিংদী</option>
                            <option value="গাজীপুর">গাজীপুর</option>
                            <option value="শরীয়তপুর">শরীয়তপুর</option>
                            <option value="নারায়ণগঞ্জ">নারায়ণগঞ্জ</option>
                            <option value="টাঙ্গাইল">টাঙ্গাইল</option>
                            <option value="কিশোরগঞ্জ">কিশোরগঞ্জ</option>
                            <option value="মানিকগঞ্জ">মানিকগঞ্জ</option>
                            <option value="ঢাকা">ঢাকা</option>
                            <option value="মুন্সিগঞ্জ">মুন্সিগঞ্জ</option>
                            <option value="রাজবাড়ী">রাজবাড়ী</option>
                            <option value="মাদারীপুর">মাদারীপুর</option>
                            <option value="গোপালগঞ্জ">গোপালগঞ্জ</option>
                            <option value="ফরিদপুর">ফরিদপুর</option>
                            <option value="পঞ্চগড়">পঞ্চগড়</option>
                            <option value="দিনাজপুর">দিনাজপুর</option>
                            <option value="লালমনিরহাট">লালমনিরহাট</option>
                            <option value="নীলফামারী">নীলফামারী</option>
                            <option value="গাইবান্ধা">গাইবান্ধা</option>
                            <option value="ঠাকুরগাঁও">ঠাকুরগাঁও</option>
                            <option value="রংপুর">রংপুর</option>
                            <option value="কুড়িগ্রাম">কুড়িগ্রাম</option>
                            <option value="শেরপুর">শেরপুর</option>
                            <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                            <option value="জামালপুর">জামালপুর</option>
                            <option value="নেত্রকোণা">নেত্রকোণা</option>
                          </select>
                          {errors.district && (
                            <p className="text-red-500 mt-1">{errors.district.message}</p>
                          )}
                        </div>

                        {/* <div className="mt-[36px] relative w-full">
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
                </div> */}

                        <div className="mt-[36px] relative w-full">

                          <div className="relative">
                            <input
                              id="address"
                              className={`peer rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:border-[transparent] focus:ring-2 focus:ring-[#6967a1] ${errors.address ? "border-red-500" : ""
                                }`}
                              {...register("address")}
                            />
                            <label
                              htmlFor="address"
                              className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${address_line ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                                }`}
                            >
                              Address Line
                            </label>
                          </div>
                          {errors.address && (
                            <p className="text-red-500 mt-1">{errors.address.message}</p>
                          )}
                        </div>


                      </div>

                      {/* Email */}

                      <div className="relative w-full">
                        <div className="mt-[36px]">
                          <label
                            htmlFor="blood_group"
                            className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                          >
                            Blood Group
                          </label>
                          <select
                            id='blood_group'
                            className="rounded-[10px] bg-[#321a69] w-full h-[44px] border border-[#321a69] text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                            {...register("blood_group",)}
                          >
                            <option value="">Select Blood Groups</option>
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
                      </div>

                    </div>
                    <div className="row w-[100%] lg:w-[49%]">
                      <div className="mt-[36px]  relative w-full">
                        <div className="relative">
                          <input
                            id="email"
                            className={`peer rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:border-[transparent] focus:ring-2 focus:ring-[#6967a1] ${errors.email ? "border-red-500" : ""
                              }`}
                            {...register("email")}
                          />
                          <label
                            htmlFor="email"
                            className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${emailValue ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                              }`}
                          >
                            Email
                          </label>
                        </div>
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
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Others</option>
                        </select>
                        {errors.thana && <p className="text-red-500 mt-1">{errors.thana.message}</p>}
                      </div>


                      <div className="mt-[36px]  relative w-full">
                        <label
                          htmlFor="police_unit"
                          className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                        >
                          Select Present Police Unit
                        </label>
                        <select
                          className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                          id='police_unit'
                          {...register("police_unit", { required: "Present Police Unit is required" })}
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
                        {errors.police_unit && <p className="text-red-500 mt-1">{errors.police_unit.message}</p>}
                      </div>


                      <div className="mt-[36px]  relative w-full">
                        <label
                          htmlFor="police_first_sub_unit"
                          className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                        >
                          Select Present First Sub Unit
                        </label>
                        <select
                          className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                          {...register("police_first_sub_unit", { required: "First Sub Unit is required" })}
                        >
                          <option value="">Select</option>
                          <option value="others">অন্যান্য</option>
                          <option data-dvition-id="6" value="ঢাকা রেঞ্জ">ঢাকা রেঞ্জ</option>
                          <option data-dvition-id="3" value="খুলনা রেঞ্জ">খুলনা রেঞ্জ</option>
                          <option data-dvition-id="1" value="চট্টগ্রাম রেঞ্জ">চট্টগ্রাম রেঞ্জ</option>
                          <option data-dvition-id="5" value="সিলেট রেঞ্জ">সিলেট রেঞ্জ</option>
                          <option data-dvition-id="2" value="রাজশাহী রেঞ্জ">রাজশাহী রেঞ্জ</option>
                          <option data-dvition-id="7" value="রংপুর রেঞ্জ">রংপুর রেঞ্জ</option>
                          <option data-dvition-id="4" value="বরিশাল রেঞ্জ">বরিশাল রেঞ্জ</option>
                          <option data-dvition-id="8" value="ময়মনসিংহ রেঞ্জ">ময়মনসিংহ রেঞ্জ</option>
                          <option data-dvition-id="6" value="ঢাকা মেট্রোপলিটন">ঢাকা মেট্রোপলিটন</option>
                          <option data-dvition-id="1" value="চট্টগ্রাম মেট্রোপলিটন">চট্টগ্রাম মেট্রোপলিটন</option>
                          <option data-dvition-id="3" value="খুলনা মেট্রোপলিটন">খুলনা মেট্রোপলিটন</option>
                          <option data-dvition-id="2" value="রাজশাহী মেট্রোপলিটন">রাজশাহী মেট্রোপলিটন</option>
                          <option data-dvition-id="4" value="বরিশাল মেট্রোপলিটন">বরিশাল মেট্রোপলিটন</option>
                          <option data-dvition-id="5" value="সিলেট মেট্রোপলিটন">সিলেট মেট্রোপলিটন</option>
                          <option data-dvition-id="6" value="গাজীপুর মেট্রোপলিটন">গাজীপুর মেট্রোপলিটন</option>
                          <option data-dvition-id="7" value="রংপুর মেট্রোপলিটন">রংপুর মেট্রোপলিটন</option>
                        </select>
                        {errors.police_first_sub_unit && <p className="text-red-500 mt-1">{errors.police_first_sub_unit.message}</p>}
                      </div>

                      {policeFirstSubUnit === "others" && (
                        <div className="mt-[36px] relative w-full">
                          <div className="relative">
                            <input
                              id="police_first_sub_unit_text"
                              className={`rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1] ${errors.police_first_sub_unit_text ? "border-red-500" : ""
                                }`}
                              {...register("police_first_sub_unit_text", {
                                required: "This field is required when 'others' is selected",
                              })}
                            />
                            <label
                              htmlFor="police_first_sub_unit_text"
                              className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${policeFirstSubUnitText ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                                }`}
                            >
                              Type Your Present First Sub Unit
                            </label>
                          </div>
                          {errors.police_first_sub_unit_text && (
                            <span className="text-red-500 text-sm">
                              {errors.police_first_sub_unit_text.message}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-[36px]  relative w-full">
                        <label
                          htmlFor="police_second_sub_unit"
                          className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                        >
                          Select Present Second Sub Unit
                        </label>
                        <select
                          className="rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                          {...register("police_second_sub_unit", { required: "Present Second Sub Unit is required" })}
                        >
                          <option value="">Select</option>
                          <option value="others">অন্যান্য</option>
                          <option value="কুমিল্লা">কুমিল্লা</option>
                          <option value="ফেনী">ফেনী</option>
                          <option value="ব্রাহ্মণবাড়িয়া">ব্রাহ্মণবাড়িয়া</option>
                          <option value="রাঙ্গামাটি">রাঙ্গামাটি</option>
                          <option value="নোয়াখালী">নোয়াখালী</option>
                          <option value="চাঁদপুর">চাঁদপুর</option>
                          <option value="লক্ষ্মীপুর">লক্ষ্মীপুর</option>
                          <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                          <option value="কক্সবাজার">কক্সবাজার</option>
                          <option value="খাগড়াছড়ি">খাগড়াছড়ি</option>
                          <option value="বান্দরবান">বান্দরবান</option>
                          <option value="সিরাজগঞ্জ">সিরাজগঞ্জ</option>
                          <option value="পাবনা">পাবনা</option>
                          <option value="বগুড়া">বগুড়া</option>
                          <option value="রাজশাহী">রাজশাহী</option>
                          <option value="নাটোর">নাটোর</option>
                          <option value="জয়পুরহাট">জয়পুরহাট</option>
                          <option value="চাঁপাইনবাবগঞ্জ">চাঁপাইনবাবগঞ্জ</option>
                          <option value="নওগাঁ">নওগাঁ</option>
                          <option value="যশোর">যশোর</option>
                          <option value="সাতক্ষীরা">সাতক্ষীরা</option>
                          <option value="মেহেরপুর">মেহেরপুর</option>
                          <option value="নড়াইল">নড়াইল</option>
                          <option value="চুয়াডাঙ্গা">চুয়াডাঙ্গা</option>
                          <option value="কুষ্টিয়া">কুষ্টিয়া</option>
                          <option value="মাগুরা">মাগুরা</option>
                          <option value="খুলনা">খুলনা</option>
                          <option value="বাগেরহাট">বাগেরহাট</option>
                          <option value="ঝিনাইদহ">ঝিনাইদহ</option>
                          <option value="ঝালকাঠি">ঝালকাঠি</option>
                          <option value="পটুয়াখালী">পটুয়াখালী</option>
                          <option value="পিরোজপুর">পিরোজপুর</option>
                          <option value="বরিশাল">বরিশাল</option>
                          <option value="ভোলা">ভোলা</option>
                          <option value="বরগুনা">বরগুনা</option>
                          <option value="সিলেট">সিলেট</option>
                          <option value="মৌলভীবাজার">মৌলভীবাজার</option>
                          <option value="হবিগঞ্জ">হবিগঞ্জ</option>
                          <option value="সুনামগঞ্জ">সুনামগঞ্জ</option>
                          <option value="নরসিংদী">নরসিংদী</option>
                          <option value="গাজীপুর">গাজীপুর</option>
                          <option value="শরীয়তপুর">শরীয়তপুর</option>
                          <option value="নারায়ণগঞ্জ">নারায়ণগঞ্জ</option>
                          <option value="টাঙ্গাইল">টাঙ্গাইল</option>
                          <option value="কিশোরগঞ্জ">কিশোরগঞ্জ</option>
                          <option value="মানিকগঞ্জ">মানিকগঞ্জ</option>
                          <option value="ঢাকা">ঢাকা</option>
                          <option value="মুন্সিগঞ্জ">মুন্সিগঞ্জ</option>
                          <option value="রাজবাড়ী">রাজবাড়ী</option>
                          <option value="মাদারীপুর">মাদারীপুর</option>
                          <option value="গোপালগঞ্জ">গোপালগঞ্জ</option>
                          <option value="ফরিদপুর">ফরিদপুর</option>
                          <option value="পঞ্চগড়">পঞ্চগড়</option>
                          <option value="দিনাজপুর">দিনাজপুর</option>
                          <option value="লালমনিরহাট">লালমনিরহাট</option>
                          <option value="নীলফামারী">নীলফামারী</option>
                          <option value="গাইবান্ধা">গাইবান্ধা</option>
                          <option value="ঠাকুরগাঁও">ঠাকুরগাঁও</option>
                          <option value="রংপুর">রংপুর</option>
                          <option value="কুড়িগ্রাম">কুড়িগ্রাম</option>
                          <option value="শেরপুর">শেরপুর</option>
                          <option value="ময়মনসিংহ">ময়মনসিংহ</option>
                          <option value="জামালপুর">জামালপুর</option>
                          <option value="নেত্রকোণা">নেত্রকোণা</option>
                        </select>
                        {errors.police_second_sub_unit && <p className="text-red-500 mt-1">{errors.police_second_sub_unit.message}</p>}
                      </div>

                      {policeSecondSubUnit === "others" && (
                        <div className="mt-[36px] relative w-full">
                          <div className="relative">
                            <input
                              id="police_second_sub_unit_text"
                              className={`rounded-[10px] w-full h-[44px] border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1] ${errors.police_second_sub_unit_text ? "border-red-500" : ""
                                }`}
                              {...register("police_second_sub_unit_text", {
                                required: "This field is required when 'others' is selected",
                              })}
                            />
                            <label
                              htmlFor="police_second_sub_unit_text"
                              className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${policeSecondSubUnitText ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                                }`}
                            >
                              Type Your Second Sub Unit
                            </label>
                          </div>
                          {errors.police_second_sub_unit_text && (
                            <span className="text-red-500 text-sm">
                              {errors.police_second_sub_unit_text.message}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="mt-[36px]  relative w-full">
                        <div className="relative">

                          <input type='text'
                            className="peer rounded-[10px] w-full h-[44px] border border-gray-300 text-[#777777] font-normal px-3 focus:outline-none focus:ring-2 focus:ring-[#6967a1]"
                            {...register("police_third_sub_unit")}
                          />

                          <label
                            htmlFor="police_third_sub_unit"
                            className={`absolute top-1/2 left-[10px] -translate-y-1/2 text-[#777777] pointer-events-none transition-all duration-300 peer-focus:top-0 peer-focus:left-[5px] peer-focus:text-[#6967a1] peer-focus:translate-y-[-103%] ${policeThirdSubUnit ? "top-0 left-0 translate-y-[-103%] text-[#6967a1]" : ""
                              }`}
                          >
                            Select Present Third Sub Unit
                          </label>

                        </div>
                        {errors.police_third_sub_unit && <p className="text-red-500 mt-1">{errors.police_third_sub_unit.message}</p>}
                      </div>
                    </div>



                    {/* Submit Button */}

                    {/* File Upload */}
                    <div className="mt-[36px] w-full  relative flex items-center gap-5">
                      <div className='lg:w-[50%]'>
                        <label
                          htmlFor="profile_image"
                          className="text-[#6967a1] absolute top-0 translate-y-[-103%]"
                        >
                          Profile Image
                        </label>
                        <input
                          type="file"
                          className="block w-full text-gray-900  border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                          {...register("profile_image", {
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


                  </div>
                  <div className='flex items-center justify-center'>
                    <input
                      type="submit"
                      className="mt-[60px] bg-[#6967a1] text-white px-4 py-2 rounded-md hover:bg-[#5a5795] transition duration-300 w-[200px] signup_btn"
                    />
                  </div>
                </form>
              )
        }

      </div>
      {/* <footer className="bg-gray-800 text-gray-400 py-4 text-center text-sm w-full">
        <small>© 2024 Your Website. All rights reserved. Privacy Policy.</small>
      </footer> */}
    </section>
  );
}

export default Registration;
