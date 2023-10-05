import clsx from "clsx";
import { MedievalSharp } from "next/font/google";

export type ChestDetailsProps = {
  chestName: string;
}

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] });

export default function ChestDetails(props: ChestDetailsProps) {
  const {
    chestName,
  } = props;

  // let imageSrc = '/woodenStaticChest.png';
  // if (chestIconURL === 'bag') {
  //   imageSrc = '/woodenStaticChest.png';
  // } else if (chestIconURL === 'chest') {
  //   imageSrc = '/woodenStaticChest.png';
  // } else {
  //   imageSrc = chestIconURL.url;
  // }

  return (
    <div className={clsx(
      ['flex', 'justify-items-baseline', 'justify-center']
    )}>
      <h1 className={clsx(
        medievalSharp.className,
        ['text-black', 'dark:text-white', 'text-4xl'],
      )}>
        {chestName}
      </h1>
    </div>
  );
}
