type CourseDateType = {
  date: string; // ISO string
  freePlaces: number;
};

type CourseGroupType = {
  dates: CourseDateType[];
  name: string;
  note: string;
};
