import React from 'react'

const Sidebar = () => {
    return (
        <>
            <div className="w-fit h-screen px-5 pt-5 pb-[532px] relative bg-white shadow flex-col justify-start items-center inline-flex">
                <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-slate-400 text-[11px] font-semibold font-['Open Sans'] uppercase leading-none">Track</div>
                    <div className="h-11 pl-2.5 pr-[90px] py-2.5 bg-white hover:bg-slate-50 rounded justify-start items-start gap-[7px] inline-flex">
                        <div className="w-6 h-6 relative flex-col justify-start items-start flex">
                            <div className="w-4 h-5 relative">
                            </div>
                        </div>
                        <div className="text-sky-900 text-[15px] font-semibold font-['Open Sans'] leading-snug cursor-pointer hover:text-indigo-600">Attendance Sheet</div>
                    </div>
                    <div className="text-slate-400 text-[11px] font-semibold font-['Open Sans'] uppercase leading-none">Analyze</div>
                    <div className="pl-[9px] pr-[139px] pt-[10.75px] pb-[7px] hover:bg-slate-50 rounded justify-start items-start gap-1.5 inline-flex">
                        <div className="w-[26px] h-[26px] relative flex-col justify-start items-start flex" />
                        <div className="text-sky-900 text-[15px] font-semibold font-['Open Sans'] leading-snug hover:text-indigo-600 text-[15px] font-semibold font-['Open Sans'] leading-snug cursor-pointer">Dashboard</div>
                    </div>
                    <div className="w-[260px] pl-2 pr-[169px] pt-2 pb-2.5 bg-white hover:bg-slate-50 rounded justify-start items-end gap-[7px] inline-flex">
                        <div className="w-[26px] h-[26px] relative flex-col justify-start items-start flex" />
                        <div className="text-sky-900 text-[15px] font-semibold font-['Open Sans'] leading-snug cursor-pointer hover:text-indigo-600">Report</div>
                    </div>
                    <div className="text-slate-400 text-[11px] font-semibold font-['Open Sans'] uppercase leading-none">Manage</div>
                    <div className="w-[260px] h-11 relative bg-white hover:bg-slate-50 rounded">
                        <div className="w-[16.20px] h-4 left-[15px] top-[14px] absolute text-slate-400 text-base font-normal font-['Inter'] leading-none"></div>
                        <div className="left-[41px] top-[10.75px] absolute text-sky-900 text-[15px] font-semibold font-['Open Sans'] leading-snug cursor-pointer hover:text-indigo-600">Student</div>
                        <div className="w-[26px] h-[26px] left-[8px] top-[9px] absolute" />
                    </div>
                    <div className="text-slate-400 text-[11px] font-semibold font-['Open Sans'] uppercase leading-none">Chal chla nikal</div>
                    <div className="w-[260px] pl-[11px] pr-[168px] pt-[10.75px] pb-[9.25px] bg-white hover:bg-slate-50text-indigo-600  rounded justify-start items-end gap-[11px] inline-flex">
                        <div className="w-[19px] h-[19px] relative flex-col justify-start items-start flex" />
                        <div className="text-sky-900 text-[15px] font-semibold font-['Open Sans'] leading-snug cursor-pointer ">Logout</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar