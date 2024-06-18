export interface ExamStudent {
    exam_id?: number;
    degree?: number;
    student_id?: number;
    teacher_id?: number;
    status?: 'completed' | 'paused' | 'started';
    started_at?: Date;
    ended_at?: Date | null;
}
export interface ExamStudentRespone {
    examStudents: ExamStudent[],
    examStudent: ExamStudent
}
