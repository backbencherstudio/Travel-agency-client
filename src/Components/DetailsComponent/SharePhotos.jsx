export default function SharePhotos({ img, title,handleSharePhoto }) {
    const shareableLinks = [
        [<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path d="M12.5563 11.7183C11.514 12.7606 9.82407 12.7606 8.78174 11.7183C7.73942 10.6759 7.73942 8.98597 8.78174 7.94364L11.1409 5.5845C12.1357 4.58961 13.7206 4.54433 14.7692 5.44866M14.4437 2.28175C15.486 1.23942 17.1759 1.23942 18.2183 2.28175C19.2606 3.32408 19.2606 5.01403 18.2183 6.05636L15.8591 8.4155C14.8643 9.41039 13.2794 9.45567 12.2308 8.55134" stroke="#0E457D" stroke-width="1.5" stroke-linecap="round" />
            <path d="M19 11.5C19 15.2712 19 17.1569 17.8284 18.3284C16.6569 19.5 14.7712 19.5 11 19.5H9C5.22876 19.5 3.34315 19.5 2.17157 18.3284C1 17.1569 1 15.2712 1 11.5V9.5C1 5.72876 1 3.84315 2.17157 2.67157C3.34315 1.5 5.22876 1.5 9 1.5" stroke="#0E457D" stroke-width="1.5" stroke-linecap="round" />
        </svg>, "Copy Link"],
        [<svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none">
            <path d="M6 6L8.94202 7.73943C10.6572 8.75352 11.3428 8.75352 13.058 7.73943L16 6" stroke="#0E457D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1.01577 10.9756C1.08114 14.0412 1.11383 15.5739 2.24496 16.7094C3.37608 17.8448 4.95033 17.8843 8.09883 17.9634C10.0393 18.0122 11.9607 18.0122 13.9012 17.9634C17.0497 17.8843 18.6239 17.8448 19.7551 16.7094C20.8862 15.5739 20.9189 14.0412 20.9842 10.9756C21.0053 9.98994 21.0053 9.01008 20.9842 8.02439C20.9189 4.95886 20.8862 3.42609 19.7551 2.29066C18.6239 1.15523 17.0497 1.11568 13.9012 1.03657C11.9607 0.987813 10.0393 0.98781 8.09882 1.03656C4.95033 1.11566 3.37608 1.15521 2.24495 2.29065C1.11382 3.42608 1.08114 4.95885 1.01576 8.02438C0.994745 9.01007 0.994745 9.98994 1.01577 10.9756Z" stroke="#0E457D" stroke-width="1.5" stroke-linejoin="round" />
        </svg>, "Email"],
        [<svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
            <path d="M13.1706 19.3905C17.3536 19.1125 20.6856 15.7332 20.9598 11.4909C21.0134 10.6607 21.0134 9.80093 20.9598 8.97072C20.6856 4.72838 17.3536 1.34913 13.1706 1.07107C11.7435 0.976212 10.2536 0.976405 8.8294 1.07107C4.64639 1.34913 1.31441 4.72838 1.04024 8.97072C0.986587 9.80093 0.986587 10.6607 1.04024 11.4909C1.1401 13.036 1.82343 14.4666 2.62791 15.6746C3.09501 16.5203 2.78674 17.5758 2.30021 18.4978C1.94941 19.1626 1.77401 19.495 1.91484 19.7351C2.05568 19.9752 2.37026 19.9829 2.99943 19.9982C4.24367 20.0285 5.08268 19.6757 5.74868 19.1846C6.1264 18.9061 6.31527 18.7668 6.44544 18.7508C6.5756 18.7348 6.83177 18.8403 7.34401 19.0513C7.8044 19.2409 8.33896 19.3579 8.8294 19.3905C10.2536 19.4852 11.7435 19.4854 13.1706 19.3905Z" stroke="#0E457D" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M10.9955 10.5H11.0045M14.991 10.5H15M7 10.5H7.00897" stroke="#0E457D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>, "Messages"],
        [<svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
            <path d="M11 21.5C16.5228 21.5 21 17.0228 21 11.5C21 5.97715 16.5228 1.5 11 1.5C5.47715 1.5 1 5.97715 1 11.5C1 12.8789 1.27907 14.1926 1.78382 15.3877C2.06278 16.0481 2.20226 16.3784 2.21953 16.628C2.2368 16.8776 2.16334 17.1521 2.01642 17.7012L1 21.5L4.79877 20.4836C5.34788 20.3367 5.62244 20.2632 5.87202 20.2805C6.12161 20.2977 6.45185 20.4372 7.11235 20.7162C8.30745 21.2209 9.62113 21.5 11 21.5Z" stroke="#0E457D" stroke-width="1.5" stroke-linejoin="round" />
            <path d="M7.58815 11.8773L8.45909 10.7956C8.82616 10.3397 9.27994 9.91529 9.31546 9.30826C9.32444 9.15494 9.21656 8.46657 9.0008 7.08986C8.91601 6.54881 8.41086 6.5 7.97332 6.5C7.40314 6.5 7.11805 6.5 6.83495 6.62931C6.47714 6.79275 6.10979 7.25231 6.02917 7.63733C5.96539 7.94196 6.01279 8.15187 6.10759 8.57169C6.51023 10.3548 7.45481 12.1158 8.91948 13.5805C10.3842 15.0452 12.1452 15.9898 13.9283 16.3924C14.3481 16.4872 14.558 16.5346 14.8627 16.4708C15.2477 16.3902 15.7072 16.0229 15.8707 15.665C16 15.3819 16 15.0969 16 14.5267C16 14.0891 15.9512 13.584 15.4101 13.4992C14.0334 13.2834 13.3451 13.1756 13.1917 13.1845C12.5847 13.2201 12.1603 13.6738 11.7044 14.0409L10.6227 14.9118" stroke="#0E457D" stroke-width="1.5" />
        </svg>, "WhatsApp"],
        [<svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
            <path d="M1.5 10.5C1.5 6.02166 1.5 3.78249 2.89124 2.39124C4.28249 1 6.52166 1 11 1C15.4783 1 17.7175 1 19.1088 2.39124C20.5 3.78249 20.5 6.02166 20.5 10.5C20.5 14.9783 20.5 17.2175 19.1088 18.6088C17.7175 20 15.4783 20 11 20C6.52166 20 4.28249 20 2.89124 18.6088C1.5 17.2175 1.5 14.9783 1.5 10.5Z" stroke="#0E457D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 15.5L10.1935 11.3065M16 5.5L11.8065 9.69355M11.8065 9.69355L8.77778 5.5H6L10.1935 11.3065M11.8065 9.69355L16 15.5H13.2222L10.1935 11.3065" stroke="#0E457D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>, "X"],
        [<svg xmlns="http://www.w3.org/2000/svg" width="16" height="23" viewBox="0 0 16 23" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.18182 9.83333C1.20406 9.83333 1 10.0252 1 10.9444V12.6111C1 13.5304 1.20406 13.7222 2.18182 13.7222H4.54545V20.3889C4.54545 21.3081 4.74951 21.5 5.72727 21.5H8.09091C9.06867 21.5 9.27273 21.3081 9.27273 20.3889V13.7222H11.9267C12.6683 13.7222 12.8594 13.5867 13.0631 12.9164L13.5696 11.2497C13.9185 10.1014 13.7035 9.83333 12.4332 9.83333H9.27273V7.05556C9.27273 6.44191 9.80184 5.94444 10.4545 5.94444H13.8182C14.7959 5.94444 15 5.75259 15 4.83333V2.61111C15 1.69185 14.7959 1.5 13.8182 1.5H10.4545C7.19104 1.5 4.54545 3.98731 4.54545 7.05556V9.83333H2.18182Z" stroke="#0E457D" stroke-width="1.5" stroke-linejoin="round" />
        </svg>, "Facebook"],
        [<svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
            <path d="M6 13.5L7.9954 11.1055C8.63153 10.3422 8.9496 9.96048 9.33333 9.96048C9.71707 9.96048 10.0351 10.3422 10.6713 11.1055L11.3287 11.8945C11.9649 12.6578 12.2829 13.0395 12.6667 13.0395C13.0504 13.0395 13.3685 12.6578 14.0046 11.8945L16 9.5" stroke="#0E457D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11 21.5C16.5228 21.5 21 17.0228 21 11.5C21 5.97715 16.5228 1.5 11 1.5C5.47715 1.5 1 5.97715 1 11.5C1 12.8789 1.27907 14.1926 1.78382 15.3877C2.06278 16.0481 2.20226 16.3784 2.21953 16.628C2.2368 16.8776 2.16334 17.1521 2.01642 17.7012L1 21.5L4.79877 20.4836C5.34788 20.3367 5.62244 20.2632 5.87202 20.2805C6.12161 20.2977 6.45185 20.4372 7.11235 20.7162C8.30745 21.2209 9.62113 21.5 11 21.5Z" stroke="#0E457D" stroke-width="1.5" stroke-linejoin="round" />
        </svg>, "Messenger"],
        [<svg xmlns="http://www.w3.org/2000/svg" width="16" height="3" viewBox="0 0 16 3" fill="none">
            <path d="M7.9959 1.5H8.00488" stroke="#0E457D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.9998 1.5H14.0088" stroke="#0E457D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1.99981 1.5H2.00879" stroke="#0E457D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>, "More options"]
    ]
    return (
        <div className="bg-white px-4 sm:px-6 py-6 rounded-xl w-[650px] flex flex-col gap-3 relative">
            <div className="flex flex-col gap-5 items-center">
                <div>
                    <h3 className="text-[#0F1416] text-[24px] font-semibold text-center">Share this place</h3>
                    <p className="text-[14px] text-[#58677D] text-center">Thank you for your booking Here are your collection details</p>
                </div>
                <div className="w-[170px] h-[120px]">
                    <img src={img} alt="Image" className="w-full h-full object-cover rounded-xl" />
                </div>
                <h3 className="text-[24px] font-semibold text-[#0F1416]">
                    {title}
                </h3>
            </div>
            <div className="flex flex-wrap">
                {
                    shareableLinks.map(link => <div className="w-[250px] sm:w-[280px] flex gap-2 items-center m-2 border border-[#ECEFF3] p-2 rounded-md cursor-pointer">
                        {link[0]}
                        <h3>{link[1]}</h3>
                    </div>)
                }
            </div>
            <div className="absolute top-4 left-4 cursor-pointer" onClick={() => { handleSharePhoto() }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M15 1L1 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 1L15 15" stroke="#0F1416" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    )
}