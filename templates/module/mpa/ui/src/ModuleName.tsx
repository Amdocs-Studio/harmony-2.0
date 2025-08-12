import { ModuleNameProps } from './ModuleName.types';
import { ModuleNameProvider } from './ModuleName.provider';
import './styles/index.css';

export default function ModuleName(props: ModuleNameProps) {
	return <ModuleNameProvider {...props} />;
}