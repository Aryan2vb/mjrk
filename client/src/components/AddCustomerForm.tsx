import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from './ui/Input';
import { Customer } from '../types/customer';
import { ArrowLeft, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

export function AddCustomerForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Customer>();

  const onSubmit = async (data: Customer) => {
    setIsSubmitting(true);
    try {
      const formattedData = {
        fullName: data.fullName,
        fathersName: data.fatherName,
        address: data.address,
        contactNumber: data.contactPrimary,
        contactNumber2: data.contactSecondary || '',
        facebookId: data.facebookId || '',
        caste: data.caste || '',
        openingAccountBalance: Number(data.openingBalance),
        status: data.status === 'active' ? 'Active' : 'Inactive',
        accountType: data.accountType === 'savings' ? 'Savings' : 'Checking',
        dateOfRegistration: new Date().toISOString(),
        gender: data.gender.charAt(0).toUpperCase() + data.gender.slice(1),
        dateOfBirth: new Date(data.dateOfBirth).toISOString(),
        note: data.note || ''
      };

      await axios.post('https://mjrk.vercel.app/api/createcustomer', formattedData);
      toast.success('Customer added successfully');
      navigate('/dashboard/customers');
    } catch (error) {
      toast.error('Failed to add customer');
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/dashboard/customers')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Customers
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Customer</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name *"
              {...register('fullName', { required: 'Full name is required' })}
              error={errors.fullName?.message}
            />

            <Input
              label="Father's Name *"
              {...register('fatherName', { required: "Father's name is required" })}
              error={errors.fatherName?.message}
            />

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            <Input
              label="Primary Contact *"
              {...register('contactPrimary', { required: 'Primary contact is required' })}
              error={errors.contactPrimary?.message}
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
              label="Opening Balance *"
              type="number"
              {...register('openingBalance', { 
                required: 'Opening balance is required',
                valueAsNumber: true 
              })}
              error={errors.openingBalance?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                {...register('status', { required: 'Status is required' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Type *
              </label>
              <select
                {...register('accountType', { required: 'Account type is required' })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="savings">Savings</option>
                <option value="checking">Checking</option>
              </select>
              {errors.accountType && (
                <p className="mt-1 text-sm text-red-500">{errors.accountType.message}</p>
              )}
            </div>

            <Input
              label="Date of Birth *"
              type="date"
              {...register('dateOfBirth', { required: 'Date of birth is required' })}
              error={errors.dateOfBirth?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('gender', { required: 'Gender is required' })}
                    value="male"
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Male</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('gender', { required: 'Gender is required' })}
                    value="female"
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Female</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('gender', { required: 'Gender is required' })}
                    value="other"
                    className="form-radio text-blue-600"
                  />
                  <span className="ml-2">Other</span>
                </label>
              </div>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>
              )}
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note
              </label>
              <textarea
                {...register('note')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Adding...' : 'Add Customer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}