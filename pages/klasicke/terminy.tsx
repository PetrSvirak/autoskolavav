import {
  CourseStartDates,
  createGetCourseStartDatesProps,
} from "../../components/courseStartDates";

export default CourseStartDates;

export const getStaticProps = createGetCourseStartDatesProps(
  "classic_terms",
  "Termíny klasických kurzů"
);
