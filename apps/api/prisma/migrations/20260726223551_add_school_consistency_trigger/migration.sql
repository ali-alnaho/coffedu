-- ============================================
-- Function: check_enrollment_school_consistency
-- ============================================


CREATE FUNCTION  check_enrollment_school_consistency()
RETURNS TRIGGER AS $$
DECLARE 
    student_school_id TEXT;
    academic_school_id TEXT;
    grade_school_id TEXT;

BEGIN
    SELECT "schoolId" INTO student_school_id
    FROM "Student"
    WHERE id = NEW."studentId";

    SELECT "schoolId" INTO academic_school_id
    FROM "AcademicYear"
    WHERE id = NEW."academicId";

    SELECT "schoolId" INTO grade_school_id
    FROM "GradeLevel"
    WHERE id = NEW."gradeId";

    IF student_school_id != NEW."schoolId" 
    OR academic_school_id != NEW."schoolId" 
    OR grade_school_id != NEW."schoolId"  THEN 
        RAISE EXCEPTION 'School mismatch';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ============================================
-- Function: check_grade_school_consistency
-- ============================================

CREATE FUNCTION check_grade_school_consistency()
RETURNS TRIGGER AS $$
DECLARE
    subject_school_id TEXT;
    student_enrollment_school_id TEXT;
BEGIN

    SELECT "schoolId" INTO subject_school_id
    FROM "Subject" 
    WHERE id = NEW."subjectId";

    SELECT "schoolId" INTO student_enrollment_school_id
    FROM "StudentEnrollment" 
    WHERE id = NEW."studentEnrollmentId";

    IF subject_school_id != NEW."schoolId"
    OR student_enrollment_school_id != NEW."schoolId" THEN
        RAISE EXCEPTION 'School mismatch';
    END IF;

    RETURN NEW;

END;
$$ LANGUAGE plpgsql;



-- ============================================
-- Trigger Binding with "StudentEnrollment"
-- ============================================

CREATE TRIGGER trg_check_enrollment_school
BEFORE INSERT OR UPDATE ON "StudentEnrollment"
FOR EACH ROW
EXECUTE FUNCTION check_enrollment_school_consistency();

-- ============================================
-- Trigger Binding with "EnrollmentSubjectGrade"
-- ============================================

CREATE TRIGGER trg_check_grade_school
BEFORE INSERT OR UPDATE ON "EnrollmentSubjectGrade"
FOR EACH ROW
EXECUTE FUNCTION check_grade_school_consistency();