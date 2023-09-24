'use client'
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getSession } from "@/server/auth/auth-user";
import { useEffect } from 'react'
import { useRouter } from "next/navigation";




//========================================================================================================
import { headers } from 'next/headers'
import { DataType, TaskType } from '@/components/temp'
import TasksDisplay from '@/components/Tasks'
import NoTasks from '@/components/NoTasks'
import ProgressButton from '@/components/ProgressButton'
import Image from 'next/image'
import { ToLocalTime, getLeastDeadline } from '@/components/utils/utillities'
import UserBar from "@/components/UserBar"
import SideBar from "@/components/SideBar";
//========================================================================================================





export default function Home() {
    const router = useRouter();
    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            console.log("sessionData", sessionData.status)
            if (sessionData.status == false) {
                router.push('/login');
            }
        };
        fetchSession();
    }, []);
    const mail = useSelector((state: RootState) => state.auth.email);




    //========================================================================================================
    const Taskies =
    {
        user: "Ajay Sweetson Raja",
        tasks: [
            {
                name: "To check the Maggots",
                desc: "Check the Development of Maggots in -1 degree Celcius",
                creation: "2023-02-01T12:23:40.000Z",
                completion: "",
                deadline: "2023-12-25T12:30:00.000Z",
                comments: [
                    "Try with Concenterated Hydrochloric Acid",
                    "Check Movements"
                ],
                milestones: {
                    "part1": true,
                    "part2": true,
                    "part3": true,
                    "part5": false
                },
                reminder: false
            }
        ]
    }

    const User = Taskies.user
    const Tasks: any = Taskies.tasks
    const date = new Date();
    const today = ToLocalTime(date)
    const Hour = today.getUTCHours()
    var greeting: string
    var deadline = getLeastDeadline(Tasks)
    console.log(deadline)

    if (Hour >= 0 && Hour < 12) {
        greeting = "Good Morning";
    }
    else if (Hour > 12 && Hour < 17) {
        greeting = "Good Afternoon";
    }
    else {
        greeting = "Good Evening";
    }
    //========================================================================================================




    return (




        //========================================================================================================
        <div className='flex'>
            <div>
                <SideBar />
            </div>
            <div className='w-[70vw]'>
                <h1 className='bg-[#f7f9fa] px-7 py-5 leading-8 w-[70vw] flex justify-between'>
                    <div>
                        <span className='text-4xl font-bold'>{greeting}!</span><br></br>
                        <span className='text-md font-medium text-[#a7a9d2]'>Here is your List of Tasks <span className='text-[#4B50F7]'>{User}</span></span>
                    </div>
                    <div className='flex gap-5'>
                        {/* <TaskForm /> */}
                        <ProgressButton tasks={Tasks} />
                    </div>
                </h1>
                {Tasks.length !== 0 ?
                    <div className=''>
                        <TasksDisplay args={Tasks} />
                    </div> :
                    <div><NoTasks /></div>}
            </div>
            <div>
                {deadline != undefined
                    ?
                    <UserBar date={deadline} />
                    :
                    <UserBar date={null} />
                }
            </div>
        </div>
        //========================================================================================================




    )
}
