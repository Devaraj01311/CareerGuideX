import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  showStrength = false,
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, [visible]);

  const strength = getStrength(value);

  return (
    <div className="space-y-2">
      {label && <label className="text-sm text-gray-700">{label}</label>}

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 pr-12 rounded-md bg-white border border-gray-300 text-black focus:outline-none focus:border-[#665de7]"
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-black"
        >
          <AnimatePresence mode="wait">
            {visible ? (
              <motion.span
                key="off"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <EyeOff size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="on"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Eye size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      {showStrength && value && (
        <div className="w-full h-1 rounded bg-gray-200 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${strength.percent}%` }}
            className={`h-full ${strength.color}`}
          />
        </div>
      )}
    </div>
  );
}

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[@;!$.\-_*?&]/.test(password)) score++;

  if (score <= 1) return { percent: 25, color: "bg-red-500" };
  if (score === 2) return { percent: 50, color: "bg-yellow-500" };
  if (score === 3) return { percent: 75, color: "bg-blue-500" };
  return { percent: 100, color: "bg-green-500" };
}
