import {
  CourseStartDates,
  createGetServerSideProps,
} from "../../components/courseStartDates";

export default CourseStartDates;

export const getServerSideProps = createGetServerSideProps(
  "professional_terms"
);
