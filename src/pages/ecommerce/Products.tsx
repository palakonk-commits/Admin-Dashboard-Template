import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit2, Trash2, Eye, Star, Package } from 'lucide-react';
import { Card, Button, Input, Badge, Modal, ModalFooter } from '@/components/ui';
import { useToast } from '@/stores/notification.store';
import { formatCurrency } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: 'active' | 'draft' | 'archived';
}

const initialProducts: Product[] = [
  { id: '1', name: 'MacBook Pro 16"', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100', category: 'Electronics', price: 2499, stock: 45, rating: 4.8, status: 'active' },
  { id: '2', name: 'iPhone 15 Pro Max', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100', category: 'Electronics', price: 1199, stock: 120, rating: 4.9, status: 'active' },
  { id: '3', name: 'AirPods Pro 2', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=100', category: 'Accessories', price: 249, stock: 200, rating: 4.7, status: 'active' },
  { id: '4', name: 'iPad Air', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100', category: 'Electronics', price: 599, stock: 78, rating: 4.6, status: 'active' },
  { id: '5', name: 'Apple Watch Ultra', image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100', category: 'Wearables', price: 799, stock: 34, rating: 4.5, status: 'draft' },
  { id: '6', name: 'Magic Keyboard', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100', category: 'Accessories', price: 299, stock: 0, rating: 4.4, status: 'archived' },
];

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const [newProduct, setNewProduct] = React.useState({ name: '', category: '', price: '', stock: '' });
  const toast = useToast();

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast.error('Error', 'Please fill in all required fields');
      return;
    }
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100',
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock) || 0,
      rating: 0,
      status: 'draft',
    };
    setProducts([product, ...products]);
    setNewProduct({ name: '', category: '', price: '', stock: '' });
    setShowAddModal(false);
    toast.success('Success', 'Product added successfully');
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setShowDeleteModal(false);
      setSelectedProduct(null);
      toast.success('Deleted', 'Product has been removed');
    }
  };

  const statusColors = {
    active: 'success' as const,
    draft: 'warning' as const,
    archived: 'danger' as const,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Products</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your product inventory</p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />} onClick={() => setShowAddModal(true)}>
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
            Filters
          </Button>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card hover className="overflow-hidden">
              <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <Badge variant={statusColors[product.status]} className="absolute top-3 right-3">
                  {product.status}
                </Badge>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{product.name}</h3>
                    <p className="text-sm text-slate-500">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(product.price)}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      {product.stock} in stock
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500 hover:text-red-600"
                      onClick={() => { setSelectedProduct(product); setShowDeleteModal(true); }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card padding="lg" className="text-center">
          <Package className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No products found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search or add a new product</p>
        </Card>
      )}

      {/* Add Product Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Product" size="md">
        <div className="space-y-4">
          <Input
            label="Product Name"
            placeholder="Enter product name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <Input
            label="Category"
            placeholder="Enter category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price"
              type="number"
              placeholder="0.00"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              label="Stock"
              type="number"
              placeholder="0"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
          </div>
        </div>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Product" size="sm">
        <p className="text-slate-600 dark:text-slate-400">
          Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
        </p>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteProduct}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
