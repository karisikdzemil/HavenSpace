import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  danger = true,
  isLoading = false,
  onConfirm,
  onCancel,
  children,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9998 flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-4xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${danger ? "bg-red-50 text-red-500" : "bg-[#327878]/10 text-[#327878]"}`}>
              <FontAwesomeIcon icon={faTriangleExclamation} size="lg" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
            {description && <p className="text-gray-400 text-sm font-medium mb-6">{description}</p>}

            {children && <div className="mb-6">{children}</div>}

            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 border-2 border-gray-100 text-slate-600 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-gray-200 transition-all"
              >
                {cancelLabel}
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`flex-1 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest text-white transition-all disabled:opacity-60 ${
                  danger ? "bg-red-500 hover:bg-red-600" : "bg-[#327878] hover:bg-[#286161]"
                }`}
              >
                {isLoading ? "..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
