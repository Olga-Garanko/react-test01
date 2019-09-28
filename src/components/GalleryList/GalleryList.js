import React from 'react';
import GalleryItem from '../GalleryItem/GalleryItem';
import './GalleryList.css';

export default class GalleryList extends	React.Component {
	constructor() {
		super();
		this.state = {
			gallery: [],
			isFetching: false,
			isAuto: false,
			rangeValue: 0,
			maxRange: 100
			//max: Math.max(...array1)
		};
	}

	getGallery = () => {
		const link = "https://www.reddit.com/r/reactjs.json?limit=100";
		this.setState({
			isFetching: true,
			gallery: []
		});
		fetch(link)
			.then(response => {
				return response.json();
			})
			.then(data => {
				this.setState({
					gallery: data.data.children,
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
	filterGallery = (arr) => {
		const { rangeValue, gallery } = this.state;
		return rangeValue ? gallery.filter(item => item.data.num_comments === +rangeValue) : gallery
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
		this.setState({
			rangeValue: e.target.value
		})
	}

	render() {
		const { isFetching, isAuto, rangeValue, maxRange, gallery } = this.state;
		return (
			<div>
				<div>
					<label htmlFor="num_coments">{rangeValue}</label>
					<input type="range" defaultValue={rangeValue} id="num_coments" name="num_coments" min="0" max={maxRange} step="1" onMouseUp={this.rangeChange} />
				</div>

				<button type="button" className="btn btn-outline-dark mb-2" onClick={this.refresh}>
					{ isAuto ? 'Stop auto-refresh' : 'Start auto-refresh' }
				</button><br /><br />

				<div className="gallery">
					{ isFetching && <span>'Loading...'</span> }
					{ this.sortGallery(this.filterGallery(gallery)).map((item,i) => {
						return (
							<GalleryItem item={item.data} key={i} />
							);
						}
					)}
				</div>
			</div>
		);
	}
}
