import './styles/App.css';
import { Box, Container } from '@mui/material';
import TaskList from './modules/TaskList/TaskList.tsx';

function App() {
	return (
		<Container>
			<Box sx={{ placeSelf: 'center', width:'80%' }}>
				<TaskList/>
			</Box>
		</Container>
	);
}

export default App;
