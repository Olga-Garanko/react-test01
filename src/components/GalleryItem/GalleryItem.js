import React from 'react';

export default class GalleryItem extends React.Component {
  render() {
    const { item } = this.props;
	return (
		<div className="gallery__item">
			{ item.data.thumbnail !== "self" ? <img className="gallery__img" src={item.data.thumbnail} alt="" /> : <img className="gallery__img" src="/images/avatar.png" alt="" width="140" />}
			<div className="gallery__title"><b>{item.data.title}</b></div>
			<div className="gallery__comments">{item.data.num_comments}</div>
			<a href={item.data.permalink} className="gallery__permalink">link</a>
		</div>
		);
	}
}