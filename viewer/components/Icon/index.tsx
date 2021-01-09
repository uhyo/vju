import { faFolder, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Icon = {
  /**
   * Show an open folder icon.
   */
  OpenFolder() {
    return <FontAwesomeIcon icon={faFolderOpen} width="18" height="18" />;
  },
  /**
   * Show a closed folder icon.
   */
  ClosedFolder() {
    return <FontAwesomeIcon icon={faFolder} width="18" height="18" />;
  },
};
