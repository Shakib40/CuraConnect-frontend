import { useDispatch, useSelector } from 'react-redux';

import { toggleMode } from '../store/features/themeSlice';

export default function DarkModeSwitch() {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleMode())}
      className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-800 dark:border-gray-800 dark:text-gray-100"
      title="Toggle dark mode"
    >
      {mode === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}
