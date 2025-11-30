import React from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, Download, Trash2, Folder, File, FileText, Image, Film, Music, Grid, List, Plus } from 'lucide-react';
import { Card, Button, Input, Badge, Modal, ModalFooter } from '@/components/ui';
import { useToast } from '@/stores/notification.store';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'document' | 'image' | 'video' | 'audio' | 'other';
  size?: string;
  modified: string;
  items?: number;
}

const initialFiles: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder', modified: '2024-11-28', items: 12 },
  { id: '2', name: 'Images', type: 'folder', modified: '2024-11-27', items: 45 },
  { id: '3', name: 'Videos', type: 'folder', modified: '2024-11-25', items: 8 },
  { id: '4', name: 'Project Proposal.pdf', type: 'document', size: '2.4 MB', modified: '2024-11-28' },
  { id: '5', name: 'Dashboard Screenshot.png', type: 'image', size: '1.2 MB', modified: '2024-11-27' },
  { id: '6', name: 'Meeting Recording.mp4', type: 'video', size: '156 MB', modified: '2024-11-26' },
  { id: '7', name: 'Presentation.pptx', type: 'document', size: '8.5 MB', modified: '2024-11-25' },
  { id: '8', name: 'Background Music.mp3', type: 'audio', size: '4.2 MB', modified: '2024-11-24' },
  { id: '9', name: 'Report Q4.xlsx', type: 'document', size: '1.8 MB', modified: '2024-11-23' },
  { id: '10', name: 'Logo Design.ai', type: 'other', size: '12.4 MB', modified: '2024-11-22' },
];

export const FilesPage: React.FC = () => {
  const [files, setFiles] = React.useState<FileItem[]>(initialFiles);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<FileItem | null>(null);
  const [showNewFolderModal, setShowNewFolderModal] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');
  const toast = useToast();

  const filteredFiles = files.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'folder': return Folder;
      case 'document': return FileText;
      case 'image': return Image;
      case 'video': return Film;
      case 'audio': return Music;
      default: return File;
    }
  };

  const getFileColor = (type: FileItem['type']) => {
    switch (type) {
      case 'folder': return 'text-amber-500 bg-amber-100 dark:bg-amber-900/30';
      case 'document': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/30';
      case 'image': return 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30';
      case 'video': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/30';
      case 'audio': return 'text-pink-500 bg-pink-100 dark:bg-pink-900/30';
      default: return 'text-slate-500 bg-slate-100 dark:bg-slate-800';
    }
  };

  const handleDelete = () => {
    if (selectedFile) {
      setFiles(files.filter(f => f.id !== selectedFile.id));
      setShowDeleteModal(false);
      setSelectedFile(null);
      toast.success('Deleted', 'File has been removed');
    }
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast.error('Error', 'Please enter a folder name');
      return;
    }
    const folder: FileItem = {
      id: Date.now().toString(),
      name: newFolderName,
      type: 'folder',
      modified: new Date().toISOString().split('T')[0],
      items: 0,
    };
    setFiles([folder, ...files]);
    setNewFolderName('');
    setShowNewFolderModal(false);
    toast.success('Created', 'Folder has been created');
  };

  const storageUsed = 45;
  const storageTotal = 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">File Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your files and folders</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowNewFolderModal(true)}>
            New Folder
          </Button>
          <Button leftIcon={<Upload className="h-4 w-4" />} onClick={() => setShowUploadModal(true)}>
            Upload
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Storage */}
          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Storage</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Used</span>
                <span className="font-medium text-slate-900 dark:text-white">{storageUsed} GB / {storageTotal} GB</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${(storageUsed / storageTotal) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">{storageTotal - storageUsed} GB available</p>
            </div>
          </Card>

          {/* File Types */}
          <Card padding="md">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">File Types</h3>
            <div className="space-y-3">
              {[
                { type: 'Documents', count: 24, color: 'bg-blue-500' },
                { type: 'Images', count: 45, color: 'bg-emerald-500' },
                { type: 'Videos', count: 8, color: 'bg-purple-500' },
                { type: 'Audio', count: 12, color: 'bg-pink-500' },
                { type: 'Others', count: 6, color: 'bg-slate-500' },
              ].map(item => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.type}</span>
                  </div>
                  <Badge variant="primary" size="sm">{item.count}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Toolbar */}
          <Card padding="md">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Files */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map((file, index) => {
                const Icon = getFileIcon(file.type);
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card hover padding="md" className="text-center group">
                      <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${getFileColor(file.type)}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <p className="mt-3 text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {file.type === 'folder' ? `${file.items} items` : file.size}
                      </p>
                      <div className="mt-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => { setSelectedFile(file); setShowDeleteModal(true); }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <Card padding="none">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Name</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Size</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Modified</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-slate-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map(file => {
                    const Icon = getFileIcon(file.type);
                    return (
                      <tr key={file.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getFileColor(file.type)}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white">{file.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500">
                          {file.type === 'folder' ? `${file.items} items` : file.size}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500">{file.modified}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => { setSelectedFile(file); setShowDeleteModal(true); }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <Modal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Files" size="md">
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center">
          <Upload className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <p className="text-slate-600 dark:text-slate-400 mb-2">Drag and drop files here</p>
          <p className="text-sm text-slate-500 mb-4">or</p>
          <Button>Browse Files</Button>
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowUploadModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* New Folder Modal */}
      <Modal isOpen={showNewFolderModal} onClose={() => setShowNewFolderModal(false)} title="New Folder" size="sm">
        <Input
          label="Folder Name"
          placeholder="Enter folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowNewFolderModal(false)}>Cancel</Button>
          <Button onClick={handleCreateFolder}>Create</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete File" size="sm">
        <p className="text-slate-600 dark:text-slate-400">
          Are you sure you want to delete "{selectedFile?.name}"? This action cannot be undone.
        </p>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
