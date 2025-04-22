import {
  SquaresFour,
  ChatDots,
  Files,
  ChatCenteredText,
  UsersThree,
} from "@phosphor-icons/react";
import SlashCommandIcon from "./ChecklistItem/icons/SlashCommand";
import paths from "@/utils/paths";
import i18next from "@/i18n";

const noop = () => {};

export const CHECKLIST_UPDATED_EVENT = "anythingllm_checklist_updated";
export const CHECKLIST_STORAGE_KEY = "anythingllm_checklist_completed";
export const CHECKLIST_HIDDEN = "anythingllm_checklist_dismissed";

const t = (key) => i18next.t(key);

/**
 * @typedef {Object} ChecklistItemHandlerParams
 * @property {Object[]} workspaces - Array of workspaces
 * @property {Function} navigate - Function to navigate to a path
 * @property {Function} setSelectedWorkspace - Function to set the selected workspace
 * @property {Function} showManageWsModal - Function to show the manage workspace modal
 * @property {Function} showToast - Function to show a toast
 * @property {Function} showNewWsModal - Function to show the new workspace modal
 */

/**
 * @typedef {Object} ChecklistItem
 * @property {string} id
 * @property {string} title - Translated title
 * @property {string} description - Translated description
 * @property {string} action - Translated action text
 * @property {(params: ChecklistItemHandlerParams) => boolean} handler
 * @property {React.ComponentType} icon
 */

/** @type {ChecklistItem[]} */
export const CHECKLIST_ITEMS = [
  {
    id: "create_workspace",
    get title() { return t('checklist.items.create_workspace.title') },
    get description() { return t('checklist.items.create_workspace.description') },
    get action() { return t('checklist.items.create_workspace.action') },
    handler: ({ showNewWsModal = noop }) => {
      showNewWsModal();
      return true;
    },
    icon: SquaresFour,
  },
  {
    id: "send_chat",
    get title() { return t('checklist.items.send_chat.title') },
    get description() { return t('checklist.items.send_chat.description') },
    get action() { return t('checklist.items.send_chat.action') },
    handler: ({
      workspaces = [],
      navigate = noop,
      showToast = noop,
      showNewWsModal = noop,
    }) => {
      if (workspaces.length === 0) {
        showToast(
          t('checklist.items.send_chat.error'),
          "warning",
          { clear: true }
        );
        showNewWsModal();
        return false;
      }
      navigate(paths.workspace.chat(workspaces[0].slug));
      return true;
    },
    icon: ChatDots,
  },
  {
    id: "embed_document",
    get title() { return t('checklist.items.embed_document.title') },
    get description() { return t('checklist.items.embed_document.description') },
    get action() { return t('checklist.items.embed_document.action') },
    handler: ({
      workspaces = [],
      setSelectedWorkspace = noop,
      showManageWsModal = noop,
      showToast = noop,
      showNewWsModal = noop,
    }) => {
      if (workspaces.length === 0) {
        showToast(
          t('checklist.items.embed_document.error'),
          "warning",
          { clear: true }
        );
        showNewWsModal();
        return false;
      }
      setSelectedWorkspace(workspaces[0]);
      showManageWsModal();
      return true;
    },
    icon: Files,
  },
  {
    id: "setup_system_prompt",
    get title() { return t('checklist.items.setup_system_prompt.title') },
    get description() { return t('checklist.items.setup_system_prompt.description') },
    get action() { return t('checklist.items.setup_system_prompt.action') },
    handler: ({
      workspaces = [],
      navigate = noop,
      showNewWsModal = noop,
      showToast = noop,
    }) => {
      if (workspaces.length === 0) {
        showToast(
          t('checklist.items.setup_system_prompt.error'),
          "warning",
          { clear: true }
        );
        showNewWsModal();
        return false;
      }
      navigate(
        paths.workspace.settings.chatSettings(workspaces[0].slug, {
          search: { action: "focus-system-prompt" },
        })
      );
      return true;
    },
    icon: ChatCenteredText,
  },
  {
    id: "define_slash_command",
    get title() { return t('checklist.items.define_slash_command.title') },
    get description() { return t('checklist.items.define_slash_command.description') },
    get action() { return t('checklist.items.define_slash_command.action') },
    handler: ({
      workspaces = [],
      navigate = noop,
      showNewWsModal = noop,
      showToast = noop,
    }) => {
      if (workspaces.length === 0) {
        showToast(
          t('checklist.items.define_slash_command.error'),
          "warning",
          { clear: true }
        );
        showNewWsModal();
        return false;
      }
      navigate(
        paths.workspace.chat(workspaces[0].slug, {
          search: { action: "open-new-slash-command-modal" },
        })
      );
      return true;
    },
    icon: SlashCommandIcon,
  },
  {
    id: "visit_community",
    get title() { return t('checklist.items.visit_community.title') },
    get description() { return t('checklist.items.visit_community.description') },
    get action() { return t('checklist.items.visit_community.action') },
    handler: () => window.open(paths.communityHub.website(), "_blank"),
    icon: UsersThree,
  },
];
