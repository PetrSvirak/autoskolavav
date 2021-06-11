import {
  CourseStartDates,
  createGetCourseStartDatesProps,
} from "../../components/courseStartDates";

export default CourseStartDates;

export const getStaticProps = createGetCourseStartDatesProps(
  "professional_terms",
  "Termíny profesních kurzů"
);
