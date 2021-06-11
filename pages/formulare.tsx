import { NextPage } from "next";
import {
  Box,
  Container,
  Heading,
  Link,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { Forms as FormsModel } from "../deliveryClient/models/forms";
import { Form as FormModel } from "../deliveryClient/models/form";
import { catchEmAllStatic } from "../utilities/catchEmAllStatic";
import { InferCreatorStaticPropsType } from "../utilities/inferCreatorPropsType";
import { ContentHead } from "../components/contentHead";

type Form = {
  readonly text: string;
  readonly src: string[];
};

const convertFormModelToForm = (form: FormModel): Form => ({
  text: form.text.value,
  src: form.forms.value.map((f) => f.url),
});

export const getStaticProps = catchEmAllStatic(async () => {
  const formsItem = await deliveryClient.item<FormsModel>("forms").toPromise();

  const forms = formsItem.item.forms.linkedItemCodenames.map(
    (codename) => formsItem.linkedItems[codename] as FormModel
  );

  const ordinaryDriversForms = forms
    .filter((form) => form.drivers.value[0].codename === "ordinary_drivers")
    .map(convertFormModelToForm);

  const professionalDriversForms = forms
    .filter((form) => form.drivers.value[0].codename === "professional_drivers")
    .map(convertFormModelToForm);

  return {
    props: {
      ordinaryDriversForms,
      professionalDriversForms,
    },
  };
});

const getFileExtension = (src: string) =>
  src.toUpperCase().split(/^.*\.(DOCX|DOC|PDF)$/)[1];

const renderForms = (forms: Form[]) => (
  <UnorderedList spacing={3} listStylePosition="inside">
    {forms.map((form, index) => (
      <ListItem key={index}>
        {form.text}
        {form.src.map((s, index) => (
          <>
             <Link href={s}>[{getFileExtension(s)}]</Link>
          </>
        ))}
      </ListItem>
    ))}
  </UnorderedList>
);

const Forms: NextPage<InferCreatorStaticPropsType<typeof getStaticProps>> = ({
  ordinaryDriversForms,
  professionalDriversForms,
}) => (
  <Container>
    <ContentHead pageName="Formuláře" />
    <Heading as="h1" size="lg">
      Formuláře
    </Heading>
    <Stack spacing={8} mt={4}>
      <Box>
        <Heading as="h2" size="sm">
          Běžní řidiči:
        </Heading>
        {renderForms(ordinaryDriversForms)}
      </Box>
      <Box>
        <Heading as="h2" size="sm">
          Profesionální řidiči:
        </Heading>
        {renderForms(professionalDriversForms)}
      </Box>
    </Stack>
  </Container>
);

export default Forms;
