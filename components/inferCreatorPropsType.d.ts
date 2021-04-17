import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";

type Creator<Of extends Function, T> = T extends (...rest: any) => Of
  ? T
  : never;

type InferCreatorStaticPropsType<T> = T extends Creator<
  GetStaticProps<infer P, any>,
  T
>
  ? P
  : T extends Creator<
      (
        context?: GetStaticPropsContext<any>
      ) => Promise<GetStaticPropsResult<infer P>>,
      T
    >
  ? P
  : never;
