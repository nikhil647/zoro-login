'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { usePostApi } from '@/utils/hooks/usePost';

function MyCard() {
    const router = useRouter();
    const { postData, isLoading, error, data } = usePostApi();

    const handleSignOut = async () => {
        const resp = await postData('/api/logout', {});
        if (resp && !(resp?.error)) {
            router.push('/');
        }
    }

    return (
        <div className='ml-4'>
            <Button onClick={handleSignOut}>{isLoading ? 'Loading' :  'Sign Out'}</Button>
        </div>
    )
}

export default MyCard;