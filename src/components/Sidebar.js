import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const linkStyle = ({ isActive }) => {
    const base =
      'block rounded-md px-3 py-2 text-sm font-medium transition-colors';
    const active =
      'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100';
    const idle =
      'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800';
    return `${base} ${isActive ? active : idle}`;
  };

  return (
    <aside className="w-64 border-r border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <div className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
        Main Menu
      </div>
      <nav className="mt-2 space-y-1">
        <NavLink to="/admin/graph" className={linkStyle}>
          Graph
        </NavLink>
        <NavLink to="/admin/users" className={linkStyle}>
          Users
        </NavLink>
        <NavLink to="/admin/users/add" className={linkStyle}>
          Add User
        </NavLink>
        <NavLink to="/admin/activity-logs" className={linkStyle}>
          Activity Logs
        </NavLink>
      </nav>
    </aside>
  );
}
