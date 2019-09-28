import React from 'react';

export default class GalleryItem extends React.Component {
  render() {
    const { item } = this.props;
	return (
		<div className="gallery__item">
			{ item.thumbnail !== "self" && <img className="gallery__img" src={item.thumbnail} alt="" /> }
			<div className="gallery__title"><b>{item.title}</b></div>
			<div className="gallery__comments">{item.num_comments}</div>
			<a href={`https://www.reddit.com/${item.permalink}`} className="gallery__permalink" target="_blank" rel="noopener noreferrer">link</a>
		</div>
		);
	}
}