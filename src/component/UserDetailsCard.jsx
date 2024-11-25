
function UserDetailsCard() {


    return (
        <div className="card-container w-[350px] bg-[#231E39] text-[#B3B8CD] py-[60px] font-inter mx-auto mt-[50px] rounded-lg">

            <img src="rahul.jpg" alt="user" className="h-[150px] w-[150px] rounded-full mx-auto mb-[10px]" />
            <h3 className="font-bold text-[28px] text-center">Rahul Yaduvanshi</h3>
            <h6>Nodia, U.P.</h6>
            <p className="text-[20px] font-medium mt-[20px]">User interface</p>
            <table className="border border-[#777777] text-start mx-auto mt-[20px]">
                <tbody>
                    <tr >
                        <td className="border py-[6px] px-[6px] text-[16px]">Number:</td>
                        <td className="border py-[6px] px-[6px] text-[16px]">+8801876362586</td>
                    </tr>

                    <tr >
                        <td className="border py-[6px] px-[6px] text-[16px]">Blood Group:</td>
                        <td className="border py-[6px] px-[6px] text-[16px]">A+</td>
                    </tr>
                </tbody>

            </table>


        </div>

    );
}

export default UserDetailsCard;