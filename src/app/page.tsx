'use client'
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { getSession } from "@/server/auth/auth-user";
import { useEffect } from 'react'
import { useRouter } from "next/navigation";




//========================================================================================================
import { headers } from 'next/headers'
import { DataType, TaskType } from '@/components/temp'
import TasksDisplay from '@/components/tasks'
import NoTasks from '@/components/no-tasks'
import ProgressButton from '@/components/progress-button'
import Image from 'next/image'
import { ToLocalTime, getLeastDeadline } from '@/components/utils/utillities'
import UserBar from "@/components/user-bar"
import SideBar from "@/components/side-bar";
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
    }, [router]);
    const mail = useSelector((state: RootState) => state.auth.email);




    //========================================================================================================
    const Taskies =
    {
        user: "Ajay Sweetson Raja",
        tasks: [
            {
                name: "Innovative Presentation",
                desc: "Dr. Rama Sivakumar",
                creation: "2023-02-01T12:23:40.000Z",
                completion: "",
                deadline: "2023-09-26T12:30:00.000Z",
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
            },
            {
                name: "Project Work",
                desc: "Mr. B. Karthikeyan",
                creation: "2023-06-01T12:23:40.000Z",
                completion: "",
                deadline: "2024-03-12T12:30:00.000Z",
                comments: [
                    "Try with Concenterated Hydrochloric Acid",
                    "Check Movements"
                ],
                milestones: {
                    "part1": true,
                    "part2": true,
                    "part3": true,
                    "part4": true,
                    "part5": true,
                    "part6": false
                },
                reminder: false
            },
            {
                name: "Getting Signature in Lab Manual",
                desc: "Dr. M.P.Anuradha",
                creation: "2023-02-01T12:23:40.000Z",
                completion: "",
                deadline: "2024-01-21T12:30:00.000Z",
                comments: [
                    "Try with Concenterated Hydrochloric Acid",
                    "Check Movements"
                ],
                milestones: {
                    "part1": true,
                    "part2": true,
                    "part3": false,
                    "part4": false,
                    "part5": false,
                    "part6": false
                },
                reminder: false
            },
            {
                name: "Scrap Book Creation",
                desc: "Mrs. Arthy Priya",
                creation: "2023-02-01T12:23:40.000Z",
                completion: "",
                deadline: "2023-10-16T12:30:00.000Z",
                comments: [
                    "Try with Concenterated Hydrochloric Acid",
                    "Check Movements"
                ],
                milestones: {
                    "part1": true,
                    "part2": true,
                    "part3": true,
                    "part4": true,
                },
                reminder: false
            },
            {
                name: "Assignment Submission",
                desc: "Mrs. Bhuvaneshwari",
                creation: "2023-09-01T12:23:40.000Z",
                completion: "",
                deadline: "2023-11-27T12:30:00.000Z",
                comments: [
                    "Try with Concenterated Hydrochloric Acid",
                    "Check Movements"
                ],
                milestones: {
                    "part1": true,
                    "part2": true,
                    "part3": true,
                    "part4": true,
                    "part5": false,
                    "part6": false
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
            <div className='w-[74vw]'>
                <h1 className='bg-[#f7f9fa] px-24 py-5 leading-8 w-[74vw] flex justify-between'>
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
