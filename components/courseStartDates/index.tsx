import { deliveryClient } from "../../deliveryClient/deliveryClient";
import { TermsPage } from "../../models/terms_page";
import { Term } from "../../models/term";
import { Date as SchoolDate } from "../../models/date";
import { Container, Heading, Stack } from "@chakra-ui/react";
import { ContentHead } from "../contentHead";
import { NextPage } from "next";
import { InferCreatorStaticPropsType } from "../inferCreatorPropsType";
import { CourseGroup } from "./courseGroup";

export const createGetCourseStartDatesProps = (
  type: "professional_terms" | "classic_terms"
) => async () => {
  try {
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
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        courseGroups: [],
      },
    };
  }
};

export const CourseStartDates: NextPage<
  InferCreatorStaticPropsType<typeof createGetCourseStartDatesProps>
> = ({ courseGroups }) => (
  <Container>
    <Stack spacing={6}>
      <ContentHead pageName="Termíny" />
      <Heading as="h1" size="lg">
        Termíny
      </Heading>
      <Stack spacing={8}>
        {courseGroups.map((courseGroup) => (
          <CourseGroup key={courseGroup.name} {...courseGroup} />
        ))}
      </Stack>
    </Stack>
  </Container>
);
