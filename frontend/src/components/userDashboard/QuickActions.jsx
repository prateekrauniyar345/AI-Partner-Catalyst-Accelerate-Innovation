import { motion } from 'framer-motion';
import { QuickActionsGuide } from './QuickActionsGuide';

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded border p-3"
    >
      <h3 className="fw-semibold mb-3">Quick Actions</h3>
      <QuickActionsGuide />
    </motion.div>
  );
}
