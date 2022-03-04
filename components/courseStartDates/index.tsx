import { deliveryClient } from "../../deliveryClient/deliveryClient";
import { TermsPage } from "../../deliveryClient/models/terms_page";
import { Term } from "../../deliveryClient/models/term";
import { Date as SchoolDate } from "../../deliveryClient/models/date";
import { NextPage } from "next";
import { InferCreatorStaticPropsType } from "../../utilities/inferCreatorPropsType";
import { CourseGroup } from "./courseGroup";
import { catchEmAllStatic } from "../../utilities/catchEmAllStatic";
import { StackedContentWithHeading } from "../layout/stackedContentWithHeading";

export const createGetCourseStartDatesProps = (
  type: "professional_terms" | "classic_terms",
  pageName: string
) =>
  catchEmAllStatic(async () => {
    const termsPage = await deliveryClient.item<TermsPage>(type).toPromise();

    const courseGroups = termsPage.data.item.elements.terms.linkedItemCodenames
      .map((c) => {
        const term = termsPage.data.linkedItems[c] as Term;
        if (term) {
          return {
            name: term.elements.heading.value,
            note: term.elements.note.value,
            dates: term.elements.dates.linkedItemCodenames
              .map((c) => {
                const date = termsPage.data.linkedItems[c] as SchoolDate;
                if (date) {
                  return {
                    date: new Date(date.elements.date.value).toISOString(),
                    freePlaces: date.elements.free_places.value,
                  };
                }
              })
              .filter((x) => x !== undefined),
          };
        }
      })
      .filter((x) => x !== undefined);

    return {
      props: {
        courseGroups,
        pageName,
      },
    };
  });

export const CourseStartDates: NextPage<
  InferCreatorStaticPropsType<typeof createGetCourseStartDatesProps>
> = ({ courseGroups, pageName }) => (
  <StackedContentWithHeading pageName={pageName}>
    {courseGroups.map((courseGroup) => (
      <CourseGroup key={courseGroup.name} {...courseGroup} />
    ))}
  </StackedContentWithHeading>
);
