import { ProjectNameProps } from '../types';

export default function ProjectName({ title = 'Project Name' }: ProjectNameProps) {
	return (
		<div className="project-name">
			<h1>{title}</h1>
		</div>
	);
}
