'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')
  
  if ((username === 'Doctor' && password === 'doctor') || 
      (username === 'Admin' && password === 'admin')) {
    (await cookies()).set('auth', username as string)
    redirect('/')
  }
  
  return { error: 'Invalid credentials' }
}

export async function logout() {
  (await cookies()).delete('auth')
  redirect('/login')
}
