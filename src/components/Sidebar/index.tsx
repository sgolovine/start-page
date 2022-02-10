import { Modal } from "./Modal"
import { Devtools } from "./sections/Devtools"
import { Preferences } from "./sections/Preferences"
import { Seperator } from "./SidebarComponents"

interface Props {
  visible: boolean
  onClose: () => void
}

const Sidebar: React.FC<Props> = ({ visible, onClose }) => (
  <Modal visible={visible} onClose={onClose}>
    <Preferences />
    <Seperator />
    <Devtools />
  </Modal>
)
export default Sidebar
