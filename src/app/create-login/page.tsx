'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { usePostApi } from '@/utils/hooks/usePost';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';

function generateRandomEmail() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let email = '';
  // Generate random string for email prefix
  for (let i = 0; i < 10; i++) {
    email += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  // Add domain and extension
  email += '@example.com';

  return email;
}

function CreateLoginCred() {
  const { postData, isLoading, error, data } = usePostApi();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const password = '12345678';

  const handleClick =async() => {
    const randomEmail = generateRandomEmail();
    const resp = await postData('api/generate-login-cred', { email: randomEmail, password });
    if (resp && !(resp?.error)) {
      setEmail(randomEmail);
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
    router.push('/');
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">

      <Button onClick={handleClick}> {isLoading ? 'Loading' : 'Create Login Cred' } </Button>

      <Dialog open={open} onOpenChange={handleClick}> 
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your New Cred</DialogTitle>
            <DialogDescription>
              <div>Email: {email}</div>
              <div>Password: {password}</div>
            </DialogDescription>
          </DialogHeader>
          <Button onClick={handleClose}> Close </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateLoginCred;