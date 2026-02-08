import { Trash2, AlertTriangle } from 'lucide-react';

import type { SetStateAction } from 'react';

interface Props {
  isOpen: boolean;
  postId: string;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  onConfirm: (id: string) => void;
  isLoading?: boolean;
}

const ConfirmDeleteModal = ({
  isOpen,
  postId,
  onClose,
  onConfirm,
  isLoading,
}: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 dark:bg-zinc-900">
        {/* Header có icon cảnh báo */}
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>

          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
            Xóa bài viết?
          </h3>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">
            Hành động này không thể hoàn tác. Bài viết của bạn sẽ bị xóa vĩnh
            viễn khỏi hệ thống.
          </p>
        </div>

        {/* Nút bấm */}
        <div className="flex flex-col gap-3 bg-zinc-50 px-6 py-4 sm:flex-row-reverse dark:bg-zinc-800/50">
          <button
            disabled={isLoading}
            onClick={() => onConfirm(postId)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50 sm:w-auto"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <Trash2 size={18} />
            )}
            Xác nhận xóa
          </button>

          <button
            disabled={isLoading}
            onClick={() => onClose(false)}
            className="w-full rounded-xl bg-zinc-200 px-6 py-2.5 font-semibold text-zinc-900 transition-colors hover:bg-zinc-300 disabled:opacity-50 sm:w-auto dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
