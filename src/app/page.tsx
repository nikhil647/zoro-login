'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LabelInputContainer } from '@/components/ui/LabelInputContainer';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '@/utils/validation';
import { IFormLogin } from '@/utils/types';
import { usePostApi } from '@/utils/hooks/usePost';
import { useRouter } from 'next/navigation'



export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormLogin>();
  const { postData, isLoading, error, data } = usePostApi();
  const router = useRouter()

  const onSubmit = async (loginData: IFormLogin) => {
    const resp = await postData('/api/login', loginData)
    if (resp && !(resp?.error)) {
      router.push('/dashboard');
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-[#FAEBD7]">
      <div className="max-w-md w-full mx-auto  p-4 md:p-8 shadow-input">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
          Welcome to Zoro Login
        </h2>

        <form className="mt-20" onSubmit={handleSubmit(onSubmit)} noValidate>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="email@example.com" type="email" {...register("email", { required: "Email is required", validate: validateEmail })} />
            {errors.email && <span className="text-red-500">{errors?.email.message}</span>}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" {...register("password", { required: "Password is required", validate: validatePassword })} />
            {errors.password && <span className="text-red-500">{errors?.password.message}</span>}
          </LabelInputContainer>

          <Button type="submit" size={'fullWidth'}>
            {isLoading ? 'Loading....' : 'Login'}
          </Button>
          {error && <span className="text-red-500">{error}</span>}

        </form>
        <div className="mt-4 text-center">
            <a href="/create-login">
              Create Login
            </a>
          </div>
      </div>

    </main>
  );

  // return (
  //   <main className="flex flex-col items-center justify-center h-screen">
  //     <h2 className="text-3xl font-bold mb-4">Login</h2>
  //     <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
  //       <Input
  //         type="email"
  //         placeholder="Email"
  //         {...register("email", { required: true })}
  //         className="mb-4"
  //       />
  //       {errors.email && <span className="text-red-500">Email is required</span>}
  //       <Input
  //         type="password"
  //         placeholder="Password"
  //         {...register("password", { required: true })}
  //         className="mb-4"
  //       />
  //       {errors.password && <span className="text-red-500">Password is required</span>}
  //       <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
  //         Login
  //       </Button>
  //     </form>

  //   </main>
  // );
}
