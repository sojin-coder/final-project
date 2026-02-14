import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../data/firebase';
import { updatePassword, updateProfile, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Form states
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Error/Success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      navigate('/admin');
      return;
    }
    
    setUser(currentUser);
    setDisplayName(currentUser.displayName || currentUser.email.split('@')[0]);
    setLoading(false);
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUpdating(true);

    try {
      // Validate passwords
      if (newPassword && newPassword !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (newPassword && newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Re-authenticate if changing password
      if (newPassword) {
        if (!currentPassword) {
          throw new Error('Please enter current password to change password');
        }

        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        
        await reauthenticateWithCredential(user, credential);
      }

      // Update display name if changed
      if (displayName !== user.displayName) {
        await updateProfile(user, {
          displayName: displayName
        });
      }

      // Update password if provided
      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      setSuccess('Profile updated successfully!');
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Refresh user data
      setUser(auth.currentUser);
      
    } catch (error) {
      console.error('Update error:', error);
      
      let errorMessage = 'Failed to update profile';
      
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Current password is incorrect';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Please login again to change password';
      } else {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e6b8a2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e6b8a2] flex items-center justify-center pt-20">
      <div className="bg-gray-100 w-full max-w-md p-8 text-center shadow-2xl rounded-lg">
        
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToDashboard}
            className="text-gray-600 hover:text-orange-700"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <h2 className="text-orange-700 mb-6 font-bold text-xl uppercase tracking-wider">
          Admin Profile
        </h2>

        {/* User Info */}
        <div className="mb-6 text-left bg-white p-4 rounded">
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">User ID:</span> {user.uid.substring(0, 8)}...
          </p>
          <p className="text-gray-600 mt-2">
            <span className="font-medium">Last login:</span> {user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'Unknown'}
          </p>
        </div>

        {/* Avatar Section */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-teal-800 flex items-center justify-center shadow-inner border-4 border-white">
            <span className="text-5xl">
              {user.displayName ? user.displayName.charAt(0).toUpperCase() : '👩‍💼'}
            </span>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            {success}
          </div>
        )}

        {/* Form Section */}
        <form className="space-y-4" onSubmit={handleUpdateProfile}>
          <div className="text-left">
            <label className="text-xs text-gray-500 ml-1">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 bg-white border border-gray-300 rounded focus:border-orange-600 outline-none transition"
            />
          </div>

          <div className="text-left">
            <label className="text-xs text-gray-500 ml-1">Current Password (required for password change)</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full p-3 bg-white border border-gray-300 rounded focus:border-orange-600 outline-none transition"
            />
          </div>

          <div className="text-left">
            <label className="text-xs text-gray-500 ml-1">New Password (optional)</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-white border border-gray-300 rounded focus:border-orange-600 outline-none transition"
            />
          </div>

          <div className="text-left">
            <label className="text-xs text-gray-500 ml-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-white border border-gray-300 rounded focus:border-orange-600 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className={`w-full ${
              updating ? 'bg-orange-400' : 'bg-orange-700 hover:bg-orange-800'
            } text-white font-medium py-3 rounded shadow-md transition-all active:scale-95 disabled:opacity-50`}
          >
            {updating ? 'Updating...' : 'Update Profile'}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-3 bg-blue-50 text-blue-800 text-sm rounded">
          <p className="font-medium">Note:</p>
          <p>• Enter current password only if changing password</p>
          <p>• Password must be at least 6 characters</p>
          <p>• You can update display name without password</p>
        </div>

      </div>
    </div>
  );
};

export default AdminProfile;