import { BookNavigate } from '@components/BooksComponents/BookNavigation';
import { Outlet } from 'react-router-dom';

export function BooksLayout() {
  return (
    <div className="flex justify-between w-full">
      <div className="flex-1">
        <Outlet />
      </div>

      <BookNavigate />
    </div>
  );
}
