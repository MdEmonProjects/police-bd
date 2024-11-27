
function UserDetailsCard({ name,
    designation,
    address,
    bp_no,
    email,
    gender,
    id,
    phone_number,
    profile_image,
    police_unit,
    police_first_sub_unit,
    police_second_sub_unit,
    police_third_sub_unit }) {


    return (
        <div className="card-container w-[950px] max-w-full bg-[#231E39] text-[#B3B8CD] py-[60px] font-inter mx-auto mt-[50px] rounded-lg flex px-[50px] justify-center gap-[80px] items-center">

            <div className="capitalize">
                <img src={profile_image} alt={`${name} ${id}`} className="h-[100px] w-[100px] rounded-full mx-auto mb-[10px] object-cover" />
                <h3 className="font-bold text-[28px] text-center">{name}</h3>
                <div className="">
                    <h6 className="text-[14px] font-normal">{address}</h6>

                </div>
            </div>
            <div>
                <p className="text-[14px] font-normal capitalize">{designation}</p>
                <table className="border border-[#777777] text-start mx-auto mt-[20px]">
                    <tbody>
                        <tr >
                            <td className="border py-[6px] px-[6px] text-[16px]">Number:</td>
                            <td className="border py-[6px] px-[6px] text-[16px]">{phone_number}</td>
                        </tr>

                        <tr >
                            <td className="border py-[6px] px-[6px] text-[16px]">Bp No.:</td>
                            <td className="border py-[6px] px-[6px] text-[16px]">{bp_no}</td>
                        </tr>
                        <tr >
                            <td className="border py-[6px] px-[6px] text-[16px]">Email:</td>
                            <td className="border py-[6px] px-[6px] text-[16px]">{email}</td>
                        </tr>
                        <tr >
                            <td className="border py-[6px] px-[6px] text-[16px]">Gender:</td>
                            <td className="border py-[6px] px-[6px] text-[16px]">{gender}</td>
                        </tr>
                        <tr >
                            <td className="border py-[6px] px-[6px] text-[16px]">Police Unit:</td>
                            <td className="border py-[6px] px-[6px] text-[16px]">{police_unit}</td>
                        </tr>
                        <tr >
                            <td className="border py-[6px] px-[6px] text-[16px]">Police First Sub Unit:</td>
                            <td className="border py-[6px] px-[6px] text-[16px]">{police_first_sub_unit}</td>
                        </tr>
                        <tr >
                            <td className="border py-[6px] px-[6px] text-[16px]">Police Second Sub Unit:</td>
                            <td className="border py-[6px] px-[6px] text-[16px]">{police_second_sub_unit}</td>
                        </tr>
                        <tr >
                            <td className="border py-[6px] px-[6px] text-[16px]">Police Third Sub Unit:</td>
                            <td className="border py-[6px] px-[6px] text-[16px]">{police_third_sub_unit}</td>
                        </tr>
                    </tbody>

                </table>
            </div>



        </div>

    );
}

export default UserDetailsCard;