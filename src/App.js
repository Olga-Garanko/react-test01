import React from 'react';
import './App.css';
import GalleryList from './components/GalleryList/GalleryList';

function App() {
	return (
		<div className="App">
			<h1>Top commented</h1>
			<GalleryList />
		</div>
	);
}

export default App;
