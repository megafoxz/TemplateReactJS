import { handleSignout } from 'actions';
import { Button } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

function Index(props) {
  const dispatch = useDispatch()
  return (
    <>
     <Button onClick={() => dispatch(handleSignout())}>Log out</Button>
    </>
  )
}
export default Index;