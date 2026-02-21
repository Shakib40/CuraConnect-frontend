import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AddUser() {   
  const user = useSelector((state) => state.auth.user);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

   const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await axios.post('/api/users', { name, email, password, role }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      navigate('/admin/users', { replace: true });
    } catch (err) {
      setError(err?.message || 'Failed to add user');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Add User</h2>

      {error ? <div className="mt-2 text-sm text-red-600">{error}</div> : null}

      <form onSubmit={onSubmit} className="mt-4 space-y-3">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-200">Name</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-200">Email</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-200">Password</label>
          <input
            className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-200">Role</label>
          <select
            className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-gray-100"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button
          className="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          type="submit"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Add User'}
        </button>
      </form>
    </div>
  );
}
