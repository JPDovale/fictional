import { Outlet } from "react-router-dom";
import pack from '../../../package.json'

export function WrapperLayout() {
  return (
    <>
      <p className='text-xxs text-gray500 font-bold opacity-60 p-1 absolute bottom-0 right-0 z-50'>B{pack.version}</p>
      <Outlet />
    </>
  )
}
