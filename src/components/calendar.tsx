import { getThisWeek } from './utils/utillities'
type Props = { date1: Date | null }

const Calendar = ({ date1 }: Props) => {
    const today = new Date()

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const ThisWeek = getThisWeek()
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


    return (
        <div className='mt-4'>
            <h2 className='text-2xl font-semibold px-3 py-4 '>{monthNames[today.getUTCMonth()]}, {today.getUTCFullYear()} </h2>
            <div className='flex gap-3'>
                {ThisWeek.map((day, key) => {
                    var style
                    //bug here. cant show more than ine deadline
                    if (date1 != null) {
                        if (today.getUTCDate() === day.getUTCDate()) {
                            style = `font-semibold bg-[#6466F1] rounded-full text-white w-10 h-10 p-2.5 shadow-lg`
                        }
                        else if (date1.getUTCDate() === day.getUTCDate() && date1.getUTCMonth() === day.getUTCMonth() && date1.getUTCFullYear() === day.getUTCFullYear()) {
                            style = "font-semibold p-2 rounded-full w-8.5 h-8.5 ring-2 ring-[#52DB50]"
                        }
                        else {
                            style = `font-semibold p-2.5`
                        }
                    }
                    return (
                        <div key={key} className='flex flex-col items-center text-sm'>
                            <p className='text-[#A7A9D2]'>{days[day.getUTCDay()]}</p>
                            <div className='my-1'>
                                <p className={style}>{day.getDate()}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Calendar