import RequireAuth from './RequireAuth';

const RequireAuthElement = ({element}) => {
  return(
    <RequireAuth>
      {element}
    </RequireAuth>
  );
}

export default RequireAuthElement;
