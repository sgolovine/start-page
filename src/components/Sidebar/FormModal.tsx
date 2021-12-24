import classNames from "classnames";
import { CloseIcon } from "../icons/CloseIcon";

interface Props {
  visible?: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const FormModal: React.FC<Props> = ({ visible, children, onClose }) => {
  const classes = classNames(
    {
      fixed: visible,
      hidden: !visible,
    },
    ["right-0", "top-0", "bottom-0", "bg-white", "shadow"],
    ["w-full", "lg:w-96"]
  );

  return (
    <div className={classes}>
      <div className="fixed top-0 right-0 flex flex-row items-center justify-between border w-full lg:w-96 h-16">
        <h2 className="text-2xl font-bold ml-4">Menu</h2>
        <button onClick={onClose} className="bg-white p-4 rounded-full">
          <CloseIcon />
        </button>
      </div>
      <div className="mt-16 p-4 border h-full overflow-y-scroll scrollbar-hide">
        {children}
        {/*
         * Somewhat of a hack but makes it so mobile devices can scroll
         * all the way to the bottom
         */}
        <div className="h-16" />
      </div>
    </div>
  );
};
