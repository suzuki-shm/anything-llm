import ManageWorkspace, { useManageWorkspaceModal } from "@/components/Modals/ManageWorkspace";
import NewWorkspaceModal, { useNewWorkspaceModal } from "@/components/Modals/NewWorkspace";
import Workspace from "@/models/workspace";
import paths from "@/utils/paths";
import showToast from "@/utils/toast";
import { ChatCenteredDots, FileArrowDown, Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function QuickLinks() {
  const navigate = useNavigate();
  const { t } = useTranslation('common');
  const { showModal } = useManageWorkspaceModal();
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const {
    showing: showingNewWsModal,
    showModal: showNewWsModal,
    hideModal: hideNewWsModal,
  } = useNewWorkspaceModal();

  const sendChat = async () => {
    const workspaces = await Workspace.all();
    if (workspaces.length > 0) {
      const firstWorkspace = workspaces[0];
      navigate(paths.workspace.chat(firstWorkspace.slug));
    } else {
      showToast(
        t('quick_links.create_workspace_chat_warning'),
        "warning",
        { clear: true }
      );
      showNewWsModal();
    }
  };

  const embedDocument = async () => {
    const workspaces = await Workspace.all();
    if (workspaces.length > 0) {
      const firstWorkspace = workspaces[0];
      setSelectedWorkspace(firstWorkspace);
      showModal();
    } else {
      showToast(
        t('quick_links.create_workspace_embed_warning'),
        "warning",
        { clear: true }
      );
      showNewWsModal();
    }
  };

  const createWorkspace = () => {
    showNewWsModal();
  };

  return (
    <div>
      <h1 className="text-theme-home-text uppercase text-sm font-semibold mb-4">
        {t('quick_links.title')}
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={sendChat}
          className="h-[45px] text-sm font-semibold bg-theme-home-button-secondary rounded-lg text-theme-home-button-secondary-text flex items-center justify-center gap-x-2.5 transition-all duration-200 hover:bg-theme-home-button-secondary-hover hover:text-theme-home-button-secondary-hover-text"
        >
          <ChatCenteredDots size={16} />
          {t('quick_links.send_chat')}
        </button>
        <button
          onClick={embedDocument}
          className="h-[45px] text-sm font-semibold bg-theme-home-button-secondary rounded-lg text-theme-home-button-secondary-text flex items-center justify-center gap-x-2.5 transition-all duration-200 hover:bg-theme-home-button-secondary-hover hover:text-theme-home-button-secondary-hover-text"
        >
          <FileArrowDown size={16} />
          {t('quick_links.embed_document')}
        </button>
        <button
          onClick={createWorkspace}
          className="h-[45px] text-sm font-semibold bg-theme-home-button-secondary rounded-lg text-theme-home-button-secondary-text flex items-center justify-center gap-x-2.5 transition-all duration-200 hover:bg-theme-home-button-secondary-hover hover:text-theme-home-button-secondary-hover-text"
        >
          <Plus size={16} />
          {t('quick_links.create_workspace')}
        </button>
      </div>

      {selectedWorkspace && (
        <ManageWorkspace
          providedSlug={selectedWorkspace.slug}
          hideModal={() => {
            setSelectedWorkspace(null);
          }}
        />
      )}

      {showingNewWsModal && <NewWorkspaceModal hideModal={hideNewWsModal} />}
    </div>
  );
}
