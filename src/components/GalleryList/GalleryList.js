import React from 'react';
import GalleryItem from '../GalleryItem/GalleryItem';
import './GalleryList.css';

export default class GalleryList extends	React.Component {
	constructor() {
		super();
		this.state = {
			gallery: [],
			filtredGallery: [],
			isFetching: false,
			isAuto: false,
			interval: 0,
			range: 0,
			max: 100
			//max: Math.max(...array1)
		};
	}

	getGallery = () => {
		const link = "https://www.reddit.com/r/reactjs.json?limit=100";
		this.setState({
			isFetching: true,
			gallery: [],
			filtredGallery: []
		});
		fetch(link)
			.then(response => {
				return response.json();
			})
			.then(data => {
				let gallery = data.data.children;
				let filtredGallery = this.state.range ? gallery.filter(item => item.data.num_comments === +this.state.range) : gallery
				this.setState({
					gallery,
					filtredGallery,
					isFetching: false
				});
			});
	};

	componentDidMount() {
		this.getGallery();
	}

	sortGallery = (arr) => {
		return arr.sort((a,b) => b.data.num_comments - a.data.num_comments )
	};

	refresh = () => {
		const { isAuto } = this.state;
		if (!isAuto) {
			this.interval = setInterval(() => {
				this.getGallery()
			}, 3000);
		} else { clearInterval(this.interval) }
		this.setState({
			isAuto: !isAuto
		});
	}

	rangeChange = (e) => {
		var value = e.target.value
		this.setState({
			range: value
		})
		let gallery = value ? this.state.gallery.filter(item => item.data.num_comments === +value) : this.state.gallery
		this.setState({
			filtredGallery: gallery
		})
	}

	render() {
		const { isFetching, isAuto, range, filtredGallery, max } = this.state;
		return (
			<div>
				<div>
					<label htmlFor="num_coments">{range}</label>
					<input type="range" defaultValue={range} id="num_coments" name="num_coments" min="0" max={max} step="1" onMouseUp={this.rangeChange} />
				</div>

				<button type="button" className="btn btn-outline-dark mb-2" onClick={this.refresh}>
					{ isAuto ? 'Stop auto-refresh' : 'Start auto-refresh' }
				</button><br /><br />

				<div className="gallery">
					{ isFetching && <span>'Loading...'</span> }
					{ this.sortGallery(filtredGallery).map((item,i) => {
						return (
							<GalleryItem item={item} key={i} />
							);
						}
					)}
				</div>
			</div>
		);
	}
}
