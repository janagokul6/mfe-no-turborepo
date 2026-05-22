import { redirect } from 'next/navigation';
import { ROUTES } from '@org/contracts';

export default function Home() {
  redirect(ROUTES.PRODUCTS);
}
