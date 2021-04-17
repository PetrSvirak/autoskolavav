import { GetStaticPropsResult } from "next";

export const catchEmAllStatic = <T>(
  getter: () => Promise<GetStaticPropsResult<T>>
): (() => Promise<GetStaticPropsResult<T>>) => async () => {
  try {
    return await getter();
  } catch (e) {
    console.error(e);

    return {
      notFound: true,
    };
  }
};
