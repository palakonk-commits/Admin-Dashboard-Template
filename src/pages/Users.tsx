import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Mail,
  Shield,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Download,
} from 'lucide-react';
import { Card, Button, Input, Avatar, Badge, Modal, ModalFooter, Dropdown } from '@/components/ui';
import { useToast } from '@/stores/notification.store';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'user';
  status: 'active' | 'inactive' | 'pending';
  department: string;
  joinDate: string;
  lastActive: string;
}

const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', role: 'admin', status: 'active', department: 'Engineering', joinDate: '2023-01-15', lastActive: '2024-11-28' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', role: 'editor', status: 'active', department: 'Marketing', joinDate: '2023-03-22', lastActive: '2024-11-27' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', role: 'user', status: 'active', department: 'Sales', joinDate: '2023-05-10', lastActive: '2024-11-28' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', role: 'editor', status: 'inactive', department: 'Design', joinDate: '2023-02-18', lastActive: '2024-10-15' },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', role: 'user', status: 'pending', department: 'Support', joinDate: '2024-11-01', lastActive: '2024-11-25' },
  { id: '6', name: 'Emily Davis', email: 'emily@example.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', role: 'admin', status: 'active', department: 'Engineering', joinDate: '2022-08-05', lastActive: '2024-11-28' },
  { id: '7', name: 'Chris Wilson', email: 'chris@example.com', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', role: 'user', status: 'active', department: 'Finance', joinDate: '2023-09-12', lastActive: '2024-11-26' },
  { id: '8', name: 'Lisa Anderson', email: 'lisa@example.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100', role: 'editor', status: 'active', department: 'Marketing', joinDate: '2023-07-20', lastActive: '2024-11-28' },
];

const roleColors: Record<string, 'primary' | 'warning' | 'default'> = {
  admin: 'primary',
  editor: 'warning',
  user: 'default',
};

const statusColors: Record<string, 'success' | 'danger' | 'warning'> = {
  active: 'success',
  inactive: 'danger',
  pending: 'warning',
};

export const UsersPage: React.FC = () => {
  const [users, setUsers] = React.useState(mockUsers);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const toast = useToast();

  const itemsPerPage = 5;

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      toast.success('User deleted', `${selectedUser.name} has been removed.`);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };

  const handleAddUser = () => {
    toast.success('User invited', 'An invitation email has been sent.');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Users</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage your team members and their permissions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
          <Button size="sm" leftIcon={<UserPlus className="h-4 w-4" />} onClick={() => setIsAddModalOpen(true)}>
            Add User
          </Button>
        </div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-4 w-4" />}
              />
            </div>
            <div className="flex items-center gap-3">
              <Dropdown
                value={selectedRole}
                onChange={setSelectedRole}
                options={[
                  { value: 'all', label: 'All Roles' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'editor', label: 'Editor' },
                  { value: 'user', label: 'User' },
                ]}
                className="w-36"
              />
              <Dropdown
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={[
                  { value: 'all', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                  { value: 'pending', label: 'Pending' },
                ]}
                className="w-36"
              />
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-slate-500 uppercase tracking-wider">Last Active</th>
                  <th className="py-4 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <Avatar src={user.avatar} name={user.name} size="md" status={user.status === 'active' ? 'online' : 'offline'} />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={roleColors[user.role]} size="sm">
                        <Shield className="h-3 w-3 mr-1" />
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-slate-700 dark:text-slate-300">{user.department}</span>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={statusColors[user.status]} size="sm" dot>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm text-slate-500">{user.lastActive}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? 'primary' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
        description="Invite a new team member to your workspace."
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Enter full name" />
          <Input label="Email Address" type="email" placeholder="Enter email address" />
          <Dropdown
            label="Role"
            value="user"
            onChange={() => {}}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Editor' },
              { value: 'user', label: 'User' },
            ]}
          />
          <Dropdown
            label="Department"
            value="engineering"
            onChange={() => {}}
            options={[
              { value: 'engineering', label: 'Engineering' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'sales', label: 'Sales' },
              { value: 'design', label: 'Design' },
              { value: 'support', label: 'Support' },
            ]}
          />
        </div>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
          <Button onClick={handleAddUser}>Send Invitation</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete User"
        size="sm"
      >
        <p className="text-slate-600 dark:text-slate-400">
          Are you sure you want to delete <span className="font-medium text-slate-900 dark:text-white">{selectedUser?.name}</span>? This action cannot be undone.
        </p>
        <ModalFooter>
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteUser}>Delete User</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
