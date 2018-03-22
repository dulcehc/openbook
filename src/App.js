
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
	ReactiveBase,
	DataSearch,
	MultiList,
	RangeSlider,
	SingleRange,
	SelectedFilters,
	ResultCard,
} from '@appbaseio/reactivesearch';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
		};
	}

	toggleState = () => {
		const { visible } = this.state;
		this.setState({
			visible: !visible,
		});
	};

	render() {
		return (
			<ReactiveBase
				app="openbook"
				credentials="Tlt67c9PM:4ca76c0c-b1bb-4fd4-a675-68bead959b44"
			>
				<div className="navbar">
					<div className="logo">
						Good<b>Books</b>
					</div>
					<DataSearch
						className="datasearch"
						componentId="mainSearch"
						dataField={[
							'title',
							'author'
						]}
						queryFormat="and"
						placeholder="Buscar por título o autor"
						innerClass={{
							input: 'searchbox',
							list: 'suggestionlist',
						}}
						autosuggest={false}
						iconPosition="left"
						filterLabel="search"
					/>
				</div>
				<div className="display">
					<div className={`leftSidebar ${this.state.visible ? 'active' : ''}`}>
						<SingleRange
							componentId="ratingsFilter"
							dataField="raiting"
							title="Valoraciones"
							data={[
								{
									start: 4,
									end: 4,
									label: '★★★★',
								},
								{
									start: 3,
									end: 3,
									label: '★★★',
								},
								{
									start: 2,
									end: 2,
									label: '★★',
								},
								{
									start: 1,
									end: 1,
									label: '★',
								},
							]}
							react={{
								and: 'mainSearch',
							}}
							filterLabel="Ratings"
						/>
						<RangeSlider
							componentId="publishFilter"
							dataField="original_publication_year"
							title="Year of Publication"
							filterLabel="published"
							range={{
								start: 1970,
								end: 2017,
							}}
							rangeLabels={{
								start: '1970',
								end: '2017',
							}}
							interval={2}
						/>
						<MultiList
							componentId="authorFilter"
							dataField="author.raw"
							title="Author"
							size={1000}
							showCheckbox={false}
							className="authors"
							innerClass={{
								list: 'author-list',
							}}
							placeholder="Filter by author name"
							filterLabel="Author"
						/>
					</div>
					<div className="mainBar">
						<SelectedFilters />
						<ResultCard
							componentId="results"
							dataField="title"
							react={{
								and: [
									'mainSearch',
									'authorFilter',
									'ratingsFilter'
								],
							}}
							pagination
							size={12}
							sortOptions={[
								{
									dataField: 'raiting',
									sortBy: 'desc',
									label: 'Ratings (High to low)',
								}
							]}
							onData={res => ({
								image: res.front,
								title: res.title || ' ',
								description:
									`<div class='result-author' title='${
										res.author
									}'>by ${res.user}</div>`
									+ `<span class="star">${'★'.repeat(res.raiting)}</span>`,
								url: `https://google.com/search?q=${
									res.title
								}`,
							})}
							className="result-data"
							innerClass={{
								title: 'result-title',
								image: 'result-image',
								resultStats: 'result-stats',
								listItem: 'result-item',
							}}
						/>
					</div>
					<div
						role="button"
						tabIndex="0"
						onKeyPress={this.toggleState}
						onClick={this.toggleState}
						className={`toggle-btn ${this.state.visible ? 'active' : ''}`}
					>
						{
							this.state.visible
								? '📚  Show Books'
								: '📂  Show Filters'
						}
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

export default App;