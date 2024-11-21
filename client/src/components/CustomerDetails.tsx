import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Save } from 'lucide-react';
import { Customer } from '../types/customer';
import { Input } from './ui/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

interface CustomerDetailsProps {
  customer: Customer;
  onClose: () => void;
}

export function CustomerDetails({ customer, onClose }: CustomerDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<Customer>({
    defaultValues: customer
  });

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete(`https://mjrk.vercel.app/api/deletecustomer/${customer._id}`);
      toast.success('Customer deleted successfully');
      navigate('/dashboard/customers');
    } catch (error) {
      toast.error('Failed to delete customer');
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (data: Customer) => {
    setIsSaving(true);
    try {
      await axios.put('https://mjrk.vercel.app/api/updatecustomer', {
        ...data,
        id: customer._id
      });
      toast.success('Customer updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update customer');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Customers
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel Edit' : 'Edit Customer'}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleting ? 'Deleting...' : 'Delete Customer'}
            </button>
          </div>
        </div>

        {/* Customer Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Details</h2>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  {...register('fullName', { required: 'Full name is required' })}
                  error={errors.fullName?.message}
                />
                <Input
                  label="Father's Name"
                  {...register('fatherName', { required: "Father's name is required" })}
                  error={errors.fatherName?.message}
                />
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    {...register('address', { required: 'Address is required' })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>
                <Input
                  label="Primary Contact"
                  {...register('contactPrimary', { required: 'Primary contact is required' })}
                  error={errors.contactNumber?.message}
                />
                <Input
                  label="Secondary Contact"
                  {...register('contactSecondary')}
                />
                <Input
                  label="Facebook ID"
                  {...register('facebookId')}
                />
                <Input
                  label="Caste"
                  {...register('caste')}
                />
                <Input
                  label="Opening Balance"
                  type="number"
                  {...register('openingBalance', { valueAsNumber: true })}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    {...register('status')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <select
                    {...register('accountType')}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="savings">Savings</option>
                    <option value="checking">Checking</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Full Name" value={customer.fullName} />
              <DetailItem label="Father's Name" value={customer.fatherName} />
              <DetailItem label="Address" value={customer.address} />
              <DetailItem label="Primary Contact" value={customer.contactPrimary} />
              <DetailItem label="Secondary Contact" value={customer.contactSecondary || '-'} />
              <DetailItem label="Facebook ID" value={customer.facebookId || '-'} />
              <DetailItem label="Caste" value={customer.caste || '-'} />
              <DetailItem label="Opening Balance" value={`₹${customer.openingBalance}`} />
              <DetailItem label="Status" value={customer.status} />
              <DetailItem label="Account Type" value={customer.accountType} />
              <DetailItem
                label="Registration Date"
                value={new Date(customer.registrationDate).toLocaleDateString()}
              />
              <DetailItem label="Gender" value={customer.gender} />
              <DetailItem
                label="Date of Birth"
                value={new Date(customer.dateOfBirth).toLocaleDateString()}
              />
              {customer.note && (
                <div className="col-span-full">
                  <h4 className="text-sm font-medium text-gray-700">Note</h4>
                  <p className="mt-1 text-sm text-gray-600">{customer.note}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}