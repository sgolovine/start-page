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
    ["right-0", "top-0", "bottom-0", "bg-white"],
    ["w-full", "lg:w-96"]
  );

  return (
    <div className={classes}>
      <div className="p-4 border h-full overflow-y-scroll scrollbar-hide">
        <div className="fixed top-0 right-0">
          <button onClick={onClose} className="bg-white p-4 rounded-full">
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
