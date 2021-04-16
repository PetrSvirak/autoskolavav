import React from "react";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { TermsPage } from "../models/terms_page";
import { GetServerSidePropsResult } from "next";
import { Term } from "../models/term";
import { Date as SchoolDate } from "../models/date";
import {
  Box,
  Container,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ContentHead } from "./contentHead";

type CourseDateType = {
  date: string; // ISO string
  freePlaces: number;
};

type CourseGroupType = {
  dates: CourseDateType[];
  name: string;
  note: string;
};

type Props = {
  courseGroups: CourseGroupType[];
};

const formatDate = (date: Date) =>
  `${date.getDate()}. ${date.getMonth() + 1}. v ${date.getHours()} h`;

const DatesTable: React.FC<{ dates: CourseDateType[] }> = ({ dates }) => (
  <Table size="sm" variant="striped">
    <Thead>
      <Tr>
        <Th isNumeric>Datum</Th>
        <Th>Volná místa</Th>
      </Tr>
    </Thead>
    <Tbody>
      {dates.map(({ date, freePlaces }) => (
        <Tr key={date}>
          <Td isNumeric>
            {formatDate(new Date(Date.parse(date.replace("Z", ""))))}
          </Td>
          <Td>
            <Text color={freePlaces > 0 ? "green" : "red"}>{freePlaces}</Text>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);

const CourseGroup: React.FC<CourseGroupType> = ({ dates, name, note }) => (
  <Box key={name}>
    <Stack spacing={2}>
      <Heading as="h2" size="sm">
        {name}
      </Heading>
      {dates.length > 0 ? <DatesTable dates={dates} /> : <Text>{note}</Text>}
    </Stack>
  </Box>
);

export const CourseStartDates: React.FC<Props> = ({ courseGroups }) => (
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

export const createGetServerSideProps = (
  type: "professional_terms" | "classic_terms"
) => async (): Promise<GetServerSidePropsResult<Props>> => {
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
