import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import { formatDate } from '../../../services/formatDate';
import { FaRupeeSign } from "react-icons/fa";

export default function PurchaseHistory() {
    // const { user } = useSelector((state) => state.profile);
    // const { courses } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrollrdCourses = async () => {
        try {
            const res = await getUserEnrolledCourses(token);
            setEnrolledCourses(res);

        } catch (error) {
            console.log("Could not Buy any course yet");
        }
    }

    useEffect(() => {
        getEnrollrdCourses();
    }, [])

    return (
        <div className='text-white'>
            <h1>Purchase History</h1>
            {
                !enrolledCourses ? (
                    <div>You have not buy any course yet.</div>
                ) :
                    (
                        <div className="my-8 text-richblack-5 ">
                            {/* Headings */}
                            <div className="flex rounded-t-lg bg-richblack-500 justify-between">
                                <p className="w-[45%] px-5 py-3">Course Name</p>
                                <p className="w-1/4 px-2 py-3">Course Price</p>
                                <p className="flex-1 px-2 py-3">Payment Date</p>
                            </div>
                            {

                                enrolledCourses.map((course, i, arr) => (

                                    <div className={`flex  items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`} key={i} >

                                        <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"

                                            onClick={() => { navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`) }}

                                        >
                                            <img src={course.thumbnail} alt="course_img" className="h-14 w-14 rounded-lg object-cover" />

                                            <div className="flex max-w-xs flex-col gap-2">

                                                <p className="font-semibold">{course.courseName}</p>

                                                <p className="text-xs text-richblack-300">
                                                    {course.courseDescription.length > 50 ? `${course.courseDescription.slice(0, 50)}...` : course.courseDescription}
                                                </p>
                                            </div>
                                        </div>


                                        <div className="w-1/4 px-2 py-3 flex  items-center"><FaRupeeSign /> {course.price}</div>
                                        <div className="w-1/4 px-2 py-3"> {formatDate(course.enrollmentDate)}</div>

                                    </div>
                                ))
                            }
                        </div>

                    )

            }

        </div>
    )
}

