import { Lesson } from "./lesson";
import { Student } from "./student";


export interface Course {
    id?: number;
    title?: string;
    alt_title?: string;
    description?: string;
    alt_description?: string;
    start_date?: Date;
    end_date?: Date;
    is_free?: boolean;
    price?: number;
    discount?: number;
    discount_type?: "percentage" | "fixed";
    status?: "pending" | "active" | "inactive" | "rejected";
    teacher_id?: number;
    lessons?: Array<Lesson>,
    teacher?: Student,
    rates?: Array<number>,
    rating?: number

}
export interface CourseRespone {
    courses: Course[],
    course: Course
}