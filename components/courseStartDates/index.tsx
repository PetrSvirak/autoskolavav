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

    const courseGroups = termsPage.item.terms.linkedItemCodenames
      .map((c) => {
        const term = termsPage.linkedItems[c] as Term;
        if (term) {
          return {
            name: term.heading.value,
            note: term.note.value,
            dates: term.dates.linkedItemCodenames
              .map((c) => {
                const date = termsPage.linkedItems[c] as SchoolDate;
                if (date) {
                  return {
                    date: date.date.value.toISOString(),
                    freePlaces: date.freePlaces.value,
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
