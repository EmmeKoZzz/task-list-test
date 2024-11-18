import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { GlobalTheme } from '../configurations/themes';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={GlobalTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</StrictMode>,
)
