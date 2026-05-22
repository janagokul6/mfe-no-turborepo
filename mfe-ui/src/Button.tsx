import React from 'react';

type BtnProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  click?: () => void;
  className?: string;
  variant?: string;
  disabled?: boolean;
};

export function Button(props: BtnProps) {
  const handler = props.onClick || props.click;
  let cls = 'bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 ';
  if (props.variant === 'danger') cls = 'bg-red-500 text-white rounded px-3 py-2 ';
  if (props.variant === 'ghost') cls = 'bg-gray-200 text-gray-800 rounded px-4 py-2 ';

  return (
    <button
      type="button"
      disabled={props.disabled}
      onClick={handler}
      className={cls + (props.className || '')}
      style={{ marginTop: props.variant === 'ghost' ? 2 : 0 }}
    >
      {props.children}
    </button>
  );
}
