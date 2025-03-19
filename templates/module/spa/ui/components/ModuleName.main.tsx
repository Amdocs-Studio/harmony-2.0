import { Button } from '@common-components';
import { useModuleNameContext } from '../ModuleName.provider';

export default function ModuleNameMain() {
  const {navigate} = useModuleNameContext();
  return (
    <div>
      ModuleName main view
      <Button onClick={() => navigate('/')} label='Go to home' />
    </div>
  );
}
