'use client'
import { TaskType } from "./temp"
import Comment from "./comment"
import { getProgress } from "./utils/utillities"
import Progress from "./progress"
import Deadline from "./deadline"
import { Button } from "@nextui-org/react"
type Props = { args: TaskType[] }

const tasks = ({ args }: Props) => {
    var finished: TaskType[] = []
    args.map((task) => {
        const percentage = getProgress(task.milestones)
        if (percentage == 100) {
            finished.push(task)
        }
    })

    return (
        <div>
            <div className="grid grid-cols-2 gap-5 my-7 ml-24 mr-7">
                {args.map((task, key) => {
                    const percentage = getProgress(task.milestones)
                    if (percentage != 100) {
                        return (
                            <div key={key} className="bg-[#4B50F7]/10 p-5 rounded-lg ">
                                <div className="flex gap-6">
                                    <div className="w-full">
                                        <div className="py-1 h-16">
                                            <p className="text-xl font-bold">{task.name}</p>
                                            <p className="text-sm text-[#a7a9d2]">Assigned by {task.desc}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <section className="flex gap-2">
                                                <Deadline date={task.deadline} />
                                            </section>
                                        </div>
                                    </div>
                                    <div>
                                        <Progress percent={percentage} />
                                    </div>
                                </div>
                                <div className="grid grid-flow-col justify-stretch gap-5 pt-5">
                                    <Button className="bg-[#6466F1] rounded-lg text-white py-2 text-sm w-full">Mark as Done</Button>
                                    <Button className="bg-[#6466F1] rounded-lg text-white py-2 text-sm w-full">Update Task</Button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>

            {finished.length != 0 ?
                <div>
                    <hr className="w-[75vw]"></hr>
                    <div className=" my-7 ml-24 mr-7">
                        <h2 className="text-3xl font-semibold">Finished Tasks</h2>
                        <div className="grid grid-cols-2 gap-5 my-2">
                            {finished.map((task, key) => {
                                const percentage = getProgress(task.milestones)
                                return (
                                    <div key={key} className="bg-[#4B50F7]/10 p-5 rounded-lg ">
                                        <div className="flex gap-6">
                                            <div className="w-full">
                                                <div className="py-1 h-20">
                                                    <p className="text-xl font-bold">{task.name}</p>
                                                    <p className="text-sm text-[#a7a9d2]">{task.desc}</p>
                                                </div>
                                                <div className="flex justify-between">
                                                    <section className="flex gap-2">
                                                        <Deadline date={task.deadline} />
                                                    </section>
                                                </div>
                                            </div>
                                            <div>
                                                <Progress percent={percentage} />
                                            </div>

                                        </div>
                                        <div className="grid grid-flow-col justify-stretch gap-5 pt-5">
                                            <Button className="bg-[#6466F1] rounded-lg text-white py-2 text-sm w-full">Delete Task</Button>
                                            <Button className="bg-[#6466F1] rounded-lg text-white py-2 text-sm w-full">Update Task</Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                :
                <div></div>


            }
        </div>
    )
}

export default tasks