import clsx from "clsx";
import { LoadingIcon } from "../svgs";

export type SpinnerProps = {
  show?: boolean;
  className?: string;
}

export default function Spinner(props: SpinnerProps) {
  const {
    show,
    className,
  } = props;

  return (
    <LoadingIcon className={clsx(
      ['fill-gray-900', 'dark:fill-gray-50'],
      ['stroke-gray-900', 'dark:stroke-gray-50'],
      ['animate-spin'],
      className ?? '',
      show === true || show === undefined
        ? 'visible'
        : 'hidden'
    )} />
  );
}