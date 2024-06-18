import { Question } from "./question";

export interface Exam {
    title?: string;
    alt_title?: string;
    start_date?: Date;
    end_date?: Date;
    duration?: number;
    // lesson_id: number; // Uncomment if needed
    course_id?: number;
    class_id?: number;
    teacher_id?: number;
    exam_type?: {
        type: 'mcq';
        // values?: string[]; // Uncomment if needed
        defaultValue: 'mcq';
    };
    questions?: Question[]

}
export interface examRespone {
    exams: Exam[],
    exam: Exam
}
