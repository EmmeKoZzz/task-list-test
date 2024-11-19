import './styles/App.css';
import {Box, Container} from '@mui/material';
import TaskList from './modules/TaskList/TaskList.tsx';

function App() {
	return (
		<Container>
			<Box sx={{display: 'flex', placeSelf: 'center', alignItems: 'center', maxWidth: '800px', height: '100vh'}}>
				<TaskList/>
			</Box>
		</Container>
	);
}

export default App;
