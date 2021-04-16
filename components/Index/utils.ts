import { Action } from "../../models/action";

export const convertBackgroundColor = ({
  background: { value },
}: Action): string => {
  switch (value[0]?.codename) {
    case "important":
      return "orange.200";

    case "informational":
      return "green.100";

    default:
      return "white";
  }
};
