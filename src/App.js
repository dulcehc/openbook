
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
	ReactiveBase,
	DataSearch,
	MultiList,
	SingleRange,
	SelectedFilters,
	ResultCard,
	DateRange
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
						Open<b>Book</b>
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
						autosuggest={true}
						iconPosition="left"
						filterLabel="search"
					/>
				</div>
				<div className="display">
					<div className={`leftSidebar ${this.state.visible ? 'active' : ''}`}>
						<MultiList
							componentId="locationFilter"
							dataField="location.keyword"
							title="Ubicación"
							size={1000}
							showCheckbox={false}
							className="locations"
							innerClass={{
								list: 'location-list',
							}}
							placeholder="Delegación"
							filterLabel="Delegación"
						/>
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
						<MultiList
							componentId="authorFilter"
							dataField="author.keyword"
							title="Autor"
							size={1000}
							showCheckbox={false}
							className="authors"
							innerClass={{
								list: 'author-list',
							}}
							placeholder="Por autor"
							filterLabel="Author"
						/>
						<DateRange
							dataField="published"
    						componentId="DateRangeSensor"
    						title="Publicado por usuario"
    						numberOfMonths={1}
							queryFormat="basic_date" // yyyyMMdd
							placeholder={{
								start: 'Inicio',
								end: 'Fin'
							}}
							filterLabel="Fecha publicado"
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
									'ratingsFilter',
									'DateRangeSensor',
									'locationFilter'
								],
							}}
							pagination
							size={12}
							sortOptions={[
								{
									dataField: 'raiting',
									sortBy: 'desc',
									label: 'Valoraciones (Altas a bajas)',
								},
								{
									dataField: 'title.keyword',
									sortBy: 'asc',
									label: 'Título A->Z',
								},
								{
									dataField: 'title.keyword',
									sortBy: 'desc',
									label: 'Título Z->A',
								}
							]}
							onData={res => ({
								image: res.front,
								title: res.title || ' ',
								description:
									`<div class='result-user' title='${
										res.user
									}'>por ${res.user}</div>`
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