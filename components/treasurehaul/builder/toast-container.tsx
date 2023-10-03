// "use client"

// import { CloseIcon, SuccessIcon } from "@/components/svgs";
// import { removeToast, useToastSelector } from "@/lib/store/treasure-haul"
// import clsx from "clsx";
// import Link from "next/link";
// import { useDispatch } from "react-redux";

// export default function ToastContainer() {
//   const toast = useToastSelector();
//   const dispatch = useDispatch();

//   const successIcon = (
//     <div className={clsx(
//       'bg-green-500',
//       'rounded-xl',
//       'w-10', 'h-10',
//       'flex',
//       'justify-center',
//       'items-center',
//     )}>
//       <SuccessIcon className={clsx(
//         ['fill-gray-50'],
//         ['w-8', 'h-8'],
//       )} />
//     </div>
//   );

//   let icon = (<></>);
//   switch(toast.icon) {
//     case 'success' : icon = successIcon; break;
//   }

//   return (
//     <div className={clsx(
//       ['absolute', 'right-0', 'bottom-0'],
//       ['w-[400px]'],
//       ['p-4', 'm-4'],
//       ['rounded-lg'],
//       ['dark:bg-slate-600', 'bg-slate-300'],
//       ['dark:text-gray-50', 'text-black'],
//       ['text-lg'],
//       ['animate-fold_in'],
//       ['grid', 'gap-x-4', 'items-center', 'grid-cols-[32px_1fr]'],
//       toast.visible
//         ? 'opacity-100'
//         : 'opacity-0',
//     )} style={{
//       gridTemplateAreas: `
//         "icon     message"
//         "url      url"
//       `
//     }}>
//       <div className={'[grid-area:icon]'}>
//         {icon}
//       </div>
//       <span className="[grid-area:message]">
//         {toast.text}
//       </span>
//       <Link
//         className="[grid-area:url]"
//         href={toast.url ?? ""}
//       />
//       <button
//         onClick={() => dispatch(removeToast())}
//         className={clsx(
//           ['absolute', 'top-0', 'right-0'],
//           ['bg-slate-300', 'hover:bg-slate-200', 'dark:bg-slate-800', 'dark:hover:bg-slate-700'],
//           ['transition-colors'],
//           ['m-1', 'p-2'],
//           ['w-8', 'h-8'],
//           ['rounded-full'],
//           ['flex', 'justify-center', 'items-center'],
//         )}>
//         <CloseIcon className='fill-gray-900 dark:fill-gray-50 w-8 h-8' />
//       </button>
//     </div>
//   )
// }
