import { ColorGroup, DefaultColorForPallete } from '@/lib/colors';
import clsx from 'clsx';
import { memo, useCallback } from 'react';

type RecolorSwatchProps = {
  onSelectColor: (color: ColorGroup) => void;
}

export default function RecolorSwatch(props: RecolorSwatchProps) {
  const {
    onSelectColor,
  } = props;

  const recolorButtons = Object.entries(DefaultColorForPallete).map(
    ([colorGroup, colorHex]) => {
      return (
        <button
          key={`${colorGroup}-swap-button`}
          style={{
            backgroundColor: colorHex[1],
          }}
          className={clsx(
            'w-6',
            'h-6',
            'rounded-full',
            'drop-shadow-sm',
            'hover:shadow-md',
            'hover:brightness-110',
            'transition-all',
            'm-1',
            'ring-1',
            'ring-slate-200',
          )}
          onClick={() => onSelectColor(parseInt(colorGroup))}
        />
      );
    }
  );

  return (
    <div className={clsx(
      'bg-primary-500',
      'p-2',
      '-m-0.5',
      'rounded-md',
      'shadow-md',
      'flex',
      'flex-wrap',
      'max-w-xs',
    )}>
      {recolorButtons}
    </div>
  );
}

export const MemoizedRecolorSwatch = memo(RecolorSwatch);
