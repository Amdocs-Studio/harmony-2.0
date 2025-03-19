import { ModuleNameProps } from './ModuleName.types';
import { ModuleNameProvider } from './ModuleName.provider';
import ModuleNameMain from './components/ModuleName.main';
import './styles/index.css';

export default function ModuleName(props: ModuleNameProps){
  return (
    <ModuleNameProvider {...props}>
      <ModuleNameMain />
    </ModuleNameProvider>
  )
}