import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Card5 from "../componentsWeb/Cards/Card5";
import Loader from "../componentsWeb/SmallComponents/Loader";
import BaseView1 from "../layout/BaseView1";
import * as appTypes from "../redux/web/app/app.types";

class BlogPage extends Component {
	state = {
		pageSize: 13,
		currPage: 1,
	};

	componentDidMount() {
		const { allBlogPosts } = this.props;

		if (!allBlogPosts) {
			this.getBlogPostsData();
		}
	}

	getBlogPostsData = () => {
		const { fetchBlogPosts } = this.props;
		fetchBlogPosts();
	};

	render() {
		const { allBlogPosts } = this.props;
		if (!allBlogPosts) return <Loader />;

		const { pageSize, currPage } = this.state;

		const filterRangePosts =
			allBlogPosts &&
			allBlogPosts.length > 0 &&
			allBlogPosts.slice(
				(currPage - 1) * pageSize,
				Math.min(currPage * pageSize - 1, allBlogPosts.length)
			);

		let col1 = [];
		let col2 = [];
		let col3 = [];

		filterRangePosts.forEach((item, index) => {
			const remainder = index % 3;
			if (remainder === 0) {
				col1.push(item);
			} else if (remainder === 1) {
				col2.push(item);
			} else col3.push(item);
		});

		return (
			<React.Fragment>
				<section className="blog-post-content">
					<div className="container">
						<div className="row">
							<div className="col-md-4">
								{col1 &&
									col1.map((item) => (
										<Card5 {...item} isMasonry />
									))}
							</div>
							<div className="col-md-4">
								{col2 &&
									col2.map((item) => (
										<Card5 {...item} isMasonry />
									))}
							</div>
							<div className="col-md-4">
								{col3 &&
									col3.map((item) => (
										<Card5 {...item} isMasonry />
									))}
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	allBlogPosts: state.app.allBlogPosts,
});

const mapDispatchToProps = (dispatch) => ({
	fetchBlogPosts: () =>
		dispatch({ type: appTypes.FETCH_ALL_BLOG_POSTS_DATA }),
});

const connectToStore = connect(mapStateToProps, mapDispatchToProps);

const wrapper = compose(connectToStore, BaseView1);

export default wrapper(BlogPage);
