import { NextPage } from "next";
import { Link, ListItem, Stack } from "@chakra-ui/react";
import { ListType, UnorderedList } from "../components/List";
import { deliveryClient } from "../deliveryClient/deliveryClient";
import { Forms as FormsModel } from "../deliveryClient/models/forms";
import { Form as FormModel } from "../deliveryClient/models/form";
import { catchEmAllStatic } from "../utilities/catchEmAllStatic";
import { InferCreatorStaticPropsType } from "../utilities/inferCreatorPropsType";
import { StackedContentWithHeading } from "../components/layout/stackedContentWithHeading";
import { Heading, HeadingSize, HeadingType } from "../components/Heading";

type Form = {
  readonly text: string;
  readonly src: string[];
};

const convertFormModelToForm = (form: FormModel): Form => ({
  text: form.elements.text.value,
  src: form.elements.forms.value.map((f) => f.url),
});

export const getStaticProps = catchEmAllStatic(async () => {
  const formsItem = await deliveryClient.item<FormsModel>("forms").toPromise();

  const forms = formsItem.data.item.elements.forms.linkedItemCodenames.map(
    (codename) => formsItem.data.linkedItems[codename] as FormModel
  );

  const ordinaryDriversForms = forms
    .filter((form) => form.elements.drivers.value[0].codename === "ordinary_drivers")
    .map(convertFormModelToForm);

  const professionalDriversForms = forms
    .filter((form) => form.elements.drivers.value[0].codename === "professional_drivers")
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
  <UnorderedList type={ListType.StandAlone}>
    {forms.map((form, index) => (
      <ListItem key={index}>
        {form.text}
        {form.src.map((s, index) => (
          <Link key={index} href={s}>
            [{getFileExtension(s)}]
          </Link>
        ))}
      </ListItem>
    ))}
  </UnorderedList>
);

const Forms: NextPage<InferCreatorStaticPropsType<typeof getStaticProps>> = ({
  ordinaryDriversForms,
  professionalDriversForms,
}) => (
  <StackedContentWithHeading pageName="Formul????e">
    <Stack spacing={4}>
      <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
        B????n?? ??idi??i
      </Heading>
      {renderForms(ordinaryDriversForms)}
    </Stack>
    <Stack spacing={4}>
      <Heading size={HeadingSize.H2} type={HeadingType.Secondary}>
        Profesion??ln?? ??idi??i
      </Heading>
      {renderForms(professionalDriversForms)}
    </Stack>
  </StackedContentWithHeading>
);

export default Forms;
