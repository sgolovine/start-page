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
    ["w-1/4", "right-0", "top-0", "p-4", "bg-white", "border"]
  );

  return (
    <div className={classes} style={{ width: "450px" }}>
      <div className="fixed top-0 right-0 p-4">
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      {children}
    </div>
  );
};
